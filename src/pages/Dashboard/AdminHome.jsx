// src/pages/Dashboard/AdminHome.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalWorkers: 0,
    totalBuyers: 0,
    totalCoins: 0,
    totalPayments: 0,
  });
  const [withdrawRequests, setWithdrawRequests] = useState([]);

  useEffect(() => {
    axios.get("/admin/stats").then((res) => setStats(res.data));
    axios.get("/admin/withdrawals").then((res) => {
      if (Array.isArray(res.data)) setWithdrawRequests(res.data);
      else setWithdrawRequests([]);
    });
  }, []);

  const handleApproveWithdrawal = async (withdrawalId, email, coin) => {
    try {
      await axios.patch(`/admin/withdrawals/${withdrawalId}`, { email, coin });
      Swal.fire("Approved!", "Withdrawal approved successfully.", "success");
      setWithdrawRequests((prev) =>
        prev.filter((req) => req._id !== withdrawalId)
      );
    } catch (err) {
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome, Admin</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white shadow rounded">Total Workers: <strong>{stats.totalWorkers}</strong></div>
        <div className="p-4 bg-white shadow rounded">Total Buyers: <strong>{stats.totalBuyers}</strong></div>
        <div className="p-4 bg-white shadow rounded">Total Coins: <strong>{stats.totalCoins}</strong></div>
        <div className="p-4 bg-white shadow rounded">Total Payments: <strong>${stats.totalPayments}</strong></div>
      </div>

      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-lg font-semibold mb-2">Withdrawal Requests</h3>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Worker Name</th>
                <th>Email</th>
                <th>Coins</th>
                <th>Amount ($)</th>
                <th>Payment System</th>
                <th>Account</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {withdrawRequests.map((req) => (
                <tr key={req._id}>
                  <td>{req.worker_name}</td>
                  <td>{req.worker_email}</td>
                  <td>{req.withdrawal_coin}</td>
                  <td>{req.withdrawal_amount}</td>
                  <td>{req.payment_system}</td>
                  <td>{req.account_number}</td>
                  <td>{new Date(req.withdraw_date).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() => handleApproveWithdrawal(req._id, req.worker_email, req.withdrawal_coin)}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {withdrawRequests.length === 0 && <p className="mt-4 text-center text-gray-500">No pending withdrawals.</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
