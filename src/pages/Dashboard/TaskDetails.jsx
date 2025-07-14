import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios"; // ✅ use custom axios instance
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const TaskDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxios(); // ✅ use custom axios hook
  const [task, setTask] = useState(null);
  const [submissionDetails, setSubmissionDetails] = useState("");

  useEffect(() => {
    axiosSecure.get(`/tasks/${id}`)
      .then(res => setTask(res.data))
      .catch(err => {
        console.error("Failed to fetch task:", err);
        Swal.fire("Error", "Task not found", "error");
      });
  }, [id, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!submissionDetails.trim()) {
      return Swal.fire("Error", "Submission details cannot be empty", "warning");
    }

    const submissionData = {
      task_id: task._id,
      task_title: task.task_title,
      payable_amount: task.payable_amount,
      buyer_name: task.buyer_name,
      buyer_email: task.buyer_email,
      worker_email: user.email,
      worker_name: user.displayName,
      submission_detail: submissionDetails,
      status: "pending",
      submittedAt: new Date(),
    };

    try {
      await axiosSecure.post("/submissions", submissionData);
      Swal.fire("Submitted!", "Your submission is under review.", "success");
      setSubmissionDetails("");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to submit", "error");
    }
  };

  if (!task) return <p className="p-4">Loading task details...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow rounded p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">{task.task_title}</h2>
        <p><strong>Buyer:</strong> {task.buyer_name}</p>
        <p><strong>Pay:</strong> {task.payable_amount} coins</p>
        <p><strong>Deadline:</strong> {new Date(task.completion_date).toLocaleDateString()}</p>
        <p><strong>Required Workers:</strong> {task.required_workers}</p>
        <p><strong>Task Details:</strong></p>
        <p className="bg-gray-100 p-2 rounded">{task.task_detail}</p>
        {task.task_image_url && (
          <img src={task.task_image_url} alt="Task" className="w-full max-w-md mt-4 rounded" />
        )}
      </div>

      {/* Submission Form */}
      <div className="bg-white shadow rounded p-6">
        <h3 className="text-xl font-semibold mb-4">Submit Your Work</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            className="textarea textarea-bordered w-full min-h-[100px]"
            placeholder="Write your submission details here..."
            value={submissionDetails}
            onChange={(e) => setSubmissionDetails(e.target.value)}
          ></textarea>

          <button className="btn btn-warning mt-4" type="submit">
            Submit Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskDetails;
