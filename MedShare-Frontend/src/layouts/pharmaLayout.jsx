import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/pharmasist/pharmasidebar";
import TopHeader from "../components/pharmasist/pharmatopheader";

import "./PharmaLayout.css";

export default function PharmaLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="pharma-layout">

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {sidebarOpen && (
        <div
          className="pharma-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="pharma-main">

        <TopHeader
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="pharma-content">
          <Outlet />
        </main>

      </div>
    </div>
  );
}