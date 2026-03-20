import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import { Phone, Mail, MapPin, Send, Check, Clock, MessageCircle, Facebook, Youtube, Instagram, Twitter, Mountain, Navigation, MessageSquare, Bot, X, ChevronRight } from 'lucide-react';
import './ContactUs.css';

// ── Keyword matcher ──────────────────────────────────────────────────────────
const getResponseKey = (text) => {
  const t = text.toLowerCase();
  if (t.match(/\b(hi|hello|hey|hii|namaste|good)\b/))   return 'greeting';
  if (t.match(/\b(book|reserv|reservation)\b/))          return 'booking_issue';
  if (t.match(/\b(pay|card|upi|payment|gpay|phonepe|paytm)\b/)) return 'payment_problem';
  if (t.match(/\b(refund|money back|return)\b/))          return 'refund_status';
  if (t.match(/\b(cancel|cancell)\b/))                    return 'cancel_booking';
  if (t.match(/\b(agent|human|support|staff)\b/))         return 'speak_agent';
  if (t.match(/\b(price|cost|rate|fee|charge)\b/))        return 'pricing';
  if (t.match(/\b(check.?in|check.?out)\b/))              return 'checkin_time';
  if (t.match(/\b(wifi|internet|amenities|facility)\b/))  return 'hotel_amenities';
  if (t.match(/\b(account|login|password|signup|register)\b/)) return 'account_issues';
  if (t.match(/\b(place|sight|tourist|attraction|mall road|kufri|jakhu|christ church|monument)\b/)) return 'tourist_places';
  if (t.match(/\b(activit|trek|trekking|ski|skiing|toy train|adventure|sport)\b/)) return 'activities';
  if (t.match(/\b(transport|reach|bus|taxi|train|fly|airport|road|how to come|how to get)\b/)) return 'transport';
  if (t.match(/\b(tip|tips|pack|packing|safety|clothes|what to bring|guide)\b/)) return 'travel_tips';
  if (t.match(/\b(honeymoon|couple|romantic|romance|anniversary)\b/))  return 'honeymoon_packages';
  if (t.match(/\b(family|kid|child|children|parents|family trip)\b/))  return 'family_packages';
  if (t.match(/\b(nearby|manali|kullu|chail|narkanda|around shimla|close to)\b/)) return 'nearby_destinations';
  if (t.match(/\b(food|eat|restaurant|cafe|dish|cuisine|local food|himachali)\b/)) return 'food';
  if (t.match(/\b(discount|offer|deal|promo|coupon|early bird|group discount|sale)\b/)) return 'discounts';
  if (t.match(/\b(snow|snowfall|weather|temperature|climate|rain|cold|season|best time|visit)\b/)) return 'best_time';
  if (t.match(/\b(hotel|room|stay|accommodation)\b/))     return 'hotel_details';
  if (t.match(/\b(package|tour|trip|travel|shimla)\b/))   return 'package_info';
  if (t.match(/\b(taxi|cab|auto|local transport|shuttle)\b/)) return 'transport';
  if (t.match(/\b(emergency|hospital|police|ambulance|contact)\b/)) return 'emergency';
  if (t.match(/\b(event|festival|fair|local event|celebration)\b/)) return 'local_events';
  if (t.match(/\b(what can you do|what can you help|chatbot|bot|assistant|feature)\b/)) return 'chatbot_help';
  if (t.match(/\b(thank|thanks|bye|goodbye|ok|okay)\b/))  return 'farewell';
  return 'default';
};

