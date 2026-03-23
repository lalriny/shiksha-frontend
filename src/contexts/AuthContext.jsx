import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../api/apiClient";
import extractError from "../utils/extractError";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  /**
   * Bootstraps user session using HttpOnly cookie
   */
  const bootstrap = useCallback(async () => {
    try {
      const res = await api.get("/accounts/me/");
      setUser(res.data);
      return res.data;
    } catch (err) {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Run bootstrap on first load
   */
  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  /**
   * Login
   * Backend sets HttpOnly cookies
   */
  const login = async (email, password) => {
    try {
      await api.post("/accounts/login/", { email, password });

      setLoading(true);
      const me = await bootstrap();
      return me;
    } catch (err) {
      setLoading(false);
      return Promise.reject(extractError(err));
    }
  };

  /**
   * Signup
   */
  const signup = async (payload) => {
    try {
      await api.post("/accounts/signup/", payload);
    } catch (err) {
      return Promise.reject(extractError(err));
    }
  };

  /**
   * Logout
   * Calls backend to clear cookies
   */
  const logout = async () => {
    try {
      await api.post("/accounts/logout/");
    } catch {
      // ignore network failure
    }

    setUser(null);
  };

  /**
   * Check if user has a specific role
   * Supports both:
   * - user.role = "teacher"
   * - user.roles = ["teacher"]
   */
  const hasRole = (role) => {
    if (!user) return false;

    const targetRole = String(role).toLowerCase();

    const roleFromSingleField = String(user.role || "").toLowerCase();
    if (roleFromSingleField === targetRole) return true;

    const rolesFromArray = Array.isArray(user.roles)
      ? user.roles.map((r) => String(r).toLowerCase())
      : [];

    return rolesFromArray.includes(targetRole);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        signup,
        logout,
        hasRole,
        bootstrap,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);