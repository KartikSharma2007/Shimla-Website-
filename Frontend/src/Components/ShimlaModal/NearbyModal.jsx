import { useState, useEffect } from "react";
import { 
  X, MapPin, Clock, Mountain, Star, Navigation, 
  Heart, Share2, ArrowRight
} from "lucide-react";
import "./NearbyModal.css";

const NearbyModal = ({ data, onClose }) => {
  const [liked, setLiked] = useState(false);

  // Lock scroll
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  if (!data) return null;

  // Google Maps direction handler
  const handleGetDirections = () => {
    // Create search query from destination name
    const destination = encodeURIComponent(data.title + ", Himachal Pradesh, India");
    
    // Google Maps URL with directions
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    
    // Open in new tab
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="simple-modal-backdrop" onClick={onClose}>
      <div className="simple-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button className="simple-close" onClick={onClose}>
          <X size={24} />
        </button>

        {/* Image */}
        <div className="simple-hero">
          <img src={data.image} alt={data.title} />
          <div className="simple-hero-overlay">
            <h2>{data.title}</h2>
            <div className="simple-rating">
              <Star size={14} fill="#fbbf24" />
              <span>4.8 (2.4k reviews)</span>
            </div>
          </div>
        </div>

        {/* Content - All Visible */}
        <div className="simple-content">
          
          {/* Stats */}
          <div className="simple-stats">
            <div>
              <Navigation size={18} />
              <span>{data.distance}</span>
            </div>
            <div>
              <Clock size={18} />
              <span>{data.time}</span>
            </div>
            <div>
              <Mountain size={18} />
              <span>{data.height}</span>
            </div>
          </div>

          {/* Description */}
          <p className="simple-desc">{data.description}</p>

          {/* TOP ATTRACTIONS - SIMPLE CARD */}
          <div className="simple-card">
            <h3>⭐ Top Attractions</h3>
            <ul>
              {(data.attractions || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            {(data.attractions || []).length === 0 && <p className="empty">No attractions listed</p>}
          </div>

          {/* BEST TIME - SIMPLE CARD */}
          <div className="simple-card blue">
            <h3>📅 Best Time to Visit</h3>
            <p>{data.bestTime || "Information not available"}</p>
          </div>

          {/* MUST TRY - SIMPLE CARD */}
          <div className="simple-card green">
            <h3>🏆 Must Try Experience</h3>
            <p>{data.mustTry || "Information not available"}</p>
          </div>

          {/* ACTIVITIES - SIMPLE GRID */}
          <div className="simple-activities">
            <h3>🎯 Popular Activities</h3>
            <div className="activity-grid">
              {(data.activities || []).map((act, i) => (
                <span key={i} className="activity-tag">{act}</span>
              ))}
            </div>
            {(data.activities || []).length === 0 && <p className="empty">No activities listed</p>}
          </div>

          {/* Footer */}
          <div className="simple-footer">
            <button 
              className={`like-btn ${liked ? "liked" : ""}`} 
              onClick={() => setLiked(!liked)}
            >
              <Heart size={20} fill={liked ? "#ef4444" : "none"} color={liked ? "#ef4444" : "#64748b"} />
            </button>
            
            {/* GET DIRECTIONS BUTTON - NOW FUNCTIONAL */}
            <button 
              className="direction-btn"
              onClick={handleGetDirections}
            >
              <MapPin size={18} />
              Get Directions
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NearbyModal;