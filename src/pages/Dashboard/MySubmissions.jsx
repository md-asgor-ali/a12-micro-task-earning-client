import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MySubmissions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [submissions, setSubmissions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/submissions/worker?email=${user.email}`)
        .then((res) => {
          const submissionArray = Array.isArray(res.data.submissions)
            ? res.data.submissions
            :  [];
          setSubmissions(submissionArray);
          setCurrentPage(1); 
        })
        .catch((error) => {
          console.error("Error fetching submissions:", error);
          setSubmissions([]);
        });
    }
  }, [user?.email, axiosSecure]);

  // Pagination logic
  const totalPages = Math.ceil(submissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = submissions.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">My Submissions</h2>

      {submissions.length === 0 ? (
        <p className="text-center text-gray-600">No submissions found.</p>
      ) : (
        <>
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2">#</th>
                  <th className="p-2">Task</th>
                  <th className="p-2">Pay</th>
                  <th className="p-2">Buyer</th>
                  <th className="p-2">Submitted</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((sub, idx) => (
                  <tr key={sub._id}>
                    <td className="p-2">{startIndex + idx + 1}</td>
                    <td className="p-2">{sub.task_title}</td>
                    <td className="p-2">{sub.payable_amount}</td>
                    <td className="p-2">{sub.buyer_name || "N/A"}</td>
                    <td className="p-2">
                      {sub.submittedAt
                        ? new Date(sub.submittedAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="p-2 capitalize font-semibold text-blue-600">
                      {sub.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-center gap-2 flex-wrap">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 border rounded ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MySubmissions;
