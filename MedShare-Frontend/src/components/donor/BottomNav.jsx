import { NavLink } from 'react-router-dom';
import './BottomNav.css';

const mobileNavItems = [
  { to: '/donor/dashboard', label: 'Home', icon: 'home' },
  { to: '/donor/activity', label: 'Activity', icon: 'analytics' },
  { to: '/donor/inventory', label: 'Inventory', icon: 'medication' },
  { to: '/donor/profile', label: 'Profile', icon: 'person' },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {mobileNavItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `bottom-nav-link ${isActive ? 'bottom-nav-link--active' : ''}`
          }
        >
          <span className="material-symbols-outlined">{item.icon}</span>
          <span className="bottom-nav-label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
