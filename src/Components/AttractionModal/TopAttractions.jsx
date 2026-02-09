import "./TopAttractions.css";
import { X, MapPin, Calendar } from "lucide-react";
import { Star } from "lucide-react";

const Top = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className="top-overlay">
      <div className="top-modal">

        {/* Close */}
        <button className="top-close-btn" onClick={onClose}>
          <X size={22} />
        </button>

        {/* ================= HERO ================= */}
        <div className="top-hero">
          <img src={data.image} alt={data.title} className="top-hero-img" />
          <div className="top-hero-shade"></div>

          {/* Rating Badge */}
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

          {/* ===== ARTICLE CONTENT ===== */}
          <div className="top-article">

            {/* About */}
            <section className="top-article-section">
              <h2>About This Place</h2>
              <div className="top-divider"></div>

              <div className="top-long-text">
                {data.overview}
              </div>
            </section>

            {/* ================= NEW HIGHLIGHTS (FROM TouristPlace) ================= */}
            {data.highlights && data.highlights.length > 0 && (
              <section className="top-article-section">
                <h2>Highlights & Attractions</h2>
                <div className="top-divider"></div>

                <div className="premium-highlights-grid">
                  {data.highlights.map((highlight, index) => (
                    <div key={index} className="premium-highlight-card">
                      <div className="premium-highlight-number">
                        {index + 1}
                      </div>
                      <p className="premium-highlight-text">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* ===== SIDE PANEL ===== */}
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
      </div>
    </div>
  );
};

export default Top;
