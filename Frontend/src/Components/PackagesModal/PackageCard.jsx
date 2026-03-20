import './PackageCard.css';
import { Calendar, IndianRupee, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function PackageCard({ packageData, onBookNow }) {
  const discount = Math.round(((packageData.originalPrice - packageData.price) / packageData.originalPrice) * 100);

  return (
    <div className="package-card">
      <div className="package-image-container">
        <img src={packageData.image} alt={packageData.title} className="package-image" />
        
        <div className="card-badges">
          {discount > 0 && (
            <span className="package-discount-badge">-{discount}%</span>
          )}
          <span className="package-category-badge">{packageData.category}</span>
          {packageData.rating && (
           <div className="rating-badg">
           <span className="rating-star">⭐</span>
           <span className="rating-valu">{packageData.rating.toFixed(1)}</span>
           </div>
           )}
        </div>
      </div>

      <div className="package-content">
        <div className="package-header">
          <h3 className="package-titlee">{packageData.title}</h3>

          <div className="package-duration-top">
            <Calendar className="duration-icon" size={16} />
            <span className="duration-text">{packageData.duration}</span>
          </div>
        </div>
        <p className="package-description">{packageData.description}</p>

       
<hr className="package-divider" />

        <div className="package-highlights">
  <div className="highlights-chips">
    {packageData.highlights.slice(0, 3).map((highlight, index) => (
      <span key={index} className="highlight-chip">
        ✓ {highlight}
      </span>
    ))}
    {packageData.highlights.length > 3 && (
      <span className="highlight-chip more">+{packageData.highlights.length - 3}</span>
    )}
  </div>
</div>
<div className="flex-spacer"></div>

        {/* NEW: Redesigned Footer with Two Buttons */}
        <div className="package-footer">
  <div className="price-section">
    <div className="price-main">
      <IndianRupee size={20} />
      <span className="price-value">{packageData.price.toLocaleString('en-IN')}</span>
      <span className="per-person">/person</span>
    </div>
    {packageData.originalPrice && (
      <div className="original-price">
        <IndianRupee size={12} />
        <span>{packageData.originalPrice.toLocaleString('en-IN')}</span>
      </div>
    )}
  </div>

  <div className="action-section">
    <Link to={`/package/${packageData.id}`} className="details-link">
      Details
    </Link>
    <button className="book-btn" onClick={() => onBookNow(packageData)}>
      Book Now
    </button>
  </div>
</div>
      </div>
    </div>
  );
}

export default PackageCard;