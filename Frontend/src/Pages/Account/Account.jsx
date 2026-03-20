import React, { useState, useEffect, useCallback, memo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './account.css';
import './account.admin.css'; // Admin Panel button styles
import { useAuth } from '../../context/AuthContext';
import SavedItemsTab from '../../Components/SavedItemsTab.jsx';
import { useLiked } from '../../Components/LikedCart/LikedContext';
import { bookingAPI } from '../../services/api';
import Cropper from 'react-easy-crop';
import ProfileCompletionModal, { isProfileComplete } from '../../Components/ProfileCompletion/ProfileCompletionModal.jsx';

const DashboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const LogoutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const ProfileIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const BellIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const PlaneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 12h20M2 12l5-5m-5 5l5 5M22 12l-5-5m5 5l-5 5"></path>
  </svg>
);

const HeadphonesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
  </svg>
);

const InfoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

const TrashIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const CameraIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
    <circle cx="12" cy="13" r="4"></circle>
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const MountainIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 3l8 18 4-9 4 9M2 12l4-9 4 9"></path>
  </svg>
);

const InfoCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const MessageCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const PhoneCallIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const FileTextIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const AlertTriangleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

// Helper function to get icon based on activity type
const getActivityIcon = (type) => {
  switch (type) {
    case 'login':
      return <UserIcon />;
    case 'signup':
      return <CheckIcon />;
    case 'booking_created':
      return <CalendarIcon />;
    case 'booking_completed':
      return <CheckCircleIcon />;
    case 'profile_update':
      return <SettingsIcon />;
    case 'password_change':
      return <LockIcon />;
    case 'preference_update':
      return <SettingsIcon />;
    case 'notification_update':
      return <BellIcon />;
    case 'item_saved':
      return <HeartIcon />;      // Icon for saving items
    case 'item_removed':
      return <TrashIcon />;      // Icon for removing items
    case 'logout':
      return <LogoutIcon />;
    default:
      return <InfoIcon />;
  }
};

// Add missing icon components:
const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const Account = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSettingPage, setActiveSettingPage] = useState(null);
  const [bookingTab, setBookingTab] = useState('upcoming');

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
const [deleteConfirmText, setDeleteConfirmText] = useState('');
const [deleteError, setDeleteError] = useState('');
const [isDeleting, setIsDeleting] = useState(false);

const [cropModalOpen, setCropModalOpen] = useState(false);
const [imageSrc, setImageSrc] = useState(null);
const [crop, setCrop] = useState({ x: 0, y: 0 });
const [zoom, setZoom] = useState(1);
const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

const { 
    likedHotels, 
    likedPackages, 
    totalLiked, 
    isReady,  // This is what was missing!
    isLoading: likedLoading,
    refreshSavedItems 
  } = useLiked();

  const { user, token, logout, updateUser, isLoading: authLoading, isAuthenticated, logoutSilent  } = useAuth();

  // ── Profile Completion Modal ───────────────────────────────────────────────
  const [showProfileModal, setShowProfileModal] = useState(false);
  const modalDismissedRef = React.useRef(false);

  useEffect(() => {
    if (!user || modalDismissedRef.current) return;
    // Show modal if profile is genuinely incomplete
    if (!isProfileComplete(user)) {
      // Small delay so the page renders first
      const t = setTimeout(() => setShowProfileModal(true), 600);
      return () => clearTimeout(t);
    }
  }, [user]);
  const navigate = useNavigate();
const [deletePassword, setDeletePassword] = useState('');
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
const { likedItems } = useLiked();
  const handleDeleteAccount = async () => {
  if (deleteConfirmText.toUpperCase() !== 'DELETE') return;
  
  setIsDeleting(true);
  setDeleteError('');

  try {
    const response = await fetch(`${API_URL}/auth/account`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        password: deletePassword,  // send password
        reason: 'User requested deletion' 
      })
    });

    const data = await response.json();

   if (data.success) {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('shimlaLikedItems');
  logoutSilent();
  toast.success('Account deleted successfully');
  navigate('/', { replace: true });
}else {
      setDeleteError(data.message || 'Failed to delete account');
      setIsDeleting(false);
    }
  } catch (error) {
    console.error('Delete account error:', error);
    setDeleteError('Network error. Please try again.');
    setIsDeleting(false);
  }
};

  const [dashboardStats, setDashboardStats] = useState({
    upcoming: 0,
    completed: 0,
    saved: 0
  });

  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [cancelModal, setCancelModal] = useState({ open: false, bookingId: null, reason: '', customReason: '', step: 1 });
  const [activities, setActivities] = useState([]);
  const [accountStats, setAccountStats] = useState(null);
  
 const [activeTab, setActiveTab] = useState('dashboard');

// FIX: only fetch bookings once (not on every tab switch) — use a loaded flag
const [bookingsLoaded, setBookingsLoaded] = React.useState(false);
useEffect(() => {
  if (activeSection === 'bookings' && isAuthenticated && !bookingsLoaded) {
    setBookingsLoading(true);
    bookingAPI.getAll()
      .then(res => { setBookings(res.data.data?.bookings || []); setBookingsLoaded(true); })
      .catch(() => setBookings([]))
      .finally(() => setBookingsLoading(false));
  }
}, [activeSection, isAuthenticated, bookingsLoaded]);

