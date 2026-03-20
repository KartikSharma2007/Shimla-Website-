import React, { useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye, EyeOff, ChevronRight, ChevronLeft, Check,
  User, Mail, Phone, MapPin, Lock, Calendar, Compass, Luggage, FileText,
  LogOut, AlertTriangle
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

import { GoogleLogin } from '@react-oauth/google';

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const STEP_HERO = {
  1: {
    badge: "Step 1 of 3",
    headline: <>Tell us<br />about <span className="accent-word">yourself</span></>,
    sub: "Start your Shimla adventure",
  },
  2: {
    badge: "Step 2 of 3",
    headline: <>Set up your<br /><span className="accent-word">travel profile</span></>,
    sub: "Pick your favourite travel style",
  },
  3: {
    badge: "Step 3 of 3",
    headline: <>Secure your<br /><span className="accent-word">account</span></>,
    sub: "Almost there — just one more step",
  },
};

/*
 * Reusable desktop Google button block — shown on ALL 3 steps on PC.
 * Hidden on mobile via CSS:
 *   @media (max-width:1024px) { .desktop-google-signup { display: none; } }
 * Mobile has its own .mob-google-section at the top of the sheet (unchanged).
 */
const DesktopGoogleSignup = ({ onSuccess, onError }) => (
  <div className="desktop-google-signup">
    <div className="google-divider">
      <span>or sign up with</span>
    </div>
    <div className="google-login-wrapper">
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
        theme="outline"
        size="large"
        text="signup_with"
        shape="pill"
        width="100%"
      />
    </div>
  </div>
);

export default function Signup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [step1Data, setStep1Data] = useState({ fullname: "", gender: "", age: "" });
  const [step2Data, setStep2Data] = useState({ username: "", travelType: "", bio: "" });
  const [step3Data, setStep3Data] = useState({ email: "", phone: "", address: "", password: "", confirmPassword: "" });

  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // Validate a single field on blur
  const validateField = (name, value) => {
    switch (name) {
      case 'fullname':
        return value.trim().length < 2 ? 'Full name must be at least 2 characters' : null;
      case 'age':
        return (!value || Number(value) < 18 || Number(value) > 100) ? 'Age must be between 18 and 100' : null;
      case 'username':
        if (!value || value.trim().length < 3) return 'Username must be at least 3 characters';
        if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Only letters, numbers and underscores';
        return null;
      case 'email':
        return !/^\S+@\S+\.\S+$/.test(value) ? 'Please enter a valid email address' : null;
      case 'phone':
        return !/^[\d\s\-\+\(\)]{10,}$/.test(value) ? 'Please enter a valid phone number (min 10 digits)' : null;
      case 'password':
        return value.length < 6 ? 'Password must be at least 6 characters' : null;
      case 'confirmPassword':
        return value !== step3Data.password ? 'Passwords do not match' : null;
      default:
        return null;
    }
  };

  // Usage: add {fieldErrors.fieldname && <p className="su-field-error">{fieldErrors.fieldname}</p>}
  // under each input in JSX to show inline validation errors
  const handleBlur = (name, value) => {
    const err = validateField(name, value);
    setFieldErrors(prev => ({ ...prev, [name]: err }));
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, googleLogin, isAuthenticated, logout, user } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutAndStay = async () => {
    setIsLoggingOut(true);
    await logout();
    setIsLoggingOut(false);
  };

  const travelTypes = [
    { id: 'adventure', label: 'Adventure', icon: '🏔️' },
    { id: 'family',    label: 'Family',    icon: '👨‍👩‍👧‍👦' },
    { id: 'honeymoon', label: 'Honeymoon', icon: '💑' },
    { id: 'luxury',    label: 'Luxury',    icon: '✨' },
    { id: 'budget',    label: 'Budget',    icon: '💰' },
    { id: 'nature',    label: 'Nature',    icon: '🌿' }
  ];

  const genders = [
    { id: 'male',   label: 'Male' },
    { id: 'female', label: 'Female' },
    { id: 'other',  label: 'Other' }
  ];

  const validateStep1 = () => {
    if (!step1Data.fullname.trim()) return "Full name is required";
    if (!step1Data.gender) return "Please select your gender";
    if (!step1Data.age || step1Data.age < 18) return "You must be at least 18 years old";
    return null;
  };

  const validateStep2 = () => {
    if (!step2Data.username.trim()) return "Username is required";
    if (!step2Data.travelType) return "Please select your preferred travel type";
    return null;
  };

  const validateStep3 = () => {
    if (!step3Data.email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(step3Data.email)) return "Invalid email format";
    if (!step3Data.phone.trim()) return "Phone number is required";
    if (step3Data.phone.replace(/\D/g, '').length !== 10) return "Phone must be exactly 10 digits";
    if (!step3Data.password) return "Password is required";
    if (step3Data.password.length < 8) return `Password too short — need ${8 - step3Data.password.length} more character${8 - step3Data.password.length > 1 ? 's' : ''}`;
    if (step3Data.password !== step3Data.confirmPassword) return "Passwords do not match";
    return null;
  };

  const handleNext = () => {
    const err = currentStep === 1 ? validateStep1() : validateStep2();
    if (err) { setError(err); return; }
    setError(""); setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => { setError(""); setCurrentStep(prev => prev - 1); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateStep3();
    if (err) { setError(err); return; }
    setIsLoading(true); setError('');
    const userData = {
      fullName: step1Data.fullname.trim(),
      age: parseInt(step1Data.age),
      gender: step1Data.gender.toLowerCase(),
      username: step2Data.username.trim(),
      preferredTravelType: step2Data.travelType,
      email: step3Data.email.trim(),
      phone: step3Data.phone.trim(),
      address: step3Data.address?.trim() || '',
      bio: step2Data.bio?.trim() || '',
      password: step3Data.password,
    };
    const result = await register(userData);
    if (result.success) { navigate('/account'); }
    else { setError(result.error || 'Registration failed. Please try again.'); }
    setIsLoading(false);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true); setError("");
    const result = await googleLogin(credentialResponse.credential);
    if (result.success) { navigate('/account'); }
    else { setError(result.message || "Google signup failed."); }
    setIsLoading(false);
  };

  const isStepValid = () => {
    if (currentStep === 1) return step1Data.fullname.trim() && step1Data.gender && step1Data.age && step1Data.age >= 18;
    if (currentStep === 2) return step2Data.username.trim() && step2Data.travelType;
    return true;
  };

  const renderProgress = () => (
    <div className="signup-progress">
      {[1, 2, 3].map(step => (
        <div key={step} className={`progress-step ${step === currentStep ? 'active' : ''} ${step < currentStep ? 'completed' : ''}`}>
          <div className="step-circle">
            {step < currentStep ? <Check size={18} strokeWidth={3} /> : step}
          </div>
          <span className="step-label">
            {step === 1 ? 'Basic' : step === 2 ? 'Profile' : 'Account'}
          </span>
          {step < 3 && <div className="step-line" />}
        </div>
      ))}
    </div>
  );

  const pillState = (step) => {
    if (step < currentStep) return 'completed';
    if (step === currentStep) return 'active';
    return 'inactive';
  };
  const pillLabel = ['Basic Info', 'Profile', 'Account'];
  const hero = STEP_HERO[currentStep];

  return (
    <div className="signup-container">

      {/* ══ Already Logged In Modal ══ */}
      {isAuthenticated && (
        <div className="already-loggedin-overlay">
          <div className="already-loggedin-modal">
            <div className="alm-icon-wrap">
              <AlertTriangle size={32} strokeWidth={2} />
            </div>
            <h2 className="alm-title">You're Already Logged In</h2>
            <p className="alm-body">
              You are currently signed in
              {user?.fullName ? <> as <strong>{user.fullName}</strong></> : ''}.
              Please log out of your current account before creating a new one.
            </p>
            <div className="alm-actions">
              <button
                className="alm-btn-logout"
                onClick={handleLogoutAndStay}
                disabled={isLoggingOut}
              >
                {isLoggingOut
                  ? <span className="loading-spinner" />
                  : <><LogOut size={18} /> Log Out</>
                }
              </button>
              <Link to="/account" className="alm-btn-account">
                Go to My Account
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ══ MOBILE ONLY: Green hero ══ */}
      <div className="mob-hero" style={{ display: 'none' }}>
        <div className="mob-hero-brand">
          <div className="mob-hero-brand-icon"><Compass size={20} /></div>
          <span className="mob-hero-brand-name">Shimla Travel</span>
        </div>
        <div className="mob-hero-text">
          <div className="mob-step-badge">{hero.badge}</div>
          <h2>{hero.headline}</h2>
          <p>{hero.sub}</p>
        </div>
        <div className="mob-hero-illo">
          <div className="mob-illo-card-back"></div>
          <div className="mob-illo-card-front"></div>
        </div>
      </div>

      {/* ══ MOBILE ONLY: Step progress pills ══ */}
      <div className="mob-step-pills" style={{ display: 'none' }}>
        {[1, 2, 3].map((step) => (
          <div key={step} className={`mob-pill ${pillState(step)}`}>
            <span className="mob-pill-dot"></span>
            {step < currentStep ? <Check size={10} strokeWidth={3} /> : null}
            {pillLabel[step - 1]}
          </div>
        ))}
      </div>

      {/* ══ Main layout ══ */}
      <div className="signup-left">
        <div className="signup-card">

          {/* Desktop header */}
          <div className="signup-header">
            <div className="brand-logo">
              <Compass size={32} /><span>Shimla Travel</span>
            </div>
            <h1>Create Account</h1>
            <p className="subtitle">Begin your journey with us</p>
          </div>

          {renderProgress()}

          {error && (
            <div className="error-alert">
              <span className="error-icon">!</span>
              <span>{error}</span>
            </div>
          )}

          {/* MOBILE ONLY: Google sign-up button at top of sheet — unchanged */}
          <div className="mob-google-section" style={{ display: 'none' }}>
            <button
              type="button"
              className="mob-google-btn"
              onClick={() => {
                const googleBtn = document.querySelector('.google-login-wrapper iframe');
                if (googleBtn) { googleBtn.click(); }
                else if (hasGoogleOAuth) {
                  document.querySelector('.google-login-wrapper div[role="button"]')?.click();
                }
              }}
            >
              <GoogleIcon />
              Continue with Google
            </button>
            <div className="mob-or-divider">
              <span>or fill in the form</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="signup-form">

            {/* ── Step 1: Basic Information ── */}
            {currentStep === 1 && (
              <div className="step-content animate-in">
                <div className="step-header">
                  <h2>Basic Information</h2>
                  <p>Let's start with the essentials</p>
                </div>

                <div className="form-group">
                  <label>Full Name <span className="required">*</span></label>
                  <div className="input-wrapper">
                    <User size={18} className="input-icon" />
                    <input
                      type="text" placeholder="Enter your full name"
                      value={step1Data.fullname}
                      onChange={(e) => setStep1Data({...step1Data, fullname: e.target.value})}
                      onBlur={(e) => handleBlur('fullname', e.target.value)}
                      className={error && !step1Data.fullname ? 'error' : ''}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group half">
                    <label>Age <span className="required">*</span></label>
                    <div className="input-wrapper">
                      <Calendar size={18} className="input-icon" />
                      <input
                        type="number" placeholder="Age" min="18" max="120"
                        value={step1Data.age}
                        onChange={(e) => setStep1Data({...step1Data, age: e.target.value})}
                        onBlur={(e) => handleBlur('age', e.target.value)}
                        className={error && (!step1Data.age || step1Data.age < 18) ? 'error' : ''}
                      />
                    </div>
                  </div>
                  <div className="form-group half">
                    <label>Gender <span className="required">*</span></label>
                    <div className="gender-selector">
                      {genders.map(g => (
                        <button key={g.id} type="button"
                          className={`gender-chip ${step1Data.gender === g.label ? 'selected' : ''}`}
                          onClick={() => setStep1Data({...step1Data, gender: g.label})}
                        >{g.label}</button>
                      ))}
                    </div>
                  </div>
                </div>

                <button type="button" className="btn-primary btn-full" onClick={handleNext} disabled={!isStepValid()}>
                  Continue <ChevronRight size={20} />
                </button>

                {/* DESKTOP ONLY: Google button — Step 1 */}
                <DesktopGoogleSignup
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError('Google signup failed')}
                />
              </div>
            )}

            {/* ── Step 2: Profile Setup ── */}
            {currentStep === 2 && (
              <div className="step-content animate-in">
                <div className="step-header">
                  <h2>Profile Setup</h2>
                  <p>Customize your travel experience</p>
                </div>

                <div className="form-group">
                  <label>Username <span className="required">*</span></label>
                  <div className="input-wrapper">
                    <User size={18} className="input-icon" />
                    <input
                      type="text" placeholder="Choose a username"
                      value={step2Data.username}
                      onChange={(e) => setStep2Data({...step2Data, username: e.target.value})}
                      onBlur={(e) => handleBlur('username', e.target.value)}
                      className={error && !step2Data.username ? 'error' : ''}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Preferred Travel Type <span className="required">*</span></label>
                  <div className="travel-types-grid">
                    {travelTypes.map(type => (
                      <button key={type.id} type="button"
                        className={`travel-type-card ${step2Data.travelType === type.id ? 'selected' : ''}`}
                        onClick={() => setStep2Data({...step2Data, travelType: type.id})}
                      >
                        <span className="travel-icon">{type.icon}</span>
                        <span className="travel-label">{type.label}</span>
                        {step2Data.travelType === type.id && (
                          <div className="check-badge"><Check size={12} strokeWidth={3} /></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Bio <span className="optional-tag">Optional</span></label>
                  <div className="textarea-wrapper">
                    <FileText size={18} className="textarea-icon" />
                    <textarea
                      placeholder="Tell us a little about yourself and your travel interests..."
                      value={step2Data.bio}
                      onChange={(e) => setStep2Data({...step2Data, bio: e.target.value.slice(0, 500)})}
                      rows={3}
                      maxLength={500}
                      className="bio-textarea"
                    />
                  </div>
                  <span className="helper-text bio-counter">{(step2Data.bio || '').length}/500</span>
                </div>

                <div className="button-group">
                  <button type="button" className="btn-secondary btn-back-improved" onClick={handleBack}>
                    <ChevronLeft size={18} /> Back
                  </button>
                  <button type="button" className="btn-primary" onClick={handleNext} disabled={!isStepValid()}>
                    Continue <ChevronRight size={20} />
                  </button>
                </div>

                {/* DESKTOP ONLY: Google button — Step 2 */}
                <DesktopGoogleSignup
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError('Google signup failed')}
                />
              </div>
            )}

            {/* ── Step 3: Account Details ── */}
            {currentStep === 3 && (
              <div className="step-content animate-in">
                <div className="step-header">
                  <h2>Account Details</h2>
                  <p>Secure your account</p>
                </div>

                <div className="form-group">
                  <label>Email Address <span className="required">*</span></label>
                  <div className="input-wrapper">
                    <Mail size={18} className="input-icon" />
                    <input type="email" placeholder="your@email.com"
                      value={step3Data.email}
                      onChange={(e) => setStep3Data({...step3Data, email: e.target.value})}
                      onBlur={(e) => handleBlur('email', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Phone Number <span className="required">*</span></label>
                  <div className="input-wrapper">
                    <Phone size={18} className="input-icon" />
                    <input type="tel" placeholder="10 digit mobile number"
                      value={step3Data.phone}
                      onChange={(e) => setStep3Data({...step3Data, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                      onBlur={(e) => handleBlur('phone', e.target.value)}
                      maxLength={10}
                    />
                  </div>
                  {step3Data.phone && step3Data.phone.length !== 10 && (
                    <span className="helper-text">{step3Data.phone.length}/10 digits</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <div className="input-wrapper">
                    <MapPin size={18} className="input-icon" />
                    <input type="text" placeholder="Enter your address"
                      value={step3Data.address}
                      onChange={(e) => setStep3Data({...step3Data, address: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group half">
                    <label>Password <span className="required">*</span></label>
                    <div className="input-wrapper">
                      <Lock size={18} className="input-icon" />
                      <input
                        type={showPassword ? "text" : "password"} placeholder="••••••••"
                        value={step3Data.password}
                        onChange={(e) => setStep3Data({...step3Data, password: e.target.value})}
                        onBlur={(e) => handleBlur('password', e.target.value)}
                      />
                      <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {step3Data.password ? (
                      <span className="helper-text" style={{ color: step3Data.password.length >= 8 ? '#059669' : '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                        {step3Data.password.length >= 8 ? '✓ Password looks good' : `✗ ${8 - step3Data.password.length} more characters needed`}
                      </span>
                    ) : (
                      <span className="helper-text" style={{ color: '#6b7280', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                        Minimum 8 characters required
                      </span>
                    )}
                  </div>
                  <div className="form-group half">
                    <label>Confirm <span className="required">*</span></label>
                    <div className="input-wrapper">
                      <Lock size={18} className="input-icon" />
                      <input
                        type={showConfirmPassword ? "text" : "password"} placeholder="••••••••"
                        value={step3Data.confirmPassword}
                        onChange={(e) => setStep3Data({...step3Data, confirmPassword: e.target.value})}
                        onBlur={(e) => handleBlur('confirmPassword', e.target.value)}
                      />
                      <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="button-group button-group--final">
                  <button type="button" className="btn-secondary btn-back-improved" onClick={handleBack}>
                    <ChevronLeft size={18} /> Back
                  </button>
                  <button type="submit" className="btn-primary btn-create"
                    disabled={isLoading || step3Data.password.length < 8 || step3Data.password !== step3Data.confirmPassword}
                  >
                    {isLoading
                      ? <span className="loading-spinner"></span>
                      : <><Luggage size={20} /> Create Account</>
                    }
                  </button>
                </div>

                {/* DESKTOP ONLY: Google button — Step 3 */}
                <DesktopGoogleSignup
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError('Google signup failed')}
                />
              </div>
            )}
          </form>

          <div className="signup-footer">
            <p>Already have an account? <Link to="/login" className="login-link">Sign in</Link></p>
          </div>
        </div>
      </div>

      {/* Desktop right panel */}
      <div className="signup-right">
        <div className="hero-content">
          <h2>Discover Your Next Adventure</h2>
          <p>Join thousands of travelers exploring the world's most beautiful destinations</p>
          <div className="feature-badges">
            <div className="badge"><Check size={16} /><span>Personalized Recommendations</span></div>
            <div className="badge"><Check size={16} /><span>Exclusive Deals</span></div>
            <div className="badge"><Check size={16} /><span>24/7 Support</span></div>
          </div>
        </div>
        <div className="gradient-overlay"></div>
      </div>

    </div>
  );
}
