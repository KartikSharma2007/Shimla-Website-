import React, { useState, useEffect, useCallback } from 'react';
import { Star, Send, Loader, ThumbsUp, Shield, User, AlertCircle, ChevronDown } from 'lucide-react';
import { reviewAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './HotelReviewSection.css';

/**
 * HotelReviewSection
 * Drop-in review system for hotels — mirrors the package review experience.
 * Usage: <HotelReviewSection hotelId={hotel.id} hotelName={hotel.name} />
 */
export default function HotelReviewSection({ hotelId, hotelName }) {
  const { user, isAuthenticated } = useAuth();

  const [reviews,     setReviews]     = useState([]);
  const [stats,       setStats]       = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [showForm,    setShowForm]    = useState(false);
  const [showAll,     setShowAll]     = useState(false);
  const [submitting,  setSubmitting]  = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitDone,  setSubmitDone]  = useState(false);
  const [hoverStar,   setHoverStar]   = useState(0);
  const [userLikes,   setUserLikes]   = useState(new Set());

  const [form, setForm] = useState({
    rating: 0, title: '', comment: '', travelType: ''
  });

  /* ── Fetch reviews ── */
  const fetchReviews = useCallback(async () => {
    if (!hotelId) return;
    try {
      setLoading(true);
      const res = await reviewAPI.getForItem('hotel', String(hotelId));
      setReviews(res.data.data?.reviews   || []);
      setStats(res.data.data?.stats       || null);
    } catch { /* non-critical */ }
    finally { setLoading(false); }
  }, [hotelId]);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  /* ── Submit review ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) { setSubmitError('Please login to submit a review.'); return; }
    if (form.rating === 0) { setSubmitError('Please select a star rating.'); return; }
    if (!form.comment.trim() || form.comment.trim().length < 10) {
      setSubmitError('Comment must be at least 10 characters.'); return;
    }
    setSubmitting(true);
    setSubmitError('');
    try {
      await reviewAPI.create({
        itemId:   String(hotelId),
        itemType: 'hotel',
        itemName: hotelName,
        rating:   form.rating,
        title:    form.title,
        comment:  form.comment,
        travelType: form.travelType || undefined,
      });
      setSubmitDone(true);
      setForm({ rating: 0, title: '', comment: '', travelType: '' });
      setTimeout(() => { setSubmitDone(false); setShowForm(false); fetchReviews(); }, 2000);
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Like toggle (local only — stored in localStorage) ── */
  useEffect(() => {
    const saved = localStorage.getItem('hotelReviewLikes');
    if (saved) setUserLikes(new Set(JSON.parse(saved)));
  }, []);

  const toggleLike = (reviewId) => {
    setUserLikes(prev => {
      const next = new Set(prev);
      next.has(reviewId) ? next.delete(reviewId) : next.add(reviewId);
      localStorage.setItem('hotelReviewLikes', JSON.stringify([...next]));
      return next;
    });
  };

  /* ── Helpers ── */
  const formatDate = (d) => {
    if (!d) return '';
    const diff = Math.floor((Date.now() - new Date(d)) / 86400000);
    if (diff === 0) return 'Today';
    if (diff < 7)  return `${diff}d ago`;
    if (diff < 30) return `${Math.floor(diff / 7)}w ago`;
    return new Date(d).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
  };

  const Stars = ({ n, size = 14, interactive = false }) => (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <button
          key={i} type="button"
          style={{ background: 'none', border: 'none', padding: 1, cursor: interactive ? 'pointer' : 'default' }}
          onMouseEnter={() => interactive && setHoverStar(i)}
          onMouseLeave={() => interactive && setHoverStar(0)}
          onClick={() => interactive && setForm(p => ({ ...p, rating: i }))}
        >
          <Star
            size={size}
            fill={i <= (interactive ? (hoverStar || form.rating) : n) ? '#fbbf24' : 'none'}
            color={i <= (interactive ? (hoverStar || form.rating) : n) ? '#fbbf24' : '#d1d5db'}
          />
        </button>
      ))}
    </div>
  );

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  /* ── Rating distribution bar ── */
  const DistBar = ({ label, count, total }) => {
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    return (
      <div className="hrv-dist-row">
        <span className="hrv-dist-label">{label}</span>
        <div className="hrv-dist-track"><div className="hrv-dist-fill" style={{ width: `${pct}%` }} /></div>
        <span className="hrv-dist-count">{count}</span>
      </div>
    );
  };

  return (
    <section className="hrv-root">

      {/* ── Header ── */}
      <div className="hrv-header">
        <div>
          <h2 className="hrv-title">Guest Reviews</h2>
          {stats && (
            <div className="hrv-subtitle">
              <Star size={14} fill="#fbbf24" color="#fbbf24" />
              <span><strong>{stats.averageRating}</strong> · {stats.totalCount} review{stats.totalCount !== 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
        {isAuthenticated && !showForm && (
          <button className="hrv-write-btn" onClick={() => setShowForm(true)}>
            <Send size={14} /> Write a Review
          </button>
        )}
        {!isAuthenticated && (
          <span className="hrv-login-hint">Login to write a review</span>
        )}
      </div>

      {/* ── Rating overview ── */}
      {stats && stats.totalCount > 0 && (
        <div className="hrv-overview">
          <div className="hrv-big-rating">
            <span className="hrv-big-num">{stats.averageRating}</span>
            <Stars n={Math.round(stats.averageRating)} size={18} />
            <span className="hrv-big-total">{stats.totalCount} reviews</span>
          </div>
          <div className="hrv-dist">
            {[5,4,3,2,1].map(n => (
              <DistBar
                key={n}
                label={`${n}★`}
                count={stats.distribution[n] || 0}
                total={stats.totalCount}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Write review form ── */}
      {showForm && (
        <div className="hrv-form-wrap">
          {submitDone ? (
            <div className="hrv-success">
              <div className="hrv-success-icon">✅</div>
              <h3>Review Submitted!</h3>
              <p>Thank you for sharing your experience.</p>
            </div>
          ) : (
            <form className="hrv-form" onSubmit={handleSubmit}>
              <div className="hrv-form-header">
                <h3>Share Your Experience</h3>
                <button type="button" className="hrv-close-form" onClick={() => { setShowForm(false); setSubmitError(''); }}>✕</button>
              </div>

              {/* Star rating */}
              <div className="hrv-form-group">
                <label>Your Rating <span className="hrv-req">*</span></label>
                <div className="hrv-star-picker">
                  <Stars n={form.rating} size={28} interactive />
                  {form.rating > 0 && (
                    <span className="hrv-rating-label">
                      {['','Terrible','Poor','Average','Very Good','Excellent'][form.rating]}
                    </span>
                  )}
                </div>
              </div>

              {/* Title */}
              <div className="hrv-form-group">
                <label>Review Title <span className="hrv-opt">(optional)</span></label>
                <input
                  type="text"
                  className="hrv-input"
                  placeholder="Summarise your stay…"
                  value={form.title}
                  maxLength={100}
                  onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                />
              </div>

              {/* Comment */}
              <div className="hrv-form-group">
                <label>Your Review <span className="hrv-req">*</span></label>
                <textarea
                  className="hrv-textarea"
                  placeholder="What did you like or dislike? Min 10 characters…"
                  rows={4}
                  value={form.comment}
                  maxLength={2000}
                  onChange={e => setForm(p => ({ ...p, comment: e.target.value }))}
                />
                <span className="hrv-char">{form.comment.length}/2000</span>
              </div>

              {/* Travel type */}
              <div className="hrv-form-group">
                <label>Travel Type <span className="hrv-opt">(optional)</span></label>
                <select
                  className="hrv-select"
                  value={form.travelType}
                  onChange={e => setForm(p => ({ ...p, travelType: e.target.value }))}
                >
                  <option value="">Select…</option>
                  {['Solo','Couple','Family','Friends','Business'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {submitError && (
                <div className="hrv-error"><AlertCircle size={14} /> {submitError}</div>
              )}

              <div className="hrv-form-actions">
                <button type="button" className="hrv-btn-cancel" onClick={() => { setShowForm(false); setSubmitError(''); }}>
                  Cancel
                </button>
                <button type="submit" className="hrv-btn-submit" disabled={submitting}>
                  {submitting ? <><Loader size={14} className="hrv-spin" /> Submitting…</> : <><Send size={14} /> Submit Review</>}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* ── Reviews list ── */}
      {loading ? (
        <div className="hrv-loading">
          {[1,2,3].map(i => <div key={i} className="hrv-skeleton" />)}
        </div>
      ) : reviews.length === 0 ? (
        <div className="hrv-empty">
          <div style={{ fontSize: 36 }}>💬</div>
          <p>No reviews yet. Be the first to review this hotel!</p>
          {isAuthenticated && !showForm && (
            <button className="hrv-write-btn" onClick={() => setShowForm(true)} style={{ marginTop: 12 }}>
              <Send size={14} /> Write a Review
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="hrv-list">
            {displayedReviews.map(review => (
              <div key={review._id || review.id} className="hrv-card">
                <div className="hrv-card-top">
                  <div className="hrv-reviewer">
                    <div className="hrv-avatar">
                      {review.reviewerAvatar
                        ? <img src={review.reviewerAvatar} alt="" />
                        : <User size={16} />}
                    </div>
                    <div>
                      <div className="hrv-reviewer-name">{review.reviewerName || 'Anonymous'}</div>
                      <div className="hrv-reviewer-meta">
                        {review.travelType && <span className="hrv-travel-tag">{review.travelType}</span>}
                        <span className="hrv-date">{formatDate(review.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="hrv-card-rating">
                    <Stars n={review.rating} size={13} />
                    {review.isVerified && (
                      <span className="hrv-verified"><Shield size={10} /> Verified</span>
                    )}
                  </div>
                </div>

                {review.title && <div className="hrv-card-title">"{review.title}"</div>}
                <p className="hrv-card-comment">{review.comment}</p>

                <div className="hrv-card-footer">
                  {review.isEdited && <span className="hrv-edited">Edited</span>}
                  <button
                    className={`hrv-helpful-btn ${userLikes.has(review._id || review.id) ? 'hrv-liked' : ''}`}
                    onClick={() => toggleLike(review._id || review.id)}
                  >
                    <ThumbsUp size={13} /> Helpful
                    {(review.helpful || 0) + (userLikes.has(review._id || review.id) ? 1 : 0) > 0 && (
                      <span>({(review.helpful || 0) + (userLikes.has(review._id || review.id) ? 1 : 0)})</span>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {reviews.length > 3 && (
            <button className="hrv-show-more" onClick={() => setShowAll(p => !p)}>
              <ChevronDown size={16} style={{ transform: showAll ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              {showAll ? 'Show Less' : `Show All ${reviews.length} Reviews`}
            </button>
          )}
        </>
      )}
    </section>
  );
}
