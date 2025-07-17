// RoleBasedHome.jsx
import React, { useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import BuyerHome from "./BuyerHome";
import AdminHome from "./AdminHome";
import WorkerHome from "./WorkerHome";

const RoleBasedHome = () => {
  const { userRole } = useContext(AuthContext);  

  if (userRole?.toLowerCase() === "admin") return <AdminHome />;
  if (userRole?.toLowerCase() === "buyer") return <BuyerHome />;
  if (userRole?.toLowerCase() === "worker") return <WorkerHome />;
  return <div>Loading...</div>;
};

export default RoleBasedHome;
