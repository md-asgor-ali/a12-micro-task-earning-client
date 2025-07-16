import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import useRole from "../../hooks/useRole";
import { FaCoins } from "react-icons/fa";
import { Link } from "react-router";

const Topbar = () => {
  const { user } = useContext(AuthContext);
  const { role, coins } = useRole(user?.email); // custom role + coin fetch

  return (
    <div className="flex items-center justify-between p-4 bg-blue-950 text-white shadow">
      {/* Left: Logo */}
      <Link to="/">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <FaCoins className="text-yellow-400" />
          <span>
            Task<span className="text-yellow-400">Hive</span>
          </span>
        </div>
      </Link>

      {/* Right: User Info + Notification */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-sm font-semibold">
          <FaCoins className="text-yellow-400" />
          <span>{coins || 0} Coins</span>
        </div>

        <div className="text-right">
          <p className="font-medium">{user?.displayName || "User"}</p>
          <p className="text-xs text-gray-300 capitalize">{role}</p>
        </div>

        <img
          src={user?.photoURL}
          alt="User"
          className="w-10 h-10 rounded-full border-2 border-white object-cover"
        />

        <button className="btn btn-circle btn-ghost text-white text-xl relative">
          <span role="img" aria-label="Notifications">
            🔔
          </span>
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
