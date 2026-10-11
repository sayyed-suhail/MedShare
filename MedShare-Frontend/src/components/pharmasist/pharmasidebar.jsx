import React from "react";
import { NavLink } from "react-router-dom";
import "./pharmasidebar.css";

export default function PharmacistSidebar({
  activeItem = "Dashboard",
  pendingVerifications = 0,
  pendingRequests = 0,
  isOpen = false,
  onClose,
}) {
  const navItems = [
    {
      label: "Dashboard",
      icon: "grid",
      path: "/partner/dashboard",
    },
    {
      label: "Verifications",
      icon: "shield",
      path: "/partner/verifications",
      badge: pendingVerifications,
      badgeColor: "amber",
    },
    {
      label: "Inventory",
      icon: "box",
      path: "/partner/inventory",
    },
    {
      label: "Schedule Pickup",
      icon: "calendar",
      path: "/partner/schedule-pickup",
    },
    {
      label: "Patient Requests",
      icon: "heart",
      path: "/partner/patient-requests",
      badge: pendingRequests,
      badgeColor: "blue",
    },
   
  ];

  const renderIcon = (icon) => {
    switch (icon) {
      case "grid":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
        );

      case "shield":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        );

      case "box":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        );

      case "calendar":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        );

      case "heart":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        );

      case "search":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <aside
      className={`ps-sidebar ${isOpen ? "ps-sidebar-open" : ""}`}
    >
      {/* =====================================================
          TOP SECTION
      ===================================================== */}

      <div>
        <div className="ps-brand">
          <div className="ps-brand-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5S10.5 4.17 10.5 5v5.5H5c-.83 0-1.5.67-1.5 1.5S4.17 13.5 5 13.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5S19.83 10.5 19 10.5z" />
            </svg>
          </div>

          <div>
            <h1 className="ps-brand-name">
              MedShare
            </h1>

            <span className="ps-brand-sub">
              Clinical Clarity
            </span>
          </div>

          {/* Mobile close button */}
          <button
            type="button"
            className="ps-close-btn"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            ×
          </button>
        </div>

        {/* =====================================================
            NAVIGATION
        ===================================================== */}

        <nav
          className="ps-nav"
          aria-label="Pharmacist Sidebar Menu"
        >
          {navItems.map((item) => {
            const isActive = item.label === activeItem;

            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `ps-nav-item ${isActive ? "active" : ""}`
                }
                aria-current={isActive ? "page" : undefined}
                onClick={onClose}
              >
                <div className="ps-nav-item-left">
                  <span className="ps-nav-icon">
                    {renderIcon(item.icon)}
                  </span>

                  <span>
                    {item.label}
                  </span>
                </div>

                {item.badge > 0 && (
                  <span
                    className={`ps-badge ps-badge-${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* =====================================================
          BOTTOM SECTION
      ===================================================== */}

      <div className="ps-sidebar-bottom">
        <a
          href="#"
          className="ps-nav-item ps-nav-item-secondary"
          onClick={onClose}
        >
          <span className="ps-nav-item-left">
            <span className="ps-nav-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </span>

            <span>
              Settings
            </span>
          </span>
        </a>

        <a
          href="#"
          className="ps-nav-item ps-nav-item-secondary"
          onClick={onClose}
        >
          <span className="ps-nav-item-left">
            <span className="ps-nav-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>

            <span>
              Support &amp; Guidelines
            </span>
          </span>
        </a>
      </div>
    </aside>
  );
}