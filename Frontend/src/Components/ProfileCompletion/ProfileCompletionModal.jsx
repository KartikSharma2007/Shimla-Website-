import React, { useState, useEffect, useCallback } from 'react';
import { Phone, User, MapPin, FileText, Compass } from 'lucide-react';
import './ProfileCompletionModal.css';

/**
 * ProfileCompletionModal
 * Detects incomplete Google-login profiles and prompts user to complete them.
 * Design matches your signup.css system exactly (blue primary / green mobile).
 *
 * Props:
 *   user       — current user object from AuthContext
 *   onComplete — callback(updatedUser) after save
 *   onSkip     — optional skip callback
 */

// ── Detection helper (export so Account.jsx can import it) ────────────────────
// A profile is considered complete when all required fields are genuinely filled
// in — regardless of the boolean flag (which may not exist for legacy accounts).
export const isProfileComplete = (user) => {
  if (!user) return false;

  // Trust the DB flag first — if set to true, never show the modal again.
  if (user.profileCompleted === true) return true;

  // Local accounts (email+password signup) always have complete profiles
  // because they fill everything in during the signup form (3-step wizard).
  // Only Google-signup accounts with placeholder phone need the modal.
  if (user.authProvider === 'local') return true;

  // For Google-login users who haven't completed their profile yet,
  // check whether all required fields are genuinely filled in.
  const hasRealPhone = user.phone &&
    !user.phone.startsWith('g') &&
    user.phone.replace(/\D/g, '').length >= 10 &&
    !/^0+$/.test(user.phone.replace(/\D/g, ''));

  return !!(
    hasRealPhone &&
    user.age && parseInt(user.age) >= 18 &&
    user.gender &&
    user.preferredTravelType
  );
};

// ── Step config ────────────────────────────────────────────────────────────────
const STEPS = [
  { id: 'contact',  label: 'Contact',  icon: '📱', fields: ['phone'] },
  { id: 'personal', label: 'Personal', icon: '👤', fields: ['age', 'gender'] },
  { id: 'travel',   label: 'Travel',   icon: '✈️',  fields: ['preferredTravelType'] },
  { id: 'about',    label: 'About',    icon: '📝',  fields: ['address'] }, // bio is optional
];

const TRAVEL_OPTIONS = [
  { value: 'adventure', label: 'Adventure', emoji: '🏔️', desc: 'Thrilling outdoors' },
  { value: 'family',    label: 'Family',    emoji: '👨‍👩‍👧‍👦', desc: 'Fun for everyone' },
  { value: 'honeymoon', label: 'Honeymoon', emoji: '💑',  desc: 'Romantic escapes' },
  { value: 'luxury',    label: 'Luxury',    emoji: '✨',  desc: 'Premium comfort' },
  { value: 'budget',    label: 'Budget',    emoji: '💰',  desc: 'Smart savings' },
  { value: 'nature',    label: 'Nature',    emoji: '🌿',  desc: 'Scenic beauty' },
];

