import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';

const ACTION_COLOR = {
  BAN_USER:       { bg: '#fff1f2', color: '#e11d48', label: 'Ban User' },
  UNBAN_USER:     { bg: '#f0fdf4', color: '#16a34a', label: 'Unban User' },
  CONFIRM_BOOKING:{ bg: '#eff6ff', color: '#2563eb', label: 'Confirm Booking' },
  CANCEL_BOOKING: { bg: '#fff1f2', color: '#e11d48', label: 'Cancel Booking' },
  DELETE_REVIEW:  { bg: '#faf5ff', color: '#7c3aed', label: 'Delete Review' },
  FLAG_REVIEW:    { bg: '#fffbeb', color: '#d97706', label: 'Flag Review' },
};

export default function AdminAuditLog() {
  const [logs, setLogs]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [page, setPage]         = useState(1);
  const [total, setTotal]       = useState(0);
  const [pages, setPages]       = useState(1);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await api.get('/admin/audit-log', { params: { page, limit: 20 } });
      setLogs(res.data.data.logs);
      setTotal(res.data.data.pagination.total);
      setPages(res.data.data.pagination.pages);
    } catch (err) {
      setFetchError(err?.response?.data?.message || 'Failed to load audit log. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  const fmtDate = (d) => d
    ? new Date(d).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : '—';

  return (
    <div>
      <div className="adm-card">
        <div className="adm-section-header">
          <div className="adm-section-title">🔐 Admin Audit Log ({total})</div>
          <button className="adm-btn adm-btn-gray" onClick={fetchLogs}>↻ Refresh</button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>Loading…</div>
        ) : fetchError ? (
          <div className="adm-empty">
            <div className="adm-empty-icon">⚠️</div>
            <h3>Something went wrong</h3>
            <p>{fetchError}</p>
            <button className="adm-btn adm-btn-green" onClick={fetchLogs}>Try Again</button>
          </div>
        ) : logs.length === 0 ? (
          <div className="adm-empty">
            <div className="adm-empty-icon">📋</div>
            <h3>No admin actions recorded yet</h3>
            <p>Actions like banning users, confirming bookings, and flagging reviews will appear here.</p>
          </div>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Admin</th>
                  <th>Target</th>
                  <th>Details</th>
                  <th>Date & Time</th>
                  <th>IP</th>
                </tr>
              </thead>
              <tbody>
                {logs.map(log => {
                  const ac = ACTION_COLOR[log.action] || { bg: '#f1f5f9', color: '#475569', label: log.action };
                  return (
                    <tr key={log._id}>
                      <td data-label="Action">
                        <span className="adm-status" style={{ background: ac.bg, color: ac.color, border: `1px solid ${ac.color}40` }}>
                          {ac.label}
                        </span>
                      </td>
                      <td data-label="Admin">
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{log.adminEmail}</div>
                      </td>
                      <td data-label="Target">
                        <div style={{ fontSize: 12, color: '#6366f1', fontFamily: 'monospace' }}>
                          {log.targetType && <span style={{ color: '#64748b', fontFamily: 'inherit' }}>{log.targetType}: </span>}
                          {log.targetId ? log.targetId.slice(-8) : '—'}
                        </div>
                      </td>
                      <td data-label="Details" style={{ fontSize: 12, color: '#475569' }}>
                        {log.details && Object.keys(log.details).length > 0
                          ? Object.entries(log.details).map(([k, v]) => (
                              <div key={k}><span style={{ color: '#94a3b8' }}>{k}:</span> {String(v)}</div>
                            ))
                          : '—'}
                      </td>
                      <td data-label="Date" style={{ fontSize: 12 }}>{fmtDate(log.createdAt)}</td>
                      <td data-label="IP" style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace' }}>{log.ip || '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {pages > 1 && (
          <div className="adm-pagination">
            <div className="adm-pagination-info">Page {page} of {pages} ({total} actions)</div>
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
    </div>
  );
}
