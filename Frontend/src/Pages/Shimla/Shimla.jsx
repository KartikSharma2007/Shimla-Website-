import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation, Link } from "react-router-dom";
import "./Shimla.css";
import Top from "../../Components/AttractionModal/TopAttractions";
import NearbyModal from "../../Components/ShimlaModal/NearbyModal";
import { topPopupData } from "../../data/ShimlaAttractionsCardsModal";
import { topAttractions } from "../../data/ShimlaAttractionsCards";
import SupportChatbot from "../../Components/Chatbot/Supportchatbot.jsx";
import ChatPopup from "../../Components/Chatbot/ChatPopup";
import "../../Components/Chatbot/ChatPopup.css";
import { 
  MapPin, Users, Award, Camera, Clock, Gem, TrendingUp, Star, Mountain, Snowflake, Wind, 
  UtensilsCrossed, Soup, Coffee, IceCreamCone, ShoppingBag, Home, Gift, Stars, Shirt, 
  Sparkles, Navigation, CheckCircle, Plane, CircleAlert, Train, IndianRupee, Car, Bus, 
  ArrowRight, Trees, Sunrise, Phone, Package, Facebook, Youtube, Instagram, Twitter,
  ChevronUp, ChevronRight, ChevronDown
} from "lucide-react";
import Ski from "../../assets/Skiing.jpg";
import bike from "../../assets/bike.jpg";
import river from "../../assets/river.webp";
import rock from "../../assets/rock.jpg";
import forest from "../../assets/forest.jpg";
import camp from "../../assets/camp.jpg";
import snow from "../../assets/snow.jpg";
import para from "../../assets/para.webp";
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
    description: "A winter wonderland famous for its snow-covered landscapes, skiing opportunities, and the Himalayan Nature Park. Kufri offers panoramic views of the surrounding peaks and valleys.",
    attractions: [
      "Mahasu Peak – Highest point with breathtaking 360° views",
      "Himalayan Nature Park – Home to rare Himalayan wildlife",
      "Skiing & Tobogganing – Winter sports activities (December–February)",
      "Kufri Fun World – Highest amusement park in the world",
      "Horse Riding – Explore scenic trails on horseback",
    ],
    bestTime: "November to February for snow; March to June for pleasant weather",
    mustTry: "Hot chocolate at local cafes while enjoying snow views",
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
    description: "A serene hill station known for having the highest cricket ground in the world. Chail offers tranquility away from crowded tourist spots with magnificent deodar forests.",
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
    description: "Home to one of India's oldest and most scenic golf courses, surrounded by dense cedar forests. A perfect destination for golf enthusiasts and nature lovers.",
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
    description: "A peaceful hamlet famous for its apple orchards and dense pine forests. Mashobra offers a quieter alternative to bustling Shimla with beautiful nature trails.",
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
    description: "A charming colonial-era town with Victorian buildings, serene atmosphere, and spectacular sunrise views. Perfect for a peaceful weekend getaway.",
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
    description: "A scenic town en route to Kinnaur, famous for skiing in winter and apple orchards. Offers stunning views of snow-capped peaks and authentic Himachali culture.",
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
    description: "Known as the Mushroom City of India , Solan is famous for tomato farming, red gold (tomatoes), and the historic Mohan Shakti Heritage Park.",
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
    description: "Located on the banks of Sutlej River, famous for natural hot water springs with medicinal properties. A perfect spot for adventure activities and relaxation.",
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
    description: "A pristine village offering spectacular views of the Himalayan ranges. Perfect for those seeking solitude and natural beauty away from tourist crowds.",
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

const activities = [
  {
    id: 1,
    name: 'Paragliding',
    location: 'Solang Valley',
    description: 'Soar above the Himalayas with breathtaking views of snow-capped peaks.',
    difficulty: 'Moderate',
    bestTime: 'Oct - Nov, Apr - May',
    image: para
  },
  {
    id: 2,
    name: 'River Rafting',
    location: 'Beas River',
    description: 'Experience thrilling white water rafting on the pristine Beas River.',
    difficulty: 'Challenging',
    bestTime: 'Mar - Jun',
    image: river
  },
  {
    id: 3,
    name: 'Rock Climbing',
    location: 'Multiple Locations',
    description: 'Conquer challenging rock faces with professional instructors guiding you.',
    difficulty: 'Challenging',
    bestTime: 'Oct - May',
    image: rock
  },
  {
    id: 4,
    name: 'Mountain Biking',
    location: '50km Trail',
    description: 'Ride through scenic mountain trails with stunning Himalayan views.',
    difficulty: 'Moderate',
    bestTime: 'Apr - Oct',
    image: bike
  },
  {
    id: 5,
    name: 'Forest Trekking',
    location: 'Chail Wildlife Sanctuary',
    description: 'Trek through ancient forests and discover diverse wildlife and nature.',
    difficulty: 'Easy',
    bestTime: 'Mar - Jun, Sep - Nov',
    image: forest
  },
  {
    id: 6,
    name: 'Riverside Camping',
    location: 'Beas Riverside',
    description: 'Camp under the stars beside flowing mountain rivers with bonfire nights.',
    difficulty: 'Easy',
    bestTime: 'Apr - Oct',
    image: camp
  },
  {
    id: 7,
    name: 'Skiing',
    location: 'Kufri',
    description: 'Experience professional skiing on pristine snow slopes in the Himalayas.',
    difficulty: 'Moderate',
    bestTime: 'Dec - Mar',
    image: Ski
  },
  {
    id: 8,
    name: 'Snow Trekking',
    location: 'Mahasu Peak',
    description: 'Trek to high-altitude peaks surrounded by pristine white snow landscapes.',
    difficulty: 'Challenging',
    bestTime: 'Dec - Mar',
    image: snow
  }
];

const Shimla = () => {

  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.getAttribute('data-id') === 'header') setHeaderVisible(true);
          if (entry.target.getAttribute('data-id') === 'cta') setCtaVisible(true);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('[data-id="header"], [data-id="cta"]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 300);
    }
  };
