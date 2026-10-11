import { Routes, Route } from "react-router-dom";

import PharmaLayout from "../layouts/pharmaLayout";
import DashboardPage from "../pages/partner/dashboard/DashboardPage";
import VerificationPage from "../pages/partner/verifications/VerificationPage";
import InventoryPage from "../pages/partner/inventory/InventoryPage";
import PickupPage from "../pages/partner/schedule pickup/PickupPage";
import PatientrequestPage from "../pages/partner/patient request/PatientrequestPage";

import FindMedicinePage from "../pages/partner/FindMedicine/FindMedicinePage"; 


export default function PartnerRoutes() {
  return (
    <Routes>
      <Route element={<PharmaLayout />}>

        <Route
          path="dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="verifications"
          element={<VerificationPage />}
        />
      <Route
         path="inventory"
         element={<InventoryPage/>}
         />

      <Route
          path="schedule-pickup"
          element={<PickupPage/>}
          />
        <Route
          path="patient-requests"
          element={<PatientrequestPage/>}

          />
        <Route
        path="find-medicine"
        element={<FindMedicinePage/>}
        />
      


      </Route>
    </Routes>
  );
}