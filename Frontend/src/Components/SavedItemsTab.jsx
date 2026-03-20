// src/Pages/Account/SavedItemsTab.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLiked } from './LikedCart/LikedContext';
import { useAuth } from '../context/AuthContext';

// Icons (keep your existing icon components)
const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const HeartIcon = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const LoaderIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" strokeDasharray="60" strokeDashoffset="20">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 12 12"
        to="360 12 12"
        dur="1s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

const SavedItemsTab = ({ onRefreshStats }) => {
  const navigate = useNavigate();
  const { 
    likedHotels, 
    likedPackages, 
    totalLiked, 
    removeFromLiked, 
    isLoading, 
    isReady // NEW: Only true when data is confirmed for current user
  } = useLiked();
  
  const [activeFilter, setActiveFilter] = useState('all');
  const [removingId, setRemovingId] = useState(null);
  const { user } = useAuth();

  // CRITICAL: Show loading state until we confirm data belongs to current user
  if (!isReady || isLoading) {
    return (
      <div className="sh-saved-section">
        <div className="sh-section-header">
          <h2>Saved Items</h2>
          <p>Loading your favorites...</p>
        </div>
        <div className="sh-saved-placeholder" style={{ minHeight: '300px' }}>
          <div className="sh-loading-spinner">
            <LoaderIcon />
          </div>
          <h3>Loading saved items...</h3>
        </div>
      </div>
    );
  }

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

    // ✅ Log removal to localStorage — no API call needed
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

    if (onRefreshStats) onRefreshStats();

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
          {filteredItems.map((item) => {
            const itemId = item.id || item._id;
            const isRemoving = removingId === `${item.type}-${itemId}`;
            
            return (
              <div 
                key={`${item.type}-${itemId}`}
                className={`sh-saved-card ${isRemoving ? 'removing' : ''}`}
              >
                <div className="sh-saved-image">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = '/placeholder-image.jpg';
                    }}
                  />
                  <span className="sh-saved-type">{item.type}</span>
                  <button 
                    className="sh-saved-remove"
                    onClick={() => handleRemove(item)}
                    disabled={isRemoving}
                    title="Remove from saved"
                  >
                    {isRemoving ? '...' : <TrashIcon />}
                  </button>
                </div>
                <div className="sh-saved-info">
                  <h4>{item.name}</h4>
                  <p><MapPinIcon /> {item.location || 'Shimla, HP'}</p>
                  <div className="sh-saved-price">
                    {item.price ? `₹${Number(item.price).toLocaleString()}` : 'Price on request'}
                    {item.type === 'hotel' && <span>/night</span>}
                  </div>
                  <button 
                    className="sh-view-btn"
                    onClick={() => navigate(`/${item.type}/${itemId}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="sh-saved-placeholder">
          <HeartIcon />
          <h3>No saved items found</h3>
          <p>Browse our hotels and packages to save your favorites</p>
          <div className="sh-saved-actions">
            <button className="sh-btn-primary" onClick={() => navigate('/Hotel')}>
              Browse Hotels
            </button>
            <button className="sh-btn-secondary" onClick={() => navigate('/packagess')}>
              Browse Packages
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedItemsTab;