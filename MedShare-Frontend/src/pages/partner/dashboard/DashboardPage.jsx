import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DashboardPage.css";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5001/api";

const iconMap = {
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),

  box: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  ),

  clipboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
      />
    </svg>
  ),

  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
};

const getStatusColor = (status) => {
  if (status === "pending") return "amber";
  if (status === "approved") return "sky";
  if (status === "rejected") return "rose";
  return "sky";
};

const getActionText = (status) => {
  if (status === "pending") return "Review";
  if (status === "approved") return "View Approved";
  if (status === "rejected") return "View Rejected";
  return "View";
};

const formatRelativeTime = (dateValue) => {
  if (!dateValue) return "Recently";

  const createdAt = new Date(dateValue);
  if (Number.isNaN(createdAt.getTime())) return "Recently";

  const difference = Date.now() - createdAt.getTime();
  const minutes = Math.floor(difference / (1000 * 60));

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min${minutes === 1 ? "" : "s"} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;

  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;

  return createdAt.toLocaleDateString();
};

const formatMedicineDetail = (medicine) => {
  const expiry = medicine.expiryDate
    ? new Date(medicine.expiryDate).toLocaleDateString("en-GB", {
        month: "2-digit",
        year: "numeric",
      })
    : "N/A";

  const quantity = medicine.quantity ?? 0;

  return `Exp: ${expiry} • Qty: ${quantity}`;
};

const getDonorName = (medicine) => {
  if (medicine.donor && typeof medicine.donor === "object") {
    return medicine.donor.name || medicine.donor.email || "Donor";
  }

  return "Donor information unavailable";
};

const normalizeResponse = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.medicines)) return data.medicines;
  if (Array.isArray(data.data)) return data.data;
  return [];
};

