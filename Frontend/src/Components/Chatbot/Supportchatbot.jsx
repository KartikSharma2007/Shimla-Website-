// src/Components/Chatbot/Supportchatbot.jsx
//
// Receives two props:
//   isOpen  (bool) — controls visibility
//   onClose (fn)   — called when user clicks X
//
// All responses & logic are 100% identical to the original ContactUs chatbot.

import { useState, useEffect, useRef, useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// ── Smart keyword matcher — handles natural typed messages intelligently ──────
const getResponseKey = (text) => {
  const t = text.toLowerCase()
    // Normalize common typos and contractions
    .replace(/what's/g, 'what is')
    .replace(/i'm/g, 'i am')
    .replace(/don't/g, 'do not')
    .replace(/can't/g, 'cannot')
    .replace(/won't/g, 'will not')
    .replace(/isn't/g, 'is not')
    .replace(/\bwanna\b/g, 'want to')
    .replace(/\bgonna\b/g, 'going to')
    .replace(/\bpls\b|\bplz\b/g, 'please')
    .replace(/\binfo\b/g, 'information')
    .replace(/\btel\b|\btell me\b/g, 'show')
    .replace(/\bhotels\b/g, 'hotel')
    .replace(/\bpackages\b/g, 'package')
    .replace(/\brooms\b/g, 'room')
    .replace(/\btrips\b/g, 'trip')
    .replace(/\bprices\b|\bpricings\b/g, 'price')
    .replace(/\brates\b/g, 'rate')
    .replace(/\boffers\b/g, 'offer')
    .replace(/\bdeals\b/g, 'deal')
    .replace(/\bactivities\b/g, 'activity')
    .replace(/\btours\b/g, 'tour');

  // ── Greetings ──
  if (t.match(/\b(hi|hello|hey|hii|helo|namaste|good morning|good evening|good afternoon|howdy|greetings|sup|what is up)\b/)) return 'greeting';

  // ── Farewell / thanks ──
  if (t.match(/\b(thank|thanks|bye|goodbye|ok|okay|great|perfect|got it|noted|done|cya|see you|cheers|appreciate)\b/)) return 'farewell';

  // ── Chatbot help / capabilities ──
  if (t.match(/\b(what can you (do|help|assist)|chatbot|bot|assistant|feature|help me|how do you work|what do you (do|know|offer)|capabilities|menu)\b/)) return 'chatbot_help';

  // ── Hotel related — put before package to catch "hotel details", "show hotel" etc ──
  if (t.match(/\b(hotel|room|stay|accommodation|lodge|resort|hostel|guesthouse|bed and breakfast|bb)\b/)) return 'hotel_details';
  if (t.match(/\b(wifi|internet|amenities|facility|facilities|pool|gym|spa|breakfast|room service)\b/)) return 'hotel_amenities';
  if (t.match(/\b(check.?in|check.?out|checkin|checkout|arrival time|departure time|when can i check)\b/)) return 'checkin_time';

  // ── Package / tour related ──
  if (t.match(/\b(package|tour|trip|travel|itinerary|plan|holiday|vacation|getaway|tour plan|tour package)\b/)) return 'package_info';

  // ── Booking issues ──
  if (t.match(/\b(book|reserv|reservation|my booking|booking status|did my booking|confirm|confirmation)\b/)) return 'booking_issue';

  // ── Payment ──
  if (t.match(/\b(pay|payment|card|upi|gpay|phonepe|paytm|bhim|net banking|online payment|transaction|paid|how to pay)\b/)) return 'payment_problem';

  // ── Refund ──
  if (t.match(/\b(refund|money back|return|get my money|refunded|refund status|when will i get|where is my refund)\b/)) return 'refund_status';

  // ── Cancellation ──
  if (t.match(/\b(cancel|cancell|cancellation|cancel my booking|how to cancel|want to cancel)\b/)) return 'cancel_booking';

  // ── Speak to agent ──
  if (t.match(/\b(agent|human|support|staff|person|real person|customer care|helpdesk|connect me|talk to someone|speak to someone|representative)\b/)) return 'speak_agent';

  // ── Pricing ──
  if (t.match(/\b(price|cost|rate|fee|charge|how much|expensive|cheap|budget|tariff|pricing|per night|per person|total cost|how much does it cost|what does it cost|pricing detail)\b/)) return 'pricing';

  // ── Tourist places ──
  if (t.match(/\b(place|sight|tourist|attraction|visit|see|spot|landmark|viewpoint|mall road|kufri|jakhu|jakoo|christ church|monument|ridge|the ridge|indian institute|iias|chadwick|jakhoo)\b/)) return 'tourist_places';

  // ── Activities ──
  if (t.match(/\b(activity|trek|trekking|hike|hiking|ski|skiing|snow activity|toy train|adventure|sport|mountain biking|paragliding|camping|rappelling|what to do|things to do)\b/)) return 'activities';

  // ── Transport / how to reach ──
  if (t.match(/\b(transport|reach|bus|train|fly|flight|airport|road|how to come|how to get|directions|route|travel to shimla|getting to|get to shimla|nearest airport|taxi|cab|local transport|shuttle|auto)\b/)) return 'transport';

  // ── Travel tips ──
  if (t.match(/\b(tip|tips|pack|packing|safety|clothes|what to bring|guide|carry|must have|essentials|prepare|preparation|advice|suggest)\b/)) return 'travel_tips';

  // ── Honeymoon / romantic ──
  if (t.match(/\b(honeymoon|couple|romantic|romance|anniversary|valentine|newlywed|newly married|love trip|couple trip|couples package|romantic getaway)\b/)) return 'honeymoon_packages';

  // ── Family ──
  if (t.match(/\b(family|kid|child|children|parents|family trip|with kids|for kids|child friendly|family package|family vacation|toddler|baby|senior)\b/)) return 'family_packages';

  // ── Nearby destinations ──
  if (t.match(/\b(nearby|manali|kullu|chail|narkanda|around shimla|close to|near shimla|day trip|day trips from|excursion|side trip|neighboring)\b/)) return 'nearby_destinations';

  // ── Food ──
  if (t.match(/\b(food|eat|eating|restaurant|cafe|dish|cuisine|local food|himachali|where to eat|dining|snack|breakfast|lunch|dinner|street food|must eat|what to eat)\b/)) return 'food';

  // ── Discounts / offers ──
  if (t.match(/\b(discount|offer|deal|promo|coupon|early bird|group discount|sale|off percent|special offer|festival offer|festive|save money|best price|lowest price)\b/)) return 'discounts';

  // ── Best time / weather / season ──
  if (t.match(/\b(snow|snowfall|weather|temperature|climate|rain|cold|season|best time|when to visit|when should i|good time to visit|is it cold|is it hot|monsoon|summer|winter|spring|autumn|october|november|december|january|february|march|april|may|june|july|august|september)\b/)) return 'best_time';

  // ── Emergency ──
  if (t.match(/\b(emergency|hospital|police|ambulance|fire|helpline|urgent|sos|medical|accident|lost|missing|in danger)\b/)) return 'emergency';

  // ── Local events / festivals ──
  if (t.match(/\b(event|festival|fair|local event|celebration|carnival|mela|dussehra|diwali|christmas|new year|ice skating|summer festival|what is happening)\b/)) return 'local_events';

  // ── Account issues ──
  if (t.match(/\b(account|login|password|signup|register|sign in|sign up|forgot password|reset password|cannot login|not able to login|profile|my account)\b/)) return 'account_issues';

  // ── Shimla general (catch-all for shimla questions not caught above) ──
  if (t.match(/\b(shimla|himachal|himachal pradesh|hill station|mountains|himalayas)\b/)) return 'package_info';

  return 'default';
};

// ── Full response database — exact copy from original ContactUs.jsx ──────────
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
    quickReplies: [{ id: 'main_menu', label: '🏠 Ask Another Question' }],
  },

  tourist_places: {
    message: "Shimla has so many amazing places to explore! 🗺️ Which one interests you?",
    quickReplies: [
      { id: 'mall_road',           label: '🛍️ Mall Road' },
      { id: 'kufri',               label: '⛷️ Kufri' },
      { id: 'jakhu_temple',        label: '🛕 Jakhu Temple' },
      { id: 'christ_church',       label: '⛪ Christ Church' },
      { id: 'nearby_destinations', label: '📍 Nearby Destinations' },
      { id: 'main_menu',           label: '🏠 Main Menu' },
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
      { id: 'trekking',        label: '🥾 Trekking' },
      { id: 'skiing',          label: '⛷️ Skiing' },
      { id: 'toy_train',       label: '🚂 Toy Train Ride' },
      { id: 'shopping_shimla', label: '🛍️ Shopping' },
      { id: 'main_menu',       label: '🏠 Main Menu' },
    ],
  },
  trekking: {
    message: "Shimla has some incredible trekking trails! 🥾\n\n🌟 Popular Treks:\n• Jakhu Hill Trek — 2.5 km, easy, great views\n• Shali Tibba Trek — 8 km, moderate, dense forest\n• Chail–Kufri Trek — 12 km, moderate\n• Hatu Peak Trek (Narkanda) — 4 km, stunning panorama\n• Churdhar Trek — 16 km, advanced, highest peak in outer Himalayas\n\n🧳 What to Carry:\n• Trekking shoes, warm layers, water, snacks\n• First aid kit, sunscreen, walking stick\n\n💡 Best Season: April–June & Sept–November",
    quickReplies: [
      { id: 'travel_tips',         label: '💡 Travel Tips' },
      { id: 'nearby_destinations', label: '📍 Nearby Treks' },
      { id: 'activities',          label: '🏔️ Other Activities' },
      { id: 'main_menu',           label: '🏠 Main Menu' },
    ],
  },
  skiing: {
    message: "Shimla is a top skiing destination in India! ⛷️\n\n🌟 Best Skiing Spots:\n• Kufri — most popular, beginners & pros\n• Narkanda — less crowded, great slopes\n• Chail — scenic, peaceful setting\n\n📅 Ski Season: December – February\n💰 Cost: ₹500–₹2,000 per hour (gear included)\n\n🎿 What's Included:\n• Ski equipment rental\n• Trained instructors\n• Safety gear\n\n💡 No experience needed — instructors available for beginners!",
    quickReplies: [
      { id: 'kufri',         label: '⛷️ Kufri Info' },
      { id: 'package_types', label: '📦 Adventure Packages' },
      { id: 'activities',    label: '🏔️ Other Activities' },
      { id: 'main_menu',     label: '🏠 Main Menu' },
    ],
  },
  toy_train: {
    message: "The Shimla Toy Train is a UNESCO World Heritage experience! 🚂\n\n🌟 Kalka–Shimla Railway:\n• 96 km track through 102 tunnels & 864 bridges!\n• Built in 1903 by the British\n• Breathtaking views of valleys and forests\n• Journey time: ~5–6 hours\n• Passes through 18 major stations\n\n💰 Ticket Price: ₹25–₹400 (class-wise)\n🕐 First Train: 4:00 AM from Kalka\n📍 Book at: IRCTC or Shimla Railway Station\n\n💡 Tip: Book window seats on the right side for best views!",
    quickReplies: [
      { id: 'transport',  label: '🚗 How to Reach Shimla' },
      { id: 'activities', label: '🏔️ Other Activities' },
      { id: 'main_menu',  label: '🏠 Main Menu' },
    ],
  },
  shopping_shimla: {
    message: "Shimla is a shopper's paradise! 🛍️\n\n🌟 What to Buy:\n• Woolen shawls & Pashmina — Tibetan Market\n• Himachali caps & handicrafts\n• Dry fruits & local jams\n• Silver jewellery & wooden artifacts\n• Kangra paintings & thangkas\n\n📍 Best Shopping Areas:\n• Mall Road — main hub\n• Lakkar Bazaar — wooden crafts\n• Tibetan Market — shawls & carpets\n• Lower Bazaar — local & wholesale\n\n💡 Bargaining Tip: Prices are negotiable at Tibetan Market!",
    quickReplies: [
      { id: 'mall_road', label: '🛍️ Mall Road' },
      { id: 'food',      label: '🍽️ Where to Eat' },
      { id: 'main_menu', label: '🏠 Main Menu' },
    ],
  },
  transport: {
    message: "Getting to Shimla is easy! 🚗 Choose your mode of travel:",
    quickReplies: [
      { id: 'by_air',          label: '✈️ By Air' },
      { id: 'by_train',        label: '🚂 By Train' },
      { id: 'by_road',         label: '🚌 By Road' },
      { id: 'local_transport', label: '🚕 Local Transport' },
      { id: 'main_menu',       label: '🏠 Main Menu' },
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
      { id: 'packing_tips', label: '🎒 What to Pack' },
      { id: 'weather_tips', label: '🌤️ Weather Tips' },
      { id: 'safety_tips',  label: '🛡️ Safety Tips' },
      { id: 'main_menu',    label: '🏠 Main Menu' },
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
      { id: 'romantic_hotels',   label: '🏨 Romantic Hotels' },
      { id: 'couple_activities', label: '💕 Couple Activities' },
      { id: 'candle_dinner',     label: '🕯️ Candlelight Dinner' },
      { id: 'pricing',           label: '💰 Honeymoon Pricing' },
      { id: 'main_menu',         label: '🏠 Main Menu' },
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
      { id: 'candle_dinner',      label: '🕯️ Candlelight Dinner' },
      { id: 'romantic_hotels',    label: '🏨 Romantic Hotels' },
      { id: 'honeymoon_packages', label: '💑 Honeymoon Packages' },
      { id: 'main_menu',          label: '🏠 Main Menu' },
    ],
  },
  candle_dinner: {
    message: "A candlelight dinner in Shimla is truly magical! 🕯️\n\n🍷 Top Restaurants for Romantic Dinners:\n• Eighteen 71 (Oberoi Cecil) — fine dining, valley view\n• The Goofa — cave restaurant, unique experience\n• Cafe Simla Times — rooftop, colonial ambiance\n• Baljees Restaurant — classic Shimla dining since 1960s\n• Wake & Bake — cozy cafe for couples\n\n💰 Average Cost: ₹1,500–₹4,000 per couple\n📅 Reservation: Book 1 day in advance (especially weekends)\n\n💡 Tip: Ask your hotel to arrange a private terrace dinner!",
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
      { id: 'family_hotels',      label: '🏨 Family-Friendly Hotels' },
      { id: 'family_sightseeing', label: '🗺️ Family Sightseeing' },
      { id: 'budget_family',      label: '💰 Budget Family Packages' },
      { id: 'main_menu',          label: '🏠 Main Menu' },
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
    message: "Kids and parents will love these activities! 🗺️\n\n👨‍👩‍👧 Top Family Activities:\n• Toy Train Ride — kids absolutely love it! 🚂\n• Kufri Fun World — amusement park & snow rides\n• Himalayan Nature Park — see Himalayan wildlife\n• State Museum Shimla — interactive & educational\n• Adventure Zone at Jakhu — zip-lining, slides\n• Apple Orchards tour — pick fresh apples!\n• Horse riding for kids at Chota Shimla\n\n💡 Kid Tip: Carry snacks, extra warm clothes, and avoid afternoon heat.",
    quickReplies: [
      { id: 'activities',    label: '🏔️ All Activities' },
      { id: 'family_hotels', label: '🏨 Family Hotels' },
      { id: 'main_menu',     label: '🏠 Main Menu' },
    ],
  },
  budget_family: {
    message: "Great family trips don't need to be expensive! 💰\n\n🏷️ Budget Family Package (per family of 4):\n\n📦 3 Nights / 4 Days — starting ₹12,000:\n• 3-star hotel accommodation\n• Daily breakfast included\n• Kufri & Mall Road sightseeing\n• Toy train experience\n• Airport/bus stand pickup & drop\n\n📦 5 Nights / 6 Days — starting ₹22,000:\n• All above + Chail day trip\n• Nature walk & horse riding\n• 1 adventure activity included\n\n💡 Off-Season Deals (Jul–Aug): Up to 40% discount!",
    quickReplies: [
      { id: 'discounts',          label: '🎁 Current Offers' },
      { id: 'speak_agent',        label: '👤 Get Custom Quote' },
      { id: 'family_sightseeing', label: '🗺️ Family Activities' },
      { id: 'main_menu',          label: '🏠 Main Menu' },
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
    message: "Manali — the adventure capital of Himachal! 🏔️\n\n📍 Distance from Shimla: 260 km (~7 hours)\n\n🌟 Top Attractions:\n• Rohtang Pass — snow, views, adventure\n• Solang Valley — skiing, paragliding, zorbing\n• Hadimba Temple — ancient wood temple in forest\n• Old Manali — cafes, hippie vibe, riverside\n• Beas River — camping & rafting\n\n🕐 Best Time: Oct–June (Rohtang open)\n💰 Budget: ₹5,000–₹15,000 for 3 nights\n\n💡 Shimla + Manali combo packages available!",
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
    message: "Chail — Shimla's peaceful secret getaway! 🌲\n\n📍 Distance from Shimla: 44 km (~1.5 hours)\n\n🌟 Top Highlights:\n• World's highest cricket ground (2444 m)!\n• Chail Wildlife Sanctuary — deer, leopards, birds\n• Chail Palace Hotel — stunning heritage stay\n• Apple & peach orchards everywhere\n• Sadhupul — riverside picnic spot\n\n🌟 Why Visit Chail:\n• Less crowded than Shimla\n• Perfect for peace & nature lovers\n\n💰 Day trip from Shimla: ₹1,200–₹1,800 by taxi",
    quickReplies: [
      { id: 'narkanda',            label: '⛷️ Narkanda Next' },
      { id: 'nearby_destinations', label: '📍 Other Destinations' },
      { id: 'main_menu',           label: '🏠 Main Menu' },
    ],
  },
  narkanda: {
    message: "Narkanda — Himachal's hidden ski paradise! ⛷️\n\n📍 Distance from Shimla: 65 km (~2 hours)\n\n🌟 Top Highlights:\n• Hatu Peak (3400 m) — best panoramic views!\n• Skiing & snow activities (Dec–Feb)\n• Less crowded than Kufri — more authentic experience\n• Apple Belt — beautiful orchards (Aug–Oct)\n• Tannu Jubber Lake — serene, peaceful\n\n❄️ Skiing at Narkanda:\n• Slopes for beginners & advanced\n• Equipment rental: ₹400/hour\n• Instructor available: ₹500/hour",
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
    message: "Shimla's cafes are as beautiful as the views! ☕\n\n🌟 Top Cafes in Shimla:\n• Cafe Simla Times — rooftop, colonial vibe, great coffee\n• Wake & Bake Cafe — cozy, wooden interiors, best brownies!\n• Maria Brothers Cafe — heritage charm, book collection\n• Cafe 1947 — vintage themed, amazing views\n• Honey Hut Cafe — local honey products, peaceful\n• Himani's — budget cafe loved by locals\n\n☕ Must Try:\n• Kashmiri Kehwa tea\n• Himachali apple cider\n• Nutella crepes\n• Maggi with mountain views (iconic!)\n\n💡 Go to rooftop cafes at golden hour for the best experience!",
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
    message: "Our seasonal offers are here! 🌤️\n\n🎉 Current Offers:\n\n☀️ Summer Special (May–June):\n• 15% off all hill-view rooms\n• Free breakfast for families\n• Kids below 12 stay FREE\n\n🌧️ Monsoon Deals (Jul–Sep):\n• Up to 40% off hotel bookings\n• Free adventure activity with packages\n• Couple packages at ₹5,999\n\n❄️ Winter Wonderland (Dec–Jan):\n• Snow experience packages from ₹7,999\n• Complimentary skiing session\n• Hot chocolate & bonfire evenings\n\n💡 Offers are time-limited — book now!",
    quickReplies: [
      { id: 'early_booking', label: '📅 Early Bird Deals' },
      { id: 'speak_agent',   label: '👤 Book This Offer' },
      { id: 'main_menu',     label: '🏠 Main Menu' },
    ],
  },
  group_discounts: {
    message: "Planning a group trip? We have great group deals! 👥\n\n🎉 Group Discounts:\n\n👥 Group Size 10–20 people:\n• 10% off total package price\n• Free group coordinator\n• 1 complimentary meal\n\n👥 Group Size 21–50 people:\n• 20% off total package price\n• Dedicated trip manager\n• Free airport transfers\n• Group photo session included\n\n👥 Group Size 50+ people:\n• Custom pricing\n• Exclusive hotel floors\n• Personalized itinerary\n• 24/7 dedicated support\n\n💡 Perfect for: Corporate trips, school tours, college groups, wedding parties!",
    quickReplies: [
      { id: 'speak_agent',   label: '👤 Get Group Quote' },
      { id: 'early_booking', label: '📅 Early Bird Deals' },
      { id: 'main_menu',     label: '🏠 Main Menu' },
    ],
  },
  early_booking: {
    message: "Book early and save big! 📅\n\n🐦 Early Bird Discount Policy:\n\n⏰ 60+ days before travel:\n• 25% off on all packages\n• Free room upgrade (subject to availability)\n• Full refund on cancellation\n\n⏰ 30–60 days before travel:\n• 15% off on all packages\n• Free breakfast included\n\n⏰ 15–30 days before travel:\n• 10% off on packages\n\n✅ Why Book Early:\n• Best room selection\n• Guaranteed availability during peak season\n• Lock current prices\n\n💡 Peak seasons: May–June & December — book 2 months ahead!",
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
    message: "Shimla hosts amazing festivals and events! 🎉\n\n🗓️ Annual Events & Festivals:\n\n❄️ Ice Skating Carnival (Jan):\n• Asia's only natural ice skating rink!\n• Shimla Ice Skating Club events\n\n🌸 Summer Festival (May–Jun):\n• Cultural performances, folk dances\n• Food festival, craft fair\n• Music concerts on The Ridge\n\n🎭 Kullu Dussehra (Oct):\n• 7-day festival — 200+ deities arrive!\n• UNESCO recognized cultural event\n\n🏔️ Winter Carnival at Kufri (Jan):\n• Skiing competitions & snow sculptures\n\n💡 Ask our team for festival packages!",
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
      { id: 'tourist_places', label: '🗺️ Tourist Places' },
      { id: 'hotel_details',  label: '🏨 Hotels' },
      { id: 'package_info',   label: '📦 Packages' },
      { id: 'booking_issue',  label: '📋 Bookings' },
      { id: 'speak_agent',    label: '👤 Talk to Agent' },
      { id: 'main_menu',      label: '🏠 Main Menu' },
    ],
  },
};

// ── Chat Window Component ────────────────────────────────────────────────────
export default function SupportChatbot({ isOpen, onClose }) {
  const [chatMessages, setChatMessages]   = useState([]);
  const [chatInput, setChatInput]         = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatLoading]);

  // Init on first open
  useEffect(() => {
    if (isOpen && chatMessages.length === 0) initChatSession();
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const initChatSession = () => {
    const w = responses.welcome;
    setChatMessages([{ role: 'bot', text: w.message, quickReplies: w.quickReplies }]);
  };

  const resetChat = () => {
    const m = responses.main_menu;
    setChatMessages([{ role: 'bot', text: '🔄 Chat cleared! How can I help you? 😊', quickReplies: m.quickReplies }]);
  };

  // Core send — fully offline, exact same logic as original
  const sendChatMessage = useCallback(async (messageText, quickReplyId = null) => {
    const text = (messageText || chatInput).trim();
    if (!text) return;

    setChatMessages(prev => [...prev, { role: 'user', text }]);
    setChatInput('');
    setIsChatLoading(true);

    await new Promise(r => setTimeout(r, 600 + Math.random() * 500));

    const key  = quickReplyId || getResponseKey(text);
    const resp = responses[key] || responses.default;

    setChatMessages(prev => [...prev, {
      role: 'bot',
      text: resp.message,
      quickReplies: resp.quickReplies || null,
      options: resp.options || null,
    }]);
    setIsChatLoading(false);
  }, [chatInput]);

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes sc-slide-up {
          from { opacity:0; transform:translateY(20px) scale(0.97); }
          to   { opacity:1; transform:translateY(0)    scale(1); }
        }
        @keyframes sc-typing {
          0%,60%,100% { transform:translateY(0); }
          30%          { transform:translateY(-6px); }
        }
        @keyframes sc-msg-in {
          from { opacity:0; transform:translateY(6px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .sc-window   { animation: sc-slide-up .3s cubic-bezier(.34,1.4,.64,1); }
        .sc-msg-row  { animation: sc-msg-in .2s ease; }
        .sc-qr:hover {
          background:#059669 !important; color:#fff !important;
          border-color:#059669 !important; transform:translateY(-1px);
        }
        .sc-send:hover:not(:disabled) { filter:brightness(1.1); transform:scale(1.06); }
        .sc-newchat:hover { background:rgba(255,255,255,.28) !important; }
        .sc-closebtn:hover { background:rgba(255,255,255,.28) !important; transform:rotate(90deg); }
        .sc-msgs::-webkit-scrollbar { width:3px; }
        .sc-msgs::-webkit-scrollbar-thumb { background:#bbf7d0; border-radius:4px; }
        .sc-input-el:focus { outline:none; border-color:#059669 !important; box-shadow:0 0 0 3px rgba(5,150,105,.13) !important; }

        /* ── Mobile Responsive Styles ── */
        @media (max-width: 600px) {
          .sc-window {
            position: fixed !important;
            bottom: 0 !important;
            right: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            max-width: 100vw !important;
            height: 100dvh !important;
            max-height: 100dvh !important;
            border-radius: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }
          /* Taller message area on mobile */
          .sc-msgs {
            padding: 12px 10px !important;
            gap: 12px !important;
            -webkit-overflow-scrolling: touch;
          }
          /* Larger, more touch-friendly quick reply buttons */
          .sc-qr {
            font-size: 13px !important;
            padding: 7px 14px !important;
            border-radius: 20px !important;
            min-height: 36px !important;
            touch-action: manipulation;
          }
          /* Slightly larger input area */
          .sc-input-el {
            font-size: 16px !important; /* prevents iOS zoom on focus */
            padding: 11px 14px !important;
            border-radius: 14px !important;
          }
          /* Larger send button for touch */
          .sc-send {
            width: 46px !important;
            height: 46px !important;
            border-radius: 14px !important;
            flex-shrink: 0 !important;
          }
          /* Better header on mobile */
          .sc-window-header {
            padding: 14px 14px 12px !important;
          }
        }

        @media (min-width: 601px) and (max-width: 768px) {
          .sc-window {
            width: 360px !important;
            height: 500px !important;
            right: 16px !important;
            bottom: 16px !important;
            border-radius: 18px !important;
          }
        }
      `}</style>

      {/* Window */}
      <div className="sc-window" style={{
        position:'fixed', bottom:'24px', right:'24px', zIndex:9995,
        width:'370px', maxWidth:'calc(100vw - 32px)',
        height:'570px', maxHeight:'calc(100vh - 48px)',
        background:'#fff', borderRadius:'20px',
        boxShadow:'0 24px 60px rgba(0,0,0,.15), 0 4px 16px rgba(5,150,105,.1)',
        border:'1px solid rgba(5,150,105,.12)',
        display:'flex', flexDirection:'column', overflow:'hidden',
      }}>

        {/* ── Header ── */}
        <div className="sc-window-header" style={{
          background:'linear-gradient(135deg,#059669,#0d9488)',
          padding:'14px 16px', display:'flex', alignItems:'center',
          gap:'10px', flexShrink:0,
        }}>
          <div style={{
            width:'42px', height:'42px', borderRadius:'50%',
            background:'rgba(255,255,255,.18)', border:'2px solid rgba(255,255,255,.3)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'20px', flexShrink:0,
          }}>🏔️</div>

          <div style={{ flex:1, minWidth:0 }}>
            <p style={{ margin:0, color:'#fff', fontWeight:700, fontSize:'14px' }}>
              Shimla Travels Support
            </p>
            <div style={{ display:'flex', alignItems:'center', gap:'5px', marginTop:'3px' }}>
              <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#86efac', flexShrink:0 }} />
              <span style={{ color:'rgba(255,255,255,.85)', fontSize:'11.5px' }}>
                {isChatLoading ? '● Typing...' : 'Online · Replies instantly'}
              </span>
            </div>
          </div>

          <button className="sc-newchat" onClick={resetChat} style={{
            background:'rgba(255,255,255,.15)', border:'1px solid rgba(255,255,255,.25)',
            borderRadius:'7px', padding:'4px 10px', color:'#fff',
            fontSize:'11px', fontWeight:600, cursor:'pointer',
            transition:'background .18s', flexShrink:0, whiteSpace:'nowrap',
          }}>🗑️ New Chat</button>

          <button className="sc-closebtn" onClick={onClose} style={{
            background:'rgba(255,255,255,.15)', border:'none', borderRadius:'7px',
            width:'30px', height:'30px', display:'flex', alignItems:'center',
            justifyContent:'center', cursor:'pointer',
            transition:'background .18s, transform .22s', flexShrink:0,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* ── Messages ── */}
        <div className="sc-msgs" style={{
          flex:1, overflowY:'auto', padding:'14px 12px',
          background:'#f8fafc', display:'flex', flexDirection:'column', gap:'10px',
        }}>
          {chatMessages.map((msg, i) => (
            <div key={i} className="sc-msg-row" style={{
              display:'flex', flexDirection:'column',
              alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
              gap:'6px',
            }}>
              {/* Bot icon row */}
              {msg.role === 'bot' && (
                <div style={{ display:'flex', alignItems:'flex-start', gap:'7px' }}>
                  <div style={{
                    width:'26px', height:'26px', borderRadius:'50%', flexShrink:0,
                    background:'linear-gradient(135deg,#059669,#0d9488)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'12px', marginTop:'2px',
                  }}>🏔️</div>
                  <div style={{
                    maxWidth:'82%', padding:'10px 13px',
                    borderRadius:'3px 16px 16px 16px',
                    background:'#fff', color:'#1e293b',
                    fontSize:'13.5px', lineHeight:'1.6',
                    boxShadow:'0 2px 6px rgba(0,0,0,.07)',
                    border:'1px solid #f1f5f9',
                    whiteSpace:'pre-line',
                  }}>{msg.text}</div>
                </div>
              )}

              {/* User bubble */}
              {msg.role === 'user' && (
                <div style={{
                  maxWidth:'80%', padding:'10px 13px',
                  borderRadius:'16px 16px 3px 16px',
                  background:'linear-gradient(135deg,#059669,#0d9488)',
                  color:'#fff', fontSize:'13.5px', lineHeight:'1.55',
                  boxShadow:'0 2px 8px rgba(5,150,105,.22)',
                  whiteSpace:'pre-line',
                }}>{msg.text}</div>
              )}

              {/* Quick reply buttons */}
              {msg.quickReplies?.length > 0 && msg.role === 'bot' && (
                <div style={{
                  display:'flex', flexWrap:'wrap', gap:'5px',
                  maxWidth:'90%', paddingLeft:'33px',
                }}>
                  {msg.quickReplies.map((qr, qi) => (
                    <button key={qi} className="sc-qr"
                      onClick={() => sendChatMessage(qr.label, qr.id)}
                      style={{
                        background:'#fff', border:'1.5px solid #d1fae5',
                        borderRadius:'18px', padding:'4px 12px',
                        fontSize:'11.5px', color:'#059669', fontWeight:600,
                        cursor:'pointer', transition:'all .17s',
                        boxShadow:'0 1px 3px rgba(0,0,0,.06)',
                      }}
                    >{qr.label}</button>
                  ))}
                </div>
              )}

              {/* Options */}
              {msg.options?.length > 0 && msg.role === 'bot' && (
                <div style={{ display:'flex', flexWrap:'wrap', gap:'5px', paddingLeft:'33px' }}>
                  {msg.options.map((opt, oi) => (
                    <button key={oi} className="sc-qr"
                      onClick={() => sendChatMessage(opt.label || opt)}
                      style={{
                        background:'#fff', border:'1.5px solid #d1fae5',
                        borderRadius:'18px', padding:'4px 12px',
                        fontSize:'11.5px', color:'#059669', fontWeight:600,
                        cursor:'pointer', transition:'all .17s',
                      }}
                    >{opt.label || opt}</button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isChatLoading && (
            <div style={{ display:'flex', alignItems:'flex-start', gap:'7px' }}>
              <div style={{
                width:'26px', height:'26px', borderRadius:'50%',
                background:'linear-gradient(135deg,#059669,#0d9488)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'12px', flexShrink:0,
              }}>🏔️</div>
              <div style={{
                background:'#fff', borderRadius:'3px 16px 16px 16px',
                padding:'12px 16px', boxShadow:'0 2px 6px rgba(0,0,0,.07)',
                border:'1px solid #f1f5f9',
                display:'flex', gap:'4px', alignItems:'center',
              }}>
                {[0,1,2].map(i => (
                  <span key={i} style={{
                    width:'6px', height:'6px', borderRadius:'50%', background:'#059669',
                    display:'inline-block',
                    animation:`sc-typing 1.2s ease-in-out ${i*0.2}s infinite`,
                  }}/>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ── Input ── */}
        <div style={{
          padding:'10px 12px', background:'#fff',
          borderTop:'1px solid #f1f5f9',
          display:'flex', gap:'8px', alignItems:'center', flexShrink:0,
          paddingBottom: 'max(10px, env(safe-area-inset-bottom, 10px))',
        }}>
          <input
            ref={inputRef}
            className="sc-input-el"
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendChatMessage()}
            placeholder="Type a message..."
            style={{
              flex:1, border:'1.5px solid #e2e8f0', borderRadius:'11px',
              padding:'9px 13px', fontSize:'13.5px',
              background:'#f8fafc', color:'#1e293b',
              transition:'border-color .2s, box-shadow .2s',
              fontFamily:'inherit',
            }}
          />
          <button className="sc-send"
            onClick={() => sendChatMessage()}
            disabled={!chatInput.trim() || isChatLoading}
            style={{
              width:'40px', height:'40px', borderRadius:'11px', border:'none',
              background: chatInput.trim() ? 'linear-gradient(135deg,#059669,#0d9488)' : '#e2e8f0',
              cursor: chatInput.trim() ? 'pointer' : 'not-allowed',
              display:'flex', alignItems:'center', justifyContent:'center',
              transition:'all .2s', flexShrink:0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke={chatInput.trim() ? 'white' : '#94a3b8'} strokeWidth="2.5">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>

        {/* Footer */}
        <div style={{
          padding:'5px 0 7px', textAlign:'center',
          fontSize:'10.5px', color:'#cbd5e1', background:'#fff',
          borderTop:'1px solid #f8fafc', flexShrink:0,
        }}>🔒 Shimla Travels · Secure Support</div>
      </div>
    </>
  );
}
