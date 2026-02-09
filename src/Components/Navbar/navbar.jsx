import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { Mountain } from "lucide-react";


// Mountain Theme Glass Navbar
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="nav-container">
      {/* Logo */}
      <div className="nav-logo">
        <Link to="/" className="brand"><Mountain className="brand-icon" /> Shimla Travel</Link>
      </div>

      {/* Desktop Menu */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/About">About</Link></li>
        <li><Link to="/shimla">Shimla</Link></li>
        <li><Link to="/Hotel">Hotels</Link></li>
        <li><Link to="/packagess">Packages</Link></li>
        <li><Link to="/ContactUs">Contact Us</Link></li>
        <li><Link to="/login" className="login-btn">Login</Link></li>
        <li><Link to="/signup" className="signup-btn">Signup</Link></li>
        

      </ul>

      {/* Mobile Menu Icon */}
      <div className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
        <div className={isOpen ? "bar bar1-open" : "bar"}></div>
        <div className={isOpen ? "bar bar2-open" : "bar"}></div>
        <div className={isOpen ? "bar bar3-open" : "bar"}></div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <ul className="mobile-menu">
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link to="/packages" onClick={() => setIsOpen(false)}>Packages</Link></li>
          <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
          <li><Link to="/login" onClick={() => setIsOpen(false)}>Login</Link></li>
          <li><Link to="/signup" onClick={() => setIsOpen(false)}>Signup</Link></li>
        </ul>
      )}
    </nav>
  );
}
