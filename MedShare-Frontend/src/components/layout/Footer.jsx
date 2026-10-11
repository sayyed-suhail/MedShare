import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="container">
          <div className="trust-section">
            <p className="label-md trust-label">
              Trusted by Healthcare Leaders
            </p>
            <div className="trust-logos">
              <div className="trust-logo">
                <span className="material-symbols-outlined">
                  local_hospital
                </span>{" "}
                CityHealth
              </div>
              <div className="trust-logo">
                <span className="material-symbols-outlined">medication</span>{" "}
                PharmaTrust
              </div>
              <div className="trust-logo">
                <span className="material-symbols-outlined">healing</span>{" "}
                CareNet NGO
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="brand">
              <span className="brand-name">MedShare</span>
            </div>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Contact</a>
            </div>
            <p className="body-sm footer-copy">
              &copy; 2024 MedShare. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
