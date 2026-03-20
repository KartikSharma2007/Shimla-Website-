import axios from 'axios';

/**
 * API Service
 * Centralized HTTP client for backend communication
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'; // Set VITE_API_URL in .env to your PC's IP for mobile access

// NOTE: All API routes are versioned under /api/v1/
// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response, request, message } = error;

    // Network error (backend not running)
    if (!response && request) {
      console.error('Network error: Backend server is not running');
      return Promise.reject({ 
        message: 'Network error. Please check if the backend server is running.',
        isNetworkError: true 
      });
    }

    if (response) {
      // Handle specific error codes
      switch (response.status) {
        case 401:
          // Token expired or invalid
          if (response.data?.error === 'TOKEN_EXPIRED' || 
              response.data?.error === 'INVALID_TOKEN') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login?session=expired';
          }
          // Already-logged-in user whose account was banned mid-session
          if (response.data?.error === 'ACCOUNT_INACTIVE') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login?banned=true';
          }
          break;
        case 403:
          // Banned user attempting to log in
          if (response.data?.error === 'ACCOUNT_BANNED') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Don't redirect — let the login page display the ban message
          } else {
            console.error('Access forbidden:', response.data?.message);
          }
          break;
        case 429:
          // Rate limit exceeded
          console.error('Rate limit exceeded. Please try again later.');
          break;
        default:
          break;
      }
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
  updatePreferences: (data) => api.put('/auth/preferences', data),
  deleteAccount: (data) => api.delete('/auth/account', { data }),
  googleAuth: (data) => api.post('/auth/google', data),
  setGooglePassword: (data) => api.post('/auth/google/set-password', data),
  googleConfirmPassword: (data) => api.post('/auth/google/confirm-password', data), // local account password confirm
  linkGoogleAccount:    (data) => api.post('/auth/google/link', data),               // link googleId after password confirmed
  forgotPassword: (data) => api.post('/auth/forgot-password', data),
  resetPassword: (token, data) => api.post(`/auth/reset-password/${token}`, data),
  refreshToken: () => api.post('/auth/refresh'),
};

// Hotel API
export const hotelAPI = {
  getAll:           (params)        => api.get('/hotels', { params }),
  getById:          (id)            => api.get(`/hotels/${id}`),
  getFeatured:      ()              => api.get('/hotels/featured'),
  search:           (query, params) => api.get('/hotels/search', { params: { q: query, ...params } }),
  // ✅ Returns staticIds of hotels deactivated by admin — used by HotelListing to filter
  getDeactivatedIds: ()             => api.get('/hotels/deactivated-ids'),
};

// Package API
export const packageAPI = {
  getAll: (params) => api.get('/packages', { params }),
  getById: (id) => api.get(`/packages/${id}`),
  getFeatured: () => api.get('/packages/featured'),
  getByCategory: (category, params) => api.get(`/packages/category/${category}`, { params }),
  search: (query, params) => api.get('/packages/search', { params: { q: query, ...params } }),
  checkAvailability: (id, date, travelers) => 
    api.get(`/packages/${id}/availability`, { params: { date, travelers } }),
};

// Booking API
export const bookingAPI = {
  getAll: (params) => api.get('/bookings', { params }),
  getById: (id) => api.get(`/bookings/${id}`),
  getStats: () => api.get('/bookings/stats'),
  createHotel: (data) => api.post('/bookings/hotel', data),
  createPackage: (data) => api.post('/bookings/package', data),
  cancel: (id, reason) => api.put(`/bookings/${id}/cancel`, { reason }),
};

// Review API
export const reviewAPI = {
  getForItem: (itemType, itemId, params) => 
    api.get(`/reviews/${itemType}/${itemId}`, { params }),
  getMyReviews: (params) => api.get('/reviews/my-reviews', { params }),
  canReview: (itemType, itemId) => api.get(`/reviews/can-review/${itemType}/${itemId}`),
  create: (data) => api.post('/reviews', data),
  update: (id, data) => api.put(`/reviews/${id}`, data),
  delete: (id) => api.delete(`/reviews/${id}`),
  markHelpful: (id) => api.post(`/reviews/${id}/helpful`),
};

// Saved Items API
export const savedItemAPI = {
  getAll: (params) => api.get('/saved-items', { params }),
  add: (data) => api.post('/saved-items', data),
  remove: (itemType, itemId) => api.delete(`/saved-items/${itemType}/${itemId}`),
  toggle: (data) => api.post('/saved-items/toggle', data),
  check: (itemType, itemId) => api.get(`/saved-items/check/${itemType}/${itemId}`),
  clearAll: () => api.delete('/saved-items'),
};

// Support API
export const supportAPI = {
  getContactInfo: () => api.get('/support/contact'),
  initChat: () => api.post('/support/chat/init'),
  sendMessage: (data) => api.post('/support/chat/message', data),
  submitTicket: (data) => api.post('/support/ticket', data),
};

export default api;

// Payment API
export const paymentAPI = {
  createOrder:    (bookingId) => api.post('/payments/create-order', { bookingId }),
  confirmPayment: (data)      => api.post('/payments/confirm', data),
  failed:         (data)      => api.post('/payments/failed', data),
  getStatus:      (bookingId) => api.get(`/payments/status/${bookingId}`),
};

// Site Reviews API (About page testimonials)
export const siteReviewAPI = {
  getAll:  (params) => api.get('/site-reviews', { params }),
  create:  (data)   => api.post('/site-reviews', data),
  delete:  (id)     => api.delete(`/site-reviews/${id}`),
};
