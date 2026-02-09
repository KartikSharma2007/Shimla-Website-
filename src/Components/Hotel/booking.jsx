import React, { useState } from "react";
import { 
  FaTimes, 
  FaCalendarAlt, 
  FaUserFriends, 
  FaStar, 
  FaCheckCircle,
  FaShieldAlt,
  FaCreditCard,
  FaBed,
  FaPhone,
  FaEnvelope,
  FaUser
} from "react-icons/fa";
import "./booking.css";

export default function BookingPanel({
  onClose,
  name,
  price,
  rating,
  images,
}) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showPopup, setShowPopup] = useState(false);
const [popupMessage, setPopupMessage] = useState("");

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const totalPrice = nights * price * rooms;
  const tax = Math.round(totalPrice * 0.18);
  const grandTotal = totalPrice + tax;

  const handleSubmit = (e) => {
  e.preventDefault();
  setPopupMessage(`Booking confirmed for ${name}!\nTotal: ₹${grandTotal.toLocaleString()}`);
  setShowPopup(true);
};
const closePopup = () => {
  setShowPopup(false);
  onClose(); // Close the booking modal too
};

  return (
    <div className="booking-overlay-new" onClick={onClose}>
      <div className="booking-panel-new" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button className="booking-close-new" onClick={onClose}>
          <FaTimes size={20} />
        </button>

        <div className="booking-layout">
          
          {/* LEFT SIDE - Hotel Info & Image */}
          <div className="booking-left">
            <div className="hotel-card-new">
              <div className="hotel-image-wrap">
                <img src={images[0]} alt={name} />
                <div className="image-badge">
                  <FaStar size={12} /> {rating}.0
                </div>
              </div>
              <div className="hotel-info-new">
                <h2>{name}</h2>
                <div className="price-tag">
                  <span>₹{price.toLocaleString()}</span>
                  <small>/night</small>
                </div>
              </div>
            </div>

            {/* Price Breakdown - Sticky on left */}
            <div className="price-breakdown">
              <h4>Price Details</h4>
              <div className="breakdown-row">
                <span>₹{price.toLocaleString()} × {nights || 0} nights × {rooms} room{rooms > 1 ? 's' : ''}</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
              <div className="breakdown-row">
                <span>Taxes & Fees (18%)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
              <div className="breakdown-total">
                <span>Total</span>
                <strong>₹{grandTotal.toLocaleString()}</strong>
              </div>
              <div className="payment-badge">
                <FaCreditCard />
                <span>Pay at Property</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Form */}
          <div className="booking-right">
            <form onSubmit={handleSubmit} className="booking-form-new">
              
              {/* Section 1: Dates */}
              <div className="form-section-new">
                <h3>
                  <FaCalendarAlt /> Select Dates
                </h3>
                <div className="dates-row">
                  <div className="input-box">
                    <label>Check-in</label>
                    <div className="input-icon">
                      <FaCalendarAlt />
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>
                  </div>
                  <div className="input-box">
                    <label>Check-out</label>
                    <div className="input-icon">
                      <FaCalendarAlt />
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        min={checkIn}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {nights > 0 && (
                  <div className="nights-badge">
                    <FaBed /> {nights} night{nights > 1 ? 's' : ''} selected
                  </div>
                )}
              </div>

              {/* Section 2: Guests */}
              <div className="form-section-new">
                <h3>
                  <FaUserFriends /> Guests & Rooms
                </h3>
                <div className="selects-row">
                  <div className="select-box">
                    <label>Guests</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(+e.target.value)}
                    >
                      {[1,2,3,4,5,6,7,8].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="select-box">
                    <label>Rooms</label>
                    <select
                      value={rooms}
                      onChange={(e) => setRooms(+e.target.value)}
                    >
                      {[1,2,3,4,5].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Room" : "Rooms"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3: Guest Info */}
              <div className="form-section-new">
                <h3>
                  <FaUser /> Guest Details
                </h3>
                <div className="guest-inputs">
                  <div className="input-box full">
                    <label>Full Name</label>
                    <div className="input-icon">
                      <FaUser />
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="input-box full">
                    <label>Email Address</label>
                    <div className="input-icon">
                      <FaEnvelope />
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="input-box full">
                    <label>Phone Number</label>
                    <div className="input-icon">
                      <FaPhone />
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                className="submit-btn-new"
                disabled={nights === 0}
              >
                {nights === 0 ? (
                  "Select Dates to Continue"
                ) : (
                  <>
                    <FaCheckCircle /> Confirm Booking - ₹{grandTotal.toLocaleString()}
                  </>
                )}
              </button>

              <p className="security-note">
                <FaShieldAlt /> You won't be charged yet. Pay at property.
              </p>
            </form>
          </div>
        </div>
        {/* Success Popup */}
        {showPopup && (
        <div className="success-popup-overlay" onClick={closePopup}>
          <div className="success-popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-icon">✓</div>
              <h3>Booking Confirmed!</h3>
              <p>{popupMessage}</p>
              <button className="popup-btn" onClick={closePopup}>
              Great!
              </button>
          </div>
        </div>
            )}
      </div>
    </div>
  );
}