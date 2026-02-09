import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./hotellisting.css";
import BookingPanel from "../../Components/Hotel/booking";
import ComparisonPanel from "../../Components/Hotel/ComparisonPanel";
import HotelDetailModal from "../../Components/Hotel/HotelDetailModal";
import Snowfall from "react-snowfall";
import {Facebook,Youtube, Instagram, Twitter, Mountain} from "lucide-react";

import { hotels, locations, allAmenities } from "../../Js Data/hotelData";

import {
  Search,
  SlidersHorizontal,
  Heart,
  GitCompare,
  Star,
  MapPin,
  TrendingUp,
  X,
} from "lucide-react";

export default function HotelListing() {
  const [search, setSearch] = useState("");
  const [filterRating, setFilterRating] = useState(0);
  const [priceFilter, setPriceFilter] = useState(25000);
  const [locationFilter, setLocationFilter] = useState("All Areas");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const [openBooking, setOpenBooking] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [detailModalHotel, setDetailModalHotel] = useState(null);

  const [favorites, setFavorites] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  /* -------------------- Local Storage -------------------- */

  useEffect(() => {
    const saved = localStorage.getItem("hotelFavorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("hotelFavorites", JSON.stringify(favorites));
  }, [favorites]);

  /* -------------------- Scroll Lock -------------------- */

  useEffect(() => {
    document.body.style.overflow =
      openBooking || detailModalHotel || showComparison
        ? "hidden"
        : "auto";
  }, [openBooking, detailModalHotel, showComparison]);

  /* -------------------- Handlers -------------------- */

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleCompare = (id) => {
    setCompareList((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length === 4) {
        alert("You can compare up to 4 hotels");
        return prev;
      }
      return [...prev, id];
    });
  };

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setFilterRating(0);
    setPriceFilter(25000);
    setLocationFilter("All Areas");
    setSelectedAmenities([]);
    setSortBy("popular");
  };

  /* -------------------- Filtering -------------------- */
