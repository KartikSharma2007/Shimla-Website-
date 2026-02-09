import React from "react";
import "./ComparisonPanel.css";
import { X, Star, MapPin, Check } from "lucide-react";

export default function ComparisonPanel({ hotels, onRemove, onClose }) {
  if (!hotels || hotels.length === 0) return null;

  const allAmenities = Array.from(
    new Set(hotels.flatMap((h) => h.amenities))
  ).sort();

  return (
    <div className="comparison-overlay" onClick={onClose}>
      <div
        className="comparison-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="comparison-header">
          <h2>Compare Hotels ({hotels.length})</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="comparison-content">
          <div className="comparison-grid">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="comparison-card">
                <button
                  className="remove-btn"
                  onClick={() => onRemove(hotel.id)}
                >
                  <X size={16} />
                </button>

                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="comparison-image"
                />

                <div className="comparison-details">
                  <h3>{hotel.name}</h3>

                  <div className="comparison-location">
                    <MapPin size={14} />
                    {hotel.location}
                  </div>

                  <div className="comparison-rating">
                    <Star size={14} fill="#FFD700" />
                    {hotel.rating}.0
                    <span className="reviews">
                      ({hotel.totalReviews})
                    </span>
                  </div>

                  <div className="comparison-price">
                    ₹{hotel.price}/night
                  </div>

                  {hotel.deal && (
                    <div className="comparison-deal">
                      {hotel.deal}
                    </div>
                  )}

                  {/* AMENITIES */}
                  <div className="comparison-amenities">
                    <h4>Amenities</h4>
                    <div className="amenities-comparison">
                      {allAmenities.map((amenity) => {
                        const hasAmenity =
                          hotel.amenities.includes(amenity);

                        return (
                          <div
                            key={amenity}
                            className={`amenity-check ${
                              hasAmenity ? "has" : "missing"
                            }`}
                          >
                            {hasAmenity ? (
                              <Check size={14} />
                            ) : (
                              <span className="no-check">—</span>
                            )}
                            <span>{amenity}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ROOMS */}
                  <div className="comparison-rooms">
                    <h4>Room Types</h4>
                    <ul>
                      {hotel.roomTypes.map((room, idx) => (
                        <li key={idx}>
                          {room.type} — ₹{room.price}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
