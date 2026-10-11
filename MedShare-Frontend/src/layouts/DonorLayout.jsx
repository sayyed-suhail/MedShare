import { Outlet } from 'react-router-dom';

import Sidebar from '../components/donor/Sidebar';
import TopHeader from '../components/donor/TopHeader';
import BottomNav from '../components/donor/BottomNav';

import './DonorLayout.css';

export default function DonorLayout() {
  return (
    <div className="donor-layout">
      <Sidebar />

      <div className="donor-main">
        <TopHeader />

        <main className="donor-content">
          <Outlet />
        </main>
      </div>

      <BottomNav />
    </div>
  );
}