import React from 'react';
import './Admin.components.css';

const fmt = (n) => (n ?? 0).toLocaleString('en-IN');

const StatCard = ({ icon, label, value, sub, accent }) => (
  <div className="adm-stat-card" style={{ '--accent': accent, '--icon-bg': accent + '18' }}>
    <div className="adm-stat-top">
      <div className="adm-stat-icon-wrap">
      <span className="adm-stat-emoji">{icon}</span>
      </div>
    </div>
    <div>
      <div className="adm-stat-value">{value ?? '—'}</div>
      <div className="adm-stat-label">{label}</div>
      {sub && <div className="adm-stat-sub">{sub}</div>}
    </div>
  </div>
);

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function AdminStats({ stats, loading }) {

  if (loading) return (
    <div className="adm-stat-grid">
      {[...Array(8)].map((_, i) => <div key={i} className="adm-stat-skeleton" />)}
    </div>
  );

  if (!stats) return (
    <div className="adm-empty">
      <div className="adm-empty-icon">📊</div>
      <h3>Could not load stats</h3>
      <p>Make sure the backend is running and try refreshing.</p>
    </div>
  );

  const { users, bookings, revenue, content, monthlyTrend } = stats;
  const maxCount = Math.max(...(monthlyTrend?.map(m => m.count) || [1]), 1);

  return (
    <div>

      {/* ── Stat cards ── */}
      <div className="adm-stat-grid">
        <StatCard icon="👥" label="Total Users"       value={fmt(users?.total)}            sub={`+${users?.newToday ?? 0} new today`}           accent="#3b82f6" />
        <StatCard icon="📋" label="Total Bookings"    value={fmt(bookings?.total)}          sub={`${bookings?.today ?? 0} today`}                  accent="#8b5cf6" />
        <StatCard icon="⏳" label="Pending Confirm"   value={fmt(bookings?.pending)}        sub="Need your action"                                 accent="#f59e0b" />
        <StatCard icon="✅" label="Confirmed"          value={fmt(bookings?.confirmed)}      sub={`${bookings?.completed ?? 0} completed`}           accent="#10b981" />
        <StatCard icon="💰" label="Total Revenue"     value={`₹${fmt(revenue?.total)}`}     sub={`₹${fmt(revenue?.thisMonth)} this month`}          accent="#059669" />
        {/* ✅ FIX: Show BOTH review types correctly */}
        <StatCard icon="⭐" label="About Page Reviews" value={fmt(content?.siteReviews)}    sub="Testimonials on About page"                       accent="#f59e0b" />
        <StatCard icon="🏨" label="Hotel/Pkg Reviews"  value={fmt(content?.hotelReviews)}   sub={`${fmt(content?.totalReviews)} total reviews`}    accent="#6366f1" />
        <StatCard icon="🏠" label="Hotels / Packages"  value={`${content?.hotels ?? 0} / ${content?.packages ?? 0}`} sub="Active listings"       accent="#14b8a6" />
      </div>

      {/* ── Monthly bar chart ── */}
      {monthlyTrend?.length > 0 && (
        <div className="adm-card">
          <div className="adm-section-title" style={{ marginBottom: 20 }}>
            📈 Monthly Booking Trend
          </div>
          <div className="adm-bar-chart">
            {monthlyTrend.map((m, i) => (
              <div key={i} className="adm-bar-col">
                <span className="adm-bar-count">{m.count}</span>
                <div className="adm-bar-track">
                  <div
                    className="adm-bar-fill"
                    style={{ height: `${Math.max(4, Math.round((m.count / maxCount) * 100))}%` }}
                  />
                </div>
                <span className="adm-bar-month">
                  {MONTHS[(m._id.month - 1)]} '{String(m._id.year).slice(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Recent tables ── */}
      <div className="adm-recent-row">

        {/* Recent bookings */}
        <div className="adm-card" style={{ flex: 1, minWidth: 0 }}>
          <div className="adm-section-title" style={{ marginBottom: 14 }}>🕐 Recent Bookings</div>
          {bookings?.recent?.length > 0 ? (
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Reference</th>
                    <th>User</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.recent.map(b => (
                    <tr key={b._id}>
                      <td><code style={{ fontSize: 11, color: '#6366f1' }}>{b.bookingReference}</code></td>
                      <td>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{b.user?.fullName || '—'}</div>
                        <div style={{ fontSize: 11, color: '#6366f1', fontFamily: 'monospace' }}>
                          {b.user?.username ? `@${b.user.username}` : ''}
                        </div>
                      </td>
                      <td style={{ fontWeight: 600 }}>₹{fmt(b.pricing?.totalAmount)}</td>
                      <td><span className={`adm-status ${b.status}`}>{b.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ color: '#9ca3af', fontSize: 13, padding: '16px 0' }}>No bookings yet.</p>
          )}
        </div>

        {/* Recent users */}
        <div className="adm-card" style={{ flex: 1, minWidth: 0 }}>
          <div className="adm-section-title" style={{ marginBottom: 14 }}>🆕 Recent Users</div>
          {users?.recent?.length > 0 ? (
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Provider</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.recent.map(u => (
                    <tr key={u._id}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{u.fullName}</div>
                        <div style={{ fontSize: 11, color: '#94a3b8' }}>{u.email}</div>
                      </td>
                      <td>
                        <span className={`adm-status ${u.authProvider}`}>{u.authProvider}</span>
                      </td>
                      <td style={{ fontSize: 12 }}>
                        {new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ color: '#9ca3af', fontSize: 13, padding: '16px 0' }}>No users yet.</p>
          )}
        </div>

      </div>
    </div>
  );
}
