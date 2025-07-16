import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageTasks = () => {
  const axiosSecure = useAxiosSecure(); // use your secure Axios instance
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/admin/tasks")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setTasks(res.data);
        } else {
          console.warn("Invalid tasks data:", res.data);
          setTasks([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
        setTasks([]);
      });
  }, [axiosSecure]);

  const handleDelete = async (taskId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This task will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/admin/tasks/${taskId}`);
        Swal.fire("Deleted!", "Task has been deleted.", "success");
        setTasks((prev) => prev.filter((t) => t._id !== taskId));
      } catch (err) {
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Tasks</h2>
      <div className="overflow-x-auto bg-white shadow p-4 rounded">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Buyer</th>
              <th>Payable</th>
              <th>Required Workers</th>
              <th>Completion Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.task_title}</td>
                <td>{task.buyer_email}</td>
                <td>{task.payable_amount}</td>
                <td>{task.required_workers}</td>
                <td>
                  {new Date(task.completion_date).toLocaleDateString()}
                </td>
                <td>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tasks.length === 0 && (
          <p className="text-center mt-4 text-gray-500">No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageTasks;
