import React, { useState, useCallback, memo } from "react";
// react-icons imports
import { 
  FaWifi, 
  FaCar, 
  FaCoffee, 
  FaSwimmingPool, 
  FaDumbbell, 
  FaUtensils, 
  FaSnowflake, 
  FaTv, 
  FaSpa, 
  FaWind,
  FaMountain,
  FaHotTub,
  FaYinYang,
  FaCheck,
  FaMapMarkerAlt,
  FaStar,
  FaHeart,
  FaShareAlt,
  FaChevronLeft,
  FaChevronRight,
  FaTimes
} from "react-icons/fa";
import { 
  MdRestaurant, 
  MdLocalLaundryService,
  MdRoomService,
  MdOutlineBalcony,
  MdOutlineFireplace
} from "react-icons/md";
import { 
  GiMountainCave,
  GiPathDistance,
  GiCctvCamera,
  GiDoorHandle
} from "react-icons/gi";
import { 
  BsSnow,
  BsFillPersonFill,
  BsFillTreeFill
} from "react-icons/bs";
import { 
  IoIosFitness 
} from "react-icons/io";
import {
  IoBookSharp
} from "react-icons/io5";
import "./HotelDetailModal.css";

// Comprehensive amenity icon mapping with react-icons
const amenityIcons = {
  // Connectivity
  "Free WiFi": FaWifi,
  "WiFi": FaWifi,
  "High-Speed Internet": FaWifi,
  "":IoBookSharp,
  
  // Parking & Transport
  "Parking": FaCar,
  "Free Parking": FaCar,
  "Valet Parking": FaCar,
  "Airport Shuttle": FaCar,
  
  // Food & Dining
  "Breakfast Included": FaCoffee,
  "Breakfast": FaCoffee,
  "Free Breakfast": FaCoffee,
  "Restaurant": FaUtensils,
  "Fine Dining": MdRestaurant,
  "Room Service": MdRoomService,
  "Kitchen": FaUtensils,
  "Bar": FaUtensils,
  "Mini Bar": FaUtensils,
  
  // Pool & Water
  "Heated Pool": FaSwimmingPool,
  "Swimming Pool": FaSwimmingPool,
  "Pool": FaSwimmingPool,
  "Infinity Pool": FaSwimmingPool,
  "Hot Tub": FaHotTub,
  "Jacuzzi": FaHotTub,
  "Infinity Jacuzzi": FaHotTub,
  "Spa": FaSpa,
  "Sauna": FaSpa,
  
  // Fitness & Wellness
  "Gym": FaDumbbell,
  "Fitness Center": IoIosFitness,
  "Yoga Classes": FaYinYang,
  "Yoga": FaYinYang,
  "Meditation": FaYinYang,
  "Wellness Center": FaSpa,
  
  // Climate & Comfort
  "AC": FaSnowflake,
  "Air Conditioning": FaSnowflake,
  "Heating": BsSnow,
  "Fireplace": MdOutlineFireplace,
  "Central Heating": BsSnow,
  
  // Entertainment
  "TV": FaTv,
  "Smart TV": FaTv,
  "Cable TV": FaTv,
  "Netflix": FaTv,
  
  // Services
  "Laundry": MdLocalLaundryService,
  "Laundry Service": MdLocalLaundryService,
  "Dry Cleaning": MdLocalLaundryService,
  "Housekeeping": MdLocalLaundryService,
  "24/7 Reception": GiDoorHandle,
  "Concierge": GiDoorHandle,
  "Security": GiCctvCamera,
  "Safe": GiCctvCamera,
  
  // Views & Nature
  "Mountain View": FaMountain,
  "Mountain Trails": GiPathDistance,
  "Garden View": BsFillTreeFill,
  "Valley View": FaMountain,
  "Lake View": FaSwimmingPool,
  "Nature Walks": GiMountainCave,
  "Camping": GiMountainCave,
  "Balcony": MdOutlineBalcony,
  "Terrace": MdOutlineBalcony,
  
  // Default
  "default": FaCheck
};

const AmenityItem = memo(({ amenity }) => {
  const Icon = amenityIcons[amenity] || amenityIcons["default"];
  return (
    <div className="amenity-item-simple">
      <Icon size={18} />
      <span>{amenity}</span>
    </div>
  );
});

const RoomCard = memo(({ room, isSelected, onSelect }) => (
  <div
    className={`room-card-simple ${isSelected ? "selected" : ""}`}
    onClick={onSelect}
  >
    <div className="room-header-simple">
      <h4>{room.type}</h4>
      <div className="room-price-simple">
        <span>₹{room.price.toLocaleString()}</span>
        <small>/night</small>
      </div>
    </div>
    <div className="room-features-simple">
      {room.features.slice(0, 3).map((f, i) => (
        <span key={i}>
          <FaCheck size={10} /> {f}
        </span>
      ))}
    </div>
  </div>
));

