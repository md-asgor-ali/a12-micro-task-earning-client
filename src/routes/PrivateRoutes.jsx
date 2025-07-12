// utils/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  const userRole = user?.role; // Fetch from DB or context

  if (!user || !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
