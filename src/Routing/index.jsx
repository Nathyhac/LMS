import { Routes, Route } from "react-router-dom";
import AnalyticsLayout from "../layouts/AnalyticsLayout.jsx";
import Login from "../pages/Login.jsx";
import Company from "../pages/CompanyPage.jsx";
import Dashboard from "../Component/Dashboard.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

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
        <Route path="company-list" element={<Company />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Route>

      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/logout" element={<Logout />} /> */}
    </Routes>
  );
}
