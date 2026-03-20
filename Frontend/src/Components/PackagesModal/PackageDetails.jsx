import { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './PackageDetails.css';
import { packagesData } from "../../data/packagesData";
import ReviewsModal from '../../Components/PackagesModal/ReviewsModal';
import BookingModal from '../../Components/PackagesModal/BookingModal';
import { useLiked } from '../LikedCart/LikedContext';
import { usePackageReviews } from '../../data/usePackageReviews'; // Import the hook
import { useAuth } from '../../context/AuthContext';
import LoginPromptModal from '../Common/LoginPromptModal';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  CheckCircle, 
  Phone, 
  Mail, 
  Share2, 
  Heart,
  Mountain,
  Camera,
  Utensils,
  Car,
  Bed,
  Sun,
  Thermometer,
  Tag,
  X,
  ChevronRight,
  MessageCircle,
  ShoppingCart 
} from 'lucide-react';

function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
   const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { isAuthenticated } = useAuth();
  const [isLoginPrompt, setIsLoginPrompt] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  // Find the package by ID
  const packageData = useMemo(() => {
    return packagesData.find(pkg => pkg.id === parseInt(id));
  }, [id]);
   // Use the liked context
  // Use the liked context
  const { isLiked, toggleLiked } = useLiked();
  const liked = isLiked(packageData?.id, 'package');

  // DEFINE isInCart HERE - BEFORE any function uses it
  const isInCart = isLiked(packageData?.id, 'package');

  // ADD TO CART functionality with cool toast
  // ADD TO CART functionality - ONLY ADDS, never removes
  const handleAddToCart = useCallback(() => {
  // ✅ Check login first
  if (!isAuthenticated) {
  setShowLoginPrompt(true);
  return;
}
setIsLoginPrompt(false);  // ✅ add this before toggleLiked

  // If already in cart, just show toast but don't remove
  if (isInCart) {
    setToastMessage('Already in your cart!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    return;
  }

  // Add to cart
  const packageItem = {
    id: packageData.id,
    type: 'package',
    name: packageData.title,
    location: packageData.location,
    price: packageData.price,
    originalPrice: packageData.originalPrice,
    image: packageData.image,
    description: packageData.description,
    rating: packageData.rating,
    duration: packageData.duration,
    category: packageData.category,
    groupSize: packageData.groupSize,
    highlights: packageData.highlights?.slice(0, 3),
    inclusions: packageData.inclusions,
    exclusions: packageData.exclusions,
    itinerary: packageData.itinerary,
  };
  toggleLiked(packageItem);

  setToastMessage('Added to cart successfully!');
  setShowToast(true);
  setTimeout(() => setShowToast(false), 3000);
}, [packageData, toggleLiked, isInCart, isAuthenticated]); // ✅ add isAuthenticated
  

  // USE THE CUSTOM HOOK - This ensures sync with ReviewsModal
  const {
    reviews: packageReviews,
    averageRating,
    totalCount,
    refreshReviews
  } = usePackageReviews(
    packageData?.id,
    packageData?.reviews || []
  );

  // Handle resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle case where package is not found
  useEffect(() => {
    if (!packageData) {
      navigate('/packagess', { replace: true });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [packageData, navigate]);

  if (!packageData) return null;

  const discount = Math.round(((packageData.originalPrice - packageData.price) / packageData.originalPrice) * 100);

  // Get related packages
  const relatedPackages = useMemo(() => {
    return packagesData
      .filter(pkg => pkg.category === packageData.category && pkg.id !== packageData.id)
      .slice(0, 3);
  }, [packageData]);

 const handleShare = async () => {
  const shareData = {
    title: packageData.title,
    text: `Check out this amazing ${packageData.duration} trip to ${packageData.location || 'Shimla'}!`,
    url: window.location.href,
  };

  // Check if Web Share API is supported (mainly mobile)
  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      // Share successful
      return;
    } catch (err) {
      // User cancelled or share failed - don't show error, just fall through to clipboard
      console.log('Share cancelled or failed:', err);
    }
  }

  // Fallback: Copy to clipboard (works on all devices)
  try {
    await navigator.clipboard.writeText(window.location.href);
    setShowShareTooltip(true);
    setTimeout(() => setShowShareTooltip(false), 2000);
  } catch (err) {
    // If clipboard fails, try the older method
    const textArea = document.createElement("textarea");
    textArea.value = window.location.href;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
    pkgd-hero-action
    document.body.removeChild(textArea);
  }
};

  const handleBookNow = () => {
    setIsBookingOpen(true);
  };

  const handleOpenReviews = () => {
    setIsReviewsOpen(true);
  };

  // This is now handled by the custom hook via events
  const handleReviewSubmitted = () => {
    // Refresh is automatic via custom event, but we can force it if needed
    refreshReviews();
  };

  // Handle modal close - ensure we refresh to get latest data
  const handleReviewsClose = () => {
    setIsReviewsOpen(false);
    refreshReviews(); // Ensure we have latest data when closing modal
  };

  // Handle like toggle
  const handleToggleLike = useCallback(() => {
    if (!isAuthenticated) {
  setShowLoginPrompt(true);
  return;
}
    const packageItem = {
      id: packageData.id,
      type: 'package',
      name: packageData.title,
      location: packageData.location,
      price: packageData.price,
      originalPrice: packageData.originalPrice,
      image: packageData.image,
      description: packageData.description,
      rating: packageData.rating,
      duration: packageData.duration,
      highlights: packageData.highlights?.slice(0, 3),
    };
    toggleLiked(packageItem);
  }, [packageData, toggleLiked]);

  // Render stars helper
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < Math.floor(rating) ? '#fbbf24' : 'none'}
        color={i < Math.floor(rating) ? '#fbbf24' : '#d1d5db'}
      />
    ));
  };

  // Get top 3 reviews for preview
  const topReviews = packageReviews.slice(0, 3);

  // Use itinerary from data or generate fallback
  const itineraryDays = packageData.itinerary || [];


  
  return (
    <div className="pkgd-page">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
      
      {/* Hero Section - REDESIGNED */}
      <section className="pkgd-hero">
        
        <div className="pkgd-hero-bg">
          <img 
            src={packageData.image} 
            alt={packageData.title} 
            className="pkgd-hero-img" 
          />
          <div className="pkgd-hero-gradient"></div>
          <div className="pkgd-hero-vignette"></div>
        </div>

        <div className="pkgd-hero-nav">
          <div className="pkgd-hero-nav-content">
            <button onClick={() => navigate(-1)} className="pkgd-hero-back">
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            
            <div className="pkgd-hero-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/packagess">Packages</Link>
              <span>/</span>
              <span className="pkgd-hero-current">{packageData.title}</span>
            </div>

            <div className="pkgd-hero-actions">
                                          <button 
                className={`pkgd-hero-action pkgd-cart-btn ${isInCart ? 'pkgd-in-cart' : ''}`} 
                onClick={handleAddToCart}
                aria-label="Add to cart"
                title={isInCart ? "Already in cart" : "Add to cart"}
                disabled={isInCart}
              >
                <ShoppingCart size={22} fill={isInCart ? "#10b981" : "none"} color={isInCart ? "#10b981" : "#fff"} />
                {isInCart && <span className="pkgd-cart-indicator">✓</span>}
              </button>
              
              <button 
                className={`pkgd-hero-action ${liked ? 'pkgd-liked' : ''}`} 
                onClick={handleToggleLike}
                aria-label="Like package"
              >
                <Heart size={22} fill={liked ? "#ef4444" : "none"} color={liked ? "#ef4444" : "#fff"} />
              </button>
              <button 
  className="pkgd-hero-action" 
  onClick={handleShare} 
  aria-label="Share package"
  style={{ 
    position: 'relative',
    WebkitTapHighlightColor: 'transparent',
    touchAction: 'manipulation'
  }}
>
  <Share2 size={22} />
  {showShareTooltip && (
    <span className="pkgd-share-tooltip" style={{
      position: 'absolute',
      top: '120%',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#1f2937',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: '8px',
      fontSize: '13px',
      fontWeight: '500',
      whiteSpace: 'nowrap',
      zIndex: 100,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      animation: 'fadeIn 0.2s ease'
    }}>
      Link copied!
    </span>
  )}
</button>
            </div>
          </div>
        </div>

        <div className="pkgd-hero-wrapper">
          <div className="pkgd-hero-main">
            <div className="pkgd-hero-badges">
              {discount > 0 && (
                <span className="pkgd-badge-discount">
                  <span className="pkgd-discount-pulse"></span>
                  Save {discount}%
                </span>
              )}
              <span className="pkgd-badge-cat">{packageData.category}</span>
              {parseFloat(averageRating) > 0 && (
                <div className="pkgd-badge-rating">
                  <Star size={14} fill="#fbbf24" color="#fbbf24" />
                  <span>{averageRating}</span>
                  <small>({totalCount} reviews)</small>
                </div>
              )}
            </div>

            <h1 className="pkgd-hero-title">{packageData.title}</h1>
            <p className="pkgd-hero-desc">{packageData.description}</p>

            <div className="pkgd-hero-stats">
              <div className="pkgd-stat-card">
                <div className="pkgd-stat-icon">
                  <Clock size={24} />
                </div>
                <div className="pkgd-stat-info">
                  <span className="pkgd-stat-label">Duration</span>
                  <span className="pkgd-stat-val">{packageData.duration}</span>
                </div>
              </div>

              <div className="pkgd-stat-card">
                <div className="pkgd-stat-icon">
                  <MapPin size={24} />
                </div>
                <div className="pkgd-stat-info">
                  <span className="pkgd-stat-label">Location</span>
                  <span className="pkgd-stat-val">{packageData.location || 'Shimla, HP'}</span>
                </div>
              </div>

              <div className="pkgd-stat-card">
                <div className="pkgd-stat-icon">
                  <Users size={24} />
                </div>
                <div className="pkgd-stat-info">
                  <span className="pkgd-stat-label">Group Size</span>
                  <span className="pkgd-stat-val">{packageData.groupSize || '2-12 People'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!isMobile && (
          <div className="pkgd-scroll-ind">
            <div className="pkgd-mouse">
              <div className="pkgd-wheel"></div>
            </div>
            <span>Scroll to explore</span>
          </div>
        )}
      </section>

      <main className="pkgd-main">
        <div className="pkgd-container">
          <div className="pkgd-content">
            <div className="pkgd-content-header">
              <h1 className="pkgd-title">{packageData.title}</h1>
              <p className="pkgd-subtitle">{packageData.description}</p>
            </div>

            <div className="pkgd-tabs-nav">
              <button 
                className={`pkgd-tab-btn ${activeTab === 'overview' ? 'pkgd-active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`pkgd-tab-btn ${activeTab === 'itinerary' ? 'pkgd-active' : ''}`}
                onClick={() => setActiveTab('itinerary')}
              >
                Itinerary
              </button>
              <button 
                className={`pkgd-tab-btn ${activeTab === 'inclusions' ? 'pkgd-active' : ''}`}
                onClick={() => setActiveTab('inclusions')}
              >
                Inclusions
              </button>
              <button 
                className={`pkgd-tab-btn ${activeTab === 'reviews' ? 'pkgd-active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({totalCount})
              </button>
            </div>

            <div className="pkgd-tab-content">
              {activeTab === 'overview' && (
                <div className="pkgd-tab-panel pkgd-overview">
                  <section className="pkgd-info-sec">
                    <h2>About This Package</h2>
                    <p className="pkgd-desc-text">
                      Experience the best of {packageData.location || 'Shimla'} with our carefully curated 
                      {packageData.duration} package. Perfect for {packageData.category.toLowerCase()} travelers, 
                      this tour combines breathtaking landscapes, cultural experiences, and comfortable accommodations 
                      to create unforgettable memories in the heart of the Himalayas.
                    </p>
                  </section>

                  <section className="pkgd-info-sec">
                    <h2>Highlights</h2>
                    <div className="pkgd-highlights-grid">
                      {packageData.highlights?.map((highlight, index) => (
                        <div key={index} className="pkgd-highlight-card">
                          <div className="pkgd-highlight-icon">
                            {index % 5 === 0 && <Mountain size={24} />}
                            {index % 5 === 1 && <Camera size={24} />}
                            {index % 5 === 2 && <Utensils size={24} />}
                            {index % 5 === 3 && <Car size={24} />}
                            {index % 5 === 4 && <Bed size={24} />}
                          </div>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="pkgd-info-sec">
                    <h2>Best Time to Visit</h2>
                    <div className="pkgd-season-cards">
                      <div className="pkgd-season-card">
                        <Sun size={32} color="#f59e0b" />
                        <h4>Summer</h4>
                        <p>Mar - Jun</p>
                        <small>Perfect for sightseeing</small>
                      </div>
                      <div className="pkgd-season-card">
                        <Thermometer size={32} color="#3b82f6" />
                        <h4>Winter</h4>
                        <p>Oct - Feb</p>
                        <small>Snow activities & skiing</small>
                      </div>
                      <div className="pkgd-season-card">
                        <Mountain size={32} color="#10b981" />
                        <h4>Monsoon</h4>
                        <p>Jul - Sep</p>
                        <small>Lush green landscapes</small>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {activeTab === 'itinerary' && (
                <div className="pkgd-tab-panel pkgd-itinerary">
                  <div className="pkgd-itin-header">
                    <h2>Tour Itinerary</h2>
                    <span className="pkgd-itin-subtitle">
                      {itineraryDays.length} Days of Adventure
                    </span>
                  </div>
                  
                  <div className="pkgd-itin-timeline">
                    {itineraryDays.map((day, index) => (
                      <div key={index} className="pkgd-itin-day">
                        <div className="pkgd-itin-marker">
                          <span className="pkgd-day-num">Day {day.day}</span>
                          <div className="pkgd-day-dot"></div>
                        </div>
                        
                        <div className="pkgd-itin-content">
                          <div className="pkgd-day-header">
                            <h4>{day.title}</h4>
                            {index === 0 && <span className="pkgd-day-badge pkgd-start">Start</span>}
                            {index === itineraryDays.length - 1 && <span className="pkgd-day-badge pkgd-end">End</span>}
                          </div>
                          
                          <p className="pkgd-day-desc">{day.description}</p>
                          
                          <div className="pkgd-day-tags">
                            {day.tags?.map((tag, tagIndex) => (
                              <span key={tagIndex} className="pkgd-day-tag">
                                <Tag size={10} />
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'inclusions' && (
                <div className="pkgd-tab-panel pkgd-inclusions">
                  <h2>What's Included</h2>
                  <div className="pkgd-incl-grid">
                    {packageData.inclusions?.map((item, index) => (
                      <div key={index} className="pkgd-incl-item pkgd-included">
                        <CheckCircle size={20} color="#10b981" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <h2 style={{ marginTop: '32px' }}>Not Included</h2>
                  <div className="pkgd-incl-grid">
                    {packageData.exclusions?.map((item, index) => (
                      <div key={index} className="pkgd-incl-item pkgd-not-incl">
                        <X size={20} color="#ef4444" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="pkgd-tab-panel pkgd-reviews">
                  <div className="pkgd-reviews-sum">
                    <div className="pkgd-rating-big">
                      <span className="pkgd-rating-num">{averageRating}</span>
                      <div className="pkgd-rating-stars">
                        {renderStars(parseFloat(averageRating))}
                      </div>
                      <span className="pkgd-total-reviews">Based on {totalCount} reviews</span>
                    </div>
                  </div>
                  
                  <div className="pkgd-review-list">
                    {topReviews.length > 0 ? (
                      topReviews.map((review, index) => (
                        <div key={review.id || index} className={`pkgd-review-card ${review.isUserReview ? 'user-review' : ''}`}>
                          <div className="pkgd-review-header">
                            <div className="pkgd-reviewer-avatar">
                              {review.reviewerAvatar || review.avatar || review.image
                                ? <img
                                    src={review.reviewerAvatar || review.avatar || review.image}
                                    alt={review.reviewerName || review.user || ''}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                                    onError={e => { e.target.style.display = 'none'; }}
                                  />
                                : (review.reviewerName || review.user || 'U').charAt(0).toUpperCase()}
                            </div>
                            <div className="pkgd-reviewer-info">
                              <h4>{review.reviewerName || review.user || 'Anonymous'}</h4>
                              <span className="pkgd-review-date">{review.date}</span>
                            </div>
                            <div className="pkgd-review-rating">
                              <Star size={14} fill="#fbbf24" color="#fbbf24" />
                              <span>{review.rating}</span>
                            </div>
                          </div>
                          <p className="pkgd-review-text">{review.comment}</p>
                        </div>
                      ))
                    ) : (
                      <div className="pkgd-no-reviews">
                        <MessageCircle size={48} />
                        <p>No reviews yet. Be the first to review!</p>
                      </div>
                    )}
                  </div>

                  {/* UPDATED: Button shows correct synced count */}
                  {totalCount > 3 && (
                    <button 
                      className="pkgd-see-more-reviews"
                      onClick={handleOpenReviews}
                    >
                      <span>See All {totalCount} Reviews</span>
                      <ChevronRight size={20} />
                    </button>
                  )}

                  <button 
                    className="pkgd-write-review-btn"
                    onClick={handleOpenReviews}
                  >
                    <MessageCircle size={18} />
                    <span>Write a Review</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <aside className="pkgd-booking-sidebar">
            <div className="pkgd-booking-card" data-price={`₹${packageData.price.toLocaleString('en-IN')}`}>
              <div className="pkgd-booking-header">
                <span className="pkgd-price-from">From</span>
                <div className="pkgd-price-row">
                  <span className="pkgd-price-main">₹{packageData.price.toLocaleString('en-IN')}</span>
                  {packageData.originalPrice > packageData.price && (
                    <span className="pkgd-price-strike">₹{packageData.originalPrice.toLocaleString('en-IN')}</span>
                  )}
                </div>
                <span className="pkgd-price-per">per person</span>
                {discount > 0 && (
                  <span className="pkgd-save-badge">Save ₹{(packageData.originalPrice - packageData.price).toLocaleString('en-IN')}</span>
                )}
              </div>

              <div className="pkgd-booking-features">
                <div className="pkgd-feature-item">
                  <Calendar size={18} />
                  <span>Free cancellation up to 24h before</span>
                </div>
                <div className="pkgd-feature-item">
                  <CheckCircle size={18} />
                  <span>Instant confirmation</span>
                </div>
                <div className="pkgd-feature-item">
                  <Users size={18} />
                  <span>Small group experience</span>
                </div>
              </div>

             {/* Mobile-Optimized Button Group */}
              <div className="pkgd-mobile-btn-group">
                <button 
                  className={`pkgd-cart-btn-main ${isInCart ? 'pkgd-added' : ''}`} 
                  onClick={handleAddToCart}
                  disabled={isInCart}
                >
                  <div className="pkgd-btn-icon">
                    <ShoppingCart size={20} />
                    {isInCart && <span className="pkgd-btn-check"><CheckCircle size={14} /></span>}
                  </div>
                  <span className="pkgd-btn-text">{isInCart ? 'In Cart' : 'Add to Cart'}</span>
                </button>
                
                <button className="pkgd-book-btn-lg" onClick={handleBookNow}>
                  <span className="pkgd-btn-text">Book Now</span>
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="pkgd-contact-opts">
                <p className="pkgd-contact-text">Need help? Contact us</p>
                <div className="pkgd-contact-btns">
                  <a href="tel:+911234567890" className="pkgd-contact-btn pkgd-phone">
                    <Phone size={18} />
                    <span>Call</span>
                  </a>
                  <a href="mailto:info@shimlatravels.com" className="pkgd-contact-btn pkgd-email">
                    <Mail size={18} />
                    <span>Email</span>
                  </a>
                </div>
              </div>

              <div className="pkgd-secure-badge">
                <CheckCircle size={16} />
                <span>Secure booking • Best price guarantee</span>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {relatedPackages.length > 0 && (
        <section className="pkgd-related">
          <div className="pkgd-related-container">
            <h2 className="pkgd-related-title">Similar {packageData.category} Packages</h2>
            <div className="pkgd-related-grid">
              {relatedPackages.map((pkg) => (
                <Link to={`/package/${pkg.id}`} key={pkg.id} className="pkgd-related-card">
                  <div className="pkgd-related-img-wrap">
                    <img src={pkg.image} alt={pkg.title} />
                    <span className="pkgd-related-cat">{pkg.category}</span>
                  </div>
                  <div className="pkgd-related-content">
                    <h3>{pkg.title}</h3>
                    <div className="pkgd-related-meta">
                      <span><Clock size={14} /> {pkg.duration}</span>
                      <span className="pkgd-related-price">₹{pkg.price.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* UPDATED: Pass sync props to ReviewsModal */}
      <ReviewsModal
        isOpen={isReviewsOpen}
        onClose={handleReviewsClose}
        packageData={packageData}
        onReviewChange={handleReviewSubmitted} // Callback for any review change
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        packageData={packageData}
      />
      {/* Cool Toast Notification */}
      {showToast && (
  <div className="pkgd-toast-container">
    <div className={`pkgd-toast ${showToast ? 'pkgd-toast-show' : ''}`}>
      <div className="pkgd-toast-icon">
        {isLoginPrompt 
          ? <span style={{fontSize:'22px'}}>🔒</span>
          : isInCart 
            ? <CheckCircle size={24} color="#10b981" /> 
            : <ShoppingCart size={24} color="#fff" />
        }
      </div>
      <div className="pkgd-toast-content">
        <span className="pkgd-toast-title">{toastMessage}</span>
        <span className="pkgd-toast-subtitle">
          {isLoginPrompt 
            ? 'Save your favorite packages' 
            : isInCart 
              ? 'View your cart to book' 
              : 'Proceed to checkout anytime'
          }
        </span>
      </div>
      {isLoginPrompt ? (
        // ✅ Show Login/Signup buttons instead of View Cart
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            className="pkgd-toast-action"
            onClick={() => { navigate('/login'); setShowToast(false); }}
          >
            Login
          </button>
          <button
            className="pkgd-toast-action"
            style={{ background: '#059669' }}
            onClick={() => { navigate('/signup'); setShowToast(false); }}
          >
            Signup
          </button>
        </div>
      ) : (
        <button
          className="pkgd-toast-action"
          onClick={() => { navigate('/favorites'); setShowToast(false); }}
        >
          View Cart
        </button>
      )}
      <button className="pkgd-toast-close" onClick={() => setShowToast(false)}>
        <X size={18} />
      </button>
      <div className="pkgd-toast-progress"></div>
    </div>
  </div>
)}
<LoginPromptModal
  isOpen={showLoginPrompt}
  onClose={() => setShowLoginPrompt(false)}
  message="Login or create a free account to save packages to your cart."
/>
    </div>
  );
}

export default PackageDetails;