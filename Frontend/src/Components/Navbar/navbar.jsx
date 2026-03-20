import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";
import { Mountain, ShoppingCart, X, Home, Info, MapPin, Hotel, Package, Phone, LogIn, UserPlus, User } from "lucide-react";
import { useLiked } from '../LikedCart/LikedContext';

export default function NavbarDesign2() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalLiked } = useLiked();

  const location = useLocation();
  const currentPath = location.pathname;

  // Add '/login' and '/signup' to hide navbar on these pages
  const hideNavbarPaths = ['/Terms', '/terms', '/login', '/signup'];
  const shouldHideNavbar = hideNavbarPaths.includes(currentPath);

  if (shouldHideNavbar) {
    return null;
  }

  return (
    <>
      <nav className="nv-container-d2">
        <div className="nv-logo-d2">
          <Link to="/" className="nv-brand-d2">
            <Mountain className="nv-brand-icon-d2" /> Shimla Travel
          </Link>
        </div>

        <ul className="nv-links-d2">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/About">About</Link></li>
          <li><Link to="/shimla">Shimla</Link></li>
          <li><Link to="/Hotel">Hotels</Link></li>
          <li><Link to="/packages">Packages</Link></li>
          <li><Link to="/ContactUs">Contact Us</Link></li>
          <li><Link to="/account"><User/></Link></li>
          <li><Link to="/login" className="nv-login-btn-d2">Login</Link></li>
          <li><Link to="/signup" className="nv-signup-btn-d2">Signup</Link></li>
          <li>
            <Link to="/favorites" className="nv-favorites-link-d2">
              <ShoppingCart size={18} />
              <span></span>
              {totalLiked > 0 && (
                <span className="nv-favorites-badge-d2">{totalLiked}</span>
              )}
            </Link>
          </li>
        </ul>

        <div className="nv-toggle-d2" onClick={() => setIsOpen(!isOpen)}>
          <div className={isOpen ? "nv-bar-d2 nv-bar1-open-d2" : "nv-bar-d2"}></div>
          <div className={isOpen ? "nv-bar-d2 nv-bar2-open-d2" : "nv-bar-d2"}></div>
          <div className={isOpen ? "nv-bar-d2 nv-bar3-open-d2" : "nv-bar-d2"}></div>
        </div>
      </nav>

      {isOpen && <div className="nv-overlay-d2" onClick={() => setIsOpen(false)}></div>}

      <div className={isOpen ? "nv-drawer-d2 nv-drawer-open-d2" : "nv-drawer-d2"}>
        <div className="nv-drawer-header-d2">
          <div className="nv-drawer-brand-d2">
            <Mountain size={28} />
            <span>Shimla Travel</span>
          </div>
          <button className="nv-drawer-close-d2" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="nv-drawer-content-d2">
          <nav className="nv-drawer-nav-d2">
            <Link to="/" onClick={() => setIsOpen(false)} className="nv-drawer-item-d2">
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link to="/About" onClick={() => setIsOpen(false)} className="nv-drawer-item-d2">
              <Info size={20} />
              <span>About</span>
            </Link>
            <Link to="/shimla" onClick={() => setIsOpen(false)} className="nv-drawer-item-d2">
              <MapPin size={20} />
              <span>Shimla</span>
            </Link>
            <Link to="/Hotel" onClick={() => setIsOpen(false)} className="nv-drawer-item-d2">
              <Hotel size={20} />
              <span>Hotels</span>
            </Link>
            <Link to="/packages" onClick={() => setIsOpen(false)} className="nv-drawer-item-d2">
              <Package size={20} />
              <span>Packages</span>
            </Link>
            <Link to="/ContactUs" onClick={() => setIsOpen(false)} className="nv-drawer-item-d2">
              <Phone size={20} />
              <span>Contact Us</span>
            </Link>
            <Link to="/account" onClick={() => setIsOpen(false)} className="nv-drawer-item-d2">
            <User size={20}/>
            Account
            </Link>
          </nav>

          <div className="nv-drawer-divider-d2"></div>

          <div className="nv-drawer-actions-d2">
            <Link to="/favorites" onClick={() => setIsOpen(false)} className="nv-drawer-favorites-d2">
              <ShoppingCart size={20} />
              <span>Cart Page</span>
              {totalLiked > 0 && (
                <span className="nv-drawer-badge-d2">{totalLiked}</span>
              )}
            </Link>
          </div>

          <div className="nv-drawer-auth-d2">
            <Link to="/login" onClick={() => setIsOpen(false)} className="nv-drawer-login-d2">
              <LogIn size={18} />
              <span>Login</span>
            </Link>
            <Link to="/signup" onClick={() => setIsOpen(false)} className="nv-drawer-signup-d2">
              <UserPlus size={18} />
              <span>Signup</span>
            </Link>
          </div>
        </div>

        <div className="nv-drawer-footer-d2">
          <p>Discover the beauty of Shimla</p>
        </div>
      </div>
    </>
  );
}