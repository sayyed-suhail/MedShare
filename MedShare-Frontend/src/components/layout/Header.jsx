import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div>
      <header className="header">
        <div className="brand">
          <span className="brand-name">MedShare</span>
        </div>
        <div className="header-actions">
          <button aria-label="Notifications" className="icon-btn">
            <span className="material-symbols-outlined">notifications</span>
          </button>

          <ul>
            <Link to="/login" className="login-link">
              <span className="material-symbols-outlined">person</span>
            </Link>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
