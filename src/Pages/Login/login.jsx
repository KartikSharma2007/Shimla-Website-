import React, { useState } from "react";
import "./login.css";

// Login.jsx - Mountain Nature Theme

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", { email, password });
  };

  return (
    <div className="login-wrapper">
      
      {/* Background Section */}
      <div className="login-bg"></div>

      {/* Login Card */}
      <div className="login-card-container">
        <div className="login-card">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">
            Login to continue your journey through the mountains of Shimla.
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            <label>Email Address</label>
            <input
              type="email"
              className="login-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="login-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            <button className="login-btn" type="submit">
              Login
            </button>
          </form>

          <p className="login-bottom-text">
            Don't have an account? <a href="/signup">Create one</a>
          </p>
        </div>
      </div>
    </div>
  );
}
