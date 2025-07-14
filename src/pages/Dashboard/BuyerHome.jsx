import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const BuyerHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const [stats, setStats] = useState({ taskCount: 0, pendingWorkers: 0, totalPaid: 0 });
  const [pendingSubmissions, setPendingSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/buyer/stats?email=${user.email}`)
        .then(res => setStats(res.data))
        .catch(err => {
          console.error("Failed to fetch buyer stats:", err);
          setStats({ taskCount: 0, pendingWorkers: 0, totalPaid: 0 });
        });

      axiosSecure.get(`/submissions/pending?buyerEmail=${user.email}`)
        .then(res => {
          const data = res.data;
          if (Array.isArray(data)) {
            setPendingSubmissions(data);
          } else {
            console.warn("Invalid response for pending submissions:", data);
            setPendingSubmissions([]);
          }
        })
        .catch(err => {
          console.error("Failed to fetch submissions:", err);
          setPendingSubmissions([]);
        });
    }
  }, [user, axiosSecure]);

  const handleApprove = async (submissionId, workerEmail, payableAmount) => {
    try {
      await axiosSecure.patch(`/submissions/approve/${submissionId}`, { workerEmail, payableAmount });
      Swal.fire("Approved!", "Submission approved successfully.", "success");
      setPendingSubmissions(prev => prev.filter(s => s._id !== submissionId));
    } catch (err) {
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  const handleReject = async (submissionId, taskId) => {
    try {
      await axiosSecure.patch(`/submissions/reject/${submissionId}`, { taskId });
      Swal.fire("Rejected!", "Submission rejected.", "info");
      setPendingSubmissions(prev => prev.filter(s => s._id !== submissionId));
    } catch (err) {
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome, {user?.displayName}</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white shadow rounded">Total Tasks: <strong>{stats.taskCount}</strong></div>
        <div className="p-4 bg-white shadow rounded">Pending Workers: <strong>{stats.pendingWorkers}</strong></div>
        <div className="p-4 bg-white shadow rounded">Total Paid: <strong>{stats.totalPaid} coins</strong></div>
      </div>

      {/* Task to Review Table */}
      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-lg font-semibold mb-2">Tasks to Review</h3>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Worker Name</th>
                <th>Task Title</th>
                <th>Payable Amount</th>
                <th>Submission</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingSubmissions.map(sub => (
                <tr key={sub._id}>
                  <td>{sub.worker_name}</td>
                  <td>{sub.task_title}</td>
                  <td>{sub.payable_amount}</td>
                  <td>
                    <button
                      className="btn btn-xs btn-outline"
                      onClick={() => setSelectedSubmission(sub)}
                    >
                      View Submission
                    </button>
                  </td>
                  <td className="flex gap-2">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h3 className="text-lg font-bold mb-2">Submission Detail</h3>
            <p>{selectedSubmission.submission_detail}</p>
            <button
              className="mt-4 btn btn-sm btn-warning"
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
