import "./DashboardPage.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import StatCard from "../../../components/dashboard/StatCard";
import InsightCard from "../../../components/dashboard/InsightCard";
import DonationTable from "../../../components/dashboard/DonationTable";

export default function DashboardPage() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const response = await fetch(
          "http://localhost:5001/api/medicines"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch medicines"
          );
        }

        setMedicines(data.medicines || []);
      } catch (error) {
        console.error("Error fetching medicines:", error);

        setErrorMessage(
          error.message || "Failed to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  /*
    TOTAL DONATED

    We calculate the total quantity of all medicines
    stored in MongoDB.
  */
  const totalDonated = medicines.reduce((total, medicine) => {
    return total + Number(medicine.quantity || 0);
  }, 0);

  /*
    TOTAL DONATIONS

    This is the total number of medicine donations.
  */
  const totalDonations = medicines.length;

  /*
    CURRENT MONTH / PREVIOUS MONTH

    We use createdAt from MongoDB to calculate
    the percentage change in donations.
  */
  const now = new Date();

  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousMonthYear =
    currentMonth === 0 ? currentYear - 1 : currentYear;

  const currentMonthDonations = medicines.filter((medicine) => {
    if (!medicine.createdAt) return false;

    const date = new Date(medicine.createdAt);

    return (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    );
  }).length;

  const previousMonthDonations = medicines.filter((medicine) => {
    if (!medicine.createdAt) return false;

    const date = new Date(medicine.createdAt);

    return (
      date.getMonth() === previousMonth &&
      date.getFullYear() === previousMonthYear
    );
  }).length;

  let percentageChange = 0;

  if (previousMonthDonations > 0) {
    percentageChange = Math.round(
      ((currentMonthDonations - previousMonthDonations) /
        previousMonthDonations) *
        100
    );
  } else if (currentMonthDonations > 0) {
    percentageChange = 100;
  }

  /*
    RECENT DONATIONS

    Convert MongoDB medicine documents into
    the format expected by DonationTable.
  */
  const recentDonations = [...medicines]
    .sort((a, b) => {
      return (
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
      );
    })
    .slice(0, 4)
    .map((medicine) => ({
      id: medicine._id,
      name: medicine.name,
      category: medicine.category,
      date: medicine.createdAt
        ? new Date(medicine.createdAt).toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
            }
          )
        : "-",
      status: medicine.status
        ? medicine.status.charAt(0).toUpperCase() +
          medicine.status.slice(1)
        : "Pending",
      icon: "medication",
    }));

  return (
    <div className="dashboard-page">

      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div>
          <h2 className="dashboard-title">
            Welcome back, Sarah
          </h2>

          <p className="dashboard-subtitle">
            Here is the impact of your recent medicine donations.
          </p>
        </div>

        <Link
          to="AddNewMedicine"
          className="add-medicine-btn-link"
        >
          <button
            className="add-medicine-btn"
            type="button"
          >
            Add New Medicine
          </button>
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <p style={{ marginBottom: "20px" }}>
          Loading dashboard data...
        </p>
      )}

      {/* Error */}
      {errorMessage && (
        <div className="ms-error-message">
          {errorMessage}
        </div>
      )}

      {/* Stats */}
      <div className="dashboard-stats">

        <StatCard
          icon="medication"
          label="Total Donated"
          value={totalDonated}
          unit="units"
        />

        <StatCard
          icon="favorite"
          label="Total Donations"
          value={totalDonations}
          unit="donations"
          variant="warm"
        />

        <InsightCard
          icon="trending_up"
          badge="This Month"
          title={`${percentageChange >= 0 ? "+" : ""}${percentageChange}% Increase`}
          description="Your contributions are growing steadily compared to last month."
        />

      </div>

      {/* Recent Donations */}
      <DonationTable
        donations={recentDonations}
        onViewAll={() => {}}
      />

    </div>
  );
}