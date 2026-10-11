import React, { useMemo, useState } from "react";
import "./FindMedicinePage.css";

const medicines = [
  {
    id: 1,
    name: "Amoxicillin 500mg",
    composition: "Amoxicillin Trihydrate • Oral Capsule",
    category: "Antibiotics",
    quantity: 420,
    quantityText: "14 sealed boxes (30/box)",
    location: "Central Medical Hub",
    locationDetails: "Bay 3 • Zone A (North Yard)",
    status: "Available",
    icon: "medication",
    tone: "green",
  },
  {
    id: 2,
    name: "Metformin 850mg",
    composition: "Metformin Hydrochloride • Film-coated",
    category: "Diabetes",
    quantity: 18,
    quantityText: "Critical Threshold (Reserve Only)",
    location: "West District NGO Depot",
    locationDetails: "Section 4A • 3.2 km away",
    status: "Low Stock",
    icon: "pill",
    tone: "orange",
  },
  {
    id: 3,
    name: "Lisinopril 10mg",
    composition: "Lisinopril Dihydrate • Uncoated Tablets",
    category: "Cardiovascular",
    quantity: 280,
    quantityText: "10 standard packs (28/pack)",
    location: "St. Jude Free Clinic Depot",
    locationDetails: "Shelving Rack C-12",
    status: "Available",
    icon: "vital_signs",
    tone: "green",
  },
  {
    id: 4,
    name: "Insulin Glargine 100 IU/ml",
    composition: "Recombinant Human Insulin • 3ml Solostar Pens",
    category: "Cold-Chain (2°-8°C)",
    quantity: 14,
    quantityText: "Logged via Temp-Tag #882",
    location: "Vault Cold Storage #2",
    locationDetails: "Calibrated Refrigerator Unit 04",
    status: "Available",
    icon: "vaccines",
    tone: "primary",
    coldChain: true,
  },
  {
    id: 5,
    name: "Salbutamol Inhaler 100mcg",
    composition: "Albuterol Sulfate • 200 Metered Actuations",
    category: "Respiratory",
    quantity: 6,
    quantityText: "Re-order queued",
    location: "HopeHealth Center",
    locationDetails: "Emergency Fast-Access Locker #1",
    status: "Low Stock",
    icon: "air",
    tone: "orange",
  },
  {
    id: 6,
    name: "Ibuprofen 400mg",
    composition: "Ibuprofen BP • Sealed Blister Strips",
    category: "Pain Relief",
    quantity: 310,
    quantityText: "31 strips (10 tablets/strip)",
    location: "Central Medical Hub",
    locationDetails: "Zone B • Pallet 19",
    status: "Available",
    icon: "healing",
    tone: "green",
  },
  {
    id: 7,
    name: "Azithromycin 250mg",
    composition: "Azithromycin Monohydrate • Film Tablets",
    category: "Antibiotics",
    quantity: 0,
    quantityText: "Exhausted at last dispatch",
    location: "North Health Sub-depot",
    locationDetails: "Last fulfilled 2h ago",
    status: "Unavailable",
    icon: "block",
    tone: "error",
  },
  {
    id: 8,
    name: "Omeprazole 20mg",
    composition: "Delayed-Release Gastro-resistant Pellets",
    category: "Gastrointestinal",
    quantity: 185,
    quantityText: "6 containers (28 cap/bottle)",
    location: "Mercy Health Dispensary",
    locationDetails: "Bay 2 • Rack 08",
    status: "Available",
    icon: "medical_services",
    tone: "green",
  },
];

const categories = [
  { name: "All Categories", count: 142 },
  { name: "Antibiotics", count: 34 },
  { name: "Cardiovascular", count: 28 },
  { name: "Diabetes", count: 19 },
  { name: "Pain Relief", count: 22 },
  { name: "Respiratory", count: 15 },
  { name: "Cold-Chain", count: 12 },
  { name: "Gastrointestinal", count: 12 },
];

function FindMedicinePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [inStockOnly, setInStockOnly] = useState(true);
  const [sortBy, setSortBy] = useState("Highest Stock");

  const filteredMedicines = useMemo(() => {
    let result = medicines.filter((medicine) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        medicine.name.toLowerCase().includes(searchValue) ||
        medicine.composition.toLowerCase().includes(searchValue);

      const matchesCategory =
        selectedCategory === "All Categories" ||
        (selectedCategory === "Cold-Chain"
          ? medicine.coldChain
          : medicine.category === selectedCategory);

      const matchesStock = !inStockOnly || medicine.quantity > 0;

      return matchesSearch && matchesCategory && matchesStock;
    });

    if (sortBy === "Highest Stock") {
      result = [...result].sort((a, b) => b.quantity - a.quantity);
    }

    if (sortBy === "Alphabetical (A–Z)") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [search, selectedCategory, inStockOnly, sortBy]);

  const handleReset = () => {
    setSearch("");
    setSelectedCategory("All Categories");
    setInStockOnly(true);
    setSortBy("Highest Stock");
  };

  return (
    <main className="find-medicine-page">
      <div className="find-medicine-container">
        {/* Header */}
        <header className="medicine-header">
          <div>
            <div className="medicine-eyebrow">
              <span />
              CLINICAL OPERATIONS • INTERNAL INVENTORY LOOKUP &amp; DISPENSARY
              SEARCH
            </div>

            <h1>Find Medicine</h1>

            <p>
              Search inventory by medicine name or active salt composition to
              verify availability, batch expiry, and instant dispatch
              readiness across humanitarian dispensary hubs.
            </p>
          </div>

          <div className="header-pills">
            <span className="header-pill light">
              <i />
              Live Dispensary Index
            </span>

            <span className="header-pill light primary-pill">
              <span className="material-symbols-outlined">bolt</span>
              Instant Allocation Mode
            </span>

            <span className="header-pill dark">
              <span className="material-symbols-outlined">inventory_2</span>
              <strong>1,420</strong>
              Verified Units
            </span>
          </div>
        </header>

        {/* Search */}
        <div className="medicine-search-box">
          <span className="material-symbols-outlined">search</span>

          <input
            type="text"
            placeholder="Search by medicine name or salt composition (e.g., Amoxicillin, Metformin, Paracetamol)..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          {search && (
            <button type="button" onClick={() => setSearch("")}>
              <span className="material-symbols-outlined">cancel</span>
            </button>
          )}

          <kbd>⌘ K</kbd>
        </div>

        {/* Filters */}
        <div className="filter-bar">
          <div className="category-chips">
            {categories.map((category) => (
              <button
                type="button"
                key={category.name}
                className={
                  selectedCategory === category.name
                    ? "category-chip active"
                    : "category-chip"
                }
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name === "Cold-Chain" && (
                  <span className="material-symbols-outlined">ac_unit</span>
                )}
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          <div className="filter-actions">
            <select
              className="hub-select"
              defaultValue="All Storage Hubs"
              aria-label="Storage hub"
            >
              <option>All Storage Hubs</option>
              <option>Central Medical Hub</option>
              <option>West District NGO Depot</option>
              <option>St. Jude Free Clinic Depot</option>
              <option>Mercy Health Dispensary</option>
            </select>

            <label className="stock-toggle">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(event) => setInStockOnly(event.target.checked)}
              />
              <span className="toggle-track">
                <span />
              </span>
              In-Stock Only
            </label>
          </div>
        </div>

        {/* Results Header */}
        <div className="results-header">
          <div className="results-count">
            <span />
            <p>
              Showing <strong>{filteredMedicines.length} matched medicines</strong>{" "}
              across <strong>4 storage hubs</strong>
            </p>
          </div>

          <label className="sort-control">
            Sort by:
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option>Highest Stock</option>
              <option>Alphabetical (A–Z)</option>
              <option>Nearest Hub (GPS)</option>
              <option>Earliest Expiry</option>
            </select>
          </label>
        </div>

        {/* Medicine Table */}
        <section className="medicine-table-card">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Medicine &amp; Composition</th>
                  <th>Category</th>
                  <th>Quantity Available</th>
                  <th>Storage Location / NGO Hub</th>
                  <th>Clinical Status</th>
                  <th className="actions-heading">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredMedicines.map((medicine) => (
                  <tr
                    key={medicine.id}
                    className={
                      medicine.status === "Unavailable" ? "unavailable-row" : ""
                    }
                  >
                    <td>
                      <div className="medicine-cell">
                        <div className={`medicine-icon ${medicine.tone}`}>
                          <span className="material-symbols-outlined">
                            {medicine.icon}
                          </span>
                        </div>

                        <div>
                          <div className="medicine-name">{medicine.name}</div>
                          <div className="medicine-composition">
                            {medicine.composition}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`category-badge ${
                          medicine.coldChain ? "cold-chain" : ""
                        }`}
                      >
                        {medicine.coldChain && (
                          <span className="material-symbols-outlined">
                            ac_unit
                          </span>
                        )}
                        {medicine.category}
                      </span>
                    </td>

                    <td>
                      <div
                        className={`quantity ${
                          medicine.status === "Low Stock"
                            ? "low"
                            : medicine.status === "Unavailable"
                              ? "empty"
                              : ""
                        }`}
                      >
                        {medicine.quantity} units in stock
                      </div>

                      <div
                        className={`quantity-note ${
                          medicine.status !== "Available" ? "alert-note" : ""
                        }`}
                      >
                        {medicine.quantityText}
                      </div>
                    </td>

                    <td>
                      <div className="location-cell">
                        <span className="material-symbols-outlined">
                          location_on
                        </span>
                        <div>
                          <div className="location-name">
                            {medicine.location}
                          </div>
                          <div className="location-details">
                            {medicine.locationDetails}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`status-badge ${medicine.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <i />
                        {medicine.status}
                      </span>
                    </td>

                    <td className="actions-cell">
                      <div className="row-actions">
                        <button
                          type="button"
                          className="view-button"
                          onClick={() =>
                            alert(`Viewing details for ${medicine.name}`)
                          }
                        >
                          <span className="material-symbols-outlined">
                            visibility
                          </span>
                          View Details
                        </button>

                        <button
                          type="button"
                          className={
                            medicine.status === "Unavailable"
                              ? "icon-action error"
                              : "icon-action"
                          }
                          title={
                            medicine.status === "Unavailable"
                              ? "Broadcast Inquiry"
                              : "Quick Reserve"
                          }
                          onClick={() =>
                            alert(
                              medicine.status === "Unavailable"
                                ? `Broadcast inquiry for ${medicine.name}`
                                : `Reserve ${medicine.name}`
                            )
                          }
                        >
                          <span className="material-symbols-outlined">
                            {medicine.status === "Unavailable"
                              ? "campaign"
                              : "bookmark_add"}
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredMedicines.length === 0 && (
              <div className="no-results">
                <span className="material-symbols-outlined">search_off</span>
                <h3>No medicine found</h3>
                <p>Try another medicine name, salt composition, or category.</p>
              </div>
            )}
          </div>
        </section>

        {/* Operational Section */}
        <section className="operational-grid">
          <div className="hub-network-card">
            <div>
              <div className="section-title-row">
                <div>
                  <span className="material-symbols-outlined">hub</span>
                  <h3>Integrated Hub Dispatch Network</h3>
                </div>

                <span className="online-badge">4 Regional Hubs Online</span>
              </div>

              <p>
                Live geographic coverage across our affiliated dispensary
                partners. All units displayed have passed primary packaging
                and lot tamper checks.
              </p>
            </div>

            <div className="map-placeholder">
              <div className="map-overlay">
                <span />
                Sync active: Latency 24ms across NGO relay
              </div>
            </div>
          </div>

          <div className="integrity-card">
            <div>
              <div className="integrity-icon">
                <span className="material-symbols-outlined">
                  verified_user
                </span>
              </div>

              <h3>Clinical Integrity Standard</h3>

              <p>
                Every allocated unit complies with WHO Good Distribution
                Practices. Cold chain records are logged at 15-minute
                telemetry intervals.
              </p>

              <div className="check-list">
                <div>
                  <span className="material-symbols-outlined">check_circle</span>
                  Batch &amp; Lot traceability verified
                </div>
                <div>
                  <span className="material-symbols-outlined">check_circle</span>
                  Minimum 90-day remaining shelf life
                </div>
                <div>
                  <span className="material-symbols-outlined">check_circle</span>
                  Licensed pharmacist counter-sign logged
                </div>
              </div>
            </div>

            <a href="#protocol-docs">
              Read dispensary protocol handbook
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
        </section>

        {/* Bottom Help */}
        <section className="help-card">
          <div className="help-icon">
            <span className="material-symbols-outlined">manage_search</span>
          </div>

          <h2>Need a salt combination not listed above?</h2>

          <p>
            If a specific prescription formula is not found in our central
            index, you can broadcast an emergency donor request or look up
            bioequivalent generics.
          </p>

          <div className="help-actions">
            <button type="button" className="primary-button">
              <span className="material-symbols-outlined">add_box</span>
              Request Special Allocation
            </button>

            <button type="button" className="secondary-button">
              <span className="material-symbols-outlined">podcasts</span>
              Broadcast Donor Inquiry
            </button>

            <button type="button" className="reset-button" onClick={handleReset}>
              <span className="material-symbols-outlined">restart_alt</span>
              Reset Search &amp; Filters
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default FindMedicinePage;
