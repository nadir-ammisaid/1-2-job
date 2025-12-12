import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // Afficher un loader pendant que l'auth se charge
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Si pas authentifié, rediriger vers /authentication
  if (!isAuthenticated()) {
    return <Navigate to="/authentication" replace />;
  }

  // Si authentifié, afficher le contenu protégé
  return children;
}

export default ProtectedRoute;