let filteredHotels = hotels.filter((hotel) => {
  const matchesSearch = hotel.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesRating = hotel.rating >= filterRating;
  const matchesPrice = hotel.price <= priceFilter;

  const matchesLocation =
    locationFilter === "All Areas" ||
    hotel.area === locationFilter ||
    hotel.location?.includes(locationFilter);

  const matchesAmenities =
    selectedAmenities.length === 0 ||
    selectedAmenities.every((a) => hotel.amenities.includes(a));

  return (
    matchesSearch &&
    matchesRating &&
    matchesPrice &&
    matchesLocation &&
    matchesAmenities
  );
});


  filteredHotels.sort((a, b) => {
    if (sortBy === "priceLow") return a.price - b.price;
    if (sortBy === "priceHigh") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
  });

  const comparisonHotels = hotels.filter((h) =>
    compareList.includes(h.id)
  );

  const activeFiltersCount =
    (search ? 1 : 0) +
    (filterRating ? 1 : 0) +
    (priceFilter < 25000 ? 1 : 0) +
    (locationFilter !== "All Areas" ? 1 : 0) +
    selectedAmenities.length;

  /* -------------------- JSX -------------------- */

  return (
    <div className="hotel-list-page">
      <Snowfall color="#82C3D9"/>
      {/* HERO */}
      <div className="hotel-hero">
        <div className="hotel-hero-content">
          <h1>Discover Shimla's Finest Hotels</h1>
          <p>
            Experience luxury, comfort, and breathtaking mountain views
          </p>
        </div>
      </div>

      {/* FILTER BAR */}
{/* FILTER BAR - This must always be visible */}
<div className="filter-bar-sticky">
  <div className="filter-bar-content">
    <div className="search-box-main">
      <Search size={18} />
      <input
        placeholder="Search hotels by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <button onClick={() => setSearch("")}>
          <X size={14} />
        </button>
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

{/* FILTER PANEL - This shows/hides when filter button is clicked */}
{showFilters && (
  <div className="filter-panel-classic">
    <div className="filter-header-classic">
      <h3>Filter Hotels</h3>
      <button className="close-filter-classic" onClick={() => setShowFilters(false)}>
        <X size={18} />
      </button>
    </div>

    <div className="filter-body-classic">
      {/* Price Range */}
      <div className="filter-group-classic">
        <label className="filter-label-classic">Maximum Price per Night</label>
        <div className="price-value-classic">₹{priceFilter.toLocaleString()}</div>
        <input
          type="range"
          min="1000"
          max="25000"
          step="500"
          value={priceFilter}
          onChange={(e) => setPriceFilter(Number(e.target.value))}
          className="range-classic"
        />
        <div className="range-ends-classic">
          <span>₹1,000</span>
          <span>₹25,000</span>
        </div>
      </div>

      {/* Rating */}
      <div className="filter-group-classic">
        <label className="filter-label-classic">Minimum Rating</label>
        <div className="rating-options-classic">
          {[0, 3, 4, 4.5].map((r) => (
            <button
              key={r}
              className={`rating-btn-classic ${filterRating === r ? 'active' : ''}`}
              onClick={() => setFilterRating(r)}
            >
              {r === 0 ? 'Any' : `${r}+`}
              {r > 0 && <Star size={12} />}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="filter-group-classic">
        <label className="filter-label-classic">Location</label>
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="select-classic"
        >
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* Amenities */}
      <div className="filter-group-classic">
        <label className="filter-label-classic">Amenities</label>
        <div className="amenity-list-classic">
          {allAmenities.map((amenity) => (
            <label key={amenity} className="amenity-item-classic">
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
              />
              <span className="checkmark-classic"></span>
              <span className="amenity-text-classic">{amenity}</span>
            </label>
          ))}
        </div>
      </div>
    </div>

    <div className="filter-footer-classic">
      <button className="clear-classic" onClick={clearFilters}>
        Clear Filters
      </button>
      <button className="apply-classic" onClick={() => setShowFilters(false)}>
        Show {filteredHotels.length} Results
      </button>
    </div>
  </div>
)}
      {/* HOTEL CARDS */}
      <div className="hotel-cards">
        {filteredHotels.map((hotel) => (
          <div className="hotel-card" key={hotel.id}>
            {hotel.popular && (
              <div className="popular-badge">
                <TrendingUp size={14} /> Popular
              </div>
            )}

            <div className ="hotel-image"><img
              src={hotel.image}
              alt={hotel.name}
              onClick={() => setDetailModalHotel(hotel)}
            /></div>

            <h2 onClick={() => setDetailModalHotel(hotel)}>
              {hotel.name}
            </h2>

            <div className="hotel-location">
              <MapPin size={14} /> {hotel.location}
            </div>

            <div className="hotel-rating-row">
  <span className="rating-badge-left">⭐{hotel.rating}.0</span>
 
</div>


            <p>{hotel.description}</p>

            <div className="hotel-amenities">
  {hotel.amenities.slice(0, 5).map((a) => (
    <span key={a}>{a}</span>
  ))}
  {hotel.amenities.length > 4 && (
    <span className="more">+{hotel.amenities.length - 4} more</span>
  )}
</div>


            <div className="hotel-footer-card">
              <div className="hotel-price">
  From <strong>₹{hotel.price.toLocaleString()}</strong> / night
</div>


              <div className="card-actions">
                <button onClick={() => setDetailModalHotel(hotel)}>
                  View Details
                </button>
                <button
                  onClick={() => {
                    setSelectedHotel(hotel);
                    setOpenBooking(true);
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>

            <button
              className={`favorite-btn ${
                favorites.includes(hotel.id) ? "active" : ""
              }`}
              onClick={() => toggleFavorite(hotel.id)}
            >
              <Heart
                size={16}
                fill={
                  favorites.includes(hotel.id) ? "currentColor" : "none"
                }
              />
            </button>

            <button
              className={`compare-btn ${
                compareList.includes(hotel.id) ? "active" : ""
              }`}
              onClick={() => toggleCompare(hotel.id)}
            >
              <GitCompare size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* OVERLAYS */}
      {detailModalHotel && (
        <HotelDetailModal
          hotel={detailModalHotel}
          onClose={() => setDetailModalHotel(null)}
          onBook={() => {
            setSelectedHotel(detailModalHotel);
            setDetailModalHotel(null);
            setOpenBooking(true);
          }}
          isFavorite={favorites.includes(detailModalHotel.id)}
          onToggleFavorite={() =>
            toggleFavorite(detailModalHotel.id)
          }
        />
      )}

      {openBooking && selectedHotel && (
        <BookingPanel
          onClose={() => setOpenBooking(false)}
          name={selectedHotel.name}
          price={selectedHotel.price}
          rating={selectedHotel.rating}
          images={selectedHotel.images || [selectedHotel.image]} // ✅ FIX
        />
      )}

      {showComparison && comparisonHotels.length > 0 && ( // ✅ FIX
        <ComparisonPanel
          hotels={comparisonHotels}
          onRemove={(id) =>
            setCompareList((prev) => prev.filter((x) => x !== id))
          }
          onClose={() => setShowComparison(false)}
        />
      )}

            {/* ================= FOOTER ================= */}
<footer className="main-footer">
  <div className="footer-container">

    <div className="footer-grid">

      {/* Brand */}
      <div className="footer-brand">
        <div className="brand-row">
          <Mountain className="brand-icon" />
          <span className="brand-name">Shimla Travels</span>
        </div>
        <p>
          Your gateway to experiencing the magical beauty of Shimla and creating
          unforgettable memories in the Himalayas.
        </p>
      </div>

      {/* Quick Links */}
      <div className="footer-col">
        <h3>Quick Links</h3>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shimla#destinations">Destinations</Link></li>
            <li><Link to="/shimla#activities">Activities</Link></li>
            <li><Link to="/shimla#shimla-gallery" >Gallery</Link></li>
        </ul>
      </div>

      {/* Travel Info */}
      <div className="footer-col">
        <h3>Travel Info</h3>
        <ul>
          <li><Link to="/packagess">Travel Packages</Link></li>
          <li><Link to="/Hotel">Hotel Booking</Link></li>
          <li><a href="#">Travel Guide</a></li>
          <li><Link to="/About#FAQs">FAQs</Link></li>
        </ul>
      </div>

      {/* Social */}
      <div className="footer-col">
        <h3>Follow Us</h3>
        <p className="footer-subtext">
          Stay connected for travel updates and inspiration
        </p>
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
    </div>
  );
}
