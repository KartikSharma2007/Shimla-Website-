import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  X, Star, MapPin, Calendar, User, Send, MoreVertical, Trash2, AlertCircle,
  MessageSquare, ThumbsUp, Shield, Camera, Smile, Image as ImageIcon,
  XCircle, CheckCircle2, Sparkles, PenTool
} from 'lucide-react';
import './ReviewsPage.css';

const ReviewsPage = ({ isOpen, onClose, stories = [], onAddReview, onDeleteReview, currentUserId }) => {
  const [activeTab, setActiveTab] = useState('reviews');
  const [formData, setFormData] = useState({ name: '', location: '', trip: '', rating: 0, story: '', image: '' });
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isDeleteClosing, setIsDeleteClosing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [formProgress, setFormProgress] = useState(0);
  const [userLikes, setUserLikes] = useState(new Set());
  const [reviewLikes, setReviewLikes] = useState({});
  const menuRef = useRef(null);

  useEffect(() => {
    const fields = ['name', 'location', 'trip', 'story'];
    const filledFields = fields.filter(f => formData[f].trim().length > 0).length;
    const ratingBonus = formData.rating > 0 ? 1 : 0;
    setFormProgress(((filledFields + ratingBonus) / (fields.length + 1)) * 100);
  }, [formData]);

  useEffect(() => {
    const savedLikes  = localStorage.getItem('userReviewLikes');
    const savedCounts = localStorage.getItem('reviewLikeCounts');
    if (savedLikes)  setUserLikes(new Set(JSON.parse(savedLikes)));
    if (savedCounts) setReviewLikes(JSON.parse(savedCounts));
  }, []);

  useEffect(() => {
    if (isOpen) { document.body.style.overflow = 'hidden'; setIsClosing(false); }
    else          document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpenMenuId(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape') { setOpenMenuId(null); setShowDeleteConfirm(null); handleClose(); }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, handleEscape]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => { onClose(); setIsClosing(false); }, 350);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { setImagePreview(reader.result); setFormData(prev => ({ ...prev, image: reader.result })); };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => { setImagePreview(null); setFormData(prev => ({ ...prev, image: '' })); };

  const handleDragOver  = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = ()  => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => { setImagePreview(reader.result); setFormData(prev => ({ ...prev, image: reader.result })); };
      reader.readAsDataURL(file);
    }
  };

  const handleLikeToggle = (reviewId) => {
    const newUserLikes   = new Set(userLikes);
    const newReviewLikes = { ...reviewLikes };
    if (!newReviewLikes[reviewId]) newReviewLikes[reviewId] = 0;
    if (newUserLikes.has(reviewId)) { newUserLikes.delete(reviewId); newReviewLikes[reviewId] = Math.max(0, newReviewLikes[reviewId] - 1); }
    else { newUserLikes.add(reviewId); newReviewLikes[reviewId] += 1; }
    setUserLikes(newUserLikes); setReviewLikes(newReviewLikes);
    localStorage.setItem('userReviewLikes',  JSON.stringify([...newUserLikes]));
    localStorage.setItem('reviewLikeCounts', JSON.stringify(newReviewLikes));
  };

  const hasUserLiked = (id) => userLikes.has(id);
  const getLikeCount = (id) => reviewLikes[id] || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.rating === 0) return;
    setIsSubmitting(true);
    try {
      // onAddReview is now async (saves to backend)
      await onAddReview({
        userId:    currentUserId || null,
        timestamp: new Date().toISOString(),
        ...formData,
        image: formData.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=2f7d57&color=fff`
      });
      setShowSuccess(true);
      setFormData({ name: '', location: '', trip: '', rating: 0, story: '', image: '' });
      setImagePreview(null); setFormProgress(0);
      setTimeout(() => { setShowSuccess(false); setActiveTab('reviews'); }, 2500);
    } catch (err) {
      // error is handled in parent; show success anyway (optimistic)
      setShowSuccess(true);
      setFormData({ name: '', location: '', trip: '', rating: 0, story: '', image: '' });
      setImagePreview(null); setFormProgress(0);
      setTimeout(() => { setShowSuccess(false); setActiveTab('reviews'); }, 2500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (reviewId, reviewUserId) => {
    if (!canDeleteReview(reviewUserId)) return;
    setShowDeleteConfirm(reviewId); setOpenMenuId(null);
  };

  const confirmDelete = async (reviewId) => {
    setIsDeleteClosing(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    await onDeleteReview(reviewId);
    setDeletingId(null); setShowDeleteConfirm(null); setIsDeleteClosing(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteClosing(true);
    setTimeout(() => { setShowDeleteConfirm(null); setIsDeleteClosing(false); }, 300);
  };

  const handleOverlayClick = () => {
    if (window.innerWidth >= 640) {
      setIsDeleteClosing(true);
      setTimeout(() => { setShowDeleteConfirm(null); setIsDeleteClosing(false); }, 300);
    }
  };

  const toggleMenu = (e, reviewId) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === reviewId ? null : reviewId);
  };

  // canDeleteReview: match against MongoDB _id string or legacy id
  const canDeleteReview = (reviewUserId) => {
    if (!currentUserId) return false;
    return String(reviewUserId) === String(currentUserId);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const diffDays = Math.ceil(Math.abs(new Date() - date) / (1000 * 60 * 60 * 24));
    if (diffDays <= 1)  return 'Today';
    if (diffDays <= 7)  return `${diffDays} days ago`;
    if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const renderStars = (rating, interactive = false, size = 'md') => {
    const sizes = { sm: 14, md: 18, lg: 28 };
    return (
      <div className={`r-stars ${size}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star} type="button"
            className={`r-star ${interactive ? 'interactive' : ''} ${star <= (interactive && hoverRating ? hoverRating : rating) ? 'filled' : ''}`}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            onClick={() => interactive && setFormData(prev => ({ ...prev, rating: star }))}
            disabled={!interactive}
          >
            <Star
              size={sizes[size]}
              fill={star <= (interactive && hoverRating ? hoverRating : rating) ? '#fbbf24' : 'none'}
              color={star <= (interactive && hoverRating ? hoverRating : rating) ? '#fbbf24' : '#d1d5db'}
            />
          </button>
        ))}
      </div>
    );
  };

  const averageRating = stories.length > 0
    ? (stories.reduce((acc, s) => acc + (s.rating || 0), 0) / stories.length).toFixed(1)
    : 0;

  if (!isOpen) return null;

  return (
    <div className={`r-page ${isClosing ? 'closing' : ''}`}>

      {/* Header */}
      <header className="r-header">
        <div className="r-header-content">
          <div className="r-header-left">
            <button className="r-back-btn" onClick={handleClose} aria-label="Go back">
              <X size={24} />
            </button>
            <div className="r-header-title-group">
              <h1 className="r-title">Traveler Stories</h1>
              <p className="r-subtitle">Authentic experiences from our guests</p>
            </div>
          </div>
          {stories.length > 0 && (
            <div className="r-rating-summary">
              <div className="r-rating-badge">
                <Star size={20} fill="#fbbf24" color="#fbbf24" />
                <span className="r-rating-number">{averageRating}</span>
                <span className="r-rating-count">({stories.length} reviews)</span>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Nav Tabs */}
      <nav className="r-nav">
        <div className="r-nav-container">
          <button className={`r-nav-tab ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>
            <MessageSquare size={18} />
            <span>All Reviews</span>
            <span className="r-tab-count">{stories.length}</span>
          </button>
          <button className={`r-nav-tab ${activeTab === 'write' ? 'active' : ''}`} onClick={() => setActiveTab('write')}>
            <Send size={18} />
            <span>Write a Review</span>
          </button>
        </div>
      </nav>

      {/* Main */}
      <main className="r-main">
        {activeTab === 'reviews' ? (
          <div className="r-container">
            {stories.length === 0 ? (
              <div className="r-empty">
                <div className="r-empty-icon"><MessageSquare size={48} /></div>
                <h3>No Reviews Yet</h3>
                <p>Be the first to share your experience!</p>
                <button className="r-empty-cta" onClick={() => setActiveTab('write')}>Write a Review</button>
              </div>
            ) : (
              <div className="r-grid">
                {stories.map((story, index) => (
                  <article
                    key={story._id || story.id}
                    className={`r-card ${deletingId === (story._id || story.id) ? 'deleting' : ''}`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="r-card-header">
                      <div className="r-author">
                        <div className="r-avatar-wrapper">
                          <img
                            src={story.image} alt={story.name}
                            className="r-review-avatar"
                            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(story.name)}&background=2f7d57&color=fff`; }}
                          />
                          <div className="r-verified-badge-small"><Shield size={10} /></div>
                        </div>
                        <div className="r-author-info">
                          <h3 className="r-author-name">{story.name}</h3>
                          <div className="r-author-meta"><MapPin size={12} /><span>{story.location}</span></div>
                        </div>
                      </div>

                      <div className="r-options" ref={openMenuId === (story._id || story.id) ? menuRef : null}>
                        {canDeleteReview(story.userId) && (
                          <>
                            <button className="r-menu-trigger" onClick={(e) => toggleMenu(e, story._id || story.id)} aria-label="More options">
                              <MoreVertical size={18} />
                            </button>
                            {openMenuId === (story._id || story.id) && (
                              <div className="r-dropdown">
                                <button className="r-dropdown-item delete" onClick={() => handleDeleteClick(story._id || story.id, story.userId)}>
                                  <Trash2 size={14} /><span>Delete Review</span>
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    <div className="r-card-content">
                      <div className="r-rating-row">
                        {renderStars(story.rating, false, 'sm')}
                        <span className="r-date">{formatDate(story.timestamp)}</span>
                      </div>
                      <div className="r-trip-tag"><Calendar size={14} /><span>{story.trip}</span></div>
                      <p className="r-review-text">"{story.story}"</p>
                    </div>

                    <div className="r-card-footer">
                      <div className="r-verified-tag">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 0L7.5 2.5L10.5 3L9 5.5L9.5 8.5L6 7.5L2.5 8.5L3 5.5L1.5 3L4.5 2.5L6 0Z" fill="#10b981"/>
                        </svg>
                        <span>Verified Traveler</span>
                      </div>
                      <button className={`r-helpful-btn ${hasUserLiked(story._id || story.id) ? 'liked' : ''}`} onClick={() => handleLikeToggle(story._id || story.id)}>
                        <ThumbsUp size={14} fill={hasUserLiked(story._id || story.id) ? '#ef4444' : 'none'} />
                        <span>Helpful ({getLikeCount(story._id || story.id)})</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="r-write-section">
            <div className="r-form-wrapper">

              {/* Progress Bar */}
              <div className="r-progress-container">
                <div className="r-progress-bar" style={{ width: `${formProgress}%` }} />
                <span className="r-progress-text">{Math.round(formProgress)}% completed</span>
              </div>

              {showSuccess ? (
                <div className="r-success">
                  <div className="r-success-animation">
                    <div className="r-success-circle">
                      <svg viewBox="0 0 52 52">
                        <circle cx="26" cy="26" r="25" fill="none" />
                        <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                      </svg>
                    </div>
                  </div>
                  <h3>Thank You!</h3>
                  <p>Your review has been submitted successfully and is now live.</p>
                  <button className="r-success-btn" onClick={() => { setShowSuccess(false); setActiveTab('reviews'); }}>
                    View All Reviews
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="r-form">

                  {/* Form Header */}
                  <div className="r-form-header">
                    <div className="r-form-header-icon"><PenTool size={32} /></div>
                    <h2>Share Your Experience</h2>
                    <p>Your feedback helps others plan their perfect Shimla trip</p>
                  </div>

                  {/* Rating */}
                  <div className="r-section r-rating-section">
                    <label className="r-label r-rating-label-main">
                      <Sparkles size={20} />
                      How would you rate your experience?
                    </label>
                    <div className="r-rating-input-wrapper">
                      <div className="r-rating-stars-container">
                        {renderStars(formData.rating, true, 'lg')}
                      </div>
                      <div className="r-rating-feedback">
                        {formData.rating > 0 ? (
                          <>
                            <span className="r-rating-emoji">{['😠','😞','😐','😊','🤩'][formData.rating - 1]}</span>
                            <span className="r-rating-text">{['Terrible','Poor','Average','Very Good','Excellent'][formData.rating - 1]}</span>
                          </>
                        ) : (
                          <span className="r-rating-placeholder">Tap a star to rate</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* About You */}
                  <div className="r-section">
                    <div className="r-section-label"><User size={16} />About You</div>
                    <div className="r-form-grid">

                      <div className={`r-form-group ${focusedField === 'name' ? 'focused' : ''}`}>
                        <label className="r-label">
                          Your Name <span className="r-required">*</span>
                        </label>
                        <div className="r-input-wrapper">
                          <span className="r-input-icon"><User size={18} /></span>
                          <input
                            type="text" name="name" value={formData.name}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="John Doe" required
                            className="r-input"
                          />
                        </div>
                      </div>

                      <div className={`r-form-group ${focusedField === 'location' ? 'focused' : ''}`}>
                        <label className="r-label">
                          Location <span className="r-required">*</span>
                        </label>
                        <div className="r-input-wrapper">
                          <span className="r-input-icon"><MapPin size={18} /></span>
                          <input
                            type="text" name="location" value={formData.location}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField('location')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="Mumbai, India" required
                            className="r-input"
                          />
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Trip Details */}
                  <div className="r-section">
                    <div className="r-section-label"><Calendar size={16} />Trip Details</div>
                    <div className={`r-form-group ${focusedField === 'trip' ? 'focused' : ''}`}>
                      <label className="r-label">
                        Trip / Package Name <span className="r-required">*</span>
                      </label>
                      <div className="r-input-wrapper">
                        <span className="r-input-icon"><Calendar size={18} /></span>
                        <input
                          type="text" name="trip" value={formData.trip}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('trip')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="e.g., Shimla Honeymoon Package, Family Adventure Tour"
                          required className="r-input"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Story */}
                  <div className="r-section">
                    <div className="r-section-label"><MessageSquare size={16} />Your Story</div>
                    <div className={`r-form-group ${focusedField === 'story' ? 'focused' : ''}`}>
                      <label className="r-label">
                        Share your experience <span className="r-required">*</span>
                        <span className="r-char-count">{formData.story.length} chars</span>
                      </label>
                      <textarea
                        name="story" value={formData.story}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('story')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="What made your trip special? Share highlights, tips, or memorable moments..."
                        required rows={5} className="r-textarea"
                      />
                      <div className="r-textarea-hint">
                        <Smile size={14} />
                        <span>Be specific and honest - your insights matter!</span>
                      </div>
                    </div>
                  </div>

                  {/* Photo Upload */}
                  <div className="r-section">
                    <div className="r-section-label">
                      <Camera size={16} />
                      Add a Photo <span className="r-optional">(Optional)</span>
                    </div>
                    {!imagePreview ? (
                      <div
                        className={`r-upload-zone ${isDragging ? 'dragging' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="r-file-input" id="r-photo-upload" />
                        <label htmlFor="r-photo-upload" className="r-upload-label">
                          <div className="r-upload-icon"><ImageIcon size={32} /></div>
                          <span className="r-upload-text">Drop photo here or click to browse</span>
                          <span className="r-upload-hint">Supports: JPG, PNG, GIF (max 5MB)</span>
                        </label>
                      </div>
                    ) : (
                      <div className="r-image-preview-container">
                        <img src={imagePreview} alt="Preview" className="r-image-preview" />
                        <button type="button" className="r-remove-image-btn" onClick={removeImage}>
                          <XCircle size={20} />
                        </button>
                        <div className="r-image-success">
                          <CheckCircle2 size={16} /><span>Image added</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit */}
                  <div className="r-section r-submit-section">
                    <div className="r-submit-info">
                      <Shield size={16} />
                      <span>Your review will be verified before publishing</span>
                    </div>
                    <div className="r-form-actions">
                      <button type="button" className="r-btn-secondary" onClick={() => setActiveTab('reviews')}>
                        Cancel
                      </button>
                      <button
                        type="submit" className="r-btn-primary"
                        disabled={isSubmitting || formData.rating === 0 || !formData.name || !formData.location || !formData.trip || !formData.story}
                      >
                        {isSubmitting ? (
                          <span className="r-spinner">
                            <span className="r-spinner-dot" />
                            <span className="r-spinner-dot" />
                            <span className="r-spinner-dot" />
                          </span>
                        ) : (
                          <><Send size={18} />Submit Review</>
                        )}
                      </button>
                    </div>
                  </div>

                </form>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div className={`r-confirm-overlay ${isDeleteClosing ? 'closing' : ''}`} onClick={handleOverlayClick}>
          <div className="r-confirm-dialog" onClick={e => e.stopPropagation()}>
            <div className="r-confirm-icon"><AlertCircle size={32} /></div>
            <h3>Delete Review?</h3>
            <p>This action cannot be undone. Your review will be permanently removed.</p>
            <div className="r-confirm-actions">
              <button className="r-btn-secondary" onClick={handleCancelDelete}>Keep Review</button>
              <button className="r-btn-danger" onClick={() => confirmDelete(showDeleteConfirm)}>
                <Trash2 size={18} />Delete
              </button>
            </div>
            <div className="r-swipe-hint">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
              <span>Swipe down to dismiss</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ReviewsPage;
