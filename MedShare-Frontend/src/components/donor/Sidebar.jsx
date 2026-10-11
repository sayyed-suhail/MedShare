import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const navItems = [
  { to: '/donor/dashboard', label: 'Dashboard', icon: 'dashboard' },
  // { to: '/donor/inventory', label: 'Inventory', icon: 'inventory_2' },
  // { to: '/donor/verifications', label: 'Verifications', icon: 'verified_user' },
  { to: '/donor/my-donations', label: 'My Donations', icon: 'volunteer_activism' },
  // { to: '/donor/find-medicine', label: 'Find Medicine', icon: 'search_check' },
  // { to: '/donor/my-requests', label: 'My Requests', icon: 'history' },
];

export default function Sidebar() {
  return (
    <nav className="sidebar">

      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">
          <span className="material-symbols-outlined">
            medical_services
          </span>
        </div>

        <div className="sidebar-brand-text">
          <h1 className="sidebar-brand-name">MedShare</h1>
          <p className="sidebar-brand-tagline">Clinical Clarity</p>
        </div>
      </div>

      {/* Navigation */}
      <ul className="sidebar-nav">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? 'sidebar-link--active' : ''
                }`
              }
            >
              <span className="material-symbols-outlined">
                {item.icon}
              </span>

              <span className="sidebar-link-label">
                {item.label}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* CTA + Footer Links */}
      <div className="sidebar-footer">

        {/* <button className="sidebar-cta" type="button">
          <span className="material-symbols-outlined">
            add_circle
          </span>

        
        </button> */}

        <div className="sidebar-footer-links">

          <a
            className="sidebar-link sidebar-link--small"
            href="#"
          >
            <span className="material-symbols-outlined">
              settings
            </span>

            <span className="sidebar-link-label">
              Settings
            </span>
          </a>

          <a
            className="sidebar-link sidebar-link--small"
            href="#"
          >
            <span className="material-symbols-outlined">
              help
            </span>

            <span className="sidebar-link-label">
              Help
            </span>
          </a>

        </div>
      </div>

    </nav>
  );
}