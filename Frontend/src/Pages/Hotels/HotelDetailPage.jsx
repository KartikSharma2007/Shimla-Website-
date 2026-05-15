import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HotelDetailModal from "../../Components/Hotel/HotelDetailModal";
import BookingPanel from "../../Components/Hotel/booking";
import { hotels as staticHotels } from "../../data/hotelData";
import "../../Components/Hotel/HotelDetailModal.css";

const API_BASE = import.meta.env.VITE_API_URL || '/api/v1';

const HotelDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    const hotelId = parseInt(id);
    const staticHotel = staticHotels.find(h => h.id === hotelId);

    if (!staticHotel) {
      setLoading(false);
      return;
    }

    // Show static data immediately
    setHotel(staticHotel);
    setLoading(false);

    // Fetch DB to get any Cloudinary images uploaded via admin panel
    const fetchDbImages = async () => {
      try {
        const res = await fetch(`${API_BASE}/hotels/by-static/${hotelId}`);
        if (!res.ok) return;
        const data = await res.json();

        if (data.success && data.data.images && data.data.images.length > 0) {
          setHotel(prev => ({
            ...prev,
            // Put Cloudinary images first, then append static images after
            images: [...data.data.images, ...(prev.images || [])],
            _id: data.data._id || prev._id,
          }));
        }
      } catch (err) {
        // Static images still showing — no problem
      }
    };

    fetchDbImages();
  }, [id]);

  const handleClose = () => navigate('/Hotel');
  const handleBook = () => setShowBooking(true);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f8fafc' }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f8fafc', gap: '20px' }}>
        <h2>Hotel Not Found</h2>
        <p>The hotel you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/Hotel')}
          style={{ padding: '12px 24px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Back to Hotels
        </button>
      </div>
    );
  }

  return (
    <>
      <HotelDetailModal
        hotel={hotel}
        onClose={handleClose}
        onBook={handleBook}
        isModal={false}
      />
      {showBooking && (
        <BookingPanel
          onClose={() => setShowBooking(false)}
          name={hotel.name}
          price={hotel.price}
          rating={hotel.rating}
          images={hotel.images || [hotel.image]}
          roomTypes={hotel.roomTypes}
          hotelId={hotel._id || hotel.id}
        />
      )}
    </>
  );
};

export default HotelDetailPage;
