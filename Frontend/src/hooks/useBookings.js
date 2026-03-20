import { useState, useCallback } from 'react';
import { bookingAPI } from '../services/api';

/**
 * useBookings hook
 * Manages user booking state for the Account page
 */
export function useBookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await bookingAPI.getAll();
      setBookings(res.data.data?.bookings || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load bookings');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const cancelBooking = useCallback(async (bookingId, reason = 'Cancelled by user') => {
    const res = await bookingAPI.cancel(bookingId, reason);
    await fetchBookings();
    return res.data;
  }, [fetchBookings]);

  return { bookings, isLoading, error, fetchBookings, cancelBooking };
}

export default useBookings;
