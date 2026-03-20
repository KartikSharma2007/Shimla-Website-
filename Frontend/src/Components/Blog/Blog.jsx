// Components/Blog/Blog.jsx - DESIGN OPTION 2: HORIZONTAL SCROLL BY CATEGORY
import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { blogData } from '../../data/blogData';
import { 
  Facebook, Youtube, Instagram, Twitter, Mountain, 
  ArrowLeft, Grid3X3, List, Calendar, Clock 
} from 'lucide-react';
import './Blog.css';

const Blog = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const sliderRefs = useRef({});

  // Get unique categories from blog data
  const categories = ['All', ...new Set(blogData.map(blog => blog.category))];

  // Group blogs by category
  const blogsByCategory = categories.slice(1).reduce((acc, category) => {
    acc[category] = blogData.filter(blog => blog.category === category);
    return acc;
  }, {});

  // Filter blogs based on active category
  const filteredBlogs = activeCategory === 'All' 
    ? blogData 
    : blogData.filter(blog => blog.category === activeCategory);

  const handleReadMore = (blogId) => {
    navigate(`/blog/${blogId}`);
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAll = (category) => {
    setActiveCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToAll = () => {
    setActiveCategory('All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll slider for a category
  const scrollSlider = (category, direction) => {
    const slider = sliderRefs.current[category];
    if (slider) {
      const cardWidth = window.innerWidth <= 768 ? 280 : 320;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Render a horizontal slider for a category
  const renderCategorySlider = (category, blogs) => {
    if (blogs.length === 0) return null;

    return (
      <div key={category} className="b-cat-section">
        <div className="b-cat-header">
          <div className="b-cat-title-wrap">
            <h2 className="b-cat-title">{category}</h2>
            <span className="b-cat-count">{blogs.length} stories</span>
          </div>
          <div className="b-cat-actions">
            <button 
              className="b-slider-arrow b-prev b-pc-only" 
              onClick={() => scrollSlider(category, 'left')}
              aria-label={`Previous ${category} stories`}
            >
              <ArrowLeft size={20} />
            </button>
            <button 
              className="b-slider-arrow b-next b-pc-only" 
              onClick={() => scrollSlider(category, 'right')}
              aria-label={`Next ${category} stories`}
            >
              <ArrowLeft size={20} style={{ transform: 'rotate(180deg)' }} />
            </button>
            <button 
              className="b-view-all-btn" 
              onClick={() => handleViewAll(category)}
            >
              View All
              <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
            </button>
          </div>
        </div>
        
        <div className="b-slider-wrap">
          <div 
            className="b-slider" 
            ref={el => sliderRefs.current[category] = el}
            aria-label={`${category} stories`}
          >
            {blogs.map((blog, index) => (
              <article 
                key={blog.id} 
                className="b-slide-card" 
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => handleReadMore(blog.id)}
              >
                <div className="b-slide-img-wrap">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="b-slide-img" 
                    loading="lazy" 
                  />
                  <div className="b-slide-overlay"></div>
                  <div className="b-slide-date">
                    <Calendar size={14} className="b-date-icon" />
                    <span className="b-date-text">{blog.date}</span>
                  </div>
                </div>
                <div className="b-slide-content">
                  <div className="b-slide-meta">
                    <div className="b-slide-author">
                      <div className="b-avatar-sm">{blog.author.charAt(0)}</div>
                      <span className="b-author-name">{blog.author}</span>
                    </div>
                    <span className="b-read-time">
                      <Clock size={14} className="b-time-icon" />
                      {blog.readTime}
                    </span>
                  </div>
                  <h3 className="b-slide-title">{blog.title}</h3>
                  <p className="b-slide-desc">{blog.shortText}</p>
                  <div className="b-slide-footer">
                    <span className="b-read-more">
                      Read Article
                      <ArrowLeft size={16} className="b-read-icon" style={{ transform: 'rotate(180deg)' }} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {/* Mobile Scroll Indicator */}
          <div className="b-scroll-hint b-mob-only">
            <span className="b-scroll-text">Swipe to explore</span>
            <div className="b-scroll-dots">
              {blogs.map((_, idx) => (
                <span key={idx} className="b-scroll-dot"></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="b-page">
      {/* ================= HEADER SECTION ================= */}
      <header className="b-header">
        <div className="b-header-bg"></div>
        <div className="b-header-content">
          <button className="b-back-btn" onClick={handleBackToHome}>
            <ArrowLeft size={20} />
            Back to Home
          </button>
          <h1 className="b-main-title">Travel Stories from Shimla</h1>
          <p className="b-main-subtitle">
            Discover the magic of the Queen of Hills through our curated collection of 
            travel experiences, hidden gems, and local insights.
          </p>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="b-main">
        <div className="b-container">
          
          {/* ================= PC: FILTER PILLS ================= */}
          <div className="b-filter-section b-pc-only">
            <div className="b-filter-pills">
              {categories.map((category) => (
                <button 
                  key={category}
                  className={`b-filter-pill ${activeCategory === category ? 'b-active' : ''}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* ================= MOBILE: CATEGORY NAVIGATION ================= */}
          {activeCategory !== 'All' && (
            <div className="b-mob-nav b-mob-only">
              <button 
                className="b-mob-back"
                onClick={handleBackToAll}
              >
                <ArrowLeft size={20} />
                <span>All Categories</span>
              </button>
              
              <div className="b-mob-current">
                <span className="b-mob-label">Viewing:</span>
                <span className="b-mob-cat">{activeCategory}</span>
                <span className="b-mob-count">({filteredBlogs.length})</span>
              </div>

              <div className="b-mob-toggle">
                <button 
                  className={`b-toggle-btn ${viewMode === 'grid' ? 'b-active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <Grid3X3 size={18} />
                </button>
                <button 
                  className={`b-toggle-btn ${viewMode === 'list' ? 'b-active' : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          )}

          {/* ================= CONTENT BASED ON ACTIVE CATEGORY ================= */}
          {activeCategory === 'All' ? (
            /* PC & MOBILE: Show Horizontal Sliders for Each Category */
            <div className="b-cat-sliders">
              {Object.entries(blogsByCategory).map(([category, blogs]) => 
                renderCategorySlider(category, blogs)
              )}
            </div>
          ) : (
            /* PC & MOBILE: Show Grid/List for Selected Category */
            <div className="b-detail-view">
              {/* PC: Header for Category View */}
              <div className="b-detail-header b-pc-only">
                <h2 className="b-detail-title">{activeCategory}</h2>
                <span className="b-detail-count">{filteredBlogs.length} stories</span>
              </div>
              
              {/* PC & MOBILE: Blog Grid */}
              <div className={`b-grid ${viewMode === 'list' ? 'b-list-view' : ''}`}>
                {filteredBlogs.map((blog, index) => (
                  <article 
                    key={blog.id} 
                    className="b-card" 
                    style={{ animationDelay: `${index * 0.05}s` }}
                    onClick={() => handleReadMore(blog.id)}
                  >
                    <div className="b-card-img-wrap">
                      <img 
                        src={blog.image} 
                        alt={blog.title} 
                        className="b-card-img" 
                        loading="lazy" 
                      />
                      <div className="b-card-overlay"></div>
                      <span className="b-card-tag">{blog.category}</span>
                      <div className="b-card-date">
                        <Calendar size={14} />
                        <span>{blog.date}</span>
                      </div>
                    </div>
                    <div className="b-card-content">
                      <div className="b-card-meta">
                        <div className="b-card-author">
                          <div className="b-avatar-sm">{blog.author.charAt(0)}</div>
                          <span>{blog.author}</span>
                        </div>
                        <span className="b-card-time">
                          <Clock size={14} />
                          {blog.readTime}
                        </span>
                      </div>
                      <h3 className="b-card-title">{blog.title}</h3>
                      <p className="b-card-desc">{blog.shortText}</p>
                      <div className="b-card-footer">
                        <span className="b-read-more">
                          Read Article
                          <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* ================= NO RESULTS ================= */}
          {filteredBlogs.length === 0 && (
            <div className="b-no-results">
              <div className="b-no-icon">🔍</div>
              <h3>No stories found</h3>
              <p>We couldn't find any stories in the {activeCategory} category.</p>
              <button className="b-back-all-btn" onClick={handleBackToAll}>
                View All Categories
              </button>
            </div>
          )}
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="b-footer">
        <div className="b-footer-container">
          <div className="b-footer-grid">
            {/* Brand */}
            <div className="b-footer-brand">
              <div className="b-brand-row">
                <Mountain className="b-brand-icon" />
                <span className="b-brand-name">Shimla Travels</span>
              </div>
              <p>
                Your gateway to experiencing the magical beauty of Shimla and creating
                unforgettable memories in the Himalayas.
              </p>
            </div>

            {/* Quick Links */}
            <div className="b-footer-col">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shimla#destinations">Destinations</Link></li>
                <li><Link to="/shimla#activities">Activities</Link></li>
                <li><Link to="/shimla#shimla-gallery">Gallery</Link></li>
              </ul>
            </div>

            {/* Travel Info */}
            <div className="b-footer-col">
              <h3>Travel Info</h3>
              <ul>
                <li><Link to="/packagess">Travel Packages</Link></li>
                <li><Link to="/Hotel">Hotel Booking</Link></li>
                <li><Link to="#">Travel Guide</Link></li>
                <li><Link to="/About#FAQs">FAQs</Link></li>
              </ul>
            </div>

            {/* Social */}
            <div className="b-footer-col">
              <h3>Follow Us</h3>
              <p className="b-footer-sub">
                Stay connected for travel updates and inspiration
              </p>
              <div className="b-socials">
                <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                <a href="#" aria-label="Youtube"><Youtube size={20} /></a>
              </div>
            </div>
          </div>

          <div className="b-footer-bottom">
            <p>© 2026 Shimla Travels. All rights reserved. Made with ❤️ for travelers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blog;