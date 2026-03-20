import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight, ArrowLeft, Leaf, CheckCircle } from "lucide-react";
import { authAPI } from "../../services/api";
import "./auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await authAPI.forgotPassword({ email });
      setSubmitted(true);
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong. Please try again.");
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
            <h2>Forgot your<br />password?</h2>
            <p className="auth-subtitle">
              No worries — it happens to the best of us. Enter the email linked
              to your account and we'll send you a secure reset link within minutes.
            </p>
            <div className="auth-security-badges">
              <div className="auth-badge">🔒 Secure token — expires in 10 min</div>
              <div className="auth-badge">📧 Link sent to your email</div>
              <div className="auth-badge">✅ One-time use only</div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="auth-form-section">
          <div className="auth-form-container">
            <Link to="/login" className="auth-back-link">
              <ArrowLeft size={16} /> Back to Login
            </Link>

            {!submitted ? (
              <>
                <div className="auth-form-header">
                  <h1>Reset Password</h1>
                  <p>Enter your email to receive a reset link</p>
                </div>

                {error && (
                  <div className="auth-alert auth-error">
                    <span className="auth-alert-icon">!</span>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                  <div className={`auth-input-group ${focusedField === "email" ? "auth-focused" : ""}`}>
                    <label htmlFor="email">Email Address</label>
                    <div className="auth-input-wrap">
                      <Mail size={18} className="auth-input-symbol" />
                      <input
                        id="email"
                        type="email"
                        placeholder="Enter your registered email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <button type="submit" className="auth-submit-btn" disabled={isLoading || !email}>
                    {isLoading ? (
                      <div className="auth-spinner"></div>
                    ) : (
                      <>Send Reset Link <ArrowRight size={18} /></>
                    )}
                  </button>
                </form>

                <div className="auth-form-footer">
                  <p>Remember your password?</p>
                  <Link to="/login" className="auth-link">Sign in instead <span>→</span></Link>
                </div>
              </>
            ) : (
              <div className="auth-success-state">
                <div className="auth-success-icon"><CheckCircle size={56} /></div>
                <h2>Check your inbox!</h2>
                <p>
                  If an account exists for <strong>{email}</strong>, we've sent a password
                  reset link. It expires in <strong>10 minutes</strong>.
                </p>
                <p className="auth-success-note">
                  Didn't receive it? Check your spam folder or{" "}
                  <button className="auth-inline-btn" onClick={() => { setSubmitted(false); setEmail(""); }}>
                    try again
                  </button>.
                </p>
                <Link to="/login" className="auth-submit-btn auth-btn-link">Back to Login</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