const NearbyItem = memo(({ place }) => (
  <div className="nearby-item-simple">
    <FaMapMarkerAlt size={14} />
    <span>{place}</span>
  </div>
));

export default function HotelDetailModal({
  hotel,
  onClose,
  onBook,
  isFavorite,
  onToggleFavorite,
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedRoomType, setSelectedRoomType] = useState(hotel.roomTypes[0]);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === hotel.images.length - 1 ? 0 : prev + 1
    );
  }, [hotel.images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? hotel.images.length - 1 : prev - 1
    );
  }, [hotel.images.length]);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: hotel.name,
        text: hotel.description,
        url: window.location.href,
      });
    } else {
      alert("Share not supported");
    }
  }, [hotel.name, hotel.description]);

  const handleRoomSelect = useCallback((room) => {
    setSelectedRoomType(room);
  }, []);

  return (
    <div className="modal-overlay-scroll" onClick={onClose}>
      <div className="modal-container-scroll" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button - Fixed at top */}
        <button className="modal-close-scroll" onClick={onClose}>
          <FaTimes size={20} />
        </button>

        {/* SCROLLABLE CONTENT - Everything scrolls together */}
        <div className="modal-scroll-content">
          
          {/* IMAGE SECTION - Now scrolls */}
          <div className="modal-image-section-scroll">
            <div className="image-gallery-scroll">
              <img
                src={hotel.images[currentImageIndex]}
                alt={hotel.name}
                className="gallery-image-scroll"
                loading="lazy"
              />
              
              {hotel.images.length > 1 && (
                <>
                  <button className="gallery-btn-scroll prev-btn" onClick={prevImage}>
                    <FaChevronLeft size={24} />
                  </button>
                  <button className="gallery-btn-scroll next-btn" onClick={nextImage}>
                    <FaChevronRight size={24} />
                  </button>
                </>
              )}

              <div className="image-counter-scroll">
                {currentImageIndex + 1} / {hotel.images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {hotel.images.length > 1 && (
              <div className="thumbnail-strip-scroll">
                {hotel.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt=""
                    className={idx === currentImageIndex ? "active" : ""}
                    onClick={() => setCurrentImageIndex(idx)}
                    loading="lazy"
                  />
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="modal-actions-scroll">
              <button
                className={`action-btn-scroll ${isFavorite ? "active" : ""}`}
                onClick={onToggleFavorite}
              >
                <FaHeart size={18} color={isFavorite ? "#ef4444" : "currentColor"} />
                <strong>{isFavorite ? "Saved" : "Save"}</strong>
              </button>

              <button className="action-btn-scroll" onClick={handleShare}>
                <FaShareAlt size={18} />
                <strong>Share</strong>
              </button>
            </div>
          </div>

          {/* CONTENT SECTION - Scrolls with image */}
          <div className="content-section-scroll">
            {/* Header */}
            <div className="content-header-scroll">
              <div className="title-row">
                <h1>{hotel.name}</h1>
              </div>
              
              <div className="meta-row">
                <span className="rating-badge-scroll">
                  <FaStar size={14} color="#f59e0b" /> {hotel.rating}.0
                </span>
                <span className="location-scroll">
                  <FaMapMarkerAlt size={14} /> {hotel.location}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="description-scroll">{hotel.description}</p>

            {/* Amenities */}
            <div className="section-scroll">
              <h3>What this place offers</h3>
              <div className="amenities-scroll-row">
                {hotel.amenities.map((a, i) => (
                  <AmenityItem key={i} amenity={a} />
                ))}
              </div>
            </div>

            {/* Room Types */}
            <div className="section-scroll">
              <h3>Select Room</h3>
              <div className="rooms-list">
                {hotel.roomTypes.map((room, i) => (
                  <RoomCard
                    key={i}
                    room={room}
                    isSelected={selectedRoomType === room}
                    onSelect={() => handleRoomSelect(room)}
                  />
                ))}
              </div>
            </div>

            {/* Nearby */}
            <div className="section-scroll">
              <h3>Nearby Attractions</h3>
              <div className="nearby-grid">
                {hotel.nearby.map((p, i) => (
                  <NearbyItem key={i} place={p} />
                ))}
              </div>
            </div>
          </div>

          {/* Footer - Inside scroll area */}
          <div className="footer-scroll">
            <div className="price-scroll">
              <small>From</small>
              <strong>₹{selectedRoomType.price.toLocaleString()}</strong>
              <small>/night</small>
            </div>
            <button className="book-btn-scroll" onClick={onBook}>
              Book Now
            </button>
          </div>

          {/* Bottom spacer for better scrolling */}
          <div className="bottom-spacer"></div>
        </div>
      </div>
    </div>
  );
}