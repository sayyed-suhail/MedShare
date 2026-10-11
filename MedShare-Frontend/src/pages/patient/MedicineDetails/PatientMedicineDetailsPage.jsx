import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientMedicineDetailsPage.css";

function PatientMedicineDetailsPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleRequestMedicine = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1200);
  };

  return (
    <main className="medicine-details-page">
      <div className="medicine-details-container">

        {/* Top Navigation */}
        <div className="top-navigation">

          <div className="breadcrumb">

            <button
              className="back-button"
              type="button"
              onClick={() => navigate("/patient/find-medicine")}
            >
              <span className="material-symbols-outlined">
                arrow_back
              </span>

              <span>Back to Find Medicine</span>
            </button>

            <span className="separator">/</span>

            <span className="breadcrumb-category">
              Antibiotics
            </span>

            <span className="separator">/</span>

            <span className="current-page">
              Amoxicillin 500mg
            </span>

          </div>

          <div className="verified-batch">

            <span className="status-dot"></span>

            <span className="material-symbols-outlined">
              verified
            </span>

            <span>Verified Batch #AMX-2024-91</span>

            <span className="separator">•</span>

            <span className="aid-stock">
              NGO Humanitarian Aid Stock
            </span>

          </div>

        </div>

        {/* Main Medicine Card */}
        <section className="main-medicine-card">

          <div className="medicine-content">

            {/* LEFT SIDE */}
            <div className="medicine-left">

              {/* Medicine Image */}
              <div className="medicine-image-container">

                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3UQArOvcmlT3xsv0sLPukFZEkJ5oAU6bhIsS5Dabg-ZpW2tlqdvma7Dw5einCYsuU4N5S6MbXH2HCUObdQgPh7xV9ueMGHKSCyIj-ZbxjgvQQhN_hYAYNcZOoR8R9QsYgEWMBq6Ue22LPVBMyCVo5Kdy6H34_5iGHUwWre8x2mt5wUkcIINhcHnngb6Gysii95BnB8lWhzFJnG55iNymMtKaALC7n5vr5FnQ7iN9cH4kndjlsVeSaw"
                  alt="Amoxicillin 500mg Capsules"
                />

                <div className="lab-badge">
                  <span className="material-symbols-outlined">
                    medical_services
                  </span>

                  <span>Lab Inspected</span>
                </div>

                <div className="batch-badge">
                  <span className="material-symbols-outlined">
                    qr_code_2
                  </span>

                  <span>Batch Serial Tracked</span>
                </div>

              </div>

              {/* Metadata */}
              <div className="metadata-grid">

                <div className="metadata-card">
                  <div className="metadata-title">
                    <span className="material-symbols-outlined">
                      verified_user
                    </span>

                    <span>Authenticity</span>
                  </div>

                  <p>QR Sealed &amp; Intact</p>
                </div>

                <div className="metadata-card">
                  <div className="metadata-title">
                    <span className="material-symbols-outlined">
                      factory
                    </span>

                    <span>Manufacturer</span>
                  </div>

                  <p>MediPharm Labs Ltd.</p>
                </div>

                <div className="metadata-card">
                  <div className="metadata-title">
                    <span className="material-symbols-outlined">
                      fingerprint
                    </span>

                    <span>NDC Code</span>
                  </div>

                  <p>58177-123-30</p>
                </div>

              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="medicine-right">

              {/* Medicine Badges */}
              <div className="medicine-badges">

                <span className="medicine-badge antibiotic">
                  <span className="material-symbols-outlined">
                    medication
                  </span>

                  Antibiotic
                </span>

                <span className="medicine-badge available">
                  <span className="badge-dot"></span>

                  Available (42 packs in stock)
                </span>

                <span className="medicine-badge formulation">
                  Oral Formulation
                </span>

              </div>

              {/* Medicine Name */}
              <div className="medicine-heading">

                <h1>Amoxicillin 500mg Capsules</h1>

                <p className="medicine-subtitle">
                  <span>Amoxicillin Trihydrate USP</span>

                  <span>•</span>

                  <span>Oral Solid Dosage Form</span>
                </p>

                <p className="medicine-course">
                  Course of 21 Hard Gelatin Capsules
                  (3 × 7 Blister Strip)
                </p>

              </div>

              {/* Subsidy */}
              <div className="subsidy-box">

                <div>
                  <div className="subsidy-label">
                    Patient Subsidy Status
                  </div>

                  <div className="price-container">

                    <span className="free-price">
                      Free ($0.00)
                    </span>

                    <span className="regular-price">
                      $28.50 Regular Retail
                    </span>

                  </div>
                </div>

                <div className="fund-box">

                  <span className="material-symbols-outlined">
                    volunteer_activism
                  </span>

                  <span>
                    Covered by Global Health Relief Fund
                  </span>

                </div>

              </div>

              {/* Prescription Warning */}
              <div className="prescription-warning">

                <span className="material-symbols-outlined">
                  assignment_late
                </span>

                <div>
                  <strong>Prescription Required</strong>

                  <p>
                    Requires a valid digital prescription or signed Rx
                    scan from a licensed physician during the request
                    submission.
                  </p>
                </div>

              </div>

              {/* Storage + Expiry */}
              <div className="information-grid">

                <div className="information-box">

                  <span className="material-symbols-outlined">
                    thermostat
                  </span>

                  <div>
                    <strong>Storage Protocol</strong>

                    <p>
                      Controlled Room Temp (15°C–25°C).
                      Keep dry and protected from direct sunlight.
                    </p>
                  </div>

                </div>

                <div className="information-box">

                  <span className="material-symbols-outlined">
                    event_available
                  </span>

                  <div>
                    <strong>Batch Expiry</strong>

                    <p>
                      Valid until August 2025
                      (Lot #AMX-2024-91 • 19 months remaining).
                    </p>
                  </div>

                </div>

              </div>

              {/* Location */}
              <div className="location-box">

                <span className="material-symbols-outlined">
                  share_location
                </span>

                <div>

                  <div className="location-title">

                    <strong>
                      Geneva Central Medical Hub
                    </strong>

                    <span>
                      Dispensary Bay 3
                    </span>

                  </div>

                  <p>
                    1.2 km away • Humanitarian Counter Open
                    Mon–Fri 08:30–17:00
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* Request Medicine CTA */}
        <section className="request-section">

          <div className="request-content">

            <div className="request-label">

              <span className="material-symbols-outlined">
                health_and_safety
              </span>

              Beneficiary Allocation Check

            </div>

            <h2>
              Ready to claim this course?
            </h2>

            <p>
              No immediate payment required • Verified against national
              NGO inventory quota (Max 1 course per beneficiary per 30 days).
            </p>

          </div>

          <button
            className="request-button"
            type="button"
            onClick={handleRequestMedicine}
            disabled={loading}
          >

            {loading ? (
              <>
                <span className="material-symbols-outlined loading-icon">
                  progress_activity
                </span>

                <span>Preparing Verification...</span>
              </>
            ) : (
              <>
                <span>Request Medicine</span>

                <span className="material-symbols-outlined">
                  arrow_forward
                </span>
              </>
            )}

          </button>

        </section>

        {/* Bottom Information Cards */}
        <div className="bottom-cards">

          {/* Clinical Information */}
          <section className="info-card">

            <div className="info-card-content">

              <div className="info-card-heading">

                <div className="info-icon clinical-icon">
                  <span className="material-symbols-outlined">
                    clinical_notes
                  </span>
                </div>

                <div>
                  <h3>
                    Clinical Indications &amp; Usage
                  </h3>

                  <p>
                    Patient Guidance Summary
                  </p>
                </div>

              </div>

              <ul className="clinical-list">

                <li>
                  <span className="material-symbols-outlined">
                    check_circle
                  </span>

                  <span>
                    <strong>Target Pathologies:</strong>{" "}
                    Indicated for susceptible bacterial infections
                    of the upper &amp; lower respiratory tract, ENT,
                    skin, and urinary system.
                  </span>
                </li>

                <li>
                  <span className="material-symbols-outlined">
                    check_circle
                  </span>

                  <span>
                    <strong>Standard Administration:</strong>{" "}
                    Adult dose typically 500mg taken orally every
                    8 hours with water. Compatible with or without meals.
                  </span>
                </li>

                <li className="warning-item">
                  <span className="material-symbols-outlined">
                    priority_high
                  </span>

                  <span>
                    <strong>Strict Compliance Rule:</strong>{" "}
                    Complete the full 21-capsule course even if symptoms
                    resolve early to minimize antibiotic resistance.
                  </span>
                </li>

              </ul>

            </div>

            <div className="info-footer">

              <span className="material-symbols-outlined">
                info
              </span>

              <span>
                Refer to inner leaflet for complete contraindications
                &amp; allergy warnings.
              </span>

            </div>

          </section>

          {/* Pickup Protocol */}
          <section className="info-card">

            <div className="info-card-content">

              <div className="info-card-heading">

                <div className="info-icon pickup-icon">
                  <span className="material-symbols-outlined">
                    local_pharmacy
                  </span>
                </div>

                <div>
                  <h3>
                    Pickup &amp; Verification Protocol
                  </h3>

                  <p>
                    Seamless 3-Step Redemption
                  </p>
                </div>

              </div>

              <div className="steps">

                {/* Step 1 */}
                <div className="step">

                  <div className="step-number">
                    1
                  </div>

                  <div>
                    <h4>
                      Submit Digital Request
                    </h4>

                    <p>
                      Click the button above to reserve this item
                      and upload your digital Rx certificate or
                      doctor reference.
                    </p>
                  </div>

                </div>

                {/* Step 2 */}
                <div className="step">

                  <div className="step-number">
                    2
                  </div>

                  <div>
                    <h4>
                      Licensed Pharmacist Audit
                    </h4>

                    <p>
                      A registered dispensary pharmacist verifies
                      dosage accuracy and quota validity within
                      2 clinical hours.
                    </p>
                  </div>

                </div>

                {/* Step 3 */}
                <div className="step">

                  <div className="step-number final-step">
                    3
                  </div>

                  <div>
                    <h4>
                      Contactless Hub Collection
                    </h4>

                    <p>
                      Present your generated QR claim code and
                      original paper Rx at Dispensary Bay 3 for
                      zero-wait dispensing.
                    </p>
                  </div>

                </div>

              </div>

            </div>

            <div className="info-footer">

              <span className="material-symbols-outlined">
                shield
              </span>

              <span>
                Secure chain-of-custody guaranteed under Swiss
                Humanitarian Health Standards.
              </span>

            </div>

          </section>

        </div>

      </div>
    </main>
  );
}

export default PatientMedicineDetailsPage;