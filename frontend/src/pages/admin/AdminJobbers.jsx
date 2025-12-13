import { useEffect, useState } from "react";
import axios from "../../config/axiosConfig";
import { useAuth } from "../../hooks/useAuth";

function AdminJobbers() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get("/api/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Unable to load users");
    } finally {
      setLoading(false);
    }
  };

  const handlePromote = async (userId) => {
    if (!confirm("Are you sure you want to promote this user to admin?")) {
      return;
    }

    try {
      await axios.patch(`/api/admin/users/${userId}/promote`);
      // Rafraîchir la liste
      fetchUsers();
      alert("✅ User promoted to admin successfully!");
    } catch (error) {
      console.error("Error promoting user:", error);
      alert("❌ Failed to promote user");
    }
  };

  const handleDemote = async (userId) => {
    if (!confirm("Are you sure you want to demote this admin to jobber?")) {
      return;
    }

    try {
      await axios.patch(`/api/admin/users/${userId}/demote`);
      fetchUsers();
      alert("✅ User demoted to jobber successfully!");
    } catch (error) {
      console.error("Error demoting user:", error);

      // Afficher le message d'erreur du backend
      const errorMessage =
        error.response?.data?.message || "Failed to demote user";
      alert("❌ " + errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-r-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Manage Jobbers
        </h1>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
          {users.length} users
        </span>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {users.map((user) => (
                <tr key={user.id_user} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    #{user.id_user}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {user.first_name} {user.last_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {user.profession || "No profession"}
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    <div className="text-sm text-gray-500">
                      {user.phone || "No phone"}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {user.city || "No city"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    {user.role === "jobber" ? (
                      <button
                        onClick={() => handlePromote(user.id_user)}
                        className="rounded-md bg-purple-600 px-3 py-1 text-white transition-colors hover:bg-purple-700"
                        title="Promote to admin"
                      >
                        👑 Promote
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDemote(user.id_user)}
                        disabled={user.id_user === currentUser?.id_user} // ← Protection frontend
                        className={`rounded-md px-3 py-1 text-white transition-colors ${
                          user.id_user === currentUser?.id_user
                            ? "cursor-not-allowed bg-gray-400"
                            : "bg-gray-600 hover:bg-gray-700"
                        }`}
                        title={
                          user.id_user === currentUser?.id_user
                            ? "You cannot demote yourself"
                            : "Demote to jobber"
                        }
                      >
                        ⬇️ Demote
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {users.length === 0 && !loading && (
        <div className="rounded-lg bg-gray-50 p-12 text-center">
          <div className="mb-4 text-6xl">👥</div>
          <h3 className="mb-2 text-xl font-bold text-gray-900">
            No users found
          </h3>
          <p className="text-gray-600">
            No registered users in the system yet.
          </p>
        </div>
      )}
    </div>
  );
}

export default AdminJobbers;
