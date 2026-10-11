import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/public/LandingPage";
import Footer from "../components/layout/Footer";

import AuthRoutes from "./AuthRoutes";
import DonorRoutes from "./DonorRoutes";
import PartnerRoutes from "./PartnerRoutes";
import PatientRoutes from "./PatientRoutes";

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route
        path="/"
        element={
          <>
            <LandingPage />
            <Footer />
          </>
        }
      />

      {/* Authentication */}
      <Route path="/*" element={<AuthRoutes />} />

      {/* Donor */}
      <Route path="/donor/*" element={<DonorRoutes />} />

      {/* Partner */}
      <Route path="/partner/*" element={<PartnerRoutes />} />

      {/* Patient */}
      <Route path="/patient/*" element={<PatientRoutes />} />
    </Routes>
  );
}

export default AppRoutes;
