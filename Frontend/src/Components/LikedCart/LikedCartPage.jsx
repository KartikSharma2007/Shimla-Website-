import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLiked } from './LikedContext';
import HotelDetailModal from "../../Components/Hotel/HotelDetailModal";
import { hotels, locations, allAmenities } from "../../data/hotelData";
import { bookingAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { 
  Heart, 
  Trash2, 
  ArrowLeft, 
  MapPin, 
  Star, 
  Calendar,
  Users,
  Clock,
  ExternalLink,
  ShoppingBag,
  Sparkles,
  AlertCircle,
  X,
  ChevronRight,
  Hotel,
  Package,
  CheckCircle,
  Shield,
  CreditCard,
  User,
  Phone,
  Mail,
  CalendarDays,
  Eye,
  Mountain,
  Camera,
  Utensils,
  Car,
  Bed,
  Sun,
  Thermometer,
  Tag,
  Check,
  MessageCircle
} from 'lucide-react';
import './LikedCartPage.css';

// Package View Modal Component - FIXED ANIMATION
const PackageViewModal = ({ packageData, isOpen, onClose, onBook }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('crt-modal-open');
    } else {
      document.body.classList.remove('crt-modal-open');
    }
    return () => {
      document.body.classList.remove('crt-modal-open');
    };
  }, [isOpen]);
  
  if (!isOpen || !packageData) return null;

  const discount = Math.round(((packageData.originalPrice - packageData.price) / packageData.originalPrice) * 100);

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

  return (
    <div className="crt-package-view-overlay" onClick={onClose}>
      <div className="crt-package-view-modal" onClick={(e) => e.stopPropagation()}>
        <button className="crt-package-view-close" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>

        {/* Hero Image */}
        <div className="crt-package-view-hero">
          <img src={packageData.image} alt={packageData.title} loading="lazy" />
          <div className="crt-package-view-hero-content">
            <span className="crt-package-view-category">{packageData.category}</span>
            <h2>{packageData.title}</h2>
            <div className="crt-package-view-meta">
              <span><Clock size={16} /> {packageData.duration}</span>
              <span><MapPin size={16} /> {packageData.location}</span>
              <span className="crt-package-view-rating">
                <Star size={16} fill="#fbbf24" color="#fbbf24" /> {packageData.rating}
              </span>
            </div>
          </div>
        </div>

        <div className="package-view-body">
          {/* Tabs */}
          <div className="crt-package-view-tabs" role="tablist">
            <button 
              className={activeTab === 'overview' ? 'active' : ''}
              onClick={() => setActiveTab('overview')}
              role="tab"
              aria-selected={activeTab === 'overview'}
            >
              Overview
            </button>
            <button 
              className={activeTab === 'itinerary' ? 'active' : ''}
              onClick={() => setActiveTab('itinerary')}
              role="tab"
              aria-selected={activeTab === 'itinerary'}
            >
              Itinerary
            </button>
            <button 
              className={activeTab === 'inclusions' ? 'active' : ''}
              onClick={() => setActiveTab('inclusions')}
              role="tab"
              aria-selected={activeTab === 'inclusions'}
            >
              Inclusions
            </button>
          </div>

          {/* Tab Content */}
          <div className="crt-package-view-content">
            {activeTab === 'overview' && (
              <div className="package-tab-panel">
                <p className="crt-package-view-description">{packageData.description}</p>
                
                <div className="crt-package-view-highlights">
                  <h4>Highlights</h4>
                  <div className="crt-highlights-grid">
                    {packageData.highlights?.map((highlight, idx) => (
                      <div key={idx} className="crt-highlight-item">
                        {idx % 5 === 0 && <Mountain size={20} />}
                        {idx % 5 === 1 && <Camera size={20} />}
                        {idx % 5 === 2 && <Utensils size={20} />}
                        {idx % 5 === 3 && <Car size={20} />}
                        {idx % 5 === 4 && <Bed size={20} />}
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="crt-package-view-seasons">
                  <h4>Best Time to Visit</h4>
                  <div className="crt-seasons-grid">
                    <div className="crt-season-card">
                      <Sun size={28} color="#f59e0b" />
                      <div>
                        <h5>Summer</h5>
                        <p>Mar - Jun</p>
                        <small>Perfect for sightseeing</small>
                      </div>
                    </div>
                    <div className="crt-season-card">
                      <Thermometer size={28} color="#3b82f6" />
                      <div>
                        <h5>Winter</h5>
                        <p>Oct - Feb</p>
                        <small>Snow activities</small>
                      </div>
                    </div>
                    <div className="crt-season-card">
                      <Mountain size={28} color="#10b981" />
                      <div>
                        <h5>Monsoon</h5>
                        <p>Jul - Sep</p>
                        <small>Lush green landscapes</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'itinerary' && (
              <div className="package-tab-panel">
                <div className="crt-package-itinerary">
                  {packageData.itinerary?.map((day, idx) => (
                    <div key={idx} className="crt-itinerary-day">
                      <div className="crt-day-marker">
                        <span className="crt-day-num">Day {day.day}</span>
                        <div className="crt-day-dot"></div>
                      </div>
                      <div className="crt-day-content">
                        <h4>{day.title}</h4>
                        <p>{day.description}</p>
                        <div className="crt-day-tags">
                          {day.tags?.map((tag, tIdx) => (
                            <span key={tIdx} className="crt-day-tag"><Tag size={10} /> {tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'inclusions' && (
              <div className="package-tab-panel">
                <div className="crt-inclusions-section">
                  <h4>What's Included</h4>
                  <div className="crt-inclusions-list">
                    {packageData.inclusions?.map((item, idx) => (
                      <div key={idx} className="crt-inclusion-item crt-included">
                        <Check size={18} color="#10b981" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <h4 style={{ marginTop: '24px' }}>Not Included</h4>
                  <div className="crt-inclusions-list">
                    {packageData.exclusions?.map((item, idx) => (
                      <div key={idx} className="crt-inclusion-item crt-not-included">
                        <X size={18} color="#ef4444" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer with Price and Book Button */}
          <div className="crt-package-view-footer">
            <div className="crt-package-view-price">
              <span className="crt-price-from">From</span>
              <div className="crt-price-row">
                <strong>₹{packageData.price.toLocaleString('en-IN')}</strong>
                {packageData.originalPrice > packageData.price && (
                  <span className="crt-price-strike">₹{packageData.originalPrice.toLocaleString('en-IN')}</span>
                )}
              </div>
              <span className="crt-price-per">per person</span>
              {discount > 0 && (
                <span className="crt-save-badge">Save {discount}%</span>
              )}
            </div>
            
            <div className="crt-package-view-actions">
              <Link 
                to={`/package/${packageData.id}`} 
                className="crt-btn-view-full"
                onClick={onClose}
              >
                <ExternalLink size={16} />
                View Full Page
              </Link>
              <button className="crt-btn-book-package" onClick={onBook}>
                Book Now
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LikedCartPage = () => {
  const { likedItems, likedHotels, likedPackages, totalLiked, removeFromLiked, clearAllLiked } = useLiked();
  const { user, isAuthenticated } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  
  // View Details modal states
  const [viewHotelDetails, setViewHotelDetails] = useState(null);
  const [viewPackageDetails, setViewPackageDetails] = useState(null);
  
  // Booking modal states
  const [bookingHotel, setBookingHotel] = useState(null);
  const [bookingPackage, setBookingPackage] = useState(null);
  
  // Multi-item booking modal state
  const [showMultiBookingModal, setShowMultiBookingModal] = useState(false);
  const [multiBookingLoading, setMultiBookingLoading] = useState(false);
  const [multiBookingError, setMultiBookingError] = useState('');
  const [bookingFormData, setBookingFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    travelDate: '',
    checkIn: '',
    checkOut: '',
    pickupLocation: '',
    specialRequests: ''
  });

  // Toast notification state
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success',
    subMessage: ''
  });

  // Pre-fill form with user data when modal opens
  useEffect(() => {
    if (showMultiBookingModal && user) {
      setBookingFormData(prev => ({
        ...prev,
        fullName: prev.fullName || user.fullName || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || '',
      }));
    }
  }, [showMultiBookingModal, user]);

  const navigate = useNavigate();

  // Prevent body scroll when any modal is open
  useEffect(() => {
    const isAnyModalOpen = showClearConfirm || showMultiBookingModal || viewHotelDetails || viewPackageDetails || bookingHotel || bookingPackage;
    if (isAnyModalOpen) {
      document.body.classList.add('crt-modal-open');
    } else {
      document.body.classList.remove('crt-modal-open');
    }
    return () => {
      document.body.classList.remove('crt-modal-open');
    };
  }, [showClearConfirm, showMultiBookingModal, viewHotelDetails, viewPackageDetails, bookingHotel, bookingPackage]);

  // Filter items based on crt-active filter
  const getFilteredItems = () => {
    switch (activeFilter) {
      case 'hotels':
        return likedHotels;
      case 'packages':
        return likedPackages;
      default:
        return likedItems;
    }
  };
  const filteredItems = getFilteredItems();

  // Show toast notification
  const showToastMessage = (message, type = 'success', subMessage = '') => {
    setToast({ show: true, message, type, subMessage });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 4000);
  };

  // Hide toast manually
  const hideToast = () => setToast(prev => ({ ...prev, show: false }));

  // Calculate totals
  const calculateTotal = () => {
    return likedItems.reduce((total, item) => {
      const price = item.price || item.costPerPerson || 0;
      return total + (typeof price === 'number' ? price : 0);
    }, 0);
  };

  // In LikedCartPage.jsx, update the handleRemove function:

const handleRemove = async (e, item) => {
  e.stopPropagation();
  
  const itemId = item.id || item._id;
  const itemType = item.type || 'hotel';
  
  if (!itemId) {
    console.error('No ID found for item:', item);
    return;
  }

  setRemovingId(`${itemType}-${itemId}`);
  
  try {
    await removeFromLiked(itemId, itemType);
    console.log('Removed from cart:', itemId);
  } catch (error) {
    console.error('Error crt-removing from cart:', error);
  } finally {
    setRemovingId(null);
  }
};

  const handleClearAll = () => {
    clearAllLiked();
    setShowClearConfirm(false);
  };

  // Handle View Details - Open view modals
  const handleViewDetails = (item) => {
  if (item.type === 'hotel') {
    setViewHotelDetails(item);
    setViewPackageDetails(null); // Close package modal if open
  } else if (item.type === 'package') {
    setViewPackageDetails(item);
    setViewHotelDetails(null); // Close hotel modal if open
  }
};

  // Handle Book Now from view modal
 // Handle Book Now from view modal
const handleBookFromView = (item) => {
  // Close view modals
  setViewHotelDetails(null);
  setViewPackageDetails(null);

  // Navigate to full-page booking flow
  if (item.type === 'package') {
    navigate('/booking', {
      state: {
        type:         'package',
        itemId:       item._id || item.id,
        itemName:     item.title || item.name,
        itemImage:    item.image || item.coverImage || null,
        itemRating:   item.rating,
        itemLocation: item.location,
        price:        item.price || item.costPerPerson || 0,
        returnTo:     '/favorites',
      },
    });
  } else {
    const fullData = getFullHotelData(item);
    navigate('/booking', {
      state: {
        type:       'hotel',
        itemId:     fullData.id || fullData._id,
        itemName:   fullData.name,
        itemImage:  fullData.images?.[0] || fullData.image || null,
        itemRating: fullData.rating,
        price:      fullData.price || 0,
        roomTypes:  fullData.roomTypes || [],
        returnTo:   '/favorites',
      },
    });
  }
};

  // Handle Proceed to Book from summary
  const handleProceedToBook = () => {
    if (likedItems.length === 0) return;

    if (likedItems.length === 1) {
      // Single item — use the standard full-page booking flow
      handleBookFromView(likedItems[0]);
      return;
    }

    // Multiple items — check if they are all the same type
    if (likedHotels.length === 1 && likedPackages.length === 0) {
      // Only 1 hotel (shouldn't reach here but safety check)
      handleBookFromView(likedHotels[0]);
      return;
    }

    if (likedPackages.length === 1 && likedHotels.length === 0) {
      // Only 1 package
      handleBookFromView(likedPackages[0]);
      return;
    }

    // Mixed cart OR multiple items of same type → multi-booking page
    navigate('/booking/multi', {
      state: {
        items:    likedItems,
        hotels:   likedHotels,
        packages: likedPackages,
        returnTo: '/favorites',
      },
    });
  };

  const getItemImage = (item) => {
    if (item.image) return item.image;
    if (item.images && item.images.length > 0) return item.images[0];
    return '/placeholder-image.jpg';
  };

  const getItemPrice = (item) => {
    if (item.price) return `₹${item.price.toLocaleString()}`;
    if (item.costPerPerson) return `₹${item.costPerPerson.toLocaleString()}`;
    return 'Price on request';
  };

  // Multi-booking form handlers
  const handleBookingInputChange = (e) => {
    const { name, value } = e.target;
    setBookingFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMultiBookingSubmit = async (e) => {
  e.preventDefault();
  setMultiBookingError('');

  if (!isAuthenticated) {
    setMultiBookingError('Please login to submit a booking request.');
    return;
  }

  if (!bookingFormData.fullName || !bookingFormData.email || !bookingFormData.phone) {
    setMultiBookingError('Please fill in your full name, email, and phone number.');
    return;
  }

  // Validate hotel dates if there are hotels in cart
  if (likedHotels.length > 0) {
    if (!bookingFormData.checkIn || !bookingFormData.checkOut) {
      setMultiBookingError('Please select check-in and check-out dates for your hotel(s).');
      return;
    }
    if (new Date(bookingFormData.checkOut) <= new Date(bookingFormData.checkIn)) {
      setMultiBookingError('Check-out date must be after check-in date.');
      return;
    }
  }

  // Validate travel date if there are packages in cart
  if (likedPackages.length > 0 && !bookingFormData.travelDate) {
    setMultiBookingError('Please select a travel date for your package(s).');
    return;
  }

  setMultiBookingLoading(true);
  const contactInfo = {
    fullName: bookingFormData.fullName,
    email: bookingFormData.email,
    phone: bookingFormData.phone,
  };

  try {
    const bookingPromises = [];

    // Book each hotel in the cart
    for (const hotel of likedHotels) {
      bookingPromises.push(
        bookingAPI.createHotel({
          hotelId: hotel.id,
          hotelName: hotel.name,
          roomType: hotel.roomType || 'Standard',
          roomPrice: hotel.price,
          checkIn: bookingFormData.checkIn,
          checkOut: bookingFormData.checkOut,
          guests: { adults: 2, children: 0 },
          rooms: 1,
          contactInfo,
          specialRequests: bookingFormData.specialRequests,
        })
      );
    }

    // Book each package in the cart
    for (const pkg of likedPackages) {
      bookingPromises.push(
        bookingAPI.createPackage({
          packageId: pkg.id,
          packageTitle: pkg.name || pkg.title,
          packagePrice: pkg.price,
          packageDuration: pkg.duration,
          travelDate: bookingFormData.travelDate,
          guests: { adults: 2, children: 0 },
          pickupLocation: bookingFormData.pickupLocation || '',
          contactInfo,
          specialRequests: bookingFormData.specialRequests,
        })
      );
    }

    await Promise.all(bookingPromises);

    // Notify Account dashboard to refresh
    window.dispatchEvent(new CustomEvent('bookingConfirmed'));

    showToastMessage(
      'Booking Request Submitted!',
      'success',
      `${totalLiked} item(s) booked. We'll contact you within 24 hours.`
    );

    setShowMultiBookingModal(false);
    setBookingFormData({
      fullName: '',
      email: '',
      phone: '',
      travelDate: '',
      checkIn: '',
      checkOut: '',
      pickupLocation: '',
      specialRequests: ''
    });
  } catch (err) {
    const serverMsg = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg;
    setMultiBookingError(serverMsg || 'Booking failed. Please try again.');
  } finally {
    setMultiBookingLoading(false);
  }
};

  // Prepare hotel data for HotelDetailModal
// Prepare hotel data for HotelDetailModal
const getFullHotelData = (likedItem) => {
  if (!likedItem) return null;

  // CRITICAL FIX: Convert both to string for comparison
  // likedItem.id is '1' (string from MongoDB), hotels array has 1 (number)
  const fullHotel = hotels.find(h => String(h.id) === String(likedItem.id));
  
  console.log('Looking for hotel ID:', likedItem.id, 'Found:', fullHotel?.name);
  
  if (fullHotel) {
    console.log('Full hotel images:', fullHotel.images);
    
    return {
      ...fullHotel, // This spreads ALL images from the original hotel data
      price: likedItem.price || fullHotel.price,
      selectedRoomType: likedItem.roomType || null,
    };
  }
  
  // Fallback if not found
  console.warn('Hotel not found, building fallback for ID:', likedItem.id);
  
  return {
    id: likedItem.id,
    name: likedItem.name,
    location: likedItem.location || "Shimla, Himachal Pradesh",
    price: likedItem.price || 5000,
    image: likedItem.image,
    // CRITICAL: Build images array from single image for gallery
    images: likedItem.images || [likedItem.image, likedItem.image, likedItem.image],
    rating: likedItem.rating || 4.0,
    totalReviews: 0,
    description: likedItem.description || "Beautiful hotel in Shimla",
    amenities: likedItem.amenities || ["Free WiFi", "Parking", "Breakfast"],
    roomTypes: [
      { type: "Standard Room", price: likedItem.price || 5000, features: ["Mountain View", "Free WiFi"] },
      { type: "Deluxe Room", price: (likedItem.price || 5000) * 1.4, features: ["Valley View", "Balcony"] }
    ],
    nearby: ["Mall Road", "Ridge"],
    reviews: []
  };
};

  // Prepare package data for PackageViewModal
  const preparePackageData = (pkg) => ({
    id: pkg.id,
    title: pkg.name,
    description: pkg.description || pkg.shortDescription || `Experience the best of ${pkg.location || 'Shimla'} with this carefully curated package. Perfect for adventure travelers, this tour combines breathtaking landscapes, cultural experiences, and comfortable accommodations.`,
    price: pkg.price || pkg.costPerPerson || 15000,
    originalPrice: pkg.originalPrice || Math.round((pkg.price || 15000) * 1.2),
    image: getItemImage(pkg),
    category: pkg.category || 'Adventure',
    duration: pkg.duration || '3 Days',
    location: pkg.location || 'Shimla, HP',
    groupSize: pkg.groupSize || '2-12 People',
    rating: pkg.rating || 4.5,
    highlights: pkg.highlights || ['Scenic Views', 'Local Cuisine', 'Guided Tours', 'Comfortable Stay', 'Adventure Activities'],
    inclusions: pkg.inclusions || ['Accommodation', 'Meals', 'Transport', 'Guide', 'Entry Fees'],
    exclusions: pkg.exclusions || ['Personal expenses', 'Tips', 'Optional activities', 'Travel Insurance'],
    itinerary: pkg.itinerary || [
      { day: 1, title: 'Arrival & Local Sightseeing', description: 'Pick up from airport/railway station and local sightseeing including Mall Road and Ridge.', tags: ['Sightseeing', 'Transfer'] },
      { day: 2, title: 'Adventure Activities', description: 'Full day of adventure activities and exploration of nearby attractions.', tags: ['Adventure', 'Nature'] },
      { day: 3, title: 'Departure', description: 'Check out and transfer to airport/railway station with fond memories.', tags: ['Transfer'] }
    ]
  });

  if (totalLiked === 0) {
    return (
      <div className="crt-liked-cart-page crt-ec-page">
        <div className="crt-ec-wrapper">

          {/* ── subtle back nav ── */}
          <button className="crt-ec-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} />
            Back
          </button>

          {/* ── main card ── */}
          <div className="crt-ec-card">

            {/* left: illustration column */}
            <div className="crt-ec-illustration-col">
              <div className="crt-ec-mountain-scene">
                {/* SVG mountain scene */}
                <svg className="crt-ec-scene-svg" viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* sky gradient */}
                  <defs>
                    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#d1fae5"/>
                      <stop offset="100%" stopColor="#f0fdf4"/>
                    </linearGradient>
                    <linearGradient id="mtn1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6ee7b7"/>
                      <stop offset="100%" stopColor="#34d399"/>
                    </linearGradient>
                    <linearGradient id="mtn2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a7f3d0"/>
                      <stop offset="100%" stopColor="#6ee7b7"/>
                    </linearGradient>
                    <linearGradient id="mtn3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#d1fae5"/>
                      <stop offset="100%" stopColor="#a7f3d0"/>
                    </linearGradient>
                    <linearGradient id="snowGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffffff"/>
                      <stop offset="100%" stopColor="#ecfdf5"/>
                    </linearGradient>
                  </defs>

                  {/* sky */}
                  <rect width="340" height="260" fill="url(#skyGrad)" rx="16"/>

                  {/* clouds */}
                  <ellipse cx="60" cy="48" rx="32" ry="12" fill="white" opacity="0.7"/>
                  <ellipse cx="80" cy="44" rx="22" ry="10" fill="white" opacity="0.8"/>
                  <ellipse cx="260" cy="38" rx="28" ry="10" fill="white" opacity="0.6"/>
                  <ellipse cx="280" cy="35" rx="18" ry="8" fill="white" opacity="0.7"/>

                  {/* back mountains */}
                  <polygon points="30,190 110,90 190,190" fill="url(#mtn3)" opacity="0.5"/>
                  <polygon points="150,190 230,80 310,190" fill="url(#mtn3)" opacity="0.5"/>

                  {/* mid mountains */}
                  <polygon points="0,200 90,100 180,200" fill="url(#mtn2)"/>
                  <polygon points="160,200 255,88 340,200" fill="url(#mtn2)"/>

                  {/* main front mountain */}
                  <polygon points="60,220 170,60 280,220" fill="url(#mtn1)"/>

                  {/* snow caps */}
                  <polygon points="150,60 170,60 190,100 130,100" fill="url(#snowGrad)" opacity="0.9"/>
                  <polygon points="78,100 90,100 102,128 66,128" fill="url(#snowGrad)" opacity="0.7"/>
                  <polygon points="242,88 255,88 268,116 229,116" fill="url(#snowGrad)" opacity="0.7"/>

                  {/* ground */}
                  <rect x="0" y="218" width="340" height="42" rx="0" fill="#6ee7b7" opacity="0.4"/>
                  <rect x="0" y="232" width="340" height="28" rx="0" fill="#34d399" opacity="0.3"/>

                  {/* pine trees */}
                  <polygon points="28,222 36,192 44,222" fill="#059669" opacity="0.7"/>
                  <polygon points="36,222 42,200 48,222" fill="#047857" opacity="0.8"/>
                  <polygon points="285,222 293,194 301,222" fill="#059669" opacity="0.7"/>
                  <polygon points="295,222 301,202 307,222" fill="#047857" opacity="0.8"/>

                  {/* cart icon centered */}
                  <g transform="translate(143, 148)">
                    <rect x="0" y="0" width="54" height="54" rx="14" fill="white" opacity="0.92"/>
                    <rect x="0" y="0" width="54" height="54" rx="14" fill="none" stroke="#34d399" strokeWidth="1.5" opacity="0.6"/>
                    {/* shopping bag shape */}
                    <path d="M14 20h26l-3 18H17L14 20z" fill="none" stroke="#10b981" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M20 20v-4a7 7 0 0 1 14 0v4" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M23 30 c0 4 8 4 8 0" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
                  </g>

                  {/* floating hearts / sparkles */}
                  <text x="104" y="148" fontSize="14" opacity="0.6">✦</text>
                  <text x="222" y="140" fontSize="11" opacity="0.5">✦</text>
                  <text x="290" y="160" fontSize="9" opacity="0.4">♡</text>
                  <text x="46" y="165" fontSize="10" opacity="0.4">♡</text>
                </svg>

                {/* pill badges */}
                <div className="crt-ec-badge crt-ec-badge-top">
                  <Mountain size={13} />
                  Shimla Awaits
                </div>
                <div className="crt-ec-badge crt-ec-badge-bottom">
                  <Sparkles size={13} />
                  100+ Experiences
                </div>
              </div>
            </div>

            {/* right: text column */}
            <div className="crt-ec-text-col">
              <div className="crt-ec-eyebrow">
                <span className="crt-ec-eyebrow-dot"></span>
                Your Cart
              </div>

              <h1 className="crt-ec-headline">
                Nothing here<br />
                <em>just yet</em>
              </h1>

              <p className="crt-ec-subtext">
                You haven't saved any hotels or packages. Start exploring — Shimla's finest stays and curated adventures are one click away.
              </p>

              {/* feature chips */}
              <div className="crt-ec-chips">
                <span className="crt-ec-chip"><CheckCircle size={13} /> Free cancellation</span>
                <span className="crt-ec-chip"><Shield size={13} /> Secure booking</span>
                <span className="crt-ec-chip"><Star size={13} /> Best price guarantee</span>
              </div>

              {/* CTA buttons */}
              <div className="crt-ec-cta-group">
                <Link to="/Hotel" className="crt-ec-btn-primary">
                  <Hotel size={18} />
                  Browse Hotels
                  <ChevronRight size={16} className="crt-ec-btn-arrow" />
                </Link>
                <Link to="/packagess" className="crt-ec-btn-secondary">
                  <Package size={18} />
                  View Packages
                </Link>
              </div>

              {/* bottom trust note */}
              <p className="crt-ec-trust-note">
                <CreditCard size={13} /> Pay at property · No hidden charges
              </p>
            </div>

          </div>

          {/* ── suggestion strip ── */}
          <div className="crt-ec-suggestion-strip">
            <span className="crt-ec-suggestion-label">Popular right now →</span>
            {[
              { icon: <Mountain size={15}/>,  label: 'Kufri Resort' },
              { icon: <Camera size={15}/>,    label: 'Heritage Trail' },
              { icon: <Utensils size={15}/>,  label: 'Mall Road Stay' },
              { icon: <Sun size={15}/>,       label: 'Summer Escape' },
            ].map((s, i) => (
              <Link key={i} to="/Hotel" className="crt-ec-suggestion-pill">
                {s.icon}
                {s.label}
              </Link>
            ))}
          </div>

        </div>
      </div>
    );
  }


  return (
    <div className="crt-liked-cart-page">
      <div className="crt-cart-content-wrapper">
        {/* Header */}
                {/* Modern Cart Header */}
        <div className="crt-cart-header-modern">
          <div className="crt-header-left">
            <button className="crt-back-btn-modern" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
              <span>Continue Shopping</span>
            </button>
          </div>
          
          <div className="crt-header-center-modern">
            <div className="crt-cart-icon-wrapper" data-count={totalLiked}>
              <ShoppingBag size={28} />
            </div>
            <div className="crt-header-title-group">
              <h1>
                Shopping Cart
                <span style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px',
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '700',
                  color: 'var(--primary-green)',
                  border: '2px solid #bbf7d0'
                }}>
                  {totalLiked} {totalLiked === 1 ? 'Item' : 'Items'}
                </span>
              </h1>
              <p>Review your selected hotels and packages</p>
            </div>
          </div>

          <div className="crt-header-right">
            <Link to="/Hotel" className="crt-continue-shopping-link">
              <Sparkles size={16} />
              Explore More
            </Link>
            <button 
              className="crt-clear-all-btn-modern"
              onClick={() => setShowClearConfirm(true)}
              title="Clear all items"
            >
              <Trash2 size={18} />
              <span>Clear Cart</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="crt-cart-main-container">
          <div className="crt-cart-layout">
            {/* Left Side - Items List */}
            <div className="crt-cart-items-section">
              {/* Filter Buttons */}
              <div className="crt-filter-buttons">
                <button 
                  className={`crt-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('all')}
                >
                  <ShoppingBag size={16} />
                  All Items
                  <span className="crt-filter-count">{likedItems.length}</span>
                </button>
                <button 
                  className={`crt-filter-btn ${activeFilter === 'hotels' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('hotels')}
                >
                  <Hotel size={16} />
                  Hotels
                  <span className="crt-filter-count">{likedHotels.length}</span>
                </button>
                <button 
                  className={`crt-filter-btn ${activeFilter === 'packages' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('packages')}
                >
                  <Package size={16} />
                  Packages
                  <span className="crt-filter-count">{likedPackages.length}</span>
                </button>
              </div>

              <div className="crt-cart-items-list">
                {filteredItems.map((item, index) => (
                  <div 
                    key={`${item.type}-${item.id}`}
                    className={`crt-cart-item-card ${removingId === `${item.type}-${item.id}` ? 'removing' : ''}`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="crt-item-image-wrapper">
                      <img 
                        src={getItemImage(item)} 
                        alt={item.name}
                        className="crt-item-image"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = '/placeholder-image.jpg';
                        }}
                      />
                      <div className="crt-item-type-badge">
                        {item.type === 'hotel' ? (
                          <><Hotel size={12} /> Hotel</>
                        ) : (
                          <><Package size={12} /> Package</>
                        )}
                      </div>
                      <button 
                        className="crt-item-like-btn crt-active"
                        onClick={(e) => handleRemove(e, item)}
                        aria-label="Remove from favorites"
                      >
                        <Heart size={18} fill="currentColor" />
                      </button>
                    </div>

                    <div className="crt-item-content">
                      <div className="crt-item-header">
                        <h3 className="crt-item-title">{item.name}</h3>
                        <div className="crt-item-rating">
                          <Star size={14} fill="#fbbf24" color="#fbbf24" />
                          <span>{item.rating || '4.5'}</span>
                        </div>
                      </div>

                      <div className="crt-item-location">
                        <MapPin size={14} />
                        <span>{item.location || 'Shimla, Himachal Pradesh'}</span>
                      </div>

                      <p className="crt-item-description">
                        {item.description || item.shortDescription || 'Experience the best of Shimla with this amazing property. Perfect for your next vacation with excellent amenities and breathtaking views.'}
                      </p>

                      <div className="crt-item-features">
                        {item.type === 'hotel' ? (
                          <>
                            {(item.amenities || ['WiFi', 'Breakfast', 'Mountain View']).slice(0, 3).map((amenity, idx) => (
                              <span key={idx} className="crt-feature-tag">{amenity}</span>
                            ))}
                          </>
                        ) : (
                          <>
                            <span className="crt-feature-tag">
                              <Calendar size={12} /> {item.duration || '3 Days'}
                            </span>
                            <span className="crt-feature-tag">
                              <Users size={12} /> {item.groupSize || 'Max 10'}
                            </span>
                            <span className="crt-feature-tag">
                              <Clock size={12} /> Guided Tour
                            </span>
                          </>
                        )}
                      </div>

                      <div className="crt-item-footer">
                        <div className="crt-item-price">
                          <span className="crt-price-label">From</span>
                          <span className="crt-price-value">{getItemPrice(item)}</span>
                          {item.type === 'hotel' && <span className="crt-price-unit">/night</span>}
                        </div>
                        
                        <div className="crt-item-actions">
                          <button 
                            className="crt-btn-remove"
                            onClick={(e) => handleRemove(e, item)}
                          >
                            <Trash2 size={16} />
                            <span>Remove</span>
                          </button>
                          <button 
                            className="crt-btn-view"
                            onClick={() => handleViewDetails(item)}
                          >
                            <Eye size={16} />
                            <span>View Details</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Sticky Summary */}
            <div className="crt-cart-summary-section">
              <div className="crt-summary-card crt-sticky">
                <div className="crt-summary-header">
                  <ShoppingBag size={24} />
                  <h3>Cart Summary</h3>
                </div>

                <div className="crt-summary-stats">
                  <div className="crt-stat-row">
                    <span className="crt-stat-label">Hotels Saved</span>
                    <span className="crt-stat-value">{likedHotels.length}</span>
                  </div>
                  <div className="crt-stat-row">
                    <span className="crt-stat-label">Packages Saved</span>
                    <span className="crt-stat-value">{likedPackages.length}</span>
                  </div>
                  <div className="crt-stat-divider"></div>
                  <div className="crt-stat-row crt-total">
                    <span className="crt-stat-label">Total Items</span>
                    <span className="crt-stat-value">{totalLiked}</span>
                  </div>
                </div>

                <div className="crt-summary-price">
                  <span className="crt-price-label">Estimated Total</span>
                  <span className="crt-price-amount">₹{calculateTotal().toLocaleString()}</span>
                  <span className="crt-price-note">*Prices may vary based on dates</span>
                </div>

                <div className="crt-summary-actions">
                  <button 
                    className="crt-btn-checkout"
                    onClick={handleProceedToBook}
                  >
                    <span>Proceed to Book</span>
                    <ChevronRight size={18} />
                  </button>
                  
                  <Link to="/Hotel" className="crt-btn-continue">
  <Sparkles size={18} />
  <span>Add More Items</span>
</Link>
                </div>

                <div className="crt-summary-trust">
                  <div className="crt-trust-item">
                    <Shield size={16} />
                    <span>Secure Booking</span>
                  </div>
                  <div className="crt-trust-item">
                    <CheckCircle size={16} />
                    <span>Best Price Guarantee</span>
                  </div>
                  <div className="crt-trust-item">
                    <CreditCard size={16} />
                    <span>Free Cancellation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="crt-modal-overlay" onClick={() => setShowClearConfirm(false)}>
          <div className="crt-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="crt-modal-close" 
              onClick={() => setShowClearConfirm(false)}
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            <div className="crt-modal-icon crt-warning">
              <AlertCircle size={48} />
            </div>
            <h3>Clear all favorites?</h3>
            <p>Are you sure you want to remove all {totalLiked} items from your favorites? This action cannot be undone.</p>
            <div className="crt-modal-actions">
              <button className="crt-btn-modal-cancel" onClick={() => setShowClearConfirm(false)}>
                Keep Items
              </button>
              <button className="crt-btn-modal-confirm" onClick={handleClearAll}>
                <Trash2 size={18} />
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Multi-Item Booking Modal - ENHANCED */}
      {showMultiBookingModal && (
        <div className="crt-modal-overlay" onClick={() => setShowMultiBookingModal(false)}>
          <div className="crt-modal-content crt-multi-booking-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="crt-modal-close" 
              onClick={() => setShowMultiBookingModal(false)}
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            
            <div className="crt-multi-booking-header">
              <h2>Book Your Selection</h2>
              <p>Complete your booking for {totalLiked} items</p>
            </div>

            <div className="crt-multi-booking-content">
              {/* Selected Items Summary */}
              <div className="crt-selected-items-summary">
                <h3>Selected Items ({totalLiked})</h3>
                <div className="crt-selected-items-list">
                  {likedItems.map((item, idx) => (
                    <div key={idx} className="crt-selected-item-row">
                      <img src={getItemImage(item)} alt={item.name} loading="lazy" />
                      <div className="crt-selected-item-info">
                        <h4>{item.name}</h4>
                        <span className="crt-selected-item-type">
                          {item.type === 'hotel' ? (
                            <><Hotel size={12} /> Hotel</>
                          ) : (
                            <><Package size={12} /> Package</>
                          )}
                        </span>
                      </div>
                      <span className="crt-selected-item-price">{getItemPrice(item)}</span>
                    </div>
                  ))}
                </div>
                <div className="crt-selected-items-total">
                  <span>Total Estimated Price</span>
                  <strong>₹{calculateTotal().toLocaleString()}</strong>
                </div>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleMultiBookingSubmit} className="crt-multi-booking-form">
                <h3>Contact Information</h3>
                
                <div className="crt-form-row">
                  <div className="crt-form-field">
                    <label><User size={14} /> Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={bookingFormData.fullName}
                      onChange={handleBookingInputChange}
                      placeholder="Enter your full name"
                      required
                      autoComplete="name"
                    />
                  </div>
                </div>

                <div className="crt-form-row crt-two-col">
                  <div className="crt-form-field">
                    <label><Mail size={14} /> Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={bookingFormData.email}
                      onChange={handleBookingInputChange}
                      placeholder="your@email.com"
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div className="crt-form-field">
                    <label><Phone size={14} /> Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={bookingFormData.phone}
                      onChange={handleBookingInputChange}
                      placeholder="+91 98765 43210"
                      required
                      autoComplete="tel"
                    />
                  </div>
                </div>

                {likedHotels.length > 0 && (
                  <div className="crt-form-row crt-two-col">
                    <div className="crt-form-field">
                      <label><CalendarDays size={14} /> Check-in Date <span style={{color:'#dc2626'}}>*</span></label>
                      <input
                        type="date"
                        name="checkIn"
                        value={bookingFormData.checkIn}
                        onChange={handleBookingInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    <div className="crt-form-field">
                      <label><CalendarDays size={14} /> Check-out Date <span style={{color:'#dc2626'}}>*</span></label>
                      <input
                        type="date"
                        name="checkOut"
                        value={bookingFormData.checkOut}
                        onChange={handleBookingInputChange}
                        min={bookingFormData.checkIn || new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>
                )}

                {likedPackages.length > 0 && (
                  <>
                    <div className="crt-form-row">
                      <div className="crt-form-field">
                        <label><Calendar size={14} /> Travel Date <span style={{color:'#dc2626'}}>*</span></label>
                        <input
                          type="date"
                          name="travelDate"
                          value={bookingFormData.travelDate}
                          onChange={handleBookingInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                    </div>

                    <div className="crt-form-row">
                      <div className="crt-form-field">
                        <label>Pickup Location <span style={{color:'#6b7280',fontWeight:400}}>(optional)</span></label>
                        <input
                          type="text"
                          name="pickupLocation"
                          value={bookingFormData.pickupLocation}
                          onChange={handleBookingInputChange}
                          placeholder="e.g. Shimla Bus Stand, Railway Station..."
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="crt-form-row">
                  <div className="crt-form-field">
                    <label>Message (Optional)</label>
                    <textarea
                      name="specialRequests"
                      value={bookingFormData.specialRequests}
                      onChange={handleBookingInputChange}
                      placeholder="Any special requests or notes..."
                      rows="3"
                    />
                  </div>
                </div>

                <div className="crt-multi-booking-actions">
                  <button type="button" className="crt-btn-cancel" onClick={() => setShowMultiBookingModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="crt-btn-confirm-booking" disabled={multiBookingLoading}>
                    {multiBookingLoading ? (
                      <>Processing...</>
                    ) : (
                      <><CheckCircle size={18} /> Confirm Booking Request</>
                    )}
                  </button>
                </div>

                {multiBookingError && (
                  <div style={{ color: '#dc2626', fontSize: '14px', marginTop: '8px', padding: '8px 12px', background: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca' }}>
                    {multiBookingError}
                  </div>
                )}

                <div className="crt-booking-note">
                  <Shield size={14} />
                  <span>Our team will contact you within 24 hours to confirm your booking details.</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* VIEW DETAILS: Hotel Detail Modal */}
      {/* VIEW DETAILS: Hotel Detail Modal */}
{/* VIEW DETAILS: Hotel Detail Modal */}
{/* VIEW DETAILS: Hotel Detail Modal */}
{/* VIEW DETAILS: Hotel Detail Modal */}
{/* VIEW DETAILS: Hotel Detail Modal */}
{viewHotelDetails && (
  <div className="crt-sh-view-modal-overlay" onClick={() => setViewHotelDetails(null)}>
    <div className="crt-sh-view-modal-content" onClick={(e) => e.stopPropagation()}>
      <HotelDetailModal
        hotel={getFullHotelData(viewHotelDetails)}
        onClose={() => setViewHotelDetails(null)}
        onBook={() => handleBookFromView(getFullHotelData(viewHotelDetails))}
        isModal={true}
      />
    </div>
  </div>
)}

      {/* VIEW DETAILS: Package View Modal (Inline component) */}
      {/* VIEW DETAILS: Package View Modal (Inline component) */}
<PackageViewModal
  packageData={viewPackageDetails ? preparePackageData(viewPackageDetails) : null}
  isOpen={!!viewPackageDetails}
  onClose={() => setViewPackageDetails(null)}
  onBook={() => handleBookFromView({ ...viewPackageDetails, type: 'package' })}
/>
      {/* BOOKING: Hotel Booking Panel */}
{/* BOOKING: Package Booking Modal */}
{/* Toast Notification Popup */}
{toast.show && (
  <div className="crt-toast-overlay" onClick={hideToast}>
    <div 
      className={`crt-toast-popup toast-${toast.type} ${toast.show ? 'toast-show' : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="crt-toast-icon">
        {toast.type === 'success' && <CheckCircle size={28} color="#10b981" />}
        {toast.type === 'error' && <AlertCircle size={28} color="#ef4444" />}
        {toast.type === 'info' && <Sparkles size={28} color="#3b82f6" />}
      </div>
      
      <div className="crt-toast-content">
        <h4 className="crt-toast-title">{toast.message}</h4>
        {toast.subMessage && (
          <p className="crt-toast-subtitle">{toast.subMessage}</p>
        )}
      </div>
      
      <button className="crt-toast-close" onClick={hideToast}>
        <X size={18} />
      </button>
      
      <div className="crt-toast-progress-bar">
        <div className="crt-toast-progress-fill"></div>
      </div>
    </div>
  </div>
)}
      {/* Mobile Sticky Checkout Bar */}
      {totalLiked > 0 && (
        <div className="crt-mobile-sticky-checkout">
          <div className="crt-mobile-sticky-info">
            <span className="crt-mobile-sticky-label">Estimated Total</span>
            <span className="crt-mobile-sticky-price">₹{calculateTotal().toLocaleString()}</span>
          </div>
          <button 
            className="crt-mobile-sticky-btn"
            onClick={handleProceedToBook}
          >
            <span>Proceed to Book</span>
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default LikedCartPage;