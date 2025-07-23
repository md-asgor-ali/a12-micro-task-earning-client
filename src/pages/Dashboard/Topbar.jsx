import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import useRole from "../../hooks/useRole";
import { FaCoins, FaHome } from "react-icons/fa";
import { Link } from "react-router"; 
import { FiBell } from "react-icons/fi";

const Topbar = () => {
  const { user } = useContext(AuthContext);
  const { role, coins } = useRole(user?.email); // role and coin fetch

  return (
    <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-blue-950 text-white shadow-md">
      {/* Left: Logo */}
      <Link to="/" className="flex items-center gap-2 text-xl md:text-2xl font-bold">
        <FaCoins className="text-yellow-400" />
        <span>
          Task<span className="text-yellow-400">Hive</span>
        </span>
      </Link>

      {/* Middle: Home Link */}
      <Link
        to="/"
        className="hidden md:flex items-center gap-1 text-sm md:text-base font-medium hover:text-yellow-400 transition-colors"
      >
        <FaHome className="text-yellow-400" />
        Home
      </Link>

      {/* Right: User Info */}
      <div className="flex items-center gap-3 md:gap-4 mt-2 md:mt-0">
        {/* Coins */}
        <div className="flex items-center gap-1 text-sm font-semibold">
          <FaCoins className="text-yellow-400" />
          <span>{coins || 0} Coins</span>
        </div>

        {/* Name & Role */}
        <div className="hidden sm:block text-right leading-tight">
          <p className="text-sm font-medium truncate w-20 md:w-32">{user?.displayName || "User"}</p>
          <p className="text-xs text-gray-300 capitalize">{role}</p>
        </div>

        {/* Profile Picture */}
        <img
          src={user?.photoURL}
          alt="User"
          className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-white object-cover"
        />

        {/* Notification Bell */}
        <button className="btn btn-circle btn-ghost text-white text-xl relative">
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
          <FiBell />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
