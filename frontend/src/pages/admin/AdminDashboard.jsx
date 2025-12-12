import { useEffect, useState } from "react";
import axios from "../../config/axiosConfig";
import AdminStatCard from "../../components/admin/AdminStatCard";

function AdminDashboard() {
  const [stats, setStats] = useState({
    registeredJobbers: 0,
    registeredCompanies: 0,
    registeredJobs: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get("/api/admin/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching admin stats:", error);
        setError("Unable to load statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-r-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h1 className="text-2xl font-bold text-blue-600 md:text-3xl">
          "1, 2 Job" Stats
        </h1>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <AdminStatCard
          icon="💚"
          value={stats.registeredJobbers}
          label="Registered jobbers"
          color="green"
        />

        <AdminStatCard
          icon="🏢"
          value={stats.registeredCompanies}
          label="Registered companies"
          color="red"
        />

        <AdminStatCard
          icon="💼"
          value={stats.registeredJobs}
          label="Registered jobs"
          color="blue"
        />
      </div>

      <div className="block md:hidden">
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
          <div className="grid gap-4">
            <a
              href="/admin/jobs"
              className="rounded-lg bg-white p-4 shadow-sm transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">💼</span>
                <span className="font-medium">Manage Jobs</span>
              </div>
            </a>
            <a
              href="/admin/jobbers"
              className="rounded-lg bg-white p-4 shadow-sm transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">👥</span>
                <span className="font-medium">Manage Jobbers</span>
              </div>
            </a>
            <a
              href="/admin/companies"
              className="rounded-lg bg-white p-4 shadow-sm transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏢</span>
                <span className="font-medium">Manage Companies</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
