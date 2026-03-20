// Components/Blog/BlogArticle.jsx
import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogData } from '../../data/blogData';
import RelatedBlogCard from './RelatedBlogCard';
import './BlogArticle.css';

const BlogArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  
  const blog = blogData.find(b => b.id === parseInt(id));
  
  // Get related blogs (same category, excluding current)
  const relatedBlogs = blogData
    .filter(b => b.id !== parseInt(id) && b.category === blog?.category)
    .slice(0, 8); // Increased to show more in horizontal scroll

  // Get more articles by same author (excluding current)
  const moreByAuthor = blogData
    .filter(b => b.id !== parseInt(id) && b.author === blog?.author)
    .slice(0, 2);

  if (!blog) {
    return (
      <div className="ba-error">
        <h2>Blog not found</h2>
        <button onClick={() => navigate('/blog')} className="ba-back-btn">
          Back to Blog
        </button>
      </div>
    );
  }

  const handleBackToBlog = () => {
    navigate('/blog');
  };

  const handleShare = (platform) => {
    const blogUrl = window.location.href;
    const blogTitle = blog.title;
    
    let shareUrl = '';
    
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u= ${encodeURIComponent(blogUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url= ${encodeURIComponent(blogUrl)}&text=${encodeURIComponent(blogTitle)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text= ${encodeURIComponent(blogTitle + ' ' + blogUrl)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  // Horizontal scroll navigation
  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const cardWidth = 320; // Card width + gap
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <article className="ba-root">
      {/* Hero Section */}
      <header className="ba-hero">
        <div className="ba-hero-img-wrap">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="ba-hero-img"
          />
          <div className="ba-hero-overlay"></div>
        </div>
        
        <div className="ba-hero-content">
          <div className="ba-container">
            <div className="ba-hero-top">
              <span className="ba-category">{blog.category}</span>
              <span className="ba-read-time">{blog.readTime}</span>
            </div>
            <h1 className="ba-title">{blog.title}</h1>
            
            <div className="ba-meta">
              <div className="ba-author">
                <div className="ba-author-avatar">{blog.author.charAt(0)}</div>
                <div className="ba-author-info">
                  <span className="ba-author-name">{blog.author}</span>
                  <span className="ba-author-role">Travel Writer</span>
                </div>
              </div>
              <div className="ba-date">
                <svg className="ba-date-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {blog.date}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="ba-container">
        <div className="ba-layout">
          {/* Main Content Column */}
          <main className="ba-main">
            {/* Introduction */}
            <section className="ba-intro">
              <p className="ba-intro-text">{blog.content.introduction}</p>
            </section>

            {/* Content Sections */}
            {blog.content.sections.map((section, index) => (
              <section key={index} className="ba-section">
                <h2 className="ba-section-heading">{section.heading}</h2>
                <p className="ba-section-text">{section.text}</p>
                
                {section.highlights && (
                  <ul className="ba-highlights">
                    {section.highlights.map((highlight, idx) => (
                      <li key={idx} className="ba-highlight-item">
                        <span className="ba-highlight-icon">✦</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}

                {section.quote && (
                  <blockquote className="ba-quote">
                    <p className="ba-quote-text">"{section.quote.text}"</p>
                    <cite className="ba-quote-author">— {section.quote.author}</cite>
                  </blockquote>
                )}

                {/* Section-specific image */}
                {section.image && (
                  <figure className="ba-mid-img">
                    <img src={section.image} alt={section.imageCaption || section.heading} />
                    {section.imageCaption && (
                      <figcaption>{section.imageCaption}</figcaption>
                    )}
                  </figure>
                )}
              </section>
            ))}

            {/* Travel Tips Box */}
            <div className="ba-tips-box">
              <div className="ba-tips-header">
                <span className="ba-tips-icon">💡</span>
                <h3>Essential Travel Tips</h3>
              </div>
              <ul className="ba-tips-list">
                {blog.content.travelTips.map((tip, index) => (
                  <li key={index} className="ba-tip-item">
                    <span className="ba-tip-number">{index + 1}</span>
                    <span className="ba-tip-text">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info Box */}
            <div className="ba-info-box">
              <h3 className="ba-info-title">
                <span className="ba-info-icon">ℹ️</span>
                Quick Information
              </h3>
              <div className="ba-info-grid">
                <div className="ba-info-item">
                  <span className="ba-info-label">Best Time to Visit</span>
                  <span className="ba-info-value">{blog.content.infoBox.bestTime}</span>
                </div>
                <div className="ba-info-item">
                  <span className="ba-info-label">Location</span>
                  <span className="ba-info-value">{blog.content.infoBox.location}</span>
                </div>
                <div className="ba-info-item">
                  <span className="ba-info-label">Entry Fee</span>
                  <span className="ba-info-value">{blog.content.infoBox.entryFee}</span>
                </div>
                <div className="ba-info-item">
                  <span className="ba-info-label">Timings</span>
                  <span className="ba-info-value">{blog.content.infoBox.timings}</span>
                </div>
              </div>
            </div>

            {/* Social Share */}
            <div className="ba-share">
              <span className="ba-share-label">Share this story:</span>
              <div className="ba-share-btns">
                <button className="ba-share-btn ba-fb" onClick={() => handleShare('facebook')}>
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  <span className="ba-share-text">Facebook</span>
                </button>
                <button className="ba-share-btn ba-tw" onClick={() => handleShare('twitter')}>
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                  <span className="ba-share-text">Twitter</span>
                </button>
                <button className="ba-share-btn ba-wa" onClick={() => handleShare('whatsapp')}>
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  <span className="ba-share-text">WhatsApp</span>
                </button>
                <button className="ba-share-btn ba-copy" onClick={handleCopyLink}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="ba-share-text">Copy</span>
                </button>
              </div>
            </div>

            {/* Back to Blog */}
            <div className="ba-nav">
              <button className="ba-back-btn" onClick={handleBackToBlog}>
                <svg className="ba-back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to All Stories
              </button>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="ba-sidebar">
            <div className="ba-sidebar-sticky">
              {/* Enhanced Author Card */}
              <div className="ba-sidebar-card ba-author-card">
                <div className="ba-lg-avatar">{blog.author.charAt(0)}</div>
                <h4 className="ba-sidebar-author">{blog.author}</h4>
                <p className="ba-sidebar-bio">{blog.authorBio}</p>
                
                <div className="ba-author-stats">
                  <div className="ba-author-stat">
                    <span className="ba-stat-num">{blog.authorArticles}</span>
                    <span className="ba-stat-label">Articles</span>
                  </div>
                  <div className="ba-author-stat">
                    <span className="ba-stat-num">{blog.authorExperience}</span>
                    <span className="ba-stat-label">Experience</span>
                  </div>
                </div>

                <div className="ba-author-social">
                  <a href="#" className="ba-social-link" title="Twitter">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                  </a>
                  <a href="#" className="ba-social-link" title="Instagram">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="#" className="ba-social-link" title="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                </div>
              </div>

              {/* Categories */}
              <div className="ba-sidebar-card">
                <h4 className="ba-sidebar-title">Categories</h4>
                <div className="ba-cat-tags">
                  <span className="ba-cat-tag active">{blog.category}</span>
                  <span className="ba-cat-tag">Travel</span>
                  <span className="ba-cat-tag">Photography</span>
                  <span className="ba-cat-tag">Tips</span>
                </div>
              </div>

              {/* More by Author */}
              {moreByAuthor.length > 0 && (
                <div className="ba-sidebar-card ba-more-by-author">
                  <h4 className="ba-sidebar-title">More by {blog.author.split(' ')[0]}</h4>
                  <div className="ba-more-list">
                    {moreByAuthor.map(article => (
                      <div 
                        key={article.id} 
                        className="ba-more-item"
                        onClick={() => {
                          navigate(`/blog/${article.id}`);
                          window.scrollTo(0, 0);
                        }}
                      >
                        <img src={article.image} alt={article.title} className="ba-more-thumb" />
                        <div className="ba-more-info">
                          <h5 className="ba-more-title">{article.title}</h5>
                          <span className="ba-more-date">{article.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Related Blogs Section - DESIGN OPTION 1: HORIZONTAL SCROLL WITH SNAP */}
      {relatedBlogs.length > 0 && (
        <section className="ba-related-section">
          <div className="ba-container">
            <div className="ba-related-header">
              <div className="ba-related-title-wrap">
                <h2 className="ba-related-title">More Stories You'll Love</h2>
                <p className="ba-related-subtitle">Discover more adventures in {blog.category}</p>
              </div>
              {/* Desktop Navigation Arrows */}
              <div className="ba-slider-nav ba-desktop-only">
                <button 
                  className="ba-slider-btn ba-prev" 
                  onClick={() => scrollSlider('left')}
                  aria-label="Previous cards"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  className="ba-slider-btn ba-next" 
                  onClick={() => scrollSlider('right')}
                  aria-label="Next cards"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Horizontal Scroll Container */}
            <div className="ba-slider-container">
              <div 
                className="ba-related-slider" 
                ref={sliderRef}
                aria-label="Related blog posts"
              >
                {relatedBlogs.map(blog => (
                  <RelatedBlogCard key={blog.id} blog={blog} variant="horizontal" />
                ))}
              </div>
              {/* Mobile Scroll Indicator */}
              <div className="ba-scroll-indicator ba-mobile-only">
                <span className="ba-scroll-hint">Swipe to explore</span>
                <div className="ba-scroll-dots">
                  {relatedBlogs.map((_, idx) => (
                    <span key={idx} className="ba-scroll-dot"></span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </article>
  );
};

export default BlogArticle;