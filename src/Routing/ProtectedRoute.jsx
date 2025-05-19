import { Navigate } from "react-router-dom";
import UserAuth from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token, user } = UserAuth();
  return token && user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
