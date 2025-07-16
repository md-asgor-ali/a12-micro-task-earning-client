import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BuyerHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [stats, setStats] = useState({ taskCount: 0, pendingWorkers: 0, totalPaid: 0 });
  const [pendingSubmissions, setPendingSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/buyer/stats?email=${user.email}`)
        .then(res => setStats(res.data))
        .catch(() => setStats({ taskCount: 0, pendingWorkers: 0, totalPaid: 0 }));

      axiosSecure.get(`/submissions/pending?buyerEmail=${user.email}`)
        .then(res => {
          if (Array.isArray(res.data)) setPendingSubmissions(res.data);
          else setPendingSubmissions([]);
        })
        .catch(() => setPendingSubmissions([]));
    }
  }, [user, axiosSecure]);

  const handleApprove = async (submissionId, workerEmail, payableAmount) => {
    try {
      await axiosSecure.patch(`/submissions/approve/${submissionId}`, { workerEmail, payableAmount });
      Swal.fire("Approved!", "Submission approved successfully.", "success");
      setPendingSubmissions(prev => prev.filter(s => s._id !== submissionId));
    } catch {
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  const handleReject = async (submissionId, taskId) => {
    try {
      await axiosSecure.patch(`/submissions/reject/${submissionId}`, { taskId });
      Swal.fire("Rejected!", "Submission rejected.", "info");
      setPendingSubmissions(prev => prev.filter(s => s._id !== submissionId));
    } catch {
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6 max-w-7xl mx-auto space-y-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
        Welcome, {user?.displayName || "Buyer"}
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow rounded text-center">
          <p className="text-sm md:text-base">Total Tasks</p>
          <h3 className="text-xl font-bold">{stats.taskCount}</h3>
        </div>
        <div className="p-4 bg-white shadow rounded text-center">
          <p className="text-sm md:text-base">Pending Workers</p>
          <h3 className="text-xl font-bold">{stats.pendingWorkers}</h3>
        </div>
        <div className="p-4 bg-white shadow rounded text-center">
          <p className="text-sm md:text-base">Total Paid</p>
          <h3 className="text-xl font-bold">{stats.totalPaid} coins</h3>
        </div>
      </div>

      {/* Tasks to Review Table */}
      <div className="bg-white p-4 shadow rounded overflow-x-auto">
        <h3 className="text-lg font-semibold mb-3">Tasks to Review</h3>
        <table className="table w-full text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Worker</th>
              <th className="p-2 text-left">Task</th>
              <th className="p-2 text-left">Pay</th>
              <th className="p-2 text-left">Submission</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingSubmissions.map(sub => (
              <tr key={sub._id} className="hover:bg-gray-50">
                <td className="p-2">{sub.worker_name}</td>
                <td className="p-2 break-words max-w-xs">{sub.task_title}</td>
                <td className="p-2">{sub.payable_amount}</td>
                <td className="p-2">
                  <button
                    className="btn btn-xs btn-outline"
                    onClick={() => setSelectedSubmission(sub)}
                  >
                    View
                  </button>
                </td>
                <td className="p-2">
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() => handleApprove(sub._id, sub.worker_email, sub.payable_amount)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleReject(sub._id, sub.task_id)}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <div className="bg-white p-6 rounded shadow w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-2">Submission Detail</h3>
            <p className="text-sm md:text-base">{selectedSubmission.submission_detail}</p>
            <button
              className="mt-4 btn btn-sm btn-warning w-full"
              onClick={() => setSelectedSubmission(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerHome;
