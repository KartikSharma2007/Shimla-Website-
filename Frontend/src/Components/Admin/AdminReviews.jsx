import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function AdminReviews() {
  const [tab, setTab]           = useState('site'); // 'site' | 'hotel'
  const [reviews, setReviews]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [page, setPage]         = useState(1);
  const [total, setTotal]       = useState(0);
  const [pages, setPages]       = useState(1);
  const [modal, setModal]       = useState(null); // { type: 'delete'|'flag', review }
  const [flagReason, setFlagReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const endpoint = tab === 'site' ? '/admin/reviews/site' : '/admin/reviews';
      const res = await api.get(endpoint, { params: { page, limit: 15 } });
      setReviews(res.data.data.reviews);
      setTotal(res.data.data.pagination.total);
      setPages(res.data.data.pagination.pages);
    } catch (err) {
      console.error(err);
      setFetchError(err?.response?.data?.message || 'Failed to load reviews. Please try again.');
    } finally { setLoading(false); }
  }, [tab, page]);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);
  useEffect(() => { setPage(1); }, [tab]);

  const handleDelete = async () => {
    setActionLoading(true);
    try {
      const endpoint = tab === 'site'
        ? `/admin/reviews/site/${modal.review._id}`
        : `/admin/reviews/${modal.review._id}`;
      await api.delete(endpoint);
      setModal(null); fetchReviews();
    } catch (err) { toast.error(err?.response?.data?.message || 'Failed'); }
    finally { setActionLoading(false); }
  };

  const handleFlag = async () => {
    setActionLoading(true);
    try {
      await api.put(`/admin/reviews/${modal.review._id}/flag`, { reason: flagReason });
      setModal(null); setFlagReason(''); fetchReviews();
    } catch (err) { toast.error(err?.response?.data?.message || 'Failed'); }
    finally { setActionLoading(false); }
  };

  const fmtDate = (d) => d
    ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—';

  const Stars = ({ n }) => (
    <span style={{ color: '#fbbf24', fontSize: 13 }}>
      {'★'.repeat(n || 0)}{'☆'.repeat(5 - (n || 0))}
    </span>
  );

  return (
    <div>
      {/* Tab switcher */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button
          className={`adm-btn ${tab === 'site' ? 'adm-btn-green' : 'adm-btn-gray'}`}
          onClick={() => setTab('site')}
        >
          🌐 About Page Reviews
        </button>
        <button
          className={`adm-btn ${tab === 'hotel' ? 'adm-btn-green' : 'adm-btn-gray'}`}
          onClick={() => setTab('hotel')}
        >
          🏨 Hotel / Package Reviews
        </button>
      </div>

      <div className="adm-card">
        <div className="adm-section-header">
          <div className="adm-section-title">
            {tab === 'site' ? 'About Page Testimonials' : 'Hotel & Package Reviews'} ({total})
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>Loading…</div>
        ) : fetchError ? (
          <div className="adm-empty"><div className="adm-empty-icon">⚠️</div><h3>Something went wrong</h3><p>{fetchError}</p><button className="adm-btn adm-btn-green" onClick={fetchReviews}>Try Again</button></div>
        ) : reviews.length === 0 ? (
          <div className="adm-empty">
            <div className="adm-empty-icon">⭐</div>
            <h3>No reviews yet</h3>
          </div>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Reviewer</th>
                  {tab === 'site' && <th>Trip</th>}
                  {tab === 'hotel' && <th>Type</th>}
                  <th>Rating</th>
                  <th>Review</th>
                  <th>Date</th>
                  {tab === 'hotel' && <th>Verified</th>}
                  {tab === 'hotel' && <th>Flagged</th>}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map(r => (
                  <tr key={r._id}>
                    <td data-label="Reviewer">
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{r.name || r.user?.fullName || '—'}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8' }}>{r.location || r.user?.email || ''}</div>
                    </td>
                    {tab === 'site' && <td data-label="Trip" style={{ fontSize: 12 }}>{r.trip || '—'}</td>}
                    {tab === 'hotel' && (
                      <td data-label="Type">
                        <span className={`adm-status ${r.reviewType === 'hotel' ? 'confirmed' : 'upcoming'}`}>
                          {r.reviewType}
                        </span>
                      </td>
                    )}
                    <td data-label="Rating"><Stars n={r.rating} /></td>
                    <td data-label="Review" style={{ maxWidth: 200, fontSize: 12, color: '#475569' }}>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        "{r.story || r.comment}"
                      </div>
                    </td>
                    <td data-label="Date" style={{ fontSize: 12 }}>{fmtDate(r.createdAt)}</td>
                    {tab === 'hotel' && (
                      <td>
                        <span className={`adm-status ${r.isVerified ? 'confirmed' : 'pending'}`}>
                          {r.isVerified ? '✓ Yes' : 'No'}
                        </span>
                      </td>
                    )}
                    {tab === 'hotel' && (
                      <td>
                        {r.isFlagged
                          ? <span className="adm-status cancelled">Flagged</span>
                          : <span style={{ color: '#94a3b8', fontSize: 12 }}>—</span>}
                      </td>
                    )}
                    <td data-label="">
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          className="adm-btn adm-btn-red"
                          onClick={() => setModal({ type: 'delete', review: r })}
                        >
                          🗑
                        </button>
                        {tab === 'hotel' && !r.isFlagged && (
                          <button
                            className="adm-btn adm-btn-orange"
                            onClick={() => { setModal({ type: 'flag', review: r }); setFlagReason(''); }}
                          >
                            🚩
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

        {pages > 1 && (
          <div className="adm-pagination">
            <div className="adm-pagination-info">Page {page} of {pages}</div>
            <div className="adm-pagination-btns">
              <button className="adm-page-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</button>
              {[...Array(Math.min(pages, 5))].map((_, i) => (
                <button key={i} className={`adm-page-btn ${page === i + 1 ? 'active' : ''}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
              ))}
              <button className="adm-page-btn" disabled={page === pages} onClick={() => setPage(p => p + 1)}>›</button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {modal?.type === 'delete' && (
        <div className="adm-modal-overlay" onClick={() => setModal(null)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <h3>🗑 Delete Review</h3>
            <p>
              Delete review by <strong>{modal.review.name || modal.review.user?.fullName}</strong>?<br />
              <em style={{ fontSize: 12, color: '#94a3b8' }}>"{(modal.review.story || modal.review.comment || '').slice(0, 100)}…"</em>
            </p>
            <div className="adm-modal-actions">
              <button className="adm-btn adm-btn-gray" onClick={() => setModal(null)}>Cancel</button>
              <button className="adm-btn adm-btn-red" onClick={handleDelete} disabled={actionLoading}>
                {actionLoading ? 'Deleting…' : 'Delete Review'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Flag Modal */}
      {modal?.type === 'flag' && (
        <div className="adm-modal-overlay" onClick={() => setModal(null)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <h3>🚩 Flag Review</h3>
            <p>Flag this review as inappropriate?</p>
            <textarea
              className="adm-textarea"
              placeholder="Reason for flagging…"
              value={flagReason}
              onChange={e => setFlagReason(e.target.value)}
            />
            <div className="adm-modal-actions">
              <button className="adm-btn adm-btn-gray" onClick={() => setModal(null)}>Cancel</button>
              <button className="adm-btn adm-btn-orange" onClick={handleFlag} disabled={actionLoading}>
                {actionLoading ? 'Flagging…' : 'Flag Review'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
