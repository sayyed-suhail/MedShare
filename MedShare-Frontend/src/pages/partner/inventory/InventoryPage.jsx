import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./InventoryPage.css";

const API_BASE_URL = "http://localhost:5001/api";
const ITEMS_PER_PAGE = 10;

const formatPrice = (price) => {
  if (price === null || price === undefined || price === "") return "—";
  const numericPrice = Number(price);
  return Number.isNaN(numericPrice) ? "—" : `$${numericPrice.toFixed(2)}`;
};

const getInventoryStatus = (quantity) => {
  const numericQuantity = Number(quantity) || 0;

  if (numericQuantity <= 0) return "Out of Stock";
  if (numericQuantity <= 20) return "Low Stock";
  return "Listed";
};

const getTone = (medicine) => {
  const category = String(medicine?.category || "").toLowerCase();

  if (
    category.includes("pain") ||
    category.includes("respiratory") ||
    category.includes("diabetes")
  ) {
    return "orange";
  }

  if (medicine?.quantity <= 0) return "red";

  return "blue";
};

const getIcon = (medicine) => {
  const category = String(medicine?.category || "").toLowerCase();

  if (category.includes("cold")) return "ac_unit";
  if (category.includes("cardio")) return "cardiology";
  if (category.includes("respiratory")) return "air";
  if (category.includes("diabetes")) return "vaccines";
  if (category.includes("pain")) return "healing";
  if (category.includes("gastro")) return "pill";

  return "medication";
};

const normalizeMedicine = (medicine) => {
  const quantity = Number(medicine?.quantity) || 0;
  const originalPrice =
    medicine?.originalPrice ??
    medicine?.price ??
    null;

  const subsidizedPrice =
    medicine?.subsidizedPrice ??
    (originalPrice !== null ? Number(originalPrice) * 0.1 : null);

  return {
    id: medicine?._id || medicine?.id,
    name: medicine?.name || "Unnamed Medicine",
    composition: medicine?.salt || medicine?.composition || "Composition not available",
    category: medicine?.category || "Uncategorized",
    quantity,
    unit: medicine?.unit || "Units",
    storage:
      medicine?.storageConditions ||
      "Storage information not available",
    originalPrice,
    subsidizedPrice,
    status: getInventoryStatus(quantity),
    tone: getTone({ ...medicine, quantity }),
    icon: getIcon({ ...medicine, quantity }),
    expiryDate: medicine?.expiryDate,
    pickupStatus: medicine?.pickupStatus,
    verificationStatus: medicine?.status,
    donorAcceptedPickup: medicine?.donorAcceptedPickup,
    createdAt: medicine?.createdAt,
    updatedAt: medicine?.updatedAt,
    images: medicine?.images || [],
    salt: medicine?.salt || "",
    rawMedicine: medicine,
  };
};

function StatusBadge({ status }) {
  return (
    <span
      className={`status-badge status-${status
        .toLowerCase()
        .replaceAll(" ", "-")}`}
    >
      <span className="status-dot" />
      {status}
    </span>
  );
}