const handleExploreActivity = (activityName) => {
    navigate(`/packages?activity=${encodeURIComponent(activityName)}`);
  };
  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', checkScroll);
    }
    return () => {
      window.removeEventListener('resize', checkScroll);
      scrollContainerRef.current?.removeEventListener('scroll', checkScroll);
    };
  }, []);

  const getDifficultyClass = (difficulty) => {
    const map = {
      'Easy': 'badge-easy',
      'Moderate': 'badge-moderate',
      'Challenging': 'badge-challenging'
    };
    return map[difficulty] || 'badge-moderate';
  };




  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const navigate = useNavigate();
  const galleryImages = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16];
  const [selectedImage, setSelectedImage] = useState(null);

  const scrollToGallery = () => {
    const gallerySection = document.getElementById("shimla-gallery");
    gallerySection?.scrollIntoView({ behavior: "smooth" });
  };

  const [showAllImages, setShowAllImages] = useState(false);
  const [activeTransport, setActiveTransport] = useState('air');
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

  const [showAllNearby, setShowAllNearby] = useState(false);
  const INITIAL_MOBILE_CARDS = 3;
  const MOBILE_CARDS_INCREMENT = 3;

  const handleNearbyCardClick = (card) => {
    const formattedData = {
      id: card.id,
      title: card.title,
      image: card.image,
      rating: "4.5",
      description: card.description,
    };
    setSelectedAttraction(formattedData);
  };

  const [selectedNearby, setSelectedNearby] = useState(null);

  // Mobile accordion state for How to Reach section
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  // Transport data for accordion
  const transportData = {
    air: {
      icon: <Plane className="sh-by-number" />,
      title: "By Air",
      gradient: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
      info: [
        { label: "AIRPORT", value: "Jubbarhatti Airport (Shimla Airport)" },
        { label: "DISTANCE", value: "23 km from Shimla city center" },
        { label: "DURATION", value: "45 minutes drive to city" },
        { label: "FREQUENCY", value: "Limited flights, mostly seasonal" }
      ],
      cards: [
        {
          head: "Nearest Major Airport",
          desc: "Chandigarh International Airport is the nearest major airport, located 115 km away (3-4 hours drive). It offers excellent connectivity with daily flights from Delhi, Mumbai, Bangalore, and other major cities."
        },
        {
          head: "From Chandigarh Airport",
          desc: "Hire a taxi (₹2,500-3,500), book a private cab, or take a bus to Shimla. The scenic drive takes you through beautiful landscapes and pine forests."
        },
        {
          head: "Delhi to Shimla",
          desc: "Most international travelers fly into Indira Gandhi International Airport, Delhi (350 km away). From Delhi, you can take a flight to Chandigarh or opt for a direct road journey."
        }
      ],
      tips: [
        "Book flights to Chandigarh well in advance for better prices",
        "Pre-book your cab from Chandigarh airport to avoid hassles",
        "Shimla airport has limited operations, especially in winter"
      ]
    },
    train: {
      icon: <Train className="sh-by-number" />,
      title: "By Train",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      info: [
        { label: "STATION", value: "Kalka Railway Station" },
        { label: "DISTANCE", value: "96 km from Shimla" },
        { label: "DURATION", value: "5-6 hours on toy train" },
        { label: "FREQUENCY", value: "Multiple trains daily" }
      ],
      cards: [
        {
          head: "Kalka-Shimla Toy Train",
          desc: "The UNESCO World Heritage Kalka-Shimla Railway is an iconic journey through 102 tunnels and 864 bridges. This narrow-gauge railway offers breathtaking views of mountains, valleys, and forests. The train runs multiple times daily with various categories including Shivalik Deluxe Express, Rail Motor, and regular passenger trains."
        },
        {
          head: "Major Trains to Kalka",
          desc: "From Delhi: Shatabdi Express (fastest, 4 hours), Himalayan Queen, Kalka Mail. From Mumbai: August Kranti Rajdhani. From Kolkata: Kalka Mail. From Amritsar: Howrah Mail. Kalka is well connected to most major Indian cities."
        },
        {
          head: "Train Classes",
          desc: "Shivalik Deluxe Express: Premium experience with panoramic windows (₹1,200-1,500). Rail Motor: Faster service (₹300-500). Regular Passenger: Most economical option (₹50-100)."
        }
      ],
      tips: [
        "Book toy train tickets at least 2 months in advance, especially for Shivalik Express",
        "Choose morning trains for the best scenic views",
        "Carry snacks and water as options are limited on the toy train",
        "Window seats on the right side (while going to Shimla) offer better views"
      ]
    },
    road: {
      icon: <Car className="sh-by-number" />,
      title: "By Road",
      gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
      info: [
        { label: "ROUTES", value: "Multiple highways connect Shimla" },
        { label: "DISTANCE", value: "350 km from Delhi, 115 km from Chandigarh" },
        { label: "DURATION", value: "7-8 hours from Delhi, 3-4 hours from Chandigarh" },
        { label: "FREQUENCY", value: "Continuous bus services, taxis available 24/7" }
      ],
      cards: [
        {
          head: "From Delhi",
          desc: "Route: Delhi → Chandigarh (via NH44) → Kalka → Shimla (via NH5). The journey is scenic after Chandigarh with winding mountain roads. Best time to travel is early morning to reach before evening. Highway is well-maintained with multiple dhabas and rest stops."
        },
        {
          head: "Bus Services",
          desc: "HRTC (Himachal Road Transport Corporation) runs regular Volvo and semi-deluxe buses from Delhi (₹600-1,200), Chandigarh (₹300-500), and other cities. Private operators like RedBus offer premium services. From Delhi ISBT Kashmere Gate: Multiple departures throughout the day."
        },
        {
          head: "Self-Drive & Taxis",
          desc: "Self-drive is a great option for flexibility. Rent a car in Delhi or Chandigarh (₹2,500-4,000/day). The roads are good but winding after Kalka, requiring careful driving. Taxi services: Delhi to Shimla (₹4,500-6,000), Chandigarh to Shimla (₹2,500-3,500)."
        },
        {
          head: "Road Conditions",
          desc: "Roads are generally good year-round. NH5 (Kalka-Shimla highway) has numerous hairpin bends - 102 total! Winter months (Dec-Feb) may have snow on roads requiring chains. Drive carefully during monsoon (July-August) due to landslides."
        }
      ],
      tips: [
        "Start early from Delhi to avoid traffic and reach before dark",
        "Carry motion sickness medicine for the winding roads",
        "Check weather conditions before starting, especially in winter",
        "Parking in Shimla city can be challenging, consider staying at hotels with parking",
        "Fill fuel tank in Solan or Dharampur as Shimla has limited petrol pumps"
      ]
    }
  };

  return (
    <div className="sh-shimla-page">
      {/* =========================
         HERO SECTION
      ========================= */}
      <section className="sh-hero">
        <div className="sh-hero-content">
          <span className="sh-hero-badge">Queen of Hills</span>
          <h1 className="sh-hero-title">Welcome to Shimla</h1>
          <p className="sh-hero-description">
            <strong>Experience the magic of pristine Himalayan beauty, colonial
            heritage, and endless adventure in India's favorite hill station</strong>
          </p>
          <div className="sh-hero-stats">
            <div className="sh-stat-card">
              <h3><MapPin className="sh-stat-icon"/>2,276m</h3>
              <span>Altitude Level</span>
            </div>
            <div className="sh-stat-card">
              <h3><Users className="sh-stat-icon"/>4.2M+</h3>
              <span>Annual Visitors</span>
            </div>
            <div className="sh-stat-card">
              <h3><Award className="sh-stat-icon"/>UNESCO</h3>
              <span>Heritage Railway</span>
            </div>
          </div>
          <div className="sh-hero-buttons">
            <button className="sh-primary-btn" onClick={() => navigate("/packages")}>
              Plan Your Trip →
            </button>
            <button className="sh-secondary-btn" onClick={scrollToGallery}>
              View Gallery <Camera size={14}/>
            </button>
          </div>
        </div>
      </section>

      {/* =========================
         ABOUT SECTION
      ========================= */}
      <section className="sh-about-shimla">
        <span className="sh-about-badge">About Shimla</span>
        <h2 className="sh-about-title" style={{fontWeight:"1200", fontSize:"48px"}}>The Crown Jewel of Himachal Pradesh</h2>
        <p className="sh-about-description">
          Shimla, the erstwhile summer capital of British India, is a beautiful hill
          station nestled in the lap of the Himalayas. With its Victorian architecture,
          lush green landscapes, and pleasant climate, it offers a perfect blend of
          natural beauty and colonial charm.
        </p>
        <div className="sh-about-cards">
          <div className="sh-about-card">
            <div className="sh-icon-box">
              <MapPin />
            </div>
            <h3>Location & Geography</h3>
            <p style={{fontWeight:"500"}}>
              Located in the northwestern Himalayas at an altitude of 2,276 meters, Shimla spreads across seven hills.
              The town offers spectacular views of the snow-clad Himalayan ranges and lush green valleys.
            </p>
          </div>
          <div className="sh-about-card">
            <div className="sh-icon-box">
              <Clock />
            </div>
            <h3>Rich History</h3>
            <p style={{fontWeight:"500"}}>
              Named after Goddess Shyamala, an incarnation of Goddess Kali, Shimla became the summer capital of British India in 1864.
              The town still retains its colonial character with Victorian buildings and churches.
            </p>
          </div>
          <div className="sh-about-card">
            <div className="sh-icon-box">
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

      {/* =========================
         TOP ATTRACTIONS SECTION
      ========================= */}
      <section id="sh-top-attractions" className="sh-shimla-attractions">
        <div className="sh-attractions-container">
          <h2 className="sh-section-title">Top Tourist Attractions of Shimla</h2>
          <p className="sh-section-subtitle" style={{color:"black"}}>
            From ancient temples to colonial landmarks, Shimla offers a perfect blend
            of spirituality, history, and natural beauty
          </p>
          <div className="sh-attractions-grid">
            {topAttractions.map((item) => (
              <div className="sh-attraction-card" key={item.id}>
                <div className="sh-card-image">
                  <img src={item.image} alt={item.title} />
                  <span className="sh-rating-badge">
                    <Star size={14} fill="#22c55e" stroke="#22c55e" /> {item.rating}
                  </span>
                </div>
                <div className="sh-card-body">
                  <h3>{item.title}</h3>
                  <p>{item.description.slice(0, 110)}...</p>
                  <button
                    className="sh-white-btn"
                    onClick={() => setSelectedAttraction(topPopupData.find(t => t.id === item.id))}
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
          {selectedAttraction && (
            <Top data={selectedAttraction} onClose={() => setSelectedAttraction(null)} />
          )}
        </div>
      </section>

      {/* =========================
         ADVENTURE SECTION
      ========================= */}
     
        <section className="adventure-section-2" id="activities">
      <div className="adventure-container-2">
        <div className="adventure-header-2" data-id="header">
          <h1 className={`adventure-title-2 ${headerVisible ? 'visible' : ''}`}>
            Unleash Your Adventure in the Himalayas
          </h1>
          <p className={`adventure-subtitle-2 ${headerVisible ? 'visible' : ''}`}>
            Swipe through our collection of premium mountain experiences
          </p>
        </div>

        <div className="scroll-container-wrapper-2">
          {canScrollLeft && (
            <button className="scroll-btn-2 scroll-left-2" onClick={() => scroll('left')}>
              ‹
            </button>
          )}

          <div className="activities-scroll-2" ref={scrollContainerRef}>
            {activities.map((activity, index) => (
              <div key={activity.id} className={`scroll-card-2 slide-in-2`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="scroll-card-image-2">
                  <img src={activity.image} alt={activity.name} />
                  <div className="scroll-overlay-2"></div>
                </div>

                <div className="scroll-card-content-2">
                  <div className="scroll-card-top-2">
                    <div>
                      <h3 className="scroll-card-title-2">{activity.name}</h3>
                      <p className="scroll-card-location-2">{activity.location}</p>
                    </div>
                    <span className={`difficulty-badge-2 ${getDifficultyClass(activity.difficulty)}`}>
                      {activity.difficulty}
                    </span>
                  </div>

                  <p className="scroll-card-description-2">{activity.description}</p>

                  <div className="scroll-card-footer-2">
                    <div className="info-item-2">
                      <span className="info-label-2">Best Time</span>
                      <span className="info-value-2">{activity.bestTime}</span>
                    </div>
                    <button 
                    className="scroll-explore-btn-2"
                    onClick={() => handleExploreActivity(activity.name)}>Explore →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {canScrollRight && (
            <button className="scroll-btn-2 scroll-right-2" onClick={() => scroll('right')}>
              ›
            </button>
          )}
        </div>

        <div className="cta-section-2" data-id="cta">
          <div className={`cta-wrapper-2 ${ctaVisible ? 'visible' : ''}`}>
            <div className="cta-text-wrapper-2">
              <h2 className="cta-title-2">Ready for an Adrenaline Rush?</h2>
              <p className="cta-text-2">
                Book your perfect adventure package and create memories that last a lifetime
              </p>
            </div>
            <button className="cta-button-2" onClick={() => navigate("/packages")}>View All Packages →</button>
          </div>
        </div>
      </div>
    </section>
      

      {/* =========================
   SHOPPING SECTION
========================= */}
<section className="sh-shopping-section">
  <div className="sh-shopping-header">
    <h2 className="sh-shopping-title">
      <ShoppingBag className="sh-shopping-icon"/> Shopping Paradise of Shimla
    </h2>
    <p className="sh-shopping-head">
      From traditional handicrafts to modern boutiques, Shimla offers a unique
      shopping experience that blends colonial charm with local culture.
    </p>
  </div>

  <h3 className="sh-shopping-subtitle">Popular Shopping Areas</h3>

  {/* DESKTOP: Original Grid (unchanged) */}
  <div className="sh-shopping-grid">
    <div className="sh-shopping-card">
      <div className="sh-card-header">
        <span className="sh-card-icon"><ShoppingBag className="sh-icon"/></span>
        <h4>Mall Road</h4>
        <span className="sh-star">☆</span>
      </div>
      <div className="sh-shopping-body">
        <p className="sh-card-desc">
          The heart of Shimla shopping, Mall Road is a pedestrian-only street
          lined with shops, boutiques, and emporiums. This colonial-era boulevard
          offers everything from handicrafts to branded clothing.
        </p>
        <p className="sh-strong">Highlights:</p>
        <div className="sh-tags">
          <span>Government Emporiums</span>
          <span>Bookstores</span>
          <span>Cafes</span>
          <span>Woolen Stores</span>
        </div>
        <div className="sh-card-footer">
          <span className="sh-cardd-icon"><Clock /></span>
          <p>9:00 AM - 9:00 PM</p>
          <span className="sh-category">Handicrafts, Books, Clothing</span>
        </div>
      </div>
    </div>

    <div className="sh-shopping-card">
      <div className="sh-card-header">
        <span className="sh-card-icon"><Home className="sh-icon"/></span>
        <h4>Lakkar Bazaar</h4>
        <span className="sh-star">☆</span>
      </div>
      <div className="sh-shopping-body">
        <p className="sh-card-desc">
          Famous for its exquisite wooden crafts and artifacts, Lakkar Bazaar is
          a must-visit for those seeking authentic Himachali wooden items.
        </p>
        <p className="sh-strong">Highlights:</p>
        <div className="sh-tags">
          <span>Wooden Toys</span>
          <span>Walking Sticks</span>
          <span>Carved Furniture</span>
          <span>Decorative Items</span>
        </div>
        <div className="sh-card-footer">
          <span className="sh-cardd-icon"><Clock /></span>
          <p>10:00 AM - 8:00 PM</p>
          <span className="sh-category">Wooden Handicrafts, Souvenirs</span>
        </div>
      </div>
    </div>

    <div className="sh-shopping-card">
      <div className="sh-card-header">
        <span className="sh-card-icon"><TrendingUp className="sh-icon"/></span>
        <h4>Lower Bazaar</h4>
        <span className="sh-star">☆</span>
      </div>
      <div className="sh-shopping-body">
        <p className="sh-card-desc">
          A bustling local market offering authentic shopping experiences at
          bargain prices. This is where locals shop for fresh produce and traditional items.
        </p>
        <p className="sh-strong">Highlights:</p>
        <div className="sh-tags">
          <span>Local Produce</span>
          <span>Spices</span>
          <span>Dry Fruits</span>
          <span>Traditional Wear</span>
        </div>
        <div className="sh-card-footer">
          <span className="sh-cardd-icon"><Clock /></span>
          <p>8:00 AM - 9:00 PM</p>
          <span className="sh-category">Budget Shopping, Local Goods</span>
        </div>
      </div>
    </div>

    <div className="sh-shopping-card">
      <div className="sh-card-header">
        <span className="sh-card-icon"><Gem className="sh-icon" /></span>
        <h4>Tibetan Market</h4>
        <span className="sh-star">☆</span>
      </div>
      <div className="sh-shopping-body">
        <p className="sh-card-desc">
          Located near the Mall Road, this market offers unique Tibetan artifacts,
          jewelry, and clothing. The vibrant atmosphere makes it a photographer's delight.
        </p>
        <p className="sh-strong">Highlights:</p>
        <div className="sh-tags">
          <span>Prayer Wheels</span>
          <span>Turquoise Jewelry</span>
          <span>Thangka Paintings</span>
          <span>Carpets</span>
        </div>
        <div className="sh-card-footer">
          <span className="sh-cardd-icon"><Clock /></span>
          <p>10:00 AM - 7:00 PM</p>
          <span className="sh-category">Tibetan Artifacts, Jewelry</span>
        </div>
      </div>
    </div>
  </div>

  {/* MOBILE: New Vertical List */}
  <div className="sh-shopping-list-mobile">
    {[
      {
        img: woodImg,
        title: "Lakkar Bazaar",
        desc: "Famous for wooden crafts, walking sticks, and traditional souvenirs handmade by local artisans.",
        tag: "Wooden Crafts"
      },
      {
        img: shawlImg,
        title: "Mall Road",
        desc: "The heart of Shimla shopping with colonial-era boutiques, bookstores, and woolen stores.",
        tag: "Main Market"
      },
      {
        img: jewelryImg,
        title: "Tibetan Market",
        desc: "Best for prayer wheels, turquoise jewelry, thangka paintings, and Tibetan artifacts.",
        tag: "Tibetan Goods"
      },
      {
        img: capImg,
        title: "Lower Bazaar",
        desc: "Authentic local market offering spices, dry fruits, and traditional Himachali items.",
        tag: "Local Goods"
      },
      {
        img: teaImg,
        title: "Himachal Emporium",
        desc: "Government store with guaranteed quality handicrafts, shawls, and regional specialties.",
        tag: "Handicrafts"
      }
    ].map((item, index) => (
      <div className="sh-shopping-list-item" key={index}>
        <div className="sh-shopping-list-img">
          <img src={item.img} alt={item.title} loading="lazy" />
        </div>
        <div className="sh-shopping-list-content">
          <div className="sh-shopping-list-header">
            <h4>{item.title}</h4>
            <span className="sh-shopping-tag">{item.tag}</span>
          </div>
          <p>{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* =========================
         WHAT TO BUY SECTION
      ========================= */}
      <section className="sh-what-buy-section">
        <h2 className="sh-what-buy-title">What to Buy in Shimla</h2>
        <div className="sh-what-buy-grid">
          <div className="sh-buy-card">
            <div className="sh-buy-img">
              <img src={shawlImg} alt="Himachali Shawls" />
              <div className="sh-buy-icon"><Shirt/></div>
            </div>
            <div className="sh-buy-content">
              <h3>Himachali Shawls & Woolens</h3>
              <p>
                Hand-woven shawls, mufflers, and sweaters made from pure wool.
                These are perfect for cold weather and make excellent gifts. Look for authentic Kullu shawls with traditional patterns.
              </p>
              <div className="sh-buy-price">
                <span>Price Range</span>
                <strong>₹500 - ₹5,000</strong>
              </div>
            </div>
          </div>
          <div className="sh-buy-card">
            <div className="sh-buy-img">
              <img src={woodImg} alt="Wooden Handicrafts" />
              <div className="sh-buy-icon"><Home/></div>
            </div>
            <div className="sh-buy-content">
              <h3>Wooden Handicrafts</h3>
              <p>
                Intricately carved wooden items including walking sticks, toys, furniture, and decorative pieces.
                Each piece showcases the traditional craftsmanship of Himachali artisans.
              </p>
              <div className="sh-buy-price">
                <span>Price Range</span>
                <strong>₹200 - ₹10,000</strong>
              </div>
            </div>
          </div>
          <div className="sh-buy-card">
            <div className="sh-buy-img">
              <img src={jewelryImg} alt="Tibetan Jewelry" />
              <div className="sh-buy-icon"><Gem/></div>
            </div>
            <div className="sh-buy-content">
              <h3>Tibetan Jewelry & Artifacts</h3>
              <p>
                Beautiful turquoise jewelry, prayer wheels, singing bowls, and thangka paintings.
                These authentic Tibetan items are both decorative and spiritually significant.
              </p>
              <div className="sh-buy-price">
                <span>Price Range</span>
                <strong>₹300 - ₹8,000</strong>
              </div>
            </div>
          </div>
          <div className="sh-buy-card">
            <div className="sh-buy-img">
              <img src={appleImg} alt="Apple Products" />
              <div className="sh-buy-icon"><Gift/></div>
            </div>
            <div className="sh-buy-content">
              <h3>Apple Products & Dry Fruits</h3>
              <p>
                Shimla is famous for its apples. Buy apple jam, apple juice, dried apples, and other apple-based products.
                Also available are walnuts, almonds, and apricots from local orchards.
              </p>
              <div className="sh-buy-price">
                <span>Price Range</span>
                <strong>₹150 - ₹2,000</strong>
              </div>
            </div>
          </div>
          <div className="sh-buy-card">
            <div className="sh-buy-img">
              <img src={capImg} alt="Traditional Wear" />
              <div className="sh-buy-icon"><Stars/></div>
            </div>
            <div className="sh-buy-content">
              <h3>Himachali Caps & Traditional Wear</h3>
              <p>
                Colorful Himachali caps (topis) with traditional designs, kurtas, and other ethnic wear.
                These make unique souvenirs and are comfortable to wear.
              </p>
              <div className="sh-buy-price">
                <span>Price Range</span>
                <strong>₹100 - ₹3,000</strong>
              </div>
            </div>
          </div>
          <div className="sh-buy-card">
            <div className="sh-buy-img">
              <img src={teaImg} alt="Local Tea" />
              <div className="sh-buy-icon"><Coffee/></div>
            </div>
            <div className="sh-buy-content">
              <h3>Local Tea & Spices</h3>
              <p>
                Aromatic Himalayan tea, including green tea and special blends.
                Also available are local spices, herbs, and medicinal plants unique to the region.
              </p>
              <div className="sh-buy-price">
                <span>Price Range</span>
                <strong>₹100 - ₹1,500</strong>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
           SHOPPING TIPS SECTION
        ========================= */}
        <div className="sh-shopping-tips-section">
          <h2 className="sh-shopping-tips-title">
            <Sparkles/> Shopping Tips for Smart Travelers
          </h2>
          <div className="sh-shopping-tips-grid">
            <div className="sh-tip-card">
              <span className="sh-tip-number">1</span>
              <p>Bargaining is acceptable and expected in most local markets except government emporiums</p>
            </div>
            <div className="sh-tip-card">
              <span className="sh-tip-number">2</span>
              <p>Visit Lakkar Bazaar in the morning to see artisans at work</p>
            </div>
            <div className="sh-tip-card">
              <span className="sh-tip-number">3</span>
              <p>Check for authenticity certificates when buying expensive woolens or handicrafts</p>
            </div>
            <div className="sh-tip-card">
              <span className="sh-tip-number">4</span>
              <p>Carry cash as many small shops don't accept cards</p>
            </div>
            <div className="sh-tip-card">
              <span className="sh-tip-number">5</span>
              <p>The best shopping season is during summer (April–June) when markets are fully stocked</p>
            </div>
            <div className="sh-tip-card">
              <span className="sh-tip-number">6</span>
              <p>Government emporiums offer fixed prices and guaranteed quality</p>
            </div>
            <div className="sh-tip-card">
              <span className="sh-tip-number">7</span>
              <p>Try local street food while shopping on Mall Road for an authentic experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
         REACH SECTION
      ========================= */}
      <section className="sh-reach-section" id="Travel">
        <div className="sh-reach-header">
          <h2 className="sh-reach-title">
            <Navigation className="sh-iconns"/> How to Reach Shimla
          </h2>
          <p className="sh-reach-description">
            Shimla is well-connected by air, rail, and road. Choose your preferred
            mode of transport and embark on a journey through the stunning
            landscapes of the Himalayas. Each route offers its own unique charm
            and scenic beauty.
          </p>
        </div>

        <div className="sh-reach-cards">
          {[
            { city: "Delhi", distance: "350 km", time: "7-8 hrs", transport: ["Bus", "Car"] },
            { city: "Chandigarh", distance: "115 km", time: "3-4 hrs", transport: ["Bus", "Car", "Taxi"] },
            { city: "Kalka", distance: "96 km", time: "5-6 hrs", transport: ["Toy Train", "Taxi"] },
            { city: "Manali", distance: "260 km", time: "7-8 hrs", transport: ["Bus", "Car"] },
            { city: "Dehradun", distance: "240 km", time: "6-7 hrs", transport: ["Bus", "Car"] },
            { city: "Amritsar", distance: "350 km", time: "8-9 hrs", transport: ["Bus", "Car"] }
          ].map((item, index) => (
            <div className="sh-reach-card" key={index}>
              <div className="sh-reach-title-row">
                <MapPin className="sh-pin-icon" />
                <span className="sh-city-name">{item.city}</span>
              </div>
              <p>{item.distance}</p>
              <p className="sh-reach-time">{item.time}</p>
              <div className="sh-reach-tags">
                {item.transport.map((mode, i) => (
                  <button key={i}>{mode}</button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP VERSION - Original Design */}
        <div className="sh-reach-desktop">
          {/* By Air */}
          <div className="sh-by-air">
            <div className="sh-by-air-header">
              <Plane className="sh-by-number" />
              <h3 className="sh-by-air-h3">By Air</h3>
            </div>
            <div className="sh-by-air-info">
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

          <div className="sh-air-info-cards">
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
              <div className="sh-air-card" key={index}>
                <p className="sh-text1"><CheckCircle /> {text.head}</p>
                <p className="sh-text">{text.desc}</p>
              </div>
            ))}
          </div>

          <div className="sh-pro-tips sh-premium">
            <div className="sh-pro-tips-header">
              <h4><CircleAlert className="sh-pin-icons"/>Pro Tips for By Air</h4>
            </div>
            <div className="sh-pro-tips-grid">
              {[
                "Book flights to Chandigarh well in advance for better prices",
                "Pre-book your cab from Chandigarh airport to avoid hassles",
                "Shimla airport has limited operations, especially in winter",
              ].map((tip, index) => (
                <div className="sh-pro-tip-item" key={index}>
                  <span className="sh-tip-number">{index + 1}</span>
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* By Train */}
          <div className="sh-by-train">
            <div className="sh-by-air-header">
              <Train className="sh-by-number" />
              <h3 className="sh-by-air-h3">By Train</h3>
            </div>
            <div className="sh-by-air-info">
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

          <div className="sh-air-info-cards">
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
              <div className="sh-air-card" key={index}>
                <p className="sh-text1"><CheckCircle /> {text.head}</p>
                <p className="sh-text">{text.desc}</p>
              </div>
            ))}
          </div>

          <div className="sh-pro-tips sh-premium">
            <div className="sh-pro-tips-header">
              <h4><CircleAlert className="sh-pin-icons"/>Pro Tips for By Train</h4>
            </div>
            <div className="sh-pro-tips-grid">
              {[
                "Book toy train tickets at least 2 months in advance, especially for Shivalik Express",
                "Choose morning trains for the best scenic views",
                "Carry snacks and water as options are limited on the toy train",
                "Window seats on the right side (while going to Shimla) offer better views",
              ].map((tip, index) => (
                <div className="sh-pro-tip-item" key={index}>
                  <span className="sh-tip-number">{index + 1}</span>
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* By Road */}
          <div className="sh-by-road">
            <div className="sh-by-air-header">
              <Car className="sh-by-number" />
              <h3 className="sh-by-air-h3">By Road</h3>
            </div>
            <div className="sh-by-air-info">
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

          <div className="sh-air-info-cards">
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
              <div className="sh-air-card" key={index}>
                <p className="sh-text1"><CheckCircle /> {text.head}</p>
                <p className="sh-text">{text.desc}</p>
              </div>
            ))}
          </div>

          <div className="sh-pro-tips sh-premium">
            <div className="sh-pro-tips-header">
              <h4><CircleAlert className="sh-pin-icons"/>Pro Tips for By Road</h4>
            </div>
            <div className="sh-pro-tips-grid">
              {[
                "Start early from Delhi to avoid traffic and reach before dark",
                "Carry motion sickness medicine for the winding roads",
                "Check weather conditions before starting, especially in winter",
                "Parking in Shimla city can be challenging, consider staying at hotels with parking",
                "Fill fuel tank in Solan or Dharampur as Shimla has limited petrol pumps",
              ].map((tip, index) => (
                <div className="sh-pro-tip-item" key={index}>
                  <span className="sh-tip-number">{index + 1}</span>
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MOBILE VERSION - Accordion Design */}
        <div className="sh-reach-mobile">
          {Object.entries(transportData).map(([key, data]) => (
            <div 
              key={key} 
              className={`sh-accordion-item ${openAccordion === key ? 'sh-accordion-open' : ''}`}
            >
              <button 
                className="sh-accordion-header"
                onClick={() => toggleAccordion(key)}
                style={{ background: data.gradient }}
              >
                <div className="sh-accordion-header-content">
                  <div className="sh-accordion-icon-wrapper">
                    {data.icon}
                  </div>
                  <span className="sh-accordion-title">{data.title}</span>
                </div>
                <div className={`sh-accordion-chevron ${openAccordion === key ? 'sh-rotate' : ''}`}>
                  <ChevronDown size={24} />
                </div>
              </button>
              
              <div className={`sh-accordion-content ${openAccordion === key ? 'sh-expanded' : ''}`}>
                <div className="sh-accordion-inner">
                  {/* Info Grid */}
                  <div className="sh-accordion-info-grid">
                    {data.info.map((item, idx) => (
                      <div key={idx} className="sh-accordion-info-item">
                        <small>{item.label}</small>
                        <p>{item.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Info Cards */}
                  <div className="sh-accordion-cards">
                    {data.cards.map((card, idx) => (
                      <div key={idx} className="sh-accordion-card">
                        <p className="sh-accordion-card-head">
                          <CheckCircle size={16} /> {card.head}
                        </p>
                        <p className="sh-accordion-card-text">{card.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Pro Tips */}
                  <div className="sh-accordion-tips">
                    <div className="sh-accordion-tips-header">
                      <CircleAlert size={16} />
                      <span>Pro Tips for {data.title}</span>
                    </div>
                    <div className="sh-accordion-tips-grid">
                      {data.tips.map((tip, idx) => (
                        <div key={idx} className="sh-accordion-tip-item">
                          <span className="sh-accordion-tip-number">{idx + 1}</span>
                          <p>{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sh-info-wrapper">
          <div className="sh-info-card">
            <div className="sh-info-head">
              <h3><Clock className="sh-icon-circle"/>Best Time to Visit</h3>
            </div>
            <ul className="sh-info-list">
              <li>Summer (March-June): Pleasant weather, 15-30°C, peak tourist season</li>
              <li>Monsoon (July-September): Occasional landslides, lush greenery, fewer crowds</li>
              <li>Autumn (October-November): Clear skies, perfect for sightseeing</li>
              <li>Winter (December-February): Snowfall, very cold, ideal for snow lovers</li>
            </ul>
          </div>
          <div className="sh-info-card">
            <div className="sh-info-head sh-info-head1">
              <h3 style={{fontSize:"20px"}}><IndianRupee className="sh-icon-circle"/>Travel Costs (Approximate)</h3>
            </div>
            <ul className="sh-info-list">
              <li>Flight (Delhi to Chandigarh): ₹3,000–8,000, fastest and most comfortable option</li>
              <li>Toy Train (Kalka to Shimla): ₹50–1,500, scenic mountain railway journey</li>
              <li>Bus (Delhi to Shimla): ₹600–1,200, overnight and day services available</li>
              <li>Taxi (Chandigarh to Shimla): ₹2,500–3,500, private </li>
            </ul>
          </div>
          <div className="sh-info-card">
            <div className="sh-info-head sh-info-head2">
              <h3 style={{fontSize:"20px"}}><CircleAlert className="sh-icon-circle"/>Important Tips</h3>
            </div>
            <ul className="sh-info-list">
              <li>Book accommodation in advance during peak season (May-June, December)</li>
              <li>Carry warm clothing even in summer as evenings can be cool</li>
              <li>ATMs and medical facilities are available but limited in remote areas</li>
              <li>Mobile connectivity is generally good with major operators</li>
              <li>Register at local police station if staying at homestays</li>
            </ul>
          </div>
        </div>

        <section className="sh-local-transport">
          <div className="sh-transport-content">
            <Bus className="sh-transport-icon"/>
            <h2>Local Transportation in Shimla</h2>
            <p>
              Once you reach Shimla, getting around is easy with local taxis, buses,
              and the Ridge area which is pedestrian-only. Auto-rickshaws are not
              available. Most attractions on Mall Road are within walking distance.
            </p>
            <div className="sh-transport-cards">
              <div className="sh-transport-card">
                <h4>Local Taxis</h4>
                <p>Available at fixed rates. Ridge to Railway Station: ₹300–400</p>
              </div>
              <div className="sh-transport-card">
                <h4>Local Buses</h4>
                <p>Frequent services to nearby areas. Fares: ₹10–50</p>
              </div>
              <div className="sh-transport-card">
                <h4>Walking</h4>
                <p>Best way to explore Mall Road and Ridge. Comfortable shoes recommended</p>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* =========================
         NEARBY DESTINATIONS SECTION
      ========================= */}
      
<section id="destinations" className="sh-destinations">
  
  {/* MOBILE HEADER - Only shows on mobile via CSS */}
  <div className="sh-nearby-header-mobile">
    <div className="sh-nearby-badge">Explore More</div>
    <h2 className="sh-nearby-title-mobile">
      <MapPin className="sh-nearby-icon-main"/> Nearby Destinations
    </h2>
    <p className="sh-nearby-subtitle-mobile">
      Discover hidden gems around Shimla — from snowy peaks to serene valleys
    </p>
  </div>

  {/* DESKTOP HEADER - Shows on desktop, hidden on mobile */}
  <div className="sh-nerby sh-desktop-only">
    <h2><MapPin className="sh-iconnss"/>Nearby Destinations</h2>
  </div>
  <div className="sh-pp sh-desktop-only">
    <p>Explore the breathtaking destinations around Shimla. From snow-covered peaks to serene valleys, 
      ancient temples to adventure sports, each place offers a unique experience and unforgettable memories.</p>
  </div>
  
  {/* MOBILE CARDS - Vertical stack with premium design */}
  <section className="sh-nearby-cards-wrapper-mobile">
    {nearbyCardsData.slice(0, showAllNearby ? nearbyCardsData.length : INITIAL_MOBILE_CARDS).map((card, index) => (
      <div className="sh-nearby-section-mobile" key={card.id} style={{animationDelay: `${index * 0.1}s`}}>
        <div className="sh-nearby-card-premium">
          <div className="sh-nearby-premium-inner">
            
            {/* Image Section */}
            <div className="sh-nearby-premium-image">
              <img src={card.image} alt={card.title} loading="lazy" />
              <div className="sh-nearby-image-overlay"></div>
              
              {/* Weather Icon */}
              <div className="sh-nearby-weather-float">
                {card.rightIcon}
              </div>
              
              {/* Distance Badge */}
              <div className="sh-nearby-distance-badge">
                <Navigation size={12} />
                <span>{card.distance}</span>
              </div>
            </div>
            
            {/* Content Section */}
            <div className="sh-nearby-premium-content">
              
              {/* Title & Rating */}
              <div className="sh-nearby-premium-header">
                <h3>{card.title}</h3>
                <div className="sh-nearby-rating">
                  <Star size={12} fill="#fbbf24" stroke="#fbbf24" />
                  <span>4.8</span>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="sh-nearby-premium-stats">
                <div className="sh-stat-item">
                  <Clock size={14} />
                  <span>{card.time}</span>
                </div>
                <div className="sh-stat-divider"></div>
                <div className="sh-stat-item">
                  <Mountain size={14} />
                  <span>{card.height}</span>
                </div>
              </div>
              
              {/* Description */}
              <p className="sh-nearby-premium-desc">{card.description.slice(0, 90)}...</p>
              
              {/* Highlights */}
              <div className="sh-nearby-highlights">
                {card.activities.slice(0, 3).map((activity, i) => (
                  <span key={i} className="sh-highlight-tag">{activity}</span>
                ))}
              </div>
              
              {/* CTA Button */}
              <button 
                className="sh-nearby-explore-btn"
                onClick={() => setSelectedNearby(card)}
              >
                <span>Explore Destination</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </section>

  {/* VIEW MORE / VIEW LESS BUTTON - Mobile only */}
  {nearbyCardsData.length > INITIAL_MOBILE_CARDS && (
    <div className="sh-nearby-toggle-container">
      <button 
        className={`sh-nearby-toggle-btn ${showAllNearby ? 'sh-less' : 'sh-more'}`}
        onClick={() => {
          setShowAllNearby(!showAllNearby);
          if (showAllNearby) {
            document.getElementById('sh-destinations').scrollIntoView({behavior: 'smooth'});
          }
        }}
      >
        <span className="sh-toggle-icon">
          {showAllNearby ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
        <span className="sh-toggle-text">
          {showAllNearby ? 'Show Less Destinations' : `View All ${nearbyCardsData.length} Destinations`}
        </span>
        {!showAllNearby && <span className="sh-toggle-badge">+{nearbyCardsData.length - INITIAL_MOBILE_CARDS}</span>}
      </button>
    </div>
  )}

  {/* DESKTOP CARDS - Original grid layout (HORIZONTAL CARDS) */}
  <section className="sh-nearby-cards-wrapper-desktop">
    {nearbyCardsData.map((card) => (
      <div className="sh-nearby-section" key={card.id}>
        <div className="sh-nearby-card">
          {/* IMAGE PART - Horizontal layout with overlay */}
          <div
            className="sh-kufri-card"
            style={{ backgroundImage: `url(${card.image})` }}
          >
            <div className="sh-kufri-overlay">
              <div className="sh-kufri-content">
                {/* LEFT */}
                <div className="sh-kufri-left">
                  <h2 className="sh-kufri-title">{card.title}</h2>
                  <div className="sh-kufri-info">
                    <div className="sh-info-pill">
                      <Navigation size={16} />
                      <span>{card.distance}</span>
                    </div>
                    <div className="sh-info-pill">
                      <Clock size={16} />
                      <span>{card.time}</span>
                    </div>
                    <div className="sh-info-pill">
                      <Mountain size={16} />
                      <span>{card.height}</span>
                    </div>
                  </div>
                </div>
                {/* RIGHT ICON */}
                <span className="sh-snow-icon">{card.rightIcon}</span>
              </div>
            </div>
          </div>

          {/* CONTENT PART */}
          <div className="sh-card-body">
            <p className="sh-description">{card.description}</p>
            <h4 className="sh-attraction-title">
              <Star className="sh-star" size={18} /> Top Attractions
            </h4>
            <ul className="sh-attraction-list">
              {card.attractions.map((item, index) => (
                <li key={index}>
                  <ArrowRight className="sh-arrow" size={14} /> {item}
                </li>
              ))}
            </ul>
            {/* INFO BOXES */}
            <div className="sh-info-cards">
              <div className="sh-info-box sh-blue">
                <h5>Best Time to Visit</h5>
                <p style={{ fontSize: "13px", marginBottom: "0px" }}>{card.bestTime}</p>
              </div>
              <div className="sh-info-box sh-green">
                <h5>Must Try</h5>
                <p style={{ fontSize: "13px", marginBottom: "0px" }}>{card.mustTry}</p>
              </div>
            </div>
            {/* ACTIVITIES */}
            <div className="sh-activities">
              <h5>Popular Activities</h5>
              <div className="sh-activity-tags">
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

  {/* MODALS - Rendered once at the end */}
  {selectedNearby && (
    <NearbyModal 
      data={selectedNearby} 
      onClose={() => setSelectedNearby(null)} 
    />
  )}

</section>

      {/* =========================
         TRAVEL TIPS SECTION
      ========================= */}
      <section className="sh-travel-section">
        <h2 className="sh-travel-title">Travel Tips for Nearby Destinations</h2>
        <div className="sh-travel-card-wrapper">
          <div className="sh-travel-card">
            <div className="sh-icon-circle">
              <Clock size={22} />
            </div>
            <h3>Plan Your Time</h3>
            <p>
              Most destinations can be covered as day trips, but consider staying
              overnight at farther locations like Kasauli or Narkanda for a more
              relaxed experience.
            </p>
          </div>
          <div className="sh-travel-card">
            <div className="sh-icon-circle">
              <Navigation size={22} />
            </div>
            <h3>Hire a Vehicle</h3>
            <p>
              Renting a car or hiring a taxi for the day is the best way to visit
              multiple destinations. Negotiate rates in advance and ensure the
              driver knows the routes.
            </p>
          </div>
          <div className="sh-travel-card">
            <div className="sh-icon-circle">
              <Camera size={22} />
            </div>
            <h3>Photography Paradise</h3>
            <p>
              Carry a good camera and extra batteries. The scenic beauty,
              especially during sunrise and sunset, offers incredible photo
              opportunities.
            </p>
          </div>
          <div className="sh-travel-card">
            <div className="sh-icon-circle">
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

      {/* =========================
         GALLERY SECTION
      ========================= */}
      <section className="sh-shimla-gallery" id="shimla-gallery">
        <h2>Shimla Gallery</h2>
        <p className="sh-gallery-subtitle">
          Discover the breathtaking beauty of Shimla through our curated collection of stunning photographs
        </p>
        <div className="sh-gallery">
          {galleryImages
            .slice(0, showAllImages ? galleryImages.length : window.innerWidth <= 768 ? 6 : 8)
            .map((img, index) => (
              <img
                key={index}
                src={img}
                className={`sh-item sh-item-${index + 1}`}
                onClick={() => setSelectedImage(index)}
                alt={`Shimla view ${index + 1}`}
                loading="lazy"
              />
            ))}
        </div>
        <div className="sh-gallery-toggle-container">
          <button 
            className="sh-gallery-toggle-btn"
            onClick={() => setShowAllImages(!showAllImages)}
          >
            {showAllImages ? (
              <>
                <span className="sh-toggle-icon">−</span>
                <span>See Less</span>
              </>
            ) : (
              <>
                <span className="sh-toggle-icon">+</span>
                <span>See More</span>
                <span className="sh-toggle-count">({galleryImages.length - (window.innerWidth <= 768 ? 6 : 8)} more)</span>
              </>
            )}
          </button>
        </div>
        {selectedImage !== null && (
          <div className="sh-lightbox" onClick={() => setSelectedImage(null)}>
            <span className="sh-close">&times;</span>
            <button 
              className="sh-lightbox-nav sh-lightbox-prev" 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
              }}
              aria-label="Previous image"
            ></button>
            <img 
              src={galleryImages[selectedImage]} 
              className="sh-lightbox-img" 
              alt={`Shimla view ${selectedImage + 1}`}
            />
            <button 
              className="sh-lightbox-nav sh-lightbox-next" 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
              }}
              aria-label="Next image"
            ></button>
            <div className="sh-lightbox-counter">
              {selectedImage + 1} / {galleryImages.length}
            </div>
          </div>
        )}
      </section>

      {/* =========================
         EXPLORE CTA SECTION
      ========================= */}
      <div className="sh-app-container">
        <section className="sh-explore-section">
          <div className="sh-explore-card">
            <div className="sh-explore-content">
              <div className="sh-explore-badge">
                Your Next Adventure Awaits
              </div>
              <h2 className="sh-explore-title">
                Ready to Explore Shimla?
              </h2>
              <p className="sh-explore-description">
                Fresh mountain air, peaceful views, colonial streets, and unforgettable
                experiences — Shimla is waiting for you.
              </p>
              <div className="sh-buttons-container">
                <button onClick={() => navigate("/ContactUs")} className="sh-btn sh-btn-primaryy" >
                  <Phone className="sh-btn-icon" size={20} />
                  Contact Us Now
                </button>
                <button onClick={() => navigate("/packages")} className="sh-btn sh-btn-secondary">
                  <Package className="sh-btn-icon" size={20} />
                  See the Packages
                </button>
              </div>
              <div className="sh-stats-container">
                <div className="sh-stat-item">
                  <span className="sh-stat-number">500+</span>
                  <span className="sh-stat-label">Happy Travelers</span>
                </div>
                <div className="sh-stat-item">
                  <span className="sh-stat-number">30+</span>
                  <span className="sh-stat-label">Tour Packages</span>
                </div>
                <div className="sh-stat-item">
                  <span className="sh-stat-number">4.7★</span>
                  <span className="sh-stat-label">Average Rating</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* =========================
         FOOTER SECTION
      ========================= */}
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
          <div className="footer-bottom">
            <p>© 2026 Shimla Travels. All rights reserved. Made with ❤️ for travelers.</p>
          </div>
        </div>
      </footer>

      {/* ── Chatbot popup + chat window ── */}
      <ChatPopup
        message="🏔️ Explore Shimla like a local! Ask me about attractions, activities, travel tips and more."
        emoji="🌿"
        storageKey="shimlaChatPopup"
        onOpen={() => setChatOpen(true)}
      />
      <SupportChatbot isOpen={chatOpen} onClose={() => setChatOpen(false)} />

    </div>
  );
};

export default Shimla;