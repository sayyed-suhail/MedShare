import "./StatCard.css";

/**
 * Reusable small stat box.
 * Props:
 *  - icon: material symbol name
 *  - label: small uppercase label
 *  - value: big number/text
 *  - unit: small text next to value (optional)
 *  - variant: "default" | "warm"  (controls icon circle + number color)
 */
export default function StatCard({
  icon,
  label,
  value,
  unit,
  variant = "default",
}) {
  return (
    <div className={`stat-card stat-card--${variant}`}>
      <div className="stat-card-decoration"></div>
      <div className="stat-card-top">
        <div className="stat-card-icon">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <span className="stat-card-label">{label}</span>
      </div>
      <div className="stat-card-value-row">
        <span className="stat-card-value">{value}</span>
        {unit && <span className="stat-card-unit">{unit}</span>}
      </div>
    </div>
  );
}
