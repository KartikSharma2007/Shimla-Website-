import { 
  X, 
  Star, 
  User, 
  Calendar, 
  Send, 
  ThumbsUp, 
  MessageCircle, 
  MoreVertical, 
  Trash2, 
  AlertCircle,
  MapPin,
  Clock,
  Shield,
  ChevronLeft
} from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import './ReviewsModal.css';
import { useAuth } from '../../context/AuthContext'; // ✅ real user

const STORAGE_KEY = 'userReviews';
const EVENT_KEY = 'reviewsUpdated';

// Dispatch custom event for cross-component sync
const dispatchReviewEvent = (packageId) => {
  window.dispatchEvent(new CustomEvent(EVENT_KEY, { detail: { packageId } }));
};

const ReviewsModal = ({ isOpen, onClose, packageData, onReviewChange }) => {
  // ✅ Pull real logged-in user from auth context
  const { user, isAuthenticated } = useAuth();

  // ✅ Derive currentUser from real auth — never hardcoded
  const currentUser = {
    id:       user?._id || user?.id || null,
    name:     user?.fullName || user?.name || 'Guest',
    // ✅ FIX: store real avatar URL — fallback to first-letter initial
    avatar:   user?.avatar || null,
    initial:  (user?.fullName || user?.name || 'G').charAt(0).toUpperCase(),
  };

  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });
  const [notLoggedInError, setNotLoggedInError] = useState(false); // ✅ login gate
  const [formErrors, setFormErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Load reviews function
  const loadReviews = useCallback(() => {
    if (!packageData) return;
    
    const baseReviews = packageData.reviews || [];
    const storedReviews = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const packageUserReviews = storedReviews.filter(r => r.packageId === packageData.id);
    
    const allReviews = [...baseReviews, ...packageUserReviews].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    setReviews(allReviews);
  }, [packageData]);

  // Initial load and when opened
  useEffect(() => {
    if (isOpen) {
      loadReviews();
    }
  }, [isOpen, loadReviews]);

  // Listen for updates from other components
  useEffect(() => {
    const handleReviewUpdate = (e) => {
      if (!e.detail?.packageId || e.detail.packageId === packageData?.id) {
        loadReviews();
      }
    };

    window.addEventListener(EVENT_KEY, handleReviewUpdate);
    return () => window.removeEventListener(EVENT_KEY, handleReviewUpdate);
  }, [packageData?.id, loadReviews]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const validateForm = () => {
    const errors = {};

    // ✅ Block unauthenticated users
    if (!isAuthenticated || !currentUser.id) {
      setNotLoggedInError(true);
      return false;
    }

    if (!newReview.comment.trim()) {
      errors.comment = 'Please write a review comment';
    } else if (newReview.comment.length < 10) {
      errors.comment = 'Comment must be at least 10 characters';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    const review = {
      id: `review-${Date.now()}`,
      packageId: packageData.id,
      reviewerName:   currentUser.name,
      reviewerAvatar: currentUser.avatar,  // ✅ FIX: store real avatar URL
      rating: parseFloat(newReview.rating),
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      userId: currentUser.id,           // ✅ real user ID from auth
      isUserReview: true
    };

    // Save to localStorage
    const existingReviews = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existingReviews.push(review);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingReviews));

    // Update local state
    setReviews([review, ...reviews]);
    
    // Reset form
    setNewReview({ rating: 5, comment: '' });
    setNotLoggedInError(false);
    setSubmitSuccess(true);
    setShowReviewForm(false);
    setIsLoading(false);
    
    // SYNC: Notify other components
    dispatchReviewEvent(packageData.id);
    if (onReviewChange) onReviewChange();

    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const handleDeleteReview = (reviewId) => {
    // Remove from localStorage
    const existingReviews = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const updatedReviews = existingReviews.filter(r => r.id !== reviewId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReviews));

    // Update local state
    setReviews(reviews.filter(r => r.id !== reviewId));
    setActiveDropdown(null);
    setDeleteSuccess(true);
    
    // SYNC: Notify other components
    dispatchReviewEvent(packageData.id);
    if (onReviewChange) onReviewChange();
    
    setTimeout(() => setDeleteSuccess(false), 3000);
  };

  const isReviewOwner = (review) => {
    if (!currentUser.id) return false;
    return review.userId === currentUser.id ||
           (review.isUserReview && !review.userId);
  };

  const toggleDropdown = (reviewId) => {
    setActiveDropdown(activeDropdown === reviewId ? null : reviewId);
  };

  const renderStars = (rating, size = 16) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={size}
        fill={i < Math.floor(rating) ? '#fbbf24' : 'none'}
        color={i < Math.floor(rating) ? '#fbbf24' : '#d1d5db'}
        strokeWidth={1.5}
      />
    ));
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => {
      const rounded = Math.round(r.rating);
      if (distribution[rounded] !== undefined) {
        distribution[rounded]++;
      }
    });
    return distribution;
  };

  const getRatingLabel = (rating) => {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4) return 'Very Good';
    if (rating >= 3) return 'Good';
    if (rating >= 2) return 'Fair';
    return 'Poor';
  };

  if (!isOpen || !packageData) return null;

  const avgRating = calculateAverageRating();
  const distribution = getRatingDistribution();
  const totalReviews = reviews.length;
  const myReviewsCount = reviews.filter(r => isReviewOwner(r)).length;
  const ratingLabel = getRatingLabel(parseFloat(avgRating));

  return (
    <div className="reviews-page">
      <header className="reviews-page-header">
        <div className="reviews-header-content">
          <button className="reviews-back-btn" onClick={onClose}>
            <ChevronLeft size={24} />
          </button>
          
          <div className="reviews-header-info">
            <h1 className="reviews-header-title">{packageData.title}</h1>
            <div className="reviews-header-meta">
              <span className="reviews-meta-item">
                <MapPin size={14} />
                {packageData.location}
              </span>
              <span className="reviews-meta-item">
                <Clock size={14} />
                {packageData.duration}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="reviews-page-main">
        <section className="reviews-overview-section">
          <div className="reviews-overview-grid">
            <div className="reviews-big-rating">
              <div className="reviews-rating-score">
                <span className="reviews-score-number">{avgRating}</span>
                <span className="reviews-score-label">{ratingLabel}</span>
              </div>
              <div className="reviews-score-stars">
                {renderStars(parseFloat(avgRating), 24)}
              </div>
              <p className="reviews-score-count">
                Based on {totalReviews} verified review{totalReviews !== 1 ? 's' : ''}
              </p>
              {myReviewsCount > 0 && (
                <span className="reviews-my-badge">
                  {myReviewsCount} by you
                </span>
              )}
            </div>

            <div className="reviews-distribution">
              <h3 className="reviews-section-title">Rating Breakdown</h3>
              <div className="reviews-bars">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="reviews-bar-row">
                    <span className="reviews-bar-label">{star}</span>
                    <Star size={12} fill="#9ca3af" color="#9ca3af" />
                    <div className="reviews-bar-track">
                      <div 
                        className="reviews-bar-fill"
                        style={{ 
                          width: totalReviews > 0 ? `${(distribution[star] / totalReviews) * 100}%` : '0%' 
                        }}
                      />
                    </div>
                    <span className="reviews-bar-count">{distribution[star]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {submitSuccess && (
          <div className="reviews-alert reviews-alert-success">
            <ThumbsUp size={20} />
            <div className="reviews-alert-content">
              <strong>Review Posted!</strong>
              <span>Thank you, {currentUser.name}! Your review has been shared.</span>
            </div>
          </div>
        )}

        {deleteSuccess && (
          <div className="reviews-alert reviews-alert-delete">
            <Trash2 size={20} />
            <div className="reviews-alert-content">
              <strong>Review Deleted</strong>
              <span>Your review has been removed successfully.</span>
            </div>
          </div>
        )}

        <section className="reviews-write-section">
          {!showReviewForm ? (
            <div className="reviews-write-cta">
              <div className="reviews-cta-content">
                <h3 className="reviews-cta-title">Share your experience</h3>
                <p className="reviews-cta-text">
                  {isAuthenticated
                    ? `Posting as ${currentUser.name} — help others with your honest opinion!`
                    : 'Please log in to post a review.'}
                </p>
              </div>
              <button 
                className="reviews-cta-btn"
                onClick={() => {
                  if (!isAuthenticated) { setNotLoggedInError(true); return; }
                  setNotLoggedInError(false);
                  setShowReviewForm(true);
                }}
              >
                <MessageCircle size={18} />
                Write a Review
              </button>
            </div>
          ) : (
            <form className="reviews-form" onSubmit={handleSubmit}>
              <div className="reviews-form-header">
                <h3 className="reviews-form-title">Write Your Review</h3>
                <button 
                  type="button"
                  className="reviews-form-close"
                  onClick={() => setShowReviewForm(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="reviews-form-user">
                <div className="reviews-form-avatar" style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {currentUser.avatar
                    ? <img src={currentUser.avatar} alt={currentUser.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                        onError={e => { e.target.style.display = 'none'; }} />
                    : currentUser.initial}
                </div>
                <div className="reviews-form-user-info">
                  <span className="reviews-form-username">{currentUser.name}</span>  {/* ✅ real name */}
                  <span className="reviews-form-verified">
                    <Shield size={12} />
                    Verified Traveler
                  </span>
                </div>
              </div>

              <div className="reviews-form-group">
                <label className="reviews-form-label">Your Rating</label>
                <div className="reviews-rating-input">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      className={`reviews-rating-star ${newReview.rating >= rating ? 'active' : ''}`}
                      onClick={() => setNewReview({...newReview, rating})}
                    >
                      <Star 
                        size={32} 
                        fill={newReview.rating >= rating ? '#fbbf24' : 'none'} 
                        color={newReview.rating >= rating ? '#fbbf24' : '#d1d5db'}
                      />
                    </button>
                  ))}
                  <span className="reviews-rating-text">
                    {getRatingLabel(newReview.rating)}
                  </span>
                </div>
              </div>

              <div className="reviews-form-group">
                <label className="reviews-form-label" htmlFor="comment">
                  Your Review <span className="reviews-required">*</span>
                </label>
                <textarea
                  id="comment"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  placeholder="Tell us about your experience. What did you like? What could be improved? Your feedback helps other travelers make better decisions."
                  rows={5}
                  className={formErrors.comment ? 'error' : ''}
                />
                {formErrors.comment && (
                  <span className="reviews-error">{formErrors.comment}</span>
                )}
                <span className="reviews-hint">Minimum 10 characters required</span>
              </div>

              <div className="reviews-form-actions">
                <button 
                  type="button" 
                  className="reviews-btn-secondary"
                  onClick={() => setShowReviewForm(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="reviews-btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="reviews-loading">Posting...</span>
                  ) : (
                    <>
                      <Send size={18} />
                      Post Review
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </section>

        {/* ✅ Login required banner */}
        {notLoggedInError && (
          <div className="reviews-alert reviews-alert-delete" style={{ margin: '0 0 16px 0' }}>
            <AlertCircle size={20} />
            <div className="reviews-alert-content">
              <strong>Login Required</strong>
              <span>Please log in to post a review. Your identity will be verified automatically.</span>
            </div>
          </div>
        )}

        <section className="reviews-list-section">
          <div className="reviews-list-header">
            <h2 className="reviews-list-title">
              Traveler Reviews
              <span className="reviews-count-badge">{totalReviews}</span>
            </h2>
          </div>

          {reviews.length === 0 ? (
            <div className="reviews-empty-state">
              <div className="reviews-empty-icon">
                <MessageCircle size={48} />
              </div>
              <h3 className="reviews-empty-title">No reviews yet</h3>
              <p className="reviews-empty-text">
                Be the first to share your experience with this package!
              </p>
            </div>
          ) : (
            <div className="reviews-grid">
              {reviews.map((review) => {
                const isOwner = isReviewOwner(review);
                
                return (
                  <article 
                    key={review.id} 
                    className={`review-card ${isOwner ? 'review-card-owned' : ''}`}
                  >
                    <div className="review-card-header">
                      <div className="reviewer-profile">
                        <div className={`reviewer-avatar ${isOwner ? 'reviewer-avatar-owned' : ''}`}
                          style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {review.reviewerAvatar
                            ? <img src={review.reviewerAvatar} alt={review.reviewerName || ''}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                                onError={e => { e.target.style.display = 'none'; }} />
                            : (review.reviewerName || 'Anonymous').charAt(0).toUpperCase()}
                        </div>
                        <div className="reviewer-info">
                          <div className="reviewer-name-row">
                            <h4 className="reviewer-name">
                              {review.reviewerName}
                            </h4>
                            {isOwner && (
                              <span className="reviewer-you-badge">
                                You
                              </span>
                            )}
                          </div>
                          <div className="reviewer-meta">
                            <span className="review-date">
                              <Calendar size={12} />
                              {new Date(review.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                            {review.isUserReview && !isOwner && (
                              <span className="review-verified-badge">
                                <Shield size={10} />
                                Verified
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="review-header-actions">
                        <div className="review-rating-badge">
                          <span className="review-rating-number">{review.rating}</span>
                          <div className="review-rating-stars">
                            {renderStars(review.rating, 12)}
                          </div>
                        </div>

                        {isOwner && (
                          <div className="review-menu" ref={dropdownRef}>
                            <button 
                              className="review-menu-btn"
                              onClick={() => toggleDropdown(review.id)}
                              aria-label="Review options"
                            >
                              <MoreVertical size={18} />
                            </button>
                            
                            {activeDropdown === review.id && (
                              <div className="review-menu-dropdown">
                                <button 
                                  className="review-menu-item review-menu-delete"
                                  onClick={() => handleDeleteReview(review.id)}
                                >
                                  <Trash2 size={16} />
                                  <span>Delete Review</span>
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="review-content">
                      <p className="review-text">{review.comment}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ReviewsModal;

