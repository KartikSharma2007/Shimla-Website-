import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Leaf, CheckCircle } from "lucide-react";
import { authAPI } from "../../services/api";
import "./auth.css";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const passwordStrength = (pw) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const strength = passwordStrength(password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength] || "";
  const strengthColor = ["", "#ef4444", "#f59e0b", "#10b981", "#059669"][strength] || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }
    if (password.length < 8) {
      return setError("Password must be at least 8 characters.");
    }

    setIsLoading(true);
    try {
      await authAPI.resetPassword(token, { password });
      setSuccess(true);
      // Auto-redirect to account after 3 seconds (user is auto-logged in by backend)
      setTimeout(() => navigate("/account"), 3000);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "This reset link is invalid or has expired. Please request a new one."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-shapes">
        <div className="auth-shape auth-shape-1"></div>
        <div className="auth-shape auth-shape-2"></div>
        <div className="auth-shape auth-shape-3"></div>
      </div>

      <div className="auth-content">
        {/* Left panel */}
        <div className="auth-features-section">
          <div className="auth-brand">
            <div className="auth-brand-icon"><Leaf size={28} /></div>
            <span className="auth-brand-name">Shimla Travel</span>
          </div>
          <div className="auth-features-info">
            <h2>Choose a new<br />password</h2>
            <p className="auth-subtitle">
              Create a strong password to keep your account secure. Use a mix of
              letters, numbers, and symbols for the best protection.
            </p>
            <div className="auth-security-badges">
              <div className="auth-badge">🔒 Minimum 8 characters</div>
              <div className="auth-badge">🔢 Mix of letters & numbers</div>
              <div className="auth-badge">🛡️ Never share your password</div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="auth-form-section">
          <div className="auth-form-container">
            <Link to="/login" className="auth-back-link">
              <ArrowLeft size={16} /> Back to Login
            </Link>

            {!success ? (
              <>
                <div className="auth-form-header">
                  <h1>New Password</h1>
                  <p>Enter and confirm your new password below</p>
                </div>

                {error && (
                  <div className="auth-alert auth-error">
                    <span className="auth-alert-icon">!</span>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                  {/* New Password */}
                  <div className={`auth-input-group ${focusedField === "password" ? "auth-focused" : ""}`}>
                    <label htmlFor="password">New Password</label>
                    <div className="auth-input-wrap">
                      <Lock size={18} className="auth-input-symbol" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                        required
                        disabled={isLoading}
                      />
                      <button type="button" className="auth-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {/* Strength meter */}
                    {password && (
                      <div className="auth-strength-bar">
                        <div className="auth-strength-track">
                          {[1,2,3,4].map((i) => (
                            <div
                              key={i}
                              className="auth-strength-segment"
                              style={{ background: i <= strength ? strengthColor : "#e5e7eb" }}
                            />
                          ))}
                        </div>
                        <span className="auth-strength-label" style={{ color: strengthColor }}>
                          {strengthLabel}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className={`auth-input-group ${focusedField === "confirm" ? "auth-focused" : ""}`}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="auth-input-wrap">
                      <Lock size={18} className="auth-input-symbol" />
                      <input
                        id="confirmPassword"
                        type={showConfirm ? "text" : "password"}
                        placeholder="Re-enter new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onFocus={() => setFocusedField("confirm")}
                        onBlur={() => setFocusedField(null)}
                        required
                        disabled={isLoading}
                      />
                      <button type="button" className="auth-toggle-btn" onClick={() => setShowConfirm(!showConfirm)}>
                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {confirmPassword && password !== confirmPassword && (
                      <span className="auth-field-error">Passwords do not match</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="auth-submit-btn"
                    disabled={isLoading || !password || !confirmPassword}
                  >
                    {isLoading ? (
                      <div className="auth-spinner"></div>
                    ) : (
                      <>Set New Password <ArrowRight size={18} /></>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="auth-success-state">
                <div className="auth-success-icon"><CheckCircle size={56} /></div>
                <h2>Password updated!</h2>
                <p>Your password has been reset successfully. You're now logged in.</p>
                <p className="auth-success-note">Redirecting you to your account…</p>
                <Link to="/account" className="auth-submit-btn auth-btn-link">Go to My Account</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
