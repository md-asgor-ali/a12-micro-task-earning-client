// components/DashboardLayout.jsx

import { Outlet } from "react-router";
import Topbar from "../pages/Dashboard/Topbar";
import Sidebar from "../pages/Dashboard/Sidebar";
import Footer from "../components/Footer";





const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
