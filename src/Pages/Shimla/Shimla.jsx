import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation,Link } from "react-router-dom";
import "./Shimla.css";
import Top from "../../Components/AttractionModal/TopAttractions";
import { topPopupData } from "../../JS Data/ShimlaAttractionsCardsModal";
import { topAttractions } from "../../JS Data/ShimlaAttractionsCards";
import { MapPin, Users, Award, Camera, Clock, Gem, TrendingUp, Star, Mountain, Snowflake, Wind, UtensilsCrossed, Soup, 
Coffee, IceCreamCone, ShoppingBag, Home, Gift, Stars, Shirt, Sparkles, Navigation, CheckCircle, Plane, CircleAlert, Train,
IndianRupee, Car, Bus, ArrowRight, Trees, Sunrise, Phone, Package, Facebook,Youtube, Instagram, Twitter } from "lucide-react";
import Tre from"../../assets/trekking.webp";
import Ski from"../../assets/Skiing.jpg";
import nat from"../../assets/nature.jpg";
import para from"../../assets/para.webp";
import shawlImg from "../../assets/shaw.jpeg";
import woodImg from "../../assets/wood.webp";
import jewelryImg from "../../assets/jewelry.jpeg";
import capImg from "../../assets/cap.webp";
import teaImg from "../../assets/tea.jpeg";
import appleImg from "../../assets/apple.jpeg";
import kufrii from "../../assets/kufrii.jpg";
import chail from "../../assets/Chail.jpg";
import Naldehra from "../../assets/naldehra.webp";
import narkanda from "../../assets/narkanda.webp";
import mashobra from "../../assets/mashobra.jpg";
import kasauli from "../../assets/kasauli.webp";
import solan from "../../assets/solan.jpg";
import tattapani from "../../assets/tattapani.jpeg";
import fagu from "../../assets/fagu.jpg";
import g1 from "../../assets/gallery1.jpg";
import g2 from "../../assets/gallery2.jfif";
import g3 from "../../assets/gallery3.jpg";
import g4 from "../../assets/gallery4.jfif";
import g5 from "../../assets/gallery5.webp";
import g6 from "../../assets/gallery6.jpg";
import g7 from "../../assets/gallery7.jpg";
import g8 from "../../assets/gallery8.avif";
import g9 from "../../assets/gallery9.jpg";
import g10 from "../../assets/gallery10.webp";
import g11 from "../../assets/gallery11.jpg";
import g12 from "../../assets/gallery12.jpg";
import g13 from "../../assets/gallery13.jpg";
import g14 from "../../assets/gallery14.webp";
import g15 from "../../assets/gallery15.webp";
import g16 from "../../assets/gallery16.webp";

const cards = [
{ title: 'Kufri', distance: '16 km', time: '30 minutes', height: '2,510m', desc: 'A winter wonderland famous for snow-covered landscapes, skiing opportunities, and the Himalayan Nature Park. Kufri offers panoramic views of the surrounding peaks and valleys.' },
{ title: 'Chail', distance: '45 km', time: '1.5 hours', height: '2,250m', desc: 'A serene hill station known for having the highest cricket ground in the world, offering tranquility and dense deodar forests.' },
{ title: 'Naldehra', distance: '22 km', time: '1 hour', height: '2,044m', desc: 'Famous for its historic golf course surrounded by cedar forests and scenic mountain views.' },
{ title: 'Mashobra', distance: '13 km', time: '40 minutes', height: '2,146m', desc: 'A quiet retreat near Shimla known for apple orchards and peaceful surroundings.' },
{ title: 'Tattapani', distance: '51 km', time: '2 hours', height: '655m', desc: 'Popular for natural hot water springs along the Satluj River.' },
{ title: 'Narkanda', distance: '60 km', time: '2.5 hours', height: '2,708m', desc: 'Known for skiing slopes, apple orchards, and stunning Himalayan views.' },
{ title: 'Kasauli', distance: '75 km', time: '3 hours', height: '1,927m', desc: 'A charming colonial hill station with scenic walking trails.' },
{ title: 'Solan', distance: '45 km', time: '1.5 hours', height: '1,600m', desc: 'Known as the Mushroom City of India with pleasant climate.' },
{ title: 'Shoghi', distance: '13 km', time: '35 minutes', height: '1,890m', desc: 'A peaceful village surrounded by pine forests.' }
];