// Re-fetch when a new booking is confirmed
useEffect(() => {
  const handler = (e) => {
    // ✅ FIX: always force-refresh bookings regardless of current section
    // This ensures new booking appears immediately after payment confirmation
    setBookingsLoaded(false);
    setBookingsLoading(true);
    bookingAPI.getAll()
      .then(res => {
        const list = res.data.data?.bookings || [];
        setBookings(list);
        setBookingsLoaded(true);
        // Also update dashboard stats
        setDashboardStats(prev => ({
          ...prev,
          totalBookings: list.length,
          upcoming: list.filter(b => b.status === 'upcoming' || b.status === 'confirmed').length,
          upcomingTrips: list.filter(b => b.status === 'upcoming' || b.status === 'confirmed').length,
          completed: list.filter(b => b.status === 'completed').length,
          completedTrips: list.filter(b => b.status === 'completed').length,
        }));
        // Auto-navigate to bookings section so user sees their new booking
        setActiveSection('bookings');
        setBookingTab('upcoming');
      })
      .catch(() => { setBookingsLoaded(false); })
      .finally(() => setBookingsLoading(false));
  };
  window.addEventListener('bookingConfirmed', handler);
  return () => window.removeEventListener('bookingConfirmed', handler);
}, [activeSection]);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    address: '',
    country: 'India',
    bio: '',
    preferredTravelType: ''
  });

  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);
  const [isLoadingActivities, setIsLoadingActivities] = useState(false);
  const [showFullChatbot, setShowFullChatbot] = useState(false);

  const [showAllActivities, setShowAllActivities] = useState(false);
  const [allActivities, setAllActivities] = useState([]);
  const [isLoadingAllActivities, setIsLoadingAllActivities] = useState(false);


 
  const handleViewAllActivities = () => {
    setShowAllActivities(true);
  };


  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ type: '', text: '' });
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const avatarFileRef = React.useRef(null);

  const [notifications, setNotifications] = useState({
    email: true,
    offers: true
  });

  const [security, setSecurity] = useState({ twoFactor: false, loginAlerts: true });
  const [privacy, setPrivacy] = useState({ profileVisible: true, showBookings: false, analytics: true });

  const [travelPrefs, setTravelPrefs] = useState({
    seatPreference: '',
    mealPreference: '',
    roomType: '',
    smoking: false
  });

  const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/shimla', label: 'Shimla' },
  { path: '/about', label: 'About' }
];

  useEffect(() => {
  // Populate form fields whenever user object changes.
  // This runs on first load (from localStorage) AND again after fetchUserProfile()
  // returns fresh data from the server — so the form always shows up-to-date info.
  if (user && (user.fullName || user.email)) {
    setProfileData({
      name: user.fullName || '',
      email: user.email || '',
      phone: user.phone || '',
      age: user.age || '',
      gender: user.gender || 'male',
      address: user.address || '',
      country: user.country || 'India',
      bio: user.bio || '',
      preferredTravelType: user.preferredTravelType || ''
    });

    // Load travel prefs from localStorage (backend has no travelPreferences field)
const userId = user._id || user.id;
if (userId) {
  try {
    const stored = localStorage.getItem(`shimla_travel_prefs_${userId}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      setTravelPrefs({
        seatPreference: parsed.seatPreference || '',
        mealPreference: parsed.mealPreference || '',
        roomType: parsed.roomType || '',
        smoking: parsed.smoking || false
      });
    }
  } catch { /* ignore */ }
}

    if (user.notifications) {
      setNotifications({
        email: user.notifications.email !== undefined ? user.notifications.email : true,
        offers: user.notifications.offers !== undefined ? user.notifications.offers : true
      });
    }
  }
}, [user]);

  // In Account.jsx, update the fetchDashboardStats function:

const fetchDashboardStats = useCallback(async (skipSavedItems = false) => {
  if (!token) return;
  try {
    const response = await fetch(`${API_URL}/bookings`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const bookingsList = response.ok
      ? (await response.json()).data?.bookings || []
      : [];

    setBookings(bookingsList);

    setDashboardStats({
      totalBookings: bookingsList.length,
      upcomingTrips: bookingsList.filter(b => b.status === 'upcoming' || b.status === 'confirmed').length,
      completedTrips: bookingsList.filter(b => b.status === 'completed').length,
      totalSpent: bookingsList.reduce((sum, b) => sum + (b.pricing?.totalAmount || 0), 0),
      upcoming: bookingsList.filter(b => b.status === 'upcoming' || b.status === 'confirmed').length,
      completed: bookingsList.filter(b => b.status === 'completed').length,
    });

    // ✅ Load existing persisted log — this includes removals, saves, everything
    const storageKey = `shimla_activities_${user?._id || user?.id}`;
    let persistedActivities = [];
    try {
      persistedActivities = JSON.parse(localStorage.getItem(storageKey) || '[]');
    } catch { persistedActivities = []; }

    // ✅ Only fetch saved items on initial load, not after removals
    if (!skipSavedItems) {
      const savedRes = await fetch(`${API_URL}/saved-items`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (savedRes.ok) {
        const savedData = await savedRes.json();
        const allSaved = [
          ...(savedData.data?.hotels || []),
          ...(savedData.data?.packages || [])
        ];

        allSaved.forEach(item => {
          const actId = `saved_${item.type}_${item.id}`;
          const alreadyLogged = persistedActivities.some(a => a.id === actId);
          if (!alreadyLogged) {
            persistedActivities.unshift({
              id: actId,
              type: 'item_saved',
              title: `Saved "${item.name}"`,
              description: item.type === 'hotel' ? '🏨 Hotel added to favourites' : '📦 Package saved to cart',
              time: item.savedAt || new Date().toISOString(),
            });
          }
        });
      }
    }

    // ✅ Always ensure account created exists at bottom
    if (!persistedActivities.some(a => a.id === 'account_created')) {
      persistedActivities.push({
        id: 'account_created',
        type: 'signup',
        title: 'Account created',
        description: '🎉 Welcome to Shimla Travels!',
        time: user?.createdAt,
      });
    }

    // ✅ Save back — this preserves removals written by handleRemove
    localStorage.setItem(storageKey, JSON.stringify(persistedActivities.slice(0, 50)));

    // ✅ Booking activities always fresh from API
    const bookingActivities = bookings.slice(0, 3).map(b => ({
      id: b._id,
      type: 'booking_created',
      title: `Booked ${b.hotel?.name || b.package?.title || 'a trip'}`,
      description: `Status: ${b.status}`,
      time: b.createdAt,
    }));

    // ✅ Merge: bookings (fresh) + everything else (persisted)
    const mergedActivities = [
      ...bookingActivities,
      ...persistedActivities.filter(a => a.type !== 'booking_created')
    ];
    mergedActivities.sort((a, b) => new Date(b.time) - new Date(a.time));
    setActivities(mergedActivities.slice(0, 5));

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    const storageKey = `shimla_activities_${user?._id || user?.id}`;
    try {
      const cached = JSON.parse(localStorage.getItem(storageKey) || '[]');
      setActivities(cached.slice(0, 5));
    } catch {
      setActivities([{
        id: 'account_created',
        type: 'signup',
        title: 'Account created',
        description: '🎉 Welcome to Shimla Travels!',
        time: user?.createdAt,
      }]);
    }
  } finally {
    setIsLoadingStats(false);
  }
}, [token, API_URL, user]);


useEffect(() => {
  if (token) {
    fetchDashboardStats();
  
  }
}, [token, fetchDashboardStats,]);

// Also update fetchAccountStats:
const fetchAccountStats = useCallback(async () => {
  if (!token) return;
  try {
    const response = await fetch(`${API_URL}/dashboard/account-stats`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        setAccountStats(data.stats);
      }
    }
  } catch (error) {
    console.error('Error fetching account stats:', error);
  }
}, [token, API_URL]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const handleBackToSettings = useCallback(() => {
    setActiveSettingPage(null);
    setSaveMessage({ type: '', text: '' });
  }, []);

  // ── Avatar upload handler ─────────────────────────────────────────────────
  const handleAvatarChange = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    toast.error('Please select an image file');
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    toast.error('Image must be under 10MB');
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    setImageSrc(reader.result);
    setCropModalOpen(true);
  };
  reader.readAsDataURL(file);
  e.target.value = '';
};

const getCroppedBase64 = async (imageSrc, pixelCrop) => {
  const img = await new Promise((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = imageSrc;
  });
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(
    img,
    pixelCrop.x, pixelCrop.y,
    pixelCrop.width, pixelCrop.height,
    0, 0, 256, 256
  );
  return canvas.toDataURL('image/jpeg', 0.9);
};

const handleCropConfirm = async () => {
  if (!croppedAreaPixels || !imageSrc) return;
  setAvatarLoading(true);
  setCropModalOpen(false);
  try {
    const base64 = await getCroppedBase64(imageSrc, croppedAreaPixels);
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ avatar: base64 }),
    });
    const data = await response.json();
    if (data.success) {
      updateUser(data.data?.user || data.user);
      toast.success('Profile picture updated!');
    } else {
      toast.error(data.message || 'Failed to update picture');
    }
  } catch {
    toast.error('Something went wrong. Please try again.');
  } finally {
    setAvatarLoading(false);
    setImageSrc(null);
  }
};

  const handleRemoveAvatar = async () => {
    if (!user?.avatar) return;
    setAvatarLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ avatar: null }),
      });
      const data = await response.json();
      if (data.success) {
        const updatedUser = data.data?.user || data.user;
        updateUser(updatedUser);
        setAvatarModalOpen(false);
        toast.success('Profile picture removed!');
        try {
          const storageKey = `shimla_activities_${user?._id || user?.id}`;
          const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
          existing.unshift({ id: `avatar_remove_${Date.now()}`, type: 'profile_update', title: 'Profile picture removed', description: '🗑️ You removed your profile picture', time: new Date().toISOString() });
          localStorage.setItem(storageKey, JSON.stringify(existing.slice(0, 20)));
          fetchDashboardStats(true);
        } catch { /* ignore */ }
      } else { toast.error(data.message || 'Failed to remove picture'); }
    } catch (err) { toast.error('Something went wrong. Please try again.'); }
    finally { setAvatarLoading(false); }
  };

  const handleSaveProfile = async () => {
  setSaveLoading(true);
  setSaveMessage({ type: '', text: '' });
  try {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        fullName: profileData.name, email: profileData.email, phone: profileData.phone,
        age: profileData.age ? parseInt(profileData.age) : undefined,
        gender: profileData.gender, address: profileData.address,
        bio: profileData.bio, preferredTravelType: profileData.preferredTravelType
      })
    });
    const data = await response.json();
    if (data.success) {
      updateUser(data.data?.user || data.user);
      setSaveMessage({ type: 'success', text: 'Profile updated successfully!' });
      const storageKey = `shimla_activities_${user?._id || user?.id}`;
      try {
        const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
        existing.unshift({ id: `profile_update_${Date.now()}`, type: 'profile_update', title: 'Profile updated', description: '✏️ Your profile information was updated', time: new Date().toISOString() });
        localStorage.setItem(storageKey, JSON.stringify(existing.slice(0, 20)));
        fetchDashboardStats(true);
      } catch { /* ignore */ }
    } else {
      setSaveMessage({ type: 'error', text: data.message || 'Failed to update profile' });
    }
  } catch (error) {
    setSaveMessage({ type: 'error', text: 'Network error. Please try again.' });
  }
  setSaveLoading(false);
};


  // Add this useEffect in Account.jsx to listen for storage changes



 const handleChangePassword = async () => {
  if (passwordData.newPassword !== passwordData.confirmPassword) {
    setSaveMessage({ type: 'error', text: 'New passwords do not match' }); return;
  }
  if (passwordData.newPassword.length < 8) {
    setSaveMessage({ type: 'error', text: 'Password must be at least 8 characters' }); return;
  }
  setSaveLoading(true);
  try {
    const response = await fetch(`${API_URL}/auth/change-password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword })
    });
    const data = await response.json();
    if (data.success) {
      setSaveMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      const storageKey = `shimla_activities_${user?._id || user?.id}`;
      try {
        const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
        existing.unshift({ id: `password_change_${Date.now()}`, type: 'password_change', title: 'Password changed', description: '🔒 Your account password was updated', time: new Date().toISOString() });
        localStorage.setItem(storageKey, JSON.stringify(existing.slice(0, 20)));
        fetchDashboardStats(true);
      } catch { /* ignore */ }
    } else {
      setSaveMessage({ type: 'error', text: data.message || 'Failed to change password' });
    }
  } catch (error) {
    setSaveMessage({ type: 'error', text: 'Network error. Please try again.' });
  }
  setSaveLoading(false);
};

  const handleSaveTravelPrefs = () => {
  setSaveLoading(true);
  try {
    // Backend User model has no travelPreferences field — persist locally
    const userId = user?._id || user?.id;
    if (!userId) throw new Error('No user id');
    localStorage.setItem(
      `shimla_travel_prefs_${userId}`,
      JSON.stringify(travelPrefs)
    );
    setSaveMessage({ type: 'success', text: 'Travel preferences saved!' });

    // Log to activity history
    const storageKey = `shimla_activities_${userId}`;
    try {
      const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
      existing.unshift({
        id: `travel_prefs_${Date.now()}`,
        type: 'preference_update',
        title: 'Travel preferences updated',
        description: '✈️ Your travel preferences were saved',
        time: new Date().toISOString(),
      });
      localStorage.setItem(storageKey, JSON.stringify(existing.slice(0, 20)));
      fetchDashboardStats(true);
    } catch { /* ignore */ }
  } catch (error) {
    setSaveMessage({ type: 'error', text: 'Failed to save preferences' });
  }
  setSaveLoading(false);
};
  const handleSaveNotifications = async () => {
  setSaveLoading(true);
  try {
    const response = await fetch(`${API_URL}/users/notifications`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(notifications)
    });
    const data = await response.json();
    if (data.success) {
      setSaveMessage({ type: 'success', text: 'Notification settings saved!' });
      updateUser({ notifications: data.notifications });
      const storageKey = `shimla_activities_${user?._id || user?.id}`;
      try {
        const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
        existing.unshift({ id: `notification_update_${Date.now()}`, type: 'notification_update', title: 'Notification settings updated', description: '🔔 Your notification preferences were changed', time: new Date().toISOString() });
        localStorage.setItem(storageKey, JSON.stringify(existing.slice(0, 20)));
        fetchDashboardStats(true);
      } catch { /* ignore */ }
    }
  } catch (error) {
    setSaveMessage({ type: 'error', text: 'Failed to save settings' });
  }
  setSaveLoading(false);
};
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const settingsMenu = [
    { id: 'profile', label: 'Profile Information', icon: <ProfileIcon />, color: '#007AFF' },
    { id: 'notifications', label: 'Notifications', icon: <BellIcon />, color: '#FF9500' },
    { id: 'security', label: 'Security & Privacy', icon: <ShieldIcon />, color: '#34C759' },
    { id: 'travel', label: 'Travel Preferences', icon: <PlaneIcon />, color: '#FF2D55' },
    { id: 'support', label: 'Help & Support', icon: <HeadphonesIcon />, color: '#5AC8FA' },
    { id: 'about', label: 'About', icon: <InfoIcon />, color: '#5856D6' },
    { id: 'delete', label: 'Delete Account', icon: <TrashIcon />, color: '#FF3B30' }
  ];

  // ── Mobile hero header (shown on mobile only via CSS) ──────────────────────
  const renderMobileHero = () => {
    if (!['dashboard', 'bookings', 'saved'].includes(activeSection)) return null;
    return (
      <div className="sh-mob-hero">
        <div className="sh-mob-hero-inner">
          <div className="sh-mob-hero-left">
            <span className="sh-mob-hero-greeting">
              {activeSection === 'dashboard' && 'Welcome back 👋'}
              {activeSection === 'bookings' && 'My Bookings'}
              {activeSection === 'saved' && 'Saved Items'}
            </span>
            <h1 className="sh-mob-hero-name">
              {activeSection === 'dashboard'
                ? (user?.fullName?.split(' ')[0] || profileData.name?.split(' ')[0] || 'Traveller')
                : activeSection === 'bookings' ? 'Your Trips' : 'Favourites'}
            </h1>
            <span className="sh-mob-hero-sub">
              {activeSection === 'dashboard' && `Member since ${user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : '2024'}`}
              {activeSection === 'bookings' && `${bookings.length} booking${bookings.length !== 1 ? 's' : ''} total`}
              {activeSection === 'saved' && `${totalLiked} item${totalLiked !== 1 ? 's' : ''} saved`}
            </span>
          </div>
          <div className="sh-mob-hero-avatar"
            style={{ cursor: user?.avatar ? 'pointer' : 'default' }}
            onClick={() => user?.avatar && setAvatarModalOpen(true)}
            title={user?.avatar ? 'View profile picture' : ''}
          >
            {user?.avatar
              ? <img src={user.avatar} alt={profileData.name} />
              : getInitials(profileData.name)
            }
            {user?.avatar && (
              <div className="sh-mob-avatar-zoom-hint">🔍</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ── Mobile bottom tab bar ──────────────────────────────────────────────────
  const MobileTabBar = () => (
    <div className="sh-mobile-tab-bar">
      <button className={`sh-tab-btn ${activeSection === 'dashboard' ? 'active' : ''}`}
        onClick={() => { setActiveSection('dashboard'); setIsMobileMenuOpen(false); }}>
        <DashboardIcon /><span className="sh-tab-label">Home</span>
      </button>
      <button className={`sh-tab-btn ${activeSection === 'bookings' ? 'active' : ''}`}
        onClick={() => { setActiveSection('bookings'); setIsMobileMenuOpen(false); }}>
        <CalendarIcon /><span className="sh-tab-label">Bookings</span>
      </button>
      <button className={`sh-tab-btn ${activeSection === 'saved' ? 'active' : ''}`}
        onClick={() => { setActiveSection('saved'); setIsMobileMenuOpen(false); }}>
        <HeartIcon /><span className="sh-tab-label">Saved</span>
      </button>
      <button className={`sh-tab-btn ${activeSection === 'settings' ? 'active' : ''}`}
        onClick={() => { setActiveSection('settings'); setActiveSettingPage(null); setIsMobileMenuOpen(false); }}>
        <SettingsIcon /><span className="sh-tab-label">Settings</span>
      </button>
      {/* ✅ Admin Panel tab — only visible to admin users */}
      {user?.role === 'admin' && (
        <button className="sh-tab-btn sh-tab-btn-admin"
          onClick={() => { navigate('/admin'); setIsMobileMenuOpen(false); }}>
          <ShieldIcon /><span className="sh-tab-label">Admin</span>
        </button>
      )}
    </div>
  );

  const renderDashboard = () => {
    // ✅ FIX: include 'confirmed' (payment done) in upcoming preview
    const upcomingBooking = bookings.find(b => b.status === 'upcoming' || b.status === 'confirmed');

    return (
      <div className="sh-dashboard-pro">
        <div className="sh-welcome-header">
          <div className="sh-welcome-text">
            <h1>Welcome back, {user?.fullName?.split(' ')[0] || profileData.name?.split(' ')[0] || 'Guest'}!</h1>
            <p className="sh-member-since">
              Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : '2024'}
            </p>
          </div>
          <div className="sh-verified-badge">
            <CheckIcon /> Verified Member
          </div>
        </div>

        <div className="sh-stats-grid-pro three-cols">
          <div className="sh-stat-card-pro upcoming">
            <div className="sh-stat-icon-wrap">
              <CalendarIcon />
            </div>
            <div className="sh-stat-info">
              <span className="sh-stat-value">{isLoadingStats ? '...' : dashboardStats.upcoming}</span>
              <span className="sh-stat-label">Upcoming Trips</span>
            </div>
          </div>

          <div className="sh-stat-card-pro completed">
            <div className="sh-stat-icon-wrap">
              <CheckIcon />
            </div>
            <div className="sh-stat-info">
              <span className="sh-stat-value">{isLoadingStats ? '...' : dashboardStats.completed}</span>
              <span className="sh-stat-label">Completed</span>
            </div>
          </div>

          <div className="sh-stat-card-pro saved">
          <div className="sh-stat-icon-wrap">
            <HeartIcon />
          </div>
          <div className="sh-stat-info">
            <span className="sh-stat-value">
              {!isReady ? '...' : totalLiked}
            </span>
            <span className="sh-stat-label">Saved Items</span>
          </div>
        </div>
        </div>

        <div className="sh-dashboard-content-grid">
          <div className="sh-dashboard-left">
            {upcomingBooking ? (() => {
              const isHotel = upcomingBooking.bookingType === 'hotel';
              const title = isHotel
                ? upcomingBooking.hotel?.name || 'Hotel Booking'
                : upcomingBooking.package?.title || 'Package Booking';
              const imgSrc = isHotel
                ? upcomingBooking.hotel?.images?.[0] || upcomingBooking.hotel?.coverImage
                : upcomingBooking.package?.coverImage;
              const date1 = isHotel ? upcomingBooking.checkIn : upcomingBooking.travelDate;
              const date2 = isHotel ? upcomingBooking.checkOut : null;
              const guestCount = upcomingBooking.guests?.total || upcomingBooking.guests?.adults || 1;
              const daysToGo = date1
                ? Math.ceil((new Date(date1) - new Date()) / (1000 * 60 * 60 * 24))
                : null;
              return (
              <div className="sh-upcoming-preview-card">
                <div className="sh-preview-header">
                  <h3>Your Next Adventure</h3>
                  {daysToGo > 0 && (
                    <span className="sh-countdown-badge">
                      <CalendarIcon /> {daysToGo} days to go
                    </span>
                  )}
                </div>
                <div className="sh-preview-content">
                  {imgSrc && (
                    <div className="sh-preview-image">
                      <img src={imgSrc} alt={title} />
                      <span className="sh-status-badge-large upcoming">Upcoming</span>
                    </div>
                  )}
                  <div className="sh-preview-details">
                    <div className="sh-preview-top">
                      <span className="sh-booking-type-tag">{isHotel ? '🏨 Hotel' : '📦 Package'}</span>
                      <h4>{title}</h4>
                      <p style={{fontSize:'12px',color:'#64748b',margin:'2px 0'}}>
                        Ref: {upcomingBooking.bookingReference}
                      </p>
                    </div>

                    <div className="sh-preview-dates">
                      <div className="sh-date-box">
                        <span className="sh-date-label">{isHotel ? 'Check In' : 'Travel Date'}</span>
                        <span className="sh-date-strong">{formatDate(date1)}</span>
                      </div>
                      {date2 && (
                        <>
                          <span className="sh-date-arrow-lg">→</span>
                          <div className="sh-date-box">
                            <span className="sh-date-label">Check Out</span>
                            <span className="sh-date-strong">{formatDate(date2)}</span>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="sh-preview-meta">
                      <div className="sh-meta-item">
                        <UsersIcon /> {guestCount} Traveler{guestCount > 1 ? 's' : ''}
                      </div>
                      <div className="sh-meta-item">
                        <span>₹{upcomingBooking.pricing?.totalAmount?.toLocaleString('en-IN') || '—'}</span>
                      </div>
                    </div>

                    <div className="sh-preview-actions">
                      <button className="sh-btn-primary-action" onClick={() => setActiveSection('bookings')}>
                        View All Bookings
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );})() : (
              <div className="sh-empty-state-card">
                <div className="sh-empty-illustration">
                  <MountainIcon />
                </div>
                <h3>No upcoming trips</h3>
                <p>Start planning your next adventure in Shimla!</p>
                <button className="sh-explore-btn" onClick={() => navigate('/packages')}>
                  Explore Packages
                </button>
              </div>
            )}

            

            <div className="sh-activity-card">
              <div className="sh-card-header-flex">
                <h3>Recent Activity</h3>
                <button className="sh-view-all-link" onClick={handleViewAllActivities}>
                View All <ChevronRightIcon />
              </button>
              </div>

              {/* Show only first 5 activities using slice */}
            {activities.length > 0 ? (
              <div className="sh-activity-list">
                {activities.slice(0, 5).map((activity, index) => (
                  <div key={activity.id || index} className="sh-activity-item">
                    <div className={`sh-activity-icon ${activity.type}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="sh-activity-content">
                      <p className="sh-activity-title">{activity.message || activity.title}</p>
                      <p className="sh-activity-desc">{activity.description}</p>
                      <span className="sh-activity-time">
                        {new Date(activity.time || activity.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="sh-empty-activity">
                <p>No recent activity to show</p>
              </div>
            )}
            </div>
          </div>

          <div className="sh-dashboard-right">
            <div className="sh-quick-actions-card">
              <h3>Quick Actions</h3>
              <div className="sh-quick-actions-grid">
                <button className="sh-quick-action-btn" onClick={() => navigate('/packages')}>
                  <div className="sh-quick-icon blue"><PlaneIcon /></div>
                  <span>Book Trip</span>
                </button>
                <button className="sh-quick-action-btn" onClick={() => setActiveSection('saved')}>
                  <div className="sh-quick-icon pink"><HeartIcon /></div>
                  <span>Saved</span>
                </button>
                <button className="sh-quick-action-btn" onClick={() => navigate('/ContactUs')}>
                  <div className="sh-quick-icon green"><HeadphonesIcon /></div>
                  <span>Support</span>
                </button>
                <button className="sh-quick-action-btn" onClick={() => setActiveSection('settings')}>
                  <div className="sh-quick-icon orange"><SettingsIcon /></div>
                  <span>Settings</span>
                </button>
              </div>
            </div>

            {accountStats && (
              <div className="sh-account-stats-card">
                <h3>Account Overview</h3>
                <div className="sh-stats-list">
                  <div className="sh-stat-row">
                    <span>Total Bookings</span>
                    <strong>{accountStats.totalPackagesBooked}</strong>
                  </div>
                  <div className="sh-stat-row">
                    <span>Upcoming Trips</span>
                    <strong>{accountStats.upcomingTrips}</strong>
                  </div>
                  <div className="sh-stat-row">
                    <span>Completed Trips</span>
                    <strong>{accountStats.completedTrips}</strong>
                  </div>
                  <div className="sh-stat-row">
                    <span>Account Age</span>
                    <strong>{accountStats.accountAge} days</strong>
                  </div>
                </div>
              </div>
            )}

            <div className="sh-travel-tips-card">
              <h3>Travel Tips</h3>
              <div className="sh-tip-item">
                <InfoCircleIcon />
                <p>Best time to visit Shimla is March to June</p>
              </div>
              <div className="sh-tip-item">
                <InfoCircleIcon />
                <p>Don't forget to carry warm clothes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAllActivities = () => {
  if (!showAllActivities) return null;

  return (
    <div className="sh-activities-overlay" onClick={() => setShowAllActivities(false)}>
      <div className="sh-activities-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sh-activities-header">
          <h2>All Activities</h2>
          <button className="sh-close-btn" onClick={() => setShowAllActivities(false)}>
            <XIcon />
          </button>
        </div>
        
        <div className="sh-activities-list-full">
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <div key={activity.id || index} className="sh-activity-item">
                <div className={`sh-activity-icon ${activity.type}`}>
                  {/* Icon mapping for all activity types */}
                  {getActivityIcon(activity.type)}
                </div>
                <div className="sh-activity-content">
                  <p className="sh-activity-title">{activity.message || activity.title}</p>
                  <p className="sh-activity-desc">{activity.description}</p>
                  <span className="sh-activity-time">
                    {new Date(activity.time || activity.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="sh-no-activities">No activities to show</p>
          )}
        </div>
      </div>
    </div>
  );
};


const renderAllActivitiesModal = () => {
  if (!showAllActivities) return null;

  const storageKey = `shimla_activities_${user?._id || user?.id}`;
  let allHistory = [];
  try {
    allHistory = JSON.parse(localStorage.getItem(storageKey) || '[]');
  } catch { allHistory = []; }

  const bookingOnes = activities.filter(a => a.type === 'booking_created');
  const merged = [...bookingOnes, ...allHistory.filter(a => a.type !== 'booking_created')];
  merged.sort((a, b) => new Date(b.time) - new Date(a.time));

  return (
    <div className="sh-activities-overlay" onClick={() => setShowAllActivities(false)}>
      <div className="sh-activities-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sh-activities-header">
          <h2>All Activities ({merged.length})</h2>
          <button className="sh-close-btn" onClick={() => setShowAllActivities(false)}>
            <XIcon />
          </button>
        </div>
        <div className="sh-activities-list-full">
          {merged.length > 0 ? (
            merged.map((activity, index) => (
              <div key={activity.id || index} className="sh-activity-item-full">
                <div className={`sh-activity-icon ${activity.type}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="sh-activity-content">
                  <p className="sh-activity-title">{activity.title}</p>
                  <p className="sh-activity-desc">{activity.description}</p>
                  <span className="sh-activity-time">
                    {new Date(activity.time).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'long', year: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="sh-no-activities">No activities to show</p>
          )}
        </div>
      </div>
    </div>
  );
};


  const Navbar = memo(() => (
  <nav className="sh-navbar">
    <div className="sh-navbar-brand">
      <MountainIcon />
      <span>Shimla Travel</span>
    </div>
    <div className="sh-navbar-links">
      {navLinks.map(link => (
        <Link 
          key={link.path} 
          to={link.path} 
          className="sh-nav-link"
        >
          {link.label}
        </Link>
      ))}
    </div>
    <div className="sh-navbar-user">
      <span className="sh-navbar-greeting">Hi, {profileData.name?.split(' ')[0] || 'Guest'}</span>
      <div className="sh-navbar-avatar">
        {user?.avatar
          ? <img src={user.avatar} alt={profileData.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
          : getInitials(profileData.name)
        }
      </div>
    </div>
  </nav>
));

  const renderBookings = () => {
    // ✅ FIX: 'confirmed' status (payment done) should show in 'upcoming' tab
    // Backend sets status='confirmed' after payment, 'upcoming' before payment
    const filteredBookings = bookings.filter(b =>
      bookingTab === 'upcoming'
        ? (b.status === 'upcoming' || b.status === 'confirmed')
        : b.status === bookingTab
    );

    const CANCEL_REASONS = [
      { icon: '✈️', label: 'Change of travel plans' },
      { icon: '🏥', label: 'Medical emergency' },
      { icon: '💼', label: 'Work commitment' },
      { icon: '💸', label: 'Budget constraints' },
      { icon: '🌦️', label: 'Weather concerns' },
      { icon: '✏️', label: 'Other reason' },
    ];

    const handleCancelBooking = async (bookingId) => {
      // Show custom cancel modal
      setCancelModal({ open: true, bookingId, reason: '', customReason: '', step: 1 });
    };

    const submitCancellation = async () => {
      const reason = cancelModal.reason === 'Other reason'
        ? cancelModal.customReason || 'Cancelled by user'
        : cancelModal.reason;
      try {
        setCancelModal(prev => ({ ...prev, step: 2 }));
        await bookingAPI.cancel(cancelModal.bookingId, reason);
        const res = await bookingAPI.getAll();
        setBookings(res.data.data?.bookings || []);
        fetchDashboardStats(true);
        setCancelModal(prev => ({ ...prev, step: 3 }));
        setTimeout(() => {
          setCancelModal({ open: false, bookingId: null, reason: '', customReason: '', step: 1 });
          setBookingTab('cancelled');
        }, 2000);
      } catch (err) {
        setCancelModal({ open: false, bookingId: null, reason: '', customReason: '', step: 1 });
        toast.error(err.response?.data?.message || 'Failed to cancel booking.');
      }
    };

    const getStatusIcon = (status) => {
      if (status === 'upcoming') return '🟢';
      if (status === 'completed') return '✅';
      if (status === 'cancelled') return '🔴';
      return '⏳';
    };

    return (
      <div className="bk-section">
        {/* Cancel Modal */}
        {cancelModal?.open && (
          <div className="bk-cancel-overlay" onClick={() => cancelModal.step !== 2 && setCancelModal({ open: false, bookingId: null, reason: '', customReason: '', step: 1 })}>
            <div className="bk-cancel-modal" onClick={e => e.stopPropagation()}>

              {cancelModal.step === 1 && (
                <>
                  <div className="bk-cancel-header">
                    <div className="bk-cancel-icon-wrap">⚠️</div>
                    <h3>Cancel Booking</h3>
                    <p>We're sorry to see you go. Please let us know why you're cancelling.</p>
                  </div>
                  <div className="bk-cancel-reasons">
                    {CANCEL_REASONS.map(r => (
                      <button
                        key={r.label}
                        className={`bk-reason-btn ${cancelModal.reason === r.label ? 'selected' : ''}`}
                        onClick={() => setCancelModal(prev => ({ ...prev, reason: r.label }))}
                      >
                        <span className="bk-reason-icon">{r.icon}</span>
                        <span>{r.label}</span>
                        {cancelModal.reason === r.label && <span className="bk-reason-check">✓</span>}
                      </button>
                    ))}
                  </div>
                  {cancelModal.reason === 'Other reason' && (
                    <textarea
                      className="bk-cancel-textarea"
                      placeholder="Tell us more about your reason..."
                      value={cancelModal.customReason}
                      onChange={e => setCancelModal(prev => ({ ...prev, customReason: e.target.value }))}
                      rows={3}
                    />
                  )}
                  <div className="bk-cancel-actions">
                    <button className="bk-keep-btn" onClick={() => setCancelModal({ open: false, bookingId: null, reason: '', customReason: '', step: 1 })}>
                      Keep My Booking
                    </button>
                    <button
                      className="bk-confirm-cancel-btn"
                      disabled={!cancelModal.reason}
                      onClick={submitCancellation}
                    >
                      Confirm Cancellation
                    </button>
                  </div>
                </>
              )}

              {cancelModal.step === 2 && (
                <div className="bk-cancel-processing">
                  <div className="bk-spinner" />
                  <p>Cancelling your booking...</p>
                </div>
              )}

              {cancelModal.step === 3 && (
                <div className="bk-cancel-success">
                  <div className="bk-cancel-success-icon">✓</div>
                  <h3>Booking Cancelled</h3>
                  <p>Your booking has been successfully cancelled.</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bk-header">
          <div>
            <h2>My Bookings</h2>
            <p>{bookings.length} total reservation{bookings.length !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bk-tabs">
          {['upcoming', 'completed', 'cancelled'].map(tab => (
            <button
              key={tab}
              className={`bk-tab ${bookingTab === tab ? 'active' : ''}`}
              onClick={() => setBookingTab(tab)}
            >
              <span className="bk-tab-dot" data-status={tab} />
              <span className="bk-tab-label">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
              <span className="bk-tab-count">
              {tab === 'upcoming'
                ? bookings.filter(b => b.status === 'upcoming' || b.status === 'confirmed').length
                : bookings.filter(b => b.status === tab).length}
            </span>
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="bk-cards-list">
          {bookingsLoading ? (
            <div className="bk-loading">
              <div className="bk-spinner" />
              <p>Loading your bookings...</p>
            </div>
          ) : filteredBookings.length > 0 ? (
            filteredBookings.map(booking => {
              const isHotel = booking.bookingType === 'hotel';
              const title = isHotel
                ? booking.hotel?.name || booking.hotelName || 'Hotel Booking'
                : booking.package?.title || booking.packageTitle || 'Package Booking';
              const imgSrc = isHotel
                ? booking.hotel?.images?.[0] || booking.hotel?.coverImage
                : booking.package?.coverImage;
              const guestCount = booking.guests?.total || booking.guests?.adults || 1;
              const date1 = isHotel ? booking.checkIn : booking.travelDate;
              const date2 = isHotel ? booking.checkOut : null;
              const daysToGo = date1 && booking.status === 'upcoming'
                ? Math.ceil((new Date(date1) - new Date()) / 86400000)
                : null;

              return (
                <div key={booking._id} className={`bk-card bk-card--${booking.status}`}>

                  {/* Left accent bar */}
                  <div className="bk-card-accent" />

                  {/* Image */}
                  {imgSrc && (
                    <div className="bk-card-img-wrap">
                      <img src={imgSrc} alt={title} className="bk-card-img" />
                      <div className="bk-card-img-overlay" />
                      {daysToGo !== null && daysToGo > 0 && (
                        <div className="bk-countdown-pill">
                          <span>🗓</span> {daysToGo}d to go
                        </div>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="bk-card-body">
                    <div className="bk-card-top">
                      <div className="bk-card-meta-row">
                        <span className="bk-type-chip">{isHotel ? '🏨 Hotel' : '📦 Package'}</span>
                        <span className={`bk-status-pill bk-status-pill--${booking.status}`}>
                          {getStatusIcon(booking.status)} {booking.status}
                        </span>
                      </div>
                      <h3 className="bk-card-title">{title}</h3>
                      <p className="bk-card-ref">REF · {booking.bookingReference}</p>
                    </div>

                    <div className="bk-card-dates">
                      <div className="bk-date-chip">
                        <span className="bk-date-lbl">{isHotel ? 'Check In' : 'Travel Date'}</span>
                        <span className="bk-date-val">{formatDate(date1)}</span>
                      </div>
                      {date2 && (
                        <>
                          <div className="bk-date-arrow">→</div>
                          <div className="bk-date-chip">
                            <span className="bk-date-lbl">Check Out</span>
                            <span className="bk-date-val">{formatDate(date2)}</span>
                          </div>
                        </>
                      )}
                      {!isHotel && booking.package?.duration && (
                        <div className="bk-date-chip">
                          <span className="bk-date-lbl">Duration</span>
                          <span className="bk-date-val">{booking.package.duration}</span>
                        </div>
                      )}
                    </div>

                    <div className="bk-card-footer">
                      <div className="bk-card-info-pills">
                        <span className="bk-info-pill">👥 {guestCount} traveler{guestCount > 1 ? 's' : ''}</span>
                        {isHotel && booking.nights && (
                          <span className="bk-info-pill">🌙 {booking.nights} night{booking.nights > 1 ? 's' : ''}</span>
                        )}
                        <span className="bk-info-pill bk-info-pill--price">
                          ₹{booking.pricing?.totalAmount?.toLocaleString('en-IN') || '—'}
                        </span>
                      </div>

                      {(booking.status === 'upcoming' || booking.status === 'confirmed') && (
                        <button
                          className="bk-cancel-trigger"
                          onClick={() => handleCancelBooking(booking._id)}
                        >
                          <span>✕</span> Cancel
                        </button>
                      )}

                      {booking.status === 'cancelled' && booking.cancelledAt && (
                        <span className="bk-cancelled-on">
                          Cancelled {formatDate(booking.cancelledAt)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bk-empty">
              <div className="bk-empty-art">
                {bookingTab === 'upcoming' ? '🗺️' : bookingTab === 'completed' ? '🏆' : '📋'}
              </div>
              <h3>No {bookingTab} bookings</h3>
              <p>{bookingTab === 'upcoming'
                ? 'Your next adventure is waiting. Browse hotels and packages to get started.'
                : `You don't have any ${bookingTab} bookings yet.`}
              </p>
              {bookingTab === 'upcoming' && (
                <div className="bk-empty-btns">
                  <button onClick={() => navigate('/Hotel')}>🏨 Explore Hotels</button>
                  <button onClick={() => navigate('/packages')}>📦 Explore Packages</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSaved = () => {
  const { likedHotels, likedPackages, totalLiked, removeFromLiked, refreshSavedItems, isReady } = useLiked();
  const [activeFilter, setActiveFilter] = useState('all');
  const [removingId, setRemovingId] = useState(null);

  const allSaved = [...likedHotels, ...likedPackages];
  
  const filteredItems = activeFilter === 'hotels' 
    ? likedHotels 
    : activeFilter === 'packages' 
      ? likedPackages 
      : allSaved;

  const handleRemove = async (item) => {
  const itemId = item.id || item._id;
  const itemType = item.type || 'hotel';
  if (!itemId) return;

  setRemovingId(`${itemType}-${itemId}`);
  try {
    await removeFromLiked(itemId, itemType);

    // ✅ Log to localStorage
    const userId = user?._id || user?.id;
    if (userId) {
      const storageKey = `shimla_activities_${userId}`;
      try {
        const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
        existing.unshift({
          id: `removed_${itemType}_${itemId}_${Date.now()}`,
          type: 'item_removed',
          title: `Removed "${item.name}"`,
          description: itemType === 'hotel'
            ? '🏨 Hotel removed from favourites'
            : '📦 Package removed from cart',
          time: new Date().toISOString(),
        });
        localStorage.setItem(storageKey, JSON.stringify(existing.slice(0, 20)));
      } catch { /* ignore */ }
    }

    if (onRefreshStats) onRefreshStats(true); // ✅ true = skip saved-items refetch

  } catch (error) {
    console.error('Error in handleRemove:', error);
  } finally {
    setRemovingId(null);
  }
};

  return (
    <div className="sh-saved-section">
      <div className="sh-section-header">
        <h2>Saved Items</h2>
        <p>Your favorite hotels and packages</p>
      </div>

      {/* Filter Buttons */}
      <div className="sh-saved-filters">
        <button 
          className={activeFilter === 'all' ? 'active' : ''}
          onClick={() => setActiveFilter('all')}
        >
          All ({totalLiked})
        </button>
        <button 
          className={activeFilter === 'hotels' ? 'active' : ''}
          onClick={() => setActiveFilter('hotels')}
        >
          Hotels ({likedHotels.length})
        </button>
        <button 
          className={activeFilter === 'packages' ? 'active' : ''}
          onClick={() => setActiveFilter('packages')}
        >
          Packages ({likedPackages.length})
        </button>
      </div>

      {filteredItems.length > 0 ? (
        <div className="sh-saved-grid">
          {filteredItems.map((item) => (
            <div 
              key={`${item.type}-${item.id}`}
              className={`sh-saved-card ${removingId === `${item.type}-${item.id}` ? 'removing' : ''}`}
            >
              <div className="sh-saved-image">
                <img src={item.image} alt={item.name} />
                <span className="sh-saved-type">{item.type}</span>
                <button 
                  className="sh-saved-remove"
                  onClick={() => handleRemove(item)}
                  title="Remove from saved"
                >
                  <TrashIcon />
                </button>
              </div>
              <div className="sh-saved-info">
                <h4>{item.name}</h4>
                <p><MapPinIcon /> {item.location || 'Shimla, HP'}</p>
                <div className="sh-saved-price">
                  {item.price ? `₹${item.price.toLocaleString()}` : 'Price on request'}
                  {item.type === 'hotel' && <span>/night</span>}
                </div>
                <button 
                  className="sh-view-btn"
                  onClick={() => navigate(`/${item.type}/${item.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="sh-saved-placeholder">
          <HeartIcon />
          <h3>No saved items found</h3>
          <p>Browse our hotels and packages to save your favorites</p>
          <div className="sh-saved-actions">
            <button className="sh-btn-primary" onClick={() => navigate('/Hotel')}>Browse Hotels</button>
            <button className="sh-btn-secondary" onClick={() => navigate('/packages')}>Browse Packages</button>
          </div>
        </div>
      )}
    </div>
  );
};

  const renderProfile = () => (
    <div className="sh-profile-section">
      <div className="sh-section-header">
        <h2 style={{marginBottom:"-30px"}}>Profile Information</h2>
        <p>Manage your personal details</p>
      </div>

      <div className="sh-profile-card">
        <div className="sh-profile-avatar-section">
          <div className="sh-avatar-large">
            {user?.avatar ? (
              <img src={user.avatar} alt={profileData.name} />
            ) : (
              <span className="sh-avatar-initials">{getInitials(profileData.name)}</span>
            )}
            <label className={`sh-avatar-edit ${avatarLoading ? 'sh-avatar-edit--loading' : ''}`} title="Change profile picture">
              {avatarLoading
                ? <span className="sh-avatar-spinner" />
                : <CameraIcon />
              }
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleAvatarChange}
                disabled={avatarLoading}
              />
            </label>
          </div>
          <div className="sh-avatar-info">
            <h3>{profileData.name}</h3>
            <p>{profileData.email}</p>
          </div>
        </div>

        <div className="sh-profile-form">
          <div className="sh-form-row">
            <div className="sh-form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
              />
            </div>
            <div className="sh-form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="sh-form-row">
            <div className="sh-form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                placeholder="10 digit mobile number"
                maxLength={10}
              />
            </div>

            {/* Username read-only */}
<div className="sh-form-row">
  <div className="sh-form-group">
    <label>Username</label>
    <input
      type="text"
      value={user?.username || ''}
      readOnly
      style={{ background: '#f3f4f6', cursor: 'not-allowed', color: '#6b7280' }}
    />
    <small style={{ color: '#9ca3af', fontSize: '12px', marginTop: '4px', display: 'block' }}>
      Username cannot be changed
    </small>
  </div>
  <div className="sh-form-group">
    <label>Preferred Travel Type</label>
    <select
      value={profileData.preferredTravelType || ''}
      onChange={(e) => setProfileData(prev => ({ ...prev, preferredTravelType: e.target.value }))}
    >
      <option value="adventure">🏔️ Adventure</option>
      <option value="family">👨‍👩‍👧‍👦 Family</option>
      <option value="honeymoon">💑 Honeymoon</option>
      <option value="luxury">✨ Luxury</option>
      <option value="budget">💰 Budget</option>
      <option value="nature">🌿 Nature</option>
    </select>
  </div>
</div>
            
          </div>

          {/* Gender only row - no dateOfBirth */}
<div className="sh-form-row">
  <div className="sh-form-group">
    <label>Gender</label>
    <select
      value={profileData.gender}
      onChange={(e) => setProfileData(prev => ({ ...prev, gender: e.target.value }))}
    >
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select>
  </div>
  <div className="sh-form-group">
    <label>Age</label>
    <input
      type="number"
      value={profileData.age}
      onChange={(e) => setProfileData(prev => ({ ...prev, age: e.target.value }))}
      placeholder="Your age"
      min="18"
      max="120"
    />
  </div>
</div>

         

          <div className="sh-form-row">
            <div className="sh-form-group full-width">
              <label>Address</label>
              <input
                type="text"
                value={profileData.address}
                onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Enter your address"
              />
            </div>
          </div>

          

          <div className="sh-form-row">
            <div className="sh-form-group full-width">
              <label>Bio</label>
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell us about yourself..."
                rows={4}
              />
            </div>
          </div>

          {saveMessage.text && (
            <div className={`sh-save-message ${saveMessage.type}`}>
              {saveMessage.text}
            </div>
          )}

          <div className="sh-form-actions">
            <button
              className="sh-btn-primary"
              onClick={handleSaveProfile}
              disabled={saveLoading}
            >
              {saveLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettingsPage = () => {
    switch(activeSettingPage) {

      /* ── PROFILE ─────────────────────────────────────────────────────── */
      case 'profile':
        return (
          <div className="sh-settings-detail-page">

            {/* ── Back button (desktop only) ── */}
            <button className="sh-see-more-btn sh-sdp-desktop-back" onClick={handleBackToSettings}>
              <ArrowLeftIcon /> Back to Settings
            </button>

            {/* ── Mobile top-bar ── */}
            <div className="sh-sdp-topbar">
              <button className="sh-sdp-back" onClick={handleBackToSettings}><ArrowLeftIcon /></button>
              <span className="sh-sdp-title">Profile</span>
              <div style={{width:40}} />
            </div>

            {/* ── Avatar section (shared, styled for both) ── */}
            <div className="sh-profile-avatar-unified">
              <div className="sh-pau-avatar sh-avatar-clickable"
                onClick={() => user?.avatar && setAvatarModalOpen(true)}
                title={user?.avatar ? 'Tap to view full photo' : ''}>
                {avatarLoading
                  ? <span className="sh-avatar-spinner sh-avatar-spinner--center" />
                  : user?.avatar
                    ? <img src={user.avatar} alt={profileData.name} />
                    : <span className="sh-pau-initials">{getInitials(profileData.name)}</span>
                }
              </div>
              <div className="sh-pau-info">
                <p className="sh-pau-name">{profileData.name || 'Your Name'}</p>
                <p className="sh-pau-email">{profileData.email}</p>
                <div className="sh-pau-actions">
                  <button className="sh-pau-btn sh-pau-btn--change"
                    onClick={() => avatarFileRef.current?.click()} disabled={avatarLoading}>
                    📷 Change Photo
                  </button>
                  {user?.avatar && (
                    <button className="sh-pau-btn sh-pau-btn--remove"
                      onClick={handleRemoveAvatar} disabled={avatarLoading}>
                      🗑️ Remove
                    </button>
                  )}
                </div>
              </div>
              <input ref={avatarFileRef} type="file" accept="image/*"
                style={{display:'none'}} onChange={handleAvatarChange} disabled={avatarLoading} />
            </div>

            {/* Avatar modal moved to top-level — see below main content area */}

            {/* ── Unified form (works on desktop + mobile) ── */}
            <div className="sh-profile-unified-form">

              {/* ── Desktop: 2-column grid card (hidden on mobile) ── */}
              <div className="sh-profile-card sh-pau-desktop-form">
                <div className="sh-section-header" style={{marginBottom:'4px'}}>
                  <h2 style={{marginBottom:'-30px'}}>Profile Information</h2>
                  <p>Manage your personal details</p>
                </div>
                <div className="sh-profile-form">
                  <div className="sh-form-row">
                    <div className="sh-form-group">
                      <label>Full Name</label>
                      <input type="text" value={profileData.name}
                        onChange={e => setProfileData(p => ({...p, name: e.target.value}))}
                        placeholder="Enter your full name" />
                    </div>
                    <div className="sh-form-group">
                      <label>Email Address</label>
                      <input type="email" value={profileData.email}
                        onChange={e => setProfileData(p => ({...p, email: e.target.value}))}
                        placeholder="Enter your email" />
                    </div>
                  </div>
                  <div className="sh-form-row">
                    <div className="sh-form-group">
                      <label>Phone Number</label>
                      <input type="tel" value={profileData.phone}
                        onChange={e => setProfileData(p => ({...p, phone: e.target.value.replace(/\D/g,'').slice(0,10)}))}
                        placeholder="10 digit mobile number" maxLength={10} />
                    </div>
                    <div className="sh-form-group">
                      <label>Username</label>
                      <input type="text" value={user?.username || ''} readOnly
                        style={{background:'#f3f4f6', cursor:'not-allowed', color:'#6b7280'}} />
                      <small style={{color:'#9ca3af',fontSize:'12px',marginTop:'4px',display:'block'}}>Username cannot be changed</small>
                    </div>
                  </div>
                  <div className="sh-form-row">
                    <div className="sh-form-group">
                      <label>Gender</label>
                      <select value={profileData.gender}
                        onChange={e => setProfileData(p => ({...p, gender: e.target.value}))}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="sh-form-group">
                      <label>Age</label>
                      <input type="number" value={profileData.age} min="18" max="120"
                        onChange={e => setProfileData(p => ({...p, age: e.target.value}))}
                        placeholder="Your age" />
                    </div>
                  </div>
                  <div className="sh-form-row">
                    <div className="sh-form-group full-width">
                      <label>Address</label>
                      <input type="text" value={profileData.address}
                        onChange={e => setProfileData(p => ({...p, address: e.target.value}))}
                        placeholder="Enter your address" />
                    </div>
                  </div>
                  <div className="sh-form-row">
                    <div className="sh-form-group">
                      <label>Preferred Travel Type</label>
                      <select value={profileData.preferredTravelType || ''}
                        onChange={e => setProfileData(p => ({...p, preferredTravelType: e.target.value}))}>
                        <option value="adventure">🏔️ Adventure</option>
                        <option value="family">👨‍👩‍👧‍👦 Family</option>
                        <option value="honeymoon">💑 Honeymoon</option>
                        <option value="luxury">✨ Luxury</option>
                        <option value="budget">💰 Budget</option>
                        <option value="nature">🌿 Nature</option>
                      </select>
                    </div>
                  </div>
                  <div className="sh-form-row">
                    <div className="sh-form-group full-width">
                      <label>Bio</label>
                      <textarea value={profileData.bio} rows={4}
                        onChange={e => setProfileData(p => ({...p, bio: e.target.value}))}
                        placeholder="Tell us about yourself..." />
                    </div>
                  </div>
                  {saveMessage.text && (
                    <div className={`sh-save-message ${saveMessage.type}`}>{saveMessage.text}</div>
                  )}
                  <div className="sh-form-actions">
                    <button className="sh-btn-primary" onClick={handleSaveProfile} disabled={saveLoading}>
                      {saveLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </div>

              {/* ── Mobile: iOS-style stacked cards (hidden on desktop) ── */}
              <div className="sh-pau-mobile-form">
                <div className="sh-sdp-group-label">Basic Info</div>
                <div className="sh-sdp-card">
                  <div className="sh-sdp-field">
                    <label>Full Name</label>
                    <input type="text" value={profileData.name}
                      onChange={e => setProfileData(p => ({...p, name: e.target.value}))}
                      placeholder="Enter your full name" />
                  </div>
                  <div className="sh-sdp-field sh-sdp-field--border">
                    <label>Email Address</label>
                    <input type="email" value={profileData.email}
                      onChange={e => setProfileData(p => ({...p, email: e.target.value}))}
                      placeholder="Enter your email" />
                  </div>
                  <div className="sh-sdp-field sh-sdp-field--border">
                    <label>Phone Number</label>
                    <input type="tel" value={profileData.phone}
                      onChange={e => setProfileData(p => ({...p, phone: e.target.value.replace(/\D/g,'').slice(0,10)}))}
                      placeholder="10 digit mobile number" maxLength={10} />
                  </div>
                  <div className="sh-sdp-field sh-sdp-field--border">
                    <label>Username</label>
                    <input type="text" value={user?.username || ''} readOnly
                      style={{background:'#f3f4f6', color:'#9ca3af', cursor:'not-allowed'}} />
                    <span className="sh-sdp-hint">Username cannot be changed</span>
                  </div>
                </div>

                <div className="sh-sdp-group-label">Personal Details</div>
                <div className="sh-sdp-card">
                  <div className="sh-sdp-field">
                    <label>Gender</label>
                    <select value={profileData.gender}
                      onChange={e => setProfileData(p => ({...p, gender: e.target.value}))}>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="sh-sdp-field sh-sdp-field--border">
                    <label>Age</label>
                    <input type="number" value={profileData.age} min="18" max="120"
                      onChange={e => setProfileData(p => ({...p, age: e.target.value}))}
                      placeholder="Your age" />
                  </div>
                  <div className="sh-sdp-field sh-sdp-field--border">
                    <label>Address</label>
                    <input type="text" value={profileData.address}
                      onChange={e => setProfileData(p => ({...p, address: e.target.value}))}
                      placeholder="Enter your address" />
                  </div>
                  <div className="sh-sdp-field sh-sdp-field--border">
                    <label>Preferred Travel Type</label>
                    <select value={profileData.preferredTravelType || ''}
                      onChange={e => setProfileData(p => ({...p, preferredTravelType: e.target.value}))}>
                      <option value="adventure">🏔️ Adventure</option>
                      <option value="family">👨‍👩‍👧‍👦 Family</option>
                      <option value="honeymoon">💑 Honeymoon</option>
                      <option value="luxury">✨ Luxury</option>
                      <option value="budget">💰 Budget</option>
                      <option value="nature">🌿 Nature</option>
                    </select>
                  </div>
                </div>

                <div className="sh-sdp-group-label">Bio</div>
                <div className="sh-sdp-card">
                  <div className="sh-sdp-field">
                    <label>About You</label>
                    <textarea value={profileData.bio} rows={4}
                      onChange={e => setProfileData(p => ({...p, bio: e.target.value}))}
                      placeholder="Tell us about yourself..." />
                  </div>
                </div>

                {saveMessage.text && (
                  <div className={`sh-save-message ${saveMessage.type}`} style={{margin:'0 0 12px'}}>{saveMessage.text}</div>
                )}
                <button className="sh-sdp-save-btn" onClick={handleSaveProfile} disabled={saveLoading}>
                  {saveLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

            </div>
          </div>
        );

      /* ── NOTIFICATIONS ───────────────────────────────────────────────── */
      case 'notifications':
        return (
          <div className="sh-settings-detail-page sh-sdp-notifications">
            <button className="sh-see-more-btn sh-sdp-desktop-back" onClick={handleBackToSettings}>
              <ArrowLeftIcon /> Back to Settings
            </button>
            <div className="sh-sdp-topbar">
              <button className="sh-sdp-back" onClick={handleBackToSettings}><ArrowLeftIcon /></button>
              <span className="sh-sdp-title">Notifications</span>
              <div style={{width:40}} />
            </div>

            <div className="sh-sdp-body">
              <div className="sh-sdp-group-label">Alert Preferences</div>
              <div className="sh-sdp-card">
                <div className="sh-sdp-toggle-row">
                  <div className="sh-sdp-toggle-icon" style={{background:'#FF9500'}}>
                    <BellIcon />
                  </div>
                  <div className="sh-sdp-toggle-info">
                    <span className="sh-sdp-toggle-title">Email Notifications</span>
                    <span className="sh-sdp-toggle-sub">Booking confirmations &amp; updates</span>
                  </div>
                  <label className="sh-toggle">
                    <input type="checkbox" checked={notifications.email}
                      onChange={e => setNotifications(p => ({...p, email: e.target.checked}))} />
                    <span className="sh-toggle-slider" />
                  </label>
                </div>
                <div className="sh-sdp-toggle-row sh-sdp-toggle-row--border">
                  <div className="sh-sdp-toggle-icon" style={{background:'#FF2D55'}}>
                    <HeartIcon />
                  </div>
                  <div className="sh-sdp-toggle-info">
                    <span className="sh-sdp-toggle-title">Special Offers</span>
                    <span className="sh-sdp-toggle-sub">Exclusive deals &amp; discounts</span>
                  </div>
                  <label className="sh-toggle">
                    <input type="checkbox" checked={notifications.offers}
                      onChange={e => setNotifications(p => ({...p, offers: e.target.checked}))} />
                    <span className="sh-toggle-slider" />
                  </label>
                </div>
              </div>

              {saveMessage.text && (
                <div className={`sh-save-message ${saveMessage.type}`} style={{margin:'0 0 12px'}}>{saveMessage.text}</div>
              )}
              <button className="sh-sdp-save-btn" onClick={handleSaveNotifications} disabled={saveLoading}>
                {saveLoading ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>

            {/* Desktop fallback */}
            <div className="sh-sdp-desktop-only">
              <h2>Notification Settings</h2><hr className="hr" />
              <div className="sh-settings-card">
                <p className="sh-settings-desc">Choose how you want to be notified</p>
                <div className="sh-setting-item">
                  <div className="sh-setting-info"><h4>Email Notifications</h4><p>Receive booking confirmations and updates via email</p></div>
                  <label className="sh-toggle"><input type="checkbox" checked={notifications.email} onChange={e => setNotifications(p => ({...p, email: e.target.checked}))} /><span className="sh-toggle-slider" /></label>
                </div>
                <div className="sh-setting-item">
                  <div className="sh-setting-info"><h4>Special Offers</h4><p>Get notified about exclusive deals and discounts</p></div>
                  <label className="sh-toggle"><input type="checkbox" checked={notifications.offers} onChange={e => setNotifications(p => ({...p, offers: e.target.checked}))} /><span className="sh-toggle-slider" /></label>
                </div>
                {saveMessage.text && <div className={`sh-save-message ${saveMessage.type}`}>{saveMessage.text}</div>}
                <button className="sh-btn-primary" onClick={handleSaveNotifications} disabled={saveLoading}>{saveLoading ? 'Saving...' : 'Save Preferences'}</button>
              </div>
            </div>
          </div>
        );

      /* ── SECURITY ────────────────────────────────────────────────────── */
      case 'security':
        return (
          <div className="sh-settings-detail-page sh-sdp-security">
            <button className="sh-see-more-btn sh-sdp-desktop-back" onClick={handleBackToSettings}>
              <ArrowLeftIcon /> Back to Settings
            </button>
            <div className="sh-sdp-topbar">
              <button className="sh-sdp-back" onClick={handleBackToSettings}><ArrowLeftIcon /></button>
              <span className="sh-sdp-title">Security</span>
              <div style={{width:40}} />
            </div>

            <div className="sh-sdp-body">
              <div className="sh-sdp-group-label">Change Password</div>
              <div className="sh-sdp-card">
                <div className="sh-sdp-field">
                  <label>Current Password</label>
                  <input type="password" value={passwordData.currentPassword}
                    onChange={e => setPasswordData(p => ({...p, currentPassword: e.target.value}))}
                    placeholder="Enter current password" />
                </div>
                <div className="sh-sdp-field sh-sdp-field--border">
                  <label>New Password</label>
                  <input type="password" value={passwordData.newPassword}
                    onChange={e => setPasswordData(p => ({...p, newPassword: e.target.value}))}
                    placeholder="Min 8 chars, uppercase, number" />
                  <span className="sh-sdp-hint">Must contain uppercase, lowercase &amp; a number · e.g. Test@1234</span>
                </div>
                <div className="sh-sdp-field sh-sdp-field--border">
                  <label>Confirm New Password</label>
                  <input type="password" value={passwordData.confirmPassword}
                    onChange={e => setPasswordData(p => ({...p, confirmPassword: e.target.value}))}
                    placeholder="Confirm new password" />
                </div>
              </div>

              {saveMessage.text && (
                <div className={`sh-save-message ${saveMessage.type}`} style={{margin:'0 0 12px'}}>{saveMessage.text}</div>
              )}
              <button className="sh-sdp-save-btn" onClick={handleChangePassword} disabled={saveLoading}>
                {saveLoading ? 'Updating...' : 'Change Password'}
              </button>

              <div className="sh-sdp-group-label">Privacy</div>
              <div className="sh-sdp-card">
                <div className="sh-sdp-toggle-row">
                  <div className="sh-sdp-toggle-icon" style={{background:'#34C759'}}><ShieldIcon /></div>
                  <div className="sh-sdp-toggle-info">
                    <span className="sh-sdp-toggle-title">Profile Visibility</span>
                    <span className="sh-sdp-toggle-sub">Visible to other travellers</span>
                  </div>
                  <label className="sh-toggle">
                    <input type="checkbox" checked={privacy.profileVisible}
                      onChange={e => setPrivacy(p => ({...p, profileVisible: e.target.checked}))} />
                    <span className="sh-toggle-slider" />
                  </label>
                </div>
                <div className="sh-sdp-toggle-row sh-sdp-toggle-row--border">
                  <div className="sh-sdp-toggle-icon" style={{background:'#5856D6'}}><CalendarIcon /></div>
                  <div className="sh-sdp-toggle-info">
                    <span className="sh-sdp-toggle-title">Show Bookings</span>
                    <span className="sh-sdp-toggle-sub">Others can see your past trips</span>
                  </div>
                  <label className="sh-toggle">
                    <input type="checkbox" checked={privacy.showBookings}
                      onChange={e => setPrivacy(p => ({...p, showBookings: e.target.checked}))} />
                    <span className="sh-toggle-slider" />
                  </label>
                </div>
              </div>
            </div>

            {/* Desktop fallback */}
            <div className="sh-sdp-desktop-only">
              <h2>Security &amp; Privacy</h2><hr className="hr" />
              <div className="sh-settings-card">
                <h3>Change Password</h3>
                <div className="sh-password-form">
                  <div className="sh-form-group"><label>Current Password</label><input type="password" value={passwordData.currentPassword} onChange={e => setPasswordData(p => ({...p, currentPassword: e.target.value}))} placeholder="Enter current password" /></div>
                  <div className="sh-form-group"><label>New Password</label><input type="password" value={passwordData.newPassword} onChange={e => setPasswordData(p => ({...p, newPassword: e.target.value}))} placeholder="Min 8 chars, uppercase, lowercase, number" /><small style={{color:'#9ca3af',fontSize:'12px',marginTop:'4px',display:'block'}}>Must contain uppercase, lowercase and a number e.g. <strong>Test@1234</strong></small></div>
                  <div className="sh-form-group"><label>Confirm New Password</label><input type="password" value={passwordData.confirmPassword} onChange={e => setPasswordData(p => ({...p, confirmPassword: e.target.value}))} placeholder="Confirm new password" /></div>
                  {saveMessage.text && <div className={`sh-save-message ${saveMessage.type}`}>{saveMessage.text}</div>}
                  <button className="sh-btn-primary" onClick={handleChangePassword} disabled={saveLoading}>{saveLoading ? 'Updating...' : 'Change Password'}</button>
                </div>
              </div>
              <div className="sh-settings-card">
                <h3>Privacy Settings</h3>
                <div className="sh-setting-item"><div className="sh-setting-info"><h4>Profile Visibility</h4><p>Make your profile visible to other travelers</p></div><label className="sh-toggle"><input type="checkbox" checked={privacy.profileVisible} onChange={e => setPrivacy(p => ({...p, profileVisible: e.target.checked}))} /><span className="sh-toggle-slider" /></label></div>
                <div className="sh-setting-item"><div className="sh-setting-info"><h4>Show Bookings</h4><p>Allow others to see your past trips</p></div><label className="sh-toggle"><input type="checkbox" checked={privacy.showBookings} onChange={e => setPrivacy(p => ({...p, showBookings: e.target.checked}))} /><span className="sh-toggle-slider" /></label></div>
              </div>
            </div>
          </div>
        );

      /* ── TRAVEL PREFERENCES ──────────────────────────────────────────── */
      case 'travel':
        return (
          <div className="sh-settings-detail-page sh-sdp-travel">
            <button className="sh-see-more-btn sh-sdp-desktop-back" onClick={handleBackToSettings}>
              <ArrowLeftIcon /> Back to Settings
            </button>
            <div className="sh-sdp-topbar">
              <button className="sh-sdp-back" onClick={handleBackToSettings}><ArrowLeftIcon /></button>
              <span className="sh-sdp-title">Travel Preferences</span>
              <div style={{width:40}} />
            </div>

            <div className="sh-sdp-body">
              <div className="sh-sdp-group-label">Flight &amp; Room</div>
              <div className="sh-sdp-card">
                <div className="sh-sdp-field">
                  <label>Seat Preference</label>
                  <select value={travelPrefs.seatPreference}
                    onChange={e => setTravelPrefs(p => ({...p, seatPreference: e.target.value}))}>
                    <option value="">Select preference</option>
                    <option value="window">🪟 Window Seat</option>
                    <option value="aisle">🚶 Aisle Seat</option>
                    <option value="middle">💺 Middle Seat</option>
                  </select>
                </div>
                <div className="sh-sdp-field sh-sdp-field--border">
                  <label>Meal Preference</label>
                  <select value={travelPrefs.mealPreference}
                    onChange={e => setTravelPrefs(p => ({...p, mealPreference: e.target.value}))}>
                    <option value="">Select preference</option>
                    <option value="vegetarian">🥦 Vegetarian</option>
                    <option value="non-vegetarian">🍗 Non-Vegetarian</option>
                    <option value="vegan">🌱 Vegan</option>
                    <option value="jain">🍽️ Jain</option>
                  </select>
                </div>
                <div className="sh-sdp-field sh-sdp-field--border">
                  <label>Room Type</label>
                  <select value={travelPrefs.roomType}
                    onChange={e => setTravelPrefs(p => ({...p, roomType: e.target.value}))}>
                    <option value="">Select preference</option>
                    <option value="standard">🛏️ Standard Room</option>
                    <option value="deluxe">✨ Deluxe Room</option>
                    <option value="suite">👑 Suite</option>
                    <option value="connecting">🔗 Connecting Rooms</option>
                  </select>
                </div>
              </div>

              <div className="sh-sdp-group-label">Other</div>
              <div className="sh-sdp-card">
                <div className="sh-sdp-toggle-row">
                  <div className="sh-sdp-toggle-icon" style={{background:'#8e8e93'}}>
                    <PlaneIcon />
                  </div>
                  <div className="sh-sdp-toggle-info">
                    <span className="sh-sdp-toggle-title">Smoking Room</span>
                    <span className="sh-sdp-toggle-sub">Prefer smoking rooms where available</span>
                  </div>
                  <label className="sh-toggle">
                    <input type="checkbox" checked={travelPrefs.smoking}
                      onChange={e => setTravelPrefs(p => ({...p, smoking: e.target.checked}))} />
                    <span className="sh-toggle-slider" />
                  </label>
                </div>
              </div>

              {saveMessage.text && (
                <div className={`sh-save-message ${saveMessage.type}`} style={{margin:'0 0 12px'}}>{saveMessage.text}</div>
              )}
              <button className="sh-sdp-save-btn" onClick={handleSaveTravelPrefs} disabled={saveLoading}>
                {saveLoading ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>

            {/* Desktop fallback */}
            <div className="sh-sdp-desktop-only">
              <h2>Travel Preferences</h2><hr className="hr" />
              <div className="sh-settings-card">
                <p className="sh-settings-desc">Customize your travel experience</p>
                <div className="sh-form-group"><label>Seat Preference</label><select value={travelPrefs.seatPreference} onChange={e => setTravelPrefs(p => ({...p, seatPreference: e.target.value}))}><option value="">Select preference</option><option value="window">Window Seat</option><option value="aisle">Aisle Seat</option><option value="middle">Middle Seat</option></select></div>
                <div className="sh-form-group"><label>Meal Preference</label><select value={travelPrefs.mealPreference} onChange={e => setTravelPrefs(p => ({...p, mealPreference: e.target.value}))}><option value="">Select preference</option><option value="vegetarian">Vegetarian</option><option value="non-vegetarian">Non-Vegetarian</option><option value="vegan">Vegan</option><option value="jain">Jain</option></select></div>
                <div className="sh-form-group"><label>Room Type Preference</label><select value={travelPrefs.roomType} onChange={e => setTravelPrefs(p => ({...p, roomType: e.target.value}))}><option value="">Select preference</option><option value="standard">Standard Room</option><option value="deluxe">Deluxe Room</option><option value="suite">Suite</option><option value="connecting">Connecting Rooms</option></select></div>
                <div className="sh-setting-item"><div className="sh-setting-info"><h4>Smoking Room</h4><p>Prefer smoking rooms where available</p></div><label className="sh-toggle"><input type="checkbox" checked={travelPrefs.smoking} onChange={e => setTravelPrefs(p => ({...p, smoking: e.target.checked}))} /><span className="sh-toggle-slider" /></label></div>
                {saveMessage.text && <div className={`sh-save-message ${saveMessage.type}`}>{saveMessage.text}</div>}
                <button className="sh-btn-primary" onClick={handleSaveTravelPrefs} disabled={saveLoading}>{saveLoading ? 'Saving...' : 'Save Preferences'}</button>
              </div>
            </div>
          </div>
        );

      /* ── SUPPORT ─────────────────────────────────────────────────────── */
      case 'support':
        return (
          <div className="sh-settings-detail-page sh-sdp-support">
            <button className="sh-see-more-btn sh-sdp-desktop-back" onClick={handleBackToSettings}>
              <ArrowLeftIcon /> Back to Settings
            </button>
            <div className="sh-sdp-topbar">
              <button className="sh-sdp-back" onClick={handleBackToSettings}><ArrowLeftIcon /></button>
              <span className="sh-sdp-title">Help &amp; Support</span>
              <div style={{width:40}} />
            </div>

            <div className="sh-sdp-body">
              <div className="sh-sdp-group-label">Contact Us</div>
              <div className="sh-sdp-card">
                <button className="sh-sdp-support-row" onClick={() => setShowFullChatbot(true)}>
                  <div className="sh-sdp-support-icon" style={{background:'#059669'}}><MessageCircleIcon /></div>
                  <div className="sh-sdp-support-text">
                    <span className="sh-sdp-support-title">Live Chat</span>
                    <span className="sh-sdp-support-sub">Chat with our team 24/7</span>
                  </div>
                  <span className="sh-mob-row-chevron"><ChevronRightIcon /></span>
                </button>
                <button className="sh-sdp-support-row sh-sdp-support-row--border">
                  <div className="sh-sdp-support-icon" style={{background:'#5AC8FA'}}><PhoneCallIcon /></div>
                  <div className="sh-sdp-support-text">
                    <span className="sh-sdp-support-title">Call Us</span>
                    <span className="sh-sdp-support-sub">+91 98765 43210</span>
                  </div>
                  <span className="sh-mob-row-chevron"><ChevronRightIcon /></span>
                </button>
                <button className="sh-sdp-support-row sh-sdp-support-row--border">
                  <div className="sh-sdp-support-icon" style={{background:'#FF9500'}}><MailIcon /></div>
                  <div className="sh-sdp-support-text">
                    <span className="sh-sdp-support-title">Email Support</span>
                    <span className="sh-sdp-support-sub">support@shimlatravels.com</span>
                  </div>
                  <span className="sh-mob-row-chevron"><ChevronRightIcon /></span>
                </button>
                <button className="sh-sdp-support-row sh-sdp-support-row--border" onClick={() => navigate('/About#FAQs')}>
                  <div className="sh-sdp-support-icon" style={{background:'#5856D6'}}><FileTextIcon /></div>
                  <div className="sh-sdp-support-text">
                    <span className="sh-sdp-support-title">FAQs</span>
                    <span className="sh-sdp-support-sub">Find answers to common questions</span>
                  </div>
                  <span className="sh-mob-row-chevron"><ChevronRightIcon /></span>
                </button>
              </div>
            </div>

            {/* Desktop fallback */}
            <div className="sh-sdp-desktop-only">
              <h2>Help &amp; Support</h2><hr className="hr" />
              <div className="sh-support-grid">
                <div className="sh-support-card"><MessageCircleIcon /><h3>Live Chat</h3><p>Chat with our support team 24/7</p><button className="sh-btn-primary" onClick={() => setShowFullChatbot(true)}>Start Chat</button></div>
                <div className="sh-support-card"><PhoneCallIcon /><h3>Call Us</h3><p>+91 98765 43210</p><button className="sh-btn-outline">Call Now</button></div>
                <div className="sh-support-card"><MailIcon /><h3>Email Support</h3><p>support@shimlatravels.com</p><button className="sh-btn-outline">Send Email</button></div>
                <div className="sh-support-card"><FileTextIcon /><h3>FAQs</h3><p>Find answers to common questions</p><button className="sh-btn-outline" onClick={() => navigate('/About#FAQs')}>View FAQs</button></div>
              </div>
            </div>
          </div>
        );

      /* ── ABOUT ───────────────────────────────────────────────────────── */
      case 'about':
        return (
          <div className="sh-settings-detail-page sh-sdp-about">
            <button className="sh-see-more-btn sh-sdp-desktop-back" onClick={handleBackToSettings}>
              <ArrowLeftIcon /> Back to Settings
            </button>
            <div className="sh-sdp-topbar">
              <button className="sh-sdp-back" onClick={handleBackToSettings}><ArrowLeftIcon /></button>
              <span className="sh-sdp-title">About</span>
              <div style={{width:40}} />
            </div>

            <div className="sh-sdp-body">
              {/* App identity card */}
              <div className="sh-sdp-about-hero">
                <div className="sh-sdp-about-logo"><MountainIcon /></div>
                <h2>Shimla Tourism</h2>
                <span className="sh-sdp-version-badge">Version 2.0.0</span>
                <p>Your trusted companion for exploring the Queen of Hills.</p>
              </div>

              <div className="sh-sdp-group-label">Legal</div>
              <div className="sh-sdp-card">
                <button className="sh-sdp-about-row" onClick={() => navigate('/Terms#privacy')}>
                  <span>Privacy Policy</span><span className="sh-mob-row-chevron"><ChevronRightIcon /></span>
                </button>
                <button className="sh-sdp-about-row sh-sdp-about-row--border" onClick={() => navigate('/Terms#terms')}>
                  <span>Terms of Service</span><span className="sh-mob-row-chevron"><ChevronRightIcon /></span>
                </button>
                <button className="sh-sdp-about-row sh-sdp-about-row--border" onClick={() => navigate('/Terms#cancellation')}>
                  <span>Cancellation &amp; Refund Policy</span><span className="sh-mob-row-chevron"><ChevronRightIcon /></span>
                </button>
              </div>
            </div>

            {/* Desktop fallback */}
            <div className="sh-sdp-desktop-only">
              <h2>About</h2><hr className="hr" />
              <div className="sh-about-card">
                <div className="sh-about-logo"><MountainIcon /><h1>Shimla Tourism</h1></div>
                <p>Version 2.0.0</p>
                <p>Your trusted companion for exploring the Queen of Hills.</p>
                <div className="sh-about-links">
                  <button className="term" onClick={() => navigate('/Terms#privacy')}>Privacy Policy</button>
                  <button className="term" onClick={() => navigate('/Terms#terms')}>Terms of Service</button>
                  <button className="term" onClick={() => navigate('/Terms#cancellation')}>Cancellation &amp; Refund Policy</button>
                </div>
              </div>
            </div>
          </div>
        );

      /* ── DELETE ──────────────────────────────────────────────────────── */
      case 'delete':
        return (
          <div className="sh-settings-detail-page sh-sdp-delete">
            <button className="sh-see-more-btn sh-sdp-desktop-back" onClick={handleBackToSettings}>
              <ArrowLeftIcon /> Back to Settings
            </button>
            <div className="sh-sdp-topbar">
              <button className="sh-sdp-back" onClick={handleBackToSettings}><ArrowLeftIcon /></button>
              <span className="sh-sdp-title" style={{color:'#FF3B30'}}>Delete Account</span>
              <div style={{width:40}} />
            </div>

            <div className="sh-sdp-body">
              {!showDeleteConfirm ? (
                <>
                  <div className="sh-sdp-danger-banner">
                    <div className="sh-sdp-danger-icon"><AlertTriangleIcon /></div>
                    <h3>This action cannot be undone</h3>
                    <p>All your data will be permanently deleted including bookings, saved items, and activity history.</p>
                  </div>

                  <div className="sh-sdp-group-label">What will be deleted</div>
                  <div className="sh-sdp-card">
                    {['All personal information','All bookings (upcoming & past)','All saved items and favorites','All activity history'].map((item, i) => (
                      <div key={i} className={`sh-sdp-delete-item${i > 0 ? ' sh-sdp-delete-item--border' : ''}`}>
                        <span className="sh-sdp-delete-dot">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <button className="sh-sdp-delete-proceed-btn" onClick={() => setShowDeleteConfirm(true)}>
                    Continue to Delete
                  </button>
                  <button className="sh-sdp-cancel-btn" onClick={handleBackToSettings}>
                    Cancel, Keep My Account
                  </button>
                </>
              ) : (
                <>
                  <div className="sh-sdp-danger-banner">
                    <div className="sh-sdp-danger-icon"><AlertTriangleIcon /></div>
                    <h3>Final Confirmation</h3>
                    <p>Enter your password and type DELETE to confirm.</p>
                  </div>

                  <div className="sh-sdp-group-label">Confirm Identity</div>
                  <div className="sh-sdp-card">
                    <div className="sh-sdp-field">
                      <label>Your Password</label>
                      <input type="password" value={deletePassword}
                        onChange={e => setDeletePassword(e.target.value)}
                        placeholder="Enter your password" />
                    </div>
                    <div className="sh-sdp-field sh-sdp-field--border">
                      <label>Type DELETE to confirm</label>
                      <input type="text" value={deleteConfirmText}
                        onChange={e => setDeleteConfirmText(e.target.value)}
                        placeholder="DELETE"
                        style={{textTransform:'uppercase', letterSpacing:'0.15em', fontWeight:'700'}} />
                    </div>
                  </div>

                  {deleteError && <div className="delete-error" style={{margin:'0 0 12px'}}>{deleteError}</div>}

                  <button
                    className={`sh-sdp-delete-final-btn${deleteConfirmText.toUpperCase() !== 'DELETE' ? ' sh-sdp-delete-final-btn--disabled' : ''}`}
                    onClick={handleDeleteAccount}
                    disabled={deleteConfirmText.toUpperCase() !== 'DELETE' || isDeleting}>
                    {isDeleting ? 'Deleting Account...' : '🗑️ Permanently Delete Account'}
                  </button>
                  <button className="sh-sdp-cancel-btn" onClick={() => { setShowDeleteConfirm(false); setDeleteConfirmText(''); setDeleteError(''); }}>
                    Cancel
                  </button>
                </>
              )}
            </div>

            {/* Desktop fallback */}
            <div className="sh-sdp-desktop-only">
              <h2>Delete Account</h2><hr className="hr" />
              {!showDeleteConfirm ? (
                <div className="sh-delete-card">
                  <AlertTriangleIcon />
                  <h3>Warning: This action cannot be undone</h3>
                  <p>Deleting your account will permanently remove all your data including:</p>
                  <ul className="delete-list"><li>• All personal information</li><li>• All bookings (upcoming and past)</li><li>• All saved items and favorites</li><li>• All activity history</li></ul>
                  <div className="sh-delete-actions">
                    <button className="sh-btn-danger-large" onClick={handleBackToSettings}>Cancel</button>
                    <button className="sh-btn-danger-outline" onClick={() => setShowDeleteConfirm(true)}>Continue to Delete</button>
                  </div>
                </div>
              ) : (
                <div className="sh-delete-confirm-card">
                  <AlertTriangleIcon />
                  <p>Enter your password to confirm:</p>
                  <input type="password" value={deletePassword} onChange={e => setDeletePassword(e.target.value)} placeholder="Enter your password" className="sh-delete-input" style={{marginBottom:'12px'}} />
                  <h3>Final Confirmation</h3>
                  <p>Please type <strong>DELETE</strong> to confirm account deletion:</p>
                  <input type="text" value={deleteConfirmText} onChange={e => setDeleteConfirmText(e.target.value)} placeholder="Type DELETE here" className="delete-confirm-input" />
                  {deleteError && <div className="delete-error">{deleteError}</div>}
                  <div className="sh-delete-actions">
                    <button className="sh-btn-danger-large" onClick={() => { setShowDeleteConfirm(false); setDeleteConfirmText(''); setDeleteError(''); }}>Cancel</button>
                    <button className={`sh-btn-danger-final ${deleteConfirmText.toUpperCase() !== 'DELETE' ? 'disabled' : ''}`} onClick={handleDeleteAccount} disabled={deleteConfirmText.toUpperCase() !== 'DELETE' || isDeleting}>{isDeleting ? 'Deleting...' : 'Permanently Delete Account'}</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderSettings = () => (
    <div className="sh-settings-section">
      {/* ── Desktop: section header + grid (unchanged) ── */}
      <div className="sh-section-header">
        <h2>Settings</h2>
        <p>Manage your account preferences</p>
      </div>

      <div className="sh-settings-menu-grid">
        {settingsMenu.map(item => (
          <button
            key={item.id}
            className="sh-settings-menu-item"
            onClick={() => setActiveSettingPage(item.id)}
            style={{'--setting-color': item.color}}
          >
            <div className="sh-setting-icon-wrap" style={{backgroundColor: `${item.color}15`, color: item.color}}>
              {item.icon}
            </div>
            <div className="sh-setting-label">
              <span>{item.label}</span>
              <ChevronRightIcon />
            </div>
          </button>
        ))}
      </div>

      <button className="sh-logout-btn-large" onClick={handleLogout}>
        <LogoutIcon /> Logout
      </button>

      {/* ── Mobile: hero + iOS-style grouped list (hidden on desktop via CSS) ── */}
      <div className="sh-mob-settings-hero">
        <div className="sh-mob-settings-hero-inner">
          <div className="sh-mob-settings-avatar">
            {user?.avatar
              ? <img src={user.avatar} alt={profileData.name} />
              : getInitials(profileData.name)
            }
          </div>
          <div className="sh-mob-settings-info">
            <h2>{profileData.name || 'Traveller'}</h2>
            <p>{profileData.email}</p>
            <span className="sh-mob-settings-badge">
              <CheckIcon /> Verified Member
            </span>
          </div>
        </div>
      </div>

      <div className="sh-mob-settings-list">
        {/* Group 1: Account */}
        <div className="sh-mob-group-label">Account</div>
        <div className="sh-mob-group-card">
          <button className="sh-mob-settings-row" onClick={() => setActiveSettingPage('profile')}>
            <div className="sh-mob-row-icon" style={{background:'#007AFF'}}><ProfileIcon /></div>
            <div className="sh-mob-row-text">
              <span className="sh-mob-row-title">Profile Information</span>
              <span className="sh-mob-row-subtitle">Name, email, phone, bio</span>
            </div>
            <span className="sh-mob-row-chevron"><ChevronRightIcon /></span>
          </button>
          <button className="sh-mob-settings-row" onClick={() => setActiveSettingPage('notifications')}>
            <div className="sh-mob-row-icon" style={{background:'#FF9500'}}><BellIcon /></div>
            <div className="sh-mob-row-text">
              <span className="sh-mob-row-title">Notifications</span>
              <span className="sh-mob-row-subtitle">Email alerts &amp; offers</span>
            </div>
            <span className="sh-mob-row-chevron"><ChevronRightIcon /></span>
          </button>
          <button className="sh-mob-settings-row" onClick={() => setActiveSettingPage('travel')}>
            <div className="sh-mob-row-icon" style={{background:'#FF2D55'}}><PlaneIcon /></div>
            <div className="sh-mob-row-text">
              <span className="sh-mob-row-title">Travel Preferences</span>
              <span className="sh-mob-row-subtitle">Seat, meal, room type</span>
            </div>
            <span className="sh-mob-row-chevron"><ChevronRightIcon /></span>
          </button>
        </div>

        {/* Group 2: Security */}
        <div className="sh-mob-group-label">Security</div>
        <div className="sh-mob-group-card">
          <button className="sh-mob-settings-row" onClick={() => setActiveSettingPage('security')}>
            <div className="sh-mob-row-icon" style={{background:'#34C759'}}><ShieldIcon /></div>
            <div className="sh-mob-row-text">
              <span className="sh-mob-row-title">Security &amp; Privacy</span>
              <span className="sh-mob-row-subtitle">Password, visibility</span>
            </div>
            <span className="sh-mob-row-chevron"><ChevronRightIcon /></span>
          </button>
        </div>

        {/* Group 3: Support */}
        <div className="sh-mob-group-label">Support &amp; Info</div>
        <div className="sh-mob-group-card">
          <button className="sh-mob-settings-row" onClick={() => setActiveSettingPage('support')}>
            <div className="sh-mob-row-icon" style={{background:'#5AC8FA'}}><HeadphonesIcon /></div>
            <div className="sh-mob-row-text">
              <span className="sh-mob-row-title">Help &amp; Support</span>
              <span className="sh-mob-row-subtitle">Chat, call, email, FAQs</span>
            </div>
            <span className="sh-mob-row-chevron"><ChevronRightIcon /></span>
          </button>
          <button className="sh-mob-settings-row" onClick={() => setActiveSettingPage('about')}>
            <div className="sh-mob-row-icon" style={{background:'#5856D6'}}><InfoIcon /></div>
            <div className="sh-mob-row-text">
              <span className="sh-mob-row-title">About</span>
              <span className="sh-mob-row-subtitle">Version, terms, privacy</span>
            </div>
            <span className="sh-mob-row-chevron"><ChevronRightIcon /></span>
          </button>
        </div>

        {/* Group 4: Danger */}
        <div className="sh-mob-group-label">Danger Zone</div>
        <div className="sh-mob-group-card">
          <button className="sh-mob-settings-row" onClick={() => setActiveSettingPage('delete')}>
            <div className="sh-mob-row-icon" style={{background:'#FF3B30'}}><TrashIcon /></div>
            <div className="sh-mob-row-text">
              <span className="sh-mob-row-title" style={{color:'#FF3B30'}}>Delete Account</span>
              <span className="sh-mob-row-subtitle">Permanently remove your data</span>
            </div>
            <span className="sh-mob-row-chevron"><ChevronRightIcon /></span>
          </button>
        </div>

        {/* Logout */}
        <div className="sh-mob-logout-row">
          <button className="sh-mob-logout-btn" onClick={handleLogout}>
            <LogoutIcon /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );

  if (authLoading) {
    return <div className="sh-account-loading">Loading...</div>;
  }

  return (
    <div className="sh-account-container">

      {/* ── Profile Completion Modal — shown for incomplete Google/new accounts ── */}
      {showProfileModal && user && (
        <ProfileCompletionModal
          user={user}
          onComplete={(updatedUser) => {
            modalDismissedRef.current = true;
            setShowProfileModal(false);
            updateUser({ ...updatedUser, profileCompleted: true });
            toast.success('Profile completed! 🎉');
          }}
          onSkip={() => {
            modalDismissedRef.current = true;
            setShowProfileModal(false);
          }}
        />
      )}

      <Navbar />
      {/* Mobile hero header — visible on mobile only via CSS */}
      {renderMobileHero()}
      <div className="sh-mobile-header">
        <button className="sh-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        <h1>My Account</h1>
        <div className="sh-user-avatar-small"
          style={{ cursor: user?.avatar ? 'pointer' : 'default' }}
          onClick={() => user?.avatar && setAvatarModalOpen(true)}
          title={user?.avatar ? 'View profile picture' : ''}
        >
          {user?.avatar
            ? <img src={user.avatar} alt={profileData.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            : getInitials(profileData.name)
          }
        </div>
      </div>

{renderAllActivitiesModal()}
      <div className="sh-account-layout">
        <aside className={`sh-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="sh-sidebar-header">
            <div className="sh-user-info">
              <div className="sh-user-avatar"
                style={{ cursor: user?.avatar ? 'pointer' : 'default' }}
                onClick={() => user?.avatar && setAvatarModalOpen(true)}
                title={user?.avatar ? 'View profile picture' : ''}
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt={profileData.name} />
                ) : (
                  <span>{getInitials(profileData.name)}</span>
                )}
              </div>
              <div className="sh-user-details">
  <h3>{profileData.name}</h3>
  <p style={{ color: '#059669', fontWeight: '600', fontSize: '13px' }}>@{user?.username}</p>
</div>
            </div>
          </div>

          <nav className="sh-sidebar-nav">
            <button
              className={activeSection === 'dashboard' ? 'active' : ''}
              onClick={() => { setActiveSection('dashboard'); setIsMobileMenuOpen(false); }}
            >
              <DashboardIcon /> Dashboard
            </button>
            <button
              className={activeSection === 'bookings' ? 'active' : ''}
              onClick={() => { setActiveSection('bookings'); setIsMobileMenuOpen(false); }}
            >
              <CalendarIcon /> My Bookings
            </button>
            <button
              className={activeSection === 'saved' ? 'active' : ''}
              onClick={() => { setActiveSection('saved'); setIsMobileMenuOpen(false); }}
            >
              <HeartIcon /> Saved Items
            </button>
            <button
              className={activeSection === 'settings' ? 'active' : ''}
              onClick={() => { setActiveSection('settings'); setActiveSettingPage(null); setIsMobileMenuOpen(false); }}
            >
              <SettingsIcon /> Settings
            </button>

            {/* Admin Panel button — only visible to users with admin role */}
            {user?.role === 'admin' && (
              <button
                className="sh-admin-nav-btn"
                onClick={() => { navigate('/admin'); setIsMobileMenuOpen(false); }}
              >
                <ShieldIcon /> Admin Panel
              </button>
            )}
          </nav>

          <div className="sh-sidebar-footer">
            <button className="sh-logout-btn" onClick={handleLogout}>
              <LogoutIcon /> Logout
            </button>
          </div>
        </aside>

        <main className="sh-main-content">
        {activeSection === 'dashboard' && renderDashboard()}
        {activeSection === 'bookings' && renderBookings()}
        {activeSection === 'saved' && <SavedItemsTab onRefreshStats={fetchDashboardStats} />}
        {activeSection === 'settings' && !activeSettingPage && renderSettings()}
        {activeSection === 'settings' && activeSettingPage && renderSettingsPage()}
      </main>
    </div>

    {showFullChatbot && (
      <FullPageChatbot onClose={() => setShowFullChatbot(false)} />
    )}

    {/* Mobile bottom tab bar — visible on mobile only via CSS */}
    <MobileTabBar />

    {/* ── Avatar full-size preview modal — top-level so works from ANY tab ── */}
    {avatarModalOpen && user?.avatar && (
      <div
        className="sh-avatar-modal-overlay"
        onClick={() => setAvatarModalOpen(false)}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div
          className="sh-avatar-modal"
          onClick={e => e.stopPropagation()}
          style={{ position: 'relative', padding: 8 }}
        >
          <button
            className="sh-avatar-modal-close"
            onClick={() => setAvatarModalOpen(false)}
            style={{ position: 'absolute', top: -12, right: -12, background: '#fff', border: 'none', borderRadius: '50%', width: 32, height: 32, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.3)', zIndex: 1 }}
          >✕</button>
          <img
            src={user.avatar}
            alt="Profile picture"
            className="sh-avatar-modal-img"
            style={{ maxWidth: '80vw', maxHeight: '80vh', borderRadius: '50%', display: 'block', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
          />
        </div>
      </div>
    )}


{cropModalOpen && imageSrc && (
  <div style={{
    position:'fixed', inset:0, zIndex:999999,
    background:'rgba(0,0,0,0.95)',
    display:'flex', flexDirection:'column',
    alignItems:'center', justifyContent:'center',
    fontFamily:'system-ui, sans-serif'
  }}>
    {/* Title */}
    <p style={{color:'#fff', fontWeight:600, fontSize:16, marginBottom:12}}>
      Move and scale
    </p>

    {/* Cropper area */}
    <div style={{position:'relative', width:320, height:320, borderRadius:'50%', overflow:'hidden'}}>
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={1}
        cropShape="round"
        showGrid={false}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
      />
    </div>

    {/* Zoom slider */}
    <input
      type="range" min={1} max={3} step={0.01}
      value={zoom}
      onChange={e => setZoom(Number(e.target.value))}
      style={{
        width:260, marginTop:24,
        accentColor:'#059669'
      }}
    />
    <p style={{color:'rgba(255,255,255,0.5)', fontSize:12, marginTop:4}}>
      Pinch or slide to zoom
    </p>

    {/* Buttons */}
    <div style={{display:'flex', gap:12, marginTop:20}}>
      <button onClick={() => { setCropModalOpen(false); setImageSrc(null); }}
        style={{
          padding:'10px 28px', borderRadius:8,
          background:'rgba(255,255,255,0.12)',
          border:'1px solid rgba(255,255,255,0.2)',
          color:'#fff', fontSize:14, fontWeight:600, cursor:'pointer'
        }}>
        Cancel
      </button>
      <button onClick={handleCropConfirm}
        style={{
          padding:'10px 28px', borderRadius:8,
          background:'linear-gradient(135deg,#059669,#0d9488)',
          border:'none',
          color:'#fff', fontSize:14, fontWeight:600, cursor:'pointer'
        }}>
        Save Photo
      </button>
    </div>
  </div>
)}
  </div>
);
};

// ─────────────────────────────────────────────────────────────────────
// FULL-PAGE CHATBOT — opened from Help & Support → Start Chat
// ─────────────────────────────────────────────────────────────────────

const fpcResponses = {
  greeting:     { message: "Hello! 👋 Welcome to Shimla Travels Support! How can I help you today?", quickReplies: [{ id: 'hotel_details', label: '🏨 Hotels' }, { id: 'package_info', label: '📦 Packages' }, { id: 'booking_issue', label: '📋 Bookings' }, { id: 'payment_problem', label: '💳 Payments' }, { id: 'tourist_places', label: '🗺️ Tourist Places' }, { id: 'discounts', label: '🎁 Offers' }, { id: 'speak_agent', label: '👤 Talk to Agent' }] },
  welcome:      { message: "Welcome! 👋 I am your Shimla Travels virtual assistant.\nWhat would you like to know?", quickReplies: [{ id: 'tourist_places', label: '🗺️ Tourist Places' }, { id: 'activities', label: '🏔️ Activities' }, { id: 'hotel_details', label: '🏨 Hotels' }, { id: 'package_info', label: '📦 Packages' }, { id: 'transport', label: '🚗 How to Reach' }, { id: 'food', label: '🍽️ Food & Cafes' }, { id: 'discounts', label: '🎁 Offers' }, { id: 'booking_issue', label: '📋 Bookings' }, { id: 'speak_agent', label: '☎️ Contact Us' }] },
  main_menu:    { message: "Main Menu — How can I help you? 😊", quickReplies: [{ id: 'tourist_places', label: '🗺️ Tourist Places' }, { id: 'activities', label: '🏔️ Activities' }, { id: 'hotel_details', label: '🏨 Hotels' }, { id: 'package_info', label: '📦 Packages' }, { id: 'transport', label: '🚗 How to Reach' }, { id: 'food', label: '🍽️ Food & Cafes' }, { id: 'best_time', label: '🌤️ Best Time' }, { id: 'discounts', label: '🎁 Offers' }, { id: 'booking_issue', label: '📋 Bookings' }, { id: 'payment_problem', label: '💳 Payments' }, { id: 'nearby_destinations', label: '📍 Nearby Places' }, { id: 'emergency', label: '🚨 Emergency' }, { id: 'speak_agent', label: '☎️ Contact Us' }] },
  booking_issue:{ message: "I can help with booking issues! What kind of problem are you facing?", quickReplies: [{ id: 'modify_booking', label: '✏️ Modify Booking' }, { id: 'cancel_booking', label: '❌ Cancel Booking' }, { id: 'booking_not_found', label: "🔍 Can't Find Booking" }, { id: 'payment_failed', label: '💸 Payment Failed' }, { id: 'speak_agent', label: '👤 Speak to Agent' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  modify_booking:{ message: "To modify your booking, share your reference (HTL-XXXXX or PKG-XXXXX). Our team will assist within 2 hours! 🕐\n\nPolicy:\n• Hotels: Up to 48 hrs before check-in\n• Packages: Up to 7 days before travel", quickReplies: [{ id: 'speak_agent', label: '👤 Contact Agent' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  cancel_booking:{ message: "Cancellation Policy 👇\n\n🏨 Hotels:\n• Free up to 24 hrs before\n• 50% charge within 24 hrs\n\n📦 Packages:\n• Free up to 7 days before\n• 10% charge: 3–7 days\n• 50% within 3 days\n\nRefunds in 5–7 business days.", quickReplies: [{ id: 'refund_status', label: '💰 Check Refund' }, { id: 'speak_agent', label: '👤 Contact Agent' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  booking_not_found:{ message: "Let me help find your booking!\n\n1. Check email (incl. spam)\n2. Look for: noreply@shimlatravels.com\n3. Reference starts with HTL- or PKG-\n\nStill not found? Contact us with your email & booking date.", quickReplies: [{ id: 'speak_agent', label: '👤 Contact Agent' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  payment_failed:{ message: "Do not worry! If payment failed but amount was deducted:\n\n✅ Amount held by your bank — NOT charged by us\n✅ Auto-released within 5–7 business days\n✅ No action needed from your side", quickReplies: [{ id: 'refund_status', label: '💰 Check Refund' }, { id: 'speak_agent', label: '👤 Contact Agent' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  payment_problem:{ message: "Having payment issues? 💳\n\nAccepted Methods:\n• UPI (GPay, PhonePe, Paytm)\n• Credit/Debit Cards\n• Net Banking\n• Wallets\n\n🔒 All payments secured by 256-bit SSL", quickReplies: [{ id: 'payment_failed', label: '💸 Amount Deducted' }, { id: 'card_declined', label: '🚫 Card Declined' }, { id: 'upi_issue', label: '📱 UPI Problem' }, { id: 'double_charge', label: '2️⃣ Double Charged' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  card_declined: { message: "Card declined? Try:\n\n1. Check card number, expiry & CVV\n2. Ensure sufficient balance\n3. Enable online transactions\n4. Contact your bank\n5. Try UPI instead\n\n💡 UPI is the most reliable method!", quickReplies: [{ id: 'upi_issue', label: '📱 Try UPI' }, { id: 'speak_agent', label: '👤 Get Help' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  upi_issue:    { message: "UPI issues are usually temporary! Try:\n\n1. Check UPI ID is correct\n2. Try a different UPI app\n3. Ensure stable internet\n4. Check your daily UPI limit\n\n⭐ Best: Google Pay, PhonePe", quickReplies: [{ id: 'card_declined', label: '💳 Try Card' }, { id: 'speak_agent', label: '👤 Get Help' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  double_charge: { message: "We apologize for the inconvenience! 🙏\n\n✅ Duplicate charge auto-refunded in 3–5 days\n✅ Email confirmation will be sent\n\nFor urgent cases:\n📞 +91 98765 43210\n📧 support@shimlatravels.com", quickReplies: [{ id: 'refund_status', label: '💰 Track Refund' }, { id: 'speak_agent', label: '👤 Contact Agent' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  refund_status: { message: "Refund Processing Times 💰\n\n• UPI: 3–5 business days\n• Credit Card: 5–7 business days\n• Debit Card: 5–10 business days\n• Net Banking: 3–5 business days\n• Wallets: Instant to 24 hours", quickReplies: [{ id: 'check_refund', label: '🔍 Check Status' }, { id: 'refund_not_received', label: '😟 Not Received' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  check_refund:  { message: "Share your booking reference (HTL-XXXXX) and we will check your refund status. Or email support@shimlatravels.com for instant updates! 📧", quickReplies: [{ id: 'speak_agent', label: '👤 Talk to Agent' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  refund_not_received:{ message: "Refund not received? Here is what to do:\n\n1. Check original payment account\n2. Contact your bank\n3. Allow 2 extra days for bank holidays\n\nStill missing?\n📞 +91 98765 43210\n📧 support@shimlatravels.com", quickReplies: [{ id: 'speak_agent', label: '👤 Contact Agent' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  hotel_details: { message: "What would you like to know about our hotels? 🏨", quickReplies: [{ id: 'hotel_amenities', label: '🛎️ Amenities' }, { id: 'checkin_time', label: '🕐 Check-in Times' }, { id: 'pricing', label: '💰 Pricing' }, { id: 'cancel_booking', label: '❌ Cancellation' }, { id: 'pet_policy', label: '🐾 Pet Policy' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  hotel_amenities:{ message: "Our hotels offer excellent amenities! 🛎️\n\n🌟 Standard:\n• Free WiFi\n• Room Service 24/7\n• Smart TV & Hot Water\n• Daily Housekeeping\n\n✨ Premium adds:\n• Swimming Pool\n• Spa & Wellness Center\n• Mountain View Rooms\n• Fireplace Rooms", quickReplies: [{ id: 'pricing', label: '💰 Check Pricing' }, { id: 'checkin_time', label: '🕐 Check-in Times' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  checkin_time:  { message: "Check-in / Check-out Timings 🕐\n\n✅ Check-in: 2:00 PM onwards\n✅ Check-out: 11:00 AM\n\nEarly Check-in:\n• Before 8 AM: Full night charge\n• 8 AM–2 PM: 50% charge\n\nLate Check-out:\n• Up to 6 PM: 50% charge\n• After 6 PM: Full night charge", quickReplies: [{ id: 'hotel_amenities', label: '🛎️ Amenities' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  pet_policy:    { message: "We love pets! 🐾\n\n✅ Select hotels are pet-friendly\n✅ Small pets (under 10kg) allowed\n✅ Pet-friendly rooms on request\n\nRequirements:\n• Advance notice required\n• Valid vaccination certificate\n• Additional cleaning fee may apply", quickReplies: [{ id: 'speak_agent', label: '👤 Check Availability' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  package_info:  { message: "We offer amazing travel packages! 📦\n\nAll packages include:\n✅ Hotel accommodation\n✅ Daily breakfast\n✅ Sightseeing & transfers\n✅ Tour guide\n✅ 24/7 support", quickReplies: [{ id: 'package_types', label: '🗂️ Package Types' }, { id: 'pricing', label: '💰 Pricing' }, { id: 'best_time', label: '🌤️ Best Time' }, { id: 'cancel_booking', label: '❌ Cancellation' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  package_types: { message: "Packages for every traveler! 🗂️\n\n🏔️ Adventure — Trekking, camping, skiing\n👨‍👩‍👧 Family — Kid-friendly activities\n💑 Honeymoon — Romantic getaways & suites\n✨ Luxury — 5-star experience\n💰 Budget — Best value essentials\n🌿 Nature — Eco-stays & wildlife\n\n🕐 Duration: 2 to 7 nights", quickReplies: [{ id: 'pricing', label: '💰 See Pricing' }, { id: 'best_time', label: '🌤️ Best Time' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  pricing:       { message: "Pricing Overview 💰\n\n🏨 Hotels (per night):\n• Budget: ₹800–₹2,000\n• Standard: ₹2,000–₹5,000\n• Deluxe: ₹5,000–₹10,000\n• Luxury: ₹10,000+\n\n📦 Packages (per person):\n• Budget (2N/3D): ₹3,500–₹6,000\n• Standard (3N/4D): ₹7,000–₹12,000\n• Luxury (5N/6D): ₹18,000–₹35,000\n• Honeymoon (3N/4D): ₹12,000–₹25,000", quickReplies: [{ id: 'package_types', label: '📦 View Packages' }, { id: 'speak_agent', label: '👤 Get Custom Quote' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  best_time:     { message: "Best Time to Visit Shimla 🌤️\n\n❄️ Winter (Nov–Feb): Snowfall & skiing\n🌸 Spring (Mar–Apr): Blooming flowers\n☀️ Summer (May–Jun): Cool escape — most popular!\n🌧️ Monsoon (Jul–Sep): Lush green, great deals\n🍂 Autumn (Oct–Nov): Clear skies, apple season\n\n💡 Our Pick: May–June & Oct–November", quickReplies: [{ id: 'package_types', label: '📦 See Packages' }, { id: 'pricing', label: '💰 Check Prices' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  tourist_places:{ message: "Shimla top attractions! 🗺️ Which interests you?", quickReplies: [{ id: 'mall_road', label: '🛍️ Mall Road' }, { id: 'kufri', label: '⛷️ Kufri' }, { id: 'jakhu_temple', label: '🛕 Jakhu Temple' }, { id: 'christ_church', label: '⛪ Christ Church' }, { id: 'nearby_destinations', label: '📍 Nearby Destinations' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  mall_road:     { message: "Mall Road — the heartbeat of Shimla! 🛍️\n\n• Shopping: woolens, handicrafts, souvenirs\n• Street food: momos, corn, local snacks\n• Cafes with mountain views\n• Gaiety Theatre — colonial heritage\n\n📍 Central Shimla\n🕐 Best Time: 4 PM–9 PM\n💡 Pedestrians only — no vehicles!", quickReplies: [{ id: 'food', label: '🍽️ Food Nearby' }, { id: 'tourist_places', label: '🗺️ More Places' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  kufri:         { message: "Kufri — snow & adventure! ⛷️\n\n• Skiing & snow activities (Nov–Feb)\n• Horse riding on snowy trails\n• Himalayan Nature Park\n• Paragliding & tobogganing\n\n📍 16 km from Shimla\n🕐 Best: December–February\n🚗 ~30 mins by taxi", quickReplies: [{ id: 'activities', label: '🏔️ More Activities' }, { id: 'tourist_places', label: '🗺️ More Places' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  jakhu_temple:  { message: "Jakhu Temple — sacred & scenic! 🛕\n\n• Dedicated to Lord Hanuman\n• 2455 m altitude\n• 33-meter Hanuman statue!\n• 360° views of Shimla\n\n📍 2.5 km from Shimla\n🕐 6 AM–12 PM & 5 PM–8 PM\n⚠️ Keep bags zipped — monkeys!", quickReplies: [{ id: 'tourist_places', label: '🗺️ More Places' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  christ_church: { message: "Christ Church — iconic landmark! ⛪\n\n• 2nd oldest church in North India (1857)\n• Neo-Gothic architecture\n• Stunning stained glass windows\n• Located on The Ridge\n• Beautiful at night ✨\n\n🕐 8 AM–6 PM (Mon–Sat)", quickReplies: [{ id: 'mall_road', label: '🛍️ Mall Road Nearby' }, { id: 'tourist_places', label: '🗺️ More Places' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  activities:    { message: "Exciting activities in Shimla! 🏔️", quickReplies: [{ id: 'trekking', label: '🥾 Trekking' }, { id: 'skiing', label: '⛷️ Skiing' }, { id: 'toy_train', label: '🚂 Toy Train' }, { id: 'shopping_shimla', label: '🛍️ Shopping' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  trekking:      { message: "Shimla trekking trails! 🥾\n\n• Jakhu Hill Trek — 2.5 km, easy\n• Shali Tibba Trek — 8 km, moderate\n• Chail–Kufri Trek — 12 km, moderate\n• Hatu Peak (Narkanda) — 4 km, panoramic\n• Churdhar Trek — 16 km, advanced\n\n💡 Best Season: Apr–June & Sept–Nov", quickReplies: [{ id: 'activities', label: '🏔️ Other Activities' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  skiing:        { message: "Top skiing spots! ⛷️\n\n• Kufri — most popular\n• Narkanda — less crowded\n• Chail — scenic & peaceful\n\n📅 Season: December–February\n💰 ₹500–₹2,000/hour (gear included)\n💡 Instructors available for beginners!", quickReplies: [{ id: 'kufri', label: '⛷️ Kufri Info' }, { id: 'activities', label: '🏔️ Other Activities' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  toy_train:     { message: "UNESCO World Heritage toy train! 🚂\n\n• 96 km through 102 tunnels & 864 bridges!\n• Built in 1903\n• Journey: ~5–6 hours\n\n💰 ₹25–₹400 (class-wise)\n📍 Book via IRCTC or Shimla Station\n💡 Book 30 days ahead in peak season!", quickReplies: [{ id: 'transport', label: '🚗 How to Reach' }, { id: 'activities', label: '🏔️ Other Activities' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  shopping_shimla:{ message: "Shimla shopping guide! 🛍️\n\n🌟 What to Buy:\n• Woolen shawls & Pashmina\n• Himachali caps & handicrafts\n• Dry fruits & local jams\n• Silver jewellery & wooden artifacts\n\n📍 Best Spots:\n• Mall Road | Lakkar Bazaar\n• Tibetan Market | Lower Bazaar\n\n💡 Bargain at Tibetan Market!", quickReplies: [{ id: 'mall_road', label: '🛍️ Mall Road' }, { id: 'food', label: '🍽️ Where to Eat' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  transport:     { message: "Getting to Shimla is easy! 🚗 Choose your mode:", quickReplies: [{ id: 'by_air', label: '✈️ By Air' }, { id: 'by_train', label: '🚂 By Train' }, { id: 'by_road', label: '🚌 By Road' }, { id: 'local_transport', label: '🚕 Local Transport' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  by_air:        { message: "Flying to Shimla ✈️\n\n🛫 Jubbarhatti Airport: 22 km from city\n• Flights from Delhi & Chandigarh\n\n🛬 Chandigarh Airport (alternative):\n• 115 km from Shimla\n• Better connectivity\n\n💰 Taxi from airport: ₹800–₹1,500", quickReplies: [{ id: 'by_train', label: '🚂 By Train' }, { id: 'by_road', label: '🚌 By Road' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  by_train:      { message: "Train to Shimla 🚂\n\n🚆 Kalka–Shimla Toy Train (UNESCO):\n• Duration: 5–6 hours | Book on IRCTC\n\n🚆 Delhi to Kalka:\n• Shatabdi Express: 3.5 hours\n• Himalayan Queen: daily\n\n💡 Book toy train 30 days ahead!", quickReplies: [{ id: 'toy_train', label: '🚂 Toy Train Info' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  by_road:       { message: "Road trip to Shimla! 🚌\n\n🚌 By Bus:\n• Delhi ISBT: ~10 hours\n• Volvo AC: ₹700–₹1,200\n• From Chandigarh: 3 hours\n\n🚗 Self-Drive:\n• Delhi→Shimla: 365 km (~8 hrs)\n• Chandigarh→Shimla: 115 km (~3 hrs)", quickReplies: [{ id: 'local_transport', label: '🚕 Local Transport' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  local_transport:{ message: "Getting around Shimla 🚕\n\n🚕 Taxi: ₹1,500–₹2,500/day\n🚌 HRTC Bus: ₹10–₹50/ride\n🚡 Free Lift (elevator) — upper & lower town\n🦶 Walk — Mall Road is pedestrian-only", quickReplies: [{ id: 'transport', label: '🚗 How to Reach' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  food:          { message: "Shimla amazing food! 🍽️", quickReplies: [{ id: 'himachali_food', label: '🍛 Himachali Dishes' }, { id: 'best_cafes', label: '☕ Best Cafes' }, { id: 'street_food', label: '🥟 Street Food' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  himachali_food:{ message: "Must-try Himachali dishes! 🍛\n\n• Dham — festive thali\n• Siddu — steamed wheat bread with ghee\n• Chha Gosht — mutton in yogurt gravy\n• Babru — kachori with black gram\n• Tudkiya Bhath — spiced rice\n\n🍎 Also try: Apple juice, Local honey!", quickReplies: [{ id: 'best_cafes', label: '☕ Best Cafes' }, { id: 'street_food', label: '🥟 Street Food' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  best_cafes:    { message: "Top cafes in Shimla! ☕\n\n• Cafe Simla Times — rooftop, colonial vibe\n• Wake & Bake — cozy, best brownies!\n• Maria Brothers — heritage, book collection\n• Cafe 1947 — vintage themed, amazing views\n• Honey Hut Cafe — local honey products\n\n💡 Visit rooftop cafes at golden hour!", quickReplies: [{ id: 'himachali_food', label: '🍛 Local Dishes' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  street_food:   { message: "Shimla street food! 🥟\n\n• Momos — everywhere!\n• Corn on cob with masala\n• Chhole Bhature\n• Aloo Tikki Chaat\n• Maggi noodles — iconic!\n• Bread Pakora\n\n📍 Best: Lower Bazaar & Mall Road stalls", quickReplies: [{ id: 'best_cafes', label: '☕ Sit-Down Cafes' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  nearby_destinations:{ message: "Amazing destinations near Shimla! 📍", quickReplies: [{ id: 'manali', label: '🏔️ Manali' }, { id: 'kullu', label: '🌊 Kullu' }, { id: 'chail', label: '🌲 Chail' }, { id: 'narkanda', label: '⛷️ Narkanda' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  manali:        { message: "Manali — adventure capital! 🏔️\n\n📍 260 km from Shimla (~7 hrs)\n\n• Rohtang Pass — snow & adventure\n• Solang Valley — skiing, paragliding\n• Hadimba Temple\n• Beas River — camping & rafting\n\n💰 ₹5,000–₹15,000 for 3 nights", quickReplies: [{ id: 'nearby_destinations', label: '📍 Other Destinations' }, { id: 'speak_agent', label: '👤 Book a Trip' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  kullu:         { message: "Kullu — Valley of Gods! 🌊\n\n📍 220 km from Shimla (~6 hrs)\n\n• Beas River — white water rafting!\n• Kullu Dussehra Festival (October)\n• Great Himalayan National Park\n\n💰 ₹4,000–₹10,000 for 2 nights", quickReplies: [{ id: 'manali', label: '🏔️ Manali Nearby' }, { id: 'nearby_destinations', label: '📍 Other Destinations' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  chail:         { message: "Chail — Shimla hidden gem! 🌲\n\n📍 44 km from Shimla (~1.5 hrs)\n\n• World highest cricket ground!\n• Chail Wildlife Sanctuary\n• Apple & peach orchards\n• Perfect for peace & nature\n\n💰 Day trip: ₹1,200–₹1,800 by taxi", quickReplies: [{ id: 'narkanda', label: '⛷️ Narkanda' }, { id: 'nearby_destinations', label: '📍 Other Destinations' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  narkanda:      { message: "Narkanda — hidden ski paradise! ⛷️\n\n📍 65 km from Shimla (~2 hrs)\n\n• Hatu Peak (3400 m) — stunning views!\n• Skiing Dec–Feb\n• Apple orchards (Aug–Oct)\n• Less crowded than Kufri\n\n💰 Ski equipment: ₹400/hour", quickReplies: [{ id: 'skiing', label: '⛷️ Skiing Info' }, { id: 'nearby_destinations', label: '📍 Other Destinations' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  discounts:     { message: "Amazing offers for you! 🎁", quickReplies: [{ id: 'seasonal_offers', label: '🌤️ Seasonal Offers' }, { id: 'group_discounts', label: '👥 Group Discounts' }, { id: 'early_booking', label: '📅 Early Bird Deals' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  seasonal_offers:{ message: "Seasonal Offers 🌤️\n\n☀️ Summer (May–June):\n• 15% off hill-view rooms\n• Kids below 12 stay FREE\n\n🌧️ Monsoon (Jul–Sep):\n• Up to 40% off hotels\n• Couple packages at ₹5,999\n\n❄️ Winter (Dec–Jan):\n• Snow packages from ₹7,999\n• Complimentary skiing session!", quickReplies: [{ id: 'early_booking', label: '📅 Early Bird' }, { id: 'speak_agent', label: '👤 Book This Offer' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  group_discounts:{ message: "Group Deals! 👥\n\n• 10–20 people: 10% off + free coordinator\n• 21–50 people: 20% off + trip manager\n• 50+ people: Custom pricing\n\n💡 Perfect for: Corporate trips, school tours, weddings!", quickReplies: [{ id: 'speak_agent', label: '👤 Get Group Quote' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  early_booking: { message: "Early Bird Savings! 📅\n\n⏰ 60+ days ahead: 25% off + free upgrade\n⏰ 30–60 days ahead: 15% off + free breakfast\n⏰ 15–30 days ahead: 10% off\n\n💡 Peak: May–June & December\nBook 2 months ahead for best rates!", quickReplies: [{ id: 'speak_agent', label: '👤 Book Now & Save' }, { id: 'seasonal_offers', label: '🌤️ See All Offers' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  emergency:     { message: "Emergency Contacts 🚨\n\n🚔 Police: 100\n🚑 Ambulance: 108\n🚒 Fire: 101\n📞 Tourist Helpline: 1800-180-8080\n🏥 IGMC Hospital: 0177-2658540\n\n🆘 Shimla Travels 24/7:\n📞 +91 98765 43210\n📧 emergency@shimlatravels.com", quickReplies: [{ id: 'speak_agent', label: '👤 Contact Our Team' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
  speak_agent:   { message: "Reach our support team! 👤\n\n📞 +91 98765 43210 (24/7)\n📞 +91 88990 11223\n📧 support@shimlatravels.com\n💬 WhatsApp: +91 98765 43210\n\n🕐 Office Hours:\nMon–Sat: 9 AM–8 PM\nSun: 10 AM–6 PM", quickReplies: [{ id: 'main_menu', label: '🏠 Main Menu' }] },
  farewell:      { message: "Thank you! 🙏 Have a wonderful trip to Shimla! 🏔️\nFeel free to reach out anytime.", quickReplies: [{ id: 'main_menu', label: '🏠 Ask Another Question' }] },
  default:       { message: "I am not sure I understood that 🤔\nHere is what I can help with:", quickReplies: [{ id: 'tourist_places', label: '🗺️ Tourist Places' }, { id: 'hotel_details', label: '🏨 Hotels' }, { id: 'package_info', label: '📦 Packages' }, { id: 'booking_issue', label: '📋 Bookings' }, { id: 'speak_agent', label: '👤 Talk to Agent' }, { id: 'main_menu', label: '🏠 Main Menu' }] },
};

const fpcGetKey = (text) => {
  const t = text.toLowerCase();
  if (t.match(/\b(hi|hello|hey|hii|namaste)\b/))                                   return 'greeting';
  if (t.match(/\b(cancel|cancell)\b/))                                              return 'cancel_booking';
  if (t.match(/\b(modify|change|edit).*(book|reserv)/))                              return 'modify_booking';
  if (t.match(/\b(book|reserv|reservation)\b/))                                    return 'booking_issue';
  if (t.match(/\b(refund|money back|return)\b/))                                    return 'refund_status';
  if (t.match(/\b(pay|card|upi|payment|gpay|phonepe|paytm)\b/))                    return 'payment_problem';
  if (t.match(/\b(agent|human|talk to|speak)\b/))                                  return 'speak_agent';
  if (t.match(/\b(price|cost|rate|fee|how much)\b/))                               return 'pricing';
  if (t.match(/\b(check.?in|check.?out)\b/))                                       return 'checkin_time';
  if (t.match(/\b(wifi|amenities|facility|facilities)\b/))                         return 'hotel_amenities';
  if (t.match(/\b(mall road|kufri|jakhu|christ church)\b/))                        return 'tourist_places';
  if (t.match(/\b(place|sight|tourist|attraction|visit)\b/))                       return 'tourist_places';
  if (t.match(/\b(trek|trekking)\b/))                                              return 'trekking';
  if (t.match(/\b(ski|skiing)\b/))                                                 return 'skiing';
  if (t.match(/\b(toy train)\b/))                                                  return 'toy_train';
  if (t.match(/\b(activit|adventure)\b/))                                          return 'activities';
  if (t.match(/\b(transport|reach|bus|taxi|airport|road|how to)\b/))               return 'transport';
  if (t.match(/\b(nearby|manali|kullu|chail|narkanda)\b/))                         return 'nearby_destinations';
  if (t.match(/\b(food|eat|restaurant|cafe|dish|himachali)\b/))                    return 'food';
  if (t.match(/\b(discount|offer|deal|promo|early bird|group)\b/))                 return 'discounts';
  if (t.match(/\b(snow|weather|season|best time|when to)\b/))                      return 'best_time';
  if (t.match(/\b(hotel|room|stay|accommodation)\b/))                              return 'hotel_details';
  if (t.match(/\b(package|tour|trip|travel)\b/))                                   return 'package_info';
  if (t.match(/\b(emergency|hospital|police|ambulance)\b/))                        return 'emergency';
  if (t.match(/\b(thank|thanks|bye|goodbye|ok|okay|done)\b/))                      return 'farewell';
  return 'default';
};

function FullPageChatbot({ onClose }) {
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const bottomRef = React.useRef(null);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    const w = fpcResponses.welcome;
    setMessages([{ id: 1, role: 'bot', text: w.message, quickReplies: w.quickReplies }]);
    setTimeout(() => inputRef.current && inputRef.current.focus(), 200);
  }, []);

  React.useEffect(() => {
    bottomRef.current && bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMsg = async (msgText, qrId) => {
    const text = (msgText || input).trim();
    if (!text || isTyping) return;
    setInput('');
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text }]);
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
    const key = qrId || fpcGetKey(text);
    const resp = fpcResponses[key] || fpcResponses.default;
    setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: resp.message, quickReplies: resp.quickReplies || null }]);
    setIsTyping(false);
  };

  const resetChat = () => {
    const m = fpcResponses.main_menu;
    setMessages([{ id: Date.now(), role: 'bot', text: '🔄 Chat cleared! How can I help you? 😊', quickReplies: m.quickReplies }]);
  };

  return (
    <div style={{ position:'fixed', inset:0, zIndex:99999, background:'#f1f5f9', display:'flex', flexDirection:'column', fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' }}>

      {/* Header */}
      <div style={{ background:'linear-gradient(135deg,#059669,#0d9488)', padding:'0 20px', height:'64px', display:'flex', alignItems:'center', justifyContent:'space-between', boxShadow:'0 2px 12px rgba(0,0,0,0.15)', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <div style={{ width:'42px', height:'42px', borderRadius:'50%', background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px' }}>🤖</div>
          <div>
            <div style={{ color:'#fff', fontWeight:'700', fontSize:'16px', lineHeight:1 }}>Shimla Travels Support</div>
            <div style={{ color:'rgba(255,255,255,0.85)', fontSize:'12px', marginTop:'3px', display:'flex', alignItems:'center', gap:'5px' }}>
              <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#86efac', display:'inline-block' }} />
              Online • Usually replies instantly
            </div>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
          <button onClick={resetChat} style={{ background:'rgba(255,255,255,0.18)', border:'1px solid rgba(255,255,255,0.35)', borderRadius:'8px', color:'#fff', fontSize:'13px', fontWeight:'600', padding:'7px 14px', cursor:'pointer' }}>🗑️ New Chat</button>
          <button onClick={onClose}   style={{ background:'rgba(255,255,255,0.18)', border:'1px solid rgba(255,255,255,0.35)', borderRadius:'8px', color:'#fff', fontSize:'13px', fontWeight:'600', padding:'7px 14px', cursor:'pointer' }}>✕ Close</button>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:'auto', padding:'24px', display:'flex', flexDirection:'column', gap:'16px', maxWidth:'860px', width:'100%', margin:'0 auto', alignSelf:'stretch', boxSizing:'border-box' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ display:'flex', flexDirection:'column', alignItems: msg.role==='user' ? 'flex-end' : 'flex-start', gap:'8px' }}>
            <div style={{ maxWidth:'70%', padding:'12px 16px', borderRadius: msg.role==='user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px', background: msg.role==='user' ? 'linear-gradient(135deg,#059669,#0d9488)' : '#fff', color: msg.role==='user' ? '#fff' : '#1e293b', fontSize:'15px', lineHeight:'1.6', boxShadow:'0 2px 10px rgba(0,0,0,0.08)', whiteSpace:'pre-line' }}>
              {msg.text}
            </div>
            {msg.quickReplies && msg.quickReplies.length > 0 && msg.role === 'bot' && (
              <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', maxWidth:'75%' }}>
                {msg.quickReplies.map((qr, i) => (
                  <button key={i}
                    onClick={() => sendMsg(qr.label, qr.id)}
                    onMouseEnter={e => { e.currentTarget.style.background='#059669'; e.currentTarget.style.color='#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background='#fff'; e.currentTarget.style.color='#059669'; }}
                    style={{ background:'#fff', border:'1.5px solid #d1fae5', borderRadius:'20px', padding:'7px 14px', fontSize:'13px', color:'#059669', fontWeight:'600', cursor:'pointer', boxShadow:'0 1px 4px rgba(0,0,0,0.06)', transition:'all 0.15s' }}
                  >{qr.label}</button>
                ))}
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div style={{ display:'flex', alignItems:'center' }}>
            <div style={{ background:'#fff', borderRadius:'18px 18px 18px 4px', padding:'12px 18px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)', display:'flex', gap:'5px', alignItems:'center' }}>
              {[0,1,2].map(i => <span key={i} style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#059669', display:'inline-block', animation:'fpcBounce 1.2s ease-in-out ' + (i*0.2) + 's infinite' }} />)}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ background:'#fff', borderTop:'1px solid #e2e8f0', padding:'16px 24px', flexShrink:0 }}>
        <div style={{ maxWidth:'860px', margin:'0 auto', display:'flex', gap:'10px', alignItems:'center' }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMsg()}
            placeholder="Type your message here..."
            style={{ flex:1, border:'1.5px solid #e2e8f0', borderRadius:'12px', padding:'12px 18px', fontSize:'15px', outline:'none', background:'#f8fafc', color:'#1e293b' }}
            onFocus={e => { e.target.style.borderColor = '#059669'; }}
            onBlur={e => { e.target.style.borderColor = '#e2e8f0'; }}
          />
          <button
            onClick={() => sendMsg()}
            disabled={!input.trim() || isTyping}
            style={{ width:'48px', height:'48px', borderRadius:'12px', border:'none', background: input.trim() ? 'linear-gradient(135deg,#059669,#0d9488)' : '#e2e8f0', cursor: input.trim() ? 'pointer' : 'not-allowed', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>

      <style>{"@keyframes fpcBounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-7px)}}"}</style>
    </div>
  );
}


export default Account;
