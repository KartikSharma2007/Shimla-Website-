import rom1 from "../assets/rom1.png";
import rom2 from "../assets/rom2.webp";
import rom3 from "../assets/rom3.png";
import rom4 from "../assets/rom4.jpg";
import rom5 from "../assets/rom5.webp";
import fam1 from "../assets/fam1.jpg";
import fam2 from "../assets/fam2.jpg";
import fam3 from "../assets/fam3.avif";
import fam4 from "../assets/fam4.jpg";
import adv1 from "../assets/adv1.jpeg";
import adv2 from "../assets/adv2.jpg";
import adv3 from "../assets/adv3.webp";
import adv4 from "../assets/adv4.jpeg";
import adv5 from "../assets/adv5.jpeg";
import adv6 from "../assets/adv6.jpg";
import adv7 from "../assets/adv7.jpg";
import adv8 from "../assets/adv8.jfif";
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
import win1 from "../assets/gul.jpg";
import win2 from "../assets/win2.webp";
import win3 from "../assets/win3.webp";
import him1 from "../assets/him1.webp";
import him2 from "../assets/him2.webp";
import him3 from "../assets/him3.jpeg";
import cui1 from "../assets/cui1.webp";
import cui2 from "../assets/cui2.jfif";
import well1 from "../assets/well1.webp";


const wellness2 = spi4; // Yoga retreat - reuse spiritual image

// Helper function to generate reviews (adds realistic review data)
// Fix #1: Use reviewerName + reviewerAvatar to match ReviewsModal field names
// Fix #2: Use packageId in the id to make each review id globally unique
const generateReviews = (packageId, category, keywords) => {
  return [
    
  ];
};

