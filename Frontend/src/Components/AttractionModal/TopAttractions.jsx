import "./TopAttractions.css";
import { X, MapPin, Calendar, Star, Clock, Navigation, Share2, Copy, Check, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

const Top = ({ data, onClose }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  if (!data) return null;

  // ================= SHARE FUNCTIONALITY =================
  const handleShare = async () => {
    const shareData = {
      title: data.title,
      text: `Check out ${data.title} in Shimla!`,
      url: window.location.href,
    };

    // Try native Web Share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        showToastMessage("Shared successfully!");
      } catch (err) {
        // User cancelled or failed
        setShowShareMenu(true);
      }
    } else {
      // Fallback to custom share menu
      setShowShareMenu(true);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      showToastMessage("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      showToastMessage("Failed to copy link");
    }
  };

  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(`Check out ${data.title} in Shimla! ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
    setShowShareMenu(false);
  };

  // ================= DIRECTIONS FUNCTIONALITY =================
  const handleDirections = () => {
    // Option 1: Open in Google Maps
    const query = encodeURIComponent(`${data.title}, Shimla, Himachal Pradesh`);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(mapsUrl, '_blank');
    
    // Option 2: If you have coordinates
    // const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${data.lat},${data.lng}`;
    
    showToastMessage("Opening Google Maps...");
  };

  const showToastMessage = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="top-overlay" onClick={onClose}>
      <div className="top-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button className="top-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {/* ================= HERO ================= */}
        <div className="top-hero">
          <img src={data.image} alt={data.title} className="top-hero-img" />
          <div className="top-hero-shade"></div>

          {data.rating && (
            <span className="rating-badg">
              <Star size={14} fill="#22c55e" stroke="#22c55e" /> {data.rating}
            </span>
          )}

          <div className="top-hero-text">
            <h1>{data.title}</h1>
            <p>Discover culture, history, nature & heritage of Shimla</p>
          </div>
        </div>

        {/* ================= BODY ================= */}
        <div className="top-body">
          <div className="top-article">
            
            {/* About */}
            <section className="top-article-section">
              <h2>About This Place</h2>
              <div className="top-divider"></div>
              <div className="top-long-text">{data.overview}</div>
            </section>

            {/* Highlights */}
            {data.highlights && data.highlights.length > 0 && (
              <section className="top-article-section">
                <h2>Highlights & Attractions</h2>
                <div className="top-divider"></div>
                <div className="premium-highlights-grid">
                  {data.highlights.map((highlight, index) => (
                    <div key={index} className="premium-highlight-card">
                      <div className="premium-highlight-number">{index + 1}</div>
                      <p className="premium-highlight-text">{highlight}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Side Panel */}
          <div className="top-side">
            <div className="top-side-card">
              <h3>Essential Information</h3>
              <div className="top-side-item">
                <MapPin size={18} />
                <div>
                  <span>Location</span>
                  <p>{data.location}</p>
                </div>
              </div>
              <div className="top-side-item">
                <Calendar size={18} />
                <div>
                  <span>Best Time</span>
                  <p>{data.bestTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= MOBILE ACTION BAR ================= */}
        <div className="mobile-action-bar">
          <button className="btn-directions" onClick={handleDirections}>
            <Navigation size={20} />
            Get Directions
          </button>
          <button className="btn-share" onClick={handleShare}>
            <Share2 size={20} />
          </button>
        </div>

        {/* ================= SHARE MENU MODAL ================= */}
        {showShareMenu && (
          <div className="share-menu-overlay" onClick={() => setShowShareMenu(false)}>
            <div className="share-menu" onClick={(e) => e.stopPropagation()}>
              <div className="share-menu-header">
                <h4>Share this place</h4>
                <button onClick={() => setShowShareMenu(false)}>
                  <X size={20} />
                </button>
              </div>
              
              <div className="share-options">
                <button className="share-option whatsapp" onClick={shareViaWhatsApp}>
                  <div className="share-icon whatsapp-bg">
                    <MessageCircle size={24} />
                  </div>
                  <span>WhatsApp</span>
                </button>
                
                <button className="share-option copy" onClick={copyToClipboard}>
                  <div className="share-icon copy-bg">
                    {copied ? <Check size={24} /> : <Copy size={24} />}
                  </div>
                  <span>{copied ? "Copied!" : "Copy Link"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= TOAST NOTIFICATION ================= */}
        {showToast && (
          <div className="toast-notification">
            {toastMessage}
          </div>
        )}

      </div>
    </div>
  );
};

export default Top;