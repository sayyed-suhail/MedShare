import React, { useState } from "react";
import "./DashboardPage.css";

const suggestedMedicines = [
  "Amoxicillin 500mg",
  "Metformin 850mg",
  "Insulin Glargine",
  "Salbutamol Inhaler",
];

const stats = [
  {
    title: "Active Requests",
    value: "2",
    description: "1 under review · 1 allocation assigned",
    icon: "⌛",
    iconClass: "yellow",
  },
  {
    title: "Ready for Collection",
    value: "1",
    description: "Geneva Central Hub · Bay 3 (Pick up by Nov 3)",
    icon: "📦",
    iconClass: "blue",
  },
  {
    title: "Completed / Collected",
    value: "6",
    description: "All courses verified by Dr. Sarah Jenkins",
    icon: "✓",
    iconClass: "green",
  },
];

const recentRequests = [
  {
    medicine: "Amoxicillin 500mg",
    details: "Capsules, 21 units",
    quantity: "1 Course (21 caps)",
    date: "Oct 28, 2023",
    hub: "Geneva Central Medical Hub",
    status: "Ready for Pickup",
    statusClass: "ready",
    reason: "",
  },
  {
    medicine: "Metformin 850mg",
    details: "Film-coated, 60 tabs",
    quantity: "2 Packs (60 tabs)",
    date: "Oct 29, 2023",
    hub: "West District NGO Depot",
    status: "Pending Verification",
    statusClass: "pending",
    reason: "",
  },
  {
    medicine: "Insulin Glargine 100 IU/ml",
    details: "Solostar Pen, 3ml",
    quantity: "2 Pens",
    date: "Oct 27, 2023",
    hub: "Vault Cold Storage #2",
    status: "Approved",
    statusClass: "approved",
    reason: "",
  },
  {
    medicine: "Salbutamol Inhaler 100mcg",
    details: "Metered dose",
    quantity: "1 Inhaler",
    date: "Oct 22, 2023",
    hub: "HopeHealth Center",
    status: "Collected",
    statusClass: "collected",
    reason: "",
  },
  {
    medicine: "Azithromycin 250mg",
    details: "Film-coated tablets",
    quantity: "1 Pack (6 tabs)",
    date: "Oct 18, 2023",
    hub: "North Health Sub-depot",
    status: "Rejected",
    statusClass: "rejected",
    reason: "Prescription renewal required",
  },
];

function DashboardPage() {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();

    if (!searchText.trim()) {
      alert("Please enter a medicine name.");
      return;
    }

    alert(`Searching for: ${searchText}`);
  };

  const handleSuggestedMedicine = (medicine) => {
    setSearchText(medicine);
  };

  const handleCollection = () => {
    alert(
      "Collection Code: MED-8841-A\nPresent this code at Geneva Central Hub, Bay 3."
    );
  };

  return (
    <div className="patient-dashboard">
      {/* Welcome Section */}
      <header className="welcome-section">
        <div className="welcome-content">
          <div className="workspace-label">
            <span className="status-dot"></span>
            Patient Workspace • Geneva Dispensary Network
          </div>

          <h1>
            Welcome back, <span>Marcus</span>
          </h1>

          <p>
            Search for medicine, track your requests, and manage your
            collections across verified partner pharmacies.
          </p>
        </div>

        <div className="patient-id">
          <span className="verified-icon">✓</span>
          <div>
            <strong>Patient ID #BEN-8841</strong>
            <span> · Verified Beneficiary</span>
          </div>
        </div>
      </header>

      {/* Pickup Banner */}
      <section className="pickup-banner">
        <div className="pickup-info">
          <div className="pickup-icon">🚚</div>

          <div>
            <span className="pickup-title">
              Pickup Ready at Geneva Central Medical Hub (Bay 3)
            </span>

            <p>
              Amoxicillin 500mg (Code: <strong>#MED-8841-A</strong>).
              Operating hours: Mon–Fri 08:30 – 17:00.
            </p>
          </div>
        </div>

        <button className="primary-button" onClick={handleCollection}>
          <span>▣</span>
          View Collection QR & Instructions
        </button>
      </section>

      {/* Medicine Search */}
      <section className="search-card">
        <div className="search-heading">
          <h2>Looking for a medicine?</h2>
          <p>
            Search across 1,420+ verified donated medications and salt
            compositions in local NGO dispensaries.
          </p>
        </div>

        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-input-wrapper">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search by medicine name, salt composition (e.g., Amoxicillin, Metformin, Insulin)..."
            />
          </div>

          <button className="primary-button search-button" type="submit">
            Find Medicine
            <span>→</span>
          </button>
        </form>

        <div className="suggested-lookups">
          <span>Suggested lookups:</span>

          {suggestedMedicines.map((medicine) => (
            <button
              key={medicine}
              type="button"
              onClick={() => handleSuggestedMedicine(medicine)}
            >
              {medicine}
            </button>
          ))}
        </div>
      </section>

      {/* Statistics */}
      <section className="stats-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.title}>
            <div className="stat-top">
              <span>{stat.title}</span>
              <div className={`stat-icon ${stat.iconClass}`}>
                {stat.icon}
              </div>
            </div>

            <div className="stat-value">{stat.value}</div>
            <p>{stat.description}</p>
          </div>
        ))}
      </section>

      {/* Recent Requests */}
      <section className="requests-card">
        <div className="requests-header">
          <div>
            <h2>Recent Requests</h2>
            <p>
              Real-time verification and fulfillment status of your medication
              claims
            </p>
          </div>

          <a href="#all-requests">View All Requests →</a>
        </div>

        {/* Desktop / Tablet Table */}
        <div className="requests-table-wrapper">
          <table className="requests-table">
            <thead>
              <tr>
                <th>Medicine Details</th>
                <th>Requested Qty</th>
                <th>Request Date</th>
                <th>Dispensary Hub</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {recentRequests.map((request) => (
                <tr key={request.medicine}>
                  <td>
                    <strong>{request.medicine}</strong>
                    <span>{request.details}</span>
                  </td>

                  <td>{request.quantity}</td>

                  <td className="muted-text">{request.date}</td>

                  <td>{request.hub}</td>

                  <td>
                    <div className="status-column">
                      <span className={`status-badge ${request.statusClass}`}>
                        {request.status}
                      </span>

                      {request.reason && (
                        <small>{request.reason}</small>
                      )}
                    </div>
                  </td>

                  <td className="action-cell">
                    <a href={`#${request.statusClass}`}>View →</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="mobile-request-list">
          {recentRequests.map((request) => (
            <div className="mobile-request" key={request.medicine}>
              <div className="mobile-request-top">
                <div>
                  <strong>{request.medicine}</strong>
                  <span>
                    {request.quantity} · {request.date}
                  </span>
                </div>

                <span className={`status-badge ${request.statusClass}`}>
                  {request.status === "Pending Verification"
                    ? "Pending"
                    : request.status}
                </span>
              </div>

              <p>Hub: {request.hub}</p>

              {request.reason && (
                <p className="rejected-reason">Reason: {request.reason}</p>
              )}

              <div className="mobile-view">
                <a href={`#${request.statusClass}`}>View details →</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
