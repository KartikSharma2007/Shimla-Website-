import { useState } from 'react';
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Send, Check, Clock, MessageCircle, Facebook,Youtube, Instagram, Twitter, Mountain } from 'lucide-react';
import './ContactUs.css';

export default function ContactUs() {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });

      setTimeout(() => setShowSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  


  return (
    <div className="page">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-backgroun">
          <div className="hero-background-image"></div>
        </div>

        <div className="hero-content fade-in">
          <h1 className="hero-title">Get in Touch</h1>
          <p className="hero-subtitle">
            Your journey to the hills begins with a conversation.
            We're here to help plan your perfect Shimla escape.
          </p>

          <div className="hero-badges">
            <div className="hero-badge">
              <Clock size={16} />
              <span>24/7 Support</span>
            </div>
            <div className="hero-badge">
              <MessageCircle size={16} />
              <span>Instant Response</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="cards-section">
        <div className="cards-grid">

          <div className="contact-card">
            <div className="card-icon" style={{ background: 'linear-gradient(135deg,#059669,#0d9488)' }}>
              <Phone color="white" />
            </div>
            <h3 className="card-title">Phone Support</h3>
            <p className="card-highlight">+91 98765 43210</p>
            <p className="card-highlight">+91 88990 11223</p>
            <p className="card-description">Available 24/7 for your queries</p>
          </div>

          <div className="contact-card">
            <div className="card-icon" style={{ background: 'linear-gradient(135deg,#06b6d4,#2563eb)' }}>
              <Mail color="white" />
            </div>
            <h3 className="card-title">Email Support</h3>
            <p className="card-highlight1">support@shimlatravels.com</p>
            <p className="card-highlight1">info@shimlatravel.com</p>
            <p className="card-description">Quick email responses within hours</p>
          </div>

          <div className="contact-card">
            <div className="card-icon" style={{ background: 'linear-gradient(135deg,#14b8a6,#059669)' }}>
              <MapPin color="white" />
            </div>
            <h3 className="card-title">Visit Our Office</h3>
            <p className="card-highlight">Shimla Travel Agency</p>
            <p className="card-highlight">Mall Road, Shimla</p>
            <p className="card-description">Mon – Sat: 9:00AM – 7:00PM</p>
          </div>

        </div>
      </section>

      {/* Info + Form */}
      <section className="info-section">

        <div>
          <h2 className="info-title">
            Let's Plan Your Perfect
            <span className="info-gradient-text"> Shimla Adventure</span>
          </h2>
          <p className="info-text">
            Whether you're planning a family vacation, a romantic getaway, or an adventure trip,
             our team of travel experts is ready to craft the perfect itinerary for you.
          </p>

<div className="info-card-green">
  <div className="info-icon">
    ✓
  </div>
  <div className="info-text">
    <h4>Personalized Itineraries</h4>
    <p>Custom tour packages designed just for you</p>
  </div>
</div>

<div className="info-card-blue">
  <div className="info-icon">
    ✓
  </div>
  <div className="info-text">
    <h4>Best Price Guarantee</h4>
    <p>Competitive rates with no hidden charges</p>
  </div>
</div>

<div className="info-card-teal">
  <div className="info-icon">
    ✓
  </div>
  <div className="info-text">
    <h4>Personalized Itineraries</h4>
    <p>Custom tour packages designed just for you</p>
  </div>
</div>
        </div>

        <div className="form-container">
          <h3 className="form-title">Send Us a Message</h3>
          <p className="form-subtitle">We’ll get back to you shortly</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input name="name" value={formData.name} onChange={handleChange} className="form-input" required />
              <label className="form-label">Your Name</label>
            </div>

            <div className="form-group">
              <input name="email" value={formData.email} onChange={handleChange} className="form-input" required />
              <label className="form-label">Email Address</label>
            </div>

            <div className="form-group">
              <input name="phone" value={formData.phone} onChange={handleChange} className="form-input" required />
              <label className="form-label">Phone Number</label>
            </div>

            <div className="form-group">
              <textarea name="message" value={formData.message} onChange={handleChange} className="form-textarea" rows="4" required />
              <label className="form-label">Your Message</label>
            </div>

            <button className="submit-button" disabled={loading}>
              {loading ? 'Sending...' : <>Send Message <Send size={18} /></>}
            </button>
          </form>
        </div>
      </section>

      {/* Success Popup */}
      {showSuccess && (
        <div className="popup-overlay fade-in">
          <div className="popup scale-in">
            <div className="popup-icon bounce-once">
              <Check color="white" size={36} />
            </div>
            <h3>Message Sent Successfully!</h3>
            <p>We will contact you shortly.</p>
            <button className="submit-button" onClick={() => setShowSuccess(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Map Section */}
<section className="map-container">
  <div style={{ textAlign: 'center', marginBottom: '48px' }}>
    <h2 className="info-title">Find Us on the Map</h2>
    <p className="info-text">
      Located in the heart of Shimla's famous Mall Road
    </p>
  </div>

  <iframe
    title="Shimla Map"
    className="map-frame"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.9633241093907!2d77.17097247535095!3d31.10481497438032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390578dfd7bf0f1f%3A0xf3ddc61f001e0e5c!2sShimla%2C%20Himachal%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000"
    loading="lazy"
    allowFullScreen
  />
</section>

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
          <li><Link to="#">Travel Guide</Link></li>
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
