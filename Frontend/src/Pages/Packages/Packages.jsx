import { useState, useRef, useMemo, useEffect } from 'react';
import { useNavigate as useNavHook } from 'react-router-dom';
import { Link, useNavigate, useLocation } from "react-router-dom";
import './Packages.css';
import { packagesData, categories } from "../../data/packagesData";
// Fix #18 — skeleton loaders and error/empty states
import { PackageSkeletonGrid, ErrorState, EmptyState } from "../../Components/Common/SkeletonCard";
import PackageCard from '../../Components/PackagesModal/PackageCard';
import BookingModal from '../../Components/PackagesModal/BookingModal';
import { Mountain, Search, Facebook, Instagram, Twitter, Youtube, Star, Clock, MapPin, Tag, ArrowLeft, X } from 'lucide-react';

function Packages() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Parse URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const activityFromUrl = queryParams.get('activity');
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState(activityFromUrl || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isActivityFilterActive, setIsActivityFilterActive] = useState(!!activityFromUrl);
  // Fix #18 — loading and error state for skeleton loader
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  
  const navigateTo = useNavHook();
  const sliderRefs = useRef({});
  const categorySectionRefs = useRef({});

  // Initialize from URL on mount and when URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const activity = params.get('activity');
    
    if (activity) {
      setSearchQuery(activity);
      setIsActivityFilterActive(true);
      setActiveCategory('All'); // Show all categories but filtered by activity
    } else {
      setIsActivityFilterActive(false);
    }
  }, [location.search]);

  // Get unique categories from packages data
  const allCategories = useMemo(() => {
    const cats = ['All', ...new Set(packagesData.map(pkg => pkg.category))];
    return cats;
  }, []);

  // Handle initial load and hash changes
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && !isActivityFilterActive) {
      const targetCategory = allCategories.find(cat => 
        cat.toLowerCase().replace(/\s+/g, '-') === hash.toLowerCase() ||
        cat.toLowerCase() === hash.toLowerCase()
      );
      
      if (targetCategory) {
        setActiveCategory(targetCategory);
      }
    }
  }, [location.hash, allCategories, isActivityFilterActive]);

  // Scroll to category section when activeCategory changes
  useEffect(() => {
    if (activeCategory !== 'All' && !isActivityFilterActive) {
      setTimeout(() => {
        const categorySlug = activeCategory.toLowerCase().replace(/\s+/g, '-');
        const element = categorySectionRefs.current[categorySlug];
        
        if (element) {
          const yOffset = -120;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeCategory, isActivityFilterActive]);

  const safeToLower = (str) => {
    if (str === undefined || str === null) return '';
    return String(str).toLowerCase();
  };

  // Enhanced filter logic that handles activity query parameter
  const filteredPackages = useMemo(() => {
    return packagesData.filter(pkg => {
      const matchesCategory = activeCategory === 'All' || pkg.category === activeCategory;
      
      // If no search query, return category match only
      if (!searchQuery || searchQuery.trim() === '') return matchesCategory;
      
      const searchLower = searchQuery.toLowerCase();
      
      // Search in multiple fields
      const titleMatch = safeToLower(pkg.title).includes(searchLower);
      const descMatch = safeToLower(pkg.description).includes(searchLower);
      const locationMatch = safeToLower(pkg.location).includes(searchLower);
      const highlightsMatch = pkg.highlights?.some(h => safeToLower(h).includes(searchLower));
      
      // For activity filtering, prioritize highlights but also check other fields
      const matchesSearch = titleMatch || descMatch || locationMatch || highlightsMatch;
      
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Group packages by category (for mobile sliders)
  const packagesByCategory = useMemo(() => {
    const grouped = {};
    allCategories.slice(1).forEach(category => {
      grouped[category] = packagesData.filter(pkg => pkg.category === category);
    });
    return grouped;
  }, [allCategories]);

  // Filter packages by search for mobile sliders
  const searchedPackagesByCategory = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === '') return packagesByCategory;
    
    const searchLower = searchQuery.toLowerCase();
    const grouped = {};
    
    allCategories.slice(1).forEach(category => {
      grouped[category] = packagesData.filter(pkg => {
        if (pkg.category !== category) return false;
        
        const titleMatch = safeToLower(pkg.title).includes(searchLower);
        const descMatch = safeToLower(pkg.description).includes(searchLower);
        const locationMatch = safeToLower(pkg.location).includes(searchLower);
        const highlightsMatch = pkg.highlights?.some(h => safeToLower(h).includes(searchLower));
        
        return titleMatch || descMatch || locationMatch || highlightsMatch;
      });
    });
    
    return grouped;
  }, [allCategories, packagesByCategory, searchQuery]);

  const handleBookNow = (packageData) => {
    // Navigate to full-page booking flow
    navigateTo('/booking', {
      state: {
        type:         'package',
        itemId:       packageData._id || packageData.id,
        itemName:     packageData.title,
        itemImage:    packageData.image || packageData.coverImage || packageData.images?.[0] || null,
        itemRating:   packageData.rating,
        itemLocation: packageData.location,
        price:        packageData.price || packageData.costPerPerson || 0,
        returnTo:     '/packages',
      },
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  // Clear activity filter and return to normal view
  const clearActivityFilter = () => {
    setSearchQuery('');
    setIsActivityFilterActive(false);
    navigate('/packages', { replace: true });
  };

  // Handle back to categories
  const handleBackToCategories = () => {
    setActiveCategory('All');
    setSearchQuery('');
    setIsActivityFilterActive(false);
    navigate('/packages', { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePCCategoryClick = (category) => {
    setActiveCategory(category);
    setIsActivityFilterActive(false);
    if (category === 'All') {
      navigate(location.pathname, { replace: true });
    } else {
      const hash = category.toLowerCase().replace(/\s+/g, '-');
      navigate(`${location.pathname}#${hash}`, { replace: true });
    }
  };

  const handleMobileCategoryClick = (category) => {
    setActiveCategory(category);
    setIsActivityFilterActive(false);
    if (category === 'All') {
      navigate(location.pathname, { replace: true });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const hash = category.toLowerCase().replace(/\s+/g, '-');
      navigate(`${location.pathname}#${hash}`, { replace: true });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleViewAll = (category) => {
    setActiveCategory(category);
    setIsActivityFilterActive(false);
    const hash = category.toLowerCase().replace(/\s+/g, '-');
    navigate(`${location.pathname}#${hash}`, { replace: true });
    
    if (window.innerWidth <= 768) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // If user manually types, clear the activity filter flag
    if (isActivityFilterActive) {
      setIsActivityFilterActive(false);
      navigate('/packages', { replace: true });
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsActivityFilterActive(false);
    setActiveCategory('All');
    navigate('/packages', { replace: true });
  };

  const scrollSlider = (category, direction) => {
    const slider = sliderRefs.current[category];
    if (slider) {
      const cardWidth = window.innerWidth <= 768 ? 280 : 320;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getDiscount = (price, originalPrice) => {
    if (!originalPrice || originalPrice <= price) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  // Render activity filter banner
  const renderActivityBanner = () => {
    if (!isActivityFilterActive || !searchQuery) return null;
    
    return (
      <div className="activity-filter-banner">
        <div className="activity-filter-content">
          <div className="activity-filter-info">
            <span className="activity-filter-label">Showing packages for:</span>
            <span className="activity-filter-name">{searchQuery}</span>
            <span className="activity-filter-count">
              ({filteredPackages.length} package{filteredPackages.length !== 1 ? 's' : ''} found)
            </span>
          </div>
         
        </div>
      </div>
    );
  };

  const renderCategorySlider = (category, packages) => {
    if (!packages || packages.length === 0) return null;

    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');

    return (
      <div 
        key={category} 
        id={categorySlug}
        className="category-section"
        ref={el => categorySectionRefs.current[categorySlug] = el}
      >
        <div className="category-header">
          <div className="category-title-wrapper">
            <h2 className="category-title">{category}</h2>
            <span className="category-count">{packages.length} packages</span>
          </div>
          <div className="category-actions">
            <button 
              className="slider-arrow prev desktop-only" 
              onClick={() => scrollSlider(category, 'left')}
              aria-label={`Previous ${category} packages`}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              className="slider-arrow next desktop-only" 
              onClick={() => scrollSlider(category, 'right')}
              aria-label={`Next ${category} packages`}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button 
              className="view-all-link" 
              onClick={() => handleViewAll(category)}
            >
              View All
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="slider-container">
          <div 
            className="blog-slider" 
            ref={el => sliderRefs.current[category] = el}
            aria-label={`${category} packages`}
          >
            {packages.map((pkg, index) => (
              <article 
                key={pkg.id} 
                className="slider-card" 
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="slider-card-image-wrapper">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title || 'Package'} 
                    className="slider-card-image" 
                    loading="lazy" 
                  />
                  <div className="slider-card-overlay"></div>
                  
                  {getDiscount(pkg.price, pkg.originalPrice) > 0 && (
                    <div className="slider-card-discount-badge">
                      <span>{getDiscount(pkg.price, pkg.originalPrice)}% OFF</span>
                    </div>
                  )}
                  
                  <div className="slider-card-category-badge">
                    <span>{pkg.category}</span>
                  </div>
                  
                  <div className="slider-card-price-badge">
                    <span className="price-label">From</span>
                    <span className="price-value">₹{pkg.price?.toLocaleString('en-IN') || 0}</span>
                  </div>
                </div>
                
                <div className="slider-card-content">
                  <div className="slider-card-meta">
                    <div className="slider-card-meta-item">
                      <Clock size={14} />
                      <span>{pkg.duration || 'N/A'}</span>
                    </div>
                    <div className="slider-card-meta-item">
                      <MapPin size={14} />
                      <span>{pkg.location?.split(',')[0] || 'Shimla'}</span>
                    </div>
                  </div>
                  
                  <h3 className="slider-card-title">{pkg.title || 'Untitled Package'}</h3>
                  
                  <div className="slider-card-rating">
                    <Star size={14} fill="#fbbf24" color="#fbbf24" />
                    <span>{pkg.rating || '4.0'}</span>
                    <span className="rating-count">({Math.floor(Math.random() * 200) + 50} reviews)</span>
                  </div>
                  
                  <p className="slider-card-description">
                    {(pkg.shortDescription || pkg.description || 'No description available').substring(0, 80)}...
                  </p>
                  
                  <div className="slider-card-highlights">
                    {pkg.highlights?.slice(0, 2).map((highlight, idx) => (
                      <span key={idx} className="highlight-tag">
                        <Tag size={10} />
                        {highlight}
                      </span>
                    ))}
                  </div>
                  
                  <div className="slider-card-footer">
                    <Link to={`/package/${pkg.id}`} className="view-details-link">
                      View Details
                      <svg className="view-details-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <button className="book-now-link" onClick={() => handleBookNow(pkg)}>
                      Book Now
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          <div className="scroll-hint mobile-only">
            <span className="scroll-hint-text">Swipe to explore</span>
            <div className="scroll-dots">
              {[...Array(Math.min(packages.length, 5))].map((_, idx) => (
                <span key={idx} className="scroll-dot"></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fix #18 — show skeleton while loading or error state on failure
  if (isLoading) {
    return (
      <div className="packages-page" style={{ padding: '40px 20px' }}>
        <PackageSkeletonGrid count={6} />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="packages-page" style={{ padding: '40px 20px' }}>
        <ErrorState
          message="Could not load packages. Please check your connection and try again."
          onRetry={() => { setFetchError(null); setIsLoading(false); }}
        />
      </div>
    );
  }

  return (
    <div className="packages-page">
      {/* PC LAYOUT */}
      <div className="pc-layout">
        <section className="packages-hero pc-hero">
          <div className="package-hero-overlay">
            <h2 className="package-hero-title">Explore Our Premium Tour Packages</h2>
            <p className="package-hero-description">From adventure seekers to luxury travelers, find the perfect package for your journey</p>
          </div>
        </section>

        {/* Activity Filter Banner - PC */}
        {renderActivityBanner()}

        <div className="packages-container pc-container">
          <div className="search-filter-section">
            <div className="search-box">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search packages by name, location, or highlights..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
              />
              {searchQuery && (
                <button className="clear-search" onClick={clearSearch}>
                  ×
                </button>
              )}
            </div>

            <div className="category-filters">
              {allCategories.map(category => (
                <button
                  key={category}
                  className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => handlePCCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="packages-info">
            <p className="results-count">
              {isActivityFilterActive ? (
                <>
                  <span>Showing </span>
                  <strong>{filteredPackages.length}</strong>
                  <span> package{filteredPackages.length !== 1 ? 's' : ''} for "{searchQuery}"</span>
                </>
              ) : activeCategory !== 'All' ? (
                <>
                  <strong className="category-name-bold">{activeCategory}</strong>
                  <span> - Showing </span>
                  <strong>{filteredPackages.length}</strong>
                  <span> package{filteredPackages.length !== 1 ? 's' : ''}</span>
                </>
              ) : (
                <>
                  Showing <strong>{filteredPackages.length}</strong> package{filteredPackages.length !== 1 ? 's' : ''}
                </>
              )}
              {searchQuery && !isActivityFilterActive && ` for "${searchQuery}"`}
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
                {isActivityFilterActive ? (
                  <button className="reset-btn" onClick={clearActivityFilter}>
                    Clear Activity Filter
                  </button>
                ) : (
                  <button className="reset-btn" onClick={clearSearch}>
                    Reset Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE LAYOUT */}
      <div className="mobile-layout">
        <section className="packages-hero mobile-hero">
          <div className="package-hero-overlay">
            <h2 className="package-hero-title">Explore Our Packages</h2>
            <p className="package-hero-description">Find the perfect package for your journey</p>
          </div>
        </section>

        {/* Activity Filter Banner - Mobile */}
        {renderActivityBanner()}

        <div className="mobile-search-container">
          <div className="search-box">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search packages..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            {searchQuery && (
              <button className="clear-search mobile-clear" onClick={clearSearch}>
                ×
              </button>
            )}
          </div>
          {searchQuery && !isActivityFilterActive && (
            <div className="search-results-info">
              <span>Found {filteredPackages.length} results for "{searchQuery}"</span>
              <button className="clear-search-link" onClick={clearSearch}>Clear</button>
            </div>
          )}
        </div>

        <main className="mobile-main">
          <div className="mobile-container">
            {activeCategory === 'All' && !searchQuery && !isActivityFilterActive ? (
              <div className="category-sliders">
                {Object.entries(packagesByCategory).map(([category, packages]) => 
                  renderCategorySlider(category, packages)
                )}
              </div>
            ) : activeCategory === 'All' && (searchQuery || isActivityFilterActive) ? (
              <div className="category-sliders">
                {Object.entries(searchedPackagesByCategory).map(([category, packages]) => 
                  packages.length > 0 ? renderCategorySlider(category, packages) : null
                )}
                {filteredPackages.length === 0 && (
                  <div className="no-results mobile-no-results">
                    <p>No packages found for "{searchQuery}"</p>
                    <button className="reset-btn" onClick={isActivityFilterActive ? clearActivityFilter : clearSearch}>
                      Clear {isActivityFilterActive ? 'Filter' : 'Search'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="category-detail">
                {/* Back Button Header */}
                <div className="mobile-back-header">
                  <button className="mobile-back-btn" onClick={handleBackToCategories}>
                    <ArrowLeft size={20} />
                    <span>Back to Page</span>
                  </button>
                </div>

                <div className="category-detail-header">
                  <h2 className="category-detail-title">{activeCategory}</h2>
                  <span className="category-detail-count">{filteredPackages.length} packages</span>
                </div>
                
                <div className="mobile-results-info">
                  <strong className="category-name-bold">{activeCategory}</strong>
                  <span> - Showing </span>
                  <strong>{filteredPackages.length}</strong>
                  <span> package{filteredPackages.length !== 1 ? 's' : ''}</span>
                </div>

                {/* Professional Mobile View All Grid */}
                <div className="mobile-viewall-grid">
                  {filteredPackages.length > 0 ? (
                    filteredPackages.map((pkg, index) => (
                      <article 
                        key={pkg.id} 
                        className="mobile-compact-card" 
                        style={{ animationDelay: `${index * 0.03}s` }}
                      >
                        <div className="compact-card-image-wrapper">
                          <img 
                            src={pkg.image} 
                            alt={pkg.title || 'Package'} 
                            className="compact-card-image" 
                            loading="lazy" 
                          />
                          
                          {getDiscount(pkg.price, pkg.originalPrice) > 0 && (
                            <span className="compact-discount-badge">
                              {getDiscount(pkg.price, pkg.originalPrice)}% OFF
                            </span>
                          )}
                          
                          <div className="compact-price-tag">
                            <span className="compact-price-current">₹{pkg.price?.toLocaleString('en-IN') || 0}</span>
                            {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                              <span className="compact-price-original">₹{pkg.originalPrice?.toLocaleString('en-IN')}</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="compact-card-body">
                          <h3 className="compact-card-title">{pkg.title || 'Untitled Package'}</h3>
                          
                          <div className="compact-card-meta">
                            <div className="compact-meta-item">
                              <Star size={12} fill="#fbbf24" color="#fbbf24" />
                              <span>{pkg.rating || '4.0'}</span>
                            </div>
                            <div className="compact-meta-item">
                              <MapPin size={12} />
                              <span>{pkg.location?.split(',')[0] || 'Shimla'}</span>
                            </div>
                            <div className="compact-meta-item">
                              <Clock size={12} />
                              <span>{pkg.duration || 'N/A'}</span>
                            </div>
                          </div>
                          
                          <div className="compact-card-actions">
                            <Link to={`/package/${pkg.id}`} className="compact-btn compact-btn-outline">
                              Details
                            </Link>
                            <button className="compact-btn compact-btn-primary" onClick={() => handleBookNow(pkg)}>
                              Book
                            </button>
                          </div>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="no-results mobile-no-results">
                      <p>No packages found in {activeCategory} category.</p>
                      <button className="reset-btn" onClick={() => handleMobileCategoryClick('All')}>
                        View All
                      </button>
                    </div>
                  )}
                </div>

                {/* Bottom Back Button */}
                <div className="mobile-back-footer">
                  <button className="mobile-back-btn mobile-back-btn-large" onClick={handleBackToCategories}>
                    <ArrowLeft size={18} />
                    <span>Back to All Categories</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="brand-row">
                <Mountain className="brand-icon" />
                <span className="brand-name">Shimla Travels</span>
              </div>
              <p>Your gateway to experiencing the magical beauty of Shimla and creating unforgettable memories in the Himalayas.</p>
            </div>

            <div className="footer-col">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shimla#destinations">Destinations</Link></li>
                <li><Link to="/shimla#activities">Activities</Link></li>
                <li><Link to="/shimla#shimla-gallery">Gallery</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>Travel Info</h3>
              <ul>
                <li><Link to="/packages">Travel Packages</Link></li>
                <li><Link to="/Hotel">Hotel Booking</Link></li>
                <li><Link to="/shimla#Travel">Travel Guide</Link></li>
                <li><Link to="/About#FAQs">FAQs</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>Legal</h3>
              <ul>
                <li><Link to="/Terms#terms">Terms & Conditions</Link></li>
                <li><Link to="/Terms#privacy">Privacy Policy</Link></li>
                <li><Link to="/Terms#cancellation">Cancellation Policy</Link></li>
                <li><Link to="/Terms#payment">Payment Policy</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>Follow Us</h3>
              <p className="footer-subtext">Stay connected for travel updates and inspiration</p>
              <div className="footer-socials">
                <a href="#"><Facebook /></a>
                <a href="#"><Instagram /></a>
                <a href="#"><Twitter /></a>
                <a href="#"><Youtube /></a>
              </div>
            </div>
          </div>

          <div className="footer-footer-bottom">
            <p>© 2026 Shimla Travels. All rights reserved. Made with ❤️ for travelers.</p>
          </div>
        </div>
      </footer>
      {/* Booking handled by full-page /booking route */}
      </div>
  );
}

export default Packages;