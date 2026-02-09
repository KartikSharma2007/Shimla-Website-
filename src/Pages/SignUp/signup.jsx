import React, { useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.fullname || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSuccess("Account created successfully! Redirecting...");
  }

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <h2>Create Account</h2>
        <p className="subtitle">Join us and explore the beauty of Shimla!</p>

        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a strong password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="signup-btn">Create Account</button>
        </form>

        <p className="already">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>

      {/* Right side background nature image */}
      <div className="signup-bg"></div>
    </div>
  );
}
