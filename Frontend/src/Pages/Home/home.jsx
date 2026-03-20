import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import { blogData } from "../../data/blogData";
import Navbar from "../../Components/Navbar/navbar.jsx";
import jakhuBlog from "../../assets/jakhutemple.webp";
import mallroad from "../../assets/road.jpg";
import greenvalley from "../../assets/greenv.jpg";
import ridge from "../../assets/ridge.webp";
import summer from "../../assets/ridge.webp";
import monsoon from "../../assets/monsoon.jpg";
import winter from "../../assets/winter.webp";
import home from "../../assets/home2.png";
import himalaya from "../../assets/himalaya.avif";
import toy from "../../assets/toy.jpg";
import photo from "../../assets/photo.jpg";
import adventure from "../../assets/adventure.jpg";
import wellness from "../../assets/wellness.avif";
import himachali from "../../assets/himachali.jpeg";
import sport from "../../assets/sport.png";
import trekking from "../../assets/trekking.jpeg";

import { Mountain, Facebook, Instagram, Twitter, Youtube, Bike, Camera, Utensils, Train, 
  TreePine, Sun, Cloud, Snowflake, Calendar, ChevronDown, Backpack, Thermometer, Droplets, 
  Palette, AlertCircle, DollarSign, Users, Heart, MapPin, WifiOff, TrendingUp,  ChevronRight,
   ArrowRight, Star, Navigation, Building2, CloudRain, ChevronLeft, Wind, Wallet   } from "lucide-react";

import Top from "../../Components/AttractionModal/TopAttractions"; // Import the modal
import { topPopupData } from "../../data/ShimlaAttractionsCardsModal"; // Import the popup data
import { topAttractions } from "../../data/ShimlaAttractionsCards";
import SupportChatbot from "../../Components/Chatbot/Supportchatbot.jsx";
import BestTimeSection from "./BestTimeSection.jsx";
import ChatPopup from "../../Components/Chatbot/ChatPopup";
import "../../Components/Chatbot/ChatPopup.css";

export default function Home() {

  // Add this state inside your Home component (before return):
const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cardTransforms, setCardTransforms] = useState(Array(7).fill(''));
  const [isMobile, setIsMobile] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
