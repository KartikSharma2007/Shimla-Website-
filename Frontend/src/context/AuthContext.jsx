
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../services/api';
import { toast } from 'react-hot-toast';

/**
 * Auth Context
 * Manages user authentication state and operations
 */

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        try {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
          
          // Verify token is still valid
          await fetchUserProfile();
          setIsBackendConnected(true);
        } catch (err) {
          // Token invalid or backend not running
          if (err.isNetworkError || err.message?.includes('Network Error')) {
            console.warn('Backend not connected. Running in offline mode.');
            setIsBackendConnected(false);
          } else {
            // Token invalid, clear storage
            logout();
          }
        }
      }
      
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const response = await authAPI.getMe();
      const userData = response.data.data.user;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setIsBackendConnected(true);
      return userData;
    } catch (err) {
      if (err.isNetworkError || !err.response) {
        setIsBackendConnected(false);
        throw { isNetworkError: true, message: 'Backend not connected' };
      }
      // If the server says account is banned/inactive, force logout immediately
      const errCode = err.response?.data?.error;
      if (errCode === 'ACCOUNT_INACTIVE' || errCode === 'ACCOUNT_BANNED') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        window.location.href = '/login?banned=true';
        return;
      }
      throw err;
    }
  };

  // Register new user
  const register = async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authAPI.register(userData);
      const { user: newUser, token: newToken } = response.data.data;

      setUser(newUser);
      setToken(newToken);
      setIsAuthenticated(true);
      setIsBackendConnected(true);

      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser));

      toast.success('Registration successful!');
      return { success: true, user: newUser };
    } catch (err) {
      const message = err.response?.data?.message || 
                      err.message || 
                      'Registration failed. Please check if backend is running.';
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  // Login user
const login = async (credentials) => {
  setIsLoading(true);
  setError(null);

  try {
    const response = await authAPI.login(credentials);
    const { user: loggedInUser, token: newToken } = response.data.data;

    setUser(loggedInUser);
    setToken(newToken);
    setIsAuthenticated(true);
    setIsBackendConnected(true);

    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(loggedInUser));

    // ✅ Log login activity
    const storageKey = `shimla_activities_${loggedInUser?._id || loggedInUser?.id}`;
    try {
      const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const lastLogin = existing.find(a => a.type === 'login');
      const oneHourAgo = Date.now() - (60 * 60 * 1000);
      if (!lastLogin || new Date(lastLogin.time).getTime() < oneHourAgo) {
        existing.unshift({
          id: `login_${Date.now()}`,
          type: 'login',
          title: 'Logged in',
          description: '👋 You signed in to your account',
          time: new Date().toISOString(),
        });
        localStorage.setItem(storageKey, JSON.stringify(existing.slice(0, 20)));
      }
    } catch { /* ignore */ }

    toast.success('Login successful!');
    return { success: true, user: loggedInUser };
  } catch (err) {
    let message;
    let errorCode = null;
    if (err.isNetworkError || !err.response) {
      message = 'Cannot connect to server. If on mobile, check that VITE_API_URL in Frontend/.env points to your PC\'s local IP (e.g. http://192.168.x.x:5000/api).';
      setIsBackendConnected(false);
    } else {
      message   = err.response?.data?.message || 'Login failed';
      errorCode = err.response?.data?.error   || null;
    }
    setError(message);
    // Don't show toast for banned accounts — login page shows its own message
    if (errorCode !== 'ACCOUNT_BANNED') {
      toast.error(message);
    }
    return { success: false, error: message, errorCode };
  } finally {
    setIsLoading(false);
  }
};

const googleLogin = async (credential) => {
  setIsLoading(true);
  setError(null);
  try {
    const response = await authAPI.googleAuth({ credential });
    const data = response.data.data;

    // ── CASE 1: Existing local account — same email used with Google button ──
    // Backend says: show the "Enter your password" modal.
    // We must return ALL the fields the modal needs.
    if (data.needsLocalPassword) {
      setIsLoading(false);
      return {
        success: true,
        needsLocalPassword: true,
        email:    data.email,
        googleId: data.googleId,
      };
    }

    // ── CASE 2: New Google user — needs to create a password first ──
    if (data.needsPassword) {
      setIsLoading(false);
      return {
        success:      true,
        needsPassword: true,
        pendingToken:  data.pendingToken,
        user:          data.user,
      };
    }

    // ── CASE 3: Fully authenticated (existing Google user returning) ──
    const googleUser  = data.user;
    const googleToken = data.token;

    setUser(googleUser);
    setToken(googleToken);
    setIsAuthenticated(true);
    setIsBackendConnected(true);

    localStorage.setItem('token', googleToken);
    localStorage.setItem('user', JSON.stringify(googleUser));

    toast.success('Google login successful!');
    return { success: true, needsPassword: false, user: googleUser };
  } catch (err) {
    const errorCode = err.response?.data?.error || null;
    const msg = err.response?.data?.message || 'Google login failed. Please try again.';
    setError(msg);
    if (errorCode !== 'ACCOUNT_BANNED') {
      toast.error(msg);
    }
    return { success: false, error: msg, errorCode };
  } finally {
    setIsLoading(false);
  }
};

