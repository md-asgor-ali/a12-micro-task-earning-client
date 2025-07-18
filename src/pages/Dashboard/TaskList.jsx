import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure(); // ✅ use custom axios instance

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axiosSecure.get("/tasks/available");
        // console.log("Tasks response:", res.data);

        if (Array.isArray(res.data)) {
          setTasks(res.data);
        } else {
          console.warn("Tasks data is not an array:", res.data);
          setTasks([]);
        }
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
        setError("Failed to load tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [axiosSecure]);

  if (loading) {
    return <div className="text-center py-8">🔄 Loading available tasks...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Available Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks available right now.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div key={task._id} className="bg-white shadow-md rounded p-4">
              <h3 className="text-lg font-semibold">{task.task_title}</h3>
              <p>
                <span className="font-medium">Buyer:</span>{" "}
                {task.buyer_name || task.buyer_email}
              </p>
              <p>
                <span className="font-medium">Pay:</span>{" "}
                {task.payable_amount} coins
              </p>
              <p>
                <span className="font-medium">Required Workers:</span>{" "}
                {task.required_workers}
              </p>
              <p>
                <span className="font-medium">Deadline:</span>{" "}
                {new Date(task.completion_date).toLocaleDateString()}
              </p>
              <button
                onClick={() => navigate(`/dashboard/task-details/${task._id}`)}
                className="btn btn-sm btn-warning mt-2"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
