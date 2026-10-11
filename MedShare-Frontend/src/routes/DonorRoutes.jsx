import { Routes, Route } from "react-router-dom";

import DonorLayout from "../layouts/DonorLayout";

import DashboardPage from "../pages/donor/dashboard/DashboardPage";
import AddNewMedicine from "../pages/donor/inventory/AddMedicinePage";
import MyDonationsPage from "../pages/donor/donations/MyDonationsPage";

function DonorRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DonorLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />

        <Route
          path="dashboard/addNewMedicine"
          element={<AddNewMedicine />}
        />

        <Route
          path="my-donations"
          element={<MyDonationsPage />}
        />
      </Route>
    </Routes>
  );
}

export default DonorRoutes;