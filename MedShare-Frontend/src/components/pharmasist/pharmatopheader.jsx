import React from "react";
import "./pharmatopheader.css";

export default function TopHeader({
  userName = "Dr. Sarah Jenkins",
  userRole = "Verified Pharmacist",
  avatarUrl = "",
  onMenuClick,
}) {
  return (
    <header className="pth-header">

      {/* Mobile menu button */}
      <button
        type="button"
        className="pth-menu-btn"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div className="pth-left">
        <div className="pth-search">
          <input
            type="text"
            placeholder="Search medicines, batches, donors, requests..."
          />
        </div>

        <span className="pth-panel-badge">
          Pharmacist
        </span>
      </div>

      <div className="pth-actions">

        <button
          className="pth-bell"
          aria-label="Notifications"
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
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>

          <span className="pth-bell-dot" />
        </button>

        <div className="pth-divider" />

        <div className="pth-profile">

          <div className="pth-avatar-wrap">

            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={userName}
                className="pth-avatar pth-avatar-img"
              />
            ) : (
              <div className="pth-avatar" />
            )}

            <span
              className="pth-avatar-status"
              title="Active Pharmacist"
            />

          </div>

          <div className="pth-profile-info">
            <p className="pth-profile-name">
              {userName}
            </p>

            <p className="pth-profile-role">
              {userRole}
            </p>
          </div>

        </div>
      </div>
    </header>
  );
}