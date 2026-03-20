import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const LikedContext = createContext();

export const useLiked = () => {
  const context = useContext(LikedContext);
  if (!context) throw new Error('useLiked must be used within a LikedProvider');
  return context;
};

const getStorageKey = (userId) => `shimlaLikedItems_${userId || 'guest'}`;

export const LikedProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const currentUserId = user?._id || user?.id || null;
  const previousUserIdRef = useRef(null);

  const [likedItems, setLikedItems] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Reset when user changes
  useEffect(() => {
    if (previousUserIdRef.current !== currentUserId) {
      setLikedItems(null);
      setIsLoading(true);
      setError(null);
      previousUserIdRef.current = currentUserId;
    }
  }, [currentUserId]);

  // Fetch saved items using axios (interceptors apply — handles ban/expiry)
  useEffect(() => {
    const fetchItems = async () => {
      if (!isAuthenticated || !currentUserId) {
        setLikedItems([]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const res = await api.get('/saved-items');
        const data = res.data;
        if (data.success) {
          const hotels = (data.data?.hotels || []).map(item => ({
            _id: item.id, id: String(item.id), type: 'hotel',
            name: item.name, image: item.image, location: item.location,
            price: item.price, rating: item.rating, savedAt: item.savedAt, likedAt: item.savedAt,
          }));
          const packages = (data.data?.packages || []).map(item => ({
            _id: item.id, id: String(item.id), type: 'package',
            name: item.name, image: item.image, location: item.location,
            price: item.price, rating: item.rating, duration: item.duration,
            savedAt: item.savedAt, likedAt: item.savedAt,
          }));
          const allItems = [...hotels, ...packages];
          setLikedItems(allItems);
          localStorage.setItem(getStorageKey(currentUserId), JSON.stringify(allItems));
        }
      } catch (err) {
        if (err.response?.status === 401) { setLikedItems([]); return; }
        console.error('Error fetching saved items:', err);
        setError(err.message);
        const cached = localStorage.getItem(getStorageKey(currentUserId));
        if (cached) {
          try { setLikedItems(JSON.parse(cached)); } catch { setLikedItems([]); }
        } else { setLikedItems([]); }
      } finally { setIsLoading(false); }
    };
    fetchItems();
  }, [isAuthenticated, currentUserId]);

  const getItemId = useCallback((item) => String(item.id || item._id || item.itemId), []);
  const getCompositeKey = useCallback((id, type) => `${type}:${String(id)}`, []);

  const addToLiked = useCallback(async (item) => {
    if (!isAuthenticated) return { success: false, error: 'Not authenticated' };
    const normalizedItem = { ...item, id: String(item.id), type: item.type || 'hotel' };
    const itemKey = getCompositeKey(normalizedItem.id, normalizedItem.type);
    const exists = likedItems?.some(e => getCompositeKey(getItemId(e), e.type) === itemKey);
    if (exists) return { success: false, error: 'Already saved' };

    setLikedItems(prev => [...(prev || []), { ...normalizedItem, likedAt: new Date().toISOString() }]);
    try {
      const compositeId = `${normalizedItem.type}_${normalizedItem.id}`;
      await api.post('/saved-items', {
        itemId: compositeId, itemType: normalizedItem.type,
        name: normalizedItem.name, image: normalizedItem.image,
        location: normalizedItem.location || '', price: normalizedItem.price || 0,
        rating: normalizedItem.rating || 0, duration: normalizedItem.duration || '',
      });
      return { success: true };
    } catch (err) {
      if (err.response?.status === 409) return { success: true };
      setLikedItems(prev => prev?.filter(i => getCompositeKey(getItemId(i), i.type) !== itemKey) || []);
      return { success: false, error: err.message };
    }
  }, [isAuthenticated, likedItems, getItemId, getCompositeKey]);

  const removeFromLiked = useCallback(async (id, type) => {
    if (!isAuthenticated) return { success: false };
    const normalizedId   = String(id);
    const normalizedType = type || 'hotel';
    const targetKey = getCompositeKey(normalizedId, normalizedType);
    const itemToRemove = likedItems?.find(item => getCompositeKey(getItemId(item), item.type) === targetKey);
    if (!itemToRemove) return { success: false, error: 'Not found' };

    setLikedItems(prev => prev?.filter(item => getCompositeKey(getItemId(item), item.type) !== targetKey) || []);
    try {
      const compositeId = `${normalizedType}_${normalizedId}`;
      await api.delete(`/saved-items/${encodeURIComponent(normalizedType)}/${encodeURIComponent(compositeId)}`);
      return { success: true };
    } catch (err) {
      setLikedItems(prev => [...(prev || []), itemToRemove]);
      return { success: false, error: err.message };
    }
  }, [isAuthenticated, likedItems, getItemId, getCompositeKey]);

  const toggleLiked = useCallback(async (item) => {
    const normalizedItem = { ...item, id: String(item.id), type: item.type || 'hotel' };
    const itemKey = getCompositeKey(normalizedItem.id, normalizedItem.type);
    const isCurrentlyLiked = likedItems?.some(e => getCompositeKey(getItemId(e), e.type) === itemKey);
    return isCurrentlyLiked
      ? removeFromLiked(normalizedItem.id, normalizedItem.type)
      : addToLiked(normalizedItem);
  }, [likedItems, addToLiked, removeFromLiked, getItemId, getCompositeKey]);

  const isLiked = useCallback((id, type) => {
    if (!likedItems) return false;
    return likedItems.some(item => getCompositeKey(getItemId(item), item.type) === getCompositeKey(String(id), type || 'hotel'));
  }, [likedItems, getItemId, getCompositeKey]);

  const clearAllLiked = useCallback(async () => {
    if (!isAuthenticated) return { success: false };
    const previousItems = [...(likedItems || [])];
    setLikedItems([]);
    try {
      await api.delete('/saved-items');
      localStorage.removeItem(getStorageKey(currentUserId));
      return { success: true };
    } catch (err) {
      setLikedItems(previousItems);
      return { success: false, error: err.message };
    }
  }, [isAuthenticated, likedItems, currentUserId]);

  const refreshSavedItems = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      const res = await api.get('/saved-items');
      if (res.data.success) {
        const hotels = (res.data.data?.hotels || []).map(item => ({
          _id: item.id, id: String(item.id), type: 'hotel',
          name: item.name, image: item.image, location: item.location,
          price: item.price, rating: item.rating, savedAt: item.savedAt, likedAt: item.savedAt,
        }));
        const packages = (res.data.data?.packages || []).map(item => ({
          _id: item.id, id: String(item.id), type: 'package',
          name: item.name, image: item.image, location: item.location,
          price: item.price, rating: item.rating, duration: item.duration,
          savedAt: item.savedAt, likedAt: item.savedAt,
        }));
        const allItems = [...hotels, ...packages];
        setLikedItems(allItems);
        localStorage.setItem(getStorageKey(currentUserId), JSON.stringify(allItems));
      }
    } catch (err) { console.error('Refresh failed:', err); }
    finally { setIsLoading(false); }
  }, [isAuthenticated, currentUserId]);

  const likedHotels   = likedItems?.filter(item => item.type === 'hotel')   || [];
  const likedPackages = likedItems?.filter(item => item.type === 'package') || [];
  const totalLiked    = likedItems?.length || 0;
  const isReady       = likedItems !== null;

  return (
    <LikedContext.Provider value={{
      likedItems: likedItems || [], likedHotels, likedPackages, totalLiked,
      isLoading, isReady, error,
      addToLiked, removeFromLiked, toggleLiked, isLiked, clearAllLiked, refreshSavedItems
    }}>
      {children}
    </LikedContext.Provider>
  );
};

export default LikedContext;
