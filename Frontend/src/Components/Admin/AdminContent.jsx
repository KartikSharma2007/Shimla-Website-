import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { hotels as staticHotels } from '../../data/hotelData';
import { packagesData as staticPackages } from '../../data/packagesData';
import './AdminContent.css';

export default function AdminContent() {
  const [tab,          setTab]          = useState('hotels');
  const [dbHotels,     setDbHotels]     = useState([]);
  const [dbPkgs,       setDbPkgs]       = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [modal,        setModal]        = useState(null);
  const [newPrice,     setNewPrice]     = useState('');
  const [actionLoading,setActionLoading]= useState(false);
  const [search,       setSearch]       = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'active' | 'inactive' | 'unseeded'

  const fetchDb = useCallback(async () => {
    setLoading(true);
    try {
      const [hRes, pRes] = await Promise.all([
        api.get('/admin/hotels'),
        api.get('/admin/packages'),
      ]);
      setDbHotels(hRes.data.data.hotels   || []);
      setDbPkgs(  pRes.data.data.packages || []);
    } catch (err) {
      console.error('Admin content fetch failed', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchDb(); }, [fetchDb]);

  // Merge static data with MongoDB status
  const mergedHotels = staticHotels.map(sh => {
    const db = dbHotels.find(d => d.staticId === sh.id || d.name === sh.name);
    return {
      ...sh,
      _id:      db?._id      || null,
      isActive: db           ? db.isActive : true,
      // ✅ FIX: Hotel model uses TOP-LEVEL basePrice field
      dbPrice:  db?.basePrice || sh.price,
      inDb:     !!db,
    };
  });

  const mergedPackages = staticPackages.map(sp => {
    const db = dbPkgs.find(d => d.staticId === sp.id || d.title === sp.title);
    return {
      ...sp,
      _id:      db?._id   || null,
      isActive: db        ? db.isActive : true,
      dbPrice:  db?.price || sp.price,
      inDb:     !!db,
    };
  });

  const items = tab === 'hotels' ? mergedHotels : mergedPackages;
  const filtered = items.filter(item => {
    const nameMatch = (item.name || item.title || '').toLowerCase().includes(search.toLowerCase());
    if (!nameMatch) return false;
    // Status filter
    if (statusFilter === 'active')   return item.isActive && item.inDb;
    if (statusFilter === 'inactive') return !item.isActive;
    if (statusFilter === 'unseeded') return !item.inDb;
    return true; // 'all'
  });

  const handleToggle = async (item) => {
    if (!item._id) {
      alert('Not in MongoDB yet.\nRun: node Backendd/utils/seedData.js --force');
      return;
    }
    try {
      await api.put(`/admin/${tab}/${item._id}/toggle`);
      fetchDb();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed');
    }
  };

  const handlePriceUpdate = async () => {
    const val = Number(newPrice);
    if (!newPrice || isNaN(val) || val <= 0) {
      alert('Enter a valid price greater than 0'); return;
    }
    if (!modal.item._id) {
      alert('Not in MongoDB yet.\nRun: node Backendd/utils/seedData.js --force'); return;
    }
    setActionLoading(true);
    try {
      // ✅ FIX: hotels use 'basePrice' (top-level), packages use 'price'
      const body = tab === 'hotels' ? { basePrice: val } : { price: val };
      await api.put(`/admin/${tab}/${modal.item._id}/price`, body);
      setModal(null);
      setNewPrice('');
      fetchDb();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update price');
    } finally {
      setActionLoading(false);
    }
  };

  const fmt      = (n) => (n ?? 0).toLocaleString('en-IN');
  const getPrice = (item) => item.dbPrice || item.price || 0;

  const activeCount    = filtered.filter(i =>  i.isActive).length;
  const inactiveCount  = filtered.filter(i => !i.isActive).length;
  const notSeededCount = filtered.filter(i => !i.inDb).length;

  return (
    <div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button className={`adm-btn ${tab === 'hotels' ? 'adm-btn-green' : 'adm-btn-gray'}`}
          onClick={() => { setTab('hotels'); setSearch(''); setStatusFilter('all'); }}>
          🏨 Hotels ({mergedHotels.length})
        </button>
        <button className={`adm-btn ${tab === 'packages' ? 'adm-btn-green' : 'adm-btn-gray'}`}
          onClick={() => { setTab('packages'); setSearch(''); setStatusFilter('all'); }}>
          📦 Packages ({mergedPackages.length})
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        {[
          { label: 'Total',      value: items.length,    color: '#6366f1', key: 'all'      },
          { label: 'Active',     value: items.filter(i=>i.isActive&&i.inDb).length,  color: '#059669', key: 'active'   },
          { label: 'Inactive',   value: items.filter(i=>!i.isActive).length, color: '#ef4444', key: 'inactive' },
          { label: 'Not Seeded', value: items.filter(i=>!i.inDb).length,     color: '#f59e0b', key: 'unseeded' },
        ].map(s => (
          <button key={s.label} onClick={() => setStatusFilter(s.key)} style={{
            background: statusFilter === s.key ? s.color : '#fff',
            borderLeft: `3px solid ${s.color}`,
            border: `1px solid ${statusFilter === s.key ? s.color : s.color+'20'}`,
            borderRadius: 10, padding: '10px 16px',
            display: 'flex', flexDirection: 'column', gap: 2,
            cursor: 'pointer', transition: 'all 0.15s',
            boxShadow: statusFilter === s.key ? `0 4px 12px ${s.color}30` : 'none',
          }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: statusFilter === s.key ? '#fff' : s.color }}>{s.value}</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: statusFilter === s.key ? 'rgba(255,255,255,0.85)' : '#94a3b8' }}>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Seed warning */}
      {notSeededCount > 0 && (
        <div style={{
          background: '#fffbeb', border: '1px solid #fde68a',
          borderRadius: 10, padding: '10px 16px',
          fontSize: 13, color: '#92400e', marginBottom: 16,
        }}>
          ⚠️ <strong>{notSeededCount} {tab}</strong> not in MongoDB.
          Run: <code style={{ background: '#fef3c7', padding: '2px 6px', borderRadius: 4 }}>
            node Backendd/utils/seedData.js --force
          </code> — then the Activate and ₹ Price buttons will work.
        </div>
      )}

      {/* Search */}
      <div className="adm-toolbar">
        <input className="adm-search" placeholder={`Search ${tab}…`}
          value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Cards */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 48, color: '#94a3b8' }}>Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="adm-empty">
          <div className="adm-empty-icon">{tab === 'hotels' ? '🏨' : '📦'}</div>
          <h3>No results</h3>
          <p>{search ? 'Try a different search.' : 'No data available.'}</p>
        </div>
      ) : (
        <div className="adm-content-grid">
          {filtered.map(item => (
            <div key={item.id}
              className={`adm-content-card ${!item.isActive ? 'adm-content-card-inactive' : ''}`}>

              {/* Image */}
              <div className="adm-content-img-wrap">
                <img
                  src={item.image || item.coverImage || item.images?.[0]}
                  alt={item.name || item.title}
                  className="adm-content-img"
                  onError={e => { e.target.src = 'https://placehold.co/300x160?text=No+Image'; }}
                />
                <span className={`adm-content-badge ${item.isActive ? 'adm-badge-active' : 'adm-badge-inactive'}`}>
                  {item.isActive ? '✓ Active' : '✗ Inactive'}
                </span>
                {!item.inDb && (
                  <span className="adm-content-badge adm-badge-warning" style={{ top: 34 }}>
                    ⚠ Not seeded
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="adm-content-body">
                <div className="adm-content-name">{item.name || item.title}</div>
                <div className="adm-content-location">
                  📍 {item.location?.city ||
                    (typeof item.location === 'string' ? item.location.split(',')[0] : 'Shimla')}
                </div>

                {/* Hotel specific */}
                {tab === 'hotels' && (
                  <>
                    <div className="adm-content-rating">
                      <span style={{ color: '#fbbf24' }}>
                        {'★'.repeat(Math.min(5, Math.round(item.rating || 0)))}
                      </span>
                      <span style={{ fontSize: 12, color: '#6b7280', marginLeft: 4 }}>{item.rating}</span>
                    </div>
                    {item.amenities?.length > 0 && (
                      <div className="adm-content-amenities">
                        {item.amenities.slice(0, 4).map(a => (
                          <span key={a} className="adm-amenity-chip">{a}</span>
                        ))}
                        {item.amenities.length > 4 && (
                          <span className="adm-amenity-chip adm-amenity-more">
                            +{item.amenities.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                    {item.roomTypes?.length > 0 && (
                      <div className="adm-content-rooms">
                        {item.roomTypes.slice(0, 2).map(r => (
                          <span key={r.type} className="adm-room-chip">
                            {r.type} — ₹{fmt(r.price)}
                          </span>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* Package specific */}
                {tab === 'packages' && (
                  <>
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', margin: '4px 0' }}>
                      <span className="adm-amenity-chip">⏱ {item.duration}</span>
                      <span className="adm-amenity-chip">🏷 {item.category}</span>
                      {item.rating && <span className="adm-amenity-chip">⭐ {item.rating}</span>}
                    </div>
                    {item.highlights?.length > 0 && (
                      <div className="adm-content-amenities">
                        {item.highlights.slice(0, 3).map(h => (
                          <span key={h} className="adm-amenity-chip">✓ {h}</span>
                        ))}
                        {item.highlights.length > 3 && (
                          <span className="adm-amenity-chip adm-amenity-more">
                            +{item.highlights.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </>
                )}

                {/* Price — green dot = from DB, orange dot = static fallback */}
                <div className="adm-content-price">
                  ₹{fmt(getPrice(item))}
                  <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 400, marginLeft: 4 }}>
                    {tab === 'hotels' ? '/night' : '/person'}
                  </span>
                  <span style={{
                    fontSize: 10, marginLeft: 6,
                    color: item.inDb ? '#059669' : '#f59e0b', fontWeight: 600,
                  }}>
                    {item.inDb ? '● DB' : '● Static'}
                  </span>
                </div>

                {/* Action buttons */}
                <div className="adm-content-actions">

                  {/* ✅ View Details — opens actual hotel/package page in new tab */}
                  <button
                    className="adm-btn adm-btn-gray"
                    style={{ flex: 1, fontSize: 11 }}
                    onClick={() => {
                      // Use the same basename as the React Router in App.jsx
                      const base = '/Shimla-Website-';
                      const path = tab === 'hotels'
                        ? `${base}/hotel/${item.id}`
                        : `${base}/package/${item.id}`;
                      window.open(path, '_blank');
                    }}
                  >
                    👁 View
                  </button>

                  {/* Activate / Deactivate */}
                  <button
                    className={`adm-btn ${item.isActive ? 'adm-btn-red' : 'adm-btn-green'}`}
                    style={{ flex: 1, fontSize: 11 }}
                    onClick={() => handleToggle(item)}
                    disabled={!item.inDb}
                    title={!item.inDb ? 'Run seed script first' : ''}
                  >
                    {item.isActive ? '✗ Off' : '✓ On'}
                  </button>

                  {/* Update price */}
                  <button
                    className="adm-btn adm-btn-blue"
                    style={{ fontSize: 11 }}
                    onClick={() => { setModal({ type: 'price', item }); setNewPrice(String(getPrice(item))); }}
                    disabled={!item.inDb}
                    title={!item.inDb ? 'Run seed script first' : ''}
                  >
                    ₹ Price
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Price Modal */}
      {modal?.type === 'price' && (
        <div className="adm-modal-overlay" onClick={() => setModal(null)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <h3>₹ Update Price</h3>
            {(modal.item.image || modal.item.coverImage) && (
              <img
                src={modal.item.image || modal.item.coverImage} alt=""
                style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 12 }}
                onError={e => { e.target.style.display = 'none'; }}
              />
            )}
            <p>
              <strong>{modal.item.name || modal.item.title}</strong><br />
              Current price: <strong>₹{fmt(getPrice(modal.item))}</strong>
              {tab === 'hotels' ? ' / night' : ' / person'}
            </p>
            <input
              type="number" className="adm-search" placeholder="New price in ₹"
              value={newPrice} onChange={e => setNewPrice(e.target.value)}
              style={{ marginBottom: 16, display: 'block', width: '100%' }}
              min={1} autoFocus
            />
            <div className="adm-modal-actions">
              <button className="adm-btn adm-btn-gray"
                onClick={() => { setModal(null); setNewPrice(''); }}>
                Cancel
              </button>
              <button className="adm-btn adm-btn-green"
                onClick={handlePriceUpdate} disabled={actionLoading}>
                {actionLoading ? 'Saving…' : 'Save Price'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
