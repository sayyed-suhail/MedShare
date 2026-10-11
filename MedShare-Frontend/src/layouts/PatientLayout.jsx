import { Outlet } from "react-router-dom";
import "./PatientLayout.css";

import PatientSidebar from "../components/patient/patientsidebar";
import PatientTopHeader from "../components/patient/patienttopheader";

function PatientLayout() {
  return (
    <div className="pharma-layout">

      <PatientSidebar />

      <div className="pharma-main">

        <PatientTopHeader />

        <main className="pharma-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default PatientLayout;