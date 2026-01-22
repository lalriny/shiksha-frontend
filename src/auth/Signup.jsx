import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    if (formData.password !== formData.confirmPassword) {
      setErrors({ password: "Passwords do not match" });
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/signup/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            username: formData.username,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrors(data);
        return;
      }

      // Optional auto-login if backend returns tokens
      if (data.access && data.refresh) {
        login({
          access: data.access,
          refresh: data.refresh,
          user: data.user || null,
        });
      }

      navigate("/", { replace: true });
    } catch (err) {
      setErrors({ global: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Sign Up</h2>

        {errors.global && (
          <p className="error-text">{errors.global}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="signup-form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <p className="error-text">{errors.email[0]}</p>
            )}
          </div>

          <div className="signup-form-group">
            <label>Username</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && (
              <p className="error-text">{errors.username[0]}</p>
            )}
          </div>

          <div className="signup-form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signup-form-group">
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <p className="error-text">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="signup-btn"
            disabled={submitting}
          >
            {submitting ? "Signing up…" : "Sign up"}
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
