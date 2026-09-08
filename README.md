# 🏔️ Shimla Travels

**Shimla Travels** is a full-stack travel booking platform built for exploring, booking, and managing hotel stays and holiday packages in and around Shimla. It combines a modern React frontend with a secure, production-ready Node.js/Express backend, complete with authentication, payments, reviews, and an admin dashboard.

<p align="center">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-%3E%3D18-339933?logo=node.js&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black">
  <img alt="Express" src="https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white">
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-8-47A248?logo=mongodb&logoColor=white">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-blue">
</p>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [API Overview](#-api-overview)
- [Security](#-security)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🏞️ About the Project

Shimla Travels is designed to give travelers a smooth, end-to-end experience — from discovering hotels and curated holiday packages to secure checkout and post-trip reviews. Behind the scenes, it's powered by a hardened Express API with rate limiting, input sanitization, JWT-based authentication, Google OAuth, and Razorpay payment integration, all backed by MongoDB.

Whether you're browsing attractions around Shimla, comparing hotels, planning a multi-day package, or managing bookings as an admin, this project brings together everything needed for a real-world travel booking product.

---

## ✨ Key Features

### For Travelers
- 🔍 **Smart Search** — Search across hotels, packages, and destinations from a single global search bar
- 🏨 **Hotel Browsing & Booking** — Detailed hotel listings with availability, pricing, and instant booking
- 🎒 **Holiday Packages** — Curated Shimla travel packages with itinerary details
- 🗺️ **Shimla Attractions Guide** — Explore local attractions with rich cards and modals
- 👤 **User Accounts** — Sign up, log in, and manage your profile (including Google Sign-In)
- 💳 **Secure Payments** — Razorpay-powered checkout for bookings
- ⭐ **Reviews & Ratings** — Leave reviews for hotels, packages, and the platform itself
- ❤️ **Saved Items** — Bookmark favorite hotels and packages for later
- 🌦️ **Live Weather** — Weather widget to help plan your trip
- 💬 **Chatbot Support** — In-app assistant for quick help
- 🎫 **Support Tickets** — Raise and track support requests
- ❄️ **Immersive UI Touches** — Snowfall effects and a polished, Shimla-themed design system

### For Admins
- 📊 **Admin Dashboard** — Centralized control panel for the platform
- 🛎️ **Booking Management** — View, update, and track hotel/package bookings
- 🏨 **Hotel & Package Management** — Create, edit, and manage listings
- 📝 **Review Moderation** — Manage user and site reviews
- 🧾 **Audit Logs** — Track important system and admin actions
- ⏰ **Automated Booking Completion** — A daily cron job auto-marks past bookings as completed

---

## 🛠️ Tech Stack

### Frontend (`/Frontend`)
| Category | Technology |
|---|---|
| Framework | React 19 + Vite 7 |
| Routing | React Router DOM 7 |
| Styling | Tailwind CSS + custom design system |
| HTTP Client | Axios |
| Auth | `@react-oauth/google` |
| UI/UX | Lucide Icons, React Icons, React Hot Toast, React Snowfall, React Easy Crop |
| Desktop Build | Electron + electron-builder |
| Deployment | Netlify (`netlify.toml` included) |

### Backend (`/Backend`)
| Category | Technology |
|---|---|
| Runtime | Node.js (≥18) + Express 4 |
| Database | MongoDB + Mongoose 8 |
| Auth | JSON Web Tokens (JWT), bcryptjs, Google Auth Library |
| Payments | Razorpay |
| Email | Nodemailer + Resend |
| Security | Helmet, HPP, CORS, express-rate-limit, mongo-sanitize, express-validator |
| Logging | Winston + daily rotate file transport, Morgan |
| Scheduling | node-cron |
| Testing | Jest + Supertest |

---

## 📁 Project Structure

```
Shimla/
├── Backend/
│   ├── config/          # Database connection setup
│   ├── controllers/     # Route business logic (auth, bookings, hotels, packages, etc.)
│   ├── middleware/      # Auth guard, error handler, rate limiter, validators
│   ├── models/          # Mongoose schemas (User, Hotel, Package, Booking, Review, etc.)
│   ├── routes/          # Express route definitions (versioned under /api/v1)
│   ├── utils/           # Email service, logger, database seeder
│   ├── logs/            # Winston log output
│   └── server.js        # App entry point
│
└── Frontend/
    ├── src/
    │   ├── Components/  # Reusable UI (Navbar, Chatbot, Payment, Modals, Admin, etc.)
    │   ├── Pages/        # Route-level pages (Home, Hotels, Packages, Booking, Admin, Auth...)
    │   ├── context/      # React Context providers (Auth, Chatbot)
    │   ├── hooks/        # Custom hooks (useBookings, usePayment, useSearch, useWeather...)
    │   ├── services/     # Axios API client
    │   └── data/         # Static data (attractions, hotels, packages, blog content)
    └── index.html
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** `v18` or higher
- **npm** (comes with Node.js)
- **MongoDB** (local instance or a hosted cluster, e.g. MongoDB Atlas)
- A **Razorpay** account (for payment integration)
- A **Google Cloud** project (for Google OAuth sign-in)
- (Optional) A **Resend** or SMTP account for transactional emails

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/shimla-travels.git
   cd shimla-travels
   ```

2. **Install backend dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../Frontend
   npm install
   ```

### Environment Variables

Create a `.env` file inside the `Backend/` directory with the following variables:

```env
# Server
PORT=5000
NODE_ENV=development
CORS_ORIGINS=http://localhost:5173

# Database
MONGO_URI=your_mongodb_connection_string

# Auth
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your_google_oauth_client_id

# Payments
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Email
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=noreply@shimlatravels.com
```

Create a `.env` file inside the `Frontend/` directory with:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

> ⚠️ Never commit your `.env` files. Both `Backend/.gitignore` and `Frontend/.gitignore` already exclude them.

### Running the App

**Start the backend (development mode with auto-reload):**
```bash
cd Backend
npm run dev
```
The API will be available at `http://localhost:5000/api/v1`.

**Start the frontend (development server):**
```bash
cd Frontend
npm run dev
```
The app will be available at `http://localhost:5173`.

**(Optional) Seed the database with sample data:**
```bash
cd Backend
npm run seed
```

**Build the frontend for production:**
```bash
cd Frontend
npm run build
```

---

## 🔌 API Overview

All backend routes are versioned and mounted under `/api/v1`:

| Route | Description |
|---|---|
| `POST /api/v1/auth` | Registration, login, Google OAuth, token refresh |
| `GET/POST /api/v1/hotels` | Browse and manage hotel listings |
| `GET/POST /api/v1/packages` | Browse and manage travel packages |
| `POST /api/v1/bookings` | Create and manage bookings |
| `POST /api/v1/payments` | Razorpay order creation and payment verification |
| `GET/POST /api/v1/reviews` | Hotel/package reviews |
| `GET/POST /api/v1/site-reviews` | Overall platform reviews |
| `GET/POST /api/v1/saved-items` | Wishlist / saved hotels & packages |
| `GET/POST /api/v1/support` | Support ticket system |
| `GET /api/v1/search` | Global search across hotels and packages |
| `* /api/v1/admin` | Admin-only management endpoints |
| `GET /api/v1/health` | Health check endpoint |

A lightweight uptime endpoint is also available at `GET /ping` for services like UptimeRobot or Render's free-tier keep-alive.

---

## 🔒 Security

Shimla Travels' backend is built with production security in mind:

- **Helmet** for secure HTTP headers and a strict Content Security Policy
- **CORS** allow-list driven by the `CORS_ORIGINS` environment variable
- **express-rate-limit** to guard against brute-force and abuse
- **HPP** to prevent HTTP parameter pollution
- **mongo-sanitize** to prevent NoSQL injection on body, query, and params
- **bcryptjs** for password hashing and **JWT** for stateless authentication
- **express-validator** for strict request validation
- **Winston** structured logging with daily log rotation for auditability

---

## 📜 Available Scripts

### Backend
| Command | Description |
|---|---|
| `npm start` | Run the server in production mode |
| `npm run dev` | Run the server with nodemon (auto-reload) |
| `npm test` | Run the Jest test suite |
| `npm run lint` | Lint the backend codebase |
| `npm run seed` | Seed the database with sample data |

### Frontend
| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Lint the frontend codebase |

---

## ☁️ Deployment

- **Frontend** — Configured for **Netlify** deployment via `netlify.toml`. Alternatively, the Express server itself is set up to serve the built frontend (`frontend/dist`) as static files, allowing a single-server deployment.
- **Backend** — Designed to run comfortably on services like **Render**, **Railway**, or any Node-friendly host, with a `/ping` route included for free-tier keep-alive pings.
- **Database** — Works with any MongoDB instance; MongoDB Atlas is recommended for production.

---

## 🗺️ Roadmap

- [ ] Multi-language support for international travelers
- [ ] Wallet / loyalty points system
- [ ] Real-time booking notifications
- [ ] Advanced analytics dashboard for admins
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn and build. Any contributions you make are **greatly appreciated**.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**. See the backend's `package.json` for license details, or add a `LICENSE` file at the project root for the full text.

---

## 📬 Contact

**Shimla Travels** — Built for travelers who love the hills.

For questions, support, or partnership inquiries, please open an issue in this repository or reach out through the in-app support/chatbot feature.

---

<p align="center">Made with ❤️ for the mountains of Shimla</p>
