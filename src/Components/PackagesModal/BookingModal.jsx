import { useState } from 'react';
import './BookingModal.css';
import { X, User, Phone, Mail, Calendar, MapPin, Users, Baby, MessageSquare, CheckCircle } from 'lucide-react';

function BookingModal({ isOpen, onClose, packageData }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    adults: 1,
    children: 0,
    travelDate: '',
    pickupLocation: '',
    specialRequirements: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !packageData) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        adults: 1,
        children: 0,
        travelDate: '',
        pickupLocation: '',
        specialRequirements: ''
      });
      onClose();
    }, 3000);
  };

  const totalTravelers = parseInt(formData.adults) + parseInt(formData.children);
  const totalPrice = packageData.price * parseInt(formData.adults) + (packageData.price * 0.7 * parseInt(formData.children));

  return (
    <div className="modal-overlayy" onClick={onClose}>
      <div className="modal-containerr" onClick={(e) => e.stopPropagation()}>
        {!isSubmitted ? (
          <>
            <button className="modal-close-btn" onClick={onClose}>
              <X size={24} />
            </button>

            <div className="modal-headerr">
              <h2 className="modal-titlee">Book Your Dream Vacation</h2>
              <p className="modal-subtitlee">Complete the form below to confirm your booking</p>
            </div>

            <div className="modal-contentt">
              <div className="booking-summary">
                <img src={packageData.image} alt={packageData.title} className="summary-image" />
                <div className="summary-details">
                  <h3 className="summary-title">{packageData.title}</h3>
                  <div className="summary-info">
                    <span className="summary-duration">{packageData.duration}</span>
                    <span className="summary-category">{packageData.category}</span>
                  </div>
                  <div className="summary-price">
                    <span className="price-label">Starting from</span>
                    <span className="price-value">₹{packageData.price.toLocaleString('en-IN')}</span>
                    <span className="price-per">per adult</span>
                  </div>
                </div>
              </div>

              <form className="booking-form" onSubmit={handleSubmit}>
                <div className="form-section">
                  <h4 className="section-title">Personal Information</h4>

                  <div className="form-group">
                    <label className="form-label">
                      <User size={16} />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <Phone size={16} />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="+91 XXXXX XXXXX"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <Mail size={16} />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h4 className="section-title">Travel Details</h4>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <Users size={16} />
                        Number of Adults *
                      </label>
                      <input
                        type="number"
                        name="adults"
                        value={formData.adults}
                        onChange={handleChange}
                        className="form-input"
                        min="1"
                        max="20"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <Baby size={16} />
                        Number of Children
                      </label>
                      <input
                        type="number"
                        name="children"
                        value={formData.children}
                        onChange={handleChange}
                        className="form-input"
                        min="0"
                        max="20"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <Calendar size={16} />
                        Travel Date *
                      </label>
                      <input
                        type="date"
                        name="travelDate"
                        value={formData.travelDate}
                        onChange={handleChange}
                        className="form-input"
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <MapPin size={16} />
                        Pickup Location *
                      </label>
                      <input
                        type="text"
                        name="pickupLocation"
                        value={formData.pickupLocation}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="e.g., Delhi, Chandigarh"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <MessageSquare size={16} />
                      Special Requirements
                    </label>
                    <textarea
                      name="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={handleChange}
                      className="form-textarea"
                      placeholder="Any dietary restrictions, accessibility needs, or special requests..."
                      rows="3"
                    />
                  </div>
                </div>

                <div className="price-summary">
                  <h4 className="section-title">Price Summary</h4>
                  <div className="price-breakdown">
                    <div className="price-row">
                      <span>Adults ({formData.adults} × ₹{packageData.price.toLocaleString('en-IN')})</span>
                      <span>₹{(packageData.price * formData.adults).toLocaleString('en-IN')}</span>
                    </div>
                    {formData.children > 0 && (
                      <div className="price-row">
                        <span>Children ({formData.children} × ₹{Math.round(packageData.price * 0.7).toLocaleString('en-IN')})</span>
                        <span>₹{Math.round(packageData.price * 0.7 * formData.children).toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="price-row total-row">
                      <span>Total Amount</span>
                      <span className="total-amount">₹{Math.round(totalPrice).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="price-note">
                      Total travelers: {totalTravelers} person{totalTravelers > 1 ? 's' : ''}
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-cancel" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-confirm">
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="success-container">
            <div className="success-icon-wrapper">
              <CheckCircle size={80} className="success-icon" />
            </div>
            <h2 className="success-title">Booking Confirmed!</h2>
            <p className="success-message">
              Thank you for booking with Shimla Travel Agency. Our team will contact you shortly at {formData.phone} to confirm your reservation.
            </p>
            <div className="success-details">
              <p><strong>Booking Reference:</strong> STA{Date.now().toString().slice(-8)}</p>
              <p><strong>Package:</strong> {packageData.title}</p>
              <p><strong>Travel Date:</strong> {new Date(formData.travelDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingModal;
