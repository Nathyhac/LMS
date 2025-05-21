import { Routes, Route } from "react-router-dom";
import AnalyticsLayout from "../Component/AnalyticsLayout.jsx";
import Login from "../pages/Login.jsx";
import Company from "../pages/CompanyPage.jsx";
import Dashboard from "../Component/Dashboard.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Products from "../pages/ProductPage.jsx";
import Licenses from "../pages/LicensePage.jsx";
import PendingLicense from "../pages/PendingLicensePage.jsx";
import ActiveLicense from "../pages/ActiveLicensePage.jsx";
import ExpiredLicense from "../pages/ExpiredLicensePage.jsx";

export default function Routing() {
  return (
    <Routes>
      <Route
        path="/nisir"
        element={
          <ProtectedRoute>
            <AnalyticsLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="companies" element={<Company />} />
        <Route path="products" element={<Products />} />
        <Route path="licenses" element={<Licenses />} />
        <Route path="activelicenses" element={<ActiveLicense />} />
        <Route path="pendinglicenses" element={<PendingLicense />} />
        <Route path="expiredlicenses" element={<ExpiredLicense />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Route>

      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/logout" element={<Logout />} /> */}
    </Routes>
  );
}