const nearbyCardsData = [
  {
    id: 1,
    title: "Kufri",
    image: kufrii,
    rightIcon: <Snowflake/>,
    distance: "16 km",
    time: "30 minutes",
    height: "2,510m",
    description:
      "A winter wonderland famous for its snow-covered landscapes, skiing opportunities, and the Himalayan Nature Park. Kufri offers panoramic views of the surrounding peaks and valleys.",
    attractions: [
      "Mahasu Peak – Highest point with breathtaking 360° views",
      "Himalayan Nature Park – Home to rare Himalayan wildlife",
      "Skiing & Tobogganing – Winter sports activities (December–February)",
      "Kufri Fun World – Highest amusement park in the world",
      "Horse Riding – Explore scenic trails on horseback",
    ],
    bestTime:
      "November to February for snow; March to June for pleasant weather",
    mustTry:
      "Hot chocolate at local cafes while enjoying snow views",
    activities: ["Skiing", "Trekking", "Photography", "Nature Walks"],
  },

  {
    id: 2,
    title: "Chail",
    image: chail,
    rightIcon: <Mountain/>,
    distance: "45 km",
    time: "1.5 hours",
    height: "2,250m",
    description:
      "A serene hill station known for having the highest cricket ground in the world. Chail offers tranquility away from crowded tourist spots with magnificent deodar forests.",
    attractions: [
      "Chail Cricket Ground – World's highest cricket ground",
      "Chail Palace – Former summer capital of Maharaja of Patiala",
      "Kali Ka Tibba – Ancient temple with panoramic views",
      "Chail Wildlife Sanctuary – Spot ghoral, sambhar, and rare birds",
      "Sadhupul Lake – Perfect picnic spot with adventure activities",
    ],
    bestTime: "March to June and September to November, the weather is pleasantly mild",
    mustTry: "Stay at the heritage Chail Palace Hotel and enjoy royal comfort",
    activities: ["Cricket Viewing", "Palace Tours", "Wildlife Safari", "Camping"],
  },

   {
    id: 3,
    title: "Naldehra",
    image: Naldehra,
    rightIcon: <Trees/>,
    distance: "23km",
    time: "45 minutes",
    height: "2,044m",
    description:
      "Home to one of India's oldest and most scenic golf courses, surrounded by dense cedar forests. A perfect destination for golf enthusiasts and nature lovers.",
    attractions: [
      "Naldehra Golf Course - 9-hole championship course designed in 1905",
      "Shaily Peak - Trek through pine forests for stunning views",
      "Horse Riding - Explore trails through deodar forests",
      "Tattapani Hot Springs - Natural hot water springs (45 km from Naldehra)",
      "Adventure Activities - Zorbing and rope activities",
    ],
    bestTime: "April to June and September to November (comfortable climate)",
    mustTry: "Round of golf at the historic golf course with mountain views",
    activities: ["Golfing", "Horse", "Riding", "Trekking", "Zorbing"],
  },

  {
    id: 4,
    title: "Mashobra",
    image: mashobra,
    rightIcon: <Trees/>,
    distance: "13km",
    time: "25 mintues",
    height: "2,146m",
    description:
      "A peaceful hamlet famous for its apple orchards and dense pine forests. Mashobra offers a quieter alternative to bustling Shimla with beautiful nature trails.",
    attractions: [
      "Reserve Forest Sanctuary - Dense oak and pine forests",
      "Craignano Nature Park - Walking trails and camping facilities",
      "Apple Orchards - Visit during harvest season (September-October)",
      "Mahasu Devta Temple - Ancient temple with intricate architecture",
      "Carignano - Victorian mansion and beautiful gardens",
    ],
    bestTime: "March to June and September to November, the weather is pleasantly mild",
    mustTry: "Fresh apple juice and local apple products from nearby orchards",
    activities: ["Nature", "Walks", "Apple", "Picking", "Camping", "Photography"],
  },

  {
    id: 5,
    title: "Kasauli",
    image: kasauli,
    rightIcon: <Sunrise/>,
    distance: "77km",
    time: "2.5 hours",
    height: "1,927m",
    description:
      "A charming colonial-era town with Victorian buildings, serene atmosphere, and spectacular sunrise views. Perfect for a peaceful weekend getaway.",
    attractions: [
      "Christ Church - Gothic-style church built in 1853",
      "Monkey Point - Highest point with panoramic Himalayan views",
      "Mall Road - Colonial architecture and local shops",
      "Gilbert Trail - Scenic walking trail through forests",
      "Sunset Point - Spectacular evening views over the plains",
    ],
    bestTime: "March to June and September to November, the weather is pleasantly mild",
    mustTry: "Traditional English breakfast at heritage hotels hearty, classic feast",
    activities: ["Heritage", "Walks", "Photography", "Nature", "Trails", "Bird", "Watching"],
  },

  {
    id: 6,
    title: "Narkanda",
    image: narkanda,
    rightIcon: <Snowflake/>,
    distance: "65km",
    time: "2 hours",
    height: "2,708m",
    description:
      "A scenic town en route to Kinnaur, famous for skiing in winter and apple orchards. Offers stunning views of snow-capped peaks and authentic Himachali culture.",
    attractions: [
      "Hatu Peak - 3,400m high peak with ancient Hatu Mata temple",
      "Skiing Slopes - Well-developed skiing facilities in winter",
      "Stokes Farm - Historic apple orchard estate",
      "Tani Jubbar Lake - Scenic lake surrounded by dense forests",
      "Mahamaya Temple - Sacred temple with beautiful mountain backdrop",
    ],
    bestTime: "December to February for snow sports; April to June for pleasant weather",
    mustTry: "Local apple wine and fresh trout fish, and regional Himachali flavors",
    activities: ["Skiing", "Trekking", "Mountain", "Biking", "Apple", "Tourism"],
  },

  {
    id: 7,
    title: "Solan",
    image: solan,
    rightIcon: <Mountain/>,
    distance: "46km",
    time: "1.5 hours",
    height: "1,502m",
    description:
      "Known as the Mushroom City of India , Solan is famous for tomato farming, red gold (tomatoes), and the historic Mohan Shakti Heritage Park.",
    attractions: [
      "Shoolini Mata Temple - Ancient temple dedicated to goddess Shoolini",
      "Mohan Shakti Heritage Park - Showcases Indian culture and mythology",
      "Jatoli Shiv Temple - Tallest Shiva statue in Asia",
      "Bon Monastery - Beautiful Buddhist monastery with Tibetan architecture",
      "Karol Tibba - Highest peak around Solan with trekking trails",
    ],
    bestTime: "March to June and September to November, the weather is pleasantly mild",
    mustTry: "Famous Solan mushrooms and local tomato products",
    activities: ["Temple", "Tours", "Heritage", "Visits", "Trekking", "Shopping"],
  },

  {
    id: 8,
    title: "Tattapani",
    image: tattapani,
    rightIcon: <Sunrise/>,
    distance: "51km",
    time: "2 hours",
    height: "656m",
    description:
      "Located on the banks of Sutlej River, famous for natural hot water springs with medicinal properties. A perfect spot for adventure activities and relaxation.",
    attractions: [
      "Hot Water Springs - Natural sulfur springs with therapeutic properties",
      "Sutlej River - White water rafting and river camping",
      "River Rafting - Grade II & III rapids for adventure enthusiasts",
      "Suspension Bridge - Scenic bridge over Sutlej River",
      "Ancient Temples - Historical temples near the hot springs",
    ],
    bestTime: "September to May; avoid monsoon season for travel",
    mustTry: "Therapeutic bath in the natural hot springs—often known as balneotherapy",
    activities: ["Hot", "Spring", "Bath", "River", "Rafting", "Camping", "Fishing"],
  },

  {
    id: 9,
    title: "Fagu",
    image: fagu,
    rightIcon: <Camera/>,
    distance: "22km",
    time: "40 mintues",
    height: "2,509m",
    description:
      "A pristine village offering spectacular views of the Himalayan ranges. Perfect for those seeking solitude and natural beauty away from tourist crowds.",
    attractions: [
      "Snow Views - Heavy snowfall in winter, turning it into a white paradise",
      "Apple Orchards - Beautiful orchards throughout the valley",
      "Himalayan View - Clear views of Kedarnath and Badrinath peaks",
      "Nature Walks - Peaceful trails through forests and villages",
      "Local Villages - Experience authentic Himachali village life",
    ],
    bestTime: "November to February for snow; March to June for greenery",
    mustTry: "Stay at a local homestay for authentic Himachali hospitality",
    activities: ["Snow", "Activities", "Photography", "Village", "Tours", "Stargazing"],
  },
 
];


