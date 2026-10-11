import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./MyDonationsPage.css";

const filters = [
  { label: "All", value: "ALL" },
  { label: "Pending Verification", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

function StatusBadge({ status }) {
  const label = status
    ? status.charAt(0).toUpperCase() + status.slice(1)
    : "Unknown";

  return (
    <span className={`donation-status ${status || ""}`}>
      <span className="status-dot" />
      {label}
    </span>
  );
}

function MedicineIcon() {
  return (
    <div className="medicine-icon medicine">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect height="18" rx="2" width="18" x="3" y="3" />
        <path d="M12 8v8m-4-4h8" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function MyDonationsPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("Recent Submission");
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [acceptingPickup, setAcceptingPickup] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5001/api/medicines")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch medicines");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Medicines from backend:", data.medicines);
        setMedicines(data.medicines || []);
      })
      .catch((error) => {
        console.error("Error fetching medicines:", error);
      });
  }, []);

  const filteredDonations = useMemo(() => {
    if (activeFilter === "ALL") {
      return medicines;
    }

    return medicines.filter((item) => item.status === activeFilter);
  }, [activeFilter, medicines]);

  const sortedDonations = useMemo(() => {
    const items = [...filteredDonations];

    if (sortBy === "Recent Submission") {
      items.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    if (sortBy === "Expiry Date (Nearest)") {
      items.sort(
        (a, b) => new Date(a.expiryDate) - new Date(b.expiryDate)
      );
    }

    if (sortBy === "Quantity (Highest)") {
      items.sort(
        (a, b) => Number(b.quantity || 0) - Number(a.quantity || 0)
      );
    }

    if (sortBy === "Verification Status") {
      const order = {
        pending: 1,
        approved: 2,
        rejected: 3,
      };

      items.sort(
        (a, b) => (order[a.status] || 99) - (order[b.status] || 99)
      );
    }

    return items;
  }, [filteredDonations, sortBy]);

  const selectDonation = (donation) => {
    setSelectedDonation(donation);
  };

  // Donor accepts the scheduled pickup
  const acceptPickup = async (medicineId) => {
    try {
      setAcceptingPickup(true);

      const response = await fetch(
        `http://localhost:5001/api/medicines/${medicineId}/accept-pickup`,
        {
          method: "PATCH",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to accept pickup");
      }

      // Update medicine in the table
      setMedicines((currentMedicines) =>
        currentMedicines.map((medicine) =>
          medicine._id === medicineId ? data.medicine : medicine
        )
      );

      // Update selected medicine details
      setSelectedDonation(data.medicine);

      console.log("Pickup accepted successfully:", data.medicine);
    } catch (error) {
      console.error("Accept pickup error:", error);
      alert(error.message || "Failed to accept pickup");
    } finally {
      setAcceptingPickup(false);
    }
  };

  const pendingCount = medicines.filter(
    (medicine) => medicine.status === "pending"
  ).length;

  const approvedCount = medicines.filter(
    (medicine) => medicine.status === "approved"
  ).length;

  const rejectedCount = medicines.filter(
    (medicine) => medicine.status === "rejected"
  ).length;

  const pickupStatus = selectedDonation?.pickupStatus;

  const pickupScheduled =
    pickupStatus === "scheduled" ||
    pickupStatus === "donor_accepted" ||
    pickupStatus === "pickup_completed" ||
    pickupStatus === "received";

  const donorAccepted =
    selectedDonation?.donorAcceptedPickup === true ||
    pickupStatus === "donor_accepted" ||
    pickupStatus === "pickup_completed" ||
    pickupStatus === "received";

  return (
    <main className="my-donations-page">
      <div className="donations-container">

        {/* Page Header */}
        <section className="donations-page-header">
          <div>
            <h1>My Donations</h1>
            <p>
              Track your medicine donations and their verification status.
            </p>
          </div>

          <div className="donations-header-actions">
            <div className="metric-badges">
              <span className="metric pending">
                <span className="metric-dot" />
                {pendingCount} Pending
              </span>

              <span className="metric approved">
                <span className="metric-icon">✓</span>
                {approvedCount} Approved
              </span>

              <span className="metric picked-up">
                <span className="metric-icon">✓</span>
                {rejectedCount} Rejected
              </span>
            </div>

            <Link
              to="/donor/dashboard/AddNewMedicine"
              className="add-medicine-btn"
            >
              <span>+</span>
              Add New Medicine
            </Link>
          </div>
        </section>

        {/* Filters */}
        <section className="donations-filter-card">
          <div className="filter-tabs">
            {filters.map((filter) => {
              const count =
                filter.value === "ALL"
                  ? medicines.length
                  : medicines.filter(
                      (medicine) => medicine.status === filter.value
                    ).length;

              return (
                <button
                  key={filter.value}
                  type="button"
                  className={
                    activeFilter === filter.value ? "active" : ""
                  }
                  onClick={() => setActiveFilter(filter.value)}
                >
                  {filter.label} ({count})
                </button>
              );
            })}
          </div>

          <div className="sort-control">
            <span>Sort by:</span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option>Recent Submission</option>
              <option>Expiry Date (Nearest)</option>
              <option>Quantity (Highest)</option>
              <option>Verification Status</option>
            </select>
          </div>
        </section>

        {/* Main Content */}
        <section className="donations-grid">

          {/* Donation Table */}
          <div className="donation-table-card">
            <div className="card-header">
              <div className="card-title">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 11H5m14 0a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2m14 0V9a2 2 0 0 0-2-2M5 11V9a2 2 0 0 1 2-2m0 0V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M7 7h10" />
                </svg>

                <h2>Donation Submissions</h2>
              </div>

              <span className="showing-count">
                Showing {sortedDonations.length} medicines
              </span>
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Medicine &amp; Details</th>
                    <th>Category</th>
                    <th>Qty</th>
                    <th>Submitted</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {sortedDonations.length > 0 ? (
                    sortedDonations.map((donation) => (
                      <tr
                        key={donation._id}
                        className={
                          selectedDonation?._id === donation._id
                            ? "selected"
                            : ""
                        }
                        onClick={() => selectDonation(donation)}
                      >
                        <td>
                          <div className="medicine-cell">
                            <MedicineIcon />

                            <div>
                              <div className="medicine-name">
                                {donation.name}
                              </div>

                              <p>{donation.salt}</p>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className="category-badge">
                            {donation.category}
                          </span>
                        </td>

                        <td className="quantity">
                          {donation.quantity}
                        </td>

                        <td className="submitted">
                          {donation.createdAt
                            ? new Date(
                                donation.createdAt
                              ).toLocaleDateString()
                            : "-"}
                        </td>

                        <td>
                          <StatusBadge status={donation.status} />
                        </td>

                        <td className="action-cell">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              selectDonation(donation);
                            }}
                            className="view-button"
                          >
                            View
                            <span>›</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">
                        <div className="empty-inspection">
                          No medicines found for this filter.
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              <span>
                Showing {sortedDonations.length} entries
              </span>
            </div>
          </div>

          {/* Donation Details */}
          <aside className="inspection-card">
            {selectedDonation ? (
              <>
                <div className="inspection-header">
                  <div>
                    <div className="inspection-status">
                      <span />

                      {selectedDonation.status
                        ? selectedDonation.status.charAt(0).toUpperCase() +
                          selectedDonation.status.slice(1)
                        : "Unknown"}
                    </div>

                    <h3>{selectedDonation.name}</h3>

                    <p>
                      Salt:{" "}
                      <strong>
                        {selectedDonation.salt || "-"}
                      </strong>
                      {" • "}
                      Expiry:{" "}
                      <strong>
                        {selectedDonation.expiryDate
                          ? new Date(
                              selectedDonation.expiryDate
                            ).toLocaleDateString()
                          : "-"}
                      </strong>
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-label="Close details"
                    onClick={() => setSelectedDonation(null)}
                  >
                    ×
                  </button>
                </div>

                <div className="package-details">
                  <div className="package-image">
                    <span>
                      {selectedDonation.status === "approved"
                        ? "Approved"
                        : selectedDonation.status === "rejected"
                        ? "Rejected"
                        : "Pending"}
                    </span>

                    <div className="package-placeholder">
                      <span>Medicine</span>
                      <strong>{selectedDonation.quantity}</strong>
                    </div>
                  </div>

                  <div className="storage-details">
                    <div>
                      <span>Category:</span>
                      <strong>
                        {selectedDonation.category || "-"}
                      </strong>
                    </div>

                    <div>
                      <span>Quantity:</span>
                      <strong>
                        {selectedDonation.quantity ?? "-"}
                      </strong>
                    </div>

                    <div>
                      <span>Storage Condition:</span>
                      <strong>
                        {selectedDonation.storageConditions || "-"}
                      </strong>
                    </div>

                    <div>
                      <span>Submitted:</span>
                      <strong>
                        {selectedDonation.createdAt
                          ? new Date(
                              selectedDonation.createdAt
                            ).toLocaleDateString()
                          : "-"}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Pickup Information */}
                {pickupScheduled && (
                  <div
                    style={{
                      marginTop: "20px",
                      padding: "18px",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      background: "#f8fafc",
                    }}
                  >
                    <h4
                      style={{
                        margin: "0 0 15px",
                        fontSize: "16px",
                        color: "#0f172a",
                      }}
                    >
                      Pickup Information
                    </h4>

                    <div
                      style={{
                        display: "grid",
                        gap: "12px",
                      }}
                    >
                      <div>
                        <span
                          style={{
                            display: "block",
                            fontSize: "12px",
                            color: "#64748b",
                            marginBottom: "3px",
                          }}
                        >
                          Pickup Date
                        </span>

                        <strong>
                          {selectedDonation.pickupDate
                            ? new Date(
                                selectedDonation.pickupDate
                              ).toLocaleDateString()
                            : "-"}
                        </strong>
                      </div>

                      <div>
                        <span
                          style={{
                            display: "block",
                            fontSize: "12px",
                            color: "#64748b",
                            marginBottom: "3px",
                          }}
                        >
                          Time Window
                        </span>

                        <strong>
                          {selectedDonation.pickupTimeSlot || "-"}
                        </strong>
                      </div>

                      <div>
                        <span
                          style={{
                            display: "block",
                            fontSize: "12px",
                            color: "#64748b",
                            marginBottom: "3px",
                          }}
                        >
                          Courier / Volunteer
                        </span>

                        <strong>
                          {selectedDonation.courier || "-"}
                        </strong>
                      </div>

                      <div>
                        <span
                          style={{
                            display: "block",
                            fontSize: "12px",
                            color: "#64748b",
                            marginBottom: "3px",
                          }}
                        >
                          Vehicle / Reference
                        </span>

                        <strong>
                          {selectedDonation.vehicleReference || "-"}
                        </strong>
                      </div>

                      {selectedDonation.logisticsNotes && (
                        <div>
                          <span
                            style={{
                              display: "block",
                              fontSize: "12px",
                              color: "#64748b",
                              marginBottom: "3px",
                            }}
                          >
                            Logistics Notes
                          </span>

                          <strong>
                            {selectedDonation.logisticsNotes}
                          </strong>
                        </div>
                      )}
                    </div>

                    {/* Donor Acceptance */}
                    <div
                      style={{
                        marginTop: "18px",
                        paddingTop: "15px",
                        borderTop: "1px solid #e2e8f0",
                      }}
                    >
                      {donorAccepted ? (
                        <div
                          style={{
                            padding: "12px 14px",
                            borderRadius: "8px",
                            background: "#ecfdf5",
                            color: "#047857",
                            fontWeight: "600",
                          }}
                        >
                          ✓ Pickup Accepted
                        </div>
                      ) : (
                        <>
                          <p
                            style={{
                              margin: "0 0 12px",
                              fontSize: "13px",
                              color: "#475569",
                              lineHeight: "1.5",
                            }}
                          >
                            The partner has scheduled a pickup for this
                            medicine. Please confirm that you accept the
                            scheduled pickup.
                          </p>

                          <button
                            type="button"
                            className="contact-btn"
                            disabled={acceptingPickup}
                            onClick={() =>
                              acceptPickup(selectedDonation._id)
                            }
                            style={{
                              width: "100%",
                              cursor: acceptingPickup
                                ? "not-allowed"
                                : "pointer",
                              opacity: acceptingPickup ? 0.7 : 1,
                            }}
                          >
                            {acceptingPickup
                              ? "Accepting Pickup..."
                              : "Accept Pickup"}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Timeline */}
                <div className="timeline">
                  <h4>Donation Information</h4>

                  <div className="timeline-list">
                    {/* Submitted */}
                    <div className="timeline-item completed">
                      <span className="timeline-dot">✓</span>

                      <div>
                        <h5>Medicine Submitted</h5>

                        <p>
                          {selectedDonation.createdAt
                            ? new Date(
                                selectedDonation.createdAt
                              ).toLocaleString()
                            : "-"}
                        </p>
                      </div>
                    </div>

                    {/* Verification */}
                    {selectedDonation.status === "approved" && (
                      <div className="timeline-item completed">
                        <span className="timeline-dot">✓</span>

                        <div>
                          <h5>Medicine Approved</h5>

                          <p>
                            Your medicine has been approved by the
                            partner.
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedDonation.status === "rejected" && (
                      <div className="timeline-item current">
                        <span className="timeline-dot">
                          <span />
                        </span>

                        <div>
                          <h5>Medicine Rejected</h5>

                          <p>
                            This medicine was rejected during
                            verification.
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedDonation.status === "pending" && (
                      <div className="timeline-item current">
                        <span className="timeline-dot">
                          <span />
                        </span>

                        <div>
                          <h5>Verification Pending</h5>

                          <p>
                            Medicine is waiting for partner
                            verification.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Pickup Scheduled */}
                    {pickupScheduled && (
                      <div
                        className={
                          pickupStatus === "scheduled"
                            ? "timeline-item current"
                            : "timeline-item completed"
                        }
                      >
                        <span className="timeline-dot">
                          {pickupStatus === "scheduled" ? (
                            <span />
                          ) : (
                            "✓"
                          )}
                        </span>

                        <div>
                          <h5>Pickup Scheduled</h5>

                          <p>
                            Pickup scheduled for{" "}
                            {selectedDonation.pickupDate
                              ? new Date(
                                  selectedDonation.pickupDate
                                ).toLocaleDateString()
                              : "-"}{" "}
                            during{" "}
                            {selectedDonation.pickupTimeSlot || "-"}.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Donor Accepted */}
                    {donorAccepted && (
                      <div
                        className={
                          pickupStatus === "donor_accepted"
                            ? "timeline-item current"
                            : "timeline-item completed"
                        }
                      >
                        <span className="timeline-dot">
                          {pickupStatus === "donor_accepted" ? (
                            <span />
                          ) : (
                            "✓"
                          )}
                        </span>

                        <div>
                          <h5>Pickup Accepted</h5>

                          <p>
                            You have accepted the scheduled pickup.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Pickup Completed */}
                    {(
                      pickupStatus === "pickup_completed" ||
                      pickupStatus === "received"
                    ) && (
                      <div
                        className={
                          pickupStatus === "pickup_completed"
                            ? "timeline-item current"
                            : "timeline-item completed"
                        }
                      >
                        <span className="timeline-dot">
                          {pickupStatus === "pickup_completed" ? (
                            <span />
                          ) : (
                            "✓"
                          )}
                        </span>

                        <div>
                          <h5>Pickup Completed</h5>

                          <p>
                            The medicine has been physically collected
                            from you.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Medicine Received */}
                    {pickupStatus === "received" && (
                      <div className="timeline-item current">
                        <span className="timeline-dot">
                          <span />
                        </span>

                        <div>
                          <h5>Medicine Received</h5>

                          <p>
                            The partner has received the medicine at
                            their storage facility.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Current status when there is no pickup */}
                    {!pickupScheduled && (
                      <div className="timeline-item current">
                        <span className="timeline-dot">
                          <span />
                        </span>

                        <div>
                          <h5>Current Status</h5>

                          <p>
                            Medicine is currently{" "}
                            <strong>
                              {selectedDonation.status || "pending"}
                            </strong>
                            .
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="safety-box">
                  <strong>ⓘ Medicine Information</strong>

                  <p>
                    This information is currently loaded directly from the
                    MedShare backend database.
                  </p>
                </div>

                <div className="inspection-actions">
                  <button
                    type="button"
                    className="contact-btn"
                    onClick={() => setSelectedDonation(null)}
                  >
                    Close Details
                  </button>
                </div>
              </>
            ) : (
              <div className="empty-inspection">
                Select a donation to view its details.
              </div>
            )}
          </aside>
        </section>

        {/* Bottom Reference Card */}
        <section className="additional-medicine-card">
          <div className="additional-icon">⌄</div>

          <h3>Looking for another medicine?</h3>

          <p>
            Add another unused medicine donation with valid information
            and expiration details.
          </p>

          <Link to="/donor/dashboard/AddNewMedicine">
            + Register Additional Medicine
          </Link>
        </section>

      </div>
    </main>
  );
}