// Called when a local-account user clicks Google button with the same email.
// They see a "Enter your password" modal — this function verifies it,
// links their Google account, and logs them in.
const googleConfirmPassword = async (email, password, googleId) => {
  // NOTE: googleId is accepted as a param but sent separately after login.
  // The password verification only needs email + password — same as normal login.
  // This fixes the "incorrect password" error caused by googleId being undefined
  // in the request chain, which triggered a 400 MISSING_FIELDS error that the
  // modal displayed as "incorrect password".
  setIsLoading(true);
  setError(null);
  try {
    // Step 1 — verify email + password (no googleId needed here)
    const response = await authAPI.googleConfirmPassword({ email, password });
    const { user: loggedInUser, token: newToken } = response.data.data;

    setUser(loggedInUser);
    setToken(newToken);
    setIsAuthenticated(true);
    setIsBackendConnected(true);

    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(loggedInUser));

    // Step 2 — silently link Google account (fire-and-forget, non-blocking)
    // If googleId is available, link it. If not, login still succeeds.
    if (googleId) {
      authAPI.linkGoogleAccount({ googleId }).catch(err => {
        console.warn('Google link after login failed (non-critical):', err.message);
      });
    }

    toast.success('Login successful! Google is now linked to your account.');
    return { success: true, user: loggedInUser };
  } catch (err) {
    const errorCode = err.response?.data?.error || null;
    const msg = err.response?.data?.message || 'Incorrect password. Please try again.';
    setError(msg);
    return { success: false, error: msg, errorCode };
  } finally {
    setIsLoading(false);
  }
};

const setGooglePassword = async (pendingToken, password) => {
  setIsLoading(true);
  setError(null);
  try {
    const response = await authAPI.setGooglePassword({ pendingToken, password });
    const { user: newUser, token: newToken } = response.data.data;

    setUser(newUser);
    setToken(newToken);
    setIsAuthenticated(true);
    setIsBackendConnected(true);

    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));

    toast.success('Password created! Welcome to Shimla Travel 🎉');
    return { success: true, user: newUser };
  } catch (err) {
    const msg = err.response?.data?.message || 'Failed to set password. Please try again.';
    setError(msg);
    toast.error(msg);
    return { success: false, error: msg };
  } finally {
    setIsLoading(false);
  }
};

  // Logout user
  const logout = useCallback(async () => {
    try {
      // Call logout API if authenticated
      if (isAuthenticated) {
        await authAPI.logout();
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      // Clear state and storage regardless of API response
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
      setError(null);
      setIsBackendConnected(false);

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      toast.success('Logged out successfully');
    }
  }, [isAuthenticated]);

  // Update profile
  const updateProfile = async (profileData) => {
    setIsLoading(true);

    try {
      const response = await authAPI.updateProfile(profileData);
      const updatedUser = response.data.data.user;

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      toast.success('Profile updated successfully!');
      return { success: true, user: updatedUser };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update profile';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const logoutSilent = useCallback(() => {
  setUser(null);
  setToken(null);
  setIsAuthenticated(false);
  setError(null);
  setIsBackendConnected(false);
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}, []);

  // Change password
  const changePassword = async (passwordData) => {
    setIsLoading(true);

    try {
      await authAPI.changePassword(passwordData);
      toast.success('Password changed successfully! Please log in again.');
      
      // Logout after password change
      setTimeout(() => {
        logout();
      }, 2000);

      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to change password';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  // Update preferences
  const updatePreferences = async (preferences) => {
    try {
      const response = await authAPI.updatePreferences(preferences);
      const updatedUser = { ...user, preferences: response.data.data.preferences };

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update preferences';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Delete account
  const deleteAccount = async (password, reason = '') => {
    setIsLoading(true);

    try {
      const response = await authAPI.deleteAccount({ password, reason });
      
      // Clear state and storage
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
      
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      toast.success(response.data.message || 'Account deleted successfully');
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete account';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    try {
      const response = await authAPI.forgotPassword({ email });
      toast.success(response.data.message || 'Password reset instructions sent!');
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to send reset instructions';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Reset password
  const resetPassword = async (token, password) => {
    try {
      const response = await authAPI.resetPassword(token, { password });
      toast.success(response.data.message || 'Password reset successful!');
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to reset password';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const updateUser = useCallback((updatedData) => {
  setUser(prev => {
    const newUser = { ...prev, ...updatedData };
    localStorage.setItem('user', JSON.stringify(newUser));
    return newUser;
  });
}, []);
  // Clear error
  const clearError = () => setError(null);

  const value = {
    user,
    token,
    isAuthenticated,
    isLoading,
    isBackendConnected,
    error,
    register,
    login,
    googleLogin,
    setGooglePassword,
    googleConfirmPassword,
    logout,
    updateProfile,
    changePassword,
    updatePreferences,
    deleteAccount,
    forgotPassword,
    resetPassword,
    fetchUserProfile,
    clearError,
    logoutSilent,
    updateUser,  
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;