const Shimla = () => {


  const [selectedAttraction, setSelectedAttraction] = useState(null);

  const navigate = useNavigate();

  const galleryImages = [
    g1, g2, g3, g4, g5,
    g6, g7, g8, g9, g10,
    g11, g12, g13, g14,
    g15, g16,
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  const scrollToGallery = () => {
  const gallerySection = document.getElementById("shimla-gallery");
  gallerySection?.scrollIntoView({ behavior: "smooth" });
};

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

    
    <div className="shimla-page">
    
      {/* Hero Section */}
      <section className="hero">

        <div className="hero-content">
          <span className="badge">Queen of Hills</span>

          <h1>Welcome to Shimla</h1>

          <p className="shimla">
            <strong>Experience the magic of pristine Himalayan beauty, colonial
            heritage, and endless adventure in India's favorite hill station</strong>
          </p>

          <div className="stats">
            <div className="stat-card">
              <h3><MapPin className="stat-icon"/>2,276m</h3>
              <span>Altitude</span>
            </div>

            <div className="stat-card">
              <h3><Users className="stat-icon"/>1M+</h3>
              <span>Annual Visitors</span>
            </div>

            <div className="stat-card">
              <h3><Award className="stat-icon"/>UNESCO</h3>
              <span>Heritage Railway</span>
            </div>
          </div>

          <div className="hero-buttons">
            <button
      className="primary-btn"
      onClick={() => navigate("/packagess")}
    >
      Plan Your Trip →
    </button>
            <button className="secondary-btn" onClick={scrollToGallery}>View Gallery <Camera size={14}/></button>
          </div>
        </div>
      </section>

      <section className="about-shimla">
  <span className="about-badge">About Shimla</span>

  <h2 style={{fontWeight:"1200", fontSize:"48px"}}>The Crown Jewel of Himachal Pradesh</h2>

  <p className="about-desc">
    Shimla, the erstwhile summer capital of British India, is a beautiful hill
    station nestled in the lap of the Himalayas. With its Victorian architecture,
    lush green landscapes, and pleasant climate, it offers a perfect blend of
    natural beauty and colonial charm.
  </p>

  <div className="about-cards">
    <div className="about-card">
      <div className="icon-box">
        <MapPin />
      </div>
      <h3>Location & Geography</h3>
      <p style={{fontWeight:"500"}}>
        Located in the northwestern Himalayas at an altitude of 2,276 meters, Shimla spreads across seven hills.
        The town offers spectacular views of the snow-clad Himalayan ranges and lush green valleys.
      </p>
    </div>

    <div className="about-card">
      <div className="icon-box">
        <Clock />
      </div>
      <h3>Rich History</h3>
      <p style={{fontWeight:"500"}}>
        Named after Goddess Shyamala, an incarnation of Goddess Kali, Shimla became the summer capital of British India in 1864.
        The town still retains its colonial character with Victorian buildings and churches.
      </p>
    </div>

    <div className="about-card">
      <div className="icon-box">
        <Award />
      </div>
      <h3>UNESCO Recognition</h3>
      <p style={{fontWeight:"500"}}>
        The Kalka-Shimla Railway, built in 1898, is a UNESCO World Heritage Site.
        This narrow-gauge railway covers 96 km through 103 tunnels and 864 bridges, offering breathtaking views of the mountains.
      </p>
    </div>
  </div>
</section>
{/*============top attractions of shimla============= */}
<section className="shimla-attractions">
    <div className="attractions-container">
  

  <h2 className="section-title">Top Tourist Attractions of Shimla</h2>

  <p style={{color:"black"}}>
    From ancient temples to colonial landmarks, Shimla offers a perfect blend
    of spirituality, history, and natural beauty
  </p>

  <div className="attractions-grid">
  {topAttractions.map((item) => (
   

    <div className="attraction-card" key={item.id}>
      
      <div className="card-image">
        <img src={item.image} alt={item.title} />

        <span className="rating-badge">
          <Star size={14} fill="#22c55e" stroke="#22c55e" /> {item.rating}
        </span>
      </div>

      <div className="card-body">
        <h3>{item.title}</h3>

        <p>
          {item.description.slice(0, 110)}...
        </p>

        <button
  className="white-btn"
  onClick={() => setSelectedAttraction(topPopupData.find(t => t.id === item.id))}
  >
  Learn More →
</button>




      </div>

    </div>
  ))}
</div>
{selectedAttraction && (
  <Top
    data={selectedAttraction}
    onClose={() => setSelectedAttraction(null)}
  />
)}



  </div>
</section>

{/* ADVENTURE SECTION */}
<section className="adventure-section" id="activities">
  <span className="section-pill">Activities</span>

  <h2 className="adventure-title">Adventure Awaits</h2>

  <p className="adventure-subtitle">
    Experience thrilling adventures amidst the majestic Himalayas
  </p>

  <div className="adventure-grid">
    {[
      {
        img: Tre,
        title: "Mountain Trekking",
        time: "3–8 hours",
        icon: <Mountain />,
        desc: "Explore numerous trekking trails offering breathtaking views of the Himalayas."
      },
      {
        img: Ski,
        title: "Skiing in Kufri",
        time: "2–4 hours",
        icon: <Snowflake />,
        desc: "Experience the thrill of skiing on pristine slopes during winter months."
      },
      {
        img: nat,
        title: "Nature Photography",
        time: "Full day",
        icon: <Camera />,
        desc: "Capture stunning landscapes and diverse wildlife in their natural habitat."
      },
      {
        img: para,
        title: "Paragliding",
        time: "30–45 minutes",
        icon: <Wind />,
        desc: "Soar above the valleys and experience bird's eye views of Shimla."
      }
    ].map((item, index) => (
      <div className="adventure-card" key={index}>
        <div className="adventure-image">
          <img src={item.img} alt={item.title} />
          <span className="time-badge">
            <Clock size={14} /> {item.time}
          </span>
        </div>

        <div className="adventure-body">
          <div className="adventure-icon">{item.icon}</div>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
          <button className="adventure-btn">Book Now</button>
        </div>
      </div>
    ))}
  </div>
</section>


{/* ================= Shopping Paradise of Shimla ================= */}
<section className="shopping-section">
  <div className="shopping-header">
    
    <h2><ShoppingBag className="shopping-icon"/>  Shopping Paradise of Shimla</h2>
    <p className="shopping-head">
      From traditional handicrafts to modern boutiques, Shimla offers a unique
      shopping experience that blends colonial charm with local culture.
      Explore bustling markets and discover treasures that tell the story of
      this magnificent hill station.
    </p>
  </div>

  <h3 className="shopping-subtitle">Popular Shopping Areas</h3>

  <div className="shopping-grid">
    {/* Mall Road */}
    <div className="shopping-card">
      <div className="card-header">
        <span className="card-icon"><ShoppingBag className="icon"/></span>
        <h4>Mall Road</h4>
        <span className="star">☆</span>
      </div>

      <div className="shopping-body">
      <p className="card-desc">
        The heart of Shimla shopping, Mall Road is a pedestrian-only street
        lined with shops, boutiques, and emporiums. This colonial-era boulevard
        offers everything from handicrafts to branded clothing, making it the
        most popular shopping destination.
      </p>

      <p className="strong">Highlights:</p>
      <div className="tags">
        <span>Government Emporiums</span>
        <span>Bookstores</span>
        <span>Cafes</span>
        <span>Woolen Stores</span>
      </div>

      <div className="card-footer">
        <span className="cardd-icon"><Clock /></span>
        <p> 9:00 AM - 9:00 PM</p>
        <span className="category">Handicrafts, Books, Clothing</span>
      </div>
      </div>
    </div>

    {/* Lakkar Bazaar */}
    <div className="shopping-card">
      <div className="card-header">
        <span className="card-icon"><Home className="icon"/></span>
        <h4>Lakkar Bazaar</h4>
        <span className="star">☆</span>
      </div>

      <div className=" shopping-body">
      <p className="card-desc">
        Famous for its exquisite wooden crafts and artifacts, Lakkar Bazaar is
        a must-visit for those seeking authentic Himachali wooden items. The
        market is filled with skilled artisans creating beautiful pieces right
        before your eyes.
      </p>

      <p className="strong">Highlights:</p>
      <div className="tags">
        <span>Wooden Toys</span>
        <span>Walking Sticks</span>
        <span>Carved Furniture</span>
        <span>Decorative Items</span>
      </div>

      <div className="card-footer">
        <span className="cardd-icon"><Clock /></span>
        <p>10:00 AM - 8:00 PM</p>
        <span className="category">Wooden Handicrafts, Souvenirs</span>
      </div>
      </div>
    </div>

    {/* Lower Bazaar */}
    <div className="shopping-card">
      <div className="card-header">
        <span className="card-icon"><TrendingUp className="icon"/></span>
        <h4>Lower Bazaar</h4>
        <span className="star">☆</span>
      </div>

      <div className="shopping-body">
      <p className="card-desc">
        A bustling local market offering authentic shopping experiences at
        bargain prices. This is where locals shop, and you can find everything
        from fresh produce to traditional clothing and household items.
        It is the perfect place to soak in the vibrant atmosphere and discover unique local treasures. 
      </p>

      <p className="strong">Highlights:</p>
      <div className="tags">
        <span>Local Produce</span>
        <span>Spices</span>
        <span>Dry Fruits</span>
        <span>Traditional Wear</span>
      </div>

      <div className="card-footer">
        <span className="cardd-icon"><Clock /></span>
        <p> 8:00 AM - 9:00 PM</p>
        <span className="category">Budget Shopping, Local Goods</span>
      </div>
     </div>
    </div>

    {/* Tibetan Market */}
    <div className="shopping-card">
      <div className="card-header">
        <span className="card-icon"><Gem className="icon" /></span>
        <h4>Tibetan Market</h4>
        <span className="star">☆</span>
      </div>

      <div className="shopping-body">
      <p className="card-desc">
        Located near the Mall Road, this market offers unique Tibetan artifacts,
        jewelry, and clothing. The vibrant atmosphere and colorful displays make
        it a photographer's delight. and you can haggle for great deals on woolens, 
        souvenirs, and local snacks like momos and thukpa, making it a sensory feast
        for shoppers and culture enthusiasts alike. 
      </p>

      <p className="strong">Highlights:</p>
      <div className="tags">
        <span>Prayer Wheels</span>
        <span>Turquoise Jewelry</span>
        <span>Thangka Paintings</span>
        <span>Carpets</span>
      </div>

      <div className="card-footer">
        <span className="cardd-icon"><Clock /></span>
        <p>10:00 AM - 7:00 PM</p>
        <span className="category">Tibetan Artifacts, Jewelry</span>
      </div>
     </div>
    </div>
  </div>
</section>

{/* ================================
   WHAT TO BUY IN SHIMLA
================================ */}
<section className="what-buy-section">
  <h2 className="what-buy-title">What to Buy in Shimla</h2>

  <div className="what-buy-grid">

    {/* Card 1 */}
    <div className="buy-card">
      <div className="buy-img">
        <img src={shawlImg} alt="Himachali Shawls" />
        <div className="buy-icon"><Shirt/></div>
      </div>
      <div className="buy-content">
        <h3>Himachali Shawls & Woolens</h3>
        <p>
          Hand-woven shawls, mufflers, and sweaters made from pure wool.
          These are perfect for cold weather and make excellent gifts. Look for authentic Kullu shawls with traditional patterns.
        </p>
        <div className="buy-price">
          <span>Price Range</span>
          <strong>₹500 - ₹5,000</strong>
        </div>
      </div>
    </div>

    {/* Card 2 */}
    <div className="buy-card">
      <div className="buy-img">
        <img src={woodImg} alt="Wooden Handicrafts" />
        <div className="buy-icon"><Home/></div>
      </div>
      <div className="buy-content">
        <h3>Wooden Handicrafts</h3>
        <p>
          Intricately carved wooden items including walking sticks, toys, furniture, and decorative pieces.
          Each piece showcases the traditional craftsmanship of Himachali artisans.
        </p>
        <div className="buy-price">
          <span>Price Range</span>
          <strong>₹200 - ₹10,000</strong>
        </div>
      </div>
    </div>

    {/* Card 3 */}
    <div className="buy-card">
      <div className="buy-img">
        <img src={jewelryImg} alt="Tibetan Jewelry" />
        <div className="buy-icon"><Gem/></div>
      </div>
      <div className="buy-content">
        <h3>Tibetan Jewelry & Artifacts</h3>
        <p>
          Beautiful turquoise jewelry, prayer wheels, singing bowls, and thangka paintings.
          These authentic Tibetan items are both decorative and spiritually significant.
        </p>
        <div className="buy-price">
          <span>Price Range</span>
          <strong>₹300 - ₹8,000</strong>
        </div>
      </div>
    </div>

    {/* Card 4 */}
    <div className="buy-card">
      <div className="buy-img">
        <img src={appleImg} alt="Apple Products" />
        <div className="buy-icon"><Gift/></div>
      </div>
      <div className="buy-content">
        <h3>Apple Products & Dry Fruits</h3>
        <p>
          Shimla is famous for its apples. Buy apple jam, apple juice, dried apples, and other apple-based products.
          Also available are walnuts, almonds, and apricots from local orchards.
        </p>
        <div className="buy-price">
          <span>Price Range</span>
          <strong>₹150 - ₹2,000</strong>
        </div>
      </div>
    </div>

    {/* Card 5 */}
    <div className="buy-card">
      <div className="buy-img">
        <img src={capImg} alt="Traditional Wear" />
        <div className="buy-icon"><Stars/></div>
      </div>
      <div className="buy-content">
        <h3>Himachali Caps & Traditional Wear</h3>
        <p>
          Colorful Himachali caps (topis) with traditional designs, kurtas, and other ethnic wear. 
          These make unique souvenirs and are comfortable to wear.
        </p>
        <div className="buy-price">
          <span>Price Range</span>
          <strong>₹100 - ₹3,000</strong>
        </div>
      </div>
    </div>

    {/* Card 6 */}
    <div className="buy-card">
      <div className="buy-img">
        <img src={teaImg} alt="Local Tea" />
        <div className="buy-icon"><Coffee/></div>
      </div>
      <div className="buy-content">
        <h3>Local Tea & Spices</h3>
        <p>
          Aromatic Himalayan tea, including green tea and special blends. 
          Also available are local spices, herbs, and medicinal plants unique to the region.
        </p>
        <div className="buy-price">
          <span>Price Range</span>
          <strong>₹100 - ₹1,500</strong>
        </div>
      </div>
    </div>

  </div>

{/* ================================
   SHOPPING TIPS FOR SMART TRAVELERS
================================ */}
<div className="shopping-tips-section">
  <h2 className="shopping-tips-title">
    <Sparkles/> Shopping Tips for Smart Travelers
  </h2>

  <div className="shopping-tips-grid">
    <div className="tip-card">
      <span className="tip-number">1</span>
      <p>Bargaining is acceptable and expected in most local markets except government emporiums</p>
    </div>

    <div className="tip-card">
      <span className="tip-number">2</span>
      <p>Visit Lakkar Bazaar in the morning to see artisans at work</p>
    </div>

    <div className="tip-card">
      <span className="tip-number">3</span>
      <p>Check for authenticity certificates when buying expensive woolens or handicrafts</p>
    </div>

    <div className="tip-card">
      <span className="tip-number">4</span>
      <p>Carry cash as many small shops don't accept cards</p>
    </div>

    <div className="tip-card">
      <span className="tip-number">5</span>
      <p>The best shopping season is during summer (April–June) when markets are fully stocked</p>
    </div>

    <div className="tip-card">
      <span className="tip-number">6</span>
      <p>Government emporiums offer fixed prices and guaranteed quality</p>
    </div>

    <div className="tip-card">
      <span className="tip-number">7</span>
      <p>Try local street food while shopping on Mall Road for an authentic experience</p>
    </div>
  </div>
</div>

</section>


<section className="reach-section">

      {/* Heading */}
      <div className="reach-header">
        <h2>
          <Navigation className="iconns"/> How to Reach Shimla
        </h2>
        <p>
          Shimla is well-connected by air, rail, and road. Choose your preferred
          mode of transport and embark on a journey through the stunning
          landscapes of the Himalayas. Each route offers its own unique charm
          and scenic beauty.
        </p>
      </div>

      {/* Distance Cards */}
      <div className="reach-cards">
        {[
  {
    city: "Delhi",
    distance: "350 km",
    time: "7-8 hrs",
    transport: ["Bus", "Car"]
  },
  {
    city: "Chandigarh",
    distance: "115 km",
    time: "3-4 hrs",
    transport: ["Bus", "Car", "Taxi"]
  },
  {
    city: "Kalka",
    distance: "96 km",
    time: "5-6 hrs",
    transport: ["Toy Train", "Taxi"]
  },
  {
    city: "Manali",
    distance: "260 km",
    time: "7-8 hrs",
    transport: ["Bus", "Car"]
  },
  {
    city: "Dehradun",
    distance: "240 km",
    time: "6-7 hrs",
    transport: ["Bus", "Car"]
  },
  {
    city: "Amritsar",
    distance: "350 km",
    time: "8-9 hrs",
    transport: ["Bus", "Car"]
  }
].map((item, index) => (
          <div className="reach-card" key={index}>
            
            <div className="reach-title">
            <MapPin className="pin-icon" />
            <span className="hi">{item.city}</span>
            </div>
            <p>{item.distance}</p>
            <p className="reach-time">{item.time}</p>
            <div className="reach-tags">
  {item.transport.map((mode, i) => (
    <button key={i}>{mode}</button>
  ))}
</div>
          </div>
        ))}
      </div>


{/*------------- By Air Section -------------*/}
      <div className="by-air">
        <div className="by-air-header">
          <Plane className="by-number" />
          <h3 className="by-air-h3">By Air</h3>
        </div>

        <div className="by-air-info">
          <div>
            <small>AIRPORT</small>
            <p>Jubbarhatti Airport (Shimla Airport)</p>
          </div>
          <div>
            <small>DISTANCE</small>
            <p>23 km from Shimla city center</p>
          </div>
          <div>
            <small>DURATION</small>
            <p>45 minutes drive to city</p>
          </div>
          <div>
            <small>FREQUENCY</small>
            <p>Limited flights, mostly seasonal</p>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="air-info-cards">
  {[
    {
      head: "Nearest Major Airport",
      desc: "Chandigarh International Airport is the nearest major airport, located 115 km away (3-4 hours drive). It offers excellent connectivity with daily flights from Delhi, Mumbai, Bangalore, and other major cities.",
    },
    {
      head: "From Chandigarh Airport",
      desc: "Hire a taxi (₹2,500-3,500), book a private cab, or take a bus to Shimla. The scenic drive takes you through beautiful landscapes and pine forests.",
    },
    {
      head: "Delhi to Shimla",
      desc: "Most international travelers fly into Indira Gandhi International Airport, Delhi (350 km away). From Delhi, you can take a flight to Chandigarh or opt for a direct road journey.",
    },
  ].map((text, index) => (
    <div className="air-card" key={index}>
      <p className="text1"><CheckCircle /> {text.head}</p>

      <p className="text">{text.desc}</p>
    </div>
  ))}
</div>

      {/* Pro Tips */}
<div className="pro-tips premium">
  <div className="pro-tips-header">
    
    <h4><CircleAlert className="pin-icons"/>Pro Tips for By Air</h4>
  </div>

  <div className="pro-tips-grid">
    {[
      "Book flights to Chandigarh well in advance for better prices",
      "Pre-book your cab from Chandigarh airport to avoid hassles",
      "Shimla airport has limited operations, especially in winter",
    ].map((tip, index) => (
      <div className="pro-tip-item" key={index}>
        <span className="tip-number">{index + 1}</span>
        <p>{tip}</p>
      </div>
    ))}
  </div>
</div>


{/*-----------------By train section-------------*/}
<div className="by-train">
        <div className="by-air-header">
          <Train className="by-number" />
          <h3 className="by-air-h3">By Train</h3>
        </div>

        <div className="by-air-info">
          <div>
            <small>STATION</small>
            <p>Kalka Railway Station</p>
          </div>
          <div>
            <small>DISTANCE</small>
            <p>96 km from Shimla</p>
          </div>
          <div>
            <small>DURATION</small>
            <p>5-6 hours on toy train</p>
          </div>
          <div>
            <small>FREQUENCY</small>
            <p>Multiple trains daily</p>
          </div>
        </div>
      </div>

       {/* Info Cards */}
      <div className="air-info-cards">
  {[
    {
      head: "Kalka-Shimla Toy Train",
      desc: "The UNESCO World Heritage Kalka-Shimla Railway is an iconic journey through 102 tunnels and 864 bridges. This narrow-gauge railway offers breathtaking views of mountains, valleys, and forests. The train runs multiple times daily with various categories including Shivalik Deluxe Express, Rail Motor, and regular passenger trains.",
    },
    {
      head: "Major Trains to Kalka",
      desc: "From Delhi: Shatabdi Express (fastest, 4 hours), Himalayan Queen, Kalka Mail. From Mumbai: August Kranti Rajdhani. From Kolkata: Kalka Mail. From Amritsar: Howrah Mail. Kalka is well connected to most major Indian cities.",
    },
    {
      head: "Train Classes",
      desc: "Shivalik Deluxe Express: Premium experience with panoramic windows (₹1,200-1,500). Rail Motor: Faster service (₹300-500). Regular Passenger: Most economical option (₹50-100).",
    },
  ].map((text, index) => (
    <div className="air-card" key={index}>
      <p className="text1"><CheckCircle /> {text.head}</p>

      <p className="text">{text.desc}</p>
    </div>
  ))}
</div>

<div className="pro-tips premium">
  <div className="pro-tips-header">
    
    <h4><CircleAlert className="pin-icons"/>Pro Tips for By Train</h4>
  </div>

  <div className="pro-tips-grid">
    {[
      "Book toy train tickets at least 2 months in advance, especially for Shivalik Express",
      "Choose morning trains for the best scenic views",
      "Carry snacks and water as options are limited on the toy train",
      "Window seats on the right side (while going to Shimla) offer better views",
    ].map((tip, index) => (
      <div className="pro-tip-item" key={index}>
        <span className="tip-number">{index + 1}</span>
        <p>{tip}</p>
      </div>
    ))}
  </div>
</div>



{/*-----------------By train Road-------------*/}
<div className="by-road">
        <div className="by-air-header">
          <Car className="by-number" />
          <h3 className="by-air-h3">By Road</h3>
        </div>

        <div className="by-air-info">
          <div>
            <small>ROUTES</small>
            <p>Multiple highways connect Shimla</p>
          </div>
          <div>
            <small>DISTANCE</small>
            <p>350 km from Delhi, 115 km from Chandigarh</p>
          </div>
          <div>
            <small>DURATION</small>
            <p>7-8 hours from Delhi, 3-4 hours from Chandigarh</p>
          </div>
          <div>
            <small>FREQUENCY</small>
            <p>Continuous bus services, taxis available 24/7</p>
          </div>
        </div>
      </div>

       {/* Info Cards */}
      <div className="air-info-cards">
  {[
    {
      head: "From Delhi",
      desc: "Route: Delhi → Chandigarh (via NH44) → Kalka → Shimla (via NH5). The journey is scenic after Chandigarh with winding mountain roads. Best time to travel is early morning to reach before evening. Highway is well-maintained with multiple dhabas and rest stops.",
    },
    {
      head: "Bus Services",
      desc: "HRTC (Himachal Road Transport Corporation) runs regular Volvo and semi-deluxe buses from Delhi (₹600-1,200), Chandigarh (₹300-500), and other cities. Private operators like RedBus offer premium services. From Delhi ISBT Kashmere Gate: Multiple departures throughout the day.",
    },
    {
      head: "Self-Drive & Taxis",
      desc: "Self-drive is a great option for flexibility. Rent a car in Delhi or Chandigarh (₹2,500-4,000/day). The roads are good but winding after Kalka, requiring careful driving. Taxi services: Delhi to Shimla (₹4,500-6,000), Chandigarh to Shimla (₹2,500-3,500).",
    },
    {
      head: "Road Conditions",
      desc: "Roads are generally good year-round. NH5 (Kalka-Shimla highway) has numerous hairpin bends - 102 total! Winter months (Dec-Feb) may have snow on roads requiring chains. Drive carefully during monsoon (July-August) due to landslides.",
    },
  ].map((text, index) => (
    <div className="air-card" key={index}>
      <p className="text1"><CheckCircle /> {text.head}</p>

      <p className="text">{text.desc}</p>
    </div>
  ))}
</div>

<div className="pro-tips premium">
  <div className="pro-tips-header">
    
    <h4><CircleAlert className="pin-icons"/>Pro Tips for By Road</h4>
  </div>

  <div className="pro-tips-grid">
    {[
      "Start early from Delhi to avoid traffic and reach before dark",
      "Carry motion sickness medicine for the winding roads",
      "Check weather conditions before starting, especially in winter",
      "Parking in Shimla city can be challenging, consider staying at hotels with parking",
      "Fill fuel tank in Solan or Dharampur as Shimla has limited petrol pumps",
    ].map((tip, index) => (
      <div className="pro-tip-item" key={index}>
        <span className="tip-number">{index + 1}</span>
        <p>{tip}</p>
      </div>
    ))}
  </div>
</div>


 <div className="info-wrapper">

      {/* Card 1 */}
      <div className="info-card">
        <div className="info-head">
          
          <h3><Clock className="icon-circle"/>Best Time to Visit</h3>
        </div>

        <ul className="info-list">
          <li>Summer (March-June): Pleasant weather, 15-30°C, peak tourist season</li>
          <li>Monsoon (July-September): Occasional landslides, lush greenery, fewer crowds</li>
          <li>Autumn (October-November): Clear skies, perfect for sightseeing</li>
          <li>Winter (December-February): Snowfall, very cold, ideal for snow lovers</li>
        </ul>
      </div>

      {/* Card 2 */}
      <div className="info-card">
        <div className="info-head1">
         
          <h3 style={{fontSize:"20px"}}><IndianRupee className="icon-circle"/>Travel Costs (Approximate)</h3>
        </div>

        <ul className="info-list">
          <li>Flight (Delhi to Chandigarh): ₹3,000–8,000, fastest and most comfortable option</li>
          <li>Toy Train (Kalka to Shimla): ₹50–1,500, scenic mountain railway journey</li>
          <li>Bus (Delhi to Shimla): ₹600–1,200, overnight and day services available</li>
          <li>Taxi (Chandigarh to Shimla): ₹2,500–3,500, private </li>
        </ul>
      </div>

      {/* Card 3 */}
      <div className="info-card">
        <div className="info-head2">
          
          <h3 style={{fontSize:"20px"}}><CircleAlert className="icon-circle"/>Important Tips</h3>
        </div>

        <ul className="info-list">
          <li>Book accommodation in advance during peak season (May-June, December)</li>
          <li>Carry warm clothing even in summer as evenings can be cool</li>
          <li>ATMs and medical facilities are available but limited in remote areas</li>
          <li>Mobile connectivity is generally good with major operators</li>
          <li>Register at local police station if staying at homestays</li>
        </ul>
      </div>

    </div>

    <section className="local-transport">
      <div className="transport-content">

        
          <Bus className="transport-icon"/>
        

        <h2>Local Transportation in Shimla</h2>

        <p>
          Once you reach Shimla, getting around is easy with local taxis, buses,
          and the Ridge area which is pedestrian-only. Auto-rickshaws are not
          available. Most attractions on Mall Road are within walking distance.
        </p>

        <div className="transport-cards">

          <div className="transport-card">
            <h4>Local Taxis</h4>
            <p>Available at fixed rates. Ridge to Railway Station: ₹300–400</p>
          </div>

          <div className="transport-card">
            <h4>Local Buses</h4>
            <p>Frequent services to nearby areas. Fares: ₹10–50</p>
          </div>

          <div className="transport-card">
            <h4>Walking</h4>
            <p>Best way to explore Mall Road and Ridge. Comfortable shoes recommended</p>
          </div>

        </div>
      </div>
    </section>
    </section>

<section id="destinations">
     <div className="nerby">
      <h2><MapPin className="iconnss"/>Nearby Destinations</h2>
     </div>
     <div>
      <p className="pp">Explore the breathtaking destinations around Shimla. From snow-covered peaks to serene valleys, 
        ancient temples to adventure sports, each place offers a unique experience and unforgettable memories.</p>
     </div>
<section className="nearby-cards-wrapper">
  {nearbyCardsData.map((card) => (
    <div className="nearby-section" key={card.id}>
      <div className="nearby-card">

        {/* IMAGE PART */}
        <div
          className="kufri-card"
          style={{ backgroundImage: `url(${card.image})` }}
        >
          <div className="kufri-overlay">
            <div className="kufri-content">

              {/* LEFT */}
              <div className="kufri-left">
                <h2 className="kufri-title">{card.title}</h2>

                <div className="kufri-info">
                  <div className="info-pill">
                    <Navigation size={16} />
                    <span>{card.distance}</span>
                  </div>

                  <div className="info-pill">
                    <Clock size={16} />
                    <span>{card.time}</span>
                  </div>

                  <div className="info-pill">
                    <Mountain size={16} />
                    <span>{card.height}</span>
                  </div>
                </div>
              </div>

              {/* RIGHT ICON */}
             <span className="snow-icon">{card.rightIcon}</span>

            </div>
          </div>
        </div>

        {/* CONTENT PART */}
        <div className="card-body">
          <p className="description">{card.description}</p>

          <h4 className="attraction-title">
            <Star className="star" size={18} /> Top Attractions
          </h4>

          <ul className="attraction-list">
            {card.attractions.map((item, index) => (
              <li key={index}>
                <ArrowRight className="arrow" size={14} /> {item}
              </li>
            ))}
          </ul>

          {/* INFO BOXES */}
          <div className="info-cards">
            <div className="info-box blue">
              <h5>Best Time to Visit</h5>
              <p style={{ fontSize: "13px", marginBottom: "0px" }}>
                {card.bestTime}
              </p>
            </div>

            <div className="info-box green">
              <h5>Must Try</h5>
              <p style={{ fontSize: "13px", marginBottom: "0px" }}>
                {card.mustTry}
              </p>
            </div>
          </div>

          {/* ACTIVITIES */}
          <div className="activities">
            <h5>Popular Activities</h5>
            <div className="activity-tags">
              {card.activities.map((act, i) => (
                <span key={i}>{act}</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  ))}
</section>

<section className="travel-section">
      <h2 className="travel-title">Travel Tips for Nearby Destinations</h2>

      <div className="travel-card-wrapper">
        <div className="travel-card">
          <div className="icon-circle">
            <Clock size={22} />
          </div>
          <h3>Plan Your Time</h3>
          <p>
            Most destinations can be covered as day trips, but consider staying
            overnight at farther locations like Kasauli or Narkanda for a more
            relaxed experience.
          </p>
        </div>

        <div className="travel-card">
          <div className="icon-circle">
            <Navigation size={22} />
          </div>
          <h3>Hire a Vehicle</h3>
          <p>
            Renting a car or hiring a taxi for the day is the best way to visit
            multiple destinations. Negotiate rates in advance and ensure the
            driver knows the routes.
          </p>
        </div>

        <div className="travel-card">
          <div className="icon-circle">
            <Camera size={22} />
          </div>
          <h3>Photography Paradise</h3>
          <p>
            Carry a good camera and extra batteries. The scenic beauty,
            especially during sunrise and sunset, offers incredible photo
            opportunities.
          </p>
        </div>

        <div className="travel-card">
          <div className="icon-circle">
            <Mountain size={22} />
          </div>
          <h3>Check Weather</h3>
          <p>
            Always check weather conditions before planning trips, especially in
            winter. Some roads may be closed due to snow or during heavy
            monsoons.
          </p>
        </div>
      </div>
    </section>
</section>

<section className="shimla-gallery" id="shimla-gallery">
      <h2>Shimla Gallery</h2>

      <div className="gallery">
        {galleryImages.map((img, index) => (
          <img
            key={index}
            src={img}
            className={`item item-${index + 1}`}
            onClick={() => setSelectedImage(img)}
            alt="Shimla view"
          />
        ))}
      </div>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <span className="close">&times;</span>
          <img src={selectedImage} className="lightbox-img" />
        </div>
      )}
    </section>

    {/* ========== READY TO EXPLORE SHIMLA ========== */}
    <div className="app-container">
      <section className="explore-section">
        <div className="explore-card">
          <div className="explore-content">
            <div className="explore-badge">
              Your Next Adventure Awaits
            </div>

            <h2 className="explore-title">
              Ready to Explore Shimla?
            </h2>

            <p className="explore-description">
              Fresh mountain air, peaceful views, colonial streets, and unforgettable
              experiences — Shimla is waiting for you.
            </p>

            <div className="buttons-container">
              <button onClick={() => navigate("/ContactUs")} className="btn btn-primary" >
                <Phone className="btn-icon" size={20} />
                Contact Us Now
              </button>

              <button onClick={() => navigate("/packagess")} className="btn btn-secondary">
                <Package className="btn-icon" size={20} />
                See the Packages
              </button>
            </div>

            <div className="stats-container">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Happy Travelers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">30+</span>
                <span className="stat-label">Tour Packages</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4.7★</span>
                <span className="stat-label">Average Rating</span>
              </div>
            </div>
          </div>
        </div>
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
          <li><Link to="#destinations">Destinations</Link></li>
          <li><Link to="#activities">Activities</Link></li>
          <li><Link to="#shimla-gallery" >Gallery</Link></li>
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
};

export default Shimla;