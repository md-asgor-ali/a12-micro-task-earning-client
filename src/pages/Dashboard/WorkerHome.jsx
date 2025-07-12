import React from "react";

const WorkerHome = () => {
  return (
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-2xl font-bold text-yellow-600 mb-4">👷‍♂️ Welcome, Worker!</h2>
      <p className="text-gray-700 mb-2">
        Here you can view available tasks, submit your work, and request withdrawals.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="card bg-yellow-100 shadow p-4">
          <h3 className="text-xl font-semibold text-gray-800">Task List</h3>
          <p className="text-gray-600">Browse and apply to tasks.</p>
        </div>
        <div className="card bg-blue-100 shadow p-4">
          <h3 className="text-xl font-semibold text-gray-800">My Submissions</h3>
          <p className="text-gray-600">Track your completed work.</p>
        </div>
        <div className="card bg-green-100 shadow p-4">
          <h3 className="text-xl font-semibold text-gray-800">Withdraw Coins</h3>
          <p className="text-gray-600">Request payout of earned coins.</p>
        </div>
      </div>
    </div>
  );
};

export default WorkerHome;
