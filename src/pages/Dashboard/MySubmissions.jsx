import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MySubmissions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/submissions/worker?email=${user.email}`)
        .then((res) => {
          console.log("Submissions API Response:", res.data);
          if (Array.isArray(res.data)) {
            setSubmissions(res.data);
          } else {
            setSubmissions([]);
          }
        })
        .catch((err) => {
          console.error("Error fetching submissions:", err);
          setSubmissions([]);
        });
    }
  }, [user, axiosSecure]);

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "text-green-600 font-semibold";
      case "pending":
        return "text-yellow-600 font-semibold";
      case "rejected":
        return "text-red-600 font-semibold";
      default:
        return "";
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Submissions</h2>

      {submissions.length === 0 ? (
        <p className="text-gray-600">You haven’t submitted any tasks yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white p-4 shadow rounded">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Task Title</th>
                <th>Payable (Coins)</th>
                <th>Buyer</th>
                <th>Submitted At</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub, index) => (
                <tr key={sub._id}>
                  <td>{index + 1}</td>
                  <td>{sub.task_title}</td>
                  <td>{sub.payable_amount}</td>
                  <td>{sub.buyer_name}</td>
                  <td>{new Date(sub.submittedAt).toLocaleDateString()}</td>
                  <td className={getStatusColor(sub.status)}>{sub.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MySubmissions;
