import './TopHeader.css';

export default function TopHeader() {
  return (
    <header className="top-header">
      {/* Search */}
      <div className="search-box">
        <span className="material-symbols-outlined search-icon">search</span>
        <input className="search-input" type="text" placeholder="Search medicine..." />
      </div>

      {/* Trailing icons */}
      <div className="header-actions">
        <button className="notif-btn" type="button" aria-label="Notifications">
          <span className="material-symbols-outlined">notifications</span>
          <span className="notif-dot"></span>
        </button>
        <button className="avatar-btn" type="button" aria-label="Profile">
          <img
            className="avatar-img"
            alt="User profile"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9JUe6SSthAnl9NazMmsQe5FnGLveQQUehhI3R-DvY_ebC9i02Rg8erxJjup_2-_wLvZqKYorNd5pMEVYo87KahSFzPC_gu9Y7dwKOzPozXWPHLvTvX_Ru8V6gmT0ZqpZoVgPEPt3t5bvL2Z0n_9GeZT0Qtn120HA6u6eHPOzvsweQtmt5J-jz65yPVFK5Gm-alFcJYuCq5Lg9P19w6EwHyXP-kLqYfQVta1sV2c7xsVzW1_se0d_cYg"
          />
        </button>
      </div>
    </header>
  );
}
