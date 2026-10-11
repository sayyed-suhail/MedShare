import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./PatientSidebar.css";

const menuItems = [
  {
    label: "Dashboard",
    path: "/patient/DashboardPage",
    icon: "dashboard",
  },
  {
    label: "Find Medicine",
    path: "/patient/find-medicine",
    icon: "search",
  },
  {
    label: "My Requests",
    path: "/patient/my-requests",
    icon: "requests",
    badge: 1,
  },
  {
    label: "Pickup / Collection",
    path: "/patient/pickup",
    icon: "pickup",
  },
  {
    label: "Profile / Settings",
    path: "/patient/profile",
    icon: "profile",
  },
];

function SidebarIcon({ type }) {
  if (type === "dashboard") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect fill="currentColor" fillOpacity="0.2" x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    );
  }

  if (type === "search") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="11" cy="11" r="7" />
        <line strokeLinecap="round" x1="16.65" x2="21" y1="16.65" y2="21" />
      </svg>
    );
  }

  if (type === "requests") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 0 2-2h2a2 2 0 0 0 2 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "pickup") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PatientSidebar() {
  const navigate = useNavigate();

  const patient = {
    name: "Marcus Rivera",
    beneficiaryId: "#BEN-8841",
    role: "Patient",
    initials: "MR",
  };

  const handleLogout = () => {
    // Add your logout logic here later.
    navigate("/login");
  };

  return (
    <aside className="patient-sidebar">
      <div className="patient-sidebar-top">
        {/* Brand */}
        <div className="patient-brand">
          <div className="patient-brand-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.5 4a1.5 1.5 0 0 1 3 0v4.5H18a1.5 1.5 0 0 1 0 3h-4.5V16a1.5 1.5 0 0 1-3 0v-4.5H6a1.5 1.5 0 0 1 0-3h4.5V4z" />
              <circle
                cx="12"
                cy="12"
                r="9"
                fill="none"
                stroke="currentColor"
                strokeDasharray="2 2"
                strokeWidth="1.8"
                opacity="0.4"
              />
            </svg>
          </div>

          <div className="patient-brand-text">
            <span className="patient-brand-name">MedShare</span>
            <span className="patient-brand-subtitle">Clinical Clarity</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="patient-navigation-section">
          <div className="patient-portal-heading">
            <span>Patient Portal</span>
            <span className="patient-verified">Verified</span>
          </div>

          <nav className="patient-nav">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/patient"}
                className={({ isActive }) =>
                  `patient-nav-item ${isActive ? "active" : ""}`
                }
              >
                <span className="patient-nav-icon">
                  <SidebarIcon type={item.icon} />
                </span>

                <span>{item.label}</span>

                {item.badge && (
                  <span className="patient-nav-badge">{item.badge}</span>
                )}

                {item.path === "/patient" && (
                  <span className="patient-active-dot" />
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom Patient Profile + Logout */}
      <div className="patient-sidebar-bottom">
        <button
          type="button"
          className="patient-mini-profile"
          onClick={() => navigate("/patient/profile")}
        >
          <span className="patient-avatar">{patient.initials}</span>

          <span className="patient-mini-profile-info">
            <span className="patient-mini-profile-name">{patient.name}</span>
            <span className="patient-mini-profile-id">
              {patient.beneficiaryId} · {patient.role}
            </span>
          </span>
        </button>

        <div className="patient-logout-divider" />

        <button
          type="button"
          className="patient-logout"
          onClick={handleLogout}
        >
          <span className="patient-logout-icon">
            <LogoutIcon />
          </span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default PatientSidebar;
