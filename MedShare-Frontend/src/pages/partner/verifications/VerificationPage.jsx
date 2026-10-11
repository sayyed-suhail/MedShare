import React, { useEffect, useMemo, useState } from "react";

import axios from "axios";

import "./VerificationPage.css";



const API_URL = "http://localhost:5001/api/partner/medicines";



function Icon({ name, size = 18, className = "" }) {

  const common = {

    width: size,

    height: size,

    viewBox: "0 0 24 24",

    fill: "none",

    stroke: "currentColor",

    strokeWidth: 2,

    strokeLinecap: "round",

    strokeLinejoin: "round",

    className,

    "aria-hidden": true,

  };



  switch (name) {

    case "shield":

      return (

        <svg {...common}>

          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />

        </svg>

      );

    case "search":

      return (

        <svg {...common}>

          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />

        </svg>

      );

    case "chevron":

      return (

        <svg {...common}>

          <path d="M19 9l-7 7-7-7" />

        </svg>

      );

    case "document":

      return (

        <svg {...common}>

          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />

        </svg>

      );

    case "image":

      return (

        <svg {...common}>

          <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />

        </svg>

      );

    case "flask":

      return (

        <svg {...common}>

          <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />

        </svg>

      );

    case "box":

      return (

        <svg {...common}>

          <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />

        </svg>

      );

    case "heart":

      return (

        <svg {...common}>

          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />

        </svg>

      );

    case "bolt":

      return (

        <svg {...common}>

          <path d="M13 10V3L4 14h7v7l9-11h-7z" />

        </svg>

      );

    case "checkCircle":

      return (

        <svg {...common}>

          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />

        </svg>

      );

    case "warning":

      return (

        <svg {...common}>

          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />

        </svg>

      );

    case "check":

      return (

        <svg {...common}>

          <path d="M5 13l4 4L19 7" />

        </svg>

      );

    case "close":

      return (

        <svg {...common}>

          <path d="M6 18L18 6M6 6l12 12" />

        </svg>

      );

    default:

      return null;

  }

}



const getIconTone = (category = "") => {

  const value = category.toLowerCase();



  if (value.includes("antibiotic")) return "teal";

  if (value.includes("blood") || value.includes("cardiac")) return "rose";

  if (value.includes("pain")) return "amber";

  if (value.includes("diabetes") || value.includes("endocrine")) return "purple";

  if (value.includes("vitamin")) return "emerald";

  if (value.includes("respiratory")) return "blue";



  return "blue";

};



const getIcon = (category = "") => {

  const value = category.toLowerCase();



  if (value.includes("antibiotic")) return "flask";

  if (value.includes("blood") || value.includes("cardiac")) return "heart";

  if (value.includes("diabetes")) return "bolt";

  if (value.includes("pain")) return "warning";

  if (value.includes("vitamin")) return "checkCircle";



  return "box";

};



const formatDate = (date) => {

  if (!date) return "Not available";



  const parsedDate = new Date(date);



  if (Number.isNaN(parsedDate.getTime())) return "Not available";



  return parsedDate.toLocaleDateString("en-GB", {

    day: "2-digit",

    month: "2-digit",

    year: "numeric",

  });

};



const getRelativeTime = (date) => {

  if (!date) return "Not available";



  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "Not available";



  const difference = Date.now() - parsedDate.getTime();

  const minutes = Math.floor(difference / 60000);



  if (minutes < 1) return "Just now";

  if (minutes < 60) return `${minutes} mins ago`;



  const hours = Math.floor(minutes / 60);

  if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;



  const days = Math.floor(hours / 24);

  return `${days} ${days === 1 ? "day" : "days"} ago`;

};



const normalizeMedicine = (medicine) => ({

  ...medicine,

  id: medicine._id,

  medicine: medicine.name || "Unnamed Medicine",

  composition: medicine.salt || "Composition not available",

  category: medicine.category || "Other Therapeutic Class",

  quantity: medicine.quantity ?? 0,

  packaging: "Units",

  donor: medicine.donor?.name || "Donor information not linked yet",

  donorType: medicine.donor ? "Registered Donor" : "Donor linkage pending",

  submitted: getRelativeTime(medicine.createdAt),

  actionNeeded: medicine.status === "pending",

  icon: getIcon(medicine.category),

  iconTone: getIconTone(medicine.category),

  expiry: formatDate(medicine.expiryDate),

  validity: "",

  imageLabel: medicine.images?.[0] || "No image",

  lot: "Not available",

  condition: medicine.storageConditions || "Storage conditions not provided",

  packagingDetail: "Packaging details are not available yet.",

  donorNote: "Donor note is not available yet.",

});



