import React, { useContext } from "react";
import useRole from "../../hooks/useRole";
import { AuthContext } from "../../contexts/AuthContext";

const Topbar = () => {
  const { user } = useContext(AuthContext);
  const { role, coins } = useRole(user?.email); // custom hook

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b shadow">
      <h1 className="text-xl font-bold text-yellow-500">🪙 MicroTask</h1>
      <div className="flex items-center space-x-4">
        <p className="text-gray-600 font-semibold">{coins} Coins</p>
        <img src={user?.photoURL} alt="User" className="w-10 h-10 rounded-full border" />
        <div className="text-right">
          <p className="text-sm font-semibold">{user?.displayName}</p>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
        <button className="btn btn-circle btn-ghost">
          <span className="indicator">
            <span className="badge badge-warning indicator-item"></span>
            🔔
          </span>
        </button>
      </div>
    </div>
  );
};

export default Topbar;
