import React, { useState } from "react";
import "./AddMedicinePage.css";

const categoryOptions = [
  { value: "Antibiotics", label: "Antibiotics" },
  { value: "Blood Pressure / Cardiac", label: "Blood Pressure / Cardiac" },
  { value: "Pain Relief / Analgesic", label: "Pain Relief / Analgesic" },
  { value: "Diabetes & Endocrine", label: "Diabetes & Endocrine" },
  { value: "Vitamins & Supplements", label: "Vitamins & Supplements" },
  { value: "Respiratory / Inhalers", label: "Respiratory / Inhalers" },
  { value: "Other Therapeutic Class", label: "Other Therapeutic Class" },
];

export default function AddNewMedicine({ onSubmit }) {
  const [formData, setFormData] = useState({
    medicineName: "",
    genericComposition: "",
    category: "",
    quantity: "",
    expiryDate: "",
    notes: "",
  });

  const [file, setFile] = useState(null);

  // Backend states
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];

    if (selected) {
      setFile(selected);
      setSuccessMessage("");
      setErrorMessage("");
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Convert frontend field names
      // into the exact backend field names.
      const payload = {
        name: formData.medicineName,
        salt: formData.genericComposition,
        category: formData.category,
        expiryDate: formData.expiryDate,
        quantity: Number(formData.quantity),

        // We are NOT uploading the actual image yet.
        // For now, only the file name is stored.
        images: file ? [file.name] : [],

        storageConditions: formData.notes,
      };

      console.log("Sending medicine data:", payload);

      const response = await fetch(
        "http://localhost:5001/api/medicines",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add medicine"
        );
      }

      console.log("Medicine added successfully:", data);

      setSuccessMessage(
        "Medicine submitted successfully for verification."
      );

      // Clear form after successful submission
      setFormData({
        medicineName: "",
        genericComposition: "",
        category: "",
        quantity: "",
        expiryDate: "",
        notes: "",
      });

      setFile(null);

      // Keep existing onSubmit functionality
      if (onSubmit) {
        onSubmit(data.medicine);
      }
    } catch (error) {
      console.error("Error submitting medicine:", error);

      setErrorMessage(
        error.message ||
          "Something went wrong while submitting the medicine."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="ms-form-area">
      <div className="ms-form-wrap">

        {/* Page Heading */}
        <div className="ms-page-heading">
          <a href="/donor/dashboard" className="ms-back-link">
            ← Back to Dashboard
          </a>

          <h1>Add New Medicine</h1>

          <p>
            Fill in the details below to donate medicine to those in need.
          </p>
        </div>

        {/* Form Card */}
        <div className="ms-card">
          <form onSubmit={handleSubmit}>

            {/* Success Message */}
            {successMessage && (
              <div className="ms-success-message">
                {successMessage}
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="ms-error-message">
                {errorMessage}
              </div>
            )}

            {/* Medicine Name */}
            <div className="ms-field">
              <label htmlFor="medicineName">
                Medicine Name <span className="req">*</span>
              </label>

              <input
                id="medicineName"
                name="medicineName"
                type="text"
                placeholder="e.g., Amoxicillin 500mg or Paracetamol 650mg"
                value={formData.medicineName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Salt / Generic Composition */}
            <div className="ms-field">
              <label htmlFor="genericComposition">
                Salt / Generic Composition{" "}
                <span className="req">*</span>
              </label>

              <input
                id="genericComposition"
                name="genericComposition"
                type="text"
                placeholder="e.g., Amoxicillin Trihydrate"
                value={formData.genericComposition}
                onChange={handleChange}
                required
              />

              <p className="ms-hint">
                This helps patients find your donation by salt/generic name.
              </p>
            </div>

            {/* Category + Quantity */}
            <div className="ms-field-row">

              {/* Category */}
              <div className="ms-field">
                <label htmlFor="category">
                  Category <span className="req">*</span>
                </label>

                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select category...
                  </option>

                  {categoryOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div className="ms-field">
                <label htmlFor="quantity">
                  Quantity / Units <span className="req">*</span>
                </label>

                <div className="ms-input-suffix">
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    placeholder="30"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />

                  <span>Units / Strips</span>
                </div>
              </div>

            </div>

            {/* Expiry Date */}
            <div className="ms-field ms-field-narrow">
              <label htmlFor="expiryDate">
                Expiry Date <span className="req">*</span>
              </label>

              <input
                id="expiryDate"
                name="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={handleChange}
                required
              />

              <p className="ms-warning">
                Per safety compliance, medicine must have at least 3 months
                remaining before expiration.
              </p>
            </div>

            {/* Photo Upload */}
            <div className="ms-field">
              <label>
                Upload Package &amp; Batch Photos{" "}
                <span className="req">*</span>
              </label>

              <label htmlFor="fileInput" className="ms-dropzone">
                <div className="ms-dropzone-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>

                <p>
                  <span className="ms-link-text">
                    Click to upload
                  </span>{" "}
                  or drag and drop medicine photos
                </p>

                <p className="ms-dropzone-sub">
                  Clear photos showing Expiry Date &amp; Batch Number
                  (PNG, JPG up to 5MB)
                </p>
              </label>

              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="ms-hidden-input"
                onChange={handleFileChange}
              />

              {file && (
                <div className="ms-file-badge">
                  <div className="ms-file-info">

                    <div className="ms-file-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>

                    <div>
                      <span className="ms-file-name">
                        {file.name}
                      </span>

                      <span className="ms-file-size">
                        {(file.size / (1024 * 1024)).toFixed(1)} MB
                      </span>
                    </div>

                  </div>

                  <button
                    type="button"
                    className="ms-remove-file"
                    onClick={handleRemoveFile}
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="ms-field">
              <label htmlFor="notes">
                Storage Conditions &amp; Clinical Notes{" "}
                <span className="ms-optional">
                  (Optional)
                </span>
              </label>

              <textarea
                id="notes"
                name="notes"
                rows="3"
                placeholder="e.g., Kept at controlled room temperature (under 25°C). Unopened, original tamper-evident seal intact."
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

            {/* Actions */}
            <div className="ms-form-actions">
              <button
                type="button"
                className="ms-btn-secondary"
                onClick={() => {
                  window.location.href = "/donor/dashboard";
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="ms-btn-primary"
                disabled={loading}
              >
                {loading
                  ? "Submitting..."
                  : "+ Submit for Verification"}
              </button>
            </div>

          </form>
        </div>

        {/* Information Banner */}
        <div className="ms-info-banner">
          <div className="ms-info-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>

          <div>
            <span className="ms-info-title">
              Professional Pharmacist Review Required
            </span>

            Your submission will be reviewed by our pharmacist partner
            before becoming accessible to beneficiaries in need.
          </div>
        </div>

      </div>
    </main>
  );
}