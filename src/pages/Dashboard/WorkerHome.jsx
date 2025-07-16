import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const WorkerHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [stats, setStats] = useState({
    totalSubmissions: 0,
    pendingSubmissions: 0,
    totalEarnings: 0,
  });

  const [approvedSubmissions, setApprovedSubmissions] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/worker/stats?email=${user.email}`)
        .then((res) => setStats(res.data))
        .catch((err) => console.error("Failed to fetch worker stats", err));

      axiosSecure
        .get(`/submissions/worker/approved?email=${user.email}`)
        .then((res) => {
          if (Array.isArray(res.data)) {
            setApprovedSubmissions(res.data);
          } else {
            setApprovedSubmissions([]);
            console.warn("Unexpected format", res.data);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch approved submissions", err);
          setApprovedSubmissions([]);
        });
    }
  }, [user, axiosSecure]);

  return (
    <div className="px-4 md:px-8 py-6 space-y-8">
      {/* Welcome */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
        Welcome, {user?.displayName || "Worker"}
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow rounded text-center">
          <p className="text-sm md:text-base text-gray-600">Total Submissions</p>
          <h3 className="text-xl md:text-2xl font-bold">{stats.totalSubmissions}</h3>
        </div>
        <div className="p-4 bg-white shadow rounded text-center">
          <p className="text-sm md:text-base text-gray-600">Pending Submissions</p>
          <h3 className="text-xl md:text-2xl font-bold">{stats.pendingSubmissions}</h3>
        </div>
        <div className="p-4 bg-white shadow rounded text-center">
          <p className="text-sm md:text-base text-gray-600">Total Earnings</p>
          <h3 className="text-xl md:text-2xl font-bold">{stats.totalEarnings} coins</h3>
        </div>
      </div>

      {/* Approved Submissions */}
      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-lg md:text-xl font-semibold mb-4">Approved Submissions</h3>
        {approvedSubmissions.length === 0 ? (
          <p className="text-gray-500 text-sm md:text-base">No approved submissions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full text-sm md:text-base">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2">Task Title</th>
                  <th className="p-2">Pay</th>
                  <th className="p-2">Buyer</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {approvedSubmissions.map((sub, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-2">{sub.task_title}</td>
                    <td className="p-2">{sub.payable_amount} coins</td>
                    <td className="p-2">{sub.buyer_name || "N/A"}</td>
                    <td className="p-2">
                      <span className="badge badge-success text-white text-xs sm:text-sm">
                        {sub.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerHome;
