import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './Admin.css';
import '../../Components/Admin/Admin.components.css'; // moved here from App.jsx — only loads for admin users
import AdminStats    from '../../Components/Admin/AdminStats';
import AdminBookings from '../../Components/Admin/AdminBookings';
import AdminUsers    from '../../Components/Admin/AdminUsers';
import AdminReviews  from '../../Components/Admin/AdminReviews';
import AdminContent  from '../../Components/Admin/AdminContent';
import AdminAuditLog from '../../Components/Admin/AdminAuditLog';

/* ── Icons (inline SVG — same style as Account page) ─────────────────────── */
const DashboardIcon  = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
const BookingsIcon   = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const UsersIcon      = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const ReviewsIcon    = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const ContentIcon    = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const MenuIcon       = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const BackIcon       = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
const RefreshIcon    = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>;
const MountainIcon   = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3l8 18 4-9 4 9M2 12l4-9 4 9"></path></svg>;

const SECTIONS = [
  { id: 'dashboard', label: 'Dashboard',       Icon: DashboardIcon },
  { id: 'bookings',  label: 'Bookings',         Icon: BookingsIcon  },
  { id: 'users',     label: 'Users',            Icon: UsersIcon     },
  { id: 'reviews',   label: 'Reviews',          Icon: ReviewsIcon   },
  { id: 'content',   label: 'Hotels & Packages',Icon: ContentIcon   },
  { id: 'audit',     label: 'Audit Log',         Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg> },
];

export default function Admin() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('dashboard');
  const [stats,         setStats]         = useState(null);
  const [statsLoading,  setStatsLoading]  = useState(true);
  const [sidebarOpen,   setSidebarOpen]   = useState(false);
  const [isRefreshing,  setIsRefreshing]  = useState(false);
  const [refreshKey,    setRefreshKey]    = useState(0);

  /* Guard — redirect non-admins */
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated)          navigate('/login',   { replace: true });
      else if (user?.role !== 'admin') navigate('/account', { replace: true });
    }
  }, [isAuthenticated, isLoading, user, navigate]);

  const fetchStats = useCallback(async () => {
    try {
      setStatsLoading(true);
      setIsRefreshing(true);
      const res = await api.get('/admin/stats');
      setStats(res.data.data);
    } catch (err) {
      console.error('Stats fetch failed', err);
    } finally {
      setStatsLoading(false);
      setTimeout(() => setIsRefreshing(false), 700);
    }
  }, []);

  const handleRefresh = useCallback(() => {
    fetchStats();
    setRefreshKey(k => k + 1);
  }, [fetchStats]);

  useEffect(() => {
    if (user?.role === 'admin') fetchStats();
  }, [user, fetchStats]);

  const getInitials = (name) =>
    name ? name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : 'A';

  if (isLoading || !user) {
    return (
      <div className="adm-loading-screen">
        <div className="adm-loading-spinner" />
        <p>Loading Admin Panel…</p>
      </div>
    );
  }
  if (user.role !== 'admin') return null;

  return (
    <div className="adm-root">

      {/* ── Mobile overlay ───────────────────────────────────────────── */}
      {sidebarOpen && (
        <div className="adm-mob-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ──────────────────────────────────────────────────── */}
      <aside className={`adm-sidebar ${sidebarOpen ? 'adm-sidebar-open' : ''}`}>

        {/* Brand */}
        <div className="adm-sidebar-brand">
          <div className="adm-brand-icon"><MountainIcon/></div>
          <div className="adm-brand-text">
            <span className="adm-brand-title">Shimla Travels</span>
            <span className="adm-brand-sub">Admin Panel</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="adm-sidebar-nav">
          {SECTIONS.map(({ id, label, Icon }) => (
            <button
              key={id}
              className={`adm-nav-btn ${activeSection === id ? 'adm-nav-active' : ''}`}
              onClick={() => { setActiveSection(id); setSidebarOpen(false); }}
            >
              <span className="adm-nav-icon"><Icon /></span>
              <span className="adm-nav-label">{label}</span>
              {id === 'bookings' && stats?.bookings?.pending > 0 && (
                <span className="adm-nav-badge">{stats.bookings.pending}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer — user info + back button */}
        <div className="adm-sidebar-footer">
          <div className="adm-sidebar-user">
            <div className="adm-sidebar-avatar">
              {user.avatar
                ? <img src={user.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                    onError={e => { e.target.style.display = 'none'; }} />
                : getInitials(user.fullName)}
            </div>
            <div className="adm-sidebar-user-info">
              <span className="adm-sidebar-user-name">{user.fullName}</span>
              <span className="adm-sidebar-user-role">Administrator</span>
            </div>
          </div>
          <button className="adm-back-account-btn" onClick={() => navigate('/account')}>
            <BackIcon /> Back to Account
          </button>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────────────────── */}
      <main className="adm-main">

        {/* Topbar */}
        <header className="adm-topbar">
          <button className="adm-menu-toggle" onClick={() => setSidebarOpen(o => !o)}>
            <MenuIcon />
          </button>
          <div className="adm-topbar-title">
            {(() => { const s = SECTIONS.find(s => s.id === activeSection); return s ? <><s.Icon /><span>{s.label}</span></> : null; })()}
          </div>
          <button
            className={`adm-topbar-refresh ${isRefreshing ? 'adm-refreshing' : ''}`}
            onClick={handleRefresh}
            title="Refresh all data"
            disabled={isRefreshing}
          >
            <RefreshIcon />
            <span style={{ fontSize: 12, fontWeight: 600 }}>Refresh</span>
          </button>
        </header>

        {/* Content */}
        <div className="adm-content">
          {activeSection === 'dashboard' && <AdminStats stats={stats} loading={statsLoading} />}
          {activeSection === 'bookings'  && <AdminBookings key={`bk-${refreshKey}`} onStatsRefresh={handleRefresh} />}
          {activeSection === 'users'     && <AdminUsers    key={`us-${refreshKey}`} />}
          {activeSection === 'reviews'   && <AdminReviews  key={`rv-${refreshKey}`} />}
          {activeSection === 'content'   && <AdminContent  key={`ct-${refreshKey}`} />}
          {activeSection === 'audit' && <AdminAuditLog key={refreshKey} />}
        </div>
      </main>

      {/* Mobile bottom navigation */}
      <nav className="adm-mobile-nav">
        {SECTIONS.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`adm-mobile-nav-btn ${activeSection === id ? 'active' : ''}`}
            onClick={() => { setActiveSection(id); setSidebarOpen(false); }}
          >
            <Icon />
            <span>{label === 'Hotels & Packages' ? 'Content' : label}</span>
            {id === 'bookings' && stats?.bookings?.pending > 0 && (
              <span className="adm-mobile-nav-badge">{stats.bookings.pending}</span>
            )}
          </button>
        ))}
      </nav>

    </div>
  );
}
