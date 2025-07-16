import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const MyTasks = () => {
  const { user, loading } = useAuth(); // If your hook has loading
  const axiosSecure = useAxiosSecure();
  const [tasks, setTasks] = useState([]);

  // ❗️Prevent running before user is available
  useEffect(() => {
    if (!user?.email) return;

    const fetchTasks = async () => {
      try {
        const res = await axiosSecure.get(`/tasks/buyer/${user.email}`);
        const sorted = res.data.sort(
          (a, b) => new Date(b.completion_date) - new Date(a.completion_date)
        );
        setTasks(sorted);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, [user?.email, axiosSecure]);

  const handleDelete = async (task) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the task permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/tasks/${task._id}`);
        if (res.data.deletedCount > 0) {
          setTasks((prev) => prev.filter((t) => t._id !== task._id));
          const refund = task.required_workers * task.payable_amount;
          await axiosSecure.patch(`/users/${user.email}/coins`, {
            coins: task.buyer_coins + refund,
          });
          Swal.fire("Deleted!", "Task has been deleted.", "success");
        }
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire("Error", "Failed to delete task", "error");
      }
    }
  };

  const handleUpdate = async (task) => {
    const { value: formValues } = await Swal.fire({
      title: "Update Task",
      html:
        `<input id="title" class="swal2-input" placeholder="Title" value="${task.task_title}">` +
        `<textarea id="detail" class="swal2-textarea" placeholder="Detail">${task.task_detail}</textarea>` +
        `<input id="submission" class="swal2-input" placeholder="What to Submit" value="${task.submission_info}">`,
      focusConfirm: false,
      preConfirm: () => {
        return {
          task_title: document.getElementById("title").value,
          task_detail: document.getElementById("detail").value,
          submission_info: document.getElementById("submission").value,
        };
      },
    });

    if (formValues) {
      try {
        const res = await axiosSecure.patch(`/tasks/${task._id}`, formValues);
        if (res.data.modifiedCount > 0) {
          Swal.fire("Updated!", "Task updated successfully.", "success");
          setTasks((prev) =>
            prev.map((t) => (t._id === task._id ? { ...t, ...formValues } : t))
          );
        }
      } catch (err) {
        console.error("Update error:", err);
        Swal.fire("Error", "Failed to update task", "error");
      }
    }
  };

  if (!user) {
    return <p className="text-center mt-10 text-red-500">Loading user...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Tasks</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Detail</th>
              <th>Submit Info</th>
              <th>Deadline</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.task_title}</td>
                <td>{task.task_detail}</td>
                <td>{task.submission_info}</td>
                <td>{task.completion_date}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleUpdate(task)}
                    className="btn btn-sm btn-info text-white"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(task)}
                    className="btn btn-sm btn-error text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tasks.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No tasks found</p>
        )}
      </div>
    </div>
  );
};

export default MyTasks;
