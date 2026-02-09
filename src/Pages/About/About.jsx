import React, { useEffect, useState } from 'react';
import { useLocation,Link } from "react-router-dom";
import { Award, Heart, Shield, Users, Mountain, Sparkles, MapPin, Calendar, ChevronRight, Star, Facebook,Youtube, Instagram, Twitter } from 'lucide-react';
import './About.css';
import about from "../../assets/About.jfif";
import ContactWho from "../../assets/ContactWho.jpeg";


const stories = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    trip: "Shimla Manali Honeymoon Package",
    image: "https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=1200",
    story: "Our honeymoon in Shimla was absolutely magical! The snow-capped mountains, cozy hotels, and personalized service made it unforgettable. Every moment felt like a dream come true.",
    rating: 5
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Delhi",
    trip: "Family Adventure Package",
    image: "https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&w=1200",
    story: "Took my family to Shimla and the kids couldn't stop talking about it! The toy train ride, Mall Road shopping, and the beautiful hotels exceeded all expectations.",
    rating: 5
  },
  {
    id: 3,
    name: "Anjali Mehta",
    location: "Bangalore",
    trip: "Solo Backpacking Experience",
    image: "https://images.pexels.com/photos/1655329/pexels-photo-1655329.jpeg?auto=compress&cs=tinysrgb&w=1200",
    story: "As a solo female traveler, I felt completely safe and welcomed. The local insights and accommodation recommendations were spot-on. Can't wait to book again!",
    rating: 5
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Jaipur",
    trip: "Weekend Mountain Getaway",
    image: "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1200",
    story: "Perfect weekend escape from the city chaos. The hotel had stunning valley views, and the entire booking process was seamless. Highly recommended for quick refreshing breaks!",
    rating: 5
  }
];

const faqData = [
  {
    id: 1,
    question: "What is the best time to visit Shimla?",
    answer: "The ideal time to visit Shimla is between March to June for pleasant weather (16°C-28°C) perfect for sightseeing and outdoor activities. For snow lovers, December to February offers magical snowfall experiences, winter sports, and the famous Ice Skating Carnival."
  },
  {
    id: 2,
    question: "How do I reach Shimla from Delhi?",
    answer: "You can reach Shimla via the UNESCO World Heritage Kalka-Shimla Toy Train (scenic 5-hour journey), by road (343 km, 8-10 hours via NH44), or fly to Jubbarhatti Airport (22 km from city center). We provide comfortable cab services from all major cities."
  },
  {
    id: 3,
    question: "What are the must-visit attractions in Shimla?",
    answer: "Don't miss The Ridge and Mall Road for shopping and colonial architecture, Jakhoo Temple with its 108-ft Hanuman statue, Viceregal Lodge (Indian Institute of Advanced Studies), Kufri for adventure sports, Christ Church, and the scenic Chadwick Falls."
  },
  {
    id: 4,
    question: "Do you offer customized honeymoon packages?",
    answer: "Yes! Our Shimla honeymoon packages include romantic stays at heritage properties, private candlelight dinners with mountain views, flower bed decorations, guided tours to secluded spots like Mashobra and Fagu, and special arrangements for photography sessions."
  },
  {
    id: 5,
    question: "What adventure activities are available?",
    answer: "Shimla offers thrilling paragliding at Kangra Valley, trekking to Jakhoo Peak and Chadwick Falls, skiing and tobogganing in Kufri during winters, river rafting in Tattapani, mountain biking trails, and the famous Ice Skating Rink in Asia's only natural ice skating venue."
  },
  {
    id: 6,
    question: "Are your packages inclusive of meals and accommodation?",
    answer: "Our standard packages include accommodation in 3-star/4-star hotels or heritage properties, daily breakfast and dinner, all sightseeing transfers in AC vehicles, and professional guides. We offer flexible options to upgrade to luxury resorts or include all meals based on your preferences."
  }
];

