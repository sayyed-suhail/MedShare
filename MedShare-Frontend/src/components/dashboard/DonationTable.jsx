import "./DonationTable.css";

const statusStyles = {
  "Picked Up": "status-badge--picked-up",
  Approved: "status-badge--approved",
  Pending: "status-badge--pending",
};

/**
 * Reusable table.
 * Props:
 *  - donations: array of { id, name, category, date, status, icon }
 *  - onViewAll: function called when "View All" is clicked
 */
export default function DonationsTable({ donations, onViewAll }) {
  return (
    <section className="donations-table-card">
      <div className="donations-table-header">
        <h3 className="donations-table-title">
          <span className="material-symbols-outlined">list_alt</span>
          Recent Donations
        </h3>
        <button className="view-all-btn" type="button" onClick={onViewAll}>
          View All{" "}
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>

      <div className="donations-table-scroll">
        <table className="donations-table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th className="hide-on-mobile">Category</th>
              <th>Date Submitted</th>
              <th className="align-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="medicine-cell">
                    <div className="medicine-icon">
                      <span className="material-symbols-outlined">
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <p className="medicine-name">{item.name}</p>
                      <p className="medicine-category-mobile">
                        {item.category}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="hide-on-mobile">{item.category}</td>
                <td>{item.date}</td>
                <td className="align-right">
                  <span
                    className={`status-badge ${statusStyles[item.status] || ""}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
