import './InsightCard.css';

/**
 * The dark green highlighted insight card (e.g. "+24% Increase").
 * Props: icon, badge, title, description
 */
export default function InsightCard({ icon, badge, title, description }) {
  return (
    <div className="insight-card">
      <div className="insight-card-top">
        <span className="material-symbols-outlined insight-card-icon">{icon}</span>
        <span className="insight-card-badge">{badge}</span>
      </div>
      <div className="insight-card-bottom">
        <h3 className="insight-card-title">{title}</h3>
        <p className="insight-card-desc">{description}</p>
      </div>
    </div>
  );
}
