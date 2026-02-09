import rom1 from "../assets/rom1.png";
import rom2 from "../assets/rom2.webp";
import rom3 from "../assets/rom3.png";
import rom4 from "../assets/rom4.jpg";
import fam1 from "../assets/fam1.jpg";
import fam2 from "../assets/fam2.jpg";
import fam3 from "../assets/fam3.avif";
import fam4 from "../assets/fam4.jpg";
import adv1 from "../assets/adv1.jpeg";
import adv2 from "../assets/adv2.jpg";
import adv3 from "../assets/adv3.webp";
import adv4 from "../assets/adv4.jpeg";
import adv5 from "../assets/adv5.jpeg";
import bud1 from "../assets/bud1.jpg";
import bud2 from "../assets/bud2.webp";
import bud3 from "../assets/bud3.webp";
import bud4 from "../assets/bud4.jpeg";
import lux4 from "../assets/lux4.avif";
import lux3 from "../assets/lux3.jpeg";
import lux5 from "../assets/lux5.jpg";
import lux1 from "../assets/lux1.avif";
import lux2 from "../assets/lux2.jfif";
import week1 from "../assets/week1.webp";
import week2 from "../assets/week2.jpg";
import week3 from "../assets/week3.jpg";
import week4 from "../assets/week4.jpeg";
import spi1 from "../assets/spi1.jpg";
import spi2 from "../assets/spi2.jpg";
import spi3 from "../assets/spi3.webp";
import spi4 from "../assets/spi4.webp";
import nat1 from "../assets/nat1.jpg";
import nat2 from "../assets/nat2.avif";
import nat3 from "../assets/nat3.jpg";
import nat4 from "../assets/nat4.webp";
import cop1 from "../assets/cop1.webp";
import cop2 from "../assets/cop2.png";
import cop3 from "../assets/cop3.webp";
import cop4 from "../assets/cop4.jpg";

