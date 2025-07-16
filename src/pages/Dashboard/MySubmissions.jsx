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
    <div className="px-4 sm:px-6 md:px-8 py-6 max-w-6xl mx-auto">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center">
        My Submissions
      </h2>

      {submissions.length === 0 ? (
        <p className="text-gray-600 text-sm md:text-base text-center">
          You haven’t submitted any tasks yet.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white p-4 rounded shadow">
          <table className="table w-full text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">#</th>
                <th className="p-2">Task Title</th>
                <th className="p-2">Pay</th>
                <th className="p-2">Buyer</th>
                <th className="p-2">Submitted</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub, index) => (
                <tr key={sub._id} className="hover:bg-gray-50">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2 break-words max-w-xs">{sub.task_title}</td>
                  <td className="p-2">{sub.payable_amount}</td>
                  <td className="p-2">{sub.buyer_name || "N/A"}</td>
                  <td className="p-2">
                    {new Date(sub.submittedAt).toLocaleDateString()}
                  </td>
                  <td className={`p-2 ${getStatusColor(sub.status)}`}>
                    {sub.status}
                  </td>
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