export default function DashboardPage({ userName = "Dr. Sarah Jenkins" }) {
  const navigate = useNavigate();

  const [pendingMedicines, setPendingMedicines] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [pendingResponse, approvedResponse, rejectedResponse] =
          await Promise.all([
            axios.get(`${API_BASE_URL}/partner/medicines/pending`),
            axios.get(`${API_BASE_URL}/partner/medicines/approved`),
            axios.get(`${API_BASE_URL}/partner/medicines/rejected`),
          ]);

        const pending = normalizeResponse(pendingResponse.data);
        const approved = normalizeResponse(approvedResponse.data);
        const rejected = normalizeResponse(rejectedResponse.data);

        setPendingMedicines(pending);

        const allMedicines = [
          ...pending.map((medicine) => ({
            ...medicine,
            dashboardStatus: "pending",
          })),
          ...approved.map((medicine) => ({
            ...medicine,
            dashboardStatus: "approved",
          })),
          ...rejected.map((medicine) => ({
            ...medicine,
            dashboardStatus: "rejected",
          })),
        ];

        const latestActivity = allMedicines
          .sort((a, b) => {
            const dateA = new Date(a.createdAt || 0).getTime();
            const dateB = new Date(b.createdAt || 0).getTime();
            return dateB - dateA;
          })
          .slice(0, 5);

        setActivity(latestActivity);
      } catch (err) {
        console.error("Dashboard API error:", err);
        setError(
          "Unable to load dashboard data. Please make sure the backend server is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = [
    {
      label: "Pending Verifications",
      value: loading ? "..." : pendingMedicines.length,
      sub: loading
        ? "Loading..."
        : pendingMedicines.length === 0
        ? "No medicines waiting for review"
        : "Medicines waiting for clinical review",
      subColor: pendingMedicines.length > 0 ? "amber" : "",
      iconBg: "amber",
      icon: "clock",
    },
    {
      label: "Items in Inventory",
      value: "—",
      unit: "units",
      sub: "Inventory feature not connected yet",
      iconBg: "teal",
      icon: "box",
    },
    {
      label: "Pending Requests",
      value: "—",
      sub: "Patient request feature not connected yet",
      subColor: "blue",
      iconBg: "sky",
      icon: "clipboard",
    },
    {
      label: "Scheduled Pickups",
      value: "—",
      sub: "Pickup feature not connected yet",
      iconBg: "purple",
      icon: "calendar",
    },
  ];

  const handleActivityAction = (status) => {
    navigate("/partner/verifications", {
      state: { filter: status },
    });
  };

  return (
    <div className="pd-body">
      <section className="pd-welcome">
        <div>
          <h2>Welcome back, {userName}</h2>
          <p>
            Here&apos;s what needs your clinical attention today across intake,
            storage, and hospital allocation.
          </p>
        </div>

        <button
          className="pd-cta"
          onClick={() => navigate("/partner/verifications")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Verify New Batch</span>
        </button>
      </section>

      {error && <div className="pd-dashboard-error">{error}</div>}

      <section className="pd-stats">
        {stats.map((s) => (
          <div className="pd-stat-card" key={s.label}>
            <div className="pd-stat-top">
              <span className="pd-stat-label">{s.label}</span>

              <div className={`pd-stat-icon pd-icon-${s.iconBg}`}>
                {iconMap[s.icon]}
              </div>
            </div>

            <div className="pd-stat-bottom">
              <div className="pd-stat-value">
                {s.value}{" "}
                {s.unit && <span className="pd-stat-unit">{s.unit}</span>}
              </div>

              <p
                className={`pd-stat-sub ${
                  s.subColor ? `pd-sub-${s.subColor}` : ""
                }`}
              >
                {s.sub}
              </p>
            </div>
          </div>
        ))}
      </section>

      <section className="pd-alert-banner">
        <div className="pd-alert-left">
          <div className="pd-alert-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <div>
            <h3>
              {pendingMedicines.length > 0
                ? `Attention Required: ${pendingMedicines.length} verification${
                    pendingMedicines.length === 1 ? "" : "s"
                  } waiting for review`
                : "No Pending Verifications"}
            </h3>

            <p>
              {pendingMedicines.length > 0
                ? "Review pending medicine submissions from the Partner Verification page."
                : "All currently submitted medicines have been reviewed."}
            </p>
          </div>
        </div>

        <div className="pd-alert-actions">
          <button
            className="pd-alert-btn"
            onClick={() => navigate("/partner/verifications")}
          >
            {pendingMedicines.length > 0 ? "Review Now" : "View Verifications"}
          </button>
        </div>
      </section>

      <section className="pd-activity">
        <div className="pd-activity-header">
          <div className="pd-activity-title">
            <div className="pd-activity-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>

            <h3>Recent Clinical Activity</h3>
          </div>

          <button
            type="button"
            className="pd-view-all pd-view-all-button"
            onClick={() => navigate("/partner/verifications")}
          >
            View All →
          </button>
        </div>

        <div className="pd-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Medicine &amp; Category</th>
                <th>Medicine Details</th>
                <th>Submitted By / Donor</th>
                <th>Timestamp</th>
                <th>Clinical Status</th>
                <th className="pd-th-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="pd-table-message">
                    Loading recent clinical activity...
                  </td>
                </tr>
              ) : activity.length === 0 ? (
                <tr>
                  <td colSpan="6" className="pd-table-message">
                    No medicine activity found.
                  </td>
                </tr>
              ) : (
                activity.map((item) => {
                  const statusColor = getStatusColor(item.dashboardStatus);

                  return (
                    <tr key={item._id}>
                      <td>
                        <div className="pd-med-cell">
                          <div
                            className={`pd-med-icon pd-icon-${statusColor}`}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>

                          <div>
                            <p className="pd-med-name">{item.name}</p>
                            <span className="pd-med-category">
                              {item.category}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <p className="pd-batch-id">
                          ID: {item._id ? item._id.slice(-8) : "N/A"}
                        </p>
                        <p className="pd-batch-detail">
                          {formatMedicineDetail(item)}
                        </p>
                      </td>

                      <td className="pd-donor">{getDonorName(item)}</td>

                      <td className="pd-time">
                        {formatRelativeTime(item.createdAt)}
                      </td>

                      <td>
                        <span
                          className={`pd-status pd-status-${statusColor}`}
                        >
                          <span className="pd-status-dot" />
                          {item.dashboardStatus.toUpperCase()}
                        </span>
                      </td>

                      <td className="pd-th-right">
                        <button
                          className={
                            item.dashboardStatus === "pending"
                              ? "pd-action-primary"
                              : "pd-action-secondary"
                          }
                          onClick={() =>
                            handleActivityAction(item.dashboardStatus)
                          }
                        >
                          {getActionText(item.dashboardStatus)}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
