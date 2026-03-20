import React, { useState, useEffect } from "react";
import "./login.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Mail, Lock, Eye, EyeOff, ArrowRight, Leaf, Shield, Zap, Globe, KeyRound, CheckCircle,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { GoogleLogin, useGoogleOAuth } from '@react-oauth/google';
import logo from "../../assets/logo.png";

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// SafeGoogleLogin — renders the Google button only when GoogleOAuthProvider is
// present in the tree. Without this guard, if VITE_GOOGLE_CLIENT_ID is missing
// on Netlify the whole login page crashes with "must be used within GoogleOAuthProvider".
function SafeGoogleLogin({ onSuccess, onError }) {
  const googleContext = (() => {
    try {
      // useGoogleOAuth throws if called outside a provider
      return useGoogleOAuth();
    } catch {
      return null;
    }
  })();

  if (!googleContext) {
    // Provider not available — Google Client ID is missing from env vars
    return (
      <div className="lg-google-unavailable">
        <span>Google sign-in unavailable</span>
      </div>
    );
  }

  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={onError}
      theme="outline"
      size="large"
      text="signin_with"
      shape="pill"
      width="100%"
    />
  );
}


// ── Password strength helper ──────────────────────────────────────────────────
function getPasswordStrength(pw) {
  if (!pw) return { score: 0, label: '', color: '' };
  let score = 0;
  if (pw.length >= 8)  score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { score, label: 'Weak', color: '#ef4444' };
  if (score <= 3)  return { score, label: 'Fair', color: '#f59e0b' };
  return { score, label: 'Strong', color: '#10b981' };
}