function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Stock Statuses");
  const [sortBy, setSortBy] = useState("Highest Stock First");
  const [currentPage, setCurrentPage] = useState(1);

  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const loadInventory = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API_BASE_URL}/partner/inventory`
      );

      const receivedMedicines = Array.isArray(response.data?.medicines)
        ? response.data.medicines
        : [];

      setMedicines(receivedMedicines.map(normalizeMedicine));
    } catch (err) {
      console.error("Load Inventory Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load inventory. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const categoryOptions = useMemo(() => {
    const categories = [
      ...new Set(
        medicines
          .map((medicine) => medicine.category)
          .filter(Boolean)
      ),
    ];

    return ["All Categories", ...categories];
  }, [medicines]);

  const filteredMedicines = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    const result = medicines.filter((medicine) => {
      const matchesSearch =
        !search ||
        medicine.name.toLowerCase().includes(search) ||
        medicine.composition.toLowerCase().includes(search) ||
        medicine.category.toLowerCase().includes(search) ||
        medicine.salt.toLowerCase().includes(search);

      const matchesCategory =
        category === "All Categories" ||
        medicine.category === category;

      const matchesStatus =
        status === "All Stock Statuses" ||
        medicine.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });

    return [...result].sort((a, b) => {
      if (sortBy === "Lowest Stock (Urgent)") {
        return a.quantity - b.quantity;
      }

      if (sortBy === "Alphabetical (A-Z)") {
        return a.name.localeCompare(b.name);
      }

      return b.quantity - a.quantity;
    });
  }, [medicines, searchTerm, category, status, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredMedicines.length / ITEMS_PER_PAGE)
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedMedicines = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;

    return filteredMedicines.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredMedicines, safeCurrentPage]);

  const totalStoredUnits = useMemo(
    () =>
      medicines.reduce(
        (total, medicine) => total + medicine.quantity,
        0
      ),
    [medicines]
  );

  const activeCategories = useMemo(
    () =>
      new Set(
        medicines
          .map((medicine) => medicine.category)
          .filter(Boolean)
      ).size,
    [medicines]
  );

  const lowStockCount = useMemo(
    () =>
      medicines.filter(
        (medicine) =>
          medicine.quantity > 0 && medicine.quantity <= 20
      ).length,
    [medicines]
  );

  const handlePageChange = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  const handleExport = () => {
    const headers = [
      "Medicine",
      "Salt / Composition",
      "Category",
      "Quantity",
      "Unit",
      "Original Price",
      "Subsidized Price",
      "Status",
      "Expiry Date",
    ];

    const rows = filteredMedicines.map((medicine) => [
      medicine.name,
      medicine.composition,
      medicine.category,
      medicine.quantity,
      medicine.unit,
      medicine.originalPrice ?? "",
      medicine.subsidizedPrice ?? "",
      medicine.status,
      medicine.expiryDate
        ? new Date(medicine.expiryDate).toLocaleDateString()
        : "",
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replaceAll('"', '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "medshare-inventory.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const openDetails = (medicine) => {
    setSelectedMedicine(medicine);
  };

  const closeDetails = () => {
    setSelectedMedicine(null);
  };

  return (
    <main className="inventory-page">
      <div className="inventory-container">
        <section className="inventory-header">
          <div className="inventory-heading">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              <span>Clinical Operations • NGO Dispensary Inventory</span>
            </div>

            <h1>Inventory</h1>

            <p>
              Medicine currently received and stored at the NGO.
              Patients can be offered medicines from this inventory
              at the subsidized rate.
            </p>
          </div>

          <div className="header-actions">
            <div className="info-badge">
              <span className="material-symbols-outlined">
                inventory_2
              </span>
              <span>{activeCategories} Active Categories</span>
            </div>

            <div className="info-badge">
              <span className="material-symbols-outlined">
                verified_user
              </span>
              <span>10% Subsidized Model</span>
            </div>

            <button
              className="secondary-button"
              type="button"
              onClick={handleExport}
              disabled={filteredMedicines.length === 0}
            >
              <span className="material-symbols-outlined">
                file_download
              </span>
              Export CSV
            </button>
          </div>
        </section>

        <section className="metrics-grid">
          <div className="metric-card">
            <div>
              <span className="metric-label">
                Total Stored Units
              </span>

              <div className="metric-value">
                {totalStoredUnits.toLocaleString()}
                <span> units</span>
              </div>

              <div className="metric-note success">
                <span className="material-symbols-outlined">
                  inventory_2
                </span>
                Received medicines currently in stock
              </div>
            </div>

            <div className="metric-icon blue">
              <span className="material-symbols-outlined">
                inventory
              </span>
            </div>
          </div>

          <div className="metric-card">
            <div>
              <span className="metric-label">
                Active Categories
              </span>

              <div className="metric-value">
                {activeCategories}
              </div>

              <div className="metric-note">
                <span className="material-symbols-outlined active-category-check">
                  check_circle
                </span>
                Based on received medicines
              </div>
            </div>

            <div className="metric-icon light-blue">
              <span className="material-symbols-outlined">
                category
              </span>
            </div>
          </div>

          <div className="metric-card">
            <div>
              <span className="metric-label">
                Low Stock Alerts
              </span>

              <div className="metric-value warning-value">
                {lowStockCount}
              </div>

              <div className="metric-note warning">
                <span className="pulse-dot" />
                Quantity is 20 units or below
              </div>
            </div>

            <div className="metric-icon orange">
              <span className="material-symbols-outlined">
                crisis_alert
              </span>
            </div>
          </div>
        </section>

        <section className="filter-toolbar">
          <div className="filter-left">
            <div className="search-box">
              <span className="material-symbols-outlined">
                search
              </span>

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search inventory by name or salt..."
              />
            </div>

            <div className="select-wrapper">
              <select
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                  setCurrentPage(1);
                }}
              >
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === "All Categories"
                      ? `All Categories (${medicines.length})`
                      : option}
                  </option>
                ))}
              </select>

              <span className="material-symbols-outlined">
                expand_more
              </span>
            </div>

            <div className="select-wrapper">
              <select
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value);
                  setCurrentPage(1);
                }}
              >
                <option>All Stock Statuses</option>
                <option>Listed</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>

              <span className="material-symbols-outlined">
                expand_more
              </span>
            </div>
          </div>

          <div className="filter-right">
            <div className="sort-control">
              <span>Sort by:</span>

              <div className="sort-select">
                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value)
                  }
                >
                  <option>Highest Stock First</option>
                  <option>Lowest Stock (Urgent)</option>
                  <option>Alphabetical (A-Z)</option>
                </select>

                <span className="material-symbols-outlined">
                  unfold_more
                </span>
              </div>
            </div>

            <div className="vertical-divider" />

            <span className="result-count">
              Showing {filteredMedicines.length} of{" "}
              {medicines.length}
            </span>
          </div>
        </section>

        {error && (
          <div className="inventory-message error-message">
            <span className="material-symbols-outlined">
              error
            </span>
            <span>{error}</span>

            <button type="button" onClick={loadInventory}>
              Retry
            </button>
          </div>
        )}

        <section className="table-card">
          {loading ? (
            <div className="inventory-loading">
              <span className="material-symbols-outlined">
                sync
              </span>
              <p>Loading received medicines...</p>
            </div>
          ) : (
            <>
              <div className="table-scroll">
                <table className="inventory-table">
                  <thead>
                    <tr>
                      <th>Medicine & Composition</th>
                      <th>Category</th>
                      <th>Quantity in Stock</th>
                      <th>Subsidized Pricing</th>
                      <th>Clinical Status</th>
                      <th className="actions-column">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedMedicines.map((medicine) => (
                      <tr key={medicine.id}>
                        <td>
                          <div className="medicine-cell">
                            <div
                              className={`medicine-icon ${medicine.tone}`}
                            >
                              <span className="material-symbols-outlined">
                                {medicine.icon}
                              </span>
                            </div>

                            <div>
                              <div
                                className={`medicine-name ${
                                  medicine.status === "Out of Stock"
                                    ? "muted-name"
                                    : ""
                                }`}
                              >
                                {medicine.name}
                              </div>

                              <div className="medicine-composition">
                                {medicine.composition}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span
                            className={`category-badge ${medicine.tone}`}
                          >
                            {medicine.category}
                          </span>
                        </td>

                        <td>
                          <div
                            className={`quantity ${
                              medicine.status !== "Listed"
                                ? "quantity-warning"
                                : ""
                            }`}
                          >
                            {medicine.quantity.toLocaleString()}{" "}
                            {medicine.unit}
                          </div>

                          <div
                            className={`stock-note ${
                              medicine.status !== "Listed"
                                ? "warning-text"
                                : ""
                            }`}
                          >
                            {medicine.storage}
                          </div>
                        </td>

                        <td>
                          <div className="price-row">
                            <span className="original-price">
                              {formatPrice(
                                medicine.originalPrice
                              )}
                            </span>

                            <span className="subsidized-price">
                              {formatPrice(
                                medicine.subsidizedPrice
                              )}
                            </span>
                          </div>

                          <div className="discount-note">
                            {medicine.originalPrice !== null
                              ? "90% OFF MRSP"
                              : "Pricing not set"}
                          </div>
                        </td>

                        <td>
                          <StatusBadge status={medicine.status} />
                        </td>

                        <td className="actions-column">
                          <div className="row-actions">
                            <button
                              type="button"
                              title="View Inventory Details"
                              onClick={() =>
                                openDetails(medicine)
                              }
                            >
                              <span className="material-symbols-outlined">
                                visibility
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {paginatedMedicines.length === 0 && (
                      <tr>
                        <td
                          colSpan="6"
                          className="empty-state"
                        >
                          {medicines.length === 0
                            ? "No medicines have been received into inventory yet."
                            : "No medicines found for the selected filters."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="table-footer">
                <span className="footer-text">
                  Showing{" "}
                  <strong>
                    {filteredMedicines.length === 0
                      ? 0
                      : (safeCurrentPage - 1) *
                          ITEMS_PER_PAGE +
                        1}
                    -
                    {Math.min(
                      safeCurrentPage * ITEMS_PER_PAGE,
                      filteredMedicines.length
                    )}
                  </strong>{" "}
                  of{" "}
                  <strong>{filteredMedicines.length}</strong>{" "}
                  clinical items
                </span>

                <div className="pagination">
                  <button
                    type="button"
                    className={`pagination-arrow ${
                      safeCurrentPage === 1 ? "disabled" : ""
                    }`}
                    disabled={safeCurrentPage === 1}
                    onClick={() =>
                      handlePageChange(safeCurrentPage - 1)
                    }
                  >
                    <span className="material-symbols-outlined">
                      chevron_left
                    </span>
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  )
                    .filter(
                      (page) =>
                        page <= 3 ||
                        page === totalPages ||
                        Math.abs(page - safeCurrentPage) <= 1
                    )
                    .map((page, index, visiblePages) => {
                      const previousPage =
                        visiblePages[index - 1];

                      return (
                        <React.Fragment key={page}>
                          {previousPage &&
                            page - previousPage > 1 && (
                              <span className="pagination-dots">
                                ...
                              </span>
                            )}

                          <button
                            type="button"
                            className={`page-number ${
                              safeCurrentPage === page
                                ? "active"
                                : ""
                            }`}
                            onClick={() =>
                              handlePageChange(page)
                            }
                          >
                            {page}
                          </button>
                        </React.Fragment>
                      );
                    })}

                  <button
                    type="button"
                    className={`pagination-arrow ${
                      safeCurrentPage === totalPages
                        ? "disabled"
                        : ""
                    }`}
                    disabled={safeCurrentPage === totalPages}
                    onClick={() =>
                      handlePageChange(safeCurrentPage + 1)
                    }
                  >
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </div>

      {selectedMedicine && (
        <div
          className="inventory-modal-backdrop"
          onClick={closeDetails}
        >
          <div
            className="inventory-details-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="inventory-modal-header">
              <div>
                <span className="modal-eyebrow">
                  Inventory Details
                </span>
                <h2>{selectedMedicine.name}</h2>
                <p>{selectedMedicine.composition}</p>
              </div>

              <button
                type="button"
                className="modal-close-button"
                onClick={closeDetails}
              >
                <span className="material-symbols-outlined">
                  close
                </span>
              </button>
            </div>

            <div className="inventory-details-grid">
              <div className="inventory-detail-item">
                <span>Category</span>
                <strong>{selectedMedicine.category}</strong>
              </div>

              <div className="inventory-detail-item">
                <span>Quantity</span>
                <strong>
                  {selectedMedicine.quantity}{" "}
                  {selectedMedicine.unit}
                </strong>
              </div>

              <div className="inventory-detail-item">
                <span>Storage</span>
                <strong>{selectedMedicine.storage}</strong>
              </div>

              <div className="inventory-detail-item">
                <span>Clinical Status</span>
                <StatusBadge
                  status={selectedMedicine.status}
                />
              </div>

              <div className="inventory-detail-item">
                <span>Verification</span>
                <strong>
                  {selectedMedicine.verificationStatus ||
                    "Approved"}
                </strong>
              </div>

              <div className="inventory-detail-item">
                <span>Inventory State</span>
                <strong>{selectedMedicine.pickupStatus}</strong>
              </div>

              <div className="inventory-detail-item">
                <span>Expiry Date</span>
                <strong>
                  {selectedMedicine.expiryDate
                    ? new Date(
                        selectedMedicine.expiryDate
                      ).toLocaleDateString()
                    : "Not available"}
                </strong>
              </div>

              <div className="inventory-detail-item">
                <span>Subsidized Price</span>
                <strong>
                  {formatPrice(
                    selectedMedicine.subsidizedPrice
                  )}
                </strong>
              </div>
            </div>

            <div className="inventory-modal-note">
              <span className="material-symbols-outlined">
                check_circle
              </span>
              This medicine appears in Inventory because it has
              been marked as <strong>received</strong> by the
              Partner/NGO.
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default InventoryPage;