// ── Full offline response database ──────────────────────────────────────────
const responses = {
  greeting: {
    message: "Hello! 👋 Welcome to Shimla Travels! I'm your virtual assistant. How can I help you today?",
    quickReplies: [
      { id: 'tourist_places',  label: '🗺️ Tourist Places' },
      { id: 'activities',      label: '🏔️ Activities' },
      { id: 'hotel_details',   label: '🏨 Hotels' },
      { id: 'package_info',    label: '📦 Packages' },
      { id: 'transport',       label: '🚗 How to Reach' },
      { id: 'food',            label: '🍽️ Food & Cafes' },
      { id: 'speak_agent',     label: '👤 Talk to Agent' },
    ],
  },
  welcome: {
    message: "Welcome to Shimla Travels 👋 How can we help you today?",
    quickReplies: [
      { id: 'tourist_places',      label: '🗺️ Tourist Places' },
      { id: 'activities',          label: '🏔️ Activities' },
      { id: 'hotel_details',       label: '🏨 Hotels' },
      { id: 'package_info',        label: '📦 Packages' },
      { id: 'transport',           label: '🚗 How to Reach' },
      { id: 'best_time',           label: '🌤️ Best Time to Visit' },
      { id: 'food',                label: '🍽️ Food & Cafes' },
      { id: 'discounts',           label: '🎁 Offers & Discounts' },
      { id: 'booking_issue',       label: '📋 Bookings' },
      { id: 'speak_agent',         label: '☎️ Contact Us' },
    ],
  },
  booking_issue: {
    message: "I can help with booking issues! What kind of problem are you facing?",
    quickReplies: [
      { id: 'modify_booking',    label: '✏️ Modify Booking' },
      { id: 'cancel_booking',    label: '❌ Cancel Booking' },
      { id: 'booking_not_found', label: "🔍 Can't Find Booking" },
      { id: 'payment_failed',    label: '💸 Payment Failed' },
      { id: 'speak_agent',       label: '👤 Speak to Agent' },
      { id: 'main_menu',         label: '🏠 Main Menu' },
    ],
  },
  modify_booking: {
    message: "To modify your booking, please share your booking reference (e.g. HTL-ABC123 or PKG-XYZ456). Our team will assist you within 2 hours! 🕐\n\nModification Policy:\n• Hotels: Up to 48 hrs before check-in\n• Packages: Up to 7 days before travel\n• Date changes may affect pricing",
    quickReplies: [
      { id: 'speak_agent', label: '👤 Contact Agent' },
      { id: 'main_menu',   label: '🏠 Main Menu' },
    ],
  },
  cancel_booking: {
    message: "Need to cancel? Here's our cancellation policy:\n\n🏨 Hotels:\n• Free cancellation up to 24 hrs\n• 50% charge within 24 hrs\n• No refund for no-shows\n\n📦 Packages:\n• Free up to 7 days before\n• 10% charge: 3–7 days before\n• 50% charge within 3 days\n\nRefunds processed in 5–7 business days.",
    quickReplies: [
      { id: 'refund_status', label: '💰 Check Refund' },
      { id: 'speak_agent',   label: '👤 Contact Agent' },
      { id: 'main_menu',     label: '🏠 Main Menu' },
    ],
  },
  booking_not_found: {
    message: "Let me help you find your booking!\n\n1. Check email (incl. spam folder)\n2. Look for: noreply@shimlatravels.com\n3. Reference starts with HTL- or PKG-\n\nStill can't find it? Contact us with your email, date of booking, and approximate amount paid.",
    quickReplies: [
      { id: 'speak_agent', label: '👤 Contact Agent' },
      { id: 'main_menu',   label: '🏠 Main Menu' },
    ],
  },
  payment_failed: {
    message: "Don't worry! If payment failed but amount was deducted:\n\n✅ The amount is held by your bank — NOT charged\n✅ Auto-released within 5–7 business days\n✅ No action needed from your side\n\nIf not refunded after 7 days, contact your bank with the transaction ID.",
    quickReplies: [
      { id: 'refund_status', label: '💰 Check Refund' },
      { id: 'speak_agent',   label: '👤 Contact Agent' },
      { id: 'main_menu',     label: '🏠 Main Menu' },
    ],
  },
  payment_problem: {
    message: "Having payment issues? Let me help! 💳\n\nAccepted Methods:\n• UPI (GPay, PhonePe, Paytm, BHIM)\n• Credit/Debit Cards (Visa, Mastercard, RuPay)\n• Net Banking (all major banks)\n• Wallets (Paytm, Mobikwik)\n\n🔒 All payments secured by 256-bit SSL",
    quickReplies: [
      { id: 'payment_failed', label: '💸 Amount Deducted' },
      { id: 'card_declined',  label: '🚫 Card Declined' },
      { id: 'upi_issue',      label: '📱 UPI Problem' },
      { id: 'double_charge',  label: '2️⃣ Double Charged' },
      { id: 'main_menu',      label: '🏠 Main Menu' },
    ],
  },
  card_declined: {
    message: "Card declined? Try these solutions:\n\n1. Check card number, expiry & CVV\n2. Ensure sufficient balance/limit\n3. Enable international transactions\n4. Contact bank if they blocked it\n5. Try another payment method\n\n💡 Recommended: Use UPI (most reliable)",
    quickReplies: [
      { id: 'upi_issue',   label: '📱 Try UPI Instead' },
      { id: 'speak_agent', label: '👤 Get Help' },
      { id: 'main_menu',   label: '🏠 Main Menu' },
    ],
  },
  upi_issue: {
    message: "UPI issues are usually temporary! Try:\n\n1. Check UPI ID is correct\n2. Try a different UPI app\n3. Ensure stable internet connection\n4. Check your daily UPI limit\n\nBest UPI Apps: Google Pay ⭐, PhonePe ⭐, Paytm, BHIM",
    quickReplies: [
      { id: 'card_declined', label: '💳 Try Card' },
      { id: 'speak_agent',   label: '👤 Get Help' },
      { id: 'main_menu',     label: '🏠 Main Menu' },
    ],
  },
  double_charge: {
    message: "We sincerely apologize for the double charge! 🙏\n\n✅ Duplicate charge auto-refunded in 3–5 days\n✅ Email confirmation will be sent\n\nFor urgent cases:\n📞 +91 98765 43210\n📧 support@shimlatravels.com\n\nPlease keep both transaction references ready.",
    quickReplies: [
      { id: 'refund_status', label: '💰 Track Refund' },
      { id: 'speak_agent',   label: '👤 Contact Agent' },
      { id: 'main_menu',     label: '🏠 Main Menu' },
    ],
  },
  refund_status: {
    message: "Let me help you with your refund! 💰\n\nRefund Processing Times:\n• UPI: 3–5 business days\n• Credit Card: 5–7 business days\n• Debit Card: 5–10 business days\n• Net Banking: 3–5 business days\n• Wallets: Instant to 24 hours",
    quickReplies: [
      { id: 'check_refund',        label: '🔍 Check Status' },
      { id: 'refund_not_received', label: '😟 Not Received' },
      { id: 'main_menu',           label: '🏠 Main Menu' },
    ],
  },
  check_refund: {
    message: "Please share your booking reference (e.g. HTL-ABC123) and we'll check your refund status. You can also email support@shimlatravels.com for instant updates! 📧",
    quickReplies: [
      { id: 'speak_agent', label: '👤 Talk to Agent' },
      { id: 'main_menu',   label: '🏠 Main Menu' },
    ],
  },
  refund_not_received: {
    message: "Sorry to hear your refund hasn't arrived! Here's what to do:\n\n1. Check original payment account\n2. Contact your bank (may be pending their end)\n3. Allow 2 extra days for bank holidays\n\nStill missing?\n📞 +91 98765 43210\n📧 support@shimlatravels.com",
    quickReplies: [
      { id: 'speak_agent', label: '👤 Contact Agent' },
      { id: 'main_menu',   label: '🏠 Main Menu' },
    ],
  },
  hotel_details: {
    message: "Great! What would you like to know about our hotels? 🏨",
    quickReplies: [
      { id: 'hotel_amenities', label: '🛎️ Amenities' },
      { id: 'checkin_time',    label: '🕐 Check-in Times' },
      { id: 'pricing',         label: '💰 Pricing' },
      { id: 'cancel_booking',  label: '❌ Cancellation' },
      { id: 'pet_policy',      label: '🐾 Pet Policy' },
      { id: 'main_menu',       label: '🏠 Main Menu' },
    ],
  },
  hotel_amenities: {
    message: "Our hotels offer excellent amenities! 🛎️\n\n🌟 Standard:\n• Free High-Speed WiFi\n• Room Service (24/7)\n• Smart TV with Cable\n• Hot Water & Geyser\n• Daily Housekeeping\n\n✨ Premium:\n• Swimming Pool\n• Spa & Wellness Center\n• Fitness Center / Gym\n• Mountain View Rooms\n• Fireplace Rooms",
    quickReplies: [
      { id: 'pricing',      label: '💰 Check Pricing' },
      { id: 'checkin_time', label: '🕐 Check-in Times' },
      { id: 'main_menu',    label: '🏠 Main Menu' },
    ],
  },
  checkin_time: {
    message: "Standard check-in / check-out timings 🕐\n\n✅ Check-in: 2:00 PM onwards\n✅ Check-out: 11:00 AM\n\nEarly Check-in (subject to availability):\n• Before 8 AM: Full night charge\n• 8 AM–2 PM: 50% charge\n\nLate Check-out:\n• Up to 6 PM: 50% charge\n• After 6 PM: Full night charge",
    quickReplies: [
      { id: 'hotel_amenities', label: '🛎️ Amenities' },
      { id: 'main_menu',       label: '🏠 Main Menu' },
    ],
  },
  pet_policy: {
    message: "We love pets! 🐾\n\n✅ Select hotels are pet-friendly\n✅ Small pets (under 10kg) allowed\n✅ Pet-friendly rooms on request\n\nRequirements:\n• Advance notice required\n• Valid vaccination certificate\n• Additional cleaning fee may apply\n\n📞 Call us to check availability!",
    quickReplies: [
      { id: 'speak_agent', label: '👤 Check Availability' },
      { id: 'main_menu',   label: '🏠 Main Menu' },
    ],
  },
  package_info: {
    message: "We offer amazing travel packages! 📦\n\nInclusions:\n✅ Hotel accommodation\n✅ Daily breakfast\n✅ Sightseeing & transfers\n✅ Tour guide\n✅ 24/7 support",
    quickReplies: [
      { id: 'package_types',  label: '🗂️ Package Types' },
      { id: 'pricing',        label: '💰 Pricing' },
      { id: 'best_time',      label: '🌤️ Best Time to Visit' },
      { id: 'cancel_booking', label: '❌ Cancellation' },
      { id: 'main_menu',      label: '🏠 Main Menu' },
    ],
  },
  package_types: {
    message: "We have packages for every traveler! 🗂️\n\n🏔️ Adventure — Trekking, camping, skiing\n👨‍👩‍👧 Family — Kid-friendly activities & stays\n💑 Honeymoon — Romantic getaways & suites\n✨ Luxury — 5-star experience, premium service\n💰 Budget — Best value, all essentials\n🌿 Nature — Eco-stays, wildlife, forest walks\n\n🕐 Duration: 2 to 7 nights\n👥 Group packages for 10+ people",
    quickReplies: [
      { id: 'pricing',   label: '💰 See Pricing' },
      { id: 'best_time', label: '🌤️ Best Time' },
      { id: 'main_menu', label: '🏠 Main Menu' },
    ],
  },
  pricing: {
    message: "Here's our pricing overview 💰\n\n🏨 Hotels (per night):\n• Budget: ₹800 – ₹2,000\n• Standard: ₹2,000 – ₹5,000\n• Deluxe: ₹5,000 – ₹10,000\n• Luxury: ₹10,000+\n\n📦 Packages (per person):\n• Budget (2N/3D): ₹3,500 – ₹6,000\n• Standard (3N/4D): ₹7,000 – ₹12,000\n• Luxury (5N/6D): ₹18,000 – ₹35,000\n• Honeymoon (3N/4D): ₹12,000 – ₹25,000\n\n💡 Group discounts for 10+ people!",
    quickReplies: [
      { id: 'package_types', label: '📦 View Packages' },
      { id: 'speak_agent',   label: '👤 Get Custom Quote' },
      { id: 'main_menu',     label: '🏠 Main Menu' },
    ],
  },
  best_time: {
    message: "Shimla is beautiful year-round! 🌤️\n\n❄️ Winter (Nov–Feb): Snowfall, skiing — magical!\n🌸 Spring (Mar–Apr): Blooming flowers — great for honeymoons\n☀️ Summer (May–Jun): Cool escape from heat — most popular\n🌧️ Monsoon (Jul–Sep): Lush green, fewer crowds — best deals!\n🍂 Autumn (Oct–Nov): Clear skies, apple season\n\n💡 Our Pick: May–June & October–November",
    quickReplies: [
      { id: 'package_types', label: '📦 See Packages' },
      { id: 'pricing',       label: '💰 Check Prices' },
      { id: 'main_menu',     label: '🏠 Main Menu' },
    ],
  },
  account_issues: {
    message: "Having trouble with your account? Let me help! 👤",
    quickReplies: [
      { id: 'login_issue',     label: '🔑 Login Problem' },
      { id: 'forgot_password', label: '🔒 Forgot Password' },
      { id: 'profile_update',  label: '✏️ Update Profile' },
      { id: 'main_menu',       label: '🏠 Main Menu' },
    ],
  },
  login_issue: {
    message: "Having trouble logging in? Try:\n\n1. Check email & password are correct\n2. Use 'Forgot Password' to reset\n3. Clear browser cache & cookies\n4. Try incognito/private mode\n5. Try a different browser\n\nStill stuck?\n📧 support@shimlatravels.com",
    quickReplies: [
      { id: 'forgot_password', label: '🔒 Reset Password' },
      { id: 'speak_agent',     label: '👤 Get Help' },
      { id: 'main_menu',       label: '🏠 Main Menu' },
    ],
  },
  forgot_password: {
    message: "Forgot your password? Here's how to reset it 🔒\n\n1. Go to Login page\n2. Click 'Forgot Password'\n3. Enter your registered email\n4. Check your inbox for reset link\n5. Click link and set new password\n\n💡 Link expires in 1 hour\n📧 Check spam if not received",
    quickReplies: [
      { id: 'login_issue', label: '🔑 Other Login Help' },
      { id: 'speak_agent', label: '👤 Contact Support' },
      { id: 'main_menu',   label: '🏠 Main Menu' },
    ],
  },
  profile_update: {
    message: "Update your profile easily! ✏️\n\n1. Go to My Account page\n2. Click Settings → Profile Information\n3. Edit your details\n4. Click Save Changes\n\nEditable: Full name, phone, address, age, gender, bio, travel preferences\n\n⚠️ Email changes require support",
    quickReplies: [
      { id: 'speak_agent', label: '👤 Need More Help' },
      { id: 'main_menu',   label: '🏠 Main Menu' },
    ],
  },
  speak_agent: {
    message: "Reach our support team anytime! 👤\n\n📞 Phone: +91 98765 43210\n(Available 24/7)\n\n📞 Alternate: +91 88990 11223\n\n📧 Email: support@shimlatravels.com\n(Reply within 2 hours)\n\n💬 WhatsApp: +91 98765 43210\n\n🕐 Office Hours:\nMon–Sat: 9 AM – 8 PM\nSun: 10 AM – 6 PM",
    quickReplies: [
      { id: 'main_menu', label: '🏠 Main Menu' },
    ],
  },
  main_menu: {
    message: "Back to main menu! How can I help you? 😊",
    quickReplies: [
      { id: 'tourist_places',      label: '🗺️ Tourist Places' },
      { id: 'activities',          label: '🏔️ Activities' },
      { id: 'hotel_details',       label: '🏨 Hotels' },
      { id: 'package_info',        label: '📦 Packages' },
      { id: 'transport',           label: '🚗 How to Reach' },
      { id: 'food',                label: '🍽️ Food & Cafes' },
      { id: 'best_time',           label: '🌤️ Best Time' },
      { id: 'discounts',           label: '🎁 Offers' },
      { id: 'booking_issue',       label: '📋 Bookings' },
      { id: 'payment_problem',     label: '💳 Payments' },
      { id: 'nearby_destinations', label: '📍 Nearby Places' },
      { id: 'emergency',           label: '🚨 Emergency' },
      { id: 'speak_agent',         label: '☎️ Contact Us' },
    ],
  },
  farewell: {
    message: "Thank you for chatting with us! 🙏 Have a wonderful trip to Shimla! 🏔️ Feel free to reach out anytime.",
    quickReplies: [
      { id: 'main_menu', label: '🏠 Ask Another Question' },
    ],
  },
  tourist_places: {
    message: "Shimla has so many amazing places to explore! 🗺️ Which one interests you?",
    quickReplies: [
      { id: 'mall_road',      label: '🛍️ Mall Road' },
      { id: 'kufri',          label: '⛷️ Kufri' },
      { id: 'jakhu_temple',   label: '🛕 Jakhu Temple' },
      { id: 'christ_church',  label: '⛪ Christ Church' },
      { id: 'nearby_destinations', label: '📍 Nearby Destinations' },
      { id: 'main_menu',      label: '🏠 Main Menu' },
    ],
  },
  mall_road: {
    message: "Mall Road is the heartbeat of Shimla! 🛍️\n\n🌟 What to do on Mall Road:\n• Shopping — woolens, handicrafts, souvenirs\n• Street food — momos, corn, local snacks\n• Cafes & restaurants with mountain views\n• Evening strolls with beautiful Himalayan backdrop\n• Gaiety Theatre — colonial heritage building\n\n📍 Location: Central Shimla\n🕐 Best Time: 4 PM – 9 PM (evening glow)\n💡 No vehicles allowed — pedestrians only!",
    quickReplies: [
      { id: 'food',           label: '🍽️ Food Near Mall Road' },
      { id: 'tourist_places', label: '🗺️ More Places' },
      { id: 'main_menu',      label: '🏠 Main Menu' },
    ],
  },
  kufri: {
    message: "Kufri is a must-visit hill station near Shimla! ⛷️\n\n🌟 Things to Do in Kufri:\n• Skiing & snow activities (Nov–Feb)\n• Horse riding on snowy trails\n• Himalayan Nature Park — wildlife & birds\n• Paragliding & tobogganing\n• Stunning panoramic Himalayan views\n\n📍 Distance from Shimla: 16 km\n🕐 Best Time: December – February for snow\n🚗 Travel Time: ~30 mins by taxi",
    quickReplies: [
      { id: 'activities',     label: '🏔️ More Activities' },
      { id: 'transport',      label: '🚗 How to Get There' },
      { id: 'tourist_places', label: '🗺️ More Places' },
      { id: 'main_menu',      label: '🏠 Main Menu' },
    ],
  },
  jakhu_temple: {
    message: "Jakhu Temple is one of Shimla's most sacred sites! 🛕\n\n🌟 About Jakhu Temple:\n• Dedicated to Lord Hanuman\n• Located on Jakhu Hill (2455 m altitude)\n• 33-meter tall Hanuman statue — visible from all of Shimla!\n• Surrounded by dense forest full of monkeys 🐒\n• Breathtaking 360° view of Shimla\n\n📍 Distance from Shimla: 2.5 km\n🕐 Temple Hours: 6 AM – 12 PM, 5 PM – 8 PM\n⚠️ Tip: Keep bags zipped — monkeys are mischievous!",
    quickReplies: [
      { id: 'tourist_places', label: '🗺️ More Places' },
      { id: 'activities',     label: '🏔️ Activities' },
      { id: 'main_menu',      label: '🏠 Main Menu' },
    ],
  },
  christ_church: {
    message: "Christ Church is Shimla's iconic landmark! ⛪\n\n🌟 About Christ Church:\n• Second oldest church in North India (built 1857)\n• Beautiful neo-Gothic architecture\n• Stunning stained glass windows\n• Located on The Ridge — the most photographed spot!\n• Lit up beautifully at night ✨\n\n📍 Location: The Ridge, Shimla Center\n🕐 Open: 8 AM – 6 PM (Mon–Sat)\n📸 Best for: Photography, heritage walk",
    quickReplies: [
      { id: 'tourist_places', label: '🗺️ More Places' },
      { id: 'mall_road',      label: '🛍️ Mall Road Nearby' },
      { id: 'main_menu',      label: '🏠 Main Menu' },
    ],
  },
  activities: {
    message: "Shimla is packed with exciting activities! 🏔️ What adventure calls you?",
    quickReplies: [
      { id: 'trekking',       label: '🥾 Trekking' },
      { id: 'skiing',         label: '⛷️ Skiing' },
      { id: 'toy_train',      label: '🚂 Toy Train Ride' },
      { id: 'shopping_shimla',label: '🛍️ Shopping' },
      { id: 'main_menu',      label: '🏠 Main Menu' },
    ],
  },
  trekking: {
    message: "Shimla has some incredible trekking trails! 🥾\n\n🌟 Popular Treks:\n• Jakhu Hill Trek — 2.5 km, easy, great views\n• Shali Tibba Trek — 8 km, moderate, dense forest\n• Chail–Kufri Trek — 12 km, moderate\n• Hatu Peak Trek (Narkanda) — 4 km, stunning panorama\n• Churdhar Trek — 16 km, advanced, highest peak in outer Himalayas\n\n🧳 What to Carry:\n• Trekking shoes, warm layers, water, snacks\n• First aid kit, sunscreen, walking stick\n\n💡 Best Season: April–June & Sept–November",
    quickReplies: [
      { id: 'travel_tips',    label: '💡 Travel Tips' },
      { id: 'nearby_destinations', label: '📍 Nearby Treks' },
      { id: 'activities',     label: '🏔️ Other Activities' },
      { id: 'main_menu',      label: '🏠 Main Menu' },
    ],
  },
  skiing: {
    message: "Shimla is a top skiing destination in India! ⛷️\n\n🌟 Best Skiing Spots:\n• Kufri — most popular, beginners & pros\n• Narkanda — less crowded, great slopes\n• Chail — scenic, peaceful setting\n\n📅 Ski Season: December – February\n💰 Cost: ₹500–₹2,000 per hour (gear included)\n\n🎿 What's Included:\n• Ski equipment rental\n• Trained instructors\n• Safety gear\n\n💡 No experience needed — instructors available for beginners!",
    quickReplies: [
      { id: 'kufri',          label: '⛷️ Kufri Info' },
      { id: 'package_types',  label: '📦 Adventure Packages' },
      { id: 'activities',     label: '🏔️ Other Activities' },
      { id: 'main_menu',      label: '🏠 Main Menu' },
    ],
  },
  toy_train: {
    message: "The Shimla Toy Train is a UNESCO World Heritage experience! 🚂\n\n🌟 Kalka–Shimla Railway:\n• 96 km track through 102 tunnels & 864 bridges!\n• Built in 1903 by the British\n• Breathtaking views of valleys and forests\n• Journey time: ~5–6 hours\n• Passes through 18 major stations\n\n💰 Ticket Price: ₹25–₹400 (class-wise)\n🕐 First Train: 4:00 AM from Kalka\n📍 Book at: IRCTC or Shimla Railway Station\n\n💡 Tip: Book window seats on the right side for best views!",
    quickReplies: [
      { id: 'transport',      label: '🚗 How to Reach Shimla' },
      { id: 'activities',     label: '🏔️ Other Activities' },
      { id: 'main_menu',      label: '🏠 Main Menu' },
    ],
  },
  shopping_shimla: {
    message: "Shimla is a shopper's paradise! 🛍️\n\n🌟 What to Buy:\n• Woolen shawls & Pashmina — Tibetan Market\n• Himachali caps & handicrafts\n• Dry fruits & local jams\n• Silver jewellery & wooden artifacts\n• Kangra paintings & thangkas\n\n📍 Best Shopping Areas:\n• Mall Road — main hub\n• Lakkar Bazaar — wooden crafts\n• Tibetan Market — shawls & carpets\n• Lower Bazaar — local & wholesale\n\n💡 Bargaining Tip: Prices are negotiable at Tibetan Market!",
    quickReplies: [
      { id: 'mall_road',      label: '🛍️ Mall Road' },
      { id: 'food',           label: '🍽️ Where to Eat' },
      { id: 'main_menu',      label: '🏠 Main Menu' },
    ],
  },
  transport: {
    message: "Getting to Shimla is easy! 🚗 Choose your mode of travel:",
    quickReplies: [
      { id: 'by_air',   label: '✈️ By Air' },
      { id: 'by_train', label: '🚂 By Train' },
      { id: 'by_road',  label: '🚌 By Road' },
      { id: 'local_transport', label: '🚕 Local Transport' },
      { id: 'main_menu', label: '🏠 Main Menu' },
    ],
  },
  by_air: {
    message: "Flying to Shimla is quick and convenient! ✈️\n\n🛫 Nearest Airport: Jubbarhatti Airport, Shimla\n• Distance from city: 22 km (~45 min)\n• Flights from: Delhi (daily), Chandigarh\n• Airlines: Air India, SpiceJet\n\n🛬 Alternative: Chandigarh Airport\n• Distance from Shimla: 115 km (~3 hrs)\n• More flights & better connectivity\n• Taxis available outside airport\n\n💰 Taxi from Airport: ₹800–₹1,500\n💡 Tip: Book Chandigarh if better fares available!",
    quickReplies: [
      { id: 'by_train',  label: '🚂 By Train Instead' },
      { id: 'by_road',   label: '🚌 By Road Instead' },
      { id: 'transport', label: '🚗 Back to Transport' },
      { id: 'main_menu', label: '🏠 Main Menu' },
    ],
  },
  by_train: {
    message: "The train journey to Shimla is legendary! 🚂\n\n🚆 Kalka–Shimla Toy Train (UNESCO Heritage):\n• From: Kalka Railway Station\n• Duration: 5–6 hours\n• Scenic route through 102 tunnels!\n• Book on IRCTC (train no: 52455, 52457)\n\n🚆 From Delhi to Kalka:\n• Shatabdi Express — 3.5 hours, very comfortable\n• Himalayan Queen — daily service\n\n💡 Tip: Book toy train seats 30 days in advance — fills up fast!",
    quickReplies: [
      { id: 'toy_train', label: '🚂 More About Toy Train' },
      { id: 'by_air',    label: '✈️ By Air Instead' },
      { id: 'transport', label: '🚗 Back to Transport' },
      { id: 'main_menu', label: '🏠 Main Menu' },
    ],
  },
  by_road: {
    message: "Road trip to Shimla is an amazing experience! 🚌\n\n🚌 By Bus:\n• HRTC buses from Delhi ISBT: ~10 hours\n• Volvo AC buses: ₹700–₹1,200\n• From Chandigarh: 3 hours, every 30 mins\n\n🚗 By Car/Self-Drive:\n• Delhi → Shimla: 365 km (~8 hours)\n• Chandigarh → Shimla: 115 km (~3 hours)\n• Route: NH5 (beautiful mountain highway)\n\n💡 Road Tips:\n• Drive slowly on mountain bends\n• Avoid night driving\n• Carry extra fuel after Chandigarh",
    quickReplies: [
      { id: 'local_transport', label: '🚕 Local Transport' },
      { id: 'travel_tips',     label: '💡 Road Trip Tips' },
      { id: 'transport',       label: '🚗 Back to Transport' },
      { id: 'main_menu',       label: '🏠 Main Menu' },
    ],
  },
  local_transport: {
    message: "Getting around Shimla is easy! 🚕\n\n🚕 Taxi / Cab:\n• Available 24/7 at main taxi stands\n• App: Ola & Uber (limited), local taxi apps\n• Hire for full day: ₹1,500–₹2,500\n\n🚌 Local Bus (HRTC):\n• Cheap & frequent — ₹10–₹50 per ride\n• Connects all major areas\n\n🚡 Lift (Elevator):\n• Free elevator connects lower & upper Shimla\n• Great for avoiding steep climbs!\n\n🦶 Walking:\n• Mall Road area is pedestrian-only\n• Most attractions within walking distance",
    quickReplies: [
      { id: 'transport', label: '🚗 How to Reach Shimla' },
      { id: 'main_menu', label: '🏠 Main Menu' },
    ],
  },
  travel_tips: {
    message: "Here are essential tips for a great Shimla trip! 💡",
    quickReplies: [
      { id: 'packing_tips',  label: '🎒 What to Pack' },
      { id: 'weather_tips',  label: '🌤️ Weather Tips' },
      { id: 'safety_tips',   label: '🛡️ Safety Tips' },
      { id: 'main_menu',     label: '🏠 Main Menu' },
    ],
  },
  packing_tips: {
    message: "Here's your complete Shimla packing checklist! 🎒\n\n🧥 Clothing:\n• Warm jacket / heavy coat (essential even in summer)\n• Woolen sweaters & thermals\n• Comfortable walking shoes / trekking boots\n• Rain jacket or poncho (for monsoon)\n• Gloves, muffler & warm cap (winter)\n\n🎒 Essentials:\n• Sunscreen SPF 50+ (UV is strong at altitude)\n• Sunglasses & lip balm\n• Personal medicines & first aid\n• Power bank (long sightseeing days)\n• Cash (many small shops don't take UPI)\n\n💡 Tip: Pack light — carry-on only if possible!",
    quickReplies: [
      { id: 'weather_tips', label: '🌤️ Weather Tips' },
      { id: 'travel_tips',  label: '💡 Back to Tips' },
      { id: 'main_menu',    label: '🏠 Main Menu' },
    ],
  },
  weather_tips: {
    message: "Shimla weather tips you must know! 🌤️\n\n❄️ Winter (Nov–Feb): 0°C to 10°C\n• Heavy snowfall possible\n• Roads may close — check before traveling\n• Carry heavy woolens, thermals, waterproof boots\n\n🌸 Spring (Mar–Apr): 8°C to 20°C\n• Pleasant, light jacket needed\n• Great for sightseeing\n\n☀️ Summer (May–Jun): 15°C to 30°C\n• Warm days, cool nights\n• Light woolens for evenings\n\n🌧️ Monsoon (Jul–Sep): 15°C to 25°C\n• Heavy rains — avoid steep treks\n• Carry rain gear\n\n💡 Always check: weather.com or IMD forecast before leaving!",
    quickReplies: [
      { id: 'best_time',    label: '📅 Best Time to Visit' },
      { id: 'packing_tips', label: '🎒 Packing Tips' },
      { id: 'main_menu',    label: '🏠 Main Menu' },
    ],
  },
  safety_tips: {
    message: "Stay safe during your Shimla trip! 🛡️\n\n✅ General Safety:\n• Keep copies of ID & travel documents\n• Share itinerary with family/friends\n• Use only registered taxis\n• Avoid solo night trekking\n\n⚠️ At Jakhu Temple:\n• Hold bags tight — monkeys snatch food & valuables!\n• Don't feed monkeys\n\n🏔️ Mountain Safety:\n• Don't go beyond safety barriers at viewpoints\n• Wear proper footwear on snowy paths\n• Check road conditions before mountain drives\n\n🚨 Emergency Numbers:\n• Police: 100\n• Ambulance: 108\n• Tourist Helpline: 1800-180-8080",
    quickReplies: [
      { id: 'emergency',   label: '🚨 Emergency Contacts' },
      { id: 'travel_tips', label: '💡 More Tips' },
      { id: 'main_menu',   label: '🏠 Main Menu' },
    ],
  },
  honeymoon_packages: {
    message: "Shimla is a dream honeymoon destination! 💑 Let me help you plan the perfect romantic getaway!",
    quickReplies: [
      { id: 'romantic_hotels',  label: '🏨 Romantic Hotels' },
      { id: 'couple_activities',label: '💕 Couple Activities' },
      { id: 'candle_dinner',    label: '🕯️ Candlelight Dinner' },
      { id: 'pricing',          label: '💰 Honeymoon Pricing' },
      { id: 'main_menu',        label: '🏠 Main Menu' },
    ],
  },
  romantic_hotels: {
    message: "We have handpicked romantic hotels for couples! 🏨\n\n💑 Top Romantic Hotels in Shimla:\n• Oberoi Cecil — heritage luxury, mountain views\n• Wildflower Hall — forest resort, fireplace rooms\n• Radisson Hotel — stunning valley views, spa\n• Hotel Combermere — heritage charm, central location\n• Woodville Palace — royal stay, lush gardens\n\n🌹 Romantic Room Features:\n• Fireplace rooms available\n• Private balcony with Himalayan views\n• Jacuzzi & couple spa\n• Rose petal & chocolate welcome\n\n💰 Honeymoon packages from ₹8,000/night",
    quickReplies: [
      { id: 'candle_dinner',     label: '🕯️ Candlelight Dinner' },
      { id: 'couple_activities', label: '💕 Couple Activities' },
      { id: 'speak_agent',       label: '👤 Book Now' },
      { id: 'main_menu',         label: '🏠 Main Menu' },
    ],
  },
  couple_activities: {
    message: "Make your honeymoon unforgettable! 💕\n\n🌹 Romantic Activities for Couples:\n• Sunset point at Jakhu Hill — magical golden hour\n• Horse riding through apple orchards\n• Toy train ride — nostalgic & scenic 🚂\n• Picnic at Chadwick Falls\n• Stargazing at Chail (least light pollution)\n• Spa & couple massage packages\n• Snow walk at Kufri (winter)\n• Photography at Christ Church at dusk\n\n💡 Most romantic month: December (snowfall) & April (blooms)",
    quickReplies: [
      { id: 'candle_dinner',    label: '🕯️ Candlelight Dinner' },
      { id: 'romantic_hotels',  label: '🏨 Romantic Hotels' },
      { id: 'honeymoon_packages', label: '💑 Honeymoon Packages' },
      { id: 'main_menu',        label: '🏠 Main Menu' },
    ],
  },
  candle_dinner: {
    message: "A candlelight dinner in Shimla is truly magical! 🕯️\n\n🍷 Top Restaurants for Romantic Dinners:\n• Eighteen 71 (Oberoi Cecil) — fine dining, valley view\n• The Goofa — cave restaurant, unique experience\n• Cafe Simla Times — rooftop, colonial ambiance\n• Baljees Restaurant — classic Shimla dining since 1960s\n• Wake & Bake — cozy cafe for couples\n\n💰 Average Cost: ₹1,500–₹4,000 per couple\n📅 Reservation: Book 1 day in advance (especially weekends)\n\n💡 Tip: Ask your hotel to arrange a private terrace dinner — most luxury hotels offer this!",
    quickReplies: [
      { id: 'food',              label: '🍽️ More Food Options' },
      { id: 'couple_activities', label: '💕 More Activities' },
      { id: 'speak_agent',       label: '👤 Book a Package' },
      { id: 'main_menu',         label: '🏠 Main Menu' },
    ],
  },
  family_packages: {
    message: "Shimla is perfect for a family vacation! 👨‍👩‍👧 Let me help plan your family trip!",
    quickReplies: [
      { id: 'family_hotels',     label: '🏨 Family-Friendly Hotels' },
      { id: 'family_sightseeing',label: '🗺️ Family Sightseeing' },
      { id: 'budget_family',     label: '💰 Budget Family Packages' },
      { id: 'main_menu',         label: '🏠 Main Menu' },
    ],
  },
  family_hotels: {
    message: "The best family-friendly hotels in Shimla! 🏨\n\n👨‍👩‍👧 Top Family Hotels:\n• Hotel Willow Banks — large rooms, kids play area\n• Clarkes Hotel — historic, central, spacious\n• Holiday Home Resort — garden, family suites\n• Kufri Holiday Resort — snow activities on property\n• Hotel White — budget, great location, family rooms\n\n✅ Family Amenities:\n• Kids play area & indoor games\n• Family rooms (sleeps 4–6)\n• Doctor on call\n• Babysitting on request\n• In-house restaurant with kids menu\n\n💰 Family rooms from ₹2,500/night",
    quickReplies: [
      { id: 'family_sightseeing', label: '🗺️ Family Activities' },
      { id: 'budget_family',      label: '💰 Budget Packages' },
      { id: 'speak_agent',        label: '👤 Book Now' },
      { id: 'main_menu',          label: '🏠 Main Menu' },
    ],
  },
  family_sightseeing: {
    message: "Kids and parents will love these activities! 🗺️\n\n👨‍👩‍👧 Top Family Activities:\n• Toy Train Ride — kids absolutely love it! 🚂\n• Kufri Fun World — amusement park & snow rides\n• Himalayan Nature Park — see Himalayan wildlife\n• State Museum Shimla — interactive & educational\n• Adventure Zone at Jakhu — zip-lining, slides\n• Apple Orchards tour — pick fresh apples!\n• Horse riding for kids at Chota Shimla\n\n💡 Kid Tip: Carry snacks, extra warm clothes, and avoid afternoon heat in summer months.",
    quickReplies: [
      { id: 'activities',    label: '🏔️ All Activities' },
      { id: 'family_hotels', label: '🏨 Family Hotels' },
      { id: 'main_menu',     label: '🏠 Main Menu' },
    ],
  },
  budget_family: {
    message: "Great family trips don't need to be expensive! 💰\n\n🏷️ Budget Family Package (per family of 4):\n\n📦 3 Nights / 4 Days — starting ₹12,000:\n• 3-star hotel accommodation\n• Daily breakfast included\n• Kufri & Mall Road sightseeing\n• Toy train experience\n• Airport/bus stand pickup & drop\n\n📦 5 Nights / 6 Days — starting ₹22,000:\n• All above + Chail day trip\n• Nature walk & horse riding\n• 1 adventure activity included\n\n💡 Off-Season Deals (Jul–Aug): Up to 40% discount!",
    quickReplies: [
      { id: 'discounts',         label: '🎁 Current Offers' },
      { id: 'speak_agent',       label: '👤 Get Custom Quote' },
      { id: 'family_sightseeing',label: '🗺️ Family Activities' },
      { id: 'main_menu',         label: '🏠 Main Menu' },
    ],
  },
  nearby_destinations: {
    message: "Shimla has amazing destinations nearby! 📍 Where would you like to explore?",
    quickReplies: [
      { id: 'manali',    label: '🏔️ Manali' },
      { id: 'kullu',     label: '🌊 Kullu' },
      { id: 'chail',     label: '🌲 Chail' },
      { id: 'narkanda',  label: '⛷️ Narkanda' },
      { id: 'main_menu', label: '🏠 Main Menu' },
    ],
  },
  manali: {
    message: "Manali — the adventure capital of Himachal! 🏔️\n\n📍 Distance from Shimla: 260 km (~7 hours)\n\n🌟 Top Attractions:\n• Rohtang Pass — snow, views, adventure\n• Solang Valley — skiing, paragliding, zorbing\n• Hadimba Temple — ancient wood temple in forest\n• Old Manali — cafes, hippie vibe, riverside\n• Beas River — camping & rafting\n\n🕐 Best Time: Oct–June (Rohtang open)\n💰 Budget: ₹5,000–₹15,000 for 3 nights\n\n💡 Shimla + Manali combo packages available — ask our agent!",
    quickReplies: [
      { id: 'package_info',        label: '📦 Combo Packages' },
      { id: 'nearby_destinations', label: '📍 Other Destinations' },
      { id: 'speak_agent',         label: '👤 Book a Trip' },
      { id: 'main_menu',           label: '🏠 Main Menu' },
    ],
  },
  kullu: {
    message: "Kullu — the Valley of Gods! 🌊\n\n📍 Distance from Shimla: 220 km (~6 hours)\n\n🌟 Top Highlights:\n• Beas River — white water rafting thrills!\n• Kullu Dussehra Festival — famous worldwide (October)\n• Great Himalayan National Park — UNESCO site\n• Bijli Mahadev Temple — ancient hilltop temple\n• Kasol — budget traveler's paradise nearby\n\n🎭 Best Season: October (Dussehra Festival)\n🏄 Rafting Season: July–September\n💰 Budget: ₹4,000–₹10,000 for 2 nights",
    quickReplies: [
      { id: 'manali',              label: '🏔️ Manali Nearby' },
      { id: 'nearby_destinations', label: '📍 Other Destinations' },
      { id: 'main_menu',           label: '🏠 Main Menu' },
    ],
  },
  chail: {
    message: "Chail — Shimla's peaceful secret getaway! 🌲\n\n📍 Distance from Shimla: 44 km (~1.5 hours)\n\n🌟 Top Highlights:\n• World's highest cricket ground (2444 m)!\n• Chail Wildlife Sanctuary — deer, leopards, birds\n• Chail Palace Hotel — stunning heritage stay\n• Apple & peach orchards everywhere\n• Sadhupul — riverside picnic spot\n\n🌟 Why Visit Chail:\n• Less crowded than Shimla\n• Perfect for peace & nature lovers\n• Great for photography\n\n💰 Day trip from Shimla: ₹1,200–₹1,800 by taxi",
    quickReplies: [
      { id: 'narkanda',            label: '⛷️ Narkanda Next' },
      { id: 'nearby_destinations', label: '📍 Other Destinations' },
      { id: 'main_menu',           label: '🏠 Main Menu' },
    ],
  },
  narkanda: {
    message: "Narkanda — Himachal's hidden ski paradise! ⛷️\n\n📍 Distance from Shimla: 65 km (~2 hours)\n\n🌟 Top Highlights:\n• Hatu Peak (3400 m) — best panoramic views!\n• Skiing & snow activities (Dec–Feb)\n• Less crowded than Kufri — more authentic experience\n• Apple Belt — beautiful orchards (Aug–Oct)\n• Tannu Jubber Lake — serene, peaceful\n\n❄️ Skiing at Narkanda:\n• Slopes for beginners & advanced\n• Equipment rental: ₹400/hour\n• Instructor available: ₹500/hour\n\n💡 Tip: Combine with Rampur & Sarahan for a longer Himachal road trip!",
    quickReplies: [
      { id: 'skiing',              label: '⛷️ Skiing Info' },
      { id: 'nearby_destinations', label: '📍 Other Destinations' },
      { id: 'main_menu',           label: '🏠 Main Menu' },
    ],
  },
  food: {
    message: "Shimla has amazing food you must try! 🍽️",
    quickReplies: [
      { id: 'himachali_food', label: '🍛 Local Himachali Dishes' },
      { id: 'best_cafes',     label: '☕ Best Cafes' },
      { id: 'street_food',    label: '🥟 Street Food' },
      { id: 'main_menu',      label: '🏠 Main Menu' },
    ],
  },
  himachali_food: {
    message: "Must-try Himachali dishes in Shimla! 🍛\n\n🌟 Traditional Dishes:\n• Dham — festive thali with dal, rice, kadhi, meetha\n• Siddu — steamed wheat bread with ghee\n• Chha Gosht — marinated mutton in yogurt gravy\n• Aktori — buckwheat pancakes\n• Babru — kachori with black gram filling\n• Tudkiya Bhath — spiced rice with lentils\n• Patande — Himachali crepes with jaggery\n\n🍎 Himachal Specials:\n• Fresh apple juice & apple cider\n• Rhododendron juice (Buransh)\n• Local honey — try at any roadside shop!\n\n📍 Best Place: Baljees Restaurant, Ashiana on The Ridge",
    quickReplies: [
      { id: 'best_cafes',  label: '☕ Best Cafes' },
      { id: 'street_food', label: '🥟 Street Food' },
      { id: 'food',        label: '🍽️ Food Menu' },
      { id: 'main_menu',   label: '🏠 Main Menu' },
    ],
  },
  best_cafes: {
    message: "Shimla's cafes are as beautiful as the views! ☕\n\n🌟 Top Cafes in Shimla:\n• Cafe Simla Times — rooftop, colonial vibe, great coffee\n• Wake & Bake Cafe — cozy, wooden interiors, best brownies!\n• Maria Brothers Cafe — heritage charm, book collection\n• Cafe 1947 — vintage themed, amazing views\n• Honey Hut Cafe — local honey products, peaceful\n• Himani's — budget cafe loved by locals\n\n☕ Must Try:\n• Kashmiri Kehwa tea\n• Himachali apple cider\n• Nutella crepes\n• Maggi with mountain views (iconic!)\n\n💡 Tip: Go to rooftop cafes at golden hour for the best experience!",
    quickReplies: [
      { id: 'himachali_food', label: '🍛 Local Dishes' },
      { id: 'mall_road',      label: '🛍️ Mall Road Nearby' },
      { id: 'main_menu',      label: '🏠 Main Menu' },
    ],
  },
  street_food: {
    message: "Shimla's street food is absolutely delicious! 🥟\n\n🌟 Must Try Street Foods:\n• Momos (steamed/fried dumplings) — everywhere!\n• Corn on the cob with masala — Mall Road staple\n• Chhole Bhature — hot & spicy\n• Aloo Tikki Chaat — crispy & tangy\n• Maggi noodles — every mountain, every viewpoint!\n• Bread Pakora — local breakfast favourite\n• Golgappe / Pani Puri\n• Fresh apple juice from cart vendors\n\n📍 Best Street Food Areas:\n• Lower Bazaar — most authentic\n• Mall Road evening stalls\n• Near Bus Stand\n\n💡 Tip: Carry hand sanitizer — eat from busy stalls!",
    quickReplies: [
      { id: 'best_cafes',     label: '☕ Sit-Down Cafes' },
      { id: 'himachali_food', label: '🍛 Local Dishes' },
      { id: 'main_menu',      label: '🏠 Main Menu' },
    ],
  },
  discounts: {
    message: "Great news — we have amazing offers! 🎁",
    quickReplies: [
      { id: 'seasonal_offers', label: '🌤️ Seasonal Offers' },
      { id: 'group_discounts', label: '👥 Group Discounts' },
      { id: 'early_booking',   label: '📅 Early Bird Deals' },
      { id: 'main_menu',       label: '🏠 Main Menu' },
    ],
  },
  seasonal_offers: {
    message: "Our seasonal offers are here! 🌤️\n\n🎉 Current Offers:\n\n☀️ Summer Special (May–June):\n• 15% off all hill-view rooms\n• Free breakfast for families\n• Kids below 12 stay FREE\n\n🌧️ Monsoon Deals (Jul–Sep):\n• Up to 40% off hotel bookings\n• Free adventure activity with packages\n• Couple packages at ₹5,999\n\n❄️ Winter Wonderland (Dec–Jan):\n• Snow experience packages from ₹7,999\n• Complimentary skiing session\n• Hot chocolate & bonfire evenings\n\n💡 Offers are time-limited — book now to lock prices!",
    quickReplies: [
      { id: 'early_booking', label: '📅 Early Bird Deals' },
      { id: 'speak_agent',   label: '👤 Book This Offer' },
      { id: 'main_menu',     label: '🏠 Main Menu' },
    ],
  },
  group_discounts: {
    message: "Planning a group trip? We have great group deals! 👥\n\n🎉 Group Discounts:\n\n👥 Group Size 10–20 people:\n• 10% off total package price\n• Free group coordinator\n• 1 complimentary meal\n\n👥 Group Size 21–50 people:\n• 20% off total package price\n• Dedicated trip manager\n• Free airport transfers\n• Group photo session included\n\n👥 Group Size 50+ people:\n• Custom pricing\n• Exclusive hotel floors\n• Personalized itinerary\n• 24/7 dedicated support\n\n💡 Perfect for: Corporate trips, school tours, college groups, wedding parties!",
    quickReplies: [
      { id: 'speak_agent',    label: '👤 Get Group Quote' },
      { id: 'early_booking',  label: '📅 Early Bird Deals' },
      { id: 'main_menu',      label: '🏠 Main Menu' },
    ],
  },
  early_booking: {
    message: "Book early and save big! 📅\n\n🐦 Early Bird Discount Policy:\n\n⏰ 60+ days before travel:\n• 25% off on all packages\n• Free room upgrade (subject to availability)\n• Full refund on cancellation\n\n⏰ 30–60 days before travel:\n• 15% off on all packages\n• Free breakfast included\n\n⏰ 15–30 days before travel:\n• 10% off on packages\n\n✅ Why Book Early:\n• Best room selection\n• Guaranteed availability during peak season\n• Lock current prices (prices rise closer to travel)\n\n💡 Peak seasons: May–June & December — book 2 months ahead!",
    quickReplies: [
      { id: 'speak_agent',     label: '👤 Book Now & Save' },
      { id: 'seasonal_offers', label: '🌤️ Seasonal Offers' },
      { id: 'main_menu',       label: '🏠 Main Menu' },
    ],
  },
  emergency: {
    message: "Important emergency contacts for your safety in Shimla 🚨\n\n🚔 Police: 100\n🚑 Ambulance: 108\n🚒 Fire: 101\n📞 Tourist Helpline: 1800-180-8080 (toll-free)\n🏥 IGMC Hospital Shimla: 0177-2658540\n🏥 Deen Dayal Hospital: 0177-2621063\n📞 Shimla Police Control: 0177-2620094\n\n🆘 Shimla Travels Emergency:\n📞 +91 98765 43210 (24/7)\n📧 emergency@shimlatravels.com\n\n💡 Save these numbers before your trip!",
    quickReplies: [
      { id: 'safety_tips', label: '🛡️ Safety Tips' },
      { id: 'speak_agent', label: '👤 Contact Our Team' },
      { id: 'main_menu',   label: '🏠 Main Menu' },
    ],
  },
  local_events: {
    message: "Shimla hosts amazing festivals and events! 🎉\n\n🗓️ Annual Events & Festivals:\n\n❄️ Ice Skating Carnival (Jan):\n• Asia's only natural ice skating rink!\n• Shimla Ice Skating Club events\n\n🌸 Summer Festival (May–Jun):\n• Cultural performances, folk dances\n• Food festival, craft fair\n• Music concerts on The Ridge\n\n🎭 Kullu Dussehra (Oct):\n• 7-day festival — 200+ deities arrive!\n• UNESCO recognized cultural event\n\n🏔️ Winter Carnival at Kufri (Jan):\n• Skiing competitions\n• Snow sculptures\n• Cultural programs\n\n💡 Planning around a festival? Ask our team for festival packages!",
    quickReplies: [
      { id: 'tourist_places', label: '🗺️ Tourist Places' },
      { id: 'package_info',   label: '📦 Festival Packages' },
      { id: 'speak_agent',    label: '👤 Book Around Events' },
      { id: 'main_menu',      label: '🏠 Main Menu' },
    ],
  },
  chatbot_help: {
    message: "Here's everything I can help you with! 🤖\n\n🗺️ Destination Info:\nTourist places, nearby destinations, best time to visit\n\n🏨 Hotels & Packages:\nHotel details, amenities, check-in times, pricing, honeymoon & family packages\n\n🏔️ Activities:\nTrekking, skiing, toy train, shopping, adventure sports\n\n🍽️ Food & Cafes:\nLocal dishes, best cafes, street food guide\n\n🚗 Transport:\nHow to reach Shimla by air, train, road & local transport\n\n💡 Travel Tips:\nPacking list, weather tips, safety tips\n\n🎁 Offers:\nSeasonal deals, group discounts, early bird offers\n\n📋 Booking Help:\nBooking issues, payments, refunds, cancellations\n\n☎️ Support:\nTalk to a human agent anytime!",
    quickReplies: [
      { id: 'tourist_places', label: '🗺️ Explore Shimla' },
      { id: 'package_info',   label: '📦 View Packages' },
      { id: 'discounts',      label: '🎁 See Offers' },
      { id: 'speak_agent',    label: '👤 Talk to Agent' },
      { id: 'main_menu',      label: '🏠 Main Menu' },
    ],
  },
  default: {
    message: "I'm not sure I understood that 🤔 Here's what I can help with:",
    quickReplies: [
      { id: 'hotel_details',   label: '🏨 Hotels' },
      { id: 'package_info',    label: '📦 Packages' },
      { id: 'booking_issue',   label: '📋 Bookings' },
      { id: 'payment_problem', label: '💳 Payments' },
      { id: 'speak_agent',     label: '👤 Talk to Agent' },
      { id: 'main_menu',       label: '🏠 Main Menu' },
    ],
  },
};

