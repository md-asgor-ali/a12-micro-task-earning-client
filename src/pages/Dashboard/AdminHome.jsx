import React from "react";

const AdminHome = () => {
  return (
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">🛡️ Welcome, Admin!</h2>
      <p className="text-gray-700 mb-2">
        As an admin, you can manage users and oversee all task submissions and activities.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="card bg-red-100 shadow p-4">
          <h3 className="text-xl font-semibold text-gray-800">Manage Users</h3>
          <p className="text-gray-600">Approve, block, or update user roles.</p>
        </div>
        <div className="card bg-blue-100 shadow p-4">
          <h3 className="text-xl font-semibold text-gray-800">Manage Tasks</h3>
          <p className="text-gray-600">Review and monitor all tasks submitted by buyers/workers.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
