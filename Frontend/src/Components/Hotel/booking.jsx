/**
 * booking.jsx — Hotel booking trigger
 *
 * Instead of opening a popup modal, this navigates to the full-page
 * BookingPage (/booking) with all necessary data passed via router state.
 *
 * Usage: same props as before — drop-in replacement.
 */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookingPanel({
  onClose,
  hotelId,
  name,
  price,
  rating,
  images,
  roomTypes = [],
}) {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to the full-page booking flow immediately
    navigate('/booking', {
      state: {
        type:         'hotel',
        itemId:       hotelId,
        itemName:     name,
        itemImage:    images?.[0] || null,
        itemRating:   rating,
        price:        price || 0,
        roomTypes:    roomTypes || [],
        returnTo:     '/Hotel',
      },
    });

    // Call onClose so the parent knows the modal-trigger state is cleared
    if (onClose) onClose();
  }, []); // eslint-disable-line

  return null; // No UI — immediately navigates
}
