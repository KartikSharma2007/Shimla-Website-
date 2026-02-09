import { useState } from 'react';
import { Link } from "react-router-dom";
import './Packages.css';
import { packagesData, categories } from "../../JS Data/packagesData";
import PackageCard from '../../Components/PackagesModal/PackageCard';
import BookingModal from '../../Components/PackagesModal/BookingModal';
import { Mountain, Search, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

function Packages() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const filteredPackages = packagesData.filter(pkg => {
    const matchesCategory = selectedCategory === 'All' || pkg.category === selectedCategory;
    const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBookNow = (packageData) => {
    setSelectedPackage(packageData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  return (
    <div className="packages-page">
      <header className="packages-header">
        <div className="header-content">
          <div className="brand-section">
            <Mountain className="brand-icon" size={40} />
            <h1 className="brand-title">Shimla Travel Agency</h1>
          </div>
          <p className="header-subtitle">Discover the beauty of the Himalayas with our curated travel packages</p>
        </div>
      </header>

      <section className="packages-hero">
        <div className="package-hero-overlay">
          <h2 className="package-hero-title">Explore Our Premium Tour Packages</h2>
          <p className="package-hero-description">From adventure seekers to luxury travelers, find the perfect package for your journey</p>
        </div>
      </section>

      <div className="packages-container">
        <div className="search-filter-section">
          <div className="search-box">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search packages by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="packages-info">
          <p className="results-count">
            Showing <strong>{filteredPackages.length}</strong> package{filteredPackages.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>

        <div className="packages-grid">
          {filteredPackages.length > 0 ? (
            filteredPackages.map(pkg => (
              <PackageCard
                key={pkg.id}
                packageData={pkg}
                onBookNow={handleBookNow}
              />
            ))
          ) : (
            <div className="no-results">
              <p>No packages found matching your criteria.</p>
              <button
                className="reset-btn"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

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

      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        packageData={selectedPackage}
      />
    </div>
  );
}

export default Packages;
