import React, { useState, useCallback, memo, useEffect } from "react";
import { useLiked } from '../LikedCart/LikedContext';
import { reviewAPI } from '../../services/api';
import HotelReviewSection from './HotelReviewSection';
import { useAuth } from '../../context/AuthContext';
import { Heart, Share2, MapPin, Star, Check, ChevronLeft, ChevronRight, X, Wifi, Car, Coffee, Waves, Dumbbell, Utensils, Snowflake, Tv, Sparkles, Wind, Mountain, Bath, Activity, Users, Phone, Calendar, ArrowLeft, CheckCircle2, Grid3X3, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "./HotelDetailModal.css";
import LoginPromptModal from '../Common/LoginPromptModal';


// Amenity icon mapping
const amenityIcons = {
  "Free WiFi": Wifi, "WiFi": Wifi, "High-Speed Internet": Wifi,
  "Parking": Car, "Free Parking": Car, "Valet Parking": Car, "Airport Shuttle": Car,
  "Breakfast Included": Coffee, "Breakfast": Coffee, "Free Breakfast": Coffee,
  "Restaurant": Utensils, "Fine Dining": Utensils, "Room Service": Utensils,
  "Kitchen": Utensils, "Bar": Utensils, "Mini Bar": Utensils,
  "Heated Pool": Waves, "Swimming Pool": Waves, "Pool": Waves, "Infinity Pool": Waves,
  "Hot Tub": Bath, "Jacuzzi": Bath, "Infinity Jacuzzi": Bath,
  "Spa": Sparkles, "Sauna": Sparkles, "Gym": Dumbbell, "Fitness Center": Dumbbell,
  "Yoga Classes": Activity, "Yoga": Activity, "Meditation": Activity, "Wellness Center": Sparkles,
  "AC": Snowflake, "Air Conditioning": Snowflake, "Heating": Wind, "Fireplace": Wind,
  "TV": Tv, "Smart TV": Tv, "Cable TV": Tv, "Netflix": Tv,
  "Mountain View": Mountain, "Mountain Trails": Mountain, "Garden View": Mountain,
  "Valley View": Mountain, "Lake View": Waves, "Nature Walks": Mountain,
  "Camping": Mountain, "Balcony": Mountain, "Terrace": Mountain,
  "default": Check
};

const AmenityItem = memo(({ amenity }) => {
  const Icon = amenityIcons[amenity] || amenityIcons["default"];
  return (
    <div className="sh-amenity-item">
      <Icon size={18} strokeWidth={1.5} />
      <span>{amenity}</span>
    </div>
  );
});

const RoomCard = memo(({ room, isSelected, onSelect }) => (
  <div className={`sh-room-card ${isSelected ? "sh-selected" : ""}`} onClick={onSelect}>
    <div className="sh-room-info">
      <h4>{room.type}</h4>
      <div className="sh-room-features">
        {room.features.map((f, i) => (
          <span key={i}><CheckCircle2 size={12} /> {f}</span>
        ))}
      </div>
    </div>
    <div className="sh-room-price">
      <span className="sh-price">₹{room.price.toLocaleString()}</span>
      <span className="sh-per-night">per night</span>
    </div>
    {isSelected && <div className="sh-selected-badge"><Check size={14} /> Selected</div>}
  </div>
));

const ImageGallery = ({ images, currentIndex, onIndexChange }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  

  // Ensure we only use first 3 images
  const displayImages = images.slice(0, 3);
  const mainImage = displayImages[0];
  const sideImages = displayImages.slice(1, 3);

  const nextImage = useCallback(() => {
    onIndexChange((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  }, [displayImages.length, onIndexChange]);

  const prevImage = useCallback(() => {
    onIndexChange((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  }, [displayImages.length, onIndexChange]);

  return (
    <>
      <div className="sh-gallery-container">
        {/* Left - Large Main Image */}
        <div className="sh-main-image-box" onClick={() => setShowAllPhotos(true)}>
          <img src={mainImage} alt="Main" />
          <div className="sh-image-hover-overlay">
            <Grid3X3 size={20} />
            <span>Show all photos</span>
          </div>
        </div>

        {/* Right - 2 Stacked Images */}
        <div className="sh-side-images-stack">
          {sideImages.map((img, idx) => (
            <div 
              key={idx} 
              className="sh-side-image-box"
              onClick={() => {
                onIndexChange(idx + 1);
                setShowAllPhotos(true);
              }}
            >
              <img src={img} alt={`View ${idx + 2}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Photo Gallery Modal */}
      {showAllPhotos && (
        <div className="sh-photo-modal">
    <div className="sh-modal-header">
      {/* Close Button - Now more prominent */}
      <button 
        className="sh-close-modal sh-close-photos" 
        onClick={() => setShowAllPhotos(false)}
        aria-label="Close gallery"
      >
        <div className="sh-close-icon-wrap">
          <X size={22} strokeWidth={2.5} />
        </div>
        <span className="sh-close-text">Close</span>
      </button>
      
      <span className="sh-photo-counter">{currentIndex + 1} / {displayImages.length}</span>
      
      {/* Spacer with share button option */}
      <div className="sh-modal-spacer">
        <button 
          className="sh-share-photos-btn"
          onClick={async () => {
            if (navigator.share) {
              try {
                await navigator.share({
                  title: 'Check out this hotel photo',
                  url: displayImages[currentIndex]
                });
              } catch (err) {
                console.log('Share cancelled');
              }
            } else {
              await navigator.clipboard.writeText(window.location.href);
              alert('Link copied!');
            }
          }}
          aria-label="Share photo"
        >
          <Share2 size={20} />
        </button>
      </div>
    </div>
          
          <div className="sh-modal-content">
            <button className="sh-nav-arrow sh-prev-arrow" onClick={prevImage}>
              <ChevronLeft size={32} />
            </button>
            
            <div className="sh-modal-image-container">
              <img src={displayImages[currentIndex]} alt={`Photo ${currentIndex + 1}`} />
            </div>
            
            <button className="sh-nav-arrow sh-next-arrow" onClick={nextImage}>
              <ChevronRight size={32} />
            </button>
          </div>

          {/* Thumbnail strip at bottom */}
          <div className="sh-modal-thumbnails">
            {displayImages.map((img, idx) => (
              <button
                key={idx}
                className={`sh-modal-thumb ${idx === currentIndex ? 'sh-active' : ''}`}
                onClick={() => onIndexChange(idx)}
              >
                <img src={img} alt="" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default function HotelDetailModal({ hotel, onClose, onBook, isModal = false }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(hotel.roomTypes[0]);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const { isLiked, toggleLiked } = useLiked();
  const isFavorite = isLiked(hotel.id, 'hotel');
  const navigate = useNavigate();


   // Add toast state for cart notification
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { isAuthenticated } = useAuth(); // ✅ add this
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  


// Review logic moved to HotelReviewSection component
  
  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: hotel.name, text: hotel.description, url: window.location.href });
      } catch (err) { console.log('Share cancelled'); }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    }
  }, [hotel.name, hotel.description]);

  const handleToggleFavorite = useCallback(() => {
  if (!isAuthenticated) {
  setShowLoginPrompt(true);
  return;
}
  toggleLiked({
    id: hotel.id, type: 'hotel', name: hotel.name, location: hotel.location,
    price: hotel.price, image: hotel.images?.[0] || hotel.image,
    rating: hotel.rating,
  });
}, [hotel, toggleLiked, isAuthenticated]);

  const displayedAmenities = showAllAmenities ? hotel.amenities : hotel.amenities.slice(0, 6);


  const handleAddToCart = useCallback(() => {
    // Check if already in cart
    if (!isAuthenticated) {
  setShowLoginPrompt(true);
  return;
}

    // Add to cart
    toggleLiked({
      id: hotel.id, 
      type: 'hotel', 
      name: hotel.name, 
      location: hotel.location,
      price: selectedRoom.price, 
      originalPrice: hotel.price, 
      image: hotel.images?.[0] || hotel.image,
      description: hotel.description, 
      rating: hotel.rating, 
      amenities: hotel.amenities?.slice(0, 3),
      roomType: selectedRoom.type
    });
    
    // Show success toast
    setToastMessage('Added to cart successfully!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }, [hotel, selectedRoom, toggleLiked, isFavorite]);


  return (
    <div className="sh-hotel-detail">

      {showToast && (
        <div className="sh-toast-overlay" onClick={() => setShowToast(false)}>
          <div className={`sh-toast-popup ${showToast ? 'sh-toast-show' : ''}`} onClick={(e) => e.stopPropagation()}>
            <div className="sh-toast-icon">
              {isFavorite ? <CheckCircle2 size={24} color="#10b981" /> : <ShoppingCart size={24} color="#fff" />}
            </div>
            <div className="sh-toast-content">
              <span className="sh-toast-title">{toastMessage}</span>
              <span className="sh-toast-subtitle">
                {isFavorite ? 'View your cart to book' : 'Proceed to checkout anytime'}
              </span>
            </div>
            <button 
              className="sh-toast-action"
              onClick={() => {
                navigate('/favorites');
                setShowToast(false);
              }}
            >
              View Cart
            </button>
            <button className="sh-toast-close" onClick={() => setShowToast(false)}>
              <X size={18} />
            </button>
            <div className="sh-toast-progress"></div>
          </div>
        </div>
      )}
      {/* Top Navigation Bar - REDESIGNED */}
      <nav className="sh-top-nav">
        <div className="sh-nav-left">
          {!isModal ? (
            <button className="sh-back-btnn" onClick={() => navigate('/Hotel')}>
              <div className="sh-back-icon">
                <ArrowLeft size={20} />
              </div>
              <div className="sh-back-text">
                <span className="sh-back-label">Back to</span>
                <span className="sh-back-title">Hotels</span>
              </div>
            </button>
          ) : (
            <button className="sh-back-btnn" onClick={onClose}>
              <div className="sh-back-icon">
                <X size={20} />
              </div>
              <div className="sh-back-text">
                <span className="sh-back-label">Close</span>
                <span className="sh-back-title">Details</span>
              </div>
            </button>
          )}
        </div>
        
        <div className="sh-nav-actions">
          {/* Add to Cart Button - Desktop */}
          <button 
            className={`sh-cart-btn ${isFavorite ? 'sh-in-cart' : ''}`}
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <ShoppingCart size={20} />
            <span className="sh-cart-text">{isFavorite ? 'In Cart' : 'Add to Cart'}</span>
            {isFavorite && <span className="sh-cart-check"><Check size={14} /></span>}
          </button>
          
          <button className={`sh-icon-btn ${isFavorite ? 'sh-active' : ''}`} onClick={handleToggleFavorite}>
            <Heart size={20} fill={isFavorite ? "#ef4444" : "none"} color={isFavorite ? "#ef4444" : "currentColor"} />
          </button>
          <button className="sh-icon-btn" onClick={handleShare}>
            <Share2 size={20} />
          </button>
        </div>
      </nav>

      <div className="sh-container">
        {/* Header Info */}
        <header className="sh-header">
          <div className="sh-title-section">
            <h1>{hotel.name}</h1>
            <div className="sh-meta">
              <span className="sh-rating">
                <Star size={16} fill="#f59e0b" color="#f59e0b" />
                <strong>{hotel.rating}</strong>
                <span>({hotel.totalReviews} reviews)</span>
              </span>
              <span className="sh-location">
                <MapPin size={16} />
                {hotel.location}
              </span>
            </div>
          </div>
          <div className="sh-price-tag">
            <span className="sh-from">From</span>
            <span className="sh-amount">₹{selectedRoom.price.toLocaleString()}</span>
            <span className="sh-night">/ night</span>
          </div>
        </header>

        {/* Image Gallery - 3 IMAGES ONLY */}
        <ImageGallery images={hotel.images} currentIndex={currentImageIndex} onIndexChange={setCurrentImageIndex} />

        {/* Main Content Grid */}
        <div className="sh-content-grid">
          {/* Left Column */}
          <div className="sh-left-col">
            {/* About Section */}
            <section className="sh-section">
              <h2>About this place</h2>
              <p className="sh-description">{hotel.description}</p>
              {hotel.deal && (
                <div className="sh-deal-tag">
                  <Sparkles size={16} />
                  {hotel.deal}
                </div>
              )}
            </section>

            {/* Amenities */}
            <section className="sh-section">
              <div className="sh-section-header">
                <h2>What this place offers</h2>
                {hotel.amenities.length > 6 && (
                  <button className="sh-show-more" onClick={() => setShowAllAmenities(!showAllAmenities)}>
                    {showAllAmenities ? "Show less" : `Show all ${hotel.amenities.length} amenities`}
                  </button>
                )}
              </div>
              <div className="sh-amenities-grid">
                {displayedAmenities.map((amenity, i) => (
                  <AmenityItem key={i} amenity={amenity} />
                ))}
              </div>
            </section>

            {/* Room Selection */}
            <section className="sh-section">
              <h2>Choose your room</h2>
              <div className="sh-rooms-list">
                {hotel.roomTypes.map((room, i) => (
                  <RoomCard
                    key={i}
                    room={room}
                    isSelected={selectedRoom === room}
                    onSelect={() => setSelectedRoom(room)}
                  />
                ))}
              </div>
            </section>

            {/* Nearby Attractions */}
            <section className="sh-section">
              <h2>Nearby places</h2>
              <div className="sh-nearby-list">
                {hotel.nearby.map((place, i) => (
                  <div key={i} className="sh-nearby-item">
                    <MapPin size={16} />
                    <span>{place}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* ✅ Reviews — full system with write/read/like */}
            <HotelReviewSection
              hotelId={hotel.id}
              hotelName={hotel.name}
            />
          </div>

          {/* Right Column - Sticky Booking Card */}
          <div className="sh-right-col">
            <div className="sh-booking-card">
              <div className="sh-booking-header">
                <div>
                  <span className="sh-label">Selected Room</span>
                  <span className="sh-room-name">{selectedRoom.type}</span>
                </div>
                <div className="sh-price-block">
                  <span className="sh-big-price">₹{selectedRoom.price.toLocaleString()}</span>
                  <span className="sh-per">/night</span>
                </div>
              </div>

              <div className="sh-date-guests">
                <div className="sh-input-row">
                  <Calendar size={18} />
                  <div>
                    <label>Check in</label>
                    <span>Add date</span>
                  </div>
                </div>
                <div className="sh-divider"></div>
                <div className="sh-input-row">
                  <Calendar size={18} />
                  <div>
                    <label>Check out</label>
                    <span>Add date</span>
                  </div>
                </div>
                <div className="sh-divider"></div>
                <div className="sh-input-row">
                  <Users size={18} />
                  <div>
                    <label>Guests</label>
                    <span>2 guests</span>
                  </div>
                </div>
              </div>
<button 
            className={`sh-add-cart-btn ${isFavorite ? 'sh-added' : ''}`}
            onClick={handleAddToCart}
          >
            <div className="sh-cart-btn-content">
              <ShoppingCart size={20} />
              <span>{isFavorite ? 'Added to Cart' : 'Add to Cart'}</span>
            </div>
            {isFavorite && <CheckCircle2 size={18} className="sh-cart-check-icon" />}
          </button>
              <button className="sh-book-btn" onClick={onBook}>
                Reserve Now
              </button>

              <div className="sh-price-details">
                <div className="sh-row">
                  <span>₹{selectedRoom.price.toLocaleString()} x 1 night</span>
                  <span>₹{selectedRoom.price.toLocaleString()}</span>
                </div>
                <div className="sh-row">
                  <span>Taxes & fees (12%)</span>
                  <span>₹{Math.round(selectedRoom.price * 0.12).toLocaleString()}</span>
                </div>
                <div className="sh-row sh-total">
                  <span>Total</span>
                  <span>₹{Math.round(selectedRoom.price * 1.12).toLocaleString()}</span>
                </div>
              </div>

              <div className="sh-host-contact">
                <Phone size={16} />
                <span>Questions? Contact host</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="sh-trust-badges">
              <div className="sh-badge-item">
                <CheckCircle2 size={20} color="#16a34a" />
                <span>Free cancellation</span>
              </div>
              <div className="sh-badge-item">
                <CheckCircle2 size={20} color="#16a34a" />
                <span>Instant confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="sh-mobile-bar">
        <div className="sh-mobile-info">
          <span className="sh-m-price">₹{selectedRoom.price.toLocaleString()}</span>
          <span className="sh-m-unit">/ night</span>
        </div>
        <div className="sh-mobile-actions">
          <button 
            className={`sh-m-cart-btn ${isFavorite ? 'sh-m-added' : ''}`}
            onClick={handleAddToCart}
          >
            <ShoppingCart size={20} />
            {isFavorite && <Check size={12} className="sh-m-check" />}
          </button>
          <button className="sh-m-book" onClick={onBook}>Reserve</button>
        </div>
      </div>
      <LoginPromptModal
  isOpen={showLoginPrompt}
  onClose={() => setShowLoginPrompt(false)}
  message="Login or create a free account to save hotels to your cart."
/>
    </div>
  );
}