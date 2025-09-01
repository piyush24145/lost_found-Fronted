import React, { useEffect, useState } from "react";
import EditUserModal from "./EditUserModal";
import { baseUrl } from "../environment";

function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include", // agar cookies/session use kar rahe ho
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch users");
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
        alert("⚠️ Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // ✅ Delete User
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`${baseUrl}/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete user");

      setUsers(users.filter((u) => u._id !== id));
      alert("✅ User deleted successfully!");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("⚠️ Failed to delete user");
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow text-white max-w-full">
      <h3 className="text-2xl font-bold mb-6">Manage Users</h3>

      {loading ? (
        <p className="text-gray-400">Loading users...</p>
      ) : (
        <div className="overflow-x-auto max-h-[70vh] rounded-lg border border-gray-700">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-700 sticky top-0">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="px-4 py-2">{user._id.slice(-6)}</td>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">
                      {user.role === "admin" ? (
                        <span className="text-red-400 font-semibold">Admin</span>
                      ) : (
                        <span className="text-green-400 font-semibold">User</span>
                      )}
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        📝
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-4 text-gray-400 italic"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Edit User Modal */}
      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onUpdate={(updatedUser) => {
            setUsers(
              users.map((u) => (u._id === updatedUser._id ? updatedUser : u))
            );
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}

export default Users;