export default function VerificationPage() {

  const [submissions, setSubmissions] = useState([]);

  const [approvedSubmissions, setApprovedSubmissions] = useState([]);

  const [rejectedSubmissions, setRejectedSubmissions] = useState([]);

  const [activeTab, setActiveTab] = useState("Pending");

  const [search, setSearch] = useState("");

  const [sort, setSort] = useState("oldest");

  const [selectedId, setSelectedId] = useState(null);

  const [page, setPage] = useState(1);

  const [rejectionReason, setRejectionReason] = useState(

    "Packaging seal broken / damaged"

  );

  const [clinicalNotes, setClinicalNotes] = useState("");

  const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoading] = useState(false);

  const [error, setError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");



  const fetchAllMedicines = async () => {

    try {

      setLoading(true);

      setError("");



      const [pendingResponse, approvedResponse, rejectedResponse] =

        await Promise.all([

          axios.get(`${API_URL}/pending`),

          axios.get(`${API_URL}/approved`),

          axios.get(`${API_URL}/rejected`),

        ]);



      const pending = (pendingResponse.data?.medicines || []).map(

        normalizeMedicine

      );



      const approved = (approvedResponse.data?.medicines || []).map(

        normalizeMedicine

      );



      const rejected = (rejectedResponse.data?.medicines || []).map(

        normalizeMedicine

      );



      setSubmissions(pending);

      setApprovedSubmissions(approved);

      setRejectedSubmissions(rejected);



      setSelectedId((currentSelectedId) => {

        const currentList =

          activeTab === "Approved"

            ? approved

            : activeTab === "Rejected"

            ? rejected

            : activeTab === "All Submissions"

            ? [...pending, ...approved, ...rejected]

            : pending;



        if (currentList.some((item) => item.id === currentSelectedId)) {

          return currentSelectedId;

        }



        return currentList[0]?.id || null;

      });

    } catch (err) {

      console.error("Error fetching verification medicines:", err);

      setError(

        err.response?.data?.message ||

          "Unable to load medicines. Make sure the backend is running."

      );

    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    fetchAllMedicines();

  }, []);



  const getActiveSubmissions = () => {

    if (activeTab === "Approved") {

      return approvedSubmissions;

    }



    if (activeTab === "Rejected") {

      return rejectedSubmissions;

    }



    if (activeTab === "All Submissions") {

      return [...submissions, ...approvedSubmissions, ...rejectedSubmissions];

    }



    return submissions;

  };



  const filteredSubmissions = useMemo(() => {

    let result = [...getActiveSubmissions()];

    const query = search.toLowerCase().trim();



    if (query) {

      result = result.filter((item) =>

        [

          item.id,

          item.medicine,

          item.composition,

          item.category,

          item.donor,

        ]

          .join(" ")

          .toLowerCase()

          .includes(query)

      );

    }



    if (sort === "quantity") {

      result.sort((a, b) => Number(b.quantity) - Number(a.quantity));

    }



    if (sort === "newest") {

      result.sort(

        (a, b) =>

          new Date(b.createdAt || 0).getTime() -

          new Date(a.createdAt || 0).getTime()

      );

    }



    if (sort === "oldest") {

      result.sort(

        (a, b) =>

          new Date(a.createdAt || 0).getTime() -

          new Date(b.createdAt || 0).getTime()

      );

    }



    if (sort === "expiry") {

      result.sort(

        (a, b) =>

          new Date(a.expiryDate || 0).getTime() -

          new Date(b.expiryDate || 0).getTime()

      );

    }



    return result;

  }, [

    submissions,

    approvedSubmissions,

    rejectedSubmissions,

    activeTab,

    search,

    sort,

  ]);



  const selected =

    filteredSubmissions.find((item) => item.id === selectedId) ||

    getActiveSubmissions().find((item) => item.id === selectedId) ||

    filteredSubmissions[0] ||

    getActiveSubmissions()[0] ||

    null;



  const handleSelectTab = (tab) => {

    setActiveTab(tab);

    setPage(1);

    setSearch("");



    const nextList =

      tab === "Approved"

        ? approvedSubmissions

        : tab === "Rejected"

        ? rejectedSubmissions

        : tab === "All Submissions"

        ? [...submissions, ...approvedSubmissions, ...rejectedSubmissions]

        : submissions;



    setSelectedId(nextList[0]?.id || null);

  };



  const handleApprove = async () => {

    if (!selected?._id || selected.status !== "pending") return;



    try {

      setActionLoading(true);

      setError("");

      setSuccessMessage("");



      await axios.patch(`${API_URL}/${selected._id}/approve`);



      setSuccessMessage(`${selected.medicine} was approved successfully.`);



      await fetchAllMedicines();

    } catch (err) {

      console.error("Error approving medicine:", err);

      setError(

        err.response?.data?.message || "Failed to approve the medicine."

      );

    } finally {

      setActionLoading(false);

    }

  };



  const handleReject = async () => {

    if (!selected?._id || selected.status !== "pending") return;



    try {

      setActionLoading(true);

      setError("");

      setSuccessMessage("");



      await axios.patch(`${API_URL}/${selected._id}/reject`);



      setSuccessMessage(`${selected.medicine} was rejected successfully.`);



      await fetchAllMedicines();

    } catch (err) {

      console.error("Error rejecting medicine:", err);

      setError(

        err.response?.data?.message || "Failed to reject the medicine."

      );

    } finally {

      setActionLoading(false);

    }

  };



  const pendingCount = submissions.length;

  const approvedCount = approvedSubmissions.length;

  const rejectedCount = rejectedSubmissions.length;

  const allCount = pendingCount + approvedCount + rejectedCount;

  const showingCount = filteredSubmissions.length;

  const isPendingSelected = selected?.status === "pending";



  return (

    <main className="verification-page">

      <header className="verification-header">

        <div className="verification-topline">

          <div className="verification-breadcrumb">

            <span>Clinical Operations</span>

            <span className="breadcrumb-dot" />

            <span className="breadcrumb-current">

              Intake Verification Station

            </span>

          </div>



          <div className="verification-badges">

            <span className="pending-summary">

              <span className="pulse-dot" />

              {pendingCount} Pending Review

            </span>



            <span className="protocol-summary">

              <Icon name="shield" size={15} />

              Safety Protocol 4.2 Active

            </span>

          </div>

        </div>



        <div>

          <h1>Verifications</h1>

          <p>

            Review donor medicine submissions before they enter inventory.

          </p>

        </div>



        {successMessage && (

          <div className="verification-message success">{successMessage}</div>

        )}



        {error && (

          <div className="verification-message error">{error}</div>

        )}



        <div className="verification-toolbar">

          <nav

            className="verification-tabs"

            aria-label="Submission status filter"

          >

            {[
            { label: "All Submissions", count: allCount },
            { label: "Pending", count: pendingCount },
            { label: "Approved", count: approvedCount },
            { label: "Rejected", count: rejectedCount },
          ].map((tab) => (
            <button
              key={tab.label}
              type="button"
              className={
                activeTab === tab.label
                  ? "verification-tab active"
                  : "verification-tab"
              }
              onClick={() => handleSelectTab(tab.label)}
            >
              {tab.label}
              <span className="tab-count">{tab.count}</span>
            </button>
          ))}
          </nav>



          <div className="verification-controls">

            <label className="verification-search">

              <Icon name="search" size={16} />

              <input

                type="text"

                value={search}

                onChange={(e) => {

                  setSearch(e.target.value);

                  setPage(1);

                }}

                placeholder="Filter batch, medicine, salt..."

              />

            </label>



            <div className="sort-wrapper">

              <select

                value={sort}

                onChange={(e) => setSort(e.target.value)}

                aria-label="Sort submissions"

              >

                <option value="oldest">Sort: Oldest First (Urgent)</option>

                <option value="newest">Sort: Newest First</option>

                <option value="expiry">Sort: Expiry Date (Soonest)</option>

                <option value="quantity">Sort: Highest Quantity</option>

              </select>

              <Icon name="chevron" size={16} />

            </div>

          </div>

        </div>

      </header>



      <div className="verification-workspace">

        <section className="submission-card">

          <div className="submission-card-header">

            <div className="submission-title-group">

              <div className="submission-icon">

                <Icon name="document" size={20} />

              </div>

              <div>

                <h2>Submission Queue</h2>

                <p>
                  {activeTab === "Pending"
                    ? "Awaiting clinical pharmacist review and batch inspection"
                    : activeTab === "Approved"
                    ? "Approved medicine submissions"
                    : activeTab === "Rejected"
                    ? "Rejected medicine submissions"
                    : "All medicine submissions"}
                </p>

              </div>

            </div>



            <span className="showing-pill">

              {loading ? "Loading..." : `Showing ${showingCount} of ${getActiveSubmissions().length}`}

            </span>

          </div>



          <div className="submission-table-wrapper">

            {loading ? (

              <div className="verification-empty-state">

                Loading pending medicines...

              </div>

            ) : filteredSubmissions.length === 0 ? (

              <div className="verification-empty-state">

                {activeTab === "Approved"
                  ? "No approved medicines found."
                  : activeTab === "Rejected"
                  ? "No rejected medicines found."
                  : activeTab === "All Submissions"
                  ? "No medicine submissions found."
                  : "No pending medicines found."}

              </div>

            ) : (

              <table className="submission-table">

                <thead>

                  <tr>

                    <th>Medicine &amp; Composition</th>

                    <th>Category</th>

                    <th>Quantity</th>

                    <th>Donor / Clinic</th>

                    <th>Submitted</th>

                    <th>Status</th>

                  </tr>

                </thead>



                <tbody>

                  {filteredSubmissions.map((item) => {

                    const isSelected = item.id === selectedId;



                    return (

                      <tr

                        key={item.id}

                        className={isSelected ? "selected-row" : ""}

                        onClick={() => setSelectedId(item.id)}

                      >

                        <td>

                          <div className="medicine-cell">

                            <div

                              className={`medicine-icon ${item.iconTone}`}

                            >

                              <Icon name={item.icon} size={16} />

                            </div>



                            <div>

                              <div className="medicine-name">

                                {item.medicine}

                              </div>

                              <div className="batch-id">#{item.id}</div>

                              <div className="composition">

                                {item.composition}

                              </div>

                            </div>

                          </div>

                        </td>



                        <td>

                          <span

                            className={`category-pill ${item.iconTone}`}

                          >

                            {item.category}

                          </span>

                        </td>



                        <td>

                          <div className="quantity-main">{item.quantity}</div>

                          <div className="quantity-sub">{item.packaging}</div>

                        </td>



                        <td>

                          <div className="donor-name">{item.donor}</div>

                          <div className="donor-type">{item.donorType}</div>

                        </td>



                        <td>

                          <div className="submitted-time">

                            {item.submitted}

                          </div>

                          {item.status === "pending" && (
                            <div className="action-needed">Action Needed</div>
                          )}

                        </td>



                        <td className="status-cell">
                          <span className={`status-pill status-${item.status}`}>
                            <span />
                            {item.status === "approved"
                              ? "APPROVED"
                              : item.status === "rejected"
                              ? "REJECTED"
                              : "PENDING"}
                          </span>
                        </td>

                      </tr>

                    );

                  })}

                </tbody>

              </table>

            )}

          </div>



          <div className="submission-footer">

            <span>

              Showing batch items 1 to {Math.min(6, showingCount)} of {showingCount}

            </span>



            <div className="pagination">

              <button

                type="button"

                disabled={page === 1}

                onClick={() => setPage((value) => Math.max(1, value - 1))}

              >

                Previous

              </button>



              {[1, 2, 3].map((number) => (

                <button

                  type="button"

                  key={number}

                  className={page === number ? "current" : ""}

                  onClick={() => setPage(number)}

                >

                  {number}

                </button>

              ))}



              <button

                type="button"

                onClick={() => setPage((value) => Math.min(3, value + 1))}

              >

                Next

              </button>

            </div>

          </div>

        </section>



        {selected ? (

          <section className="detail-card">

            <div className="detail-header">

              <div>

                <div className="detail-eyebrow">

                  Batch Verification Review <span>#{selected.id}</span>

                </div>



                <h2>{selected.medicine}</h2>

                <p>{selected.composition} • Medicine Submission</p>

              </div>



              <span className={`detail-status detail-status-${selected.status}`}>
                <span />
                {selected.status === "approved"
                  ? "APPROVED"
                  : selected.status === "rejected"
                  ? "REJECTED"
                  : "PENDING REVIEW"}
              </span>

            </div>



            <div className="quick-specs">

              <div>

                <span>Expiry Date</span>

                <strong>{selected.expiry}</strong>

                <small className="validity">

                  Check before approving

                </small>

              </div>



              <div>

                <span>Quantity In Stock</span>

                <strong>{selected.quantity}</strong>

                <small>{selected.packaging}</small>

              </div>

            </div>



            <div className="upload-section">

              <div className="upload-heading">

                <strong>

                  <Icon name="image" size={16} />

                  Donor Batch Upload

                </strong>

                <span>

                  <Icon name="check" size={14} />

                  Filename Saved

                </span>

              </div>



              <div className="inspection-image">

                <div className="blister-pack">

                  <div className="blister-header">

                    <strong>{selected.imageLabel || "MEDICINE"}</strong>

                    <span>RX</span>

                  </div>



                  <div className="blister-pills">

                    {Array.from({ length: 8 }).map((_, index) => (

                      <span key={index} />

                    ))}

                  </div>



                  <div className="blister-footer">

                    <span>LOT: {selected.lot}</span>

                    <span>EXP: {selected.expiry}</span>

                  </div>

                </div>



                <div className="seal-badge">

                  <Icon name="check" size={12} />

                  Image filename available

                </div>

              </div>

            </div>



            <div className="compliance-section">

              <h3>Storage &amp; Clinical Compliance</h3>



              <div className="compliance-box">

                <div>

                  <span>Condition:</span>

                  <strong>{selected.condition}</strong>

                </div>



                <div>

                  <span>Packaging:</span>

                  <p>{selected.packagingDetail}</p>

                </div>



                <div>

                  <span>Donor Note:</span>

                  <p className="donor-note">{selected.donorNote}</p>

                </div>

              </div>

            </div>



            {isPendingSelected && (
            <>
          <div className="rejection-box">

              <div className="rejection-heading">

                <label>

                  <Icon name="warning" size={16} />

                  Rejection Reason

                </label>



                <span>For Review</span>

              </div>



              <select

                value={rejectionReason}

                onChange={(e) => setRejectionReason(e.target.value)}

              >

                <option>Packaging seal broken / damaged</option>

                <option>Batch expiry date within 6 months</option>

                <option>Cold-chain disruption suspected</option>

                <option>Unlabeled or illegible primary packaging</option>

                <option>Medication on national recall register</option>

              </select>



              <textarea

                rows="2"

                value={clinicalNotes}

                onChange={(e) => setClinicalNotes(e.target.value)}

                placeholder="Add specific pharmacist clinical notes..."

              />

            </div>



            <div className="detail-actions">

              <button

                type="button"

                className="approve-button"

                onClick={handleApprove}

                disabled={actionLoading}

              >

                <Icon name="check" size={16} />

                {actionLoading ? "Processing..." : "Approve & Continue"}

              </button>



              <button

                type="button"

                className="reject-button"

                onClick={handleReject}

                disabled={actionLoading}

              >

                <Icon name="close" size={14} />

                {actionLoading ? "Processing..." : "Reject Submission"}

              </button>

            </div>



              </>
          )}

          <div className="audit-footer">

              <span>

                Reviewed by: <strong>Partner Pharmacist</strong>

              </span>

              <span>Status is managed by the verification workflow</span>

            </div>

          </section>

        ) : (

          <section className="detail-card empty-detail-card">

            <h2>No Medicine Selected</h2>

            <p>Select a pending medicine from the submission queue.</p>

          </section>

        )}

      </div>

    </main>

  );

}


