/**
 * BookingModal.jsx — Package booking trigger
 *
 * Instead of opening a popup modal, this navigates to the full-page
 * BookingPage (/booking) with all necessary data passed via router state.
 *
 * Usage: same props as before — drop-in replacement.
 */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookingModal({ isOpen, onClose, packageData }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen || !packageData) return;

    navigate('/booking', {
      state: {
        type:         'package',
        itemId:       packageData._id || packageData.id,
        itemName:     packageData.title,
        itemImage:    packageData.coverImage || packageData.image || packageData.images?.[0] || null,
        itemRating:   packageData.rating,
        itemLocation: packageData.location,
        price:        packageData.price || 0,
        returnTo:     '/packages',
      },
    });

    if (onClose) onClose();
  }, [isOpen, packageData]); // eslint-disable-line

  return null; // No UI — immediately navigates
}
