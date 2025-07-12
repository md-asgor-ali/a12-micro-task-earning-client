import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import useRole from "../../hooks/useRole";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const { role, coins } = useRole(user?.email);

  // Normalize role (e.g., admin → Admin)
  const normalizedRole = role?.charAt(0).toUpperCase() + role?.slice(1).toLowerCase();

  const menu = {
    Worker: [
      { label: "Home", path: "/dashboard/home" },
      { label: "Task List", path: "/dashboard/tasklist" },
      { label: "My Submissions", path: "/dashboard/submissions" },
      { label: "Withdrawals", path: "/dashboard/withdrawals" },
    ],
    Buyer: [
      { label: "Home", path: "/dashboard/home" },
      { label: "Add New Tasks", path: "/dashboard/add-task" },
      { label: "My Tasks", path: "/dashboard/my-tasks" },
      { label: "Purchase Coin", path: "/dashboard/purchase-coin" },
      { label: "Payment History", path: "/dashboard/payment-history" },
    ],
    Admin: [
      { label: "Home", path: "/dashboard/home" },
      { label: "Manage Users", path: "/dashboard/manage-users" },
      { label: "Manage Tasks", path: "/dashboard/manage-tasks" },
    ],
  };

  return (
    <aside className="w-64 min-h-screen bg-white border-r p-4 flex flex-col space-y-4">
      {/* User Info */}
      <div className="bg-blue-50 p-3 rounded shadow text-sm text-gray-800">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={user?.photoURL}
            alt="User"
            className="w-9 h-9 rounded-full border"
          />
          <div>
            <div className="font-semibold">{user?.displayName || "User"}</div>
            <div className="text-xs text-gray-600 capitalize">Role: {role || "..."}</div>
          </div>
        </div>
        <div>
          <span className="font-semibold">Coins:</span> {coins ?? "Loading..."}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2">
        {menu[normalizedRole] ? (
          menu[normalizedRole].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="px-3 py-2 rounded hover:bg-yellow-200 text-gray-800 font-medium"
            >
              {item.label}
            </Link>
          ))
        ) : (
          <p className="text-gray-400 px-3">Loading menu...</p>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
