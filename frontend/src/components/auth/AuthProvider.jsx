import { useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext.js";
import axios from "../../config/axiosConfig.js";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("/api/users/me");
      setUser(response.data);
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
      // Supprimer le token invalide
      localStorage.removeItem("auth_token");
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
    localStorage.removeItem("auth_token");
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
