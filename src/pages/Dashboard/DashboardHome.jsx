// 📁 src/pages/Dashboard/DashboardHome.jsx
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";


const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const { displayName, role, photoURL, coins } = user || {};

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Welcome, {displayName || "User"}! 🎉</h2>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Profile Info */}
        <div className="flex items-center gap-4">
          <img
            src={photoURL || "https://i.ibb.co/2YcWzvZ/avatar-placeholder.png"}
            alt="User"
            className="w-20 h-20 rounded-full border"
          />
          <div>
            <p className="text-lg font-semibold text-gray-800">{displayName}</p>
            <p className="text-sm text-gray-600 capitalize">Role: {role}</p>
          </div>
        </div>

        {/* Coin Info */}
        <div className="text-right">
          <p className="text-lg font-bold text-green-600">💰 {coins || 0} Coins</p>
          <p className="text-sm text-gray-500">Available Balance</p>
        </div>
      </div>

      {/* Role Based Greeting or Info */}
      <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
        {role === "Worker" && <p className="text-blue-700">Ready to complete some tasks? Check the TaskList now!</p>}
        {role === "Buyer" && <p className="text-blue-700">Want to outsource work? Add a new task to get started!</p>}
        {role === "Admin" && <p className="text-blue-700">Manage users and tasks to keep the system running smoothly.</p>}
      </div>
    </div>
  );
};

export default DashboardHome;
