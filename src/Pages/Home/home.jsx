import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import Navbar from "../../Components/Navbar/navbar.jsx";
import jakhuBlog from "../../assets/jakhutemple.webp";
import mallroad from "../../assets/road.jpg";
import greenvalley from "../../assets/greenv.jpg";
import ridge from "../../assets/ridge.webp";
import kufri from "../../assets/kufri.webp";
import advancedstudy from "../../assets/study.jpg";
import summer from "../../assets/ridge.webp";
import monsoon from "../../assets/monsoon.jpg";
import winter from "../../assets/winter.webp";




import { Mountain, Facebook, Instagram, Twitter, Youtube, Bike, Camera, Utensils, Train, TreePine, Sun, Cloud, Snowflake, Calendar, ChevronDown, Backpack, Thermometer, Droplets, Palette, AlertCircle, DollarSign, Users, Heart, MapPin, WifiOff, TrendingUp } from "lucide-react";


export default function Home() {
  const [activeSeason, setActiveSeason] = useState(0);
  return (
    <div className="home-wrapper">
      <div className="bg-red-600 text-white text-3xl p-10">
  TAILWIND TEST
</div>
       {/* Navbar */}
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">Explore Shimla – The Queen of Hills</h1>
          <p className="hero-subtitle">
            Travel through lush forests, snow-covered peaks, waterfalls, valleys,
            and peaceful mountain temples.
          </p>
          <a href="#places" className="hero-btn">Start Exploring</a>
        </div>
      </section>

      {/* ================= ABOUT SHIMLA ================= */}
      <section className="about-section">
        <h2>About Shimla</h2>
        <p>
          Shimla, the capital city of Himachal Pradesh, is one of India's most beautiful hill
          stations. Known for its colonial architecture, green valleys, fresh air, snowfall,
          adventure sports, temples, and peaceful nature trails, Shimla attracts millions of
          tourists every year. It lies at an altitude of 2,205 meters and offers spectacular
          views of the Himalayas.
        </p>
        <p>
          The city was once the summer capital during British rule, which is why many
          heritage buildings still stand preserved. Today, Shimla is famous for Mall Road,
          Jakhu Temple, Christ Church, Ridge, Kufri, Green Valley, toy train, and countless
          scenic viewpoints.
        </p>
      </section>

      {/* ================= TOP PLACES ================= */}
      <section id="places" className="places-section">
        <h2 className="section-heading">Popular Tourist Places</h2>
        <div className="places-grid">
          {places.map((p, i) => (
            <div key={i} className="place-card">
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= GREEN NATURE STRIP ================= */}
      <section className="green-strip">
        <h2>Feel the Freshness of Nature</h2>
        <p>
          Walk through deodar forests, breathe fresh mountain air, and witness scenic sunrise
          and sunset points that make Shimla a truly magical destination.
        </p>
      </section>

{/* ================= ACTIVITIES & ADVENTURE ================= */}
<section className="activities-section" id="activities">
  <h2 className="section-heading">Activities & Experiences</h2>
  <p className="section-subheading">
    Immerse yourself in unforgettable adventures and cultural experiences
  </p>

  <div className="activities-grid">

    <div className="activity-card">
      <div className="activity-icon emerald">
        <Mountain size={32} />
      </div>
      <h3>Trekking & Hiking</h3>
      <p>Explore scenic trails through pine forests and mountain peaks.</p>
    </div>

    <div className="activity-card">
      <div className="activity-icon blue">
        <Bike size={32} />
      </div>
      <h3>Adventure Sports</h3>
      <p>Skiing, ice skating, mountain biking and thrilling experiences.</p>
    </div>

    <div className="activity-card">
      <div className="activity-icon orange">
        <Camera size={32} />
      </div>
      <h3>Photography Tours</h3>
      <p>Capture breathtaking landscapes and colonial architecture.</p>
    </div>

    <div className="activity-card">
      <div className="activity-icon red">
        <Utensils size={32} />
      </div>
      <h3>Local Cuisine</h3>
      <p>Enjoy authentic Himachali dishes and traditional flavors.</p>
    </div>

    <div className="activity-card">
      <div className="activity-icon cyan">
        <Train size={32} />
      </div>
      <h3>Toy Train Ride</h3>
      <p>Ride the UNESCO heritage Kalka–Shimla toy train.</p>
    </div>

    <div className="activity-card">
      <div className="activity-icon green">
        <TreePine size={32} />
      </div>
      <h3>Nature Walks</h3>
      <p>Relax with peaceful walks through cedar and deodar forests.</p>
    </div>

  </div>
</section>

{/* ================= Best time to visit ================= */}

<div className="best-time-wrapper">

  {/* HERO */}
  <section className="when-to-visit-4">
      <div className="container-4">
        <div className="intro-section-4">
          <div className="intro-content-4">
            <h2 className="title-4">Discover the Best Time to Visit Shimla</h2>
            <p className="intro-text-4">
              Nestled in the Himalayas, Shimla offers unique experiences throughout the year.
              Each season paints the hills in different colors, bringing distinct adventures
              and memories. Choose your perfect time based on weather, activities, and atmosphere.
            </p>
            <div className="stats-row-4">
              <div className="stat-item-4">
                <MapPin size={24} />
                <div>
                  <div className="stat-number-4">7,238 ft</div>
                  <div className="stat-label-4">Elevation</div>
                </div>
              </div>
              <div className="stat-item-4">
                <TrendingUp size={24} />
                <div>
                  <div className="stat-number-4">Year-Round</div>
                  <div className="stat-label-4">Accessible</div>
                </div>
              </div>
            </div>
          </div>
          <div className="intro-image-4">
            <img src="https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Shimla Hills" />
          </div>
        </div>

        <div className="seasons-section-4">
          <div className="season-block-4 summer-block-4">
            <div className="season-image-side-4">
              <img src={summer} alt="Summer" />
              <div className="image-label-4">
                <Sun size={28} />
                <span>Summer</span>
              </div>
            </div>
            <div className="season-text-side-4">
              <div className="season-header-4">
                <h3 className="season-name-4">Summer in Shimla</h3>
                <div className="season-badge-4">March - June</div>
              </div>
              <div className="temp-display-4">15°C - 30°C</div>
              <p className="season-para-4">
                The most beloved season in Shimla, summer brings pleasant weather perfect for
                exploring the colonial charm and natural beauty. Families, honeymooners, and
                adventure enthusiasts flock to enjoy the comfortable climate.
              </p>
              <div className="highlights-4">
                <div className="highlight-chip-4">Peak Season</div>
                <div className="highlight-chip-4">Best Weather</div>
                <div className="highlight-chip-4">Outdoor Activities</div>
                <div className="highlight-chip-4">Festival Season</div>
              </div>
              <div className="recommendation-4">
                <strong>Recommended for:</strong> First-time visitors, families with children,
                photographers, and those seeking comfortable temperatures for sightseeing.
              </div>
            </div>
          </div>

          <div className="season-block-4 winter-block-4">
            <div className="season-text-side-4">
              <div className="season-header-4">
                <h3 className="season-name-4">Winter in Shimla</h3>
                <div className="season-badge-4">December - February</div>
              </div>
              <div className="temp-display-4">-2°C - 10°C</div>
              <p className="season-para-4">
                Transform your trip into a winter fairy tale with snow-covered landscapes and
                frosty mornings. Perfect for snow activities and romantic getaways, winter
                brings a magical charm to the hills.
              </p>
              <div className="highlights-4">
                <div className="highlight-chip-4">Snowfall</div>
                <div className="highlight-chip-4">Winter Sports</div>
                <div className="highlight-chip-4">Christmas Vibes</div>
                <div className="highlight-chip-4">Honeymoon Special</div>
              </div>
              <div className="recommendation-4">
                <strong>Recommended for:</strong> Snow lovers, couples, adventure seekers
                interested in skiing and ice skating, and those who enjoy cozy mountain retreats.
              </div>
            </div>
            <div className="season-image-side-4">
              <img src={winter} alt="Winter" />
              <div className="image-label-4">
                <Snowflake size={28} />
                <span>Winter</span>
              </div>
            </div>
          </div>

          <div className="season-block-4 monsoon-block-4">
            <div className="season-image-side-4">
              <img src={monsoon} alt="Monsoon" />
              <div className="image-label-4">
                <Cloud size={28} />
                <span>Monsoon</span>
              </div>
            </div>
            <div className="season-text-side-4">
              <div className="season-header-4">
                <h3 className="season-name-4">Monsoon in Shimla</h3>
                <div className="season-badge-4">July - September</div>
              </div>
              <div className="temp-display-4">15°C - 20°C</div>
              <p className="season-para-4">
                Experience the hills draped in lush greenery and misty clouds. The off-season
                brings peace, lower rates, and a serene atmosphere. Ideal for those seeking
                solitude and natural beauty without crowds.
              </p>
              <div className="highlights-4">
                <div className="highlight-chip-4">Off-Season Rates</div>
                <div className="highlight-chip-4">Lush Greenery</div>
                <div className="highlight-chip-4">Fewer Tourists</div>
                <div className="highlight-chip-4">Peaceful Ambiance</div>
              </div>
              <div className="recommendation-4">
                <strong>Recommended for:</strong> Budget travelers, nature photographers,
                couples seeking privacy, and those who appreciate the beauty of rain-soaked mountains.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>



  {/* TRAVEL TIPS */}
<section className="best-section light">
  <h2 className="best-heading">Travel Tips</h2>
  <p className="best-subtitle">
    Helpful advice to make your Shimla trip safe, comfortable, and stress-free.
  </p>

  <div className="tips-layout">

    <div className="tips-item">
      <div className="tips-icon warning">
        <AlertCircle size={22} />
      </div>
      <div className="tips-content">
        <h3>Road & Weather Conditions</h3>
        <p>
          Mountain roads can be narrow and slippery, especially during monsoon
          and snowfall seasons.
        </p>
        <span className="tips-note">Best time to travel: Daylight hours</span>
      </div>
    </div>

    <div className="tips-item">
      <div className="tips-icon money">
        <DollarSign size={22} />
      </div>
      <div className="tips-content">
        <h3>Book Early</h3>
        <p>
          Hotels and transport prices rise quickly during peak tourist seasons
          like summer vacations and snowfall months.
        </p>
        <span className="tips-note">Tip: Book 2–3 weeks in advance</span>
      </div>
    </div>

    <div className="tips-item">
      <div className="tips-icon crowd">
        <Users size={22} />
      </div>
      <div className="tips-content">
        <h3>Avoid Peak Crowds</h3>
        <p>
          Weekends and public holidays attract heavy crowds on Mall Road and
          major attractions.
        </p>
        <span className="tips-note">Best days: Tuesday – Thursday</span>
      </div>
    </div>

    <div className="tips-item">
      <div className="tips-icon health">
        <Heart size={22} />
      </div>
      <div className="tips-content">
        <h3>Health & Comfort</h3>
        <p>
          High altitude and cold weather can cause dehydration and fatigue.
          Carry water and warm clothing.
        </p>
        <span className="tips-note">Must carry: Water bottle & jacket</span>
      </div>
    </div>

  </div>
</section>


  {/* PACKING */}
 <section className="packing-section">
  <h2 className="packing-heading">What to Pack</h2>
  <p className="packing-sub">
    Pack smart for Shimla’s changing weather and terrain to enjoy a stress-free trip.
  </p>

  <div className="packing-layout">
    {/* LEFT – CHECKLIST */}
    <div className="packing-list">
      <div className="pack-group">
        <h3>🧥 Clothing Essentials</h3>
        <ul>
          <li><Backpack /> Warm jackets & sweaters</li>
          <li><Backpack /> Thermal wear (winter)</li>
          <li><Backpack /> Comfortable walking shoes</li>
        </ul>
      </div>

      <div className="pack-group">
        <h3>🌦 Weather Protection</h3>
        <ul>
          <li><Backpack /> Rain jacket / poncho</li>
          <li><Backpack /> Sunscreen & sunglasses</li>
          <li><Backpack /> Gloves & woolen caps</li>
        </ul>
      </div>

      <div className="pack-group">
        <h3>🧰 Travel Must-Haves</h3>
        <ul>
          <li><Backpack /> Power bank</li>
          <li><Backpack /> Personal medicines</li>
          <li><Backpack /> ID & travel documents</li>
        </ul>
      </div>
    </div>

    {/* RIGHT – SUITCASE VISUAL */}
    <div className="packing-visual">
      <div className="suitcase">
        <span>🧳</span>
        <p>Your Trip Essentials</p>
      </div>

      <div className="packing-note">
        <strong>Pro Tip:</strong>
        <p>
          Shimla evenings get cold even in summer. Always carry one extra warm layer.
        </p>
      </div>
    </div>
  </div>
</section>

  {/* CTA */}
  <section className="best-cta">
    <h2>Ready to Plan Your Shimla Trip?</h2>
    <button>Start Planning</button>
  </section>

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

    </div>
  );
}

/* ======== PLACE DATA ======== */
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
  {
    name: "The Ridge",
    image: ridge,
    description:
      "A cultural hub offering amazing views and heritage architecture.",
  },
  {
    name: "Kufri",
    image: kufri,
    description:
      "Adventure destination famous for snow, horse riding, and nature park.",
  },
  {
    name: "Advanced Study",
    image: advancedstudy,
    description:
      "A historic British-era building with gardens and guided tours.",
  },
];

const seasons = [
  {
    name: "Summer",
    months: "March – June",
    temp: "15°C – 30°C",
    desc: "Pleasant weather, perfect for sightseeing.",
    icon: Sun,
    bestFor: "Sightseeing",
    crowd: "High Crowd",
    budget: "Moderate Budget",
    tip: "Carry sunscreen and light jackets for evenings.",
    image: summer
  },
  {
    name: "Monsoon",
    months: "July – September",
    temp: "12°C – 22°C",
    desc: "Lush greenery with occasional landslides.",
    icon: Cloud,
    bestFor: "Nature Lovers",
    crowd: "Low Crowd",
    budget: "Low Budget",
    tip: "Avoid trekking during heavy rainfall.",
    image: monsoon
  },
  {
    name: "Winter",
    months: "October – February",
    temp: "-2°C – 10°C",
    desc: "Snowfall and magical winter views.",
    icon: Snowflake,
    bestFor: "Snow & Honeymoon",
    crowd: "Medium Crowd",
    budget: "High Budget",
    tip: "Book hotels early during snowfall season.",
    image: winter
    
  }
];


const monthlyData = [
  { month: "January", temp: "3°C - 13°C", crowd: "Very High", pack: "Heavy woolens" },
  { month: "March", temp: "8°C - 20°C", crowd: "Moderate", pack: "Light sweaters" },
  { month: "June", temp: "17°C - 26°C", crowd: "High", pack: "Rain jacket" },
  { month: "December", temp: "2°C - 11°C", crowd: "Very High", pack: "Thermals & boots" },
];




