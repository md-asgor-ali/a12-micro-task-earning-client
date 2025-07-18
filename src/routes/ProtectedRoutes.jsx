import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import Forbidden from "../pages/Forbidden/Forbidden";

export const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, roleLoading] = useUserRole();

  if (loading || roleLoading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" replace />;

  if (role !== "Admin") return <Forbidden />;

  return children;
};

export const BuyerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, roleLoading] = useUserRole();

  if (loading || roleLoading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" replace />;

  if (role !== "Buyer") return <Forbidden />;

  return children;
};

export const WorkerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, roleLoading] = useUserRole();

  if (loading || roleLoading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" replace />;

  if (role !== "Worker") return <Forbidden />;

  return children;
};
