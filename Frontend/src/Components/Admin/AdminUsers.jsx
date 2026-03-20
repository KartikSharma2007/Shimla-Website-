import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function AdminUsers() {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage]       = useState(1);
  const [total, setTotal]     = useState(0);
  const [pages, setPages]     = useState(1);
  const [search, setSearch]   = useState('');
  const [modal, setModal]     = useState(null); // { type: 'detail'|'ban'|'unban', user }
  const [actionLoading, setActionLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const params = { page, limit: 15 };
      if (search) params.search = search;
      const res = await api.get('/admin/users', { params });
      setUsers(res.data.data.users);
      setTotal(res.data.data.pagination.total);
      setPages(res.data.data.pagination.pages);
    } catch (err) {
      console.error(err);
      setFetchError(err?.response?.data?.message || 'Failed to load users. Please try again.');
    } finally { setLoading(false); }
  }, [page, search]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  useEffect(() => {
    const t = setTimeout(() => setPage(1), 400);
    return () => clearTimeout(t);
  }, [search]);

  const handleBan = async () => {
    setActionLoading(true);
    try {
      await api.put(`/admin/users/${modal.user._id}/ban`);
      setModal(null); fetchUsers();
    } catch (err) { toast.error(err?.response?.data?.message || 'Failed'); }
    finally { setActionLoading(false); }
  };

  const handleUnban = async () => {
    setActionLoading(true);
    try {
      await api.put(`/admin/users/${modal.user._id}/unban`);
      setModal(null); fetchUsers();
    } catch (err) { toast.error(err?.response?.data?.message || 'Failed'); }
    finally { setActionLoading(false); }
  };

  const fmtDate = (d) => d
    ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—';

  return (
    <div>
      <div className="adm-toolbar">
        <input
          className="adm-search"
          placeholder="Search by name, email, phone…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="adm-card">
        <div className="adm-section-header">
          <div className="adm-section-title">All Users ({total})</div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>Loading…</div>
        ) : fetchError ? (
          <div className="adm-empty"><div className="adm-empty-icon">⚠️</div><h3>Something went wrong</h3><p>{fetchError}</p><button className="adm-btn adm-btn-green" onClick={fetchUsers}>Try Again</button></div>
        ) : users.length === 0 ? (
          <div className="adm-empty">
            <div className="adm-empty-icon">👥</div>
            <h3>No users found</h3>
          </div>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Provider</th>
                  <th>Bookings</th>
                  <th>Joined</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id}>
                    <td data-label="Name">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                          width: 30, height: 30, borderRadius: '50%',
                          background: u.role === 'admin' ? '#059669' : '#6366f1',
                          color: '#fff', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', fontSize: 12, fontWeight: 700,
                          flexShrink: 0,
                        }}>
                          {u.fullName?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13 }}>{u.fullName}</div>
                          {u.role === 'admin' && <div style={{ fontSize: 10, color: '#059669', fontWeight: 700 }}>ADMIN</div>}
                        </div>
                      </div>
                    </td>
                    <td data-label="Username" style={{ fontSize: 12, fontFamily: 'monospace', color: '#6366f1' }}>
                      {u.username ? `@${u.username}` : '—'}
                    </td>
                    <td data-label="Email" style={{ fontSize: 12 }}>{u.email}</td>
                    <td data-label="Phone" style={{ fontSize: 12 }}>{u.phone || '—'}</td>
                    <td data-label="Provider">
                      <span className={`adm-status ${u.authProvider === 'google' ? 'confirmed' : 'upcoming'}`}>
                        {u.authProvider || 'local'}
                      </span>
                    </td>
                    <td data-label="Bookings" style={{ textAlign: 'center', fontWeight: 600 }}>{u.bookingCount ?? 0}</td>
                    <td data-label="Joined" style={{ fontSize: 12 }}>{fmtDate(u.createdAt)}</td>
                    <td data-label="Status">
                      <span className={`adm-status ${u.isActive ? 'active' : 'banned'}`}>
                        {u.isActive ? 'Active' : 'Banned'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="adm-btn adm-btn-gray" onClick={() => setModal({ type: 'detail', user: u })}>
                          👁
                        </button>
                        {u.role !== 'admin' && (
                          u.isActive
                            ? <button className="adm-btn adm-btn-red" onClick={() => setModal({ type: 'ban', user: u })}>Ban</button>
                            : <button className="adm-btn adm-btn-green" onClick={() => setModal({ type: 'unban', user: u })}>Unban</button>
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
            <div className="adm-pagination-info">Page {page} of {pages} ({total} users)</div>
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

      {/* Ban Modal */}
      {modal?.type === 'ban' && (
        <div className="adm-modal-overlay" onClick={() => setModal(null)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <h3>🚫 Ban User</h3>
            <p>Ban <strong>{modal.user.fullName}</strong> ({modal.user.email})?<br />They will not be able to log in until unbanned.</p>
            <div className="adm-modal-actions">
              <button className="adm-btn adm-btn-gray" onClick={() => setModal(null)}>Cancel</button>
              <button className="adm-btn adm-btn-red" onClick={handleBan} disabled={actionLoading}>
                {actionLoading ? 'Banning…' : 'Ban User'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unban Modal */}
      {modal?.type === 'unban' && (
        <div className="adm-modal-overlay" onClick={() => setModal(null)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <h3>✅ Reactivate User</h3>
            <p>Reactivate <strong>{modal.user.fullName}</strong>? They will be able to log in again.</p>
            <div className="adm-modal-actions">
              <button className="adm-btn adm-btn-gray" onClick={() => setModal(null)}>Cancel</button>
              <button className="adm-btn adm-btn-green" onClick={handleUnban} disabled={actionLoading}>
                {actionLoading ? 'Reactivating…' : 'Reactivate'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {modal?.type === 'detail' && (
        <div className="adm-modal-overlay" onClick={() => setModal(null)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 520 }}>
            <h3>👤 User Detail</h3>
            <div className="adm-detail-grid">
              {[
                ['Full Name',   modal.user.fullName],
                ['Username',    modal.user.username ? `@${modal.user.username}` : '—'],
                ['User ID',     modal.user._id],
                ['Email',       modal.user.email],
                ['Phone',       modal.user.phone || '—'],
                ['Age',         modal.user.age || '—'],
                ['Gender',      modal.user.gender || '—'],
                ['Address',     modal.user.address || '—'],
                ['Provider',    modal.user.authProvider],
                ['Role',        modal.user.role],
                ['Travel Type', modal.user.preferredTravelType || '—'],
                ['Bookings',    modal.user.bookingCount ?? 0],
                ['Status',      modal.user.isActive ? 'Active' : 'Banned'],
                ['Joined',      new Date(modal.user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })],
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
