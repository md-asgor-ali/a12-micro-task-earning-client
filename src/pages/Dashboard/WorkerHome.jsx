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
      // Fetch worker stats
      axiosSecure
        .get(`/worker/stats?email=${user.email}`)
        .then((res) => {
          setStats(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch worker stats", err);
        });

      // Fetch approved submissions
      axiosSecure
        .get(`/submissions/worker/approved?email=${user.email}`)
        .then((res) => {
          if (Array.isArray(res.data)) {
            setApprovedSubmissions(res.data);
          } else {
            console.warn("Invalid approved submissions format", res.data);
            setApprovedSubmissions([]);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch approved submissions", err);
          setApprovedSubmissions([]);
        });
    }
  }, [user, axiosSecure]);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <h2 className="text-2xl font-bold text-center">
        Welcome, {user?.displayName || "Worker"}
      </h2>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow rounded text-center">
          <p>Total Submissions</p>
          <h3 className="text-xl font-bold">{stats.totalSubmissions}</h3>
        </div>
        <div className="p-4 bg-white shadow rounded text-center">
          <p>Pending Submissions</p>
          <h3 className="text-xl font-bold">{stats.pendingSubmissions}</h3>
        </div>
        <div className="p-4 bg-white shadow rounded text-center">
          <p>Total Earnings</p>
          <h3 className="text-xl font-bold">{stats.totalEarnings} coins</h3>
        </div>
      </div>

      {/* Approved Submissions Table */}
      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-lg font-semibold mb-4">Approved Submissions</h3>
        {Array.isArray(approvedSubmissions) && approvedSubmissions.length === 0 ? (
          <p>No approved submissions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Task Title</th>
                  <th>Payable Amount</th>
                  <th>Buyer Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {approvedSubmissions.map((sub, index) => (
                  <tr key={index}>
                    <td>{sub.task_title}</td>
                    <td>{sub.payable_amount} coins</td>
                    <td>{sub.buyer_name}</td>
                    <td>
                      <span className="badge badge-success text-white">
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
