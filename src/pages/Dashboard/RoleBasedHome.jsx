// RoleBasedHome.jsx
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import BuyerHome from "../pages/dashboard/BuyerHome";
import AdminHome from "../pages/dashboard/AdminHome";
import WorkerHome from "../pages/dashboard/WorkerHome";

const RoleBasedHome = () => {
  const { userRole } = useContext(AuthContext); // assume you're setting this role after login

  if (userRole === "admin") return <AdminHome />;
  if (userRole === "buyer") return <BuyerHome />;
  if (userRole === "worker") return <WorkerHome />;
  return <div>Loading...</div>;
};

export default RoleBasedHome;
