import React, { useState } from "react";
import "./FindMedicinePage.css";

import { useNavigate } from "react-router-dom";

function FindMedicinePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const medicines = [
    {
      name: "Amoxicillin 500mg Capsules",
      category: "antibiotic",
      categoryName: "Antibiotic",
      description:
        "Amoxicillin Trihydrate • Oral Solid Dosage Form • Lot #AMX-2024-91",
      quantity: "Course of 21 capsules (Blister pack)",
      location: "Geneva Central Medical Hub",
      distance: "1.2 km away",
      price: "100% Subsidized",
      type: "NGO Grant",
      requirement: "Prescription Verification Required",
      stock: "Available (42 packs)",
      icon: "pill",
      status: "available",
    },
    {
      name: "Metformin Hydrochloride 850mg",
      category: "diabetes",
      categoryName: "Diabetes Care",
      description:
        "Metformin HCl • Extended Release Film-Coated • Lot #MET-8840",
      quantity: "Box of 60 tablets (2-month allocation)",
      location: "HopeHealth Community Clinic",
      distance: "0.8 km away",
      price: "Free ($0.00)",
      type: "Donor Funded",
      requirement: "Valid Rx Form Required",
      stock: "Available (18 packs)",
      icon: "medication",
      status: "available",
    },
    {
      name: "Salbutamol 100mcg Inhaler",
      category: "respiratory",
      categoryName: "Respiratory",
      description:
        "Salbutamol Sulfate • Pressurized Inhalation Suspension • CFC-Free",
      quantity: "1 Inhaler canister (200 metered doses)",
      location: "West District NGO Dispensary",
      distance: "3.5 km away",
      price: "100% Subsidized",
      type: "Urgent Relief",
      requirement: "Prescription Verification Required",
      stock: "Low Stock (3 units left)",
      icon: "air",
      status: "low",
    },
    {
      name: "Insulin Glargine 100 IU/ml",
      category: "diabetes",
      categoryName: "Diabetes Care",
      description:
        "Long-acting Human Insulin Analogue • 3ml Pre-filled Pen • Cold Storage (2-8°C)",
      quantity: "Carton of 5 Solostar Pens (300 units/pen)",
      location: "Geneva Central Medical Hub",
      distance: "1.2 km away",
      price: "100% Subsidized",
      type: "Chronic Aid",
      requirement: "Endocrinologist Rx & ID Required",
      stock: "Available (25 pens)",
      icon: "vaccines",
      extraTag: "Cold Chain Verified",
      status: "available",
    },
    {
      name: "Ibuprofen 400mg Tablets",
      category: "pain",
      categoryName: "Pain Relief",
      description:
        "Non-Steroidal Anti-Inflammatory Drug (NSAID) • Film-Coated • Lot #IBU-441",
      quantity: "Box of 20 tablets",
      location: "HopeHealth Community Clinic",
      distance: "0.8 km away",
      price: "Free ($0.00)",
      type: "NGO Grant",
      requirement: "Over-The-Counter Dispensary Protocol",
      stock: "Low Stock (2 boxes left)",
      icon: "healing",
      status: "low",
    },
    {
      name: "Atorvastatin 20mg Tablets",
      category: "cardio",
      categoryName: "Cardiovascular",
      description:
        "Lipid-lowering Statin • Oral Tablets • Regular Supply Route #STAT-12",
      quantity: "Standard pack of 30 tablets",
      location: "Expected restock via St. Jude Hub tomorrow 09:00 AM",
      distance: "",
      price: "100% Subsidized",
      type: "Waitlisted",
      requirement: "Free allocation upon delivery",
      stock: "Temporarily Unavailable",
      icon: "cardiology",
      status: "unavailable",
      unavailable: true,
    },
  ];

  const categories = [
    { value: "all", label: "All Medications" },
    { value: "antibiotic", label: "Antibiotics" },
    { value: "cardio", label: "Cardiovascular" },
    { value: "diabetes", label: "Diabetes Care" },
    { value: "pain", label: "Pain & Anti-inflammatory" },
    { value: "respiratory", label: "Respiratory" },
    { value: "other", label: "Specialty Care" },
  ];

  const filteredMedicines = medicines.filter((medicine) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      medicine.name.toLowerCase().includes(searchText) ||
      medicine.description.toLowerCase().includes(searchText);

    const matchesCategory =
      category === "all" || medicine.category === category;

    return matchesSearch && matchesCategory;
  });

  const clearSearch = () => {
  
     
    setSearch("");
  };

  return (
    <main className="find-medicine-page">
      <div className="find-medicine-container">

        {/* Header */}
        <div className="medicine-header">
          <div className="header-content">
            <div className="breadcrumb">
              <span className="breadcrumb-dot"></span>
              <span>Patient Workspace</span>
              <span>•</span>
              <span>Dispensary Inventory Directory</span>
            </div>

            <h1>Find Medicine</h1>

            <p>
              Search for available medication by brand name or salt composition
              across clinical partner dispensaries and humanitarian relief stores.
            </p>
          </div>

          <div className="verified-box">
            <div className="verified-icon">
              <span className="material-symbols-outlined">verified</span>
            </div>

            <div>
              <strong>Verified Batches Only</strong>
              <span>Live stock across 8 local NGO hubs</span>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="search-section">

          <div className="search-bar">
            <span className="material-symbols-outlined search-icon">
              search
            </span>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by medicine name or salt composition (e.g., Amoxicillin, Metformin, Salbutamol)..."
            />

            <div className="search-right">
              <span className="indexed-count">1,420+ indexed</span>

              <button
                className="clear-button"
                onClick={clearSearch}
                type="button"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="category-list">
            {categories.map((item) => (
              <button
                key={item.value}
                type="button"
                className={`category-button ${
                  category === item.value ? "active" : ""
                }`}
                onClick={() => setCategory(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Sort / Filter */}
          <div className="search-meta">
            <div className="result-count">
              <strong>{filteredMedicines.length} results</strong>
              <span>matching clinical availability in your network</span>
            </div>

            <div className="sort-options">
              <div className="sort-box">
                <span className="material-symbols-outlined">
                  distance
                </span>
                <span>Within 10 km</span>
              </div>

              <div className="sort-box">
                <span className="material-symbols-outlined">
                  sort
                </span>
                <span>Availability: High to Low</span>
              </div>
            </div>
          </div>
        </div>

        {/* Medicine List */}
        <div className="medicine-list">
          {filteredMedicines.map((medicine) => (
            <article
              className={`medicine-card ${
                medicine.unavailable ? "unavailable-card" : ""
              }`}
              key={medicine.name}
            >
              <div className="medicine-main">

                {/* Medicine Icon */}
                <div className="medicine-icon">
                  <span className="material-symbols-outlined">
                    {medicine.icon}
                  </span>
                </div>

                {/* Medicine Information */}
                <div className="medicine-info">

                  <div className="medicine-title">
                    <h2>{medicine.name}</h2>

                    <span className="medicine-category">
                      {medicine.categoryName}
                    </span>

                    {medicine.extraTag && (
                      <span className="extra-tag">
                        <span className="material-symbols-outlined">
                          ac_unit
                        </span>
                        {medicine.extraTag}
                      </span>
                    )}

                    {medicine.unavailable && (
                      <span className="out-stock-tag">
                        Out of Stock Locally
                      </span>
                    )}
                  </div>

                  <p className="medicine-description">
                    {medicine.description}
                  </p>

                  <div className="medicine-details">

                    <span>
                      <span className="material-symbols-outlined">
                        inventory_2
                      </span>
                      {medicine.quantity}
                    </span>

                    <span>
                      <span className="material-symbols-outlined">
                        {medicine.unavailable
                          ? "location_off"
                          : "location_on"}
                      </span>
                      {medicine.location}

                      {medicine.distance && (
                        <small> ({medicine.distance})</small>
                      )}
                    </span>

                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className="medicine-actions">

                <div className="medicine-price">
                  <div className="price-row">
                    <strong>{medicine.price}</strong>

                    <span className="funding-tag">
                      {medicine.type}
                    </span>
                  </div>

                  <span className="requirement">
                    {medicine.requirement}
                  </span>

                  <span
                    className={`stock-status ${medicine.status}`}
                  >
                    <span></span>
                    {medicine.stock}
                  </span>
                </div>

                {!medicine.unavailable ? (
                  <button className="details-button" type="button" onClick={() =>navigate('/Patient/PatientMedicinePage')}>
                    <span>Medicine Details</span>
                    <span className="material-symbols-outlined">
                      arrow_forward
                    </span>
                  </button>
                ) : (
                  <div className="unavailable-actions">
                    <button className="notify-button" type="button">
                      <span className="material-symbols-outlined">
                        notifications_active
                      </span>
                      Notify Me
                    </button>

                    <button className="alternative-button" type="button">
                      Alternatives
                      <span className="material-symbols-outlined">
                        open_in_new
                      </span>
                    </button>
                  </div>
                )}

              </div>
            </article>
          ))}
        </div>

        {/* Helpdesk */}
        <div className="helpdesk">

          <div className="helpdesk-content">

            <div className="helpdesk-icon">
              <span className="material-symbols-outlined">
                contact_support
              </span>
            </div>

            <div>
              <h3>Can't find the medicine you need?</h3>

              <p>
                Partner pharmacies receive newly authenticated donations every
                morning at 09:00 AM. Speak directly with a verified clinical
                pharmacist to initiate an emergency requisition.
              </p>
            </div>

          </div>

          <button className="helpdesk-button" type="button">
            <span className="material-symbols-outlined">
              support_agent
            </span>
            Contact Dispensary Helpdesk
          </button>

        </div>

        {/* Pagination */}
        <div className="pagination-section">

          <p>
            Showing <strong>1 - 6</strong> of{" "}
            <strong>38</strong> medications indexed today
          </p>

          <div className="pagination">

            <button disabled>
              <span className="material-symbols-outlined">
                chevron_left
              </span>
            </button>

            <button className="active-page">1</button>
            <button>2</button>
            <button>3</button>

            <span>...</span>

            <button>7</button>

            <button>
              <span className="material-symbols-outlined">
                chevron_right
              </span>
            </button>

          </div>
        </div>

      </div>
    </main>
  );
}

export default FindMedicinePage;