// src/App.jsx
import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, useLocation, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';

import { LikedProvider } from "./Components/LikedCart/LikedContext";

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';

import Home           from "./Pages/Home/home.jsx";
import Login          from "./Pages/Login/login.jsx";
import Navbar         from "./Components/Navbar/navbar.jsx";
import Signup         from "./Pages/SignUp/signup.jsx";
import ScrollToTop    from "./Components/ScrollToTop";
import ChatPopup         from "./Components/Chatbot/ChatPopup.jsx";
import ContactChatButton from "./Components/Chatbot/ContactChatButton.jsx";
import SupportChatbot    from "./Components/Chatbot/Supportchatbot.jsx";

// ── Admin CSS is now imported inside Admin.jsx — NOT here.
// Loading it here caused 32KB of admin styles to download for EVERY visitor.

// ── Lazy-loaded pages (loaded only when user visits that route) ──────────
const About          = lazy(() => import('./Pages/About/About.jsx'));
const ContactUs      = lazy(() => import('./Pages/ContactUS/ContactUs.jsx'));
const HotelListing   = lazy(() => import('./Pages/Hotels/HotelListing.jsx'));
const HotelDetailPage = lazy(() => import('./Pages/Hotels/HotelDetailPage.jsx'));
const Shimla         = lazy(() => import('./Pages/Shimla/Shimla.jsx'));
const Packages       = lazy(() => import('./Pages/Packages/Packages.jsx')); // fixed: was "Packagess"
const Blog           = lazy(() => import('./Components/Blog/Blog.jsx'));
const BlogArticle    = lazy(() => import('./Components/Blog/BlogArticle.jsx'));
const PackageDetails = lazy(() => import('./Components/PackagesModal/PackageDetails'));
const TermsPolicies  = lazy(() => import('./Components/Terms/TermsPolicies.jsx'));
const Account        = lazy(() => import('./Pages/Account/Account.jsx'));
const ForgotPassword = lazy(() => import('./Pages/auth/ForgotPassword.jsx'));
const ResetPassword  = lazy(() => import('./Pages/auth/ResetPassword.jsx'));
const Admin          = lazy(() => import('./Pages/Admin/Admin.jsx'));
const BookingPage      = lazy(() => import('./Pages/Booking/BookingPage.jsx'));
const MultiBookingPage = lazy(() => import('./Pages/Booking/MultiBookingPage.jsx'));
const LikedCartPage  = lazy(() => import('./Components/LikedCart/LikedCartPage.jsx'));
const NotFound       = lazy(() => import('./Pages/NotFound.jsx')); // 404 page

// Full-screen loader shown while a lazy page is loading
const PageLoader = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', fontSize: 15 }}>
    Loading…
  </div>
);



// ErrorBoundary — catches any runtime error in the component tree.
// Without this, a single JS error during lazy load shows a blank white page
// with no message. This shows a friendly error UI instead.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Arial, sans-serif', gap: 16, padding: 24, textAlign: 'center'
        }}>
          <div style={{ fontSize: 48 }}>⛰️</div>
          <h2 style={{ color: '#1A3C6E', margin: 0 }}>Something went wrong</h2>
          <p style={{ color: '#666', maxWidth: 400, margin: 0 }}>
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#1A3C6E', color: '#fff', border: 'none',
              borderRadius: 8, padding: '10px 24px', cursor: 'pointer', fontSize: 14
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppContent() {
  const location = useLocation();
  const pathname  = location.pathname;

  const hideNavbar = pathname.startsWith('/package/') ||
                     pathname.startsWith('/hotel/')   ||
                     pathname === '/account'          ||
                     pathname.startsWith('/admin')    ||
                     pathname === '/booking'          ||
                     pathname === '/booking/multi';

  const [chatOpen, setChatOpen] = useState(false);

  const isHome    = pathname === '/';
  const isShimla  = pathname === '/shimla';
  const isContact = pathname === '/ContactUs';

  return (
    <LikedProvider>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      {!hideNavbar && <Navbar />}
      <ScrollToTop />

      <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/login"     element={<Login />} />
        <Route path="/signup"    element={<Signup />} />
        <Route path="/About"     element={<About />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Terms"     element={<TermsPolicies />} />
        <Route path="/Hotel"     element={<HotelListing />} />

        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />

        {/* Admin — protected, CSS loaded inside Admin.jsx */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* Booking pages — PROTECTED: must be logged in to access */}
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking/multi"
          element={
            <ProtectedRoute>
              <MultiBookingPage />
            </ProtectedRoute>
          }
        />

        <Route path="/hotel/:id"   element={<HotelDetailPage />} />
        <Route path="/shimla"      element={<Shimla />} />
        <Route path="/packages"    element={<Packages />} />
        <Route path="/blog"        element={<Blog />} />
        <Route path="/blog/:id"    element={<BlogArticle />} />
        <Route path="/package/:id" element={<PackageDetails />} />
        <Route path="/favorites"   element={<LikedCartPage />} />
        <Route path="/forgot-password"       element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* 404 — must be the LAST route. Catches any unknown URL. */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      </Suspense>

      {isHome && !chatOpen && (
        <ChatPopup
          message="Hi 👋 Need help planning your Shimla trip?"
          emoji="🏔️"
          storageKey="chatPopup_home"
          onOpen={() => setChatOpen(true)}
        />
      )}
      {isShimla && !chatOpen && (
        <ChatPopup
          message="Looking for the best places to visit in Shimla? ✨"
          emoji="🌄"
          storageKey="chatPopup_shimla"
          onOpen={() => setChatOpen(true)}
        />
      )}
      {isContact && <ContactChatButton />}
      {(isHome || isShimla) && (
        <SupportChatbot isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      )}
    </LikedProvider>
  );
}

export default function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const hasGoogleOAuth =
    googleClientId &&
    googleClientId !== "your-google-client-id-here" &&
    googleClientId !== "";

  const AppWrapper = ({ children }) => (
    // basename removed — was set for GitHub Pages (/Shimla-Website-/)
    // On Netlify the app lives at the root /, so no basename needed
    <Router>
      <AuthProvider>{children}</AuthProvider>
    </Router>
  );

  if (!hasGoogleOAuth) {
    return <ErrorBoundary><AppWrapper><AppContent /></AppWrapper></ErrorBoundary>;
  }

  return (
    <ErrorBoundary>
      <GoogleOAuthProvider clientId={googleClientId}>
        <AppWrapper><AppContent /></AppWrapper>
      </GoogleOAuthProvider>
    </ErrorBoundary>
  );
}

