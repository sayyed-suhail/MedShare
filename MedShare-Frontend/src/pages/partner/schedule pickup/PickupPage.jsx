import React, { useEffect, useMemo, useState } from "react";

import axios from "axios";

import "./PickupPage.css";



const API_BASE_URL = "http://localhost:5001/api";



const timeWindows = [

  "Morning (09:00 AM - 12:00 PM)",

  "Afternoon (01:00 PM - 04:00 PM)",

  "Late Window (04:00 PM - 06:30 PM)",

  "Urgent Same-Day Priority Window",

];



const couriers = [

  "HopeHealth Courier Partner (Refrigerated Van 04)",

  "Direct NGO Volunteer Courier (Validated)",

  "CareLogistics Medical Transit (Heavy Transport)",

  "Metro Express Clinical Delivery",

];



const idOf = (m) => m?._id || m?.id;



const nameOf = (m) => m?.name || m?.medicineName || "Medicine";



const saltOf = (m) => m?.salt || "Salt not available";



const storageOf = (m) =>

  m?.storageConditions || "Storage information not available";



const coldOf = (m) => storageOf(m).toLowerCase().includes("cold");



const iconOf = (m) => {

  const category = String(m?.category || "").toLowerCase();



  if (category.includes("diabetes")) return "bloodtype";

  if (category.includes("cardio")) return "cardiology";

  if (category.includes("antibiotic")) return "medication";



  return "vaccines";

};



const toneOf = (m) => {

  const category = String(m?.category || "").toLowerCase();



  if (category.includes("diabetes")) return "aqua-dark";

  if (category.includes("cardio")) return "blue";



  return "aqua";

};



const formatDate = (value) => {

  if (!value) return "Date not set";



  const date = new Date(value);



  if (Number.isNaN(date.getTime())) return value;



  return date.toLocaleDateString("en-IN", {

    day: "2-digit",

    month: "short",

    year: "numeric",

  });

};



/*

  Pickup workflow status



  not_scheduled

       ↓

  scheduled

       ↓

  donor_accepted

       ↓

  pickup_completed

       ↓

  received

*/

const statusLabel = (m) => {

  if (m?.pickupStatus === "received") {

    return "Medicine Received";

  }



  if (m?.pickupStatus === "pickup_completed") {

    return "Pickup Completed";

  }



  if (m?.pickupStatus === "donor_accepted") {

    return "Donor Accepted";

  }



  if (m?.pickupStatus === "scheduled") {

    return "Awaiting Donor Acceptance";

  }



  return "Not Scheduled";

};