export const packagesData = [
  /* ==========================================================
     FAMILY PACKAGES (4 packages) - Realistic pricing: ₹12,000-35,000
     ==========================================================*/
  {
    id: 1,
    title: "Shimla Manali Family Extravaganza",
    category: "Family",
    rating: 4.5,
    duration: "6 Days / 5 Nights",
    price: 18500,
    originalPrice: 22400,
    location: "Shimla, Manali, Kufri",
    description: "Create cherished family memories with our bestselling 6-day tour covering Shimla's colonial charm and Manali's adventure paradise. Includes toy train experience, Kufri snow activities, and comfortable family accommodations.",
    shortDescription: "Perfect family getaway with toy train rides, snow activities, and kid-friendly hotels.",
    highlights: [
      "UNESCO Toy Train Ride",
      "Kufri Snow Adventure Park",
      "Solang Valley Excursion",
      "Family-friendly 3-star Hotels",
      "Mall Road Shopping Experience",
      "Jakhu Temple Visit"
    ],
    inclusions: [
      "5 nights accommodation (3-star hotels)",
      "Daily breakfast & dinner",
      "Private AC vehicle for transfers",
      "English-speaking guide",
      "All sightseeing as per itinerary",
      "Toy train tickets Shimla-Kalka"
    ],
    exclusions: [
      "Airfare/train tickets to destination",
      "Lunch and personal expenses",
      "Adventure activity charges",
      "Travel insurance"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Shimla",
        description: "Pick-up from Shimla railway station/airport. Transfer to hotel. Evening stroll on Mall Road and Ridge. Welcome dinner.",
        tags: ["Transfer", "Dinner", "Leisure"]
      },
      {
        day: 2,
        title: "Shimla Local & Kufri",
        description: "Morning visit to Jakhu Temple. Afternoon excursion to Kufri for snow activities and Himalayan Nature Park.",
        tags: ["Sightseeing", "Snow Activities", "Breakfast", "Dinner"]
      },
      {
        day: 3,
        title: "Shimla to Manali",
        description: "Scenic drive to Manali via Kullu Valley. En route visit to Hanogi Mata Temple and Vaishno Devi Temple. Check-in at Manali hotel.",
        tags: ["Transfer", "Scenic Drive", "Breakfast", "Dinner"]
      },
      {
        day: 4,
        title: "Solang Valley Adventure",
        description: "Full day at Solang Valley. Optional paragliding, zorbing, and ropeway. Visit to Vashisht Hot Springs.",
        tags: ["Adventure", "Sightseeing", "Breakfast", "Dinner"]
      },
      {
        day: 5,
        title: "Manali Local Sightseeing",
        description: "Visit Hadimba Temple, Manu Temple, Old Manali, and Tibetan Monastery. Evening at Mall Road.",
        tags: ["Temple Visit", "Shopping", "Breakfast", "Dinner"]
      },
      {
        day: 6,
        title: "Departure",
        description: "After breakfast, check-out and transfer to Chandigarh or Delhi for onward journey.",
        tags: ["Breakfast", "Transfer"]
      }
    ],
    bestTime: "March to June, September to December",
    groupSize: "2-8 people",
    image: fam1,
    reviews: generateReviews(1, "Family", ["toy train", "snow activities", "family hotels"])
  },
  {
    id: 2,
    title: "Naldehra Golf & Nature Retreat",
    category: "Family",
    rating: 4.4,
    duration: "4 Days / 3 Nights",
    price: 14200,
    originalPrice: 16800,
    location: "Naldehra, Shimla",
    description: "Perfect family retreat featuring Asia's oldest golf course, nature walks through cedar forests, and peaceful picnic spots away from Shimla's crowds.",
    shortDescription: "Family retreat with golf, nature walks, and serene cedar forests at beautiful Naldehra.",
    highlights: [
      "Asia's Oldest Golf Course (9-hole)",
      "Cedar Forest Nature Trails",
      "Tattapani Hot Springs (optional)",
      "Horse Riding for Kids",
      "Riverside Picnic Lunch",
      "Bird Watching Sessions"
    ],
    inclusions: [
      "3 nights at Naldehra resort",
      "All meals (breakfast, lunch, dinner)",
      "Golf equipment for beginners",
      "Nature guide for treks",
      "Hotel transfers from Shimla",
      "Bonfire evening with music"
    ],
    exclusions: [
      "Personal golf caddy charges",
      "Extra spa services",
      "Alcoholic beverages",
      "Tips and gratuities"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Golf Introduction",
        description: "Transfer from Shimla to Naldehra. Evening golf course orientation and practice session. Welcome dinner.",
        tags: ["Transfer", "Golf", "Dinner"]
      },
      {
        day: 2,
        title: "Nature Trail & Activities",
        description: "Morning guided nature walk through cedar forests. Afternoon family golf session. Evening bonfire.",
        tags: ["Nature Walk", "Golf", "All Meals"]
      },
      {
        day: 3,
        title: "Tattapani Excursion",
        description: "Optional day trip to Tattapani for hot springs and river rafting. Return for farewell dinner.",
        tags: ["Excursion", "Hot Springs", "All Meals"]
      },
      {
        day: 4,
        title: "Departure",
        description: "Morning at leisure. Check-out and transfer to Shimla.",
        tags: ["Breakfast", "Transfer"]
      }
    ],
    bestTime: "April to November",
    groupSize: "2-6 people",
    image: fam2,
    reviews: generateReviews(2, "Family", ["golf", "nature walks", "kids activities"])
  },
  {
    id: 3,
    title: "Grand Himachal Family Circuit",
    category: "Family",
    rating: 4.6,
    duration: "8 Days / 7 Nights",
    price: 28500,
    originalPrice: 33900,
    location: "Shimla, Manali, Dharamshala, Dalhousie",
    description: "Comprehensive family tour covering four iconic Himachal destinations. Perfect for families wanting to explore the diversity of the Himalayan state.",
    shortDescription: "Comprehensive 8-day tour covering Shimla, Manali, Dharamshala, and Dalhousie.",
    highlights: [
      "Four Hill Stations in One Trip",
      "McLeodganj Tibetan Culture",
      "Dalhousie Colonial Architecture",
      "Khajjiar 'Mini Switzerland'",
      "Cable Car Rides",
      "Kid-friendly Activities Throughout"
    ],
    inclusions: [
      "7 nights in family-friendly hotels",
      "All meals (MAP plan)",
      "Private vehicle for entire tour",
      "Professional tour escort",
      "All monument entries",
      "Toy train ride segment"
    ],
    exclusions: [
      "Flights or train to/from start point",
      "Personal expenses",
      "Optional adventure activities",
      "Travel insurance"
    ],
    itinerary: [
      {
        day: 1,
        title: "Shimla Arrival",
        description: "Arrive in Shimla. Transfer to hotel. Evening Mall Road exploration.",
        tags: ["Transfer", "Leisure"]
      },
      {
        day: 2,
        title: "Shimla - Kufri",
        description: "Full day excursion to Kufri. Adventure activities and nature park visit.",
        tags: ["Sightseeing", "Adventure"]
      },
      {
        day: 3,
        title: "Shimla to Manali",
        description: "Drive to Manali. En route visit Kullu Shawl Factory. Evening at Manali Mall.",
        tags: ["Transfer", "Sightseeing"]
      },
      {
        day: 4,
        title: "Manali - Solang Valley",
        description: "Solang Valley adventure day. Optional paragliding and ropeway.",
        tags: ["Adventure", "Sightseeing"]
      },
      {
        day: 5,
        title: "Manali to Dharamshala",
        description: "Scenic drive to Dharamshala. Visit McLeodganj and Dalai Lama Temple.",
        tags: ["Transfer", "Cultural"]
      },
      {
        day: 6,
        title: "Dharamshala to Dalhousie",
        description: "Morning at Dharamshala cricket stadium. Drive to Dalhousie. Evening walk.",
        tags: ["Transfer", "Sightseeing"]
      },
      {
        day: 7,
        title: "Dalhousie - Khajjiar",
        description: "Day trip to Khajjiar. Lake visit and zorbing. Return to Dalhousie.",
        tags: ["Excursion", "Nature"]
      },
      {
        day: 8,
        title: "Departure from Pathankot",
        description: "Check-out and transfer to Pathankot railway station.",
        tags: ["Transfer"]
      }
    ],
    bestTime: "March to June, September to November",
    groupSize: "2-8 people",
    image: fam3,
    reviews: generateReviews(3, "Family", ["hill stations", "tibetan culture", "kids friendly"])
  },
  {
    id: 4,
    title: "Shimla Heritage Family Stay",
    category: "Family",
    rating: 4.3,
    duration: "5 Days / 4 Nights",
    price: 16800,
    originalPrice: 19900,
    location: "Shimla, Mashobra",
    description: "Relaxed family vacation staying in heritage properties. Focus on Shimla's colonial history, cultural shows, and comfortable leisure time.",
    shortDescription: "Relaxed heritage stay with colonial walks, cultural shows, and leisure time.",
    highlights: [
      "Heritage Property Stay",
      "Viceregal Lodge Tour",
      "Shimla Heritage Walk",
      "Cultural Dance Evening",
      "Kids Activity Corner",
      "Mall Road Shopping"
    ],
    inclusions: [
      "4 nights heritage hotel",
      "Breakfast and dinner",
      "Heritage walk guide",
      "Cultural show tickets",
      "Airport/railway transfers",
      "Museum entries"
    ],
    exclusions: [
      "Lunch",
      "Personal shopping",
      "Spa treatments",
      "Tips"
    ],
    itinerary: [
      {
        day: 1,
        title: "Heritage Shimla Arrival",
        description: "Transfer to heritage property. Evening heritage walk on Mall Road.",
        tags: ["Transfer", "Heritage Walk"]
      },
      {
        day: 2,
        title: "Colonial Shimla Tour",
        description: "Visit Viceregal Lodge, Gaiety Theatre, Christ Church. Afternoon at leisure.",
        tags: ["Sightseeing", "Heritage"]
      },
      {
        day: 3,
        title: "Mashobra Day",
        description: "Excursion to Mashobra. Nature walk and picnic lunch. Evening cultural show.",
        tags: ["Excursion", "Culture"]
      },
      {
        day: 4,
        title: "Jakhu & Local",
        description: "Morning Jakhu Temple visit (ropeway optional). Afternoon shopping. Farewell dinner.",
        tags: ["Sightseeing", "Shopping", "Dinner"]
      },
      {
        day: 5,
        title: "Departure",
        description: "Check-out and transfer to Shimla station/airport.",
        tags: ["Transfer"]
      }
    ],
    bestTime: "Year round",
    groupSize: "2-6 people",
    image: fam4,
    reviews: generateReviews(4, "Family", ["heritage", "colonial history", "cultural shows"])
  },

  /* ==========================================================
     ADVENTURE PACKAGES (5 packages) - Realistic pricing: ₹12,000-32,000
     ==========================================================*/
  {
    id: 5,
    title: "Himalayan Trekking Expedition",
    category: "Adventure Sports",
    rating: 4.7,
    duration: "4 Days / 3 Nights",
    price: 15600,
    originalPrice: 18900,
    location: "Shimla, Chail Wildlife Sanctuary",
    description: "Experience authentic Himalayan trekking through dense pine forests, scenic mountain trails, and riverside camping. Perfect for adventure enthusiasts seeking offbeat experiences.",
    shortDescription: "Authentic trekking through pine forests with camping under star-lit skies.",
    highlights: [
      "Guided Forest Trekking (15km total)",
      "Riverside Camping Experience",
      "Sunrise at Shimla Peak",
      "Wildlife Spotting",
      "Campfire & Barbecue Dinner",
      "Professional Trekking Gear"
    ],
    inclusions: [
      "3 nights (2 camping, 1 hotel)",
      "All meals during trek",
      "Professional trek guide",
      "Trekking equipment",
      "First aid support",
      "Permits and fees"
    ],
    exclusions: [
      "Personal trekking shoes",
      "Alcoholic beverages",
      "Camera fees",
      "Personal insurance"
    ],
    itinerary: [
      {
        day: 1,
        title: "Base Camp Setup",
        description: "Arrive at base camp near Chail. Equipment check and briefing. Evening acclimatization walk.",
        tags: ["Camping", "Briefing", "Dinner"]
      },
      {
        day: 2,
        title: "Forest Trek Day 1",
        description: "6-hour trek through pine and cedar forests. Riverside lunch. Camp setup and bonfire dinner.",
        tags: ["Trekking", "Camping", "All Meals"]
      },
      {
        day: 3,
        title: "Summit & Return",
        description: "Early morning summit trek for sunrise. Return to base. Transfer to hotel for hot shower and rest.",
        tags: ["Trekking", "Sunrise", "Hotel Stay"]
      },
      {
        day: 4,
        title: "Departure",
        description: "Breakfast at hotel. Check-out and transfer to Shimla.",
        tags: ["Breakfast", "Transfer"]
      }
    ],
    bestTime: "March to June, September to November",
    groupSize: "4-12 people",
    difficulty: "Moderate",
    image: adv1,
    reviews: generateReviews(5, "Adventure", ["trekking", "camping", "wildlife"])
  },
  {
    id: 6,
    title: "Kufri Snow Adventure Camp",
    category: "Adventure Sports",
    rating: 4.5,
    duration: "3 Days / 2 Nights",
    price: 13200,
    originalPrice: 15900,
    location: "Kufri, Fagu",
    description: "Ultimate winter adventure with skiing lessons, snowboarding, and snow trekking. Stay in cozy mountain camps with modern amenities.",
    shortDescription: "Skiing, snowboarding, and snow adventures in Kufri's winter paradise.",
    highlights: [
      "Professional Skiing Lessons (2 hours)",
      "Snowboarding Experience",
      "Snow Trek to Mahasu Peak",
      "Yak & Horse Riding",
      "Himalayan Nature Park Safari",
      "Warm Camping with Heating"
    ],
    inclusions: [
      "2 nights heated camp accommodation",
      "All meals (hot breakfast, dinner)",
      "Skiing equipment rental",
      "Professional instructor",
      "Nature park entry",
      "All snow activities"
    ],
    exclusions: [
      "Personal winter clothing",
      "Photography charges",
      "Extra skiing hours",
      "Travel to Kufri"
    ],
    itinerary: [
      {
        day: 1,
        title: "Kufri Arrival & Skiing",
        description: "Transfer to Kufri. Afternoon skiing lessons. Evening hot chocolate by bonfire.",
        tags: ["Transfer", "Skiing", "Camping"]
      },
      {
        day: 2,
        title: "Snow Activities Day",
        description: "Full day of snowboarding, snow trekking to Mahasu Peak, and yak riding. Evening barbecue.",
        tags: ["Snow Activities", "Trekking", "Camping"]
      },
      {
        day: 3,
        title: "Nature Park & Departure",
        description: "Morning visit to Himalayan Nature Park. Lunch and transfer to Shimla.",
        tags: ["Sightseeing", "Transfer"]
      }
    ],
    bestTime: "December to March",
    groupSize: "2-8 people",
    difficulty: "Easy to Moderate",
    image: adv2,
    reviews: generateReviews(6, "Adventure", ["skiing", "snowboarding", "camping"])
  },
  {
    id: 7,
    title: "Manali-Shimla Adventure Circuit",
    category: "Adventure Sports",
    rating: 4.8,
    duration: "7 Days / 6 Nights",
    price: 24500,
    originalPrice: 28900,
    location: "Shimla, Manali, Solang Valley",
    description: "Complete adventure circuit combining paragliding, river rafting, rock climbing, and high-altitude trekking. The ultimate adrenaline package.",
    shortDescription: "Ultimate adventure with paragliding, rafting, camping, and multi-sport activities.",
    highlights: [
      "Paragliding at Solang Valley",
      "River Rafting Beas River (14km)",
      "Rock Climbing & Rappelling",
      "High-altitude Camping",
      "Mountain Biking (20km trail)",
      "Zorbing & Ropeway"
    ],
    inclusions: [
      "6 nights (3 hotel, 3 camping)",
      "All adventure activity fees",
      "Professional instructors",
      "Safety equipment",
      "All meals during activities",
      "Medical kit"
    ],
    exclusions: [
      "Personal adventure gear",
      "Travel insurance mandatory",
      "Camera permits",
      "Personal expenses"
    ],
    itinerary: [
      {
        day: 1,
        title: "Shimla Arrival & Acclimatization",
        description: "Arrive in Shimla. Light trekking and equipment check. Briefing session.",
        tags: ["Arrival", "Briefing"]
      },
      {
        day: 2,
        title: "Shimla Adventure Day",
        description: "Rock climbing and rappelling at Dhalli. Afternoon mountain biking.",
        tags: ["Rock Climbing", "Biking"]
      },
      {
        day: 3,
        title: "Transfer to Manali",
        description: "Scenic drive to Manali. Evening camp setup near Beas River.",
        tags: ["Transfer", "Camping"]
      },
      {
        day: 4,
        title: "River Rafting Day",
        description: "Full day Beas River rafting (14km stretch). Riverside camping.",
        tags: ["Rafting", "Camping"]
      },
      {
        day: 5,
        title: "Solang Valley Extreme",
        description: "Paragliding, zorbing, and ropeway. Evening at camp.",
        tags: ["Paragliding", "Adventure"]
      },
      {
        day: 6,
        title: "Manali Trek & Return",
        description: "Morning trek to Jogini Waterfalls. Afternoon return to hotel.",
        tags: ["Trekking", "Hotel"]
      },
      {
        day: 7,
        title: "Departure",
        description: "Check-out and transfer to Kullu airport or Manali bus stand.",
        tags: ["Transfer"]
      }
    ],
    bestTime: "April to June, September to October",
    groupSize: "4-10 people",
    difficulty: "Challenging",
    image: adv3,
    reviews: generateReviews(7, "Adventure", ["paragliding", "rafting", "multi-sport"])
  },
  {
    id: 8,
    title: "Mountain Biking & Climbing Challenge",
    category: "Adventure Sports",
    rating: 4.4,
    duration: "5 Days / 4 Nights",
    price: 18900,
    originalPrice: 22500,
    location: "Shimla, Mashobra, Naldehra",
    description: "Push your limits with technical rock climbing, multi-day mountain biking, and high-altitude camping. Designed for experienced adventure seekers.",
    shortDescription: "Technical rock climbing, mountain biking trails, and high-altitude camping.",
    highlights: [
      "Technical Rock Climbing (Grade 4-5)",
      "50km Mountain Biking Circuit",
      "High-altitude Camping (2800m)",
      "Rappelling from 100ft cliffs",
      "Navigation & Survival Skills",
      "Emergency Response Training"
    ],
    inclusions: [
      "4 nights camping",
      "Professional climbing instructor",
      "Mountain bike rental",
      "All safety gear",
      "Nutritionist-planned meals",
      "Satellite communication device"
    ],
    exclusions: [
      "High-altitude insurance (mandatory)",
      "Personal climbing shoes",
      "Energy supplements",
      "Emergency evacuation costs"
    ],
    itinerary: [
      {
        day: 1,
        title: "Base Camp & Training",
        description: "Arrival at Mashobra base camp. Equipment training and safety briefing. Rock climbing basics.",
        tags: ["Training", "Camping"]
      },
      {
        day: 2,
        title: "Biking Day 1",
        description: "25km mountain bike trail to Naldehra. Technical sections and downhill practice.",
        tags: ["Biking", "Camping"]
      },
      {
        day: 3,
        title: "Climbing Challenge",
        description: "Full day rock climbing at Dhalli cliffs. Rappelling session. High-altitude camp.",
        tags: ["Climbing", "Camping"]
      },
      {
        day: 4,
        title: "Biking Day 2 & Navigation",
        description: "25km return trail with navigation challenge. Survival skills workshop.",
        tags: ["Biking", "Skills"]
      },
      {
        day: 5,
        title: "Departure",
        description: "Morning debrief. Certificate distribution. Transfer to Shimla.",
        tags: ["Debrief", "Transfer"]
      }
    ],
    bestTime: "April to June, September to November",
    groupSize: "4-8 people",
    difficulty: "Advanced",
    image: adv4,
    reviews: generateReviews(8, "Adventure", ["biking", "climbing", "challenging"])
  },
  {
    id: 9,
    title: "Winter Skiing Masterclass",
    category: "Adventure Sports",
    rating: 4.6,
    duration: "4 Days / 3 Nights",
    price: 19500,
    originalPrice: 23500,
    location: "Kufri, Narkanda",
    description: "Intensive skiing course with certified instructors. From basics to parallel turns on intermediate slopes. Includes snowboarding introduction.",
    shortDescription: "Intensive skiing course with certified instructors and snowboarding intro.",
    highlights: [
      "Certified Ski Instructor (8 hours)",
      "Ski Equipment Rental",
      "Narkanda Advanced Slopes",
      "Snowboarding Basics",
      "Avalanche Safety Training",
      "Video Analysis Sessions"
    ],
    inclusions: [
      "3 nights ski resort accommodation",
      "Daily breakfast and dinner",
      "8 hours professional instruction",
      "Complete ski gear",
      "Lift passes",
      "Safety equipment"
    ],
    exclusions: [
      "Personal ski clothing",
      "Lunch meals",
      "Extra private lessons",
      "Travel insurance"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Basics",
        description: "Transfer to Kufri. Equipment fitting. Basic skiing stance and gliding.",
        tags: ["Transfer", "Training"]
      },
      {
        day: 2,
        title: "Turning Techniques",
        description: "Snowplough turns and control. Afternoon practice on gentle slopes.",
        tags: ["Skiing", "Training"]
      },
      {
        day: 3,
        title: "Advanced & Narkanda",
        description: "Transfer to Narkanda for intermediate slopes. Parallel turn introduction.",
        tags: ["Skiing", "Advanced"]
      },
      {
        day: 4,
        title: "Assessment & Departure",
        description: "Final skiing assessment. Certificate ceremony. Transfer to Shimla.",
        tags: ["Assessment", "Transfer"]
      }
    ],
    bestTime: "December to February",
    groupSize: "2-6 people",
    difficulty: "Beginner to Intermediate",
    image: adv5,
    reviews: generateReviews(9, "Adventure", ["skiing", "masterclass", "certified"])
  },

  /* ==========================================================
     BUDGET PACKAGES (4 packages) - Realistic pricing: ₹4,500-11,000
     ==========================================================*/
  {
    id: 10,
    title: "Shimla Budget Explorer",
    category: "Budget",
    rating: 4.2,
    duration: "3 Days / 2 Nights",
    price: 5500,
    originalPrice: 7200,
    location: "Shimla, Kufri",
    description: "Affordable Shimla experience covering all major attractions. Comfortable budget hotels, shared transfers, and authentic local experiences without breaking the bank.",
    shortDescription: "Affordable tour covering major attractions with comfortable budget stays.",
    highlights: [
      "Jakhu Temple Visit",
      "Kufri Snow Point",
      "Mall Road Walking Tour",
      "Christ Church & Ridge",
      "Local Market Exploration",
      "Budget Hotel with Heater"
    ],
    inclusions: [
      "2 nights budget hotel (clean, heated)",
      "Daily breakfast",
      "Shared transfers",
      "Basic sightseeing",
      "Guide for walking tour"
    ],
    exclusions: [
      "Lunch and dinner",
      "Entry fees",
      "Personal expenses",
      "Toy train tickets"
    ],
    itinerary: [
      {
        day: 1,
        title: "Shimla Arrival",
        description: "Pick-up from bus stand. Check-in. Evening Mall Road walk.",
        tags: ["Transfer", "Leisure"]
      },
      {
        day: 2,
        title: "Kufri Day Trip",
        description: "Shared taxi to Kufri. Snow activities (self-paid). Return to Shimla.",
        tags: ["Sightseeing", "Kufri"]
      },
      {
        day: 3,
        title: "Local & Departure",
        description: "Morning Jakhu Temple. Check-out and transfer.",
        tags: ["Sightseeing", "Transfer"]
      }
    ],
    bestTime: "Year round",
    groupSize: "Individual or Group",
    image: bud1,
    reviews: generateReviews(10, "Budget", ["affordable", "budget", "backpacker"])
  },
  {
    id: 11,
    title: "Chail Budget Getaway",
    category: "Budget",
    duration: "2 Days / 1 Night",
    rating: 4.1,
    price: 4200,
    originalPrice: 5500,
    location: "Chail, Kufri",
    description: "Quick escape to serene Chail with world's highest cricket ground and historic palace. Perfect for budget travelers seeking peace.",
    shortDescription: "Quick budget trip to Chail with palace visit and cricket ground.",
    highlights: [
      "Chail Palace Visit",
      "World's Highest Cricket Ground",
      "Kali Ka Tibba Temple",
      "Deodar Forest Walk",
      "Local Dhaba Meals",
      "Sunset View Point"
    ],
    inclusions: [
      "1 night budget guesthouse",
      "Breakfast",
      "Shared taxi from Shimla",
      "Basic guidance"
    ],
    exclusions: [
      "All meals except breakfast",
      "Palace entry fee",
      "Personal expenses",
      "Tips"
    ],
    itinerary: [
      {
        day: 1,
        title: "Shimla to Chail",
        description: "Morning shared taxi to Chail. Palace visit and cricket ground. Evening temple visit.",
        tags: ["Transfer", "Sightseeing"]
      },
      {
        day: 2,
        title: "Forest Walk & Return",
        description: "Morning forest walk. Breakfast. Return to Shimla by noon.",
        tags: ["Nature", "Transfer"]
      }
    ],
    bestTime: "March to June",
    groupSize: "Individual or Group",
    image: bud2,
    reviews: generateReviews(11, "Budget", ["chail", "palace", "cricket ground"])
  },
  {
    id: 12,
    title: "Hill Station Hopper Budget",
    category: "Budget",
    rating: 4.0,
    duration: "5 Days / 4 Nights",
    price: 9500,
    originalPrice: 11900,
    location: "Shimla, Kufri, Chail, Naldehra",
    description: "Multi-destination budget package covering four hill stations. Group tour format with shared transport and basic but clean accommodations.",
    shortDescription: "Multi-destination budget tour covering Shimla, Kufri, Chail, and Naldehra.",
    highlights: [
      "Four Destinations",
      "Group Tour Format",
      "Shared Transportation",
      "Basic Clean Hotels",
      "All Major Viewpoints",
      "Local Guide"
    ],
    inclusions: [
      "4 nights budget hotels",
      "Daily breakfast",
      "Shared vehicle",
      "Group coordinator",
      "Standard sightseeing"
    ],
    exclusions: [
      "Lunch and dinner",
      "All entry fees",
      "Personal expenses",
      "Optional activities"
    ],
    itinerary: [
      {
        day: 1,
        title: "Shimla",
        description: "Arrival and Shimla local sightseeing.",
        tags: ["Arrival", "Sightseeing"]
      },
      {
        day: 2,
        title: "Kufri",
        description: "Full day Kufri visit. Snow activities optional.",
        tags: ["Kufri", "Activities"]
      },
      {
        day: 3,
        title: "Chail",
        description: "Transfer to Chail. Palace and cricket ground.",
        tags: ["Transfer", "Sightseeing"]
      },
      {
        day: 4,
        title: "Naldehra",
        description: "Naldehra visit. Golf course viewing. Return to Shimla.",
        tags: ["Naldehra", "Return"]
      },
      {
        day: 5,
        title: "Departure",
        description: "Check-out and transfer.",
        tags: ["Departure"]
      }
    ],
    bestTime: "April to November",
    groupSize: "Group Tour (6-12 people)",
    image: bud3,
    reviews: generateReviews(12, "Budget", ["multi-destination", "group tour", "shared"])
  },
  {
    id: 13,
    title: "Student Special Shimla",
    category: "Budget",
    rating: 4.3,
    duration: "4 Days / 3 Nights",
    price: 7800,
    originalPrice: 9500,
    location: "Shimla, Mashobra",
    description: "Specially designed for college groups and young travelers. Dormitory-style accommodation, group activities, and adventure at unbeatable prices.",
    shortDescription: "Student-friendly package with dorm stays and group activities.",
    highlights: [
      "Dormitory Accommodation",
      "Group Bonfire Nights",
      "Trekking Challenge",
      "Photography Walks",
      "Cafe Hopping Guide",
      "Group Discounts"
    ],
    inclusions: [
      "3 nights dormitory (separate for male/female)",
      "Breakfast and dinner",
      "Group coordinator",
      "Trekking guide",
      "Bonfire arrangement"
    ],
    exclusions: [
      "Travel to Shimla",
      "Lunch",
      "Personal expenses",
      "Alcohol"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Ice Breaking",
        description: "Check-in. Evening group introduction and bonfire.",
        tags: ["Arrival", "Group Activity"]
      },
      {
        day: 2,
        title: "Trekking Day",
        description: "Full day trek to nearby peak. Photography sessions.",
        tags: ["Trekking", "Photography"]
      },
      {
        day: 3,
        title: "Shimla Exploration",
        description: "Heritage walk and cafe hopping. Evening group dinner.",
        tags: ["Sightseeing", "Social"]
      },
      {
        day: 4,
        title: "Departure",
        description: "Check-out and group photo session.",
        tags: ["Departure"]
      }
    ],
    bestTime: "Year round",
    groupSize: "Groups of 6+ students",
    image: bud4,
    reviews: generateReviews(13, "Budget", ["students", "dormitory", "group activities"])
  },

  /* ==========================================================
     HONEYMOON PACKAGES (5 packages) - Realistic pricing: ₹18,000-42,000
     ==========================================================*/
  {
    id: 14,
    title: "Romantic Shimla Honeymoon Special",
    category: "Honeymoon",
    rating: 4.6,
    duration: "5 Days / 4 Nights",
    price: 24500,
    originalPrice: 29900,
    location: "Shimla, Mashobra, Kufri",
    description: "Intimate honeymoon package featuring candlelight dinners, couple spa treatments, and romantic private excursions. Stay in specially selected couple-friendly resorts.",
    shortDescription: "Intimate honeymoon with candlelight dinners, spa, and romantic locations.",
    highlights: [
      "Private Cottage with Valley View",
      "Candlelight Dinner (2 nights)",
      "Couple Spa Session (60 min)",
      "Private Kufri Excursion",
      "Flower Bed Decoration",
      "Honeymoon Cake & Wine"
    ],
    inclusions: [
      "4 nights romantic resort",
      "Breakfast and dinner",
      "Private cab for sightseeing",
      "Spa session for couple",
      "Special honeymoon amenities",
      "24/7 concierge"
    ],
    exclusions: [
      "Lunch",
      "Personal expenses",
      "Optional activities",
      "Tips"
    ],
    itinerary: [
      {
        day: 1,
        title: "Romantic Arrival",
        description: "Private transfer with flowers. Check-in to valley view room. Evening candlelight dinner.",
        tags: ["Transfer", "Romance", "Dinner"]
      },
      {
        day: 2,
        title: "Shimla Romance",
        description: "Late breakfast. Couple photoshoot at Ridge. Evening spa session.",
        tags: ["Relaxation", "Spa", "Photoshoot"]
      },
      {
        day: 3,
        title: "Kufri Private Tour",
        description: "Private excursion to Kufri. Horse riding together. Snow activities. Romantic lunch.",
        tags: ["Excursion", "Activities", "Lunch"]
      },
      {
        day: 4,
        title: "Leisure & Love",
        description: "Day at leisure. Optional Mashobra visit. Farewell candlelight dinner.",
        tags: ["Leisure", "Romance", "Dinner"]
      },
      {
        day: 5,
        title: "Sweet Departure",
        description: "Breakfast. Gift hamper. Transfer to airport/station.",
        tags: ["Transfer", "Gift"]
      }
    ],
    bestTime: "March to June, September to December",
    groupSize: "Couple",
    image: rom1,
    reviews: generateReviews(14, "Honeymoon", ["romantic", "spa", "private"])
  },
  {
    id: 15,
    title: "Mashobra Honeymoon Hideaway",
    category: "Honeymoon",
    rating: 4.5,
    duration: "4 Days / 3 Nights",
    price: 21500,
    originalPrice: 25900,
    location: "Mashobra, Naldehra",
    description: "Secluded romantic retreat in peaceful Mashobra surrounded by apple orchards and cedar forests. Perfect privacy for newlyweds.",
    shortDescription: "Secluded retreat in Mashobra with apple orchards and forest trails.",
    highlights: [
      "Private Villa with Fireplace",
      "Apple Orchard Walks",
      "Private Forest Trails",
      "Bonfire with Live Music",
      "Stargazing Session",
      "Couple Yoga Morning"
    ],
    inclusions: [
      "3 nights private villa",
      "All meals (breakfast, lunch, dinner)",
      "Private butler service",
      "Bonfire with music",
      "Yoga instructor",
      "Airport transfers"
    ],
    exclusions: [
      "Alcoholic beverages",
      "Spa treatments beyond included",
      "Personal shopping",
      "Tips"
    ],
    itinerary: [
      {
        day: 1,
        title: "Secluded Arrival",
        description: "Private transfer to Mashobra. Villa check-in. Evening orchard walk and bonfire.",
        tags: ["Transfer", "Nature", "Bonfire"]
      },
      {
        day: 2,
        title: "Forest & Romance",
        description: "Morning couple yoga. Private forest trail. Evening stargazing with telescope.",
        tags: ["Yoga", "Nature", "Stargazing"]
      },
      {
        day: 3,
        title: "Naldehra Excursion",
        description: "Day trip to Naldehra. Golf course visit. Riverside picnic. Private dinner.",
        tags: ["Excursion", "Picnic", "Dinner"]
      },
      {
        day: 4,
        title: "Departure",
        description: "Leisurely breakfast. Check-out and transfer.",
        tags: ["Transfer"]
      }
    ],
    bestTime: "April to November",
    groupSize: "Couple",
    image: rom3,
    reviews: generateReviews(15, "Honeymoon", ["secluded", "villa", "orchards"])
  },
  {
    id: 16,
    title: "Shimla-Manali Honeymoon Bliss",
    category: "Honeymoon",
    rating: 4.7,
    duration: "7 Days / 6 Nights",
    price: 32500,
    originalPrice: 38900,
    location: "Shimla, Manali, Solang Valley",
    description: "Extended honeymoon covering romantic spots in both Shimla and Manali. Luxurious stays, private excursions, and unforgettable memories.",
    shortDescription: "Extended 7-day honeymoon covering Shimla and Manali with luxury stays.",
    highlights: [
      "Luxury Hotels Both Cities",
      "Couple Spa (2 sessions)",
      "Private Solang Valley Tour",
      "Rohtang Pass Visit (seasonal)",
      "Professional Couple Photoshoot",
      "Romantic Dinners (3 nights)"
    ],
    inclusions: [
      "6 nights luxury hotels",
      "Breakfast and dinner",
      "Private cab entire tour",
      "2 spa sessions",
      "Photoshoot (2 hours)",
      "All sightseeing"
    ],
    exclusions: [
      "Lunch",
      "Rohtang permit (if applicable)",
      "Personal expenses",
      "Adventure activities"
    ],
    itinerary: [
      {
        day: 1,
        title: "Shimla Arrival",
        description: "Arrive in Shimla. Check-in. Evening Mall Road walk.",
        tags: ["Arrival", "Leisure"]
      },
      {
        day: 2,
        title: "Shimla Romance",
        description: "Kufri excursion. Spa session. Candlelight dinner.",
        tags: ["Excursion", "Spa", "Dinner"]
      },
      {
        day: 3,
        title: "To Manali",
        description: "Scenic drive to Manali. En route Kullu visit. Check-in at Manali resort.",
        tags: ["Transfer", "Scenic"]
      },
      {
        day: 4,
        title: "Solang Valley",
        description: "Solang Valley visit. Optional paragliding. Romantic lunch.",
        tags: ["Adventure", "Romance"]
      },
      {
        day: 5,
        title: "Manali Local",
        description: "Hadimba Temple, Old Manali. Photoshoot. Spa session.",
        tags: ["Sightseeing", "Photoshoot", "Spa"]
      },
      {
        day: 6,
        title: "Rohtang or Leisure",
        description: "Rohtang Pass visit (May-Oct) or leisure day. Farewell dinner.",
        tags: ["Excursion", "Dinner"]
      },
      {
        day: 7,
        title: "Departure",
        description: "Check-out. Transfer to Kullu airport or bus stand.",
        tags: ["Transfer"]
      }
    ],
    bestTime: "March to June, September to December",
    groupSize: "Couple",
    image: rom2,
    reviews: generateReviews(16, "Honeymoon", ["luxury", "photoshoot", "two cities"])
  },
  {
    id: 17,
    title: "Luxury Honeymoon Suite Experience",
    category: "Honeymoon",
    rating: 4.8,
    duration: "3 Days / 2 Nights",
    price: 18500,
    originalPrice: 22500,
    location: "Shimla (Luxury Hotel)",
    description: "Short but ultra-luxurious honeymoon in premium suite with Jacuzzi, champagne welcome, and 24/7 room service. Perfect for quick romantic escapes.",
    shortDescription: "Ultra-luxury short honeymoon with Jacuzzi suite and champagne welcome.",
    highlights: [
      "Jacuzzi Suite with Mountain View",
      "Champagne Welcome",
      "24/7 In-room Dining",
      "Couple Massage",
      "Private Balcony Dining",
      "Luxury Transfers"
    ],
    inclusions: [
      "2 nights luxury suite",
      "All meals (in-room or restaurant)",
      "Airport transfers (luxury car)",
      "Champagne and chocolates",
      "Couple massage",
      "Late check-out"
    ],
    exclusions: [
      "Spa beyond massage",
      "Alcoholic beverages beyond champagne",
      "Personal shopping",
      "Tips"
    ],
    itinerary: [
      {
        day: 1,
        title: "Luxury Arrival",
        description: "Luxury car pick-up. Champagne welcome. Suite check-in. Private balcony dinner.",
        tags: ["Transfer", "Luxury", "Dinner"]
      },
      {
        day: 2,
        title: "Pampering Day",
        description: "Late breakfast. Couple massage. Afternoon Shimla sightseeing. Room service dinner.",
        tags: ["Spa", "Sightseeing", "Relaxation"]
      },
      {
        day: 3,
        title: "Departure",
        description: "Breakfast in bed. Late check-out. Luxury transfer to airport.",
        tags: ["Transfer", "Luxury"]
      }
    ],
    bestTime: "Year round",
    groupSize: "Couple",
    image: rom4,
    reviews: generateReviews(17, "Honeymoon", ["luxury suite", "jacuzzi", "champagne"])
  },
  {
    id: 18,
    title: "Apple Orchard Honeymoon",
    category: "Honeymoon",
    rating: 4.4,
    duration: "4 Days / 3 Nights",
    price: 19800,
    originalPrice: 23900,
    location: "Kotkhai, Apple Belt",
    description: "Unique honeymoon in Himachal's apple country. Stay in heritage orchard estate, fruit picking, and romantic walks through blooming apple gardens.",
    shortDescription: "Unique stay in apple orchard estate with fruit picking experiences.",
    highlights: [
      "Heritage Orchard Estate Stay",
      "Apple/Stone Fruit Picking",
      "Orchard-to-Table Dining",
      "Private Nature Trails",
      "Cooking Class (Local Cuisine)",
      "Sunset Viewpoint Picnic"
    ],
    inclusions: [
      "3 nights orchard estate",
      "All organic meals",
      "Fruit picking activity",
      "Cooking session",
      "Nature guide",
      "Transfers"
    ],
    exclusions: [
      "Alcoholic beverages",
      "Personal shopping",
      "Spa treatments",
      "Tips"
    ],
    itinerary: [
      {
        day: 1,
        title: "Orchard Welcome",
        description: "Transfer to Kotkhai. Estate check-in. Orchard tour. Welcome dinner with estate wine.",
        tags: ["Transfer", "Orchard", "Dinner"]
      },
      {
        day: 2,
        title: "Fruit Picking & Cooking",
        description: "Morning fruit picking. Afternoon cooking class. Evening orchard walk.",
        tags: ["Activity", "Cooking", "Nature"]
      },
      {
        day: 3,
        title: "Nature & Romance",
        description: "Trek to sunset point. Picnic lunch. Private estate dinner.",
        tags: ["Trekking", "Picnic", "Dinner"]
      },
      {
        day: 4,
        title: "Departure",
        description: "Breakfast with fresh fruits. Check-out and transfer.",
        tags: ["Transfer"]
      }
    ],
    bestTime: "April to October (fruit seasons vary)",
    groupSize: "Couple",
    image: rom5,
    reviews: generateReviews(18, "Honeymoon", ["orchard", "fruit picking", "unique"])
  },

  /* ==========================================================
     LUXURY PACKAGES (5 packages) - Realistic pricing: ₹45,000-95,000
     ==========================================================*/
  {
    id: 19,
    title: "Oberoi Wildflower Hall Heritage",
    category: "Luxury",
    rating: 4.9,
    duration: "5 Days / 4 Nights",
    price: 85000,
    originalPrice: 105000,
    location: "Mashobra (Oberoi Wildflower Hall)",
    description: "Experience ultimate luxury at the iconic Oberoi Wildflower Hall. Former residence of Lord Kitchener, now a 5-star heritage resort with panoramic Himalayan views.",
    shortDescription: "Ultimate luxury at Oberoi Wildflower Hall with spa and fine dining.",
    highlights: [
      "Oberoi Wildflower Hall Stay",
      "Premier Valley View Room",
      "Oberoi Spa (2 treatments)",
      "Fine Dining at Lutyens",
      "Private Heritage Walk",
      "Butler Service"
    ],
    inclusions: [
      "4 nights Wildflower Hall",
      "All meals (breakfast, lunch, dinner)",
      "Airport transfers (luxury SUV)",
      "2 spa treatments per person",
      "Private guided tours",
      "All taxes and service charges"
    ],
    exclusions: [
      "Alcoholic beverages",
      "Laundry",
      "Telephone calls",
      "Tips"
    ],
    itinerary: [
      {
        day: 1,
        title: "Royal Arrival",
        description: "Luxury SUV pick-up from Shimla airport. Traditional welcome. Check-in to Premier Valley View room. Evening high tea.",
        tags: ["Transfer", "Luxury", "Welcome"]
      },
      {
        day: 2,
        title: "Heritage & Wellness",
        description: "Morning heritage walk. Afternoon Oberoi Spa. Evening fine dining at Lutyens.",
        tags: ["Heritage", "Spa", "Dining"]
      },
      {
        day: 3,
        title: "Shimla Exploration",
        description: "Private guided tour of Shimla. Viceregal Lodge exclusive tour. Return for spa and dinner.",
        tags: ["Sightseeing", "Exclusive", "Spa"]
      },
      {
        day: 4,
        title: "Resort Leisure",
        description: "Day at leisure. Indoor pool, billiards, nature trails. Private balcony dinner.",
        tags: ["Leisure", "Activities", "Dining"]
      },
      {
        day: 5,
        title: "Departure",
        description: "Breakfast. Late check-out. Luxury transfer to airport.",
        tags: ["Transfer", "Luxury"]
      }
    ],
    bestTime: "Year round",
    groupSize: "2-4 people",
    image: lux1,
    reviews: generateReviews(19, "Luxury", ["oberoi", "heritage", "5-star"])
  },
  {
    id: 20,
    title: "Royal Luxury Shimla Experience",
    category: "Luxury",
    rating: 4.7,
    duration: "4 Days / 3 Nights",
    price: 52000,
    originalPrice: 62000,
    location: "Shimla, Chail Palace",
    description: "Royal treatment with stays at heritage properties including Chail Palace. Exclusive access, private guides, and luxury transportation throughout.",
    shortDescription: "Royal heritage stays with exclusive access and private guides.",
    highlights: [
      "Chail Palace Heritage Stay",
      "Private Guide Throughout",
      "Luxury SUV Transportation",
      "Exclusive Palace Access",
      "Royal Dining Experience",
      "Private Cultural Show"
    ],
    inclusions: [
      "3 nights heritage hotels",
      "All meals",
      "Luxury SUV with driver",
      "Expert historian guide",
      "Exclusive access fees",
      "All taxes"
    ],
    exclusions: [
      "Spa treatments",
      "Alcoholic beverages",
      "Personal expenses",
      "Tips"
    ],
    itinerary: [
      {
        day: 1,
        title: "Royal Welcome",
        description: "Luxury SUV pick-up. Check-in at heritage property. Evening cultural show.",
        tags: ["Transfer", "Culture", "Welcome"]
      },
      {
        day: 2,
        title: "Shimla Heritage",
        description: "Full day heritage tour with historian. Exclusive Viceregal Lodge access.",
        tags: ["Heritage", "Exclusive"]
      },
      {
        day: 3,
        title: "Chail Palace",
        description: "Transfer to Chail Palace. Palace tour. Royal dining experience.",
        tags: ["Transfer", "Palace", "Dining"]
      },
      {
        day: 4,
        title: "Departure",
        description: "Breakfast. Check-out. Luxury transfer.",
        tags: ["Transfer"]
      }
    ],
    bestTime: "Year round",
    groupSize: "2-4 people",
    image: lux3,
    reviews: generateReviews(20, "Luxury", ["royal", "palace", "heritage"])
  },
  {
    id: 21,
    title: "Maharaja Luxury Trail",
    category: "Luxury",
    rating: 4.8,
    duration: "6 Days / 5 Nights",
    price: 78000,
    originalPrice: 95000,
    location: "Shimla, Sarahan, Sangla",
    description: "Royal travel experience through Kinnaur valley with palace stays, vintage car transfers, and royal service standards reminiscent of princely states.",
    shortDescription: "Royal trail through Kinnaur with palace stays and vintage cars.",
    highlights: [
      "Palace Hotels (Shimla & Sarahan)",
      "Vintage Car Transfers",
      "Royal Butler Service",
      "Private Kitchen Chef",
      "Exclusive Temple Access",
      "Kinnaur Valley Tour"
    ],
    inclusions: [
      "5 nights palace hotels",
      "All meals (customized menu)",
      "Vintage car with driver",
      "Personal butler",
      "Private chef",
      "All permits and fees"
    ],
    exclusions: [
      "Alcoholic beverages",
      "Personal shopping",
      "Helicopter transfers",
      "Tips"
    ],
    itinerary: [
      {
        day: 1,
        title: "Royal Arrival Shimla",
        description: "Vintage car pick-up. Palace check-in. Royal welcome dinner.",
        tags: ["Transfer", "Royal", "Dinner"]
      },
      {
        day: 2,
        title: "Shimla Royal",
        description: "Heritage tour in vintage car. Evening private dinner.",
        tags: ["Heritage", "Royal"]
      },
      {
        day: 3,
        title: "To Sarahan",
        description: "Scenic drive to Sarahan in vintage car. Bhimakali Temple exclusive visit.",
        tags: ["Transfer", "Temple", "Scenic"]
      },
      {
        day: 4,
        title: "Sangla Valley",
        description: "Day trip to Sangla. Kamru Fort visit. Return to Sarahan.",
        tags: ["Excursion", "Fort", "Valley"]
      },
      {
        day: 5,
        title: "Return to Shimla",
        description: "Drive back to Shimla. Leisure evening at palace.",
        tags: ["Transfer", "Leisure"]
      },
      {
        day: 6,
        title: "Departure",
        description: "Breakfast. Vintage car transfer to airport.",
        tags: ["Transfer", "Royal"]
      }
    ],
    bestTime: "April to June, September to October",
    groupSize: "2-4 people",
    image: lux4,
    reviews: generateReviews(21, "Luxury", ["vintage car", "palace", "kinnaur"])
  },
  {
    id: 22,
    title: "Premium Luxury Escape",
    category: "Luxury",
    rating: 4.8,
    duration: "5 Days / 4 Nights",
    price: 65000,
    originalPrice: 79000,
    location: "Shimla, Mashobra",
    description: "Ultra-premium luxury vacation in private villa with personal staff. Complete privacy with world-class amenities and personalized service.",
    shortDescription: "Ultra-premium private villa with personal staff and butler service.",
    highlights: [
      "Private Luxury Villa",
      "Personal Butler 24/7",
      "Private Chef & Kitchen",
      "Luxury Car & Driver",
      "In-villa Spa Setup",
      "Helicopter Transfer (Optional)"
    ],
    inclusions: [
      "4 nights private villa",
      "All meals (customized)",
      "Personal staff (butler, chef, driver)",
      "Luxury SUV",
      "In-villa spa services",
      "All taxes"
    ],
    exclusions: [
      "Helicopter transfer",
      "Imported alcoholic beverages",
      "Personal shopping",
      "Staff tips"
    ],
    itinerary: [
      {
        day: 1,
        title: "Private Arrival",
        description: "Luxury transfer to private villa. Staff introduction. Welcome dinner prepared by private chef.",
        tags: ["Transfer", "Luxury", "Dinner"]
      },
      {
        day: 2,
        title: "Villa Leisure",
        description: "Day at villa. Spa session. Private nature trail. Poolside lunch.",
        tags: ["Leisure", "Spa", "Nature"]
      },
      {
        day: 3,
        title: "Shimla Exclusive",
        description: "Private guided Shimla tour. Shopping with personal assistant. Return to villa.",
        tags: ["Sightseeing", "Shopping", "Luxury"]
      },
      {
        day: 4,
        title: "Wellness Day",
        description: "Full day wellness program. Yoga, spa, meditation. Private dinner.",
        tags: ["Wellness", "Spa", "Dinner"]
      },
      {
        day: 5,
        title: "Departure",
        description: "Breakfast. Staff farewell. Luxury transfer.",
        tags: ["Transfer", "Luxury"]
      }
    ],
    bestTime: "Year round",
    groupSize: "2-6 people",
    image: lux5,
    reviews: generateReviews(22, "Luxury", ["private villa", "butler", "exclusive"])
  },
  {
    id: 23,
    title: "Luxury Wellness Retreat",
    category: "Luxury",
    rating: 4.9,
    duration: "4 Days / 3 Nights",
    price: 58000,
    originalPrice: 72000,
    location: "Shimla, Kasauli (Premium Wellness Resort)",
    description: "Holistic luxury wellness retreat combining Ayurveda, yoga, and spa treatments. Detox and rejuvenate in the Himalayan foothills.",
    shortDescription: "Holistic wellness retreat with Ayurveda, yoga, and luxury spa.",
    highlights: [
      "Ayurvedic Consultation",
      "Daily Yoga & Meditation",
      "Detox Cuisine Program",
      "Luxury Spa Treatments",
      "Himalayan Salt Therapy",
      "Personal Wellness Coach"
    ],
    inclusions: [
      "3 nights wellness suite",
      "All detox meals",
      "Ayurvedic doctor consultation",
      "Daily yoga and meditation",
      "4 spa treatments",
      "Wellness workshops"
    ],
    exclusions: [
      "Medical treatments",
      "Personal shopping",
      "Alcoholic beverages",
      "Tips"
    ],
    itinerary: [
      {
        day: 1,
        title: "Wellness Arrival",
        description: "Transfer to resort. Ayurvedic consultation. Welcome dinner.",
        tags: ["Transfer", "Wellness", "Consultation"]
      },
      {
        day: 2,
        title: "Detox Begins",
        description: "Morning yoga. Detox breakfast. Spa treatment. Wellness workshop.",
        tags: ["Yoga", "Spa", "Workshop"]
      },
      {
        day: 3,
        title: "Deep Healing",
        description: "Meditation session. Ayurvedic treatment. Nature walk. Special dinner.",
        tags: ["Meditation", "Ayurveda", "Nature"]
      },
      {
        day: 4,
        title: "Departure",
        description: "Final yoga. Wellness kit gift. Check-out and transfer.",
        tags: ["Transfer", "Gift"]
      }
    ],
    bestTime: "Year round",
    groupSize: "Individual or Couple",
    image: lux2,
    reviews: generateReviews(23, "Luxury", ["wellness", "ayurveda", "detox"])
  },

  /* ==========================================================
     WEEKEND PACKAGES (4 packages) - Realistic pricing: ₹5,500-12,000
     ==========================================================*/
  {
    id: 24,
    title: "Shimla Weekend Express",
    category: "Weekend",
    rating: 4.3,
    duration: "2 Days / 1 Night",
    price: 6500,
    originalPrice: 7800,
    location: "Shimla",
    description: "Quick weekend escape from Delhi/Chandigarh. Covers Mall Road, Ridge, and local cafes. Perfect for short breaks.",
    shortDescription: "Quick weekend escape covering Mall Road, Ridge, and local cafes.",
    highlights: [
      "Mall Road Evening Walk",
      "Ridge Road Panoramic Views",
      "Lakkar Bazaar Shopping",
      "Cafe Hopping (3 cafes)",
      "Christ Church Visit",
      "Sunset at Scandal Point"
    ],
    inclusions: [
      "1 night budget hotel",
      "Breakfast",
      "Transfer from bus stand",
      "Walking tour guide",
      "Cafe recommendations"
    ],
    exclusions: [
      "Travel to Shimla",
      "Lunch and dinner",
      "Shopping",
      "Entry fees"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Exploration",
        description: "Morning arrival. Check-in. Afternoon Mall Road and Ridge. Evening cafe hopping.",
        tags: ["Arrival", "Sightseeing", "Food"]
      },
      {
        day: 2,
        title: "Local & Departure",
        description: "Morning Jakhu Temple or local market. Check-out by 12 PM.",
        tags: ["Sightseeing", "Departure"]
      }
    ],
    bestTime: "Year round",
    groupSize: "Individual or Group",
    image: week1,
    reviews: generateReviews(24, "Weekend", ["quick", "cafes", "shopping"])
  },
  {
    id: 25,
    title: "Narkanda Weekend Ski Getaway",
    category: "Weekend",
    rating: 4.5,
    duration: "2 Days / 1 Night",
    price: 7200,
    originalPrice: 8900,
    location: "Narkanda",
    description: "Winter weekend trip to Narkanda for skiing and snow activities. Stay in cozy mountain lodge with fireplace.",
    shortDescription: "Winter weekend with skiing, apple orchards, and mountain views.",
    highlights: [
      "Skiing at Hatu Peak",
      "Snow Activities",
      "Apple Orchard Visit",
      "Hatu Peak Temple",
      "Cozy Lodge Stay",
      "Local Himachali Dinner"
    ],
    inclusions: [
      "1 night mountain lodge",
      "Breakfast and dinner",
      "Skiing equipment",
      "Basic instruction",
      "Local transfers"
    ],
    exclusions: [
      "Travel to Narkanda",
      "Lunch",
      "Advanced ski lessons",
      "Personal expenses"
    ],
    itinerary: [
      {
        day: 1,
        title: "Narkanda Arrival",
        description: "Transfer to Narkanda. Check-in. Afternoon skiing. Evening local dinner.",
        tags: ["Transfer", "Skiing", "Dinner"]
      },
      {
        day: 2,
        title: "Hatu Peak & Return",
        description: "Early morning Hatu Peak visit. Breakfast. Check-out and return.",
        tags: ["Sightseeing", "Transfer"]
      }
    ],
    bestTime: "December to March",
    groupSize: "2-6 people",
    image: week2,
    reviews: generateReviews(25, "Weekend", ["skiing", "narkanda", "winter"])
  },
  {
    id: 26,
    title: "Quick Shimla Highlights",
    category: "Weekend",
    rating: 4.2,
    duration: "2 Days / 1 Night",
    price: 5800,
    originalPrice: 7200,
    location: "Shimla, Kufri",
    description: "Fast-paced weekend covering major Shimla attractions including quick Kufri visit. Ideal for time-constrained travelers.",
    shortDescription: "Fast-paced weekend covering major Shimla attractions and Kufri.",
    highlights: [
      "Kufri Quick Visit",
      "Mall Road Shopping",
      "Ridge Road",
      "Jakhu Temple",
      "Local Market",
      "Photography Spots"
    ],
    inclusions: [
      "1 night hotel",
      "Breakfast",
      "Shared transfers",
      "Sightseeing"
    ],
    exclusions: [
      "Travel to Shimla",
      "Lunch, dinner",
      "Entry fees",
      "Kufri activities"
    ],
    itinerary: [
      {
        day: 1,
        title: "Shimla & Kufri",
        description: "Arrival. Quick Kufri visit. Return to Shimla. Mall Road evening.",
        tags: ["Arrival", "Kufri", "Sightseeing"]
      },
      {
        day: 2,
        title: "Local & Out",
        description: "Morning Jakhu Temple and market. Check-out.",
        tags: ["Sightseeing", "Departure"]
      }
    ],
    bestTime: "Year round",
    groupSize: "Individual or Group",
    image: week3,
    reviews: generateReviews(26, "Weekend", ["quick", "highlights", "kufri"])
  },
  {
    id: 27,
    title: "Adventure Weekend Blast",
    category: "Weekend",
    rating: 4.4,
    duration: "3 Days / 2 Nights",
    price: 11200,
    originalPrice: 13900,
    location: "Shimla, Tattapani",
    description: "Action-packed weekend with trekking, river rafting at Tattapani, and camping. Perfect for adventure seekers short on time.",
    shortDescription: "Adventure-packed weekend with trekking, rafting, and riverside camping.",
    highlights: [
      "Day Trek (8km)",
      "River Rafting Tattapani",
      "Riverside Camping",
      "Bonfire Night",
      "Hot Springs Dip",
      "Cliff Jumping (optional)"
    ],
    inclusions: [
      "2 nights (1 hotel, 1 camping)",
      "All meals",
      "Trekking guide",
      "Rafting equipment",
      "Camping gear",
      "Safety equipment"
    ],
    exclusions: [
      "Travel to start point",
      "Personal insurance",
      "Photography",
      "Tips"
    ],
    itinerary: [
      {
        day: 1,
        title: "Trek Day",
        description: "Morning arrival. Trek to campsite. Evening bonfire and dinner.",
        tags: ["Trekking", "Camping", "Dinner"]
      },
      {
        day: 2,
        title: "Rafting Day",
        description: "Morning rafting session. Hot springs. Return to hotel.",
        tags: ["Rafting", "Hot Springs", "Hotel"]
      },
      {
        day: 3,
        title: "Departure",
        description: "Breakfast. Optional cliff jumping. Check-out and transfer.",
        tags: ["Breakfast", "Transfer"]
      }
    ],
    bestTime: "April to June, September to November",
    groupSize: "4-8 people",
    image: week4,
    reviews: generateReviews(27, "Weekend", ["adventure", "rafting", "camping"])
  },

  /* ==========================================================
     SPIRITUAL PACKAGES (4 packages) - Realistic pricing: ₹7,500-18,000
     ==========================================================*/
  {
    id: 28,
    title: "Shimla Spiritual Journey",
    category: "Spiritual",
    rating: 4.4,
    duration: "4 Days / 3 Nights",
    price: 11200,
    originalPrice: 13500,
    location: "Shimla, Tara Devi, Jakhu",
    description: "Visit ancient temples and monasteries in and around Shimla. Includes meditation sessions and spiritual discourses for inner peace.",
    shortDescription: "Temple tour with meditation sessions and spiritual discourses.",
    highlights: [
      "Jakhu Temple (Hanuman)",
      "Tara Devi Temple",
      "Sankat Mochan Temple",
      "Tibetan Buddhist Monastery",
      "Morning Meditation Sessions",
      "Ganga Aarti Experience"
    ],
    inclusions: [
      "3 nights dharamshala/guesthouse",
      "Sattvic meals (breakfast, dinner)",
      "Temple transfers",
      "Meditation instructor",
      "Spiritual guide",
      "Prayer materials"
    ],
    exclusions: [
      "Travel to Shimla",
      "Donations at temples",
      "Personal shopping",
      "Special pujas"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Orientation",
        description: "Arrive and check-in. Evening orientation and meditation intro.",
        tags: ["Arrival", "Meditation"]
      },
      {
        day: 2,
        title: "Jakhu & Sankat Mochan",
        description: "Early morning Jakhu Temple. Sankat Mochan visit. Evening meditation.",
        tags: ["Temple", "Meditation"]
      },
      {
        day: 3,
        title: "Tara Devi & Monastery",
        description: "Tara Devi Temple morning. Tibetan Monastery afternoon. Evening aarti.",
        tags: ["Temple", "Monastery", "Aarti"]
      },
      {
        day: 4,
        title: "Departure",
        description: "Morning meditation. Check-out and transfer.",
        tags: ["Meditation", "Transfer"]
      }
    ],
    bestTime: "Year round",
    groupSize: "Individual or Group",
    image: spi1,
    reviews: generateReviews(28, "Spiritual", ["temples", "meditation", "peace"])
  },
  {
    id: 29,
    title: "Kamru Fort Spiritual Trek",
    category: "Spiritual",
    rating: 4.6,
    duration: "3 Days / 2 Nights",
    price: 8900,
    originalPrice: 10800,
    location: "Sangla Valley, Kamru Fort",
    description: "Ancient fort visit with spiritual significance in Kinnaur. Trek through beautiful valley with monastery stays and cultural immersion.",
    shortDescription: "Ancient fort trek with spiritual significance and valley views.",
    highlights: [
      "Kamru Fort Ancient Temple",
      "Bering Nag Temple",
      "Sangla Valley Trek",
      "Monastery Stay Experience",
      "Local Cultural Interaction",
      "Traditional Kinnauri Meals"
    ],
    inclusions: [
      "2 nights monastery guesthouse",
      "Traditional meals",
      "Trek guide",
      "Fort entry",
      "Cultural program",
      "Local transfers"
    ],
    exclusions: [
      "Travel to Sangla",
      "Personal trekking gear",
      "Donations",
      "Tips"
    ],
    itinerary: [
      {
        day: 1,
        title: "Sangla Arrival",
        description: "Transfer to Sangla. Monastery check-in. Evening prayer session.",
        tags: ["Transfer", "Prayer"]
      },
      {
        day: 2,
        title: "Kamru Fort Trek",
        description: "Trek to Kamru Fort. Temple visit. Return. Evening cultural program.",
        tags: ["Trekking", "Temple", "Culture"]
      },
      {
        day: 3,
        title: "Departure",
        description: "Morning meditation. Breakfast. Transfer back.",
        tags: ["Meditation", "Transfer"]
      }
    ],
    bestTime: "April to October",
    groupSize: "2-8 people",
    image: spi2,
    reviews: generateReviews(29, "Spiritual", ["fort", "trek", "monastery"])
  },
  {
    id: 30,
    title: "Himalayan Spiritual Circuit",
    category: "Spiritual",
    rating: 4.5,
    duration: "6 Days / 5 Nights",
    price: 16800,
    originalPrice: 19900,
    location: "Shimla, Sarahan, Sangla, Kalpa",
    description: "Extended spiritual journey visiting major temples, monasteries, and meditation centers across Kinnaur district. Deep cultural immersion.",
    shortDescription: "Extended spiritual journey across Kinnaur with temples and meditation.",
    highlights: [
      "Bhimakali Temple (Sarahan)",
      "Chitkul Village (Last Village)",
      "Kalpa Monastery",
      "Meditation at 3000m",
      "Ancient Temple Architecture",
      "Spiritual Discourses"
    ],
    inclusions: [
      "5 nights guesthouses",
      "Sattvic meals",
      "Private vehicle",
      "Spiritual guide",
      "Meditation sessions",
      "All permits"
    ],
    exclusions: [
      "Travel to start point",
      "Temple donations",
      "Personal expenses",
      "Travel insurance"
    ],
    itinerary: [
      {
        day: 1,
        title: "Shimla to Sarahan",
        description: "Drive to Sarahan. Bhimakali Temple evening aarti. Monastery stay.",
        tags: ["Transfer", "Temple"]
      },
      {
        day: 2,
        title: "Sarahan Spiritual",
        description: "Morning temple rituals. Meditation session. Local village walk.",
        tags: ["Temple", "Meditation", "Village"]
      },
      {
        day: 3,
        title: "To Sangla",
        description: "Drive to Sangla. Kamru Fort. Evening monastery prayers.",
        tags: ["Transfer", "Fort", "Prayer"]
      },
      {
        day: 4,
        title: "Chitkul Day",
        description: "Day trip to Chitkul (India's last village). Riverside meditation.",
        tags: ["Excursion", "Meditation", "Border"]
      },
      {
        day: 5,
        title: "Kalpa & Return",
        description: "Kalpa monastery visit. Drive back towards Shimla.",
        tags: ["Monastery", "Transfer"]
      },
      {
        day: 6,
        title: "Departure",
        description: "Morning meditation. Transfer to Shimla.",
        tags: ["Meditation", "Transfer"]
      }
    ],
    bestTime: "April to October",
    groupSize: "2-6 people",
    image: spi3,
    reviews: generateReviews(30, "Spiritual", ["circuit", "kinnaur", "monasteries"])
  },
  {
    id: 31,
    title: "Yoga & Meditation Himalayan Retreat",
    category: "Spiritual",
    rating: 4.3,
    duration: "5 Days / 4 Nights",
    price: 14500,
    originalPrice: 17200,
    location: "Shimla, Shoghi",
    description: "Wellness retreat focused on yoga, meditation, and Ayurvedic practices. Detox from digital life and reconnect with nature.",
    shortDescription: "Wellness retreat with yoga, meditation, and Ayurvedic practices.",
    highlights: [
      "Daily Yoga (2 sessions)",
      "Guided Meditation",
      "Ayurvedic Consultation",
      "Digital Detox Program",
      "Nature Walks",
      "Sattvic Organic Food"
    ],
    inclusions: [
      "4 nights retreat center",
      "All organic meals",
      "Yoga instructor",
      "Ayurvedic doctor",
      "Meditation guide",
      "Nature trail guide"
    ],
    exclusions: [
      "Travel to retreat",
      "Personal yoga mats (available for rent)",
      "Spa treatments",
      "Tips"
    ],
    itinerary: [
      {
        day: 1,
        title: "Retreat Arrival",
        description: "Check-in. Digital device collection. Orientation and gentle yoga.",
        tags: ["Arrival", "Yoga", "Detox"]
      },
      {
        day: 2,
        title: "Yoga Intensive",
        description: "Morning asanas. Ayurvedic consultation. Evening meditation.",
        tags: ["Yoga", "Ayurveda", "Meditation"]
      },
      {
        day: 3,
        title: "Nature & Silence",
        description: "Silent nature walk. Meditation by stream. Evening yoga nidra.",
        tags: ["Nature", "Silence", "Yoga Nidra"]
      },
      {
        day: 4,
        title: "Deep Practice",
        description: "Full day intensive yoga. Group meditation. Sharing circle.",
        tags: ["Yoga", "Meditation", "Community"]
      },
      {
        day: 5,
        title: "Return",
        description: "Final yoga. Breakfast. Device return. Check-out.",
        tags: ["Yoga", "Departure"]
      }
    ],
    bestTime: "March to June, September to November",
    groupSize: "6-12 people",
    image: spi4,
    reviews: generateReviews(31, "Spiritual", ["yoga", "detox", "retreat"])
  },

  /* ==========================================================
     NATURE PACKAGES (4 packages) - Realistic pricing: ₹8,500-22,000
     ==========================================================*/
  {
    id: 32,
    title: "Shimla Nature Trails Expedition",
    category: "Nature",
    rating: 4.6,
    duration: "5 Days / 4 Nights",
    price: 14200,
    originalPrice: 16900,
    location: "Shimla, Glen, Chadwick Falls",
    description: "Explore Shimla's pristine forests, wildlife sanctuaries, and hidden waterfalls. Perfect for nature photographers and bird watchers.",
    shortDescription: "Explore forests, wildlife sanctuaries, and scenic nature trails.",
    highlights: [
      "Glen Forest Deep Trek",
      "Chadwick Falls (Monsoon)",
      "Himalayan Bird Watching",
      "Wildlife Sanctuary Safari",
      "Nature Photography Sessions",
      "Camping in Pine Forests"
    ],
    inclusions: [
      "4 nights (2 hotel, 2 camping)",
      "All meals",
      "Naturalist guide",
      "Birding equipment",
      "Camping gear",
      "Sanctuary permits"
    ],
    exclusions: [
      "Camera equipment",
      "Personal insurance",
      "Alcoholic beverages",
      "Tips"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Glen",
        description: "Arrive. Glen forest introductory walk. Bird watching.",
        tags: ["Arrival", "Nature", "Birding"]
      },
      {
        day: 2,
        title: "Chadwick Trek",
        description: "Trek to Chadwick Falls. Photography session. Camp setup.",
        tags: ["Trekking", "Photography", "Camping"]
      },
      {
        day: 3,
        title: "Sanctuary Day",
        description: "Full day wildlife sanctuary. Morning and evening safari.",
        tags: ["Wildlife", "Safari", "Camping"]
      },
      {
        day: 4,
        title: "Peak & Return",
        description: "Morning peak trek for sunrise. Return to hotel.",
        tags: ["Trekking", "Sunrise", "Hotel"]
      },
      {
        day: 5,
        title: "Departure",
        description: "Final bird watching. Breakfast. Transfer.",
        tags: ["Birding", "Transfer"]
      }
    ],
    bestTime: "March to June (birds), July to Sept (waterfalls)",
    groupSize: "4-8 people",
    image: nat1,
    reviews: generateReviews(32, "Nature", ["trails", "birding", "camping"])
  },
  {
    id: 33,
    title: "Tattapani Hot Springs & Nature",
    category: "Nature",
    rating: 4.4,
    duration: "3 Days / 2 Nights",
    price: 9800,
    originalPrice: 11800,
    location: "Tattapani, Shimla",
    description: "Rejuvenate at natural hot springs of Tattapani with sulfur-rich waters. Combine with river rafting and riverside camping.",
    shortDescription: "Rejuvenate at natural hot springs with river rafting options.",
    highlights: [
      "Natural Sulfur Hot Springs",
      "Sutlej River Rafting",
      "Riverside Camping",
      "Nature Walks",
      "Local Village Visit",
      "Sunset at River Bank"
    ],
    inclusions: [
      "2 nights riverside camp",
      "All meals",
      "Hot spring access",
      "Rafting equipment",
      "Camping gear",
      "Local guide"
    ],
    exclusions: [
      "Travel to Tattapani",
      "Rafting (if not included in variant)",
      "Personal expenses",
      "Tips"
    ],
    itinerary: [
      {
        day: 1,
        title: "Tattapani Arrival",
        description: "Transfer to Tattapani. Camp setup. Evening hot spring dip.",
        tags: ["Transfer", "Camping", "Hot Springs"]
      },
      {
        day: 2,
        title: "Rafting & Springs",
        description: "Morning rafting session. Afternoon hot springs. Village visit.",
        tags: ["Rafting", "Hot Springs", "Village"]
      },
      {
        day: 3,
        title: "Departure",
        description: "Morning hot spring. Breakfast. Check-out and transfer.",
        tags: ["Hot Springs", "Transfer"]
      }
    ],
    bestTime: "Year round (rafting: April-June)",
    groupSize: "2-8 people",
    image: nat2,
    reviews: generateReviews(33, "Nature", ["hot springs", "rafting", "rejuvenation"])
  },
  {
    id: 34,
    title: "Himachal Wildlife Safari",
    category: "Nature",
    rating: 4.7,
    duration: "4 Days / 3 Nights",
    price: 15800,
    originalPrice: 18900,
    location: "Shimla, Daranghati, Renuka",
    description: "Explore Himachal's wildlife sanctuaries and bird watching hotspots. Spot rare Himalayan species in their natural habitat.",
    shortDescription: "Wildlife sanctuaries and bird watching in Himalayan habitats.",
    highlights: [
      "Daranghati Sanctuary",
      "Renuka Lake (Largest Natural Lake)",
      "Himalayan Monal Spotting",
      "Leopard Tracking",
      "Bird Watching (200+ species)",
      "Nature Photography"
    ],
    inclusions: [
      "3 nights forest rest houses",
      "All meals",
      "Wildlife expert guide",
      "Safari vehicle",
      "Spotting scopes",
      "Permits"
    ],
    exclusions: [
      "Camera fees",
      "Personal equipment",
      "Travel to start point",
      "Tips"
    ],
    itinerary: [
      {
        day: 1,
        title: "Renuka Arrival",
        description: "Transfer to Renuka. Lake visit. Evening bird watching.",
        tags: ["Transfer", "Lake", "Birding"]
      },
      {
        day: 2,
        title: "Daranghati Safari",
        description: "Full day Daranghati sanctuary. Morning and evening safari.",
        tags: ["Safari", "Wildlife", "Camping"]
      },
      {
        day: 3,
        title: "Tracking Day",
        description: "Leopard tracking trek. Monal spotting. Photography session.",
        tags: ["Tracking", "Birding", "Photography"]
      },
      {
        day: 4,
        title: "Departure",
        description: "Final morning safari. Breakfast. Transfer.",
        tags: ["Safari", "Transfer"]
      }
    ],
    bestTime: "October to March (best wildlife)",
    groupSize: "4-6 people",
    image: nat3,
    reviews: generateReviews(34, "Nature", ["wildlife", "safari", "monal"])
  },
  {
    id: 35,
    title: "Himalayan Flora & Fauna Tour",
    category: "Nature",
    rating: 4.5,
    duration: "6 Days / 5 Nights",
    price: 21500,
    originalPrice: 25900,
    location: "Shimla, Kufri, Narkanda",
    description: "Educational nature exploration focusing on Himalayan biodiversity. Visit botanical gardens, orchards, and learn about medicinal plants.",
    shortDescription: "Educational tour of Himalayan biodiversity and botanical gardens.",
    highlights: [
      "Himalayan Botanical Garden",
      "Apple & Stone Fruit Orchards",
      "Medicinal Plant Trail",
      "Butterfly Park Visit",
      "Expert Botanist Guide",
      "Seed/Plant Collection"
    ],
    inclusions: [
      "5 nights hotels",
      "All meals",
      "Botanist guide",
      "Transportation",
      "Garden entries",
      "Workshop materials"
    ],
    exclusions: [
      "Personal collection tools",
      "Books and guides",
      "Travel to Shimla",
      "Tips"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Introduction",
        description: "Arrive. Botanical garden visit. Introduction to Himalayan flora.",
        tags: ["Arrival", "Botanical", "Learning"]
      },
      {
        day: 2,
        title: "Orchard Day",
        description: "Kufri orchards. Fruit identification. Tasting session.",
        tags: ["Orchard", "Tasting", "Learning"]
      },
      {
        day: 3,
        title: "Medicinal Trail",
        description: "Trek to medicinal plant areas. Learning session. Collection.",
        tags: ["Trekking", "Medicinal", "Collection"]
      },
      {
        day: 4,
        title: "Narkanda Biodiversity",
        description: "Drive to Narkanda. Biodiversity hotspot exploration.",
        tags: ["Transfer", "Biodiversity", "Exploration"]
      },
      {
        day: 5,
        title: "Butterfly & Workshop",
        description: "Butterfly park. Photography. Evening workshop on conservation.",
        tags: ["Butterfly", "Workshop", "Conservation"]
      },
      {
        day: 6,
        title: "Departure",
        description: "Final garden visit. Certificate distribution. Transfer.",
        tags: ["Certificate", "Transfer"]
      }
    ],
    bestTime: "April to October",
    groupSize: "6-12 people",
    image: nat4,
    reviews: generateReviews(35, "Nature", ["flora", "educational", "biodiversity"])
  },

  /* ==========================================================
     CORPORATE PACKAGES (4 packages) - Realistic pricing: ₹15,000-35,000
     ==========================================================*/
  {
    id: 36,
    title: "Corporate Team Outing Shimla",
    category: "Corporate",
    rating: 4.3,
    duration: "3 Days / 2 Nights",
    price: 18500,
    originalPrice: 22500,
    location: "Shimla, Mashobra",
    description: "Perfect corporate retreat with team building activities, conference facilities, and adventure elements. Customizable for team size.",
    shortDescription: "Corporate retreat with team building and conference facilities.",
    highlights: [
      "Conference Hall (Projector, AV)",
      "Team Building Activities",
      "Adventure Challenge Course",
      "Corporate Dinner & Awards",
      "Indoor Games (Pool, TT)",
      "Bonfire & Music"
    ],
    inclusions: [
      "2 nights resort (twin sharing)",
      "All meals (breakfast, lunch, dinner)",
      "Conference hall rental",
      "Team building facilitator",
      "AV equipment",
      "Transfers from Shimla"
    ],
    exclusions: [
      "Travel to Shimla",
      "Alcoholic beverages",
      "Personal expenses",
      "Spa treatments"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Conference",
        description: "Arrival and check-in. Afternoon conference session. Evening team activity.",
        tags: ["Arrival", "Conference", "Activity"]
      },
      {
        day: 2,
        title: "Team Building",
        description: "Full day team building activities. Adventure course. Evening corporate dinner.",
        tags: ["Team Building", "Adventure", "Dinner"]
      },
      {
        day: 3,
        title: "Wrap-up & Departure",
        description: "Morning conference wrap-up. Lunch. Check-out and transfer.",
        tags: ["Conference", "Transfer"]
      }
    ],
    bestTime: "Year round",
    groupSize: "10-50 people",
    image: cop1,
    reviews: generateReviews(36, "Corporate", ["team building", "conference", "retreat"])
  },
  {
    id: 37,
    title: "Leadership Retreat Himalayas",
    category: "Corporate",
    rating: 4.4,
    duration: "4 Days / 3 Nights",
    price: 28500,
    originalPrice: 34500,
    location: "Shimla, Naldehra",
    description: "Executive retreat focusing on leadership development, strategic planning, and wellness. Premium accommodations with meeting facilities.",
    shortDescription: "Executive retreat with leadership activities and premium stays.",
    highlights: [
      "Executive Suite Accommodations",
      "Strategic Planning Sessions",
      "Leadership Workshop",
      "Golf Strategy Session",
      "Networking Dinner",
      "Wellness Activities"
    ],
    inclusions: [
      "3 nights luxury resort",
      "All gourmet meals",
      "Meeting rooms with tech",
      "Leadership facilitator",
      "Golf course access",
      "Airport transfers"
    ],
    exclusions: [
      "Travel to destination",
      "Alcoholic beverages",
      "Personal shopping",
      "Spa beyond included"
    ],
    itinerary: [
      {
        day: 1,
        title: "Executive Arrival",
        description: "Luxury transfer. Check-in. Evening networking cocktail.",
        tags: ["Transfer", "Networking"]
      },
      {
        day: 2,
        title: "Strategy Day",
        description: "Full day strategic planning sessions. Breakout rooms. Evening dinner.",
        tags: ["Strategy", "Meetings", "Dinner"]
      },
      {
        day: 3,
        title: "Leadership & Golf",
        description: "Morning leadership workshop. Afternoon golf strategy session. Gala dinner.",
        tags: ["Workshop", "Golf", "Gala"]
      },
      {
        day: 4,
        title: "Departure",
        description: "Final wrap-up. Check-out. Luxury transfer.",
        tags: ["Wrap-up", "Transfer"]
      }
    ],
    bestTime: "Year round",
    groupSize: "5-20 executives",
    image: cop2,
    reviews: generateReviews(37, "Corporate", ["leadership", "executive", "strategy"])
  },
  {
    id: 38,
    title: "Corporate Offsite Quick",
    category: "Corporate",
    rating: 4.2,
    duration: "2 Days / 1 Night",
    price: 12500,
    originalPrice: 15200,
    location: "Shimla",
    description: "Quick corporate offsite for urgent meetings and team bonding. Efficient format with modern facilities.",
    shortDescription: "Quick offsite with meetings and team bonding activities.",
    highlights: [
      "Modern Meeting Room",
      "Team Bonding Games",
      "Working Lunch Setup",
      "Evening Entertainment",
      "WiFi & Business Center",
      "Flexible Catering"
    ],
    inclusions: [
      "1 night hotel",
      "All meals",
      "Meeting room",
      "Basic AV equipment",
      "Team coordinator",
      "Transfers"
    ],
    exclusions: [
      "Travel to Shimla",
      "Specialized equipment",
      "Alcoholic beverages",
      "Personal expenses"
    ],
    itinerary: [
      {
        day: 1,
        title: "Meeting & Bonding",
        description: "Morning arrival. Meeting session. Team bonding activities. Dinner.",
        tags: ["Meeting", "Team Building", "Dinner"]
      },
      {
        day: 2,
        title: "Wrap-up",
        description: "Morning meeting wrap-up. Lunch. Departure.",
        tags: ["Meeting", "Departure"]
      }
    ],
    bestTime: "Year round",
    groupSize: "5-30 people",
    image: cop3,
    reviews: generateReviews(38, "Corporate", ["quick", "meeting", "offsite"])
  },
  {
    id: 39,
    title: "Corporate Incentive Luxury Tour",
    category: "Corporate",
    rating: 4.5,
    duration: "5 Days / 4 Nights",
    price: 32500,
    originalPrice: 39900,
    location: "Shimla, Manali",
    description: "Luxury corporate incentive tour for top performers. Premium experiences, gala dinners, and recognition ceremonies.",
    shortDescription: "Luxury incentive tour with gala dinners and awards ceremonies.",
    highlights: [
      "Luxury 5-Star Hotels",
      "Gala Award Dinner",
      "Manali Excursion",
      "Spa Vouchers",
      "Shopping Allowance",
      "Photographer"
    ],
    inclusions: [
      "4 nights luxury hotels",
      "All gourmet meals",
      "Gala dinner event",
      "Manali day trip",
      "Spa sessions",
      "Luxury transfers"
    ],
    exclusions: [
      "Travel to destination",
      "Personal shopping beyond allowance",
      "Alcoholic beverages",
      "Tips"
    ],
    itinerary: [
      {
        day: 1,
        title: "VIP Arrival",
        description: "Luxury transfer. Welcome drinks. Check-in. Evening at leisure.",
        tags: ["Transfer", "Welcome"]
      },
      {
        day: 2,
        title: "Recognition Day",
        description: "Morning spa. Afternoon award ceremony. Evening gala dinner.",
        tags: ["Spa", "Awards", "Gala"]
      },
      {
        day: 3,
        title: "Manali Excursion",
        description: "Full day luxury trip to Manali. Solang Valley. Return for dinner.",
        tags: ["Excursion", "Manali", "Dinner"]
      },
      {
        day: 4,
        title: "Leisure & Shopping",
        description: "Day at leisure. Shopping with allowance. Farewell dinner.",
        tags: ["Leisure", "Shopping", "Dinner"]
      },
      {
        day: 5,
        title: "Departure",
        description: "Breakfast. Gift hampers. Luxury transfer.",
        tags: ["Transfer", "Gifts"]
      }
    ],
    bestTime: "March to June, September to December",
    groupSize: "5-15 people",
    image: cop4,
    reviews: generateReviews(39, "Corporate", ["incentive", "luxury", "awards"])
  },

  /* ==========================================================
     NEW PACKAGES (IDs 40-49) - Added Categories
     ==========================================================*/
  {
    id: 40,
    title: "Chandratal Lake High-Altitude Trek",
    category: "Himalayan Trekking",
    rating: 4.9,
    duration: "8 Days / 7 Nights",
    price: 28500,
    originalPrice: 32900,
    location: "Manali, Spiti Valley, Chandratal",
    description: "Epic high-altitude trek to the mesmerizing Chandratal Lake (4,300m) through the dramatic landscapes of Spiti Valley. Cross high mountain passes, visit ancient monasteries, and camp under the clearest night skies in the Himalayas.",
    shortDescription: "High-altitude trek to Chandratal Lake with monastery visits and mountain camping.",
    highlights: [
      "Chandratal Lake (Moon Lake) at 4,300m",
      "Kunzum Pass crossing (4,590m)",
      "Key Monastery visit",
      "High-altitude camping (3 nights)",
      "Wildlife spotting (Snow leopard, Ibex)",
      "Ancient Buddhist monasteries"
    ],
    inclusions: [
      "7 nights (4 camping, 3 guesthouse)",
      "All meals during trek",
      "Certified mountaineering guide",
      "Trekking equipment & tents",
      "Oxygen cylinder & first aid",
      "All permits & fees"
    ],
    exclusions: [
      "Travel insurance (mandatory)",
      "Personal trekking gear",
      "Emergency evacuation costs",
      "Tips for support staff"
    ],
    itinerary: [
      {
        day: 1,
        title: "Manali Acclimatization",
        description: "Arrive in Manali. Rest and acclimatization walk. Equipment check and briefing.",
        tags: ["Acclimatization", "Briefing", "Rest"]
      },
      {
        day: 2,
        title: "Manali to Kaza",
        description: "Scenic drive through Rohtang Pass to Kaza. Overnight at guesthouse.",
        tags: ["Scenic Drive", "Rohtang", "Guesthouse"]
      },
      {
        day: 3,
        title: "Kaza to Key to Kibber",
        description: "Visit Key Monastery. Trek to Kibber (4,200m). Wildlife spotting.",
        tags: ["Monastery", "Trekking", "Wildlife"]
      },
      {
        day: 4,
        title: "Kibber to Chandratal Base",
        description: "Trek to Chandratal base camp. High-altitude camping experience.",
        tags: ["High Altitude", "Camping", "Trekking"]
      },
      {
        day: 5,
        title: "Chandratal Lake Day",
        description: "Early morning trek to Chandratal Lake. Photography and meditation. Return to base.",
        tags: ["Lake", "Photography", "Camping"]
      },
      {
        day: 6,
        title: "Return via Kunzum Pass",
        description: "Cross Kunzum Pass. Descend to Batal. Camp at Chandra River.",
        tags: ["Pass Crossing", "Descent", "Camping"]
      },
      {
        day: 7,
        title: "Batal to Manali",
        description: "Drive back to Manali via Atal Tunnel. Hot shower and celebration dinner.",
        tags: ["Return", "Celebration", "Hotel"]
      },
      {
        day: 8,
        title: "Departure",
        description: "Breakfast. Certificate distribution. Transfer to bus stand/airport.",
        tags: ["Certificate", "Transfer"]
      }
    ],
    bestTime: "June to September",
    groupSize: "4-12 trekkers",
    difficulty: "Challenging - High Altitude",
    image: him2,
    reviews: generateReviews(40, "Himalayan Trekking", ["high altitude", "lake", "challenging"])
  },
  {
    id: 41,
    title: "Hampta Pass Crossover Trek",
    category: "Himalayan Trekking",
    rating: 4.7,
    duration: "5 Days / 4 Nights",
    price: 18900,
    originalPrice: 22500,
    location: "Manali, Hampta Pass, Lahaul",
    description: "Dramatic crossover trek from lush green Kullu Valley to the barren landscapes of Lahaul via Hampta Pass (4,270m). Experience two different worlds in one trek with stunning views of Deo Tibba and Indrasan peaks.",
    shortDescription: "Crossover trek from green valleys to barren Lahaul via Hampta Pass.",
    highlights: [
      "Hampta Pass crossing (4,270m)",
      "Contrast: Green Kullu vs Barren Lahaul",
      "Deo Tibba & Indrasan peak views",
      "Chandratal Lake extension option",
      "4 days of wilderness camping",
      "Glacier crossings"
    ],
    inclusions: [
      "4 nights camping (all meals)",
      "Professional trekking guide",
      "All camping equipment",
      "Porter/mule for luggage",
      "Safety equipment",
      "Manali transfers"
    ],
    exclusions: [
      "Personal trekking gear",
      "Travel insurance",
      "Chandratal extension (extra)",
      "Personal expenses"
    ],
    itinerary: [
      {
        day: 1,
        title: "Jobra to Chika",
        description: "Drive to Jobra. Trek to Chika (3,100m) through pine forests. First camp.",
        tags: ["Trek Start", "Forest", "Camping"]
      },
      {
        day: 2,
        title: "Chika to Balu Ka Ghera",
        description: "Trek along Hampta River. Camp at Balu Ka Ghera (3,600m). Alpine meadows.",
        tags: ["River Trek", "Meadows", "Camping"]
      },
      {
        day: 3,
        title: "Pass Crossing Day",
        description: "Early start. Cross Hampta Pass (4,270m). Descend to Shea Goru. Epic views.",
        tags: ["Pass Crossing", "Summit", "Camping"]
      },
      {
        day: 4,
        title: "Shea Goru to Chhatru",
        description: "Trek to Chhatru. Drive to Chandratal (optional). Return to Chhatru camp.",
        tags: ["Descent", "Lake Option", "Camping"]
      },
      {
        day: 5,
        title: "Return to Manali",
        description: "Drive via Rohtang Pass to Manali. Trek completion ceremony.",
        tags: ["Return", "Ceremony", "Complete"]
      }
    ],
    bestTime: "June to October",
    groupSize: "4-10 trekkers",
    difficulty: "Moderate to Challenging",
    image: him1,
    reviews: generateReviews(41, "Himalayan Trekking", ["crossover", "pass", "valleys"])
  },

  // === ADVENTURE SPORTS PACKAGES ===
  {
    id: 42,
    title: "Solang Valley Extreme Adventure Combo",
    category: "Adventure Sports",
    rating: 4.8,
    duration: "3 Days / 2 Nights",
    price: 16500,
    originalPrice: 19900,
    location: "Manali, Solang Valley",
    description: "Ultimate adventure combo featuring paragliding, ziplining, ATV rides, rock climbing, and bungee jumping. Perfect for adrenaline junkies seeking non-stop action in the adventure capital of Himachal.",
    shortDescription: "Extreme adventure combo with paragliding, bungee, ATV, and more.",
    highlights: [
      "Paragliding (15-20 min flight)",
      "Rocket Bungee Jumping",
      "Zipline (300m length)",
      "ATV Quad Biking",
      "Rock Climbing & Rappelling",
      "Giant Swing Experience"
    ],
    inclusions: [
      "2 nights hotel accommodation",
      "All adventure activities",
      "Professional instructors",
      "Safety equipment",
      "Activity videos & photos",
      "Breakfast & dinner"
    ],
    exclusions: [
      "Lunch",
      "Personal expenses",
      "Travel to Manali",
      "Insurance"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Paragliding",
        description: "Arrive in Manali. Afternoon paragliding session at Solang. Evening at leisure.",
        tags: ["Arrival", "Paragliding", "Leisure"]
      },
      {
        day: 2,
        title: "Extreme Activities Day",
        description: "Full day: Bungee jumping, giant swing, zipline, and ATV riding. Evening bonfire.",
        tags: ["Bungee", "ATV", "Zipline", "Bonfire"]
      },
      {
        day: 3,
        title: "Rock Climbing & Departure",
        description: "Morning rock climbing and rappelling. Afternoon departure.",
        tags: ["Climbing", "Rappelling", "Departure"]
      }
    ],
    bestTime: "March to June, September to November",
    groupSize: "2-8 adventurers",
    difficulty: "Moderate",
    image: adv8,
    reviews: generateReviews(42, "Adventure Sports", ["paragliding", "bungee", "extreme"])
  },
  {
    id: 43,
    title: "Beas River Rafting & Camping Expedition",
    category: "Adventure Sports",
    rating: 4.6,
    duration: "2 Days / 1 Night",
    price: 8900,
    originalPrice: 11200,
    location: "Kullu, Manali, Beas River",
    description: "Thrilling white-water rafting expedition on the Beas River with Grade II-IV rapids. Combined with riverside camping, bonfire, and cliff jumping. Perfect weekend adventure from Delhi/Chandigarh.",
    shortDescription: "White-water rafting on Beas River with riverside camping and bonfire.",
    highlights: [
      "14km River Rafting (Grade II-IV)",
      "Riverside Camping",
      "Cliff Jumping (safe zones)",
      "Body Surfing",
      "Bonfire & BBQ Dinner",
      "Professional Safety Kayakers"
    ],
    inclusions: [
      "1 night riverside camp",
      "All meals (breakfast, dinner, lunch)",
      "Rafting equipment (helmet, life jacket, paddle)",
      "Professional river guides",
      "Safety kayaker support",
      "Camping gear"
    ],
    exclusions: [
      "Travel to Kullu",
      "Personal expenses",
      "Alcoholic beverages",
      "Tips"
    ],
    itinerary: [
      {
        day: 1,
        title: "Rafting & Camping",
        description: "Morning rafting session (14km). Afternoon cliff jumping and body surfing. Evening bonfire and BBQ.",
        tags: ["Rafting", "Camping", "BBQ"]
      },
      {
        day: 2,
        title: "Morning Adventure & Return",
        description: "Breakfast. Optional short rafting or swimming. Check-out and departure.",
        tags: ["Breakfast", "Swimming", "Departure"]
      }
    ],
    bestTime: "April to June, September to October",
    groupSize: "4-20 rafters",
    difficulty: "Easy to Moderate",
    image: adv6,
    reviews: generateReviews(43, "Adventure Sports", ["rafting", "river", "camping"])
  },
  {
    id: 44,
    title: "Shimla Rock Climbing & Zipline Park",
    category: "Adventure Sports",
    rating: 4.5,
    duration: "1 Day",
    price: 4500,
    originalPrice: 5500,
    location: "Shimla, Dhalli",
    description: "Action-packed day of rock climbing, rappelling, and zipline adventures at Shimla's premier adventure park. Perfect for beginners and intermediate adventure enthusiasts.",
    shortDescription: "Rock climbing, rappelling, and zipline adventure day in Shimla.",
    highlights: [
      "Natural Rock Climbing (60ft wall)",
      "Rappelling Session",
      "Zipline (200m)",
      "Tyre Wall Climbing",
      "Commando Net",
      "Safety Training Included"
    ],
    inclusions: [
      "Day activities (6 hours)",
      "Professional instructors",
      "All safety gear",
      "Lunch (packed)",
      "Activity photos",
      "Shimla transfers"
    ],
    exclusions: [
      "Travel to Shimla",
      "Personal expenses",
      "Insurance"
    ],
    itinerary: [
      {
        day: 1,
        title: "Adventure Day",
        description: "Morning safety briefing. Rock climbing and rappelling. Lunch. Afternoon zipline and obstacle course. Evening return.",
        tags: ["Climbing", "Zipline", "Full Day"]
      }
    ],
    bestTime: "Year round (except heavy monsoon)",
    groupSize: "2-15 participants",
    difficulty: "Easy to Moderate",
    image: adv7,
    reviews: generateReviews(44, "Adventure Sports", ["climbing", "zipline", "day trip"])
  },

  // === HIMACHALI CUISINE EXPERIENCE ===
  {
    id: 45,
    title: "Authentic Himachali Dham & Food Trail",
    category: "Himachali Cuisine",
    rating: 4.8,
    duration: "3 Days / 2 Nights",
    price: 12500,
    originalPrice: 15200,
    location: "Shimla, Manali, Local Villages",
    description: "Immerse yourself in Himachali culinary traditions with traditional Dham meals, cooking classes with local chefs, street food tours, and visits to organic farms. Learn the secrets of Siddu, Trout, and Madra.",
    shortDescription: "Culinary journey with Dham meals, cooking classes, and food trails.",
    highlights: [
      "Traditional Dham Meal Experience",
      "Cooking Class with Local Chef",
      "Siddu & Trout Fish Preparation",
      "Organic Farm Visit",
      "Mall Road Food Trail",
      "Local Market Spice Tour"
    ],
    inclusions: [
      "2 nights heritage homestay",
      "All meals (breakfast, lunch, dinner)",
      "Cooking class ingredients",
      "Food guide & translator",
      "Recipe booklet",
      "Farm transfers"
    ],
    exclusions: [
      "Travel to Shimla",
      "Alcoholic beverages",
      "Personal shopping",
      "Tips"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Dham Experience",
        description: "Arrive in Shimla. Welcome with traditional Dham meal. Evening food trail on Mall Road.",
        tags: ["Arrival", "Dham", "Food Trail"]
      },
      {
        day: 2,
        title: "Cooking & Farm Day",
        description: "Morning cooking class (Siddu, Madra). Afternoon organic farm visit. Evening trout dinner.",
        tags: ["Cooking", "Farm", "Dinner"]
      },
      {
        day: 3,
        title: "Market & Departure",
        description: "Morning spice market tour. Cooking competition. Lunch and departure.",
        tags: ["Market", "Cooking", "Departure"]
      }
    ],
    bestTime: "Year round",
    groupSize: "2-8 food lovers",
    image: cui1,
    reviews: generateReviews(45, "Himachali Cuisine", ["food", "cooking", "authentic"])
  },

  // === FOREST BATHING & WELLNESS ===
  {
    id: 46,
    title: "Shinrin-Yoku Forest Therapy Retreat",
    category: "Forest Bathing & Wellness",
    rating: 4.9,
    duration: "4 Days / 3 Nights",
    price: 22500,
    originalPrice: 27900,
    location: "Jibhi, Shoja, Tirthan Valley",
    description: "Certified forest bathing experience based on Japanese Shinrin-Yoku principles. Guided mindfulness walks through ancient cedar and pine forests, combined with yoga, meditation, and Ayurvedic treatments for complete rejuvenation.",
    shortDescription: "Certified forest bathing retreat with yoga, meditation, and Ayurveda.",
    highlights: [
      "Certified Forest Bathing Guide",
      "Daily Yoga & Meditation",
      "Ayurvedic Consultation & Treatments",
      "Ancient Cedar Forest Walks",
      "Digital Detox Program",
      "Organic Sattvic Meals"
    ],
    inclusions: [
      "3 nights eco-resort",
      "All organic meals",
      "Certified forest therapy sessions",
      "Daily yoga & meditation",
      "Ayurvedic treatments",
      "Nature journaling kit"
    ],
    exclusions: [
      "Travel to Jibhi",
      "Personal expenses",
      "Additional spa treatments",
      "Tips"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Digital Detox",
        description: "Arrive at Jibhi. Device collection. Welcome tea. Evening gentle yoga and orientation.",
        tags: ["Arrival", "Detox", "Yoga"]
      },
      {
        day: 2,
        title: "Forest Bathing Immersion",
        description: "Morning guided forest bathing (3 hours). Afternoon Ayurvedic consultation. Evening meditation.",
        tags: ["Forest Bathing", "Ayurveda", "Meditation"]
      },
      {
        day: 3,
        title: "Deep Nature Connection",
        description: "Silent forest walk. Nature journaling. Riverside meditation. Wellness workshop.",
        tags: ["Silent Walk", "Journaling", "Workshop"]
      },
      {
        day: 4,
        title: "Integration & Return",
        description: "Morning yoga. Closing circle. Device return. Departure with wellness kit.",
        tags: ["Yoga", "Closing", "Departure"]
      }
    ],
    bestTime: "March to June, September to November",
    groupSize: "4-12 participants",
    image: well1,
    reviews: generateReviews(46, "Forest Bathing", ["wellness", "forest", "meditation"])
  },
  {
    id: 47,
    title: "Himalayan Wellness & Yoga Retreat",
    category: "Forest Bathing & Wellness",
    rating: 4.7,
    duration: "6 Days / 5 Nights",
    price: 32500,
    originalPrice: 38900,
    location: "Rishikesh of Himachal (Kasol area)",
    description: "Comprehensive wellness retreat combining Hatha yoga, Pranayama, meditation, and naturopathy in the serene Himalayan foothills. Detox your body and mind with expert practitioners.",
    shortDescription: "Comprehensive yoga & wellness retreat with naturopathy treatments.",
    highlights: [
      "Twice Daily Yoga Sessions",
      "Pranayama & Meditation",
      "Naturopathy Treatments",
      "Detox Diet Program",
      "Stress Management Workshops",
      "Himalayan Sunrise Sessions"
    ],
    inclusions: [
      "5 nights wellness center",
      "All sattvic meals",
      "Yoga & meditation classes",
      "Naturopathy sessions",
      "Ayurvedic massage (2)",
      "Workshop materials"
    ],
    exclusions: [
      "Travel to venue",
      "Personal expenses",
      "Additional treatments",
      "Tips"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Assessment",
        description: "Arrival. Health assessment. Evening welcome yoga. Organic dinner.",
        tags: ["Arrival", "Assessment", "Yoga"]
      },
      {
        day: 2,
        title: "Yoga & Detox Begin",
        description: "Morning Hatha yoga. Pranayama. Detox diet begins. Evening meditation.",
        tags: ["Yoga", "Pranayama", "Detox"]
      },
      {
        day: 3,
        title: "Deep Practice",
        description: "Sunrise yoga. Naturopathy treatment. Workshop on mindfulness. Silent evening.",
        tags: ["Sunrise Yoga", "Treatment", "Silent"]
      },
      {
        day: 4,
        title: "Nature Immersion",
        description: "Morning yoga. Nature hike with meditation. River cleansing ritual.",
        tags: ["Yoga", "Nature", "Ritual"]
      },
      {
        day: 5,
        title: "Integration",
        description: "Advanced yoga. Stress management workshop. Closing ceremony planning.",
        tags: ["Advanced", "Workshop", "Ceremony"]
      },
      {
        day: 6,
        title: "Departure",
        description: "Final sunrise yoga. Breakfast. Certificate distribution. Departure.",
        tags: ["Final Yoga", "Certificate", "Departure"]
      }
    ],
    bestTime: "Year round",
    groupSize: "6-15 participants",
    image: wellness2,
    reviews: generateReviews(47, "Forest Bathing", ["yoga", "detox", "wellness"])
  },

  // === WINTER SPORTS PACKAGES ===
  {
    id: 48,
    title: "Kufri Skiing & Snowboarding Masterclass",
    category: "Winter Sports",
    rating: 4.8,
    duration: "4 Days / 3 Nights",
    price: 21500,
    originalPrice: 25900,
    location: "Kufri, Narkanda, Shimla",
    description: "Professional skiing and snowboarding course with certified instructors. From beginner basics to intermediate parallel turns. Includes equipment rental, lift passes, and video analysis sessions.",
    shortDescription: "Professional ski/snowboard course with certified instructors and video analysis.",
    highlights: [
      "Certified Ski Instructor (10 hours)",
      "Complete Equipment Rental",
      "Narkanda Advanced Slopes",
      "Video Analysis Sessions",
      "Snowboarding Option",
      "Avalanche Safety Training"
    ],
    inclusions: [
      "3 nights ski resort",
      "Daily breakfast & dinner",
      "10 hours professional instruction",
      "Complete ski/snowboard gear",
      "Lift passes",
      "Safety equipment"
    ],
    exclusions: [
      "Lunch",
      "Personal ski clothing",
      "Travel insurance",
      "Private lessons (extra)"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Basics",
        description: "Transfer to Kufri. Equipment fitting. Basic stance and gliding. Theory session.",
        tags: ["Transfer", "Equipment", "Theory"]
      },
      {
        day: 2,
        title: "Turning & Control",
        description: "Snowplough turns. Control techniques. Practice on gentle slopes. Video recording.",
        tags: ["Turning", "Control", "Video"]
      },
      {
        day: 3,
        title: "Narkanda Advanced",
        description: "Transfer to Narkanda. Intermediate slopes. Parallel turn introduction.",
        tags: ["Narkanda", "Advanced", "Parallel"]
      },
      {
        day: 4,
        title: "Assessment & Departure",
        description: "Final skiing assessment. Certificate ceremony. Equipment return. Transfer.",
        tags: ["Assessment", "Certificate", "Transfer"]
      }
    ],
    bestTime: "December to February",
    groupSize: "2-6 participants",
    difficulty: "Beginner to Intermediate",
    image: win3,
    reviews: generateReviews(48, "Winter Sports", ["skiing", "snowboarding", "professional"])
  },
  {
    id: 49,
    title: "Manali Winter Wonderland Adventure",
    category: "Winter Sports",
    rating: 4.7,
    duration: "5 Days / 4 Nights",
    price: 28500,
    originalPrice: 33900,
    location: "Manali, Solang Valley, Rohtang Pass",
    description: "Ultimate winter adventure package with skiing, snowmobiling, snow trekking, and igloo stay. Experience the magic of Himachal winters with snow-covered landscapes and thrilling activities.",
    shortDescription: "Ultimate winter package with skiing, snowmobiling, and igloo stay.",
    highlights: [
      "Solang Valley Skiing",
      "Snowmobiling (30 min)",
      "Igloo Stay Experience",
      "Snow Trekking",
      "Rohtang Pass Visit (seasonal)",
      "Hot Spring Dip"
    ],
    inclusions: [
      "4 nights (2 hotel, 2 igloo)",
      "All meals",
      "Skiing equipment",
      "Snowmobile ride",
      "Professional guides",
      "Hot spring visit"
    ],
    exclusions: [
      "Travel to Manali",
      "Personal winter clothing",
      "Rohtang permit (if applicable)",
      "Insurance"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Snow Activities",
        description: "Arrive in Manali. Afternoon Solang Valley. Skiing and snow activities.",
        tags: ["Arrival", "Solang", "Skiing"]
      },
      {
        day: 2,
        title: "Snowmobiling & Igloo",
        description: "Morning snowmobiling. Transfer to igloo site. Igloo construction demo. Night in igloo.",
        tags: ["Snowmobile", "Igloo", "Camping"]
      },
      {
        day: 3,
        title: "Snow Trek & Hot Springs",
        description: "Morning snow trek. Visit Vashisht Hot Springs. Return to hotel.",
        tags: ["Trek", "Hot Springs", "Hotel"]
      },
      {
        day: 4,
        title: "Rohtang or Adventure Day",
        description: "Rohtang Pass visit (if open) or alternative snow activities. Farewell dinner.",
        tags: ["Rohtang", "Adventure", "Dinner"]
      },
      {
        day: 5,
        title: "Departure",
        description: "Breakfast. Check-out. Transfer to bus stand/airport.",
        tags: ["Breakfast", "Transfer"]
      }
    ],
    bestTime: "December to March",
    groupSize: "2-8 participants",
    image: win2,
    reviews: generateReviews(49, "Winter Sports", ["winter", "igloo", "snowmobiling"])
  },
  {
  id: 50,
  title: "Manali-Jispa Himalayan Expedition",
  category: "Himalayan Trekking",
  rating: 4.8,
  duration: "6 Days / 5 Nights",
  price: 24500,
  originalPrice: 28900,
  location: "Manali, Keylong, Jispa, Baralacha La",
  description: "Scenic high-altitude trek through the dramatic landscapes of Lahaul Valley. Cross the legendary Baralacha La pass, camp by the pristine Deepak Tal lake, and experience the raw beauty of the Greater Himalayas with expert mountaineering guides.",
  shortDescription: "High-altitude trek through Lahaul Valley with Baralacha La crossing and alpine camping.",
  highlights: [
    "Baralacha La Pass (4,890m)",
    "Deepak Tal Lake Camping",
    "Lahaul Valley Landscapes",
    "Darcha Village Experience",
    "Suraj Tal Viewpoint",
    "5 Nights High-Altitude Camping"
  ],
  inclusions: [
    "5 nights alpine camping",
    "All meals (high-nutrition trek food)",
    "Certified mountaineering guide",
    "Trekking equipment & tents",
    "Oxygen & medical support",
    "Manali to Manali transport"
  ],
  exclusions: [
    "Travel insurance (mandatory)",
    "Personal trekking gear",
    "Porter services (optional)",
    "Emergency evacuation"
  ],
  itinerary: [
    {
      day: 1,
      title: "Manali to Jispa",
      description: "Drive through Rohtang Pass to Jispa. Acclimatization walk. Camp by Bhaga River.",
      tags: ["Scenic Drive", "Rohtang", "Camping"]
    },
    {
      day: 2,
      title: "Jispa to Deepak Tal",
      description: "Trek to Deepak Tal lake (3,750m). Setup camp. Evening photography session.",
      tags: ["Trekking", "Lake", "Camping"]
    },
    {
      day: 3,
      title: "Baralacha Approach",
      description: "Trek towards Baralacha La base. Acclimatization day. Skills workshop.",
      tags: ["Acclimatization", "Skills", "Camping"]
    },
    {
      day: 4,
      title: "Pass Crossing Day",
      description: "Early start. Cross Baralacha La (4,890m). Epic panoramic views. Descend to camp.",
      tags: ["Pass Crossing", "Summit", "Achievement"]
    },
    {
      day: 5,
      title: "Return to Jispa",
      description: "Descend trek to Jispa. Celebration dinner. Hot shower at guesthouse.",
      tags: ["Descent", "Celebration", "Comfort"]
    },
    {
      day: 6,
      title: "Departure via Keylong",
      description: "Visit Keylong monastery. Drive back to Manali. Trek completion ceremony.",
      tags: ["Monastery", "Return", "Certificate"]
    }
  ],
  bestTime: "June to September",
  groupSize: "4-10 trekkers",
  difficulty: "Challenging - High Altitude",
  image: him3, // Reusing adventure image
  reviews: generateReviews(50, "Himalayan Trekking", ["high altitude", "pass crossing", "lahaul"])
},
{
  id: 51,
  title: "Kullu Valley Food Heritage Tour",
  category: "Himachali Cuisine",
  rating: 4.7,
  duration: "4 Days / 3 Nights",
  price: 14500,
  originalPrice: 17200,
  location: "Kullu, Manikaran, Kasol, Bhuntar",
  description: "Deep dive into Kullu Valley's culinary traditions. Learn to cook authentic Kullvi dishes, visit traditional trout farms, experience the famous Manikaran langar, and discover the unique fusion of Himachali and Israeli flavors in Kasol.",
  shortDescription: "Culinary exploration of Kullu Valley with trout farms, traditional cooking, and food walks.",
  highlights: [
    "Traditional Trout Farm Visit",
    "Kullvi Thali Cooking Class",
    "Manikaran Gurudwara Langar",
    "Kasol Israeli-Himachali Fusion",
    "Apple Cider Tasting",
    "Local Market Spice Hunt"
  ],
  inclusions: [
    "3 nights riverside homestay",
    "All meals (breakfast, lunch, dinner)",
    "Cooking class ingredients",
    "Trout farm visit",
    "Food guide & transport",
    "Recipe booklet"
  ],
  exclusions: [
    "Travel to Kullu",
    "Personal shopping",
    "Alcoholic beverages",
    "Tips"
  ],
  itinerary: [
    {
      day: 1,
      title: "Kullu Arrival & Fish Farm",
      description: "Arrive in Kullu. Visit trout breeding farm. Fresh trout lunch. Evening riverside walk.",
      tags: ["Arrival", "Trout Farm", "Fresh Fish"]
    },
    {
      day: 2,
      title: "Kullvi Cooking Day",
      description: "Morning market visit for spices. Afternoon cooking class: Patande, Siddu, Tudkiya Bhat. Dinner with host family.",
      tags: ["Market", "Cooking Class", "Host Family"]
    },
    {
      day: 3,
      title: "Manikaran & Kasol",
      description: "Manikaran Gurudwara visit. Langar lunch. Kasol food walk. Israeli-Himachali fusion dinner.",
      tags: ["Manikaran", "Langar", "Fusion Food"]
    },
    {
      day: 4,
      title: "Cider & Departure",
      description: "Apple cider tasting at local brewery. Shopping for spices. Lunch and departure.",
      tags: ["Cider", "Shopping", "Departure"]
    }
  ],
  bestTime: "March to June, September to November",
  groupSize: "2-8 food enthusiasts",
  image: cui2, // Reusing food-related image
  reviews: generateReviews(51, "Himachali Cuisine", ["kullu", "trout", "authentic"])
},
{
  id: 52,
  title: "Gulaba Snow Village Experience",
  category: "Winter Sports",
  rating: 4.6,
  duration: "3 Days / 2 Nights",
  price: 16800,
  originalPrice: 19900,
  location: "Gulaba, Manali, Solang Valley",
  description: "Exclusive winter experience at Gulaba, Manali's hidden snow paradise. Enjoy snowshoeing through pine forests, ice climbing on frozen waterfalls, and cozy evenings in heated tents. Less crowded than Kufri with pristine snow conditions.",
  shortDescription: "Hidden winter paradise with snowshoeing, ice climbing, and heated tent stays.",
  highlights: [
    "Snowshoeing Through Pine Forests",
    "Ice Climbing on Frozen Waterfalls",
    "Heated Tent Accommodation",
    "Private Snow Sledding",
    "Snow Cave Construction",
    "Sunrise Snow Photography"
  ],
  inclusions: [
    "2 nights heated alpine tents",
    "All meals (hot breakfast, dinner)",
    "Snowshoe equipment",
    "Ice climbing gear",
    "Professional instructor",
    "Manali transfers"
  ],
  exclusions: [
    "Travel to Manali",
    "Personal winter clothing",
    "Travel insurance",
    "Photography equipment"
  ],
  itinerary: [
    {
      day: 1,
      title: "Gulaba Arrival & Snowshoe",
      description: "Transfer to Gulaba. Camp setup. Afternoon snowshoeing through pine forest. Hot soup evening.",
      tags: ["Transfer", "Snowshoeing", "Camping"]
    },
    {
      day: 2,
      title: "Ice Climbing Day",
      description: "Morning ice climbing on frozen waterfall. Lunch at camp. Afternoon snow cave building. Bonfire dinner.",
      tags: ["Ice Climbing", "Snow Cave", "Bonfire"]
    },
    {
      day: 3,
      title: "Sledding & Departure",
      description: "Sunrise photography. Morning sledding. Breakfast. Camp pack-up. Transfer to Manali.",
      tags: ["Sunrise", "Sledding", "Departure"]
    }
  ],
  bestTime: "December to February",
  groupSize: "2-6 participants",
  difficulty: "Moderate",
  image: win1, // Reusing winter adventure image
  reviews: generateReviews(52, "Winter Sports", ["gulaba", "ice climbing", "snowshoeing"])
}
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
  "Corporate",
  "Himalayan Trekking",
  "Adventure Sports",
  "Himachali Cuisine",
  "Forest Bathing & Wellness",
  "Winter Sports"
];