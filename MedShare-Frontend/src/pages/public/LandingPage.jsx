import "./LandingPage.css";
// import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Header from "../../components/layout/Header";

export default function LandingPage() {
  return (
    <>
      {/* TopAppBar Component */}
      <Header /> 

      <main className="main">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-text">
            <div className="hero-heading-group">
              <span className="eyebrow">Clinical Clarity. Community Care.</span>
              <h1 className="display-lg">
                Give Health,
                <br />
                <span className="text-primary">Share Hope</span>
              </h1>
              <p className="body-lg hero-desc">
                Bridging the gap between surplus unexpired medication and
                patients in urgent need. A secure, verified platform ensuring
                safe distribution of vital healthcare resources.
              </p>
            </div>
            <div className="hero-buttons">
              <button className="btn btn-primary">Get Started</button>
              <button className="btn btn-secondary">Learn More</button>
            </div>
          </div>
          <div className="hero-image-wrap">
            <div
              className="hero-image"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBYUbN19UhuUH82fhOwEqZ2CjrYZJKOHpJZNHqRggk12-ArX6s7zJfZx7FRAAlcoy3cc3m3JSqxb5VBfC8ygdMZ9zWcYk46JDAN-uGOrEf5tCfb5JyZN2QywAqQ8covJBZTti-vlFodPgvpX8P3tZb0LAf72eJ_KrfB5Fm1H4A44iaFJYOyI61gIHcF43tz3EPSXcvBsFi0Be2vQJiLY7w8WNs-sln9VSp8HzXIO-MBqezAH4H-tI5wIQ')",
              }}
            ></div>
          </div>
        </section>

        {/* Choose Your Path */}
        <section className="paths">
          <div className="container">
            <div className="section-heading">
              <h2 className="headline-lg">Choose Your Path</h2>
              <p className="body-md">
                Join our network to contribute, verify, or access essential
                medications.
              </p>
            </div>
            <div className="cards-grid">
              {/* Card 1: Donor */}
              <div className="card">
                <div className="card-icon card-icon--primary">
                  <span className="material-symbols-outlined">
                    volunteer_activism
                  </span>
                </div>
                <h3 className="headline-md">Donate Medicine</h3>
                <p className="body-sm card-desc">
                  Have unused, unexpired medications? Safely donate them to help
                  individuals who cannot afford their prescriptions.
                </p>
                <button className="card-link card-link--primary">
                  Start Donating{" "}
                  <span className="material-symbols-outlined arrow-icon">
                    arrow_forward
                  </span>
                </button>
              </div>

              {/* Card 2: Pharmacist/NGO */}
              <div className="card card--decorated">
                <div className="card-decoration"></div>
                <div className="card-icon card-icon--secondary">
                  <span className="material-symbols-outlined">
                    verified_user
                  </span>
                </div>
                <h3 className="headline-md">Verify as Partner</h3>
                <p className="body-sm card-desc">
                  Licensed pharmacists and registered NGOs ensure quality
                  control. Join to verify donations and manage local
                  distribution.
                </p>
                <button className="card-link card-link--secondary">
                  Apply for Verification{" "}
                  <span className="material-symbols-outlined arrow-icon">
                    arrow_forward
                  </span>
                </button>
              </div>

              {/* Card 3: Patient */}
              <div className="card">
                <div className="card-icon card-icon--neutral">
                  <span className="material-symbols-outlined">
                    search_check
                  </span>
                </div>
                <h3 className="headline-md">Find Medicine</h3>
                <p className="body-sm card-desc">
                  Search our verified inventory for medications you need.
                  Connect with local partner pharmacies for safe pickup.
                </p>
                <button className="card-link card-link--neutral">
                  Search Inventory{" "}
                  <span className="material-symbols-outlined arrow-icon">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="process">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">The Process</span>
              <h2 className="headline-lg">How MedShare Works</h2>
              <p className="body-md">
                A secure, transparent pipeline from surplus to patient.
              </p>
            </div>
            <div className="process-steps">
              <div className="process-line"></div>

              <div className="step">
                <div className="step-circle">
                  <span className="material-symbols-outlined step-icon step-icon--primary">
                    box
                  </span>
                </div>
                <h4 className="headline-md">1. Secure Donation</h4>
                <p className="body-sm step-desc">
                  Donors register unexpired medications and drop them off at
                  designated secure collection points.
                </p>
              </div>

              <div className="step">
                <div className="step-circle">
                  <span className="material-symbols-outlined step-icon step-icon--secondary">
                    fact_check
                  </span>
                </div>
                <h4 className="headline-md">2. Clinical Verification</h4>
                <p className="body-sm step-desc">
                  Licensed pharmacists meticulously inspect each item for
                  integrity, expiry, and safety compliance.
                </p>
              </div>

              <div className="step">
                <div className="step-circle">
                  <span className="material-symbols-outlined step-icon step-icon--primary">
                    health_and_safety
                  </span>
                </div>
                <h4 className="headline-md">3. Safe Distribution</h4>
                <p className="body-sm step-desc">
                  Verified medications are added to the platform for registered
                  patients to reserve and pick up.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      
    </>
  );
}
