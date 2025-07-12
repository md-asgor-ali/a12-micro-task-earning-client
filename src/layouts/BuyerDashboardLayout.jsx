// BuyerDashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../shared/Sidebar";

const BuyerDashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50 p-4 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default BuyerDashboardLayout;