const previewBlogs = blogData
  .filter(blog => blog.showOnHome)
  .slice(0, 3);
  const handleActivityClick = (category) => {
  navigate(`/packages#${category.toLowerCase().replace(/\s+/g, '-')}`);
};
  
  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector('.activities-cinematic');
      if (!section) return;
      
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(100, (scrolled / (sectionHeight - window.innerHeight)) * 100);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e, index) => {
    if (isMobile) return; // Disable 3D tilt on mobile
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    setCardTransforms(prev => {
      const newTransforms = [...prev];
      newTransforms[index] = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      return newTransforms;
    });
  };

  const handleMouseLeave = (index) => {
    setCardTransforms(prev => {
      const newTransforms = [...prev];
      newTransforms[index] = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      return newTransforms;
    });
    
    setTimeout(() => {
      setCardTransforms(prev => {
        const newTransforms = [...prev];
        newTransforms[index] = '';
        return newTransforms;
      });
    }, 600);
  };

  const navigate = useNavigate();
  


  const handleReadAllBlogs = () => {
    navigate('/blog');
  };

  return (
    <div className="home-wrapper">
      {/* Removed Tailwind test div - not part of original design */}
      
      <Navbar />

      {/*=================================================== HERO SECTION ======================================================*/}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-titlee">Explore Shimla – The Queen of Hills</h1>
          <p className="hero-subtitle">
            Travel through lush forests, snow-covered peaks, waterfalls, valleys,
            and peaceful mountain temples.
          </p>
          <a href="#places" className="hero-btn">Start Exploring</a>
        </div>
      </section>

      {/*==================================================== PREMIUM ABOUT SECTION ================================================*/}
      <section className="about-premium" id="about">
        <div className="about-container">
          <div className="about-content" data-aos="fade-right">
            <div className="about-label">
              <MapPin size={16} />
              <span>Discover Shimla</span>
            </div>
            
            <h2 className="about-title">
              The Queen of
              <span className="gradient-text">Himalayas</span>
            </h2>
            
            <p className="about-description">
              Nestled at <strong>7,238 feet</strong> above sea level, Shimla stands as India's 
              most cherished hill station. Once the summer capital of British India, this 
              colonial masterpiece now welcomes millions seeking mountain magic, where 
              deodar forests meet Victorian architecture and snow-capped peaks touch the sky.
            </p>

            <div className="about-stats">
              <div className="stat-card">
                <span className="stat-number">2,276m</span>
                <span className="stat-label">Altitude</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">4.2M+</span>
                <span className="stat-label">Annual Visitors</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">4.9★</span>
                <span className="stat-label">Traveler Rating</span>
              </div>
            </div>

            <div className="about-features">
              <div className="feature-pill">
                <TreePine size={16} />
                <span>Deodar Forests</span>
              </div>
              <div className="feature-pill">
                <Building2 size={16} />
                <span>Colonial Heritage</span>
              </div>
              <div className="feature-pill">
                <Snowflake size={16} />
                <span>Snowfall</span>
              </div>
              <div className="feature-pill">
                <Train size={16} />
                <span>Toy Train</span>
              </div>
              <div className="feature-pill">
                <Camera size={16} />
                <span>Scenic Views</span>
              </div>
            </div>
          </div>

          <div className="about-visual" data-aos="fade-left">
            <div className="about-decoration" />
            
            <div className="about-image-main">
              <img src={home} alt="Shimla Mountains" />
            </div>

            <div className="about-image-secondary">
              <img src={ridge} alt="Shimla Ridge" />
            </div>

            <div className="about-info-card" data-aos="zoom-in" data-aos-delay="300">
              <div className="info-card-title">Current Weather</div>
              <div className="info-card-value">12°C</div>
              <div className="info-card-desc">Perfect for sightseeing</div>
            </div>
          </div>
        </div>
      </section>

      {/*======================================================= TOP PLACES SECTION ====================================================*/}
<section id="places" className="places-section">
  <div className="section-header">
    <h2 className="section-heading">
      Top Places to <span>Visit</span>
    </h2>
    <p className="section-subtitle">
      Discover handpicked destinations that showcase the magical beauty of Shimla, 
      from ancient temples to scenic valleys
    </p>
  </div>
  
  <div className="places-grid">
    {topAttractions.slice(0, 3).map((place, index) => (
      <div key={place.id} className="place-card" data-aos="fade-up" data-aos-delay={index * 100}>
        <div className="place-image-wrapper">
          <img src={place.image} alt={place.title} loading="lazy" />
          <div className="place-image-overlay"></div>
          
          <div className="place-rating">
            <Star size={14} color="green" />
            <span>{place.rating}</span>
          </div>
          
          <span className="place-badge">Must Visit</span>
        </div>
        
        <div className="place-content">
          <div className="place-category">
            <MapPin size={14} />
            <span>Popular Attraction</span>
          </div>
          
          <h3>{place.title}</h3>
          <p>{place.description.slice(0, 110)}...</p>
          
          <div className="place-footer">
            <div className="place-location">
              <Navigation size={14} />
              <span>Shimla, HP</span>
            </div>
            
            {/* UPDATED BUTTON - Opens modal instead of navigating */}
            <button 
  className="place-explore-btn"
  onClick={() => setSelectedAttraction(topPopupData.find(t => t.id === place.id))}
>
  <span>Read More</span>
  
</button>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Add "Explore All" button that goes to Shimla page */}
  <div className="explore-more-container">
    <Link to="/shimla#top-attractions" className="explore-btn-premium">
      <span>Explore All Places</span>
      <ArrowRight size={22} />
    </Link>
  </div>

  {/* MODAL - Rendered at the end of the section or page */}
  {selectedAttraction && (
    <Top
      data={selectedAttraction}
      onClose={() => setSelectedAttraction(null)}
    />
  )}
</section>

      {/*===================================================== GREEN NATURE STRIP =================================================*/}
      <section className="green-strip">
        <h2>Feel the Freshness of Nature</h2>
        <p>
          Walk through deodar forests, breathe fresh mountain air, and witness scenic sunrise
          and sunset points that make Shimla a truly magical destination.
        </p>
      </section>

      {/*===================================================== ACTIVITIES & EXPERIENCES ==========================================*/}
      <section className="activities-cinematic" id="activities">
        <div className="progress-line">
          <div className="progress-fill" style={{height: `${scrollProgress}%`}} />
        </div>

        <div className="cinematic-header">
          <div className="header-orb" />
          
          <h2 className="kinetic-title">
            {"Activities".split('').map((char, i) => (
              <span key={i} className="char" style={{'--char-index': i}}>
                {char}
              </span>
            ))}
            <br />
            <span style={{color: '#66bb6a'}}>
              {"& Experiences".split('').map((char, i) => (
                <span key={i} className="char" style={{'--char-index': i + 10}}>
                  {char}
                </span>
              ))}
            </span>
          </h2>
          
          <p className="kinetic-subtitle">
            Discover adventures where every moment becomes a story. From thrilling escapades to peaceful retreats.
          </p>
          
          <div className="scroll-cue">
            <span style={{fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase'}}>
              Scroll to Explore
            </span>
            <div className="scroll-line" />
          </div>
        </div>

        <div className="cards-theater">
          <div className="card-stage">
            
            <div 
              className="morph-card featured"
              onMouseMove={(e) => handleMouseMove(e, 0)}
              onMouseLeave={() => handleMouseLeave(0)}
              style={{transform: cardTransforms[0]}}
              data-aos="fade-up"
            >
              <div 
                className="card-bg" 
                style={{backgroundImage: `url(${trekking})`}}
              />
              <div className="card-overlay" />
              <div className="card-icon-float">
                <Mountain size={24} color="#fff" strokeWidth={1.5} />
              </div>
              <span className="card-number">01</span>
              <div className="card-content">
                <h3 className="card-title">Himalayan Trekking</h3>
                <p className="card-desc">
                  Conquer ancient trails through deodar forests and witness golden sunrises from 12,000 feet.
                </p>
                <div className="card-tags">
                  <span className="card-tag">Expert Guides</span>
                  <span className="card-tag">6-8 Hours</span>
                  <span className="card-tag">All Equipment</span>
                </div>
              </div>
              <div className="magnetic-btn" onClick={() => handleActivityClick('Himalayan Trekking')}>
                <ArrowRight size={20} color="#1b5e20" />
              </div>
            </div>

            <div 
              className="morph-card standard"
              onMouseMove={(e) => handleMouseMove(e, 1)}
              onMouseLeave={() => handleMouseLeave(1)}
              style={{transform: cardTransforms[1]}}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div 
                className="card-bg" 
                style={{backgroundImage: `url(${toy})`}}
              />
              <div className="card-overlay" />
              <div className="card-icon-float">
                <Train size={24} color="#fff" strokeWidth={1.5} />
              </div>
              <span className="card-number">02</span>
              <div className="card-content">
                <h3 className="card-title">Toy Train Journey</h3>
                <p className="card-desc">
                  Travel through 103 tunnels on this UNESCO heritage railway experience.
                </p>
                <div className="card-tags">
                  <span className="card-tag">Heritage</span>
                  <span className="card-tag">5 Hours</span>
                </div>
              </div>
              <div className="magnetic-btn" onClick={() => handleActivityClick('budget')}>
                <ArrowRight size={20} color="#1b5e20" />
              </div>
            </div>

            <div 
              className="morph-card standard"
              onMouseMove={(e) => handleMouseMove(e, 2)}
              onMouseLeave={() => handleMouseLeave(2)}
              style={{transform: cardTransforms[2]}}
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div 
                className="card-bg" 
                style={{backgroundImage: `url(${photo})`}}
              />
              <div className="card-overlay" />
              <div className="card-icon-float">
                <Camera size={24} color="#fff" strokeWidth={1.5} />
              </div>
              <span className="card-number">03</span>
              <div className="card-content">
                <h3 className="card-title">Photography Tours</h3>
                <p className="card-desc">
                  Capture golden hour magic at colonial architecture and mountain viewpoints.
                </p>
                <div className="card-tags">
                  <span className="card-tag">Pro Tips</span>
                  <span className="card-tag">3 Hours</span>
                </div>
              </div>
              <div className="magnetic-btn" onClick={() => handleActivityClick('Weekend')}>
                <ArrowRight size={20} color="#1b5e20" />
              </div>
            </div>

            <div 
              className="morph-card standard"
              onMouseMove={(e) => handleMouseMove(e, 3)}
              onMouseLeave={() => handleMouseLeave(3)}
              style={{transform: cardTransforms[3]}}
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div 
                className="card-bg" 
                style={{backgroundImage: `url(${adventure})`}}
              />
              <div className="card-overlay" />
              <div className="card-icon-float">
                <Bike size={24} color="#fff" strokeWidth={1.5} />
              </div>
              <span className="card-number">04</span>
              <div className="card-content">
                <h3 className="card-title">Adventure Sports</h3>
                <p className="card-desc">
                  Skiing, paragliding and mountain biking for the ultimate thrill seekers.
                </p>
                <div className="card-tags">
                  <span className="card-tag">Extreme</span>
                  <span className="card-tag">Gear Included</span>
                </div>
              </div>
              <div className="magnetic-btn" onClick={() => handleActivityClick('Adventure Sports')}>
                <ArrowRight size={20} color="#1b5e20" />
              </div>
            </div>

            <div 
              className="morph-card standard"
              onMouseMove={(e) => handleMouseMove(e, 4)}
              onMouseLeave={() => handleMouseLeave(4)}
              style={{transform: cardTransforms[4]}}
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div 
                className="card-bg" 
                style={{backgroundImage: `url(${himachali})`}}
              />
              <div className="card-overlay" />
              <div className="card-icon-float">
                <Utensils size={24} color="#fff" strokeWidth={1.5} />
              </div>
              <span className="card-number">05</span>
              <div className="card-content">
                <h3 className="card-title">Himachali Cuisine</h3>
                <p className="card-desc">
                  Authentic cooking classes featuring traditional flavors and local markets.
                </p>
                <div className="card-tags">
                  <span className="card-tag">Cooking</span>
                  <span className="card-tag">Tasting</span>
                </div>
              </div>
              <div className="magnetic-btn" onClick={() => handleActivityClick('Himachali Cuisine')}>
                <ArrowRight size={20} color="#1b5e20" />
              </div>
            </div>

            <div 
              className="morph-card featured"
              onMouseMove={(e) => handleMouseMove(e, 5)}
              onMouseLeave={() => handleMouseLeave(5)}
              style={{transform: cardTransforms[5]}}
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div 
                className="card-bg" 
                style={{backgroundImage: `url(${wellness})`}}
              />
              <div className="card-overlay" />
              <div className="card-icon-float">
                <TreePine size={24} color="#fff" strokeWidth={1.5} />
              </div>
              <span className="card-number">06</span>
              <div className="card-content">
                <h3 className="card-title">Forest Bathing & Wellness</h3>
                <p className="card-desc">
                  Rejuvenate your senses with guided walks through ancient cedar forests and meditation sessions in pristine nature.
                </p>
                <div className="card-tags">
                  <span className="card-tag">Wellness</span>
                  <span className="card-tag">Beginner</span>
                  <span className="card-tag">2 Hours</span>
                </div>
              </div>
              <div className="magnetic-btn" onClick={() => handleActivityClick('Forest Bathing & Wellness')}>
                <ArrowRight size={20} color="#1b5e20" />
              </div>
            </div>

            <div 
              className="morph-card standard"
              onMouseMove={(e) => handleMouseMove(e, 6)}
              onMouseLeave={() => handleMouseLeave(6)}
              style={{transform: cardTransforms[6]}}
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div 
                className="card-bg" 
                style={{backgroundImage: `url(${sport})`}}
              />
              <div className="card-overlay" />
              <div className="card-icon-float">
                <Snowflake size={24} color="#fff" strokeWidth={1.5} />
              </div>
              <span className="card-number">07</span>
              <div className="card-content">
                <h3 className="card-title">Winter Sports</h3>
                <p className="card-desc">
                  Ice skating, skiing, and snowboarding in the winter wonderland of Kufri.
                </p>
                <div className="card-tags">
                  <span className="card-tag">Snow</span>
                  <span className="card-tag">Seasonal</span>
                </div>
              </div>
              <div className="magnetic-btn" onClick={() => handleActivityClick('Winter Sports')}>
                <ArrowRight size={20} color="#1b5e20" />
              </div>
            </div>

          </div>
        </div>
      </section>

            {/*==================================================== SHIMLA SEASONS ====================================================*/}
      <BestTimeSection />

      {/*==================================================== BLOG SECTION ========================================================*/}
      <div className="home">
        <section className="blog-preview-section">
          <div className="blog-preview-container">
            <div className="blog-preview-header">
              <span className="section-label">Travel Blog</span>
              <h2 className="section-title">Stories from the Mountains</h2>
              <p className="section-subtitle">
                Get insider tips, hidden gems, and inspiring stories to plan your perfect Shimla getaway
              </p>
            </div>

            <div className="blog-preview-grid">
              {previewBlogs.map((blog) => (
  <article key={blog.id} className="preview-card">
    <div className="preview-image-wrapper">
      <img src={blog.image} alt={blog.title} className="preview-image" loading="lazy" />
      <div className="preview-date">{blog.date}</div>
    </div>
    <div className="preview-content">
      <h3 className="preview-title">{blog.title}</h3>
      <p className="preview-text">{blog.shortText}</p>
      {/* Updated button with navigation to specific blog */}
      <button onClick={() => navigate(`/blog/${blog.id}`)} className="read-article-btn">
        Read Article
      </button>
    </div>
  </article>
))}
            </div>

            <div className="blog-preview-footer">
              <button className="read-all-btn" onClick={handleReadAllBlogs}>
                <span>Read All Blogs</span>
                <svg className="read-all-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/*=============================================================== FOOTER ============================================================*/}
      <footer className="main-footer">
        <div className="footer-container">

          <div className="footer-grid">

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

            <div className="footer-col">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shimla#destinations">Destinations</Link></li>
                <li><Link to="/shimla#activities">Activities</Link></li>
                <li><Link to="/shimla#shimla-gallery" >Gallery</Link></li>
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

      {/* ── Chatbot popup + chat window ── */}
      <ChatPopup
        message="👋 Planning a trip to Shimla? Ask me anything about hotels, packages, or bookings!"
        emoji="🏔️"
        storageKey="homeChatPopup"
        onOpen={() => setChatOpen(true)}
      />
      <SupportChatbot isOpen={chatOpen} onClose={() => setChatOpen(false)} />

    </div>
  );
}

const places = [
  {
    name: "Jakhu Temple",
    image: jakhuBlog,
    description:
      "Located on the highest peak of Shimla, dedicated to Lord Hanuman. Offers trekking paths and beautiful views.",
  },
  {
    name: "Mall Road",
    image: mallroad,
    description:
      "Popular for colonial buildings, shopping, cafes, and scenic evening walks.",
  },
  {
    name: "Green Valley",
    image: greenvalley,
    description:
      "Known for its lush greenery and breathtaking mountain views.",
  },
];

const seasonsData = [
  {
    id: 'summer',
    name: 'Summer',
    months: 'March - June',
    temp: '15°C - 30°C',
    description: 'The most beloved season in Shimla, summer brings pleasant weather perfect for exploring colonial charm and natural beauty. Families, honeymooners, and adventure enthusiasts flock to enjoy the comfortable climate.',
    image: summer,
    icon: Sun,
    crowdLevel: 'high',
    crowd: 'High Crowd - Book Early',
    humidity: '45%',
    rainfall: 'Low',
    budget: 'Moderate',
    activities: ['Sightseeing', 'Trekking', 'Toy Train', 'Photography', 'Nature Walks'],
    color: '#2e7d32',
    tip: 'Expect busy streets and longer queues. Book accommodations 2-3 weeks ahead.'
  },
  {
    id: 'monsoon',
    name: 'Monsoon',
    months: 'July - September',
    temp: '12°C - 22°C',
    description: 'Experience the hills draped in lush greenery and misty clouds. The off-season brings peace, lower rates, and a serene atmosphere. Ideal for those seeking solitude and natural beauty without crowds.',
    image: monsoon,
    icon: Cloud,
    crowdLevel: 'low',
    crowd: 'Low Crowd - Great Deals',
    humidity: '85%',
    rainfall: 'High',
    budget: 'Low',
    activities: ['Waterfall Visits', 'Indoor Dining', 'Spa & Wellness', 'Museum Tours', 'Photography'],
    color: '#1565c0',
    tip: 'Quiet and peaceful. Enjoy discounted rates and serene landscapes.'
  },
  {
    id: 'winter',
    name: 'Winter',
    months: 'October - February',
    temp: '-2°C - 10°C',
    description: 'Transform your trip into a winter fairy tale with snow-covered landscapes and frosty mornings. Perfect for snow activities and romantic getaways, winter brings a magical charm to the hills.',
    image: winter,
    icon: Snowflake,
    crowdLevel: 'medium',
    crowd: 'Medium Crowd - Peak Season',
    humidity: '35%',
    rainfall: 'Snow',
    budget: 'High',
    activities: ['Skiing', 'Snowboarding', 'Ice Skating', 'Cozy Retreats', 'Christmas Markets'],
    color: '#5e35b1',
    tip: 'Moderate crowds. Good balance of atmosphere and accessibility.'
  }
];

const monthlyData = [
  { month: "January", temp: "3°C - 13°C", crowd: "Very High", pack: "Heavy woolens" },
  { month: "March", temp: "8°C - 20°C", crowd: "Moderate", pack: "Light sweaters" },
  { month: "June", temp: "17°C - 26°C", crowd: "High", pack: "Rain jacket" },
  { month: "December", temp: "2°C - 11°C", crowd: "Very High", pack: "Thermals & boots" },
];