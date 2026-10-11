import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Footer from "../components/layout/Footer";

function AuthRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <>
            <LoginPage />
            <Footer />
          </>
        }
      />

      <Route
        path="/RegisterPage"
        element={
          <>
            <RegisterPage />
            <Footer />
          </>
        }
      />

      <Route
        path="/ForgotPassword"
        element={
          <>
            <ForgotPassword />
            <Footer />
          </>
        }
      />
    </Routes>
  );
}

export default AuthRoutes;