export const packagesData = [
/* ==========================================================Family============================================================= */
  {
    id: 1,
    title: "Shimla Manali Family Paradise",
    category: "Family",
    rating: 4.3,
    duration: "6 Days / 5 Nights",
    price: 28500,
    originalPrice: 33500,
    description: "Perfect family getaway exploring Shimla's colonial charm and Manali's natural beauty with kid-friendly activities.",
    highlights: ["Mall Road Shopping", "Solang Valley", "Toy Train Ride", "Family-friendly Hotels"],
    image: fam1
  },
  {
    id: 2,
    title: "Family Fun at Naldehra",
    category: "Family",
    rating: 4.3,
    duration: "4 Days / 3 Nights",
    price: 19500,
    originalPrice: 23000,
    description: "Family package featuring golf, nature walks, and picnic spots at beautiful Naldehra.",
    highlights: ["Golf Course", "Picnic Spots", "Nature Walks", "Horse Riding", "Family Activities"],
    image: fam2
  },
  {
    id: 3,
    title: "Grand Family Himachal Tour",
    category: "Family",
    rating: 4.3,
    duration: "8 Days / 7 Nights",
    price: 42000,
    originalPrice: 50500,
    description: "Comprehensive family tour covering Shimla, Manali, Dharamshala, and Dalhousie.",
    highlights: ["Multi-City Tour", "Kid-Friendly", "Sightseeing", "Cable Car Rides", "Local Experiences"],
    image: fam3
  },
  {
  id: 4,
  title: "Shimla Family Retreat",
  category: "Family",
  rating: 4.3,
  duration: "5 Days / 4 Nights",
  price: 25000,
  originalPrice: 30000,
  description: "Relaxed family vacation with sightseeing and leisure time.",
  highlights: ["Family Resort", "Kids Activities", "Sightseeing", "Cultural Shows"],
  image: fam4
},


/* ===========================================================Adventure========================================================= */
  {
    id: 5,
    title: "Shimla Adventure Trek",
    category: "Adventure",
    rating: 4.3,
    duration: "4 Days / 3 Nights",
    price: 15500,
    originalPrice: 19500,
    description: "Thrilling trekking experience through pine forests and mountain trails with camping under the stars.",
    highlights: ["Churdhar Peak Trek", "Camping", "Rock Climbing", "Valley Crossing", "Adventure Sports"],
    image: adv1
  },
  {
    id: 6,
    title: "Shimla Kufri Adventure",
    category: "Adventure",
    rating: 4.3,
    duration: "3 Days / 2 Nights",
    price: 13500,
    originalPrice: 16500,
    description: "Exciting adventure package with skiing, horse riding, and yak rides in Kufri.",
    highlights: ["Kufri Skiing", "Horse Riding", "Yak Rides", "Himalayan Zoo", "Adventure Activities"],
    image: adv2
  },
  {
    id: 7,
    title: "Shimla Manali Adventure Circuit",
    category: "Adventure",
    rating: 4.3,
    duration: "7 Days / 6 Nights",
    price: 32000,
    originalPrice: 39500,
    description: "Complete adventure circuit covering paragliding, rafting, trekking, and more.",
    highlights: ["Paragliding", "River Rafting", "Trekking", "Camping", "Adventure Sports"],
    image: adv3
  },
  {
  id: 8,
  title: "Extreme Adventure Challenge",
  category: "Adventure",
  rating: 4.3,
  duration: "5 Days / 4 Nights",
  price: 24000,
  originalPrice: 29500,
  description: "Ultimate adventure challenge for thrill-seekers.",
  highlights: ["Camping", "Mountain Biking", "Rock Climbing", "Rappelling"],
  image: adv4
},
{
  id: 9,
  title: "Snow Adventure Special",
  category: "Adventure",
  rating: 4.3,
  duration: "4 Days / 3 Nights",
  price: 19500,
  originalPrice: 23500,
  description: "Winter snow adventure package.",
  highlights: ["Skiing", "Snowboarding", "Snow Trekking"],
  image: adv5
},


/* ===========================================================Budget=========================================================== */
  {
    id: 10,
    title: "Budget Shimla Express",
    category: "Budget",
    rating: 4.3,
    duration: "3 Days / 2 Nights",
    price: 8500,
    originalPrice: 10500,
    description: "Affordable Shimla tour covering major attractions without compromising on comfort and experience.",
    highlights: ["Jakhu Temple", "Ridge Road", "Christ Church", "Mall Road", "Local Cuisine"],
    image: bud1
  },
  {
    id: 11,
    title: "Budget Chail Escape",
    category: "Budget",
    rating: 4.3,
    duration: "2 Days / 1 Night",
    price: 7500,
    originalPrice: 9200,
    description: "Affordable trip to serene Chail with its famous palace and cricket ground.",
    highlights: ["Chail Palace", "World's Highest Cricket Ground", "Kali Temple", "Forest Walk", "Local Market"],
    image: bud2
  },
  {
  id: 12,
  title: "Budget Hill Station Hop",
  category: "Budget",
  rating: 4.3,
  duration: "5 Days / 4 Nights",
  price: 14500,
  originalPrice: 17500,
  description: "Affordable multi-destination package covering Shimla, Kufri, and Chail.",
  highlights: ["Three Destinations", "Budget Hotels", "All Transfers", "Sightseeing", "Group Tours"],
  image: bud3
},
  {
  id: 13,
  title: "Economy Shimla Tour",
  category: "Budget",
  rating: 4.3,
  duration: "4 Days / 3 Nights",
  price: 11000,
  originalPrice: 13500,
  description: "Value-for-money package with all major attractions.",
  highlights: ["Comfort Hotels", "Meals", "Sightseeing", "Transfers"],
  image: bud4
},



/* ==========================================================Honeymoon========================================================== */
  {
    id: 14,
    title: "Romantic Shimla Honeymoon",
    category: "Honeymoon",
    rating: 4.3,
    duration: "5 Days / 4 Nights",
    price: 35000,
    originalPrice: 42000,
    description: "Intimate honeymoon package with candlelight dinners, couple spa, and romantic locations.",
    highlights: ["Private Cottage", "Candlelight Dinner", "Couple Spa", "Kufri Excursion", "Flower Decoration"],
    image: rom1
  },

  {
    id: 15,
    title: "Honeymoon in Mashobra",
    category: "Honeymoon",
    rating: 4.3,
    duration: "4 Days / 3 Nights",
    price: 32000,
    originalPrice: 39500,
    description: "Secluded romantic retreat in peaceful Mashobra with apple orchards and forest trails.",
    highlights: ["Private Villa", "Apple Orchards", "Romantic Walks", "Bonfire Evening", "Couple Activities"],
    image: rom3,
  },
  {
  id: 16,
  title: "Honeymoon Bliss Shimla-Manali",
  category: "Honeymoon",
  rating: 4.3,
  duration: "7 Days / 6 Nights",
  price: 48000,
  originalPrice: 59500,
  description: "Extended honeymoon covering romantic spots in Shimla and Manali with luxury stays.",
  highlights: ["Romantic Hotels", "Couple Spa", "Private Excursions", "Candlelight Dinners", "Photography"],
  image: rom2,
},

  {
  id: 17,
  title: "Luxury Honeymoon Suite",
  category: "Honeymoon",
  rating: 4.3,
  duration: "3 Days / 2 Nights",
  price: 38000,
  originalPrice: 46500,
  description: "Intimate honeymoon in luxury suite.",
  highlights: ["Jacuzzi", "Champagne Welcome", "Room Service"],
  image: rom4
},

  
  /* ===========================================================Luxury========================================================== */
  {
    id: 18,
    title: "Shimla Luxury Heritage",
    category: "Luxury",
    rating: 4.3,
    duration: "7 Days / 6 Nights",
    price: 75000,
    originalPrice: 92000,
    description: "Experience Shimla's colonial grandeur with 5-star accommodations and personalized butler service.",
    highlights: ["Oberoi Wildflower Hall", "Heritage Walk", "Fine Dining", "Private Car", "Butler Service"],
    image: lux1
  },
  {
    id: 19,
    title: "Luxury Wildflower Experience",
    category: "Luxury",
    rating: 4.3,
    duration: "5 Days / 4 Nights",
    price: 95000,
    originalPrice: 118000,
    description: "Ultimate luxury at Wildflower Hall with spa treatments, fine dining, and mountain views.",
    highlights: ["5-Star Resort", "Spa Treatments", "Gourmet Dining", "Private Butler", "Chauffeur Service"],
    image: lux2
  },
  {
  id: 20,
  title: "Royal Luxury Shimla Experience",
  category: "Luxury",
  rating: 4.3,
  duration: "4 Days / 3 Nights",
  price: 68000,
  originalPrice: 85000,
  description: "Royal treatment with heritage hotel stays and exclusive guided tours.",
  highlights: ["Heritage Hotels", "Private Guide", "Luxury Car", "Fine Dining", "Exclusive Access"],
  image: lux3
},
  {
  id: 21,
  title: "Maharaja Luxury Trail",
  category: "Luxury",
  rating: 4.3,
  duration: "6 Days / 5 Nights",
  price: 89000,
  originalPrice: 110000,
  description: "Royal travel experience with palace stays.",
  highlights: ["Palace Hotels", "Vintage Cars", "Royal Service"],
  image: lux4
},
{
  id: 22,
  title: "Premium Luxury Escape",
  category: "Luxury",
  rating: 4.3,
  duration: "5 Days / 4 Nights",
  price: 95000,
  originalPrice: 120000,
  description: "Ultra-premium luxury vacation experience.",
  highlights: ["Private Villa", "Butler Service", "Luxury Car", "Private Guide"],
  image: lux5
},


  /* ========================================================Weekend=========================================================== */
  {
    id: 23,
    title: "Weekend Gateway to Shimla",
    category: "Weekend",
    rating: 4.3,
    duration: "2 Days / 1 Night",
    price: 6500,
    originalPrice: 7500,
    description: "Quick weekend escape from Delhi to enjoy Shimla's pleasant weather and scenic beauty.",
    highlights: ["Ridge Walking", "Mall Road", "Lakkar Bazaar", "Cafe Hopping", "Photography"],
    image: week1
  },
  {
    id: 24,
    title: "Weekend Narkanda Getaway",
    category: "Weekend",
    rating: 4.3,
    duration: "2 Days / 1 Night",
    price: 8000,
    originalPrice: 9200,
    description: "Quick weekend trip to Narkanda for skiing and apple orchards.",
    highlights: ["Skiing", "Apple Orchards", "Hatu Peak", "Local Cuisine", "Mountain Views"],
    image: week2
  },
  {
  id: 25,
  title: "Quick Shimla Weekend",
  category: "Weekend",
  rating: 4.3,
  duration: "2 Days / 1 Night",
  price: 7200,
  originalPrice: 8300,
  description: "Fast-paced weekend covering major Shimla attractions.",
  highlights: ["Mall Road", "Ridge", "Jakhu Temple", "Shopping"],
  image: week3
},
{
  id: 26,
  title: "Weekend Escape Adventure",
  category: "Weekend",
  rating: 4.3,
  duration: "3 Days / 2 Nights",
  price: 9500,
  originalPrice: 11200,
  description: "Adventure-filled weekend getaway.",
  highlights: ["Trekking", "Sightseeing", "Local Cuisine"],
  image: week4
},


  /* ==========================================================Spiritual======================================================== */

  {
    id: 27,
    title: "Shimla Spiritual Journey",
    category: "Spiritual",
    rating: 4.3,
    duration: "4 Days / 3 Nights",
    price: 12000,
    originalPrice: 14500,
    description: "Visit ancient temples and monasteries in and around Shimla for spiritual rejuvenation.",
    highlights: ["Jakhu Temple", "Tara Devi", "Sankat Mochan", "Buddhist Monastery", "Meditation Sessions"],
    image: spi1
  },
  {
    id: 28,
    title: "Spiritual Kamru Fort Trek",
    category: "Spiritual",
    rating: 4.3,
    duration: "3 Days / 2 Nights",
    price: 11000,
    originalPrice: 13200,
    description: "Ancient fort visit with spiritual significance and breathtaking valley views.",
    highlights: ["Kamru Fort", "Ancient Temple", "Valley Views", "Cultural Experience", "Local Interaction"],
    image: spi2
  },
  {
  id: 29,
  title: "Himalayan Spiritual Circuit",
  category: "Spiritual",
  rating: 4.3,
  duration: "6 Days / 5 Nights",
  price: 19500,
  originalPrice: 23500,
  description: "Spiritual journey visiting major temples and meditation centers.",
  highlights: ["Temples", "Meditation", "Yoga Sessions", "Prayer Ceremonies"],
  image: spi3
}, 
  {
  id: 30,
  title: "Yoga & Meditation Retreat",
  category: "Spiritual",
  rating: 4.3,
  duration: "5 Days / 4 Nights",
  price: 15500,
  originalPrice: 18500,
  description: "Wellness retreat for mind and body.",
  highlights: ["Yoga", "Meditation", "Wellness Program"],
  image: spi4
},


  /* =========================================================Nature=========================================================== */

  {
    id: 31,
    title: "Nature Trails of Shimla",
    category: "Nature",
    rating: 4.3,
    duration: "5 Days / 4 Nights",
    price: 18000,
    originalPrice: 21500,
    description: "Explore Shimla's pristine forests, wildlife sanctuaries, and scenic nature trails.",
    highlights: ["Glen Forest", "Chadwick Falls", "Bird Watching", "Nature Walks", "Photography Tours"],
    image: nat1
  },
  {
    id: 32,
    title: "Nature's Cradle - Tattapani",
    category: "Nature",
    rating: 4.3,
    duration: "3 Days / 2 Nights",
    price: 14000,
    originalPrice: 17000,
    description: "Rejuvenate at natural hot springs of Tattapani with river rafting options.",
    highlights: ["Hot Springs", "River Rafting", "Riverside Camping", "Nature Walks", "Local Villages"],
    image: nat2
  },
  {
  id: 33,
  title: "Wildlife & Nature Safari",
  category: "Nature",
  rating: 4.3,
  duration: "4 Days / 3 Nights",
  price: 16500,
  originalPrice: 19800,
  description: "Explore Shimla's wildlife sanctuaries and bird watching hotspots.",
  highlights: ["Wildlife Sanctuary", "Bird Watching", "Forest Safari", "Eco Tourism"],
  image: nat3
},
 {
  id: 34,
  title: "Himalayan Flora & Fauna Tour",
  category: "Nature",
  rating: 4.3,
  duration: "6 Days / 5 Nights",
  price: 21000,
  originalPrice: 25500,
  description: "Educational nature exploration tour.",
  highlights: ["Botanical Gardens", "Wildlife Safari", "Nature Trails"],
  image: nat4
},



  /* ============================================================Corporate===================================================== */

  {
    id: 35,
    title: "Corporate Team Outing",
    category: "Corporate",
    rating: 4.3,
    duration: "3 Days / 2 Nights",
    price: 22000,
    originalPrice: 26500,
    description: "Perfect corporate retreat with team building activities and conference facilities.",
    highlights: ["Conference Hall", "Team Activities", "Corporate Dinner", "Indoor Games", "Transport"],
    image: cop1
  },
  
  {
    id: 36,
    title: "Corporate Leadership Retreat",
    category: "Corporate",
    rating: 4.3,
    duration: "4 Days / 3 Nights",
    price: 28000,
    originalPrice: 34000,
    description: "Executive retreat with conference facilities, team building, and leisure activities.",
    highlights: ["Executive Rooms", "Meeting Facilities", "Leadership Activities", "Networking Dinner"],
    image: cop2
  },
  
{
  id: 37,
  title: "Corporate Offsite Shimla",
  category: "Corporate",
  rating: 4.3,
  duration: "2 Days / 1 Night",
  price: 18000,
  originalPrice: 21500,
  description: "Corporate offsite with meetings and team bonding activities.",
  highlights: ["Meeting Rooms", "Team Building", "Corporate Lunch", "WiFi"],
  image: cop3
},

{
  id: 38,
  title: "Corporate Incentive Tour",
  category: "Corporate",
  rating: 4.3,
  duration: "5 Days / 4 Nights",
  price: 35000,
  originalPrice: 42500,
  description: "Luxury corporate incentive tour.",
  highlights: ["Luxury Hotels", "Gala Dinner", "Awards Ceremony"],
  image: cop4
},

];


export const categories = [
  "All",
  "Family",
  "Adventure",
  "Budget",
  "Honeymoon",
  "Luxury",
  "Weekend",
  "Spiritual",
  "Nature",
  "Corporate"
];
