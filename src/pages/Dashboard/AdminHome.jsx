import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalWorkers: 0,
    totalBuyers: 0,
    totalCoins: 0,
    totalPayments: 0,
  });
  const [withdrawRequests, setWithdrawRequests] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/admin/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Failed to fetch admin stats", err));

    axiosSecure
      .get("/withdrawals/pending")
      .then((res) => {
        if (Array.isArray(res.data)) setWithdrawRequests(res.data);
        else setWithdrawRequests([]);
      })
      .catch((err) => {
        console.error("Failed to fetch withdrawals", err);
        setWithdrawRequests([]);
      });
  }, [axiosSecure]);

  const handleApproveWithdrawal = async (withdrawalId) => {
    try {
      await axiosSecure.patch(`/withdrawals/approve/${withdrawalId}`);
      Swal.fire("Approved!", "Withdrawal approved successfully.", "success");
      setWithdrawRequests((prev) =>
        prev.filter((req) => req._id !== withdrawalId)
      );
    } catch (err) {
      Swal.fire("Error", "Something went wrong.", "error");
      console.error("Withdrawal approval error:", err);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center md:text-left">Welcome, Admin</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white shadow rounded text-center">
          Total Workers: <strong>{stats.totalWorkers}</strong>
        </div>
        <div className="p-4 bg-white shadow rounded text-center">
          Total Buyers: <strong>{stats.totalBuyers}</strong>
        </div>
        <div className="p-4 bg-white shadow rounded text-center">
          Total Coins: <strong>{stats.totalCoins}</strong>
        </div>
        <div className="p-4 bg-white shadow rounded text-center">
          Total Payments: <strong>{stats.totalPayments}</strong>
        </div>
      </div>

      {/* Withdrawal Requests */}
      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-lg font-semibold mb-2">Withdrawal Requests</h3>
        <div className="overflow-x-auto">
          <table className="table w-full min-w-[700px] md:min-w-full">
            <thead>
              <tr>
                <th className="whitespace-nowrap">Worker Name</th>
                <th className="whitespace-nowrap">Email</th>
                <th className="whitespace-nowrap">Coins</th>
                <th className="whitespace-nowrap">Amount ($)</th>
                <th className="whitespace-nowrap">Payment System</th>
                <th className="whitespace-nowrap">Account</th>
                <th className="whitespace-nowrap">Date</th>
                <th className="whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {withdrawRequests.map((req) => (
                <tr key={req._id} className="hover:bg-gray-50">
                  <td className="p-2">{req.worker_name}</td>
                  <td className="p-2 break-words max-w-xs">{req.worker_email}</td>
                  <td className="p-2">{req.withdrawal_coin}</td>
                  <td className="p-2">{req.withdrawal_amount}</td>
                  <td className="p-2">{req.payment_system}</td>
                  <td className="p-2 break-words max-w-xs">{req.account_number}</td>
                  <td className="p-2">
                    {req.withdraw_date
                      ? new Date(req.withdraw_date).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-2">
                    <button
                      className="btn btn-xs btn-success whitespace-nowrap"
                      onClick={() => handleApproveWithdrawal(req._id)}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {withdrawRequests.length === 0 && (
            <p className="mt-4 text-center text-gray-500">No pending withdrawals.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
