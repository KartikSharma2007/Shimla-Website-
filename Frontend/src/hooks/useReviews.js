import { useState, useCallback } from 'react';
import { reviewAPI } from '../services/api';
import { toast } from 'react-hot-toast';

/**
 * useReviews Hook
 * Manages review operations
 */

export const useReviews = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get reviews for an item
  const getReviews = useCallback(async (itemType, itemId, params = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await reviewAPI.getForItem(itemType, itemId, params);
      return { 
        success: true, 
        reviews: response.data.data.reviews,
        stats: response.data.data.stats,
        pagination: response.data.data.pagination,
      };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch reviews';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get user's reviews
  const getMyReviews = useCallback(async (params = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await reviewAPI.getMyReviews(params);
      return { 
        success: true, 
        reviews: response.data.data.reviews,
        pagination: response.data.data.pagination,
      };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch your reviews';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check if user can review
  const canReview = useCallback(async (itemType, itemId) => {
    try {
      const response = await reviewAPI.canReview(itemType, itemId);
      return { success: true, data: response.data.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to check review eligibility';
      return { success: false, error: message };
    }
  }, []);

  // Create review
  const createReview = useCallback(async (reviewData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await reviewAPI.create(reviewData);
      toast.success('Review submitted successfully!');
      return { success: true, review: response.data.data.review };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to submit review';
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update review
  const updateReview = useCallback(async (id, reviewData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await reviewAPI.update(id, reviewData);
      toast.success('Review updated successfully!');
      return { success: true, review: response.data.data.review };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update review';
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Delete review
  const deleteReview = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      await reviewAPI.delete(id);
      toast.success('Review deleted successfully');
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete review';
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Mark review as helpful
  const markHelpful = useCallback(async (id) => {
    try {
      const response = await reviewAPI.markHelpful(id);
      toast.success('Marked as helpful!');
      return { success: true, helpful: response.data.data.helpful };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to mark helpful';
      toast.error(message);
      return { success: false, error: message };
    }
  }, []);

  return {
    isLoading,
    error,
    getReviews,
    getMyReviews,
    canReview,
    createReview,
    updateReview,
    deleteReview,
    markHelpful,
  };
};

export default useReviews;
