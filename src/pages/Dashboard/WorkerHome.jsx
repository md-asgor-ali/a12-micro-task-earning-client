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
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-6 space-y-8">
      {/* Welcome */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-primary">
        Welcome, {user?.displayName || "Worker"}
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-5 bg-white shadow-md rounded-xl text-center border border-gray-200">
          <p className="text-sm sm:text-base text-gray-500">Total Submissions</p>
          <h3 className="text-2xl font-extrabold text-gray-800">{stats.totalSubmissions}</h3>
        </div>
        <div className="p-5 bg-white shadow-md rounded-xl text-center border border-gray-200">
          <p className="text-sm sm:text-base text-gray-500">Pending Submissions</p>
          <h3 className="text-2xl font-extrabold text-gray-800">{stats.pendingSubmissions}</h3>
        </div>
        <div className="p-5 bg-white shadow-md rounded-xl text-center border border-gray-200">
          <p className="text-sm sm:text-base text-gray-500">Total Earnings</p>
          <h3 className="text-2xl font-extrabold text-green-600">{stats.totalEarnings} coins</h3>
        </div>
      </div>

      {/* Approved Submissions Table */}
      <div className="bg-white p-4 sm:p-6 shadow-md rounded-xl border border-gray-100">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
          Approved Submissions
        </h3>

        {approvedSubmissions.length === 0 ? (
          <p className="text-gray-500 text-sm sm:text-base">
            No approved submissions yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-100 text-left text-xs sm:text-sm">
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