// ── Local Account Password Modal ──────────────────────────────────────────────
// Shown when a user clicks Google but that email is already registered locally.
// They must enter their existing password to prove ownership, then Google gets linked.
function LocalPasswordModal({ userEmail, googleId, onSuccess, onCancel }) {
  const { googleConfirmPassword } = useAuth();
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [attempts, setAttempts] = useState(0);
  const [success, setSuccess]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!password) { setError('Please enter your password.'); return; }
    setLoading(true);
    const result = await googleConfirmPassword(userEmail, password, googleId);
    setLoading(false);
    if (result.success) {
      setSuccess(true);
      setTimeout(onSuccess, 900);
    } else {
      setAttempts(a => a + 1);
      setError(
        result.errorCode === 'ACCOUNT_LOCKED'
          ? 'Too many failed attempts. Your account is temporarily locked.'
          : 'Incorrect password. Please check and try again.'
      );
    }
  };

  // Get user initials for avatar
  const initials = userEmail ? userEmail[0].toUpperCase() : '?';

  return (
    <div className="vlpm-overlay" onClick={onCancel}>
      <div className="vlpm-card" onClick={e => e.stopPropagation()}>

        {/* Top accent bar */}
        <div className="vlpm-accent-bar" />

        {/* Close button */}
        <button className="vlpm-close" onClick={onCancel} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {success ? (
          /* ── Success state ── */
          <div className="vlpm-success-state">
            <div className="vlpm-success-ring">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h3>Verified!</h3>
            <p>Signing you in…</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="vlpm-header">
              {/* Google + Avatar */}
              <div className="vlpm-avatar-wrap">
                <div className="vlpm-avatar">{initials}</div>
                <div className="vlpm-google-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
              </div>

              <h2 className="vlpm-title">We found your account</h2>
              <p className="vlpm-subtitle">
                You already have an account with this email.<br/>
                Enter your password to continue and link Google.
              </p>

              {/* Email pill */}
              <div className="vlpm-email-pill">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                {userEmail}
              </div>
            </div>

            {/* Error banner */}
            {error && (
              <div className="vlpm-error">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="vlpm-form">
              <div className="vlpm-field">
                <label className="vlpm-label">Account password</label>
                <div className="vlpm-input-row">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="vlpm-input-icon">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <input
                    className="vlpm-input"
                    type={showPw ? 'text' : 'password'}
                    placeholder="Enter your Shimla Travels password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoFocus
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="vlpm-eye"
                    onClick={() => setShowPw(p => !p)}
                    tabIndex={-1}
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                  >
                    {showPw
                      ? <EyeOff size={16} />
                      : <Eye size={16} />
                    }
                  </button>
                </div>
              </div>

              {/* Forgot password — show after 1 failed attempt */}
              {attempts >= 1 && (
                <div className="vlpm-forgot-row">
                  <a href="/forgot-password" className="vlpm-forgot-link">
                    Forgot your password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="vlpm-submit"
                disabled={loading || !password}
              >
                {loading ? (
                  <span className="vlpm-spinner" />
                ) : (
                  <>
                    Continue
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </>
                )}
              </button>

              <button type="button" className="vlpm-cancel" onClick={onCancel}>
                Use a different account
              </button>
            </form>

            {/* Footer note */}
            <p className="vlpm-note">
              🔒 After this, you can sign in with Google or your password.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// ── Google Password Modal ─────────────────────────────────────────────────────
function GooglePasswordModal({ userEmail, userName, pendingToken, onSuccess, onCancel }) {
  const { setGooglePassword } = useAuth();
  const [password, setPassword]         = useState('');
  const [confirm, setConfirm]           = useState('');
  const [showPw, setShowPw]             = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState('');

  const strength = getPasswordStrength(password);
  const mismatch = confirm.length > 0 && password !== confirm;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }

    setLoading(true);
    const result = await setGooglePassword(pendingToken, password);
    setLoading(false);

    if (result.success) { onSuccess(); }
    else { setError(result.error || 'Something went wrong. Please try again.'); }
  };

  return (
    <div className="lg-gpw-overlay" onClick={onCancel}>
      <div className="lg-gpw-modal" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="lg-gpw-header">
          <div className="lg-gpw-icon">
            <KeyRound size={28} />
          </div>
          <h2>Create Your Password</h2>
          <p>
            Welcome, <strong>{userName}</strong>! Since you signed up with Google,
            please create a password so you can also log in with email.
          </p>
          <div className="lg-gpw-email-chip">
            <Mail size={13} />
            {userEmail}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="lg-alert lg-error" style={{ margin: '0 0 16px' }}>
            <span className="lg-alert-icon">!</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="lg-gpw-form">

          {/* Password */}
          <div className="lg-gpw-field">
            <label>Password</label>
            <div className="lg-input-wrap">
              <Lock size={17} className="lg-input-symbol" />
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                autoFocus
              />
              <button type="button" className="lg-toggle-btn" onClick={() => setShowPw(!showPw)}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Strength bar */}
            {password.length > 0 && (
              <div className="lg-gpw-strength">
                <div className="lg-gpw-strength-bar">
                  {[1,2,3,4,5].map(i => (
                    <div
                      key={i}
                      className="lg-gpw-strength-seg"
                      style={{ background: i <= strength.score ? strength.color : '#e2e8f0' }}
                    />
                  ))}
                </div>
                <span style={{ color: strength.color, fontSize: '12px', fontWeight: 600 }}>
                  {strength.label}
                </span>
              </div>
            )}
          </div>

          {/* Confirm */}
          <div className="lg-gpw-field">
            <label>Confirm Password</label>
            <div className={`lg-input-wrap ${mismatch ? 'lg-input-error' : ''}`}>
              <Lock size={17} className="lg-input-symbol" />
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Re-enter your password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                disabled={loading}
              />
              <button type="button" className="lg-toggle-btn" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {!mismatch && confirm.length > 0 && password === confirm && (
              <div className="lg-gpw-match">
                <CheckCircle size={13} /> Passwords match
              </div>
            )}
            {mismatch && <div className="lg-gpw-no-match">Passwords do not match</div>}
          </div>

          {/* Hints */}
          <ul className="lg-gpw-hints">
            <li className={password.length >= 8 ? 'lg-gpw-hint--ok' : ''}>At least 8 characters</li>
            <li className={/[A-Z]/.test(password) ? 'lg-gpw-hint--ok' : ''}>One uppercase letter</li>
            <li className={/[0-9]/.test(password) ? 'lg-gpw-hint--ok' : ''}>One number</li>
          </ul>

          <button
            type="submit"
            className="lg-submit-btn"
            disabled={loading || password.length < 8 || password !== confirm}
            style={{ marginTop: '8px' }}
          >
            {loading ? <div className="lg-spinner"></div> : <>Create Password <ArrowRight size={17} /></>}
          </button>
        </form>

        <button className="lg-gpw-cancel" onClick={onCancel}>
          Cancel — use a different account
        </button>
      </div>
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [bannedNotice, setBannedNotice] = useState(false);

  // Google password modal state
  const [gpwModal, setGpwModal] = useState(null);       // { pendingToken, email, name } — new Google user
  const [localPwModal, setLocalPwModal] = useState(null); // { email, googleId } — existing local user

  const { login, googleLogin } = useAuth();

  // Detect ?banned=true or ?session=expired in URL
  useEffect(() => {
    if (searchParams.get('banned') === 'true') {
      setBannedNotice(true);
    }
    if (searchParams.get('session') === 'expired') {
      setError('Your session has expired. Please log in again.');
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBannedNotice(false);
    setIsLoading(true);
    const result = await login({ email, password });
    if (result.success) { navigate("/account"); }
    else {
      if (result.errorCode === 'ACCOUNT_BANNED') {
        setBannedNotice(true);
      } else {
        setError(result.error || result.message || 'Login failed. Please check your credentials.');
      }
    }
    setIsLoading(false);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    setError("");
    setBannedNotice(false);
    const result = await googleLogin(credentialResponse.credential);

    if (!result.success) {
      if (result.errorCode === 'ACCOUNT_BANNED') {
        setBannedNotice(true);
      } else {
        setError(result.error || "Google login failed.");
      }
      setIsLoading(false);
      return;
    }

    // Existing local account — needs to enter their existing password
    if (result.needsLocalPassword) {
      setLocalPwModal({
        email: result.email,
        googleId: result.googleId,
      });
      setIsLoading(false);
      return;
    }

    if (result.needsPassword) {
      // New Google user — needs to create a password
      setGpwModal({
        pendingToken: result.pendingToken,
        email: result.user.email,
        name: result.user.fullName,
      });
      setIsLoading(false);
      return;
    }

    // Fully authenticated — go to account
    navigate("/account");
    setIsLoading(false);
  };

  return (
    <div className="lg-login-page">

      {/* Local Password Modal — shown when existing email/password user clicks Google */}
      {localPwModal && (
        <LocalPasswordModal
          userEmail={localPwModal.email}
          googleId={localPwModal.googleId}
          onSuccess={() => { setLocalPwModal(null); navigate('/account'); }}
          onCancel={() => setLocalPwModal(null)}
        />
      )}

      {/* Google Password Modal — shown for brand new Google sign-ups */}
      {gpwModal && (
        <GooglePasswordModal
          userEmail={gpwModal.email}
          userName={gpwModal.name}
          pendingToken={gpwModal.pendingToken}
          onSuccess={() => { setGpwModal(null); navigate("/account"); }}
          onCancel={() => setGpwModal(null)}
        />
      )}
      <div className="lg-bg-shapes">
        <div className="lg-shape lg-shape-1"></div>
        <div className="lg-shape lg-shape-2"></div>
        <div className="lg-shape lg-shape-3"></div>
      </div>

      <div className="lg-login-content">

        {/* ── Desktop left panel ── */}
        <div className="lg-features-section">
          <div className="lg-brand">
            <div className="lg-brand-icon"></div>
            <span className="lg-brand-name">Shimla Travel</span>
          </div>
          <div className="lg-features-list">
            <h2>Welcome to the<br />future of travel</h2>
            <div className="lg-feature-cards">
              <div className="lg-feature-card">
                <div className="lg-feature-icon lg-green"><Globe size={20} /></div>
                <div className="lg-feature-text"><h4>Global Access</h4><p>Connect with destinations worldwide</p></div>
              </div>
              <div className="lg-feature-card">
                <div className="lg-feature-icon lg-teal"><Shield size={20} /></div>
                <div className="lg-feature-text"><h4>Secure Booking</h4><p>Your data is protected 24/7</p></div>
              </div>
              <div className="lg-feature-card">
                <div className="lg-feature-icon lg-lime"><Zap size={20} /></div>
                <div className="lg-feature-text"><h4>Instant Confirmation</h4><p>Book in seconds, not minutes</p></div>
              </div>
            </div>
          </div>
          <div className="lg-testimonial">
            <div className="lg-stars">★★★★★</div>
            <p>"The best travel platform I've ever used. Seamless experience!"</p>
            <span className="lg-author">— Sarah M., Travel Enthusiast</span>
          </div>
        </div>

        {/* ── Right panel / Mobile full screen ── */}
        <div className="lg-form-section">

          {/* MOBILE ONLY: lg-green hero */}
          <div className="lg-mobile-hero-section" style={{ display: "none" }}>
            <div className="lg-mobile-hero-text">
              <h2>Explore the beauty<br />of <span className="lg-accent-word">Shimla</span> &amp;<br />Himachal Pradesh</h2>
            </div>
            <div className="lg-mobile-hero-illustration">
              <div className="lg-hero-deco-dots">
                {[...Array(9)].map((_, i) => <span key={i}></span>)}
              </div>
              <div className="lg-hero-deco-pin"></div>
              <div className="lg-hero-phone"></div>
            </div>
          </div>

          <div className="lg-form-container">

            {/*
             * DESKTOP: shows only "Login" h1 — the <p> is hidden via CSS:
             *   .form-header p { display: none; }
             *
             * MOBILE: shows "Login" + "Don't Have An Account? Sign Up"
             *   @media (max-width:1024px) { .form-header p { display: block; } }
             *   (needed because .form-footer is hidden on mobile)
             */}
            <div className="lg-form-header">
              <h1>Login</h1>
              <p>
                Don't Have An Account?{" "}
                <Link to="/signup" className="lg-signup-inline-link">Sign Up</Link>
              </p>
            </div>

            {/* Ban notice — shown when redirected from a banned session or failed login */}
            {bannedNotice && (
              <div className="lg-alert lg-alert-banned">
                <span className="lg-alert-icon">🚫</span>
                <div>
                  <strong>Account Suspended</strong>
                  <p>Your account has been suspended. Please contact us at <a href="mailto:support@shimlatravels.com">support@shimlatravels.com</a> for assistance.</p>
                </div>
              </div>
            )}

            {error && (
              <div className="lg-alert lg-error">
                <span className="lg-alert-icon">!</span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="lg-login-form">

              {/*
               * DESKTOP ONLY Google button — shown above email/password inputs.
               * Hidden on mobile via CSS:
               *   @media (max-width:1024px) { .desktop-google-section { display: none; } }
               * Mobile has its own Google button BELOW the Login button (.mobile-bottom-google).
               */}
              <div className="lg-desktop-google-section">
  <div className="lg-google-btn-wrapper">
    <SafeGoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={() => setError("Google login failed")}
    />
  </div>
  <div className="lg-separator-label">
    <span>or sign in with email</span>
  </div>
</div>
              {/* Email */}
              <div className={`lg-input-group ${focusedField === "email" ? "lg-focused" : ""}`}>
                <label htmlFor="email">Email Address</label>
                <div className="lg-input-wrap">
                  <Mail size={18} className="lg-input-symbol" />
                  <input
                    id="email" type="email" placeholder="Enter your email address"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)}
                    required disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password */}
              <div className={`lg-input-group ${focusedField === "password" ? "lg-focused" : ""}`}>
                <div className="lg-label-wrap">
                  <label htmlFor="password">Password</label>
                </div>
                <div className="lg-input-wrap">
                  <Lock size={18} className="lg-input-symbol" />
                  <input
                    id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")} onBlur={() => setFocusedField(null)}
                    required disabled={isLoading}
                  />
                  <button type="button" className="lg-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* MOBILE ONLY — Remember Me + Forgot Password */}
              <div className="lg-mobile-remember-row" >
                
                <Link to="/forgot-password" className="lg-forgot-link">Forgot Password?</Link>
              </div>

              {/* Login button */}
              <button type="submit" className="lg-submit-btn" disabled={isLoading || !email || !password}>
                {isLoading ? <div className="lg-spinner"></div> : <>Login <ArrowRight size={18} /></>}
              </button>

              {/*
               * MOBILE ONLY — "Or Continue With" divider + Google pill button.
               * Hidden on desktop via CSS:
               *   .mobile-bottom-google { display: none; }
               * Shown on mobile:
               *   @media (max-width:1024px) { .mobile-bottom-google { display: block !important; } }
               */}
              <div className="lg-mobile-bottom-google" style={{ display: "none" }}>
                <div className="lg-separator">
                  <span>Or Continue With</span>
                </div>
                <button
                  type="button"
                  className="lg-mobile-google-btn"
                  onClick={() => document.querySelector('.lg-google-btn-wrapper button')?.click()}
                >
                  <svg className="lg-google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>
              </div>

            </form>

            {/*
             * DESKTOP ONLY footer — "Don't have an account? Create an account →"
             * Hidden on mobile via CSS:
             *   @media (max-width:1024px) { .form-footer { display: none; } }
             * (mobile uses .form-header p instead)
             */}
            <div className="lg-form-footer">
              <p>Don't have an account?</p>
              <Link to="/signup" className="lg-create-account">
                Create an account <span>→</span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
