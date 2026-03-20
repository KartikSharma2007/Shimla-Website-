// hooks/usePackageReviews.js
import { useState, useEffect, useCallback, useRef } from 'react';

const STORAGE_KEY = 'userReviews';
const EVENT_KEY = 'reviewsUpdated';

// Custom event for cross-component communication
const dispatchReviewEvent = (packageId) => {
  window.dispatchEvent(new CustomEvent(EVENT_KEY, { detail: { packageId } }));
};

export const usePackageReviews = (packageId, baseReviews = []) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);

  // Load reviews from all sources
  const loadReviews = useCallback(() => {
    if (!packageId) return;
    
    setIsLoading(true);
    
    // Get base reviews from package data
    const base = baseReviews || [];
    
    // Get user reviews from localStorage
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const userReviews = stored.filter(r => r.packageId === packageId);
    
    // Combine and sort
    const allReviews = [...base, ...userReviews].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    setReviews(allReviews);
    setIsLoading(false);
  }, [packageId, baseReviews]);

  // Initial load
  useEffect(() => {
    loadReviews();
    isMounted.current = true;
  }, [loadReviews]);

  // Listen for review updates from other components
  useEffect(() => {
    const handleReviewUpdate = (e) => {
      if (!e.detail?.packageId || e.detail.packageId === packageId) {
        loadReviews();
      }
    };

    // Fix #5: store storageHandler in a variable so it can be properly removed
    const handleStorageUpdate = (e) => {
      // STORAGE_KEY prefix check — handles user-scoped keys like userReviews_userId
      if (e.key && e.key.startsWith(STORAGE_KEY)) {
        loadReviews();
      }
    };

    window.addEventListener(EVENT_KEY, handleReviewUpdate);
    window.addEventListener('storage', handleStorageUpdate);

    return () => {
      window.removeEventListener(EVENT_KEY, handleReviewUpdate);
      window.removeEventListener('storage', handleStorageUpdate); // Fix #5: was missing
    };
  }, [packageId, loadReviews]);

  // Add a new review
  const addReview = useCallback((reviewData) => {
    const newReview = {
      id: `review-${Date.now()}`,
      packageId,
      ...reviewData,
      date: new Date().toISOString().split('T')[0],
      isUserReview: true
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existing.push(newReview);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

    // Update local state
    setReviews(prev => [newReview, ...prev]);
    
    // Notify other components
    dispatchReviewEvent(packageId);
    
    return newReview;
  }, [packageId]);

  // Delete a review
  const deleteReview = useCallback((reviewId) => {
    // Remove from localStorage
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const updated = existing.filter(r => r.id !== reviewId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Update local state
    setReviews(prev => prev.filter(r => r.id !== reviewId));
    
    // Notify other components
    dispatchReviewEvent(packageId);
  }, [packageId]);

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  // Get reviews count
  const totalCount = reviews.length;

  return {
    reviews,
    isLoading,
    averageRating,
    totalCount,
    addReview,
    deleteReview,
    refreshReviews: loadReviews
  };
};