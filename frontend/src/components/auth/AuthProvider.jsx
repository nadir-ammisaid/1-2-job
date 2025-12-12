import { useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext.js";
import axios from "axios";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get("/api/users/me");
      setUser(response.data);
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);

      if (error.response?.status === 401) {
        // Optionnel : appeler logout pour nettoyer les cookies
        try {
          await axios.post("/api/users/logout");
        } catch (logoutError) {
          console.error("Logout cleanup failed:", logoutError);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axios.post("/api/users/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }
    setUser(null);
  };

  const updateUserProfile = (updatedUserData) => {
    setUser(updatedUserData);
  };

  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUserProfile,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