const GENDER_OPTIONS = [
  { value: 'male',   label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other',  label: 'Other' },
];

// ── Field validators ───────────────────────────────────────────────────────────
const validate = (field, value) => {
  switch (field) {
    case 'phone':
      if (!value.trim()) return 'Phone number is required';
      if (value.replace(/\D/g, '').length < 10) return 'Phone must be at least 10 digits';
      return null;
    case 'age':
      if (!value) return 'Age is required';
      if (parseInt(value) < 18) return 'You must be at least 18 years old';
      if (parseInt(value) > 100) return 'Please enter a valid age';
      return null;
    case 'gender':
      if (!value) return 'Please select your gender';
      return null;
    case 'preferredTravelType':
      if (!value) return 'Please select a travel type';
      return null;
    case 'address':
      if (!value.trim()) return 'Address is required';
      if (value.trim().length < 5) return 'Please enter a full address';
      return null;
    // bio is optional — no validation
    default:
      return null;
  }
};

// ── Component ──────────────────────────────────────────────────────────────────
const ProfileCompletionModal = ({ user, onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [formData, setFormData] = useState({
    phone: '',
    age: '',
    gender: '',
    preferredTravelType: '',
    address: '',
    bio: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const handleChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors(prev => ({ ...prev, [field]: validate(field, value) }));
    }
    setSubmitError('');
  }, [touched]);

  const handleBlur = useCallback((field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(prev => ({ ...prev, [field]: validate(field, formData[field]) }));
  }, [formData]);

  const validateStep = (idx) => {
    const step = STEPS[idx];
    const newErrors = {};
    const newTouched = {};
    let valid = true;
    step.fields.forEach(f => {
      newTouched[f] = true;
      const e = validate(f, formData[f]);
      if (e) { newErrors[f] = e; valid = false; }
    });
    setTouched(prev => ({ ...prev, ...newTouched }));
    setErrors(prev => ({ ...prev, ...newErrors }));
    return valid;
  };

  const handleNext = () => { if (validateStep(currentStep)) setCurrentStep(p => p + 1); };
  const handleBack = () => { setCurrentStep(p => p - 1); setSubmitError(''); };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const token = localStorage.getItem('token');
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
      const payload = {
        phone: formData.phone.trim(),
        age: parseInt(formData.age),
        gender: formData.gender,
        preferredTravelType: formData.preferredTravelType,
        address: formData.address.trim(),
        bio: formData.bio.trim(),       // optional — empty string is fine
        profileCompleted: true,
      };

      const res = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save profile');

      setIsVisible(false);
      setTimeout(() => onComplete(data.data?.user || { ...user, ...payload }), 350);
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressWidth = ((currentStep) / STEPS.length) * 100 + (100 / STEPS.length) * 0.4;

  return (
    <div className={`pcm-overlay ${isVisible ? 'pcm-overlay--visible' : ''}`}>
      <div
        className={`pcm-modal ${isVisible ? 'pcm-modal--visible' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Complete your profile"
      >

        {/* ─── Header ─── */}
        <div className="pcm-header">

          <div className="pcm-header-top">
            <div className="pcm-avatar-wrap">
              {/* Always show initials — never render an external Google photo URL */}
              <div className="pcm-avatar-placeholder">
                {user?.fullName
                  ? user.fullName.split(' ').filter(Boolean).map(w => w[0]).join('').toUpperCase().slice(0, 2)
                  : '?'
                }
              </div>
              <span className="pcm-google-badge" title="Google Account">
                <svg width="13" height="13" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </span>
            </div>

            <div>
              <div className="pcm-title">
                Almost there, {user?.fullName?.split(' ')[0]}!
              </div>
              <div className="pcm-subtitle">
                Complete your profile to get personalised travel recommendations
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="pcm-progress-wrap">
            <div className="pcm-progress-bar">
              <div className="pcm-progress-fill" style={{ width: `${progressWidth}%` }} />
            </div>
            <div className="pcm-progress-label">Step {currentStep + 1} of {STEPS.length}</div>
          </div>

          {/* Step nav — mirrors signup progress circles */}
          <div className="pcm-steps-nav">
            {STEPS.map((step, idx) => (
              <div
                key={step.id}
                className={`pcm-step-dot ${idx < currentStep ? 'pcm-step-dot--done' : ''} ${idx === currentStep ? 'pcm-step-dot--active' : ''}`}
              >
                <div className="pcm-step-circle">
                  {idx < currentStep ? '✓' : idx + 1}
                </div>
                <span className="pcm-step-dot-label">{step.label}</span>
                {idx < STEPS.length - 1 && <div className="pcm-step-connector" />}
              </div>
            ))}
          </div>

        </div>

        {/* ─── Body ─── */}
        <div className="pcm-body">

          {/* Step 0 — Contact */}
          {currentStep === 0 && (
            <div className="pcm-step">
              <div className="pcm-step-intro">
                <h3>📱 Contact Details</h3>
                <p>We need your phone for booking confirmations and updates.</p>
              </div>

              {/* Prefilled from Google */}
              <div className="pcm-prefilled-group">
                <div className="pcm-prefilled-item">
                  <span className="pcm-prefilled-label">Name</span>
                  <span className="pcm-prefilled-value">{user?.fullName}</span>
                  <span className="pcm-prefilled-badge">Google ✓</span>
                </div>
                <div className="pcm-prefilled-item">
                  <span className="pcm-prefilled-label">Email</span>
                  <span className="pcm-prefilled-value">{user?.email}</span>
                  <span className="pcm-prefilled-badge">Google ✓</span>
                </div>
              </div>

              <div className="pcm-field">
                <label className="pcm-label">
                  Phone Number <span className="pcm-required">*</span>
                </label>
                <div className="pcm-input-wrap">
                  <Phone size={18} className="pcm-input-icon" />
                  <input
                    type="tel"
                    className={`pcm-input ${errors.phone && touched.phone ? 'pcm-input--error' : ''}`}
                    placeholder="10 digit mobile number"
                    value={formData.phone}
                    onChange={e => handleChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                    onBlur={() => handleBlur('phone')}
                    autoFocus
                    maxLength={10}
                  />
                </div>
                {formData.phone && formData.phone.length !== 10 && (
                  <span className="pcm-hint">{formData.phone.length}/10 digits</span>
                )}
                {errors.phone && touched.phone && <span className="pcm-error">{errors.phone}</span>}
              </div>
            </div>
          )}

          {/* Step 1 — Personal */}
          {currentStep === 1 && (
            <div className="pcm-step">
              <div className="pcm-step-intro">
                <h3>👤 About You</h3>
                <p>Help us personalise your travel experience.</p>
              </div>

              <div className="pcm-field">
                <label className="pcm-label">
                  Age <span className="pcm-required">*</span>
                </label>
                <div className="pcm-input-wrap">
                  <User size={18} className="pcm-input-icon" />
                  <input
                    type="number"
                    className={`pcm-input ${errors.age && touched.age ? 'pcm-input--error' : ''}`}
                    placeholder="Your age (min. 18)"
                    min="18" max="100"
                    value={formData.age}
                    onChange={e => handleChange('age', e.target.value)}
                    onBlur={() => handleBlur('age')}
                    autoFocus
                  />
                </div>
                {errors.age && touched.age && <span className="pcm-error">{errors.age}</span>}
              </div>

              <div className="pcm-field">
                <label className="pcm-label">
                  Gender <span className="pcm-required">*</span>
                </label>
                <div className="pcm-gender-group">
                  {GENDER_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`pcm-gender-btn ${formData.gender === opt.value ? 'pcm-gender-btn--selected' : ''}`}
                      onClick={() => { handleChange('gender', opt.value); setTouched(p => ({ ...p, gender: true })); }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {errors.gender && touched.gender && <span className="pcm-error">{errors.gender}</span>}
              </div>
            </div>
          )}

          {/* Step 2 — Travel style */}
          {currentStep === 2 && (
            <div className="pcm-step">
              <div className="pcm-step-intro">
                <h3>✈️ Travel Style</h3>
                <p>We'll tailor packages and deals to how you love to travel.</p>
              </div>

              <div className="pcm-field">
                <label className="pcm-label">
                  Preferred Travel Type <span className="pcm-required">*</span>
                </label>
                <div className="pcm-travel-grid">
                  {TRAVEL_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`pcm-travel-card ${formData.preferredTravelType === opt.value ? 'pcm-travel-card--selected' : ''}`}
                      onClick={() => { handleChange('preferredTravelType', opt.value); setTouched(p => ({ ...p, preferredTravelType: true })); }}
                    >
                      <span className="pcm-travel-emoji">{opt.emoji}</span>
                      <span className="pcm-travel-label">{opt.label}</span>
                      <span className="pcm-travel-desc">{opt.desc}</span>
                      {formData.preferredTravelType === opt.value && (
                        <div className="pcm-travel-check">✓</div>
                      )}
                    </button>
                  ))}
                </div>
                {errors.preferredTravelType && touched.preferredTravelType && (
                  <span className="pcm-error">{errors.preferredTravelType}</span>
                )}
              </div>
            </div>
          )}

          {/* Step 3 — About */}
          {currentStep === 3 && (
            <div className="pcm-step">
              <div className="pcm-step-intro">
                <h3>📝 Your Details</h3>
                <p>Tell us where you're based and a little about yourself.</p>
              </div>

              <div className="pcm-field">
                <label className="pcm-label">
                  Address <span className="pcm-required">*</span>
                </label>
                <div className="pcm-input-wrap">
                  <MapPin size={18} className="pcm-input-icon" />
                  <input
                    type="text"
                    className={`pcm-input ${errors.address && touched.address ? 'pcm-input--error' : ''}`}
                    placeholder="e.g. 12 MG Road, Bengaluru"
                    value={formData.address}
                    onChange={e => handleChange('address', e.target.value)}
                    onBlur={() => handleBlur('address')}
                    autoFocus
                  />
                </div>
                {errors.address && touched.address && <span className="pcm-error">{errors.address}</span>}
              </div>

              <div className="pcm-field">
                <label className="pcm-label">
                  Bio <span className="pcm-optional">Optional</span>
                </label>
                <div className="pcm-textarea-wrap">
                  <FileText size={18} className="pcm-textarea-icon" />
                  <textarea
                    className="pcm-textarea"
                    placeholder="Tell us about yourself and your travel interests..."
                    rows={3}
                    maxLength={500}
                    value={formData.bio}
                    onChange={e => handleChange('bio', e.target.value.slice(0, 500))}
                  />
                </div>
                <div className="pcm-bio-footer">
                  <span />
                  <span className={`pcm-char-count ${formData.bio.length > 450 ? 'pcm-char-count--warn' : ''}`}>
                    {formData.bio.length}/500
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Submit error */}
          {submitError && (
            <div className="pcm-submit-error">
              <span className="pcm-error-icon">!</span>
              {submitError}
            </div>
          )}

        </div>

        {/* ─── Footer ─── */}
        <div className="pcm-footer">
          {currentStep > 0 && (
            <button type="button" className="pcm-btn pcm-btn--back" onClick={handleBack} disabled={isSubmitting}>
              ← Back
            </button>
          )}

          {currentStep === 0 && onSkip && (
            <button type="button" className="pcm-btn pcm-btn--skip" onClick={onSkip} disabled={isSubmitting}>
              Skip for now
            </button>
          )}

          <div className="pcm-footer-right">
            {currentStep < STEPS.length - 1 ? (
              <button type="button" className="pcm-btn pcm-btn--next" onClick={handleNext} disabled={isSubmitting}>
                Continue →
              </button>
            ) : (
              <button type="button" className="pcm-btn pcm-btn--submit" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting
                  ? <span className="pcm-spinner-wrap"><span className="pcm-spinner" /> Saving…</span>
                  : '🎉 Complete Profile'
                }
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileCompletionModal;
