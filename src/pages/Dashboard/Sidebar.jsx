import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import useRole from "../../hooks/useRole";
import {
  FaHome,
  FaTasks,
  FaClipboardList,
  FaMoneyCheckAlt,
  FaUserCog,
  FaUsers,
  FaCoins,
  FaHistory,
  FaBars,
  FaCog,
} from "react-icons/fa";
import { MdOutlineAddTask } from "react-icons/md";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const { role } = useRole(user?.email);
  const [isOpen, setIsOpen] = useState(false);

  const normalizedRole = role?.charAt(0).toUpperCase() + role?.slice(1).toLowerCase();

  const menu = {
    Worker: [
      { label: "Worker Home", path: "/dashboard/worker-home", icon: <FaHome /> },
      { label: "Task List", path: "/dashboard/tasklist", icon: <FaTasks /> },
      { label: "My Submissions", path: "/dashboard/submissions", icon: <FaClipboardList /> },
      { label: "Withdrawals", path: "/dashboard/withdrawals", icon: <FaMoneyCheckAlt /> },
    ],
    Buyer: [
      { label: "Buyer Home", path: "/dashboard/buyer-home", icon: <FaHome /> },
      { label: "Add New Tasks", path: "/dashboard/add-task", icon: <MdOutlineAddTask /> },
      { label: "My Tasks", path: "/dashboard/my-tasks", icon: <FaTasks /> },
      { label: "Purchase Coin", path: "/dashboard/purchase-coin", icon: <FaCoins /> },
      { label: "Payment History", path: "/dashboard/payment-history", icon: <FaHistory /> },
    ],
    Admin: [
      { label: "Admin Home", path: "/dashboard/admin-home", icon: <FaHome /> },
      { label: "Manage Users", path: "/dashboard/manage-users", icon: <FaUsers /> },
      { label: "Manage Tasks", path: "/dashboard/manage-tasks", icon: <FaTasks /> },
    ],
  };

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden bg-blue-50  px-4 py-3    shadow">
        <button onClick={() => setIsOpen(true)} className="text-2xl">
          <FaBars />
        </button>
   
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-blue-50 border-r w-64 min-h-screen z-50 transform fixed md:static top-0 left-0 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Close button on mobile */}
        <div className="md:hidden flex justify-end p-3">
          <button
            onClick={() => setIsOpen(false)}
            className="text-sm px-3 py-1 bg-yellow-400 rounded"
          >
            Close ✖
          </button>
        </div>

        <div className="flex flex-col justify-between h-full p-4 pt-0 md:pt-4">
          {/* Navigation */}
          <nav className="space-y-2">
            {menu[normalizedRole]?.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded font-medium ${
                    isActive
                      ? "bg-yellow-200 text-blue-900"
                      : "text-gray-800 hover:bg-yellow-100"
                  }`
                }
                onClick={() => setIsOpen(false)} // close sidebar on mobile after click
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Settings */}
          <div className="border-t pt-4 mt-4">
            <NavLink
              to="/dashboard/settings"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded font-medium ${
                  isActive
                    ? "bg-yellow-200 text-blue-900"
                    : "text-gray-800 hover:bg-yellow-100"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <FaCog />
              Settings
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