const About = () => {
  const [scrollY, setScrollY] = useState(0);

  const parallaxOffset = Math.min(scrollY * 0.15, 120);

  const [previewImage, setPreviewImage] = useState(null);

 useEffect(() => {
  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

const [activeId, setActiveId] = useState(null);

const location = useLocation();

useEffect(() => {
  if (location.hash) {
    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }
}, [location]);


  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-sectio" data-testid="about-hero-section">
        <div 
          className="hero-background"
          style={{
            backgroundImage: `url(${about})`,
            transform: `translateY(${parallaxOffset}px)`
          }}
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-title" data-testid="hero-title">
            About Our Shimla Travel Agency
          </h1>
          <p className="hero-subtitle" data-testid="hero-subtitle">
            Crafting Unforgettable Journeys Through the Queen of Hills Since 2010
          </p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="content-section who-we-are" data-testid="who-we-are-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge">Our Identity</span>
            <h2 className="section-title">Who We Are</h2>
          </div>
          <div className="two-column-layout">
            <div className="column-text">
              <p className="text-content">
                We are not just another travel agency – we are passionate storytellers, experience curators, 
                and your trusted companions in exploring the magnificent beauty of Shimla and its surrounding regions. 
                Born from a deep love for the Himalayas and a desire to share its magic with the world, 
                our agency has become a bridge between travelers seeking authentic experiences and the 
                breathtaking landscapes of Himachal Pradesh.
              </p>
              <p className="text-content">
                With years of expertise and an intimate knowledge of every winding road, hidden trail, 
                and local treasure, we pride ourselves on creating journeys that go beyond mere sightseeing. 
                We believe that travel should touch your soul, create lasting memories, and connect you 
                with the heart and spirit of a destination.
              </p>
            </div>
            <div className="column-image">
              <img 
                src={ContactWho} 
                alt="Shimla landscape"
                className="content-image"
                onClick={() => setPreviewImage(ContactWho)}
                data-testid="who-we-are-image"
              />
            {previewImage && (
  <div className="image-preview-overlay" onClick={() => setPreviewImage(null)}>
    <div className="image-preview-content" onClick={(e) => e.stopPropagation()}>
      <button
        className="image-close-btn"
        onClick={() => setPreviewImage(null)}
        aria-label="Close image preview"
      >
        ✕
      </button>

      <img src={previewImage} alt="Preview" />
    </div>
  </div>
)}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="content-section our-story" data-testid="our-story-section">
        <div className="section-container">
          <div className="section-header centered">
            <span className="section-badge">Our Beginning</span>
            <h2 className="section-title">Our Story & Journey</h2>
          </div>
          <div className="story-timeline">
            <div className="timeline-item" data-testid="timeline-item-1">
              <div className="timeline-icon">
                <Mountain className="icon" />
              </div>
              <div className="timeline-content">
                <h3 className="timeline-year">2010 - The Beginning</h3>
                <p className="timeline-text">
                  It all started with a simple dream of two mountain enthusiasts who fell in love with 
                  Shimla's pristine beauty. What began as organizing small group treks evolved into a 
                  full-fledged travel agency dedicated to showcasing the region's wonders.
                </p>
              </div>
            </div>
            <div className="timeline-item" data-testid="timeline-item-2">
              <div className="timeline-icon">
                <Users className="icon" />
              </div>
              <div className="timeline-content">
                <h3 style={{marginTop:"100px"}} className="timeline-year">2015 - Growth & Recognition</h3>
                <p className="timeline-text">
                  As word spread about our personalized service and authentic experiences, we expanded 
                  our team to include local guides, hospitality experts, and adventure specialists. 
                  Our commitment to excellence earned us recognition as one of Himachal's trusted travel partners.
                </p>
              </div>
            </div>
            <div className="timeline-item" data-testid="timeline-item-3">
              <div className="timeline-icon">
                <Award className="icon" />
              </div>
              <div className="timeline-content">
                <h3 className="timeline-year">2020 - Innovation & Sustainability</h3>
                <p className="timeline-text">
                  We pioneered eco-friendly travel initiatives and partnered with local communities to 
                  ensure tourism benefits everyone. Our focus shifted to creating meaningful, sustainable 
                  travel experiences that preserve Shimla's natural heritage.
                </p>
              </div>
            </div>
            <div className="timeline-item" data-testid="timeline-item-4">
              <div className="timeline-icon">
                <Sparkles className="icon" />
              </div>
              <div className="timeline-content">
                <h3 style={{marginTop:"100px"}} className="timeline-year">Today - Your Journey Begins</h3>
                <p className="timeline-text">
                  With over 15,000 happy travelers and countless unforgettable memories created, we continue 
                  to innovate while staying true to our core values. Every journey we craft is a testament 
                  to our passion for exceptional travel experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* History & Culture of Shimla */}
      <section className="content-section culture-section" data-testid="culture-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge">Heritage & Traditions</span>
            <h2 className="section-title">History & Culture of Shimla</h2>
          </div>
          <div className="two-column-layout reverse">
            <div className="column-image">
              <img 
                src="https://images.pexels.com/photos/30736770/pexels-photo-30736770.jpeg" 
                alt="Shimla heritage architecture"
                className="content-image"
                data-testid="culture-image"
              />
            </div>
            <div className="column-text">
              <h3 className="subsection-title">The Queen of Hills: A Timeless Tale</h3>
              <p className="text-content">
                Shimla's story is woven with threads of colonial grandeur, ancient traditions, and natural splendor. 
                Once a sleepy village discovered by British officer Charles Pratt Kennedy in 1819, Shimla transformed 
                into the summer capital of British India, a legacy reflected in its Victorian architecture, 
                Gothic churches, and neo-Tudor buildings that still grace the mountainsides.
              </p>
              <h3 className="subsection-title">Rich Cultural Tapestry</h3>
              <p className="text-content">
                Beyond its colonial heritage, Shimla is home to vibrant Pahari culture, ancient temples like 
                Jakhu and Tara Devi, and traditional festivals that celebrate the region's spiritual roots. 
                The local communities maintain age-old customs, handicrafts, and folklore that have been 
                passed down through generations. From the traditional Nati dance to the colorful fairs 
                celebrating harvests and deities, Shimla's culture is alive and thriving.
              </p>
              <h3 className="subsection-title">Architectural Marvels</h3>
              <p className="text-content">
                The iconic Ridge, Viceregal Lodge, Christ Church, and Gaiety Theatre stand as testaments to 
                a bygone era, while the narrow lanes of Lower Bazaar echo with stories of merchants, artisans, 
                and generations of hill people who have called this place home.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/*  Vision, Mission & Values */}
      <section className="vision-layout-1">
        <div className="container">
          <div className="split-content">
            <div className="left-content">
              <div className="vision-block">
                <span className="label">Our Vision</span>
                <h2>To Be the Most Trusted Travel Partner in the Himalayas</h2>
                <p>We envision a world where every traveler experiences the magic of Shimla and the surrounding hills with authenticity, comfort, and joy. Our goal is to make mountain travel accessible, sustainable, and unforgettable.</p>
              </div>

              <div className="mission-block">
                <span className="label">Our Mission</span>
                <p>To craft exceptional travel experiences that connect people with the natural beauty, rich culture, and warm hospitality of Shimla. We strive to create journeys that inspire, educate, and leave a positive impact on both travelers and local communities.</p>
              </div>
            </div>

            <div className="right-content">
              <div className="stats-grid">
                <div className="stat-box">
                  <h3>15+</h3>
                  <p>Years of Excellence</p>
                </div>
                <div className="stat-box">
                  <h3>10,000+</h3>
                  <p>Happy Travelers</p>
                </div>
                <div className="stat-box">
                  <h3>150+</h3>
                  <p>Tour Packages</p>
                </div>
                <div className="stat-box">
                  <h3>98%</h3>
                  <p>Satisfaction Rate</p>
                </div>
              </div>

              <div className="values-compact">
                <h4>Core Values</h4>
                <ul>
                  <li><strong>Integrity:</strong> Honest and transparent in all dealings</li>
                  <li><strong>Excellence:</strong> Committed to the highest standards</li>
                  <li><strong>Sustainability:</strong> Protecting nature for future generations</li>
                  <li><strong>Passion:</strong> Loving what we do, every single day</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      


      {/* Our Commitment Section */}
      <section className="content-section commitment-section" data-testid="commitment-section">
        <div className="section-container">
          <div className="section-header centered">
            <span className="section-badge">Our Promise</span>
            <h2 className="section-title">Our Commitment to You</h2>
            <p className="section-description">
              When you choose us, you're not just booking a trip – you're partnering with a team 
              that genuinely cares about making your travel dreams come true
            </p>
          </div>
          <div className="commitment-grid">
            <div className="commitment-card" data-testid="commitment-card-1">
              <div className="commitment-icon">
                <Shield className="icon" />
              </div>
              <h3 className="commitment-title">Transparent Communication</h3>
              <p className="commitment-text">
                No hidden charges or surprises. What we quote is exactly what you pay, with full 
                clarity on inclusions and exclusions. Our detailed itineraries leave no room for 
                confusion, and we're always available to answer every question, no matter how small. 
                We believe trust is built on honesty, and we practice complete transparency in all 
                our dealings.
              </p>
            </div>
            <div className="commitment-card" data-testid="commitment-card-2">
              <div className="commitment-icon">
                <Award className="icon" />
              </div>
              <h3 className="commitment-title">Quality Assurance</h3>
              <p className="commitment-text">
                Every hotel, restaurant, transport provider, and activity operator we work with is 
                personally vetted by our team. We don't just check reviews – we visit, inspect, and 
                experience them ourselves to maintain our high standards of comfort, safety, and service. 
                Your satisfaction is our reputation, and we never compromise on quality.
              </p>
            </div>
            <div className="commitment-card" data-testid="commitment-card-3">
              <div className="commitment-icon">
                <Heart className="icon" />
              </div>
              <h3 className="commitment-title">Responsible Tourism</h3>
              <p className="commitment-text">
                We are deeply committed to eco-friendly practices and supporting local communities. 
                From minimizing plastic use to partnering with local artisans and guides, we ensure 
                tourism benefits the region economically and culturally. We encourage our travelers 
                to respect local customs, minimize environmental impact, and contribute positively 
                to the places they visit.
              </p>
            </div>
            <div className="commitment-card" data-testid="commitment-card-4">
              <div className="commitment-icon">
                <Sparkles className="icon" />
              </div>
              <h3 className="commitment-title">Lifetime Support</h3>
              <p className="commitment-text">
                Our relationship doesn't end when your trip does. Need help with photo memories? 
                Want advice for your next adventure? Just feeling nostalgic and want to chat about 
                your experience? We're here. Many of our clients have become lifelong friends, and 
                we're honored to be part of their journey beyond just one trip.
              </p>
            </div>
          </div>
        </div>
      </section>

 
      {/* ===========FAQs============= */}
       <section className="faq-style-one" id="FAQs">
      <div className="faq-container">
        <div className="faq-header">
          <span className="faq-subtitle">Have Questions?</span>
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-description">Everything you need to know about your Shimla adventure</p>
        </div>
        
        <div className="faq-list">
          {faqData.map((faq) => (
            <div 
              key={faq.id} 
              className={`faq-item ${activeId === faq.id ? 'active' : ''}`}
              onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
            >
              <div className="faq-question-wrapper">
                <h3 className="faq-question">{faq.question}</h3>
                <span className="faq-icon">
                  {activeId === faq.id ? '−' : '+'}
                </span>
              </div>
              <div className={`faq-answer-wrapper ${activeId === faq.id ? 'open' : ''}`}>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      
      {/* Reviews, Stories from Our Travelers */}
      <section className="horizontal-section">
      <div className="horizontal-intro">
        <div className="horizontal-intro-content">
          <span className="horizontal-label">Real Stories</span>
          <h2 className="horizontal-title">Stories from Our Travelers</h2>
          <p className="horizontal-description">
            Discover authentic experiences from travelers who explored the beauty of Shimla with us.
            Each story is a testament to unforgettable journeys and cherished memories.
          </p>
          <div className="horizontal-scroll-hint">
            <span>Scroll to explore</span>
            <ChevronRight className="horizontal-arrow" />
          </div>
        </div>
      </div>

      <div className="horizontal-carousel">
        <div className="horizontal-track">
          {stories.map((story) => (
            <div key={story.id} className="horizontal-slide">
              <div className="horizontal-image-container">
                <img src={story.image} alt={story.trip} className="horizontal-image" />
                <div className="horizontal-overlay"></div>
              </div>

              <div className="horizontal-content">
                <div className="horizontal-content-inner">
                  <div className="horizontal-rating">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="horizontal-star" />
                    ))}
                  </div>

                  <blockquote className="horizontal-quote">
                    {story.story}
                  </blockquote>

                  <div className="horizontal-divider"></div>

                  <div className="horizontal-author-section">
                    <div className="horizontal-author-info">
                      <div className="horizontal-author-name">{story.name}</div>
                      <div className="horizontal-author-location">
                        <MapPin className="horizontal-location-icon" />
                        {story.location}
                      </div>
                    </div>

                    <div className="horizontal-trip-badge">
                      {story.trip}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

          {/* footer */}
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
          <li><a href="#">Travel Guide</a></li>
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
    </section>


    </div>
  );
};

export default About;