export default function ContactUs() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="c-page">

      {/* ===== PC HERO ===== */}
      <section className="c-hero">
        <div className="c-hero-background">
          <div className="c-hero-background-image"></div>
        </div>
        <div className="c-hero-content c-fade-in">
          <h1 className="c-hero-title">Get in Touch</h1>
          <p className="c-hero-subtitle">
            Your journey to the hills begins with a conversation.
            We're here to help plan your perfect Shimla escape.
          </p>
          <div className="c-hero-badges">
            <div className="c-hero-badge"><Clock size={16} /><span>24/7 Support</span></div>
            <div className="c-hero-badge"><MessageCircle size={16} /><span>Instant Response</span></div>
          </div>
        </div>
      </section>

      {/* ===== MOBILE HERO ===== */}
      <section className="c-mobile-hero">
        <div className="c-mobile-hero-content">
          <span className="c-mobile-hero-tag">Contact Us</span>
          <h1 className="c-mobile-hero-title">Let's Start Your Journey</h1>
          <p className="c-mobile-hero-subtitle">Plan your perfect Shimla escape with our travel experts</p>
          <div className="c-mobile-quick-actions">
            <a href="tel:+919876543210" className="c-mobile-quick-btn c-mobile-quick-btn--call">
              <Phone size={20} /><span>Call Now</span>
            </a>
            <a href="https://wa.me/919876543210" className="c-mobile-quick-btn c-mobile-quick-btn--whatsapp">
              <MessageSquare size={20} /><span>WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== PC CONTACT CARDS ===== */}
      <section className="c-cards-section">
        <div className="c-cards-grid">
          <div className="c-contact-card">
            <div className="c-card-icon" style={{ background: 'linear-gradient(135deg,#059669,#0d9488)' }}>
              <Phone color="white" />
            </div>
            <h3 className="c-card-title">Phone Support</h3>
            <p className="c-card-highlight">+91 98765 43210</p>
            <p className="c-card-highlight">+91 88990 11223</p>
            <p className="c-card-description">Available 24/7 for your queries</p>
          </div>
          <div className="c-contact-card">
            <div className="c-card-icon" style={{ background: 'linear-gradient(135deg,#06b6d4,#2563eb)' }}>
              <Mail color="white" />
            </div>
            <h3 className="c-card-title">Email Support</h3>
            <p className="c-card-highlight-blue">support@shimlatravels.com</p>
            <p className="c-card-highlight-blue">info@shimlatravel.com</p>
            <p className="c-card-description">Quick email responses within hours</p>
          </div>
          <div className="c-contact-card">
            <div className="c-card-icon" style={{ background: 'linear-gradient(135deg,#14b8a6,#059669)' }}>
              <MapPin color="white" />
            </div>
            <h3 className="c-card-title">Visit Our Office</h3>
            <p className="c-card-highlight">Shimla Travel Agency</p>
            <p className="c-card-highlight">Mall Road, Shimla</p>
            <p className="c-card-description">Mon – Sat: 9:00AM – 7:00PM</p>
          </div>
        </div>
      </section>

      {/* ===== MOBILE CONTACT CARDS ===== */}
      <section className="c-mobile-contact-section">
        <div className="c-mobile-section-header">
          <h2>Get in Touch</h2>
          <p>Multiple ways to reach us</p>
        </div>
        <div className="c-mobile-contact-grid">
          <a href="tel:+919876543210" className="c-mobile-contact-card">
            <div className="c-mobile-contact-icon c-mobile-contact-icon--phone"><Phone size={24} color="white" /></div>
            <div className="c-mobile-contact-info">
              <h3>Phone</h3>
              <p className="c-mobile-contact-main">+91 98765 43210</p>
              <p className="c-mobile-contact-sub">Tap to call • 24/7 Available</p>
            </div>
          </a>
          <a href="mailto:support@shimlatravels.com" className="c-mobile-contact-card">
            <div className="c-mobile-contact-icon c-mobile-contact-icon--email"><Mail size={24} color="white" /></div>
            <div className="c-mobile-contact-info">
              <h3>Email</h3>
              <p className="c-mobile-contact-main">support@shimlatravels.com</p>
              <p className="c-mobile-contact-sub">Tap to email • Quick response</p>
            </div>
          </a>
          <div className="c-mobile-contact-card c-mobile-contact-card--static">
            <div className="c-mobile-contact-icon c-mobile-contact-icon--location"><MapPin size={24} color="white" /></div>
            <div className="c-mobile-contact-info">
              <h3>Visit Us</h3>
              <p className="c-mobile-contact-main">Mall Road, Shimla</p>
              <p className="c-mobile-contact-sub">Mon-Sat • 9AM - 7PM</p>
            </div>
          </div>
          <div className="c-mobile-contact-card c-mobile-contact-card--static">
            <div className="c-mobile-contact-icon c-mobile-contact-icon--hours"><Clock size={24} color="white" /></div>
            <div className="c-mobile-contact-info">
              <h3>Working Hours</h3>
              <p className="c-mobile-contact-main">9:00 AM - 7:00 PM</p>
              <p className="c-mobile-contact-sub">Monday to Saturday</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PC INFO + FORM ===== */}
      <section className="c-info-section">
        <div>
          <h2 className="c-info-title">
            Let's Plan Your Perfect
            <span className="c-info-gradient-text"> Shimla Adventure</span>
          </h2>
          <p className="c-info-text">
            Whether you're planning a family vacation, a romantic getaway, or an adventure trip,
            our team of travel experts is ready to craft the perfect itinerary for you.
          </p>
          <div className="c-info-card-green">
            <div className="c-info-icon">✓</div>
            <div className="c-info-text"><h4>Personalized Itineraries</h4><p>Custom tour packages designed just for you</p></div>
          </div>
          <div className="c-info-card-blue">
            <div className="c-info-icon">✓</div>
            <div className="c-info-text"><h4>Best Price Guarantee</h4><p>Competitive rates with no hidden charges</p></div>
          </div>
          <div className="c-info-card-teal">
            <div className="c-info-icon">✓</div>
            <div className="c-info-text"><h4>24/7 Support</h4><p>Always here when you need us most</p></div>
          </div>
        </div>
        <div className="c-form-container">
          <h3 className="c-form-title">Send Us a Message</h3>
          <p className="c-form-subtitle">We'll get back to you shortly</p>
          <form onSubmit={handleSubmit}>
            <div className="c-form-group">
              <input name="name" value={formData.name} onChange={handleChange} className="c-form-input" required />
              <label className="c-form-label">Your Name</label>
            </div>
            <div className="c-form-group">
              <input name="email" value={formData.email} onChange={handleChange} className="c-form-input" required />
              <label className="c-form-label">Email Address</label>
            </div>
            <div className="c-form-group">
              <input name="phone" value={formData.phone} onChange={handleChange} className="c-form-input" required />
              <label className="c-form-label">Phone Number</label>
            </div>
            <div className="c-form-group">
              <textarea name="message" value={formData.message} onChange={handleChange} className="c-form-textarea" rows="4" required />
              <label className="c-form-label">Your Message</label>
            </div>
            <button className="c-submit-button" disabled={loading}>
              {loading ? 'Sending...' : <><span>Send Message</span> <Send size={18} /></>}
            </button>
          </form>
        </div>
      </section>

      {/* ===== MOBILE FORM ===== */}
      <section className="c-mobile-form-section">
        <div className="c-mobile-section-header">
          <h2>Send a Message</h2>
          <p>We'll respond within 24 hours</p>
        </div>
        <div className="c-mobile-form-container">
          <form onSubmit={handleSubmit} className="c-mobile-form">
            <div className="c-mobile-form-group">
              <label className="c-mobile-form-label">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="c-mobile-form-input" placeholder="Enter your full name" required />
            </div>
            <div className="c-mobile-form-group">
              <label className="c-mobile-form-label">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="c-mobile-form-input" placeholder="your@email.com" required />
            </div>
            <div className="c-mobile-form-group">
              <label className="c-mobile-form-label">Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="c-mobile-form-input" placeholder="+91 98765 43210" required />
            </div>
            <div className="c-mobile-form-group">
              <label className="c-mobile-form-label">Your Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} className="c-mobile-form-textarea" rows="5" placeholder="Tell us about your travel plans..." required />
            </div>
            <button type="submit" className="c-mobile-submit-button" disabled={loading}>
              {loading ? <span className="c-mobile-loading-text">Sending...</span> : <><span>Send Message</span><Send size={20} /></>}
            </button>
          </form>
        </div>
      </section>

      {/* ===== MOBILE MAP ===== */}
      <section className="c-mobile-map-section">
        <div className="c-mobile-section-header">
          <h2>Find Our Office</h2>
          <p>Located on Mall Road, Shimla</p>
        </div>
        <div className="c-mobile-map-container">
          <iframe title="Shimla Map" className="c-mobile-map-frame"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.9633241093907!2d77.17097247535095!3d31.10481497438032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390578dfd7bf0f1f%3A0xf3ddc61f001e0e5c!2sShimla%2C%20Himachal%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000"
            loading="lazy" allowFullScreen />
          <a href="https://maps.google.com/?q=Shimla,Mall+Road" target="_blank" rel="noopener noreferrer" className="c-mobile-directions-btn">
            <Navigation size={18} /><span>Get Directions</span>
          </a>
        </div>
      </section>

      {/* ===== PC MAP ===== */}
      <section className="c-map-container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 className="c-info-title">Find Us on the Map</h2>
          <p className="c-info-text">Located in the heart of Shimla's famous Mall Road</p>
        </div>
        <iframe title="Shimla Map" className="c-map-frame"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.9633241093907!2d77.17097247535095!3d31.10481497438032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390578dfd7bf0f1f%3A0xf3ddc61f001e0e5c!2sShimla%2C%20Himachal%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000"
          loading="lazy" allowFullScreen />
      </section>

      {/* ===== SUCCESS POPUP ===== */}
      {showSuccess && (
        <div className="c-popup-overlay c-fade-in">
          <div className="c-popup c-scale-in">
            <div className="c-popup-icon c-bounce-once"><Check color="white" size={36} /></div>
            <h3>Message Sent Successfully!</h3>
            <p>We will contact you shortly.</p>
            <button className="c-submit-button" onClick={() => setShowSuccess(false)}>Close</button>
          </div>
        </div>
      )}

      {/* ===== FOOTER ===== */}
      <footer className="c-main-footer">
        <div className="c-footer-container">
          <div className="c-footer-grid">
            <div className="c-footer-brand">
              <div className="c-brand-row">
                <Mountain className="c-brand-icon" />
                <span className="c-brand-name">Shimla Travels</span>
              </div>
              <p>Your gateway to experiencing the magical beauty of Shimla and creating unforgettable memories in the Himalayas.</p>
            </div>
            <div className="c-footer-col">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shimla#destinations">Destinations</Link></li>
                <li><Link to="/shimla#activities">Activities</Link></li>
                <li><Link to="/shimla#shimla-gallery">Gallery</Link></li>
              </ul>
            </div>
            <div className="c-footer-col">
              <h3>Travel Info</h3>
              <ul>
                <li><Link to="/packages">Travel Packages</Link></li>
                <li><Link to="/Hotel">Hotel Booking</Link></li>
                <li><Link to="/shimla#Travel">Travel Guide</Link></li>
                <li><Link to="/About#FAQs">FAQs</Link></li>
              </ul>
            </div>
            <div className="c-footer-col">
              <h3>Legal</h3>
              <ul>
                <li><Link to="/Terms#terms">Terms & Conditions</Link></li>
                <li><Link to="/Terms#privacy">Privacy Policy</Link></li>
                <li><Link to="/Terms#cancellation">Cancellation Policy</Link></li>
                <li><Link to="/Terms#payment">Payment Policy</Link></li>
              </ul>
            </div>
            <div className="c-footer-col">
              <h3>Follow Us</h3>
              <p className="c-footer-subtext">Stay connected for travel updates and inspiration</p>
              <div className="c-footer-socials">
                <a href="#"><Facebook /></a>
                <a href="#"><Instagram /></a>
                <a href="#"><Twitter /></a>
                <a href="#"><Youtube /></a>
              </div>
            </div>
          </div>
          <div className="c-footer-bottom">
            <p>© 2026 Shimla Travels. All rights reserved. Made with ❤️ for travelers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
