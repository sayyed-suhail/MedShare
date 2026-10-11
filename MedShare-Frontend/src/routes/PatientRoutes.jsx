// import { Routes } from "react-router-dom";

import PatientLayout from "../layouts/PatientLayout";

import DashboardPage from "../pages/patient/dashboard/DashboardPage";

import FindMedicinePage from "../pages/patient/find-medicine/FindMedicinePage";

import PatientMedicineDetailsPage from "../pages/patient/MedicineDetails/PatientMedicineDetailsPage";
import { Route, Routes } from "react-router-dom";


function PatientRoutes() {
  return <Routes>
               <Route element={<PatientLayout/>}>
              <Route path="DashboardPage"
                     element={<DashboardPage/>}
                   />
                   <Route path="find-medicine"
                   element={<FindMedicinePage/>}
                   />
                   <Route path="PatientMedicinePage"
                   element={<PatientMedicineDetailsPage/>}
                   />

                   
    
    
    
    </Route>




  </Routes>;
}

export default PatientRoutes;
