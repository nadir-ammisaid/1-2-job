import { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "./StateCard.jsx";
import { useAuth } from "../../hooks/useAuth.js";

function MySummary() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    submittedApplications: 0,
    registeredJobs: 0,
    newJobs: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.id_user) {
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const applicationsResponse = await axios.get(
          `/api/applications/user/${user.id_user}`,
        );
        const submittedApplications = applicationsResponse.data.length;

        const jobsResponse = await axios.get("/api/jobs");
        const totalJobs = jobsResponse.data.length;

        setStats({
          submittedApplications,
          registeredJobs: 0,
          newJobs: totalJobs,
        });
      } catch (error) {
        console.error("Error loading stats:", error);
        setError("Unable to load statistics");
        setStats({
          submittedApplications: 0,
          registeredJobs: 0,
          newJobs: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user?.id_user]);

  if (loading) {
    return (
      <section className="mt-8">
        <h2 className="mb-6 text-center text-2xl font-bold text-blue-600 md:text-left">
          My summary
        </h2>
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-r-transparent"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <h2 className="mb-6 text-center text-2xl font-bold text-blue-600 md:text-left">
        My summary
      </h2>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard
          icon="📧"
          value={stats.submittedApplications}
          label="Submitted applications"
          color="green"
        />

        <StatCard
          icon="❤️"
          value={stats.registeredJobs}
          label="Saved jobs"
          color="red"
        />

        <StatCard
          icon="📢"
          value={stats.newJobs}
          label="New jobs"
          color="blue"
        />
      </div>

      <div className="mt-8 flex justify-center">
        <a
          href="/my-applications"
          className="rounded-full bg-blue-600 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 md:text-base"
        >
          View My Applications
        </a>
      </div>
    </section>
  );
}

export default MySummary;
