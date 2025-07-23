// components/DashboardLayout.jsx

import { Outlet } from "react-router";
import Topbar from "../pages/Dashboard/Topbar";
import Sidebar from "../pages/Dashboard/Sidebar";
import Footer from "../components/Footer";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false); // For mobile sidebar toggle

  return (
    <div className="flex flex-col min-h-screen">
      {/* Topbar (always visible) */}
      <Topbar />

      {/* Mobile Hamburger Button (shown only on small screens) */}
      <div className="md:hidden w-full px-4 py-2 flex justify-end bg-blue-100 shadow">
        <button
          onClick={() => setIsOpen(true)}
          className="text-2xl text-blue-900"
        >
          <FaBars />
        </button>
      </div>

      {/* Sidebar + Main Content */}
      <div className="flex flex-1">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="flex-1 p-3 md:p-6 bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
