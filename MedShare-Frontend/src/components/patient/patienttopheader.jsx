import React from "react";
import { useNavigate } from "react-router-dom";
import "./PatientTopHeader.css";

function PatientTopHeader() {
  const navigate = useNavigate();

  const patient = {
    name: "Marcus Rivera",
    location: "Geneva Regional #8841",
    initials: "MR",
  };

  return (
    <header className="patient-top-header">
      <div className="patient-header-search-wrapper">
        <div className="patient-header-search">
          <svg className="patient-header-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input type="text" placeholder="Search available medicines, salts, or active requests..." />
          <kbd>⌘K</kbd>
        </div>
      </div>

      <div className="patient-header-actions">
        <div className="patient-hub-status">
          <span className="patient-hub-dot"></span>
          <span>Hub Network Live</span>
        </div>

        <button
          type="button"
          className="patient-request-button"
          onClick={() => navigate("/patient/find-medicine")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Request Medicine</span>
        </button>

        <div className="patient-header-divider"></div>

        <button type="button" className="patient-header-icon-button" aria-label="Notifications">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          <span className="patient-notification-dot"></span>
        </button>

        <button type="button" className="patient-header-icon-button" aria-label="Dispensary Support">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
        </button>

        <div className="patient-header-divider"></div>

        <button
          type="button"
          className="patient-header-profile"
          onClick={() => navigate("/patient/profile")}
        >
          <span className="patient-header-avatar-wrapper">
            <span className="patient-header-avatar">{patient.initials}</span>
            <span className="patient-online-dot"></span>
          </span>

          <span className="patient-header-profile-info">
            <span className="patient-header-name">{patient.name}</span>
            <span className="patient-header-location">{patient.location}</span>
          </span>

          <svg className="patient-header-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default PatientTopHeader;
