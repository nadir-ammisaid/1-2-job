import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth.js";
import ApplicationCard from "./ApplicationCard";

function ApplicationsList() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authLoading && isAuthenticated() && user) {
      axios
        .get(`/api/applications/user/${user.id_user}`)
        .then((response) => {
          setApplications(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading applications:", err);
          setError("Unable to load your applications");
          setLoading(false);
        });
    } else if (!authLoading && !isAuthenticated()) {
      setLoading(false);
    }
  }, [user, authLoading, isAuthenticated]);

  const handleDelete = (id_application) => {
    axios
      .delete(`/api/applications/${id_application}`)
      .then(() => {
        setApplications(
          applications.filter((app) => app.id_application !== id_application),
        );
      })
      .catch((err) => {
        console.error("Error during deletion:", err);
        alert("Unable to delete this application");
      });
  };

  if (authLoading || loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-r-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center">
        <p className="text-red-600">Please log in to view your applications</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="rounded-lg bg-gray-50 p-12 text-center">
        <div className="mb-4 text-6xl">📭</div>
        <h3 className="mb-2 text-xl font-bold text-gray-900">
          No applications yet
        </h3>
        <p className="text-gray-600">
          Start applying to jobs that interest you!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          My applications ({applications.length})
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {applications.map((application) => (
          <ApplicationCard
            key={application.id_application}
            {...application}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default ApplicationsList;