function SchedulePickupPage() {

  const [activeTab, setActiveTab] = useState("awaiting");



  const [approvedMedicines, setApprovedMedicines] = useState([]);

  const [scheduledMedicines, setScheduledMedicines] = useState([]);



  const [searchTerm, setSearchTerm] = useState("");



  const [selectedBatch, setSelectedBatch] = useState(null);

  const [selectedScheduledMedicine, setSelectedScheduledMedicine] =

    useState(null);



  const [pickupDate, setPickupDate] = useState("");

  const [timeWindow, setTimeWindow] = useState(timeWindows[0]);

  const [courier, setCourier] = useState(couriers[0]);

  const [referenceNumber, setReferenceNumber] = useState("");

  const [notes, setNotes] = useState("");



  const [loadingAwaiting, setLoadingAwaiting] = useState(true);

  const [loadingScheduled, setLoadingScheduled] = useState(false);



  const [submitting, setSubmitting] = useState(false);



  const [error, setError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");



  // --------------------------------------------------

  // Load approved medicines awaiting pickup scheduling

  // --------------------------------------------------

  const loadApproved = async () => {

    try {

      setLoadingAwaiting(true);

      setError("");



      const response = await axios.get(

        `${API_BASE_URL}/partner/medicines/approved`

      );



      const medicines = response.data?.medicines || [];



      const awaiting = medicines.filter(

        (medicine) => medicine.pickupStatus === "not_scheduled"

      );



      setApprovedMedicines(awaiting);



      setSelectedBatch((current) => {

        if (

          current &&

          awaiting.some((medicine) => idOf(medicine) === idOf(current))

        ) {

          return current;

        }



        return awaiting[0] || null;

      });

    } catch (err) {

      console.error("Error loading approved medicines:", err);



      setError(

        err.response?.data?.message ||

          "Unable to load approved medicines."

      );

    } finally {

      setLoadingAwaiting(false);

    }

  };



  // --------------------------------------------------

  // Load scheduled + donor accepted pickups

  // --------------------------------------------------

  const loadScheduled = async () => {

    try {

      setLoadingScheduled(true);

      setError("");



      const response = await axios.get(

        `${API_BASE_URL}/partner/medicines/scheduled-pickups`

      );



      setScheduledMedicines(response.data?.medicines || []);

    } catch (err) {

      console.error("Error loading scheduled pickups:", err);



      setError(

        err.response?.data?.message ||

          "Unable to load scheduled pickups."

      );

    } finally {

      setLoadingScheduled(false);

    }

  };



  useEffect(() => {

    loadApproved();

  }, []);



  useEffect(() => {

    if (activeTab === "scheduled") {

      loadScheduled();

    }

  }, [activeTab]);



  // --------------------------------------------------

  // Search Awaiting Schedule

  // --------------------------------------------------

  const filteredAwaiting = useMemo(() => {

    const search = searchTerm.toLowerCase().trim();



    if (!search) {

      return approvedMedicines;

    }



    return approvedMedicines.filter((medicine) =>

      [

        nameOf(medicine),

        saltOf(medicine),

        medicine?.category,

        medicine?.quantity,

        idOf(medicine),

      ]

        .filter(Boolean)

        .some((value) =>

          String(value).toLowerCase().includes(search)

        )

    );

  }, [approvedMedicines, searchTerm]);



  // --------------------------------------------------

  // Select medicine for scheduling

  // --------------------------------------------------

  const selectBatch = (medicine) => {

    setSelectedBatch(medicine);



    setPickupDate("");

    setTimeWindow(timeWindows[0]);

    setCourier(couriers[0]);

    setReferenceNumber("");

    setNotes("");



    setError("");

    setSuccessMessage("");

  };



  // --------------------------------------------------

  // Schedule Pickup

  // --------------------------------------------------

  const handleSubmit = async (event) => {

    event.preventDefault();



    if (!selectedBatch) {

      return setError(

        "Please select an approved medicine first."

      );

    }



    if (!pickupDate || !timeWindow || !courier) {

      return setError(

        "Pickup date, time window, and courier are required."

      );

    }



    try {

      setSubmitting(true);

      setError("");

      setSuccessMessage("");



      await axios.patch(

        `${API_BASE_URL}/partner/medicines/${idOf(

          selectedBatch

        )}/schedule-pickup`,

        {

          pickupDate,

          pickupTimeSlot: timeWindow,

          courier,

          vehicleReference: referenceNumber,

          logisticsNotes: notes,

        }

      );



      setSuccessMessage(

        `Pickup scheduled successfully for ${nameOf(

          selectedBatch

        )}.`

      );



      setSelectedBatch(null);



      await loadApproved();



      setActiveTab("scheduled");



      await loadScheduled();

    } catch (err) {

      console.error("Schedule pickup error:", err);



      setError(

        err.response?.data?.message ||

          "Unable to schedule this pickup."

      );

    } finally {

      setSubmitting(false);

    }

  };



  // --------------------------------------------------

  // Cancel Schedule Form

  // --------------------------------------------------

  const handleCancel = () => {

    setSelectedBatch(approvedMedicines[0] || null);



    setPickupDate("");

    setTimeWindow(timeWindows[0]);

    setCourier(couriers[0]);

    setReferenceNumber("");

    setNotes("");



    setError("");

  };



  // --------------------------------------------------

  // View Pickup Details

  // --------------------------------------------------

  const viewDetails = async (medicine) => {

    try {

      setError("");



      const response = await axios.get(

        `${API_BASE_URL}/partner/medicines/${idOf(

          medicine

        )}/pickup-details`

      );



      setSelectedScheduledMedicine(

        response.data?.medicine || medicine

      );

    } catch (err) {

      console.error("Pickup details error:", err);



      setError(

        err.response?.data?.message ||

          "Unable to load pickup details."

      );

    }

  };
  const handleCompletePickup = async (medicine) => {
    try {
      setError("");
      setSuccessMessage("");

      const response = await axios.patch(
        `${API_BASE_URL}/partner/medicines/${idOf(
          medicine
        )}/complete-pickup`
      );

      setSelectedScheduledMedicine(response.data?.medicine || medicine);

      setSuccessMessage(
        `Pickup completed successfully for ${nameOf(medicine)}.`
      );

      await loadScheduled();
    } catch (err) {
      console.error("Complete Pickup Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to mark pickup as completed."
      );
    }
  };
  const handleReceiveMedicine = async (medicine) => {
    try {
      setError("");
      setSuccessMessage("");

      const response = await axios.patch(
        `${API_BASE_URL}/partner/medicines/${idOf(
          medicine
        )}/receive`
      );

      setSelectedScheduledMedicine(response.data?.medicine || medicine);

      setSuccessMessage(
        `Medicine received successfully for ${nameOf(medicine)}.`
      );

      await loadScheduled();
    } catch (err) {
      console.error("Receive Medicine Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to mark medicine as received."
      );
    }
  };









  // --------------------------------------------------

  // Awaiting Schedule UI

  // --------------------------------------------------

  const renderAwaiting = () => (

    <>

      <section className="queue-card">

        <div className="queue-card-header">

          <div className="queue-title">

            <h2>Approved Batches Awaiting Pickup Assignment</h2>



            <span>

              ({filteredAwaiting.length} Batches Available)

            </span>

          </div>



          <span className="sorted-label">

            Sorted by Verification Timestamp

          </span>

        </div>



        <div className="batch-list">

          {loadingAwaiting ? (

            <div className="scheduled-empty">

              <span className="material-symbols-outlined loading-icon">

                progress_activity

              </span>



              <h3>Loading approved medicines</h3>



              <p>

                Fetching medicines that are approved and waiting for

                pickup scheduling.

              </p>

            </div>

          ) : filteredAwaiting.length === 0 ? (

            <div className="scheduled-empty">

              <span className="material-symbols-outlined">

                inventory_2

              </span>



              <h3>No medicines awaiting scheduling</h3>



              <p>

                Approved medicines will appear here when they are ready

                for pickup scheduling.

              </p>

            </div>

          ) : (

            filteredAwaiting.map((medicine) => {

              const selected =

                idOf(selectedBatch) === idOf(medicine);



              return (

                <article

                  key={idOf(medicine)}

                  className={

                    selected

                      ? "batch-card selected"

                      : "batch-card"

                  }

                  onClick={() => selectBatch(medicine)}

                >

                  <div className="batch-main">

                    <div

                      className={`batch-icon ${toneOf(

                        medicine

                      )}`}

                    >

                      <span className="material-symbols-outlined">

                        {iconOf(medicine)}

                      </span>

                    </div>



                    <div className="batch-details">

                      <div className="batch-title-row">

                        <h3>{nameOf(medicine)}</h3>



                        <span className="batch-id">

                          #{String(idOf(medicine)).slice(-6)}

                        </span>



                        <span className="batch-category">

                          {medicine?.category || "General"}

                        </span>



                        <span

                          className={

                            coldOf(medicine)

                              ? "storage-badge cold-storage"

                              : "storage-badge"

                          }

                        >

                          <span className="material-symbols-outlined">

                            {coldOf(medicine)

                              ? "shield"

                              : "thermostat"}

                          </span>



                          {storageOf(medicine)}

                        </span>

                      </div>



                      <p>

                        Salt: {saltOf(medicine)}



                        {medicine?.quantity

                          ? ` • Quantity: ${medicine.quantity}`

                          : ""}

                      </p>



                      <div className="facility-row">

                        <span className="facility-name">

                          <span className="material-symbols-outlined">

                            verified

                          </span>



                          <strong>Approved Medicine</strong>

                        </span>



                        <span className="facility-address">

                          <span className="material-symbols-outlined">

                            schedule

                          </span>



                          Pickup has not been scheduled

                        </span>

                      </div>

                    </div>

                  </div>



                  <div className="batch-actions">

                    <div className="verification-info">

                      <span className="material-symbols-outlined">

                        verified

                      </span>



                      Verification status: Approved

                    </div>



                    <button

                      type="button"

                      className={

                        selected

                          ? "schedule-now selected-action"

                          : "schedule-now"

                      }

                      onClick={(event) => {

                        event.stopPropagation();

                        selectBatch(medicine);

                      }}

                    >

                      {selected

                        ? "Editing Schedule"

                        : "Schedule Now"}



                      <span className="material-symbols-outlined">

                        {selected

                          ? "arrow_downward"

                          : "calendar_today"}

                      </span>

                    </button>

                  </div>

                </article>

              );

            })

          )}

        </div>

      </section>



      {selectedBatch && !loadingAwaiting && (

        <section className="schedule-form-card">

          <div className="form-card-header">

            <div>

              <h2>New Pickup Schedule</h2>



              <p>

                Assign transport courier, date, time window, and

                logistics notes for batch collection.

              </p>

            </div>



            <div className="linked-batch">

              <span className="material-symbols-outlined">

                link

              </span>



              Batch #{String(idOf(selectedBatch)).slice(-6)} Linked

            </div>

          </div>



          <div className="batch-summary">

            <div className="summary-left">

              <div className="summary-icon">

                <span className="material-symbols-outlined">

                  vaccines

                </span>

              </div>



              <div>

                <div className="summary-title">

                  <span>

                    {nameOf(selectedBatch)} (#

                    {String(idOf(selectedBatch)).slice(-6)})

                  </span>



                  <span className="summary-separator">•</span>



                  <span>

                    {selectedBatch.quantity ||

                      "Quantity not available"}

                  </span>

                </div>



                <span className="summary-subtitle">

                  Category:{" "}

                  {selectedBatch.category || "General"} •{" "}

                  {coldOf(selectedBatch)

                    ? "Refrigerated storage"

                    : "Non-refrigerated storage"}

                </span>

              </div>

            </div>



            <div className="ready-badge">

              <span />

              Approved • Ready for Pickup Scheduling

            </div>

          </div>



          <div className="pickup-origin">

            <label>Pickup Origin & Donor Information</label>



            <div className="origin-card">

              <div className="origin-icon">

                <span className="material-symbols-outlined">

                  location_on

                </span>

              </div>



              <div>

                <strong>Donor pickup location</strong>



                <p>

                  Donor location details are not stored in the current

                  backend medicine record.

                </p>



                <span className="contact-info">

                  <span className="material-symbols-outlined">

                    info

                  </span>



                  Donor profile/location integration can be connected

                  later.

                </span>

              </div>

            </div>

          </div>



          <form className="pickup-form" onSubmit={handleSubmit}>

            <div className="form-grid">

              <div className="form-group">

                <label>

                  <span className="material-symbols-outlined">

                    calendar_month

                  </span>

                  Pickup Date

                </label>



                <input

                  type="date"

                  value={pickupDate}

                  min={new Date()

                    .toISOString()

                    .split("T")[0]}

                  onChange={(event) =>

                    setPickupDate(event.target.value)

                  }

                  required

                />



                <small>

                  Select the date on which the courier should collect

                  the medicine.

                </small>

              </div>



              <div className="form-group">

                <label>

                  <span className="material-symbols-outlined">

                    schedule

                  </span>

                  Pickup Time Window

                </label>



                <div className="form-select">

                  <select

                    value={timeWindow}

                    onChange={(event) =>

                      setTimeWindow(event.target.value)

                    }

                    required

                  >

                    {timeWindows.map((window) => (

                      <option key={window} value={window}>

                        {window}

                      </option>

                    ))}

                  </select>



                  <span className="material-symbols-outlined">

                    expand_more

                  </span>

                </div>



                <small>

                  The selected time window will be sent to the

                  backend.

                </small>

              </div>



              <div className="form-group">

                <label>

                  <span className="material-symbols-outlined">

                    local_shipping

                  </span>

                  Assign Courier / Volunteer

                </label>



                <div className="form-select">

                  <select

                    value={courier}

                    onChange={(event) =>

                      setCourier(event.target.value)

                    }

                    required

                  >

                    {couriers.map((option) => (

                      <option key={option} value={option}>

                        {option}

                      </option>

                    ))}

                  </select>



                  <span className="material-symbols-outlined">

                    expand_more

                  </span>

                </div>

              </div>



              <div className="form-group">

                <label>

                  <span className="material-symbols-outlined">

                    badge

                  </span>

                  Vehicle / Reference Number (Optional)

                </label>



                <input

                  type="text"

                  placeholder="e.g. VAN-4029 / DS-889"

                  value={referenceNumber}

                  onChange={(event) =>

                    setReferenceNumber(event.target.value)

                  }

                />

              </div>

            </div>



            <div className="form-group notes-group">

              <label>

                <span className="material-symbols-outlined">

                  assignment

                </span>

                Logistics & Handling Notes (Optional)

              </label>



              <textarea

                rows="3"

                placeholder="Add courier instructions, handling requirements, or special notes..."

                value={notes}

                onChange={(event) =>

                  setNotes(event.target.value)

                }

              />

            </div>



            <div className="form-footer">

              <div className="audit-notice">

                <span className="material-symbols-outlined">

                  verified_user

                </span>



                <span>

                  Scheduling changes the medicine from{" "}

                  <strong>not_scheduled</strong> to{" "}

                  <strong>scheduled</strong>. Donor acceptance and

                  physical pickup remain separate workflow steps.

                </span>

              </div>



              <div className="form-actions">

                <button

                  type="button"

                  className="cancel-button"

                  onClick={handleCancel}

                  disabled={submitting}

                >

                  Cancel

                </button>



                <button

                  type="submit"

                  className="confirm-button"

                  disabled={submitting}

                >

                  <span className="material-symbols-outlined">

                    {submitting

                      ? "progress_activity"

                      : "send"}

                  </span>



                  {submitting

                    ? "Scheduling..."

                    : "Confirm Schedule"}

                </button>

              </div>

            </div>

          </form>

        </section>

      )}

    </>

  );



  // --------------------------------------------------

  // Scheduled Pickup UI

  // --------------------------------------------------

  const renderScheduled = () => {

    const filtered = scheduledMedicines.filter((medicine) => {

      const search = searchTerm.toLowerCase().trim();



      if (!search) return true;



      return [

        nameOf(medicine),

        saltOf(medicine),

        medicine?.category,

        medicine?.courier,

        medicine?.vehicleReference,

        idOf(medicine),

      ]

        .filter(Boolean)

        .some((value) =>

          String(value).toLowerCase().includes(search)

        );

    });



    return (

      <>

        <section className="queue-card">

          <div className="queue-card-header">

            <div className="queue-title">

              <h2>Scheduled Pickup Batches</h2>



              <span>

                ({scheduledMedicines.length} Scheduled)

              </span>

            </div>



            <span className="sorted-label">

              Sorted by Pickup Date

            </span>

          </div>



          <div className="batch-list">

            {loadingScheduled ? (

              <div className="scheduled-empty">

                <span className="material-symbols-outlined loading-icon">

                  progress_activity

                </span>



                <h3>Loading scheduled pickups</h3>



                <p>

                  Fetching pickup schedules from the Partner backend.

                </p>

              </div>

            ) : filtered.length === 0 ? (

              <div className="scheduled-empty">

                <span className="material-symbols-outlined">

                  event_available

                </span>



                <h3>No scheduled pickups yet</h3>



                <p>

                  Once you confirm a pickup schedule, the medicine

                  will appear here.

                </p>

              </div>

            ) : (

              filtered.map((medicine) => (

                <article

                  key={idOf(medicine)}

                  className="scheduled-card"

                >

                  <div className="scheduled-card-main">

                    <div

                      className={`batch-icon ${toneOf(

                        medicine

                      )}`}

                    >

                      <span className="material-symbols-outlined">

                        {iconOf(medicine)}

                      </span>

                    </div>



                    <div className="batch-details">

                      <div className="batch-title-row">

                        <h3>{nameOf(medicine)}</h3>



                        <span className="batch-id">

                          #{String(idOf(medicine)).slice(-6)}

                        </span>



                        <span className="batch-category">

                          {medicine?.category || "General"}

                        </span>

                      </div>



                      <p>

                        Salt: {saltOf(medicine)}



                        {medicine?.quantity

                          ? ` • Quantity: ${medicine.quantity}`

                          : ""}

                      </p>



                      <div className="scheduled-meta">

                        <span>

                          <span className="material-symbols-outlined">

                            calendar_month

                          </span>



                          {formatDate(medicine.pickupDate)}

                        </span>



                        <span>

                          <span className="material-symbols-outlined">

                            schedule

                          </span>



                          {medicine.pickupTimeSlot ||

                            "Time not set"}

                        </span>



                        <span>

                          <span className="material-symbols-outlined">

                            local_shipping

                          </span>



                          {medicine.courier ||

                            "Courier not set"}

                        </span>

                      </div>

                    </div>

                  </div>



                  <div className="scheduled-card-actions">

                    <span

                      className={`pickup-status-badge ${String(

                        medicine.pickupStatus || ""

                      ).replaceAll("_", "-")}`}

                    >

                      <span className="status-dot" />



                      {statusLabel(medicine)}

                    </span>



                    <button

                      type="button"

                      className="details-button"

                      onClick={() => viewDetails(medicine)}

                    >

                      View Details



                      <span className="material-symbols-outlined">

                        arrow_forward

                      </span>

                    </button>

                  </div>

                </article>

              ))

            )}

          </div>

        </section>



        {selectedScheduledMedicine && (

          <section className="pickup-details-card">

            <div className="details-header">

              <div>

                <div className="operational-kicker">

                  <span className="material-symbols-outlined">

                    route

                  </span>

                  Pickup Tracking

                </div>



                <h2>Pickup Details</h2>



                <p>

                  Complete pickup information and current workflow

                  status for this approved medicine.

                </p>

              </div>



              <button

                type="button"

                className="close-details-button"

                onClick={() =>

                  setSelectedScheduledMedicine(null)

                }

                title="Close details"

              >

                <span className="material-symbols-outlined">

                  close

                </span>

              </button>

            </div>



            <div className="details-summary">

              <div className="summary-icon">

                <span className="material-symbols-outlined">

                  vaccines

                </span>

              </div>



              <div>

                <h3>

                  {nameOf(selectedScheduledMedicine)}

                </h3>



                <p>

                  Salt: {saltOf(selectedScheduledMedicine)}



                  {selectedScheduledMedicine.quantity

                    ? ` • Quantity: ${selectedScheduledMedicine.quantity}`

                    : ""}

                </p>

              </div>



              <span

                className={`pickup-status-badge ${String(

                  selectedScheduledMedicine.pickupStatus || ""

                ).replaceAll("_", "-")}`}

              >

                <span className="status-dot" />



                {statusLabel(selectedScheduledMedicine)}

              </span>

            </div>



            <div className="details-grid">

              <div className="detail-section">

                <h3>

                  <span className="material-symbols-outlined">

                    local_shipping

                  </span>

                  Pickup Information

                </h3>



                <div className="detail-list">

                  <div>

                    <span>Pickup Date</span>



                    <strong>

                      {formatDate(

                        selectedScheduledMedicine.pickupDate

                      )}

                    </strong>

                  </div>



                  <div>

                    <span>Time Window</span>



                    <strong>

                      {selectedScheduledMedicine.pickupTimeSlot ||

                        "Not available"}

                    </strong>

                  </div>



                  <div>

                    <span>Courier / Volunteer</span>



                    <strong>

                      {selectedScheduledMedicine.courier ||

                        "Not available"}

                    </strong>

                  </div>



                  <div>

                    <span>Vehicle / Reference</span>



                    <strong>

                      {selectedScheduledMedicine.vehicleReference ||

                        "Not provided"}

                    </strong>

                  </div>



                  <div>

                    <span>Logistics Notes</span>



                    <strong>

                      {selectedScheduledMedicine.logisticsNotes ||

                        "No additional notes"}

                    </strong>

                  </div>

                </div>

              </div>



              <div className="detail-section">

                <h3>

                  <span className="material-symbols-outlined">

                    medication

                  </span>

                  Medicine Information

                </h3>



                <div className="detail-list">

                  <div>

                    <span>Category</span>



                    <strong>

                      {selectedScheduledMedicine.category ||

                        "Not available"}

                    </strong>

                  </div>



                  <div>

                    <span>Storage</span>



                    <strong>

                      {storageOf(selectedScheduledMedicine)}

                    </strong>

                  </div>



                  <div>

                    <span>Verification</span>



                    <strong>Approved</strong>

                  </div>



                  <div>

                    <span>Donor Acceptance</span>



                    <strong>

                      {selectedScheduledMedicine.donorAcceptedPickup

                        ? "Accepted"

                        : "Waiting for donor acceptance"}

                    </strong>

                  </div>

                </div>

              </div>

            </div>



            {/* Pickup Timeline */}

            <div className="pickup-timeline">

              <h3>

                <span className="material-symbols-outlined">

                  timeline

                </span>

                Pickup Timeline

              </h3>



              <div className="timeline">

                <div className="timeline-item completed">

                  <div className="timeline-icon">

                    <span className="material-symbols-outlined">

                      verified

                    </span>

                  </div>



                  <div>

                    <strong>Medicine Approved</strong>

                    <span>Verification completed</span>

                  </div>

                </div>



                <div className="timeline-line" />



                <div className="timeline-item completed">

                  <div className="timeline-icon">

                    <span className="material-symbols-outlined">

                      event

                    </span>

                  </div>



                  <div>

                    <strong>Pickup Scheduled</strong>



                    <span>

                      {formatDate(

                        selectedScheduledMedicine.pickupDate

                      )}{" "}

                      •{" "}

                      {selectedScheduledMedicine.pickupTimeSlot ||

                        "Time not set"}

                    </span>

                  </div>

                </div>



                <div className="timeline-line" />



                <div

                  className={

                    selectedScheduledMedicine.donorAcceptedPickup

                      ? "timeline-item completed"

                      : "timeline-item current"

                  }

                >

                  <div className="timeline-icon">

                    <span className="material-symbols-outlined">

                      person_check

                    </span>

                  </div>



                  <div>

                    <strong>Donor Accepted Pickup</strong>



                    <span>

                      {selectedScheduledMedicine.donorAcceptedPickup

                        ? "Donor has accepted the scheduled pickup"

                        : "Waiting for donor acceptance"}

                    </span>

                  </div>

                </div>



                <div className="timeline-line" />



                <div

                  className={

                    selectedScheduledMedicine.pickupStatus ===

                    "pickup_completed"

                      ? "timeline-item completed"

                      : "timeline-item"

                  }

                >

                  <div className="timeline-icon">

                    <span className="material-symbols-outlined">

                      local_shipping

                    </span>

                  </div>



                  <div>

                    <strong>Pickup Completed</strong>



                    <span>

                      Medicine physically collected from donor

                    </span>

                  </div>

                </div>



                <div className="timeline-line" />



                <div

                  className={

                    selectedScheduledMedicine.pickupStatus ===

                    "received"

                      ? "timeline-item completed"

                      : "timeline-item"

                  }

                >

                  <div className="timeline-icon">

                    <span className="material-symbols-outlined">

                      inventory_2

                    </span>

                  </div>



                  <div>

                    <strong>Medicine Received</strong>



                    <span>

                      Medicine physically received by Partner / NGO

                    </span>

                  </div>

                </div>

              </div>

            </div>



            {/* Workflow Actions */}

            <div className="details-actions">



              {/* Donor has NOT accepted */}

              {selectedScheduledMedicine.pickupStatus ===

                "scheduled" &&

                !selectedScheduledMedicine.donorAcceptedPickup && (

                  <div className="waiting-action">

                    <span className="material-symbols-outlined">

                      hourglass_top

                    </span>



                    Waiting for donor acceptance before pickup can

                    be completed.

                  </div>

                )}



              {/* Donor HAS accepted */}

              {selectedScheduledMedicine.pickupStatus ===

                "donor_accepted" &&

                selectedScheduledMedicine.donorAcceptedPickup && (

                  <button

                    type="button"

                    className="workflow-button"

                    onClick={() =>
                    handleCompletePickup(selectedScheduledMedicine)
                  }

                  >

                    <span className="material-symbols-outlined">

                      local_shipping

                    </span>



                    Mark Pickup Completed

                  </button>

                )}



              {/* Pickup completed */}

              {selectedScheduledMedicine.pickupStatus ===

                "pickup_completed" && (

                  <button

                    type="button"

                    className="workflow-button"

                    onClick={() =>
                      handleReceiveMedicine(selectedScheduledMedicine)
                    }

                  >

                    <span className="material-symbols-outlined">

                      inventory_2

                    </span>



                    Mark Medicine Received

                  </button>

                )}



              {/* Medicine received */}

              {selectedScheduledMedicine.pickupStatus ===

                "received" && (

                  <div className="received-action">

                    <span className="material-symbols-outlined">

                      check_circle

                    </span>



                    Medicine received. It can now move to the

                    inventory workflow.

                  </div>

                )}

            </div>

          </section>

        )}

      </>

    );

  };



  return (

    <main className="schedule-page">

      <div className="schedule-container">

        <header className="schedule-header">

          <div>

            <div className="operational-kicker">

              <span className="kicker-dot">

                <span className="kicker-dot-ping" />

                <span className="kicker-dot-main" />

              </span>



              Clinical Operations • Logistics & Dispensary

              Distribution

            </div>



            <h1>Schedule Pickup</h1>



            <p>

              Arrange collection for approved donations awaiting

              pickup and pharmaceutical verification handover.

            </p>

          </div>



          <div className="header-indicators">

            <div className="indicator dispatch">

              <span className="indicator-dot" />



              {approvedMedicines.length} Awaiting Logistics Dispatch

            </div>



            <div className="indicator cold-chain">

              <span className="material-symbols-outlined">

                verified_user

              </span>



              Cold-Chain Protocols Enforced

            </div>



            <a

              className="guidelines-button"

              href="#guidelines"

            >

              Dispatch Guidelines



              <span className="material-symbols-outlined">

                open_in_new

              </span>

            </a>

          </div>

        </header>



        {error && (

          <div className="message-box error-message">

            <span className="material-symbols-outlined">

              error

            </span>



            <span>{error}</span>

          </div>

        )}



        {successMessage && (

          <div className="message-box success-message">

            <span className="material-symbols-outlined">

              check_circle

            </span>



            <span>{successMessage}</span>

          </div>

        )}



        <div className="queue-controls">

          <div className="schedule-tabs">

            <button

              type="button"

              className={

                activeTab === "awaiting"

                  ? "tab active"

                  : "tab"

              }

              onClick={() => {

                setActiveTab("awaiting");

                setSelectedScheduledMedicine(null);

                setError("");

              }}

            >

              Awaiting Schedule



              <span className="tab-count">

                {approvedMedicines.length}

              </span>

            </button>



            <button

              type="button"

              className={

                activeTab === "scheduled"

                  ? "tab active"

                  : "tab"

              }

              onClick={() => {

                setActiveTab("scheduled");

                setSelectedScheduledMedicine(null);

                setError("");

              }}

            >

              Scheduled



              <span className="tab-count">

                {scheduledMedicines.length}

              </span>

            </button>

          </div>



          <div className="search-controls">

            <div className="schedule-search">

              <span className="material-symbols-outlined">

                search

              </span>



              <input

                type="text"

                placeholder="Search medicine, salt or category..."

                value={searchTerm}

                onChange={(event) =>

                  setSearchTerm(event.target.value)

                }

              />

            </div>



            <button

              className="filter-button"

              type="button"

              title="Clear Search"

              onClick={() => setSearchTerm("")}

            >

              <span className="material-symbols-outlined">

                tune

              </span>

            </button>

          </div>

        </div>



        {activeTab === "awaiting"

          ? renderAwaiting()

          : renderScheduled()}



        <div id="guidelines" className="guidelines-note">

          <span className="material-symbols-outlined">

            info

          </span>



          <span>

            Pickup scheduling only creates the schedule. Donor

            acceptance, physical pickup completion, and medicine

            receipt remain separate workflow steps.

          </span>

        </div>

      </div>

    </main>

  );

}



export default SchedulePickupPage;