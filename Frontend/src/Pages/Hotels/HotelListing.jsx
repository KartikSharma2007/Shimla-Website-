import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./hotellisting.css";
import BookingPanel from "../../Components/Hotel/booking";
import ComparisonPanel from "../../Components/Hotel/ComparisonPanel";
import { useLiked } from '../../Components/LikedCart/LikedContext';
import Snowfall from "react-snowfall";
import { Facebook, Youtube, Instagram, Twitter, Mountain, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from '../../context/AuthContext';
import LoginPromptModal from '../../Components/Common/LoginPromptModal';
import { hotels, locations, allAmenities } from "../../data/hotelData";
import { Search, SlidersHorizontal, Heart, GitCompare, Star, MapPin, TrendingUp, X } from "lucide-react";
// Fix #18 — skeleton loaders and error/empty states
import { HotelSkeletonGrid, ErrorState, EmptyState } from "../../Components/Common/SkeletonCard";

export default function HotelListing() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterRating, setFilterRating] = useState(0);
  const [priceFilter, setPriceFilter] = useState(25000);
  const [locationFilter, setLocationFilter] = useState("All Areas");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const { isAuthenticated } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [openBooking, setOpenBooking] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const { toggleLiked, isLiked } = useLiked();
  const [compareList, setCompareList] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 10;

  // Fix #18 — loading and error state for skeleton loader
  // Currently hotels come from static data so isLoading starts false.
  // When you migrate to API calls, set isLoading=true while fetching.
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // No overflow lock needed — booking navigates to full page

  const toggleFavorite = (hotel) => {
    if (!isAuthenticated) { setShowLoginPrompt(true); return; }
    toggleLiked({
      id: hotel.id, type: 'hotel', name: hotel.name,
      location: hotel.location, price: hotel.price,
      image: hotel.image, rating: hotel.rating,
    });
  };

  const toggleCompare = (id) => {
    setCompareList((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length === 4) { alert("You can compare up to 4 hotels"); return prev; }
      return [...prev, id];
    });
  };

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const clearFilters = () => {
    setSearch(""); setFilterRating(0); setPriceFilter(25000);
    setLocationFilter("All Areas"); setSelectedAmenities([]);
    setSortBy("popular"); setCurrentPage(1);
  };

  let filteredHotels = hotels.filter((hotel) => {
    const matchesSearch   = hotel.name.toLowerCase().includes(search.toLowerCase());
    const matchesRating   = hotel.rating >= filterRating;
    const matchesPrice    = hotel.price <= priceFilter;
    const matchesLocation = locationFilter === "All Areas" || hotel.area === locationFilter || hotel.location?.includes(locationFilter);
    const matchesAmenities = selectedAmenities.length === 0 || selectedAmenities.every((a) => hotel.amenities.includes(a));
    return matchesSearch && matchesRating && matchesPrice && matchesLocation && matchesAmenities;
  });

  filteredHotels.sort((a, b) => {
    if (sortBy === "priceLow")  return a.price - b.price;
    if (sortBy === "priceHigh") return b.price - a.price;
    if (sortBy === "rating")    return b.rating - a.rating;
    return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
  });

  const totalPages  = Math.ceil(filteredHotels.length / hotelsPerPage);
  const startIndex  = (currentPage - 1) * hotelsPerPage;
  const endIndex    = startIndex + hotelsPerPage;
  const currentHotels = filteredHotels.slice(startIndex, endIndex);

  useEffect(() => { setCurrentPage(1); }, [search, filterRating, priceFilter, locationFilter, selectedAmenities, sortBy]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const section = document.querySelector('.h-cards-grid');
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const comparisonHotels = hotels.filter((h) => compareList.includes(h.id));

  const activeFiltersCount =
    (search ? 1 : 0) + (filterRating ? 1 : 0) +
    (priceFilter < 25000 ? 1 : 0) +
    (locationFilter !== "All Areas" ? 1 : 0) +
    selectedAmenities.length;

  /* -------------------- Pagination Component -------------------- */
  const Pagination = () => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const max = 5;
      if (totalPages <= max) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...'); pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1); pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1); pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...'); pages.push(totalPages);
      }
      return pages;
    };

    return (
      <div className="h-pagination">
        <div className="h-pagination-info">
          Showing {startIndex + 1}–{Math.min(endIndex, filteredHotels.length)} of {filteredHotels.length} hotels
        </div>
        <div className="h-pagination-controls">
          <button
            className={`h-page-btn h-page-nav ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={18} />
            <span className="h-nav-text">Prev</span>
          </button>

          <div className="h-page-numbers h-desktop-only">
            {getPageNumbers().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="h-page-ellipsis">...</span>
                ) : (
                  <button
                    className={`h-page-btn h-page-number ${currentPage === page ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="h-page-numbers h-mobile-only">
            <span className="h-page-mobile-info">Page {currentPage} of {totalPages}</span>
          </div>

          <button
            className={`h-page-btn h-page-nav ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span className="h-nav-text">Next</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  };

  /* -------------------- JSX -------------------- */
  return (
    <div className="h-page">
      <Snowfall color="#82C3D9" />

      {/* HERO */}
      <div className="h-hero">
        <div className="h-hero-content">
          <h1>Discover Shimla's Finest Hotels</h1>
          <p>Experience luxury, comfort, and breathtaking mountain views</p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="h-filter-bar">
        <div className="h-filter-bar-inner">
          <div className="h-search-box">
            <Search size={18} />
            <input
              placeholder="Search hotels by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch("")}><X size={14} /></button>
            )}
          </div>

          <button onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal size={18} /> Filters
            {activeFiltersCount > 0 && ` (${activeFiltersCount})`}
          </button>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="popular">Most Popular</option>
            <option value="priceLow">Price: Low → High</option>
            <option value="priceHigh">Price: High → Low</option>
            <option value="rating">Highest Rated</option>
          </select>

          {compareList.length > 0 && (
            <button onClick={() => setShowComparison(true)}>
              <GitCompare size={18} /> Compare ({compareList.length})
            </button>
          )}
        </div>
      </div>

      {/* FILTER PANEL */}
      {showFilters && (
        <div className="h-filter-panel">
          <div className="h-filter-header">
            <h3>Filter Hotels</h3>
            <button className="h-filter-close" onClick={() => setShowFilters(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="h-filter-body">
            {/* Price Range */}
            <div className="h-filter-group">
              <label className="h-filter-label">Maximum Price per Night</label>
              <div className="h-price-value">₹{priceFilter.toLocaleString()}</div>
              <input
                type="range" min="1000" max="25000" step="500"
                value={priceFilter}
                onChange={(e) => setPriceFilter(Number(e.target.value))}
                className="h-range"
              />
              <div className="h-range-ends">
                <span>₹1,000</span>
                <span>₹25,000</span>
              </div>
            </div>

            {/* Rating */}
            <div className="h-filter-group">
              <label className="h-filter-label">Minimum Rating</label>
              <div className="h-rating-options">
                {[0, 3, 4, 4.5].map((r) => (
                  <button
                    key={r}
                    className={`h-rating-btn ${filterRating === r ? 'active' : ''}`}
                    onClick={() => setFilterRating(r)}
                  >
                    {r === 0 ? 'Any' : `${r}+`}
                    {r > 0 && <Star size={12} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="h-filter-group">
              <label className="h-filter-label">Location</label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="h-select"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Amenities */}
            <div className="h-filter-group">
              <label className="h-filter-label">Amenities</label>
              <div className="h-amenity-list">
                {allAmenities.map((amenity) => (
                  <label key={amenity} className="h-amenity-item">
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)}
                    />
                    <span className="h-checkmark"></span>
                    <span className="h-amenity-text">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="h-filter-footer">
            <button className="h-btn-clear" onClick={clearFilters}>Clear Filters</button>
            <button className="h-btn-apply" onClick={() => setShowFilters(false)}>
              Show {filteredHotels.length} Results
            </button>
          </div>
        </div>
      )}

      {/* Fix #18 — Show skeleton while loading, error state on failure, empty state when no results */}
      {isLoading && (
        <div style={{ padding: '0 20px' }}>
          <HotelSkeletonGrid count={6} />
        </div>
      )}

      {!isLoading && fetchError && (
        <ErrorState
          message="Could not load hotels. Please check your connection and try again."
          onRetry={() => { setFetchError(null); setIsLoading(false); }}
        />
      )}

      {!isLoading && !fetchError && currentHotels.length === 0 && (
        <EmptyState
          message="No hotels match your search."
          hint="Try adjusting your filters or search term."
        />
      )}

      {/* HOTEL CARDS */}
      <div className="h-cards-grid" style={{ display: isLoading || fetchError ? 'none' : undefined }}>
        {currentHotels.map((hotel) => (
          <div className="h-card" key={hotel.id}>
            {hotel.popular && (
              <div className="h-popular-badge">
                <TrendingUp size={14} /> Popular
              </div>
            )}

            <div className="h-card-image">
              <img loading="lazy"
                src={hotel.image}
                alt={hotel.name}
                onClick={() => navigate(`/hotel/${hotel.id}`)}
                style={{ cursor: 'pointer' }}
              />
            </div>

            <h2 onClick={() => navigate(`/hotel/${hotel.id}`)} style={{ cursor: 'pointer' }}>
              {hotel.name}
            </h2>

            <div className="h-card-location">
              <MapPin size={14} /> {hotel.location}
            </div>

            <div className="h-card-rating-row">
              <span className="h-rating-badge">⭐{hotel.rating}</span>
            </div>

            <p>{hotel.description}</p>

            <div className="h-card-amenities">
              {hotel.amenities.slice(0, 5).map((a) => (
                <span key={a}>{a}</span>
              ))}
              {hotel.amenities.length > 4 && (
                <span className="h-more">+{hotel.amenities.length - 4} more</span>
              )}
            </div>

            <div className="h-card-footer">
              <div className="h-card-price">
                From <strong>₹{hotel.price.toLocaleString()}</strong> / night
              </div>
              <div className="h-card-actions">
                <button onClick={() => navigate(`/hotel/${hotel.id}`)}>View Details</button>
                <button onClick={() => { setSelectedHotel(hotel); setOpenBooking(true); }}>
                  Book Now
                </button>
              </div>
            </div>

            <button
              className={`h-fav-btn ${isLiked(hotel.id, 'hotel') ? "active" : ""}`}
              onClick={() => toggleFavorite(hotel)}
            >
              <Heart size={16} fill={isLiked(hotel.id, 'hotel') ? "currentColor" : "none"} />
            </button>

            <button
              className={`h-compare-btn ${compareList.includes(hotel.id) ? "active" : ""}`}
              onClick={() => toggleCompare(hotel.id)}
            >
              <GitCompare size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <Pagination />

      {/* BOOKING PANEL */}
      {openBooking && selectedHotel && (
        <BookingPanel
          onClose={() => setOpenBooking(false)}
          hotelId={selectedHotel.id}
          name={selectedHotel.name}
          price={selectedHotel.price}
          rating={selectedHotel.rating}
          images={selectedHotel.images || [selectedHotel.image]}
          roomTypes={selectedHotel.roomTypes}
        />
      )}

      {/* COMPARISON PANEL */}
      {showComparison && comparisonHotels.length > 0 && (
        <ComparisonPanel
          hotels={comparisonHotels}
          onRemove={(id) => setCompareList((prev) => prev.filter((x) => x !== id))}
          onClose={() => setShowComparison(false)}
        />
      )}

      {/* FOOTER */}
      <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="brand-row">
                <Mountain className="brand-icon" />
                <span className="brand-name">Shimla Travels</span>
              </div>
              <p>Your gateway to experiencing the magical beauty of Shimla and creating unforgettable memories in the Himalayas.</p>
            </div>
            <div className="footer-col">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shimla#destinations">Destinations</Link></li>
                <li><Link to="/shimla#activities">Activities</Link></li>
                <li><Link to="/shimla#shimla-gallery">Gallery</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>Travel Info</h3>
              <ul>
                <li><Link to="/packages">Travel Packages</Link></li>
                <li><Link to="/Hotel">Hotel Booking</Link></li>
                <li><Link to="/shimla#Travel">Travel Guide</Link></li>
                <li><Link to="/About#FAQs">FAQs</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>Legal</h3>
              <ul>
                <li><Link to="/Terms#terms">Terms & Conditions</Link></li>
                <li><Link to="/Terms#privacy">Privacy Policy</Link></li>
                <li><Link to="/Terms#cancellation">Cancellation Policy</Link></li>
                <li><Link to="/Terms#payment">Payment Policy</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>Follow Us</h3>
              <p className="footer-subtext">Stay connected for travel updates and inspiration</p>
              <div className="footer-socials">
                <a href="#"><Facebook /></a>
                <a href="#"><Instagram /></a>
                <a href="#"><Twitter /></a>
                <a href="#"><Youtube /></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Shimla Travels. All rights reserved. Made with ❤️ for travelers.</p>
          </div>
        </div>
      </footer>

      <LoginPromptModal
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        message="Login or create a free account to save hotels and packages to your cart."
      />
    </div>
  );
}
