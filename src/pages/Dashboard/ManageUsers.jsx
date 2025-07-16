import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure(); 
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/admin/users") // ✅ backend route is /admin/users
      .then((res) => {
        const data = res.data;
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.warn("Expected array but got:", data);
          setUsers([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setUsers([]);
      });
  }, [axiosSecure]);

  const handleRemove = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be removed permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/admin/users/${id}`);
        setUsers((prev) => prev.filter((u) => u._id !== id));
        Swal.fire("Deleted!", "User removed successfully.", "success");
      } catch (err) {
        Swal.fire("Error!", "Failed to delete user.", "error");
      }
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await axiosSecure.patch(`/admin/users/${id}/role`, { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role: newRole } : u))
      );
      Swal.fire("Success", "Role updated", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Coins</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user._id, e.target.value)
                    }
                    className="select select-sm"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Buyer">Buyer</option>
                    <option value="Worker">Worker</option>
                  </select>
                </td>
                <td>{user.coins}</td>
                <td>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleRemove(user._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
