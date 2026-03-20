import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const STATUSES = ['', 'upcoming', 'confirmed', 'cancelled', 'completed'];
const TYPES    = ['', 'hotel', 'package'];

const fmt = (n) => n?.toLocaleString('en-IN') ?? '0';

export default function AdminBookings({ onStatsRefresh }) {
  const [bookings, setBookings]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [page, setPage]           = useState(1);
  const [total, setTotal]         = useState(0);
  const [pages, setPages]         = useState(1);
  const [search, setSearch]       = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter]     = useState('');
  const [modal, setModal]         = useState(null); // { type: 'confirm'|'cancel'|'detail', booking }
  const [actionNote, setActionNote]     = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const params = { page, limit: 15 };
      if (search)       params.search = search;
      if (statusFilter) params.status = statusFilter;
      if (typeFilter)   params.type   = typeFilter;

      const res = await api.get('/admin/bookings', { params });
      setBookings(res.data.data.bookings);
      setTotal(res.data.data.pagination.total);
      setPages(res.data.data.pagination.pages);
    } catch (err) {
      console.error(err);
      setFetchError(err?.response?.data?.message || 'Failed to load bookings. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter, typeFilter]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  // Search with debounce
  useEffect(() => {
    const t = setTimeout(() => { setPage(1); }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const handleConfirm = async () => {
    setActionLoading(true);
    try {
      await api.put(`/admin/bookings/${modal.booking._id}/confirm`, { adminNotes: actionNote });
      setModal(null); setActionNote('');
      fetchBookings(); onStatsRefresh?.();
    } catch (err) { toast.error(err?.response?.data?.message || 'Failed'); }
    finally { setActionLoading(false); }
  };

  const handleCancel = async () => {
    setActionLoading(true);
    try {
      await api.put(`/admin/bookings/${modal.booking._id}/cancel`, {
        reason: actionNote || 'Cancelled by admin',
        adminNotes: actionNote,
      });
      setModal(null); setActionNote('');
      fetchBookings(); onStatsRefresh?.();
    } catch (err) { toast.error(err?.response?.data?.message || 'Failed'); }
    finally { setActionLoading(false); }
  };

  const fmtDate = (d) => d
    ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—';

  return (
    <div>
      {/* Toolbar */}
      <div className="adm-toolbar">
        <input
          className="adm-search"
          placeholder="Search by reference, hotel, package…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="adm-select" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
          <option value="">All Statuses</option>
          {STATUSES.filter(Boolean).map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="adm-select" value={typeFilter} onChange={e => { setTypeFilter(e.target.value); setPage(1); }}>
          <option value="">All Types</option>
          {TYPES.filter(Boolean).map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="adm-card">
        <div className="adm-section-header">
          <div className="adm-section-title">All Bookings ({total})</div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>Loading…</div>
        ) : fetchError ? (
          <div className="adm-empty">
            <div className="adm-empty-icon">⚠️</div>
            <h3>Something went wrong</h3>
            <p>{fetchError}</p>
            <button className="adm-btn adm-btn-green" onClick={fetchBookings}>Try Again</button>
          </div>
        ) : bookings.length === 0 ? (
          <div className="adm-empty">
            <div className="adm-empty-icon">📋</div>
            <h3>No bookings found</h3>
            <p>Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>User</th>
                  <th>Item</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b._id}>
                    <td data-label="Ref"><code style={{ fontSize: 11, color: '#6366f1' }}>{b.bookingReference}</code></td>
                    <td data-label="User">
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{b.user?.fullName || '—'}</div>
                      <div style={{ fontSize: 11, color: '#6366f1', fontFamily: 'monospace' }}>
                        {b.user?.username ? `@${b.user.username}` : (b.user?.phone || '—')}
                      </div>
                    </td>
                    <td data-label="Item" style={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {b.hotelName || b.packageTitle || '—'}
                    </td>
                    <td data-label="Type">
                      <span className={`adm-status ${b.bookingType === 'hotel' ? 'confirmed' : 'upcoming'}`}>
                        {b.bookingType}
                      </span>
                    </td>
                    <td data-label="Date" style={{ fontSize: 12 }}>
                      {b.bookingType === 'hotel'
                        ? `${fmtDate(b.checkIn)} → ${fmtDate(b.checkOut)}`
                        : fmtDate(b.travelDate)}
                    </td>
                    <td data-label="Amount" style={{ fontWeight: 600 }}>₹{fmt(b.pricing?.totalAmount)}</td>
                    <td data-label="Payment">
                      <span className={`adm-status ${b.payment?.status === 'completed' ? 'confirmed' : b.payment?.status === 'failed' ? 'cancelled' : 'pending'}`}>
                        {b.payment?.status || 'pending'}
                      </span>
                    </td>
                    <td data-label="Status"><span className={`adm-status ${b.status}`}>{b.status}</span></td>
                    <td data-label="">
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'nowrap' }}>
                        <button className="adm-btn adm-btn-gray" onClick={() => setModal({ type: 'detail', booking: b })}>
                          👁
                        </button>
                        {(b.status === 'upcoming' || b.status === 'pending') && (
                          <button className="adm-btn adm-btn-green" onClick={() => { setModal({ type: 'confirm', booking: b }); setActionNote(''); }}>
                            ✓
                          </button>
                        )}
                        {b.status !== 'cancelled' && b.status !== 'completed' && (
                          <button className="adm-btn adm-btn-red" onClick={() => { setModal({ type: 'cancel', booking: b }); setActionNote(''); }}>
                            ✕
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="adm-pagination">
            <div className="adm-pagination-info">
              Showing page {page} of {pages} ({total} total)
            </div>
            <div className="adm-pagination-btns">
              <button className="adm-page-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</button>
              {[...Array(Math.min(pages, 5))].map((_, i) => (
                <button key={i} className={`adm-page-btn ${page === i + 1 ? 'active' : ''}`} onClick={() => setPage(i + 1)}>
                  {i + 1}
                </button>
              ))}
              <button className="adm-page-btn" disabled={page === pages} onClick={() => setPage(p => p + 1)}>›</button>
            </div>
          </div>
        )}
      </div>

      {/* ── Confirm Modal ── */}
      {modal?.type === 'confirm' && (
        <div className="adm-modal-overlay" onClick={() => setModal(null)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <h3>✅ Confirm Booking</h3>
            <p>
              Confirm booking <strong>{modal.booking.bookingReference}</strong> for{' '}
              <strong>{modal.booking.user?.fullName}</strong>?<br />
              Amount: <strong>₹{fmt(modal.booking.pricing?.totalAmount)}</strong>
            </p>
            <textarea className="adm-textarea" placeholder="Admin note (optional)…" value={actionNote} onChange={e => setActionNote(e.target.value)} />
            <div className="adm-modal-actions">
              <button className="adm-btn adm-btn-gray" onClick={() => setModal(null)}>Cancel</button>
              <button className="adm-btn adm-btn-green" onClick={handleConfirm} disabled={actionLoading}>
                {actionLoading ? 'Confirming…' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Cancel Modal ── */}
      {modal?.type === 'cancel' && (
        <div className="adm-modal-overlay" onClick={() => setModal(null)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <h3>❌ Cancel Booking</h3>
            <p>
              Cancel booking <strong>{modal.booking.bookingReference}</strong>?<br />
              This will notify the customer.
            </p>
            <textarea className="adm-textarea" placeholder="Reason for cancellation…" value={actionNote} onChange={e => setActionNote(e.target.value)} />
            <div className="adm-modal-actions">
              <button className="adm-btn adm-btn-gray" onClick={() => setModal(null)}>Go Back</button>
              <button className="adm-btn adm-btn-red" onClick={handleCancel} disabled={actionLoading}>
                {actionLoading ? 'Cancelling…' : 'Cancel Booking'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Detail Modal ── */}
      {modal?.type === 'detail' && (
        <div className="adm-modal-overlay" onClick={() => setModal(null)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 600 }}>
            <h3>📋 Booking Detail</h3>
            <div className="adm-detail-grid">
              {[
                ['Reference',   modal.booking.bookingReference],
                ['User',        `${modal.booking.user?.fullName}${modal.booking.user?.username ? ` (@${modal.booking.user.username})` : ''}`],
                ['Phone',       modal.booking.user?.phone || modal.booking.contactInfo?.phone || '—'],
                ['Type',        modal.booking.bookingType],
                ['Item',        modal.booking.hotelName || modal.booking.packageTitle || '—'],
                ['Room/Info',   modal.booking.roomType || modal.booking.pickupLocation || '—'],
                ['Dates',       modal.booking.bookingType === 'hotel'
                                  ? `${fmtDate(modal.booking.checkIn)} → ${fmtDate(modal.booking.checkOut)}`
                                  : fmtDate(modal.booking.travelDate)],
                ['Guests',      `${modal.booking.guests?.adults} adults, ${modal.booking.guests?.children || 0} children`],
                ['Amount',      `₹${fmt(modal.booking.pricing?.totalAmount)}`],
                ['Payment',     modal.booking.payment?.status || 'pending'],
                ['Status',      modal.booking.status],
                ['Admin Notes', modal.booking.adminNotes || '—'],
              ].map(([label, val]) => (
                <div key={label} className="adm-detail-row">
                  <span className="adm-detail-label">{label}</span>
                  <span className="adm-detail-val">{val}</span>
                </div>
              ))}
            </div>
            <div className="adm-modal-actions" style={{ marginTop: 16 }}>
              <button className="adm-btn adm-btn-gray" onClick={() => setModal(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
