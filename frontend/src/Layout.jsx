import React from 'react';

// Custom hand-crafted SVG icon components to replace emojis
const DashboardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <rect x="3" y="3" width="7" height="9" />
    <rect x="14" y="3" width="7" height="5" />
    <rect x="14" y="12" width="7" height="9" />
    <rect x="3" y="16" width="7" height="5" />
  </svg>
);

const ProgressionIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const GapIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const RetentionIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const MobilityIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const DEIIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="5" y1="7" x2="19" y2="7" />
    <path d="M5 7L3 17h4L5 7z" />
    <path d="M19 7l-2 10h4l-2-10z" />
  </svg>
);

const InsightsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
);

const ReportsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const ClusteringIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="3" />
    <circle cx="6" cy="6" r="3" />
    <circle cx="18" cy="6" r="3" />
    <line x1="6" y1="9" x2="12" y2="12" />
    <line x1="18" y1="9" x2="12" y2="12" />
  </svg>
);

const AlertsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    <circle cx="17" cy="5" r="2.5" fill="var(--danger)" stroke="none" />
  </svg>
);

const InterventionsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 11 11 13 15 9" />
  </svg>
);

const RelationshipsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M16 11l2 2 4-4" />
  </svg>
);

const TasksIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="9" y1="9" x2="15" y2="9" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="15" y2="17" />
  </svg>
);

export default function Layout({ children, activePage, setActivePage }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'progression', label: 'Career Progression', icon: <ProgressionIcon /> },
    { id: 'clustering', label: 'Career Clusters', icon: <ClusteringIcon /> },
    { id: 'gap', label: 'Promotion Gap', icon: <GapIcon /> },
    { id: 'alerts', label: 'Promotion Alerts', icon: <AlertsIcon /> },
    { id: 'retention', label: 'Retention Analysis', icon: <RetentionIcon /> },
    { id: 'interventions', label: 'Retention Sandbox', icon: <InterventionsIcon /> },
    { id: 'mobility', label: 'Talent Mobility', icon: <MobilityIcon /> },
    { id: 'relationships', label: 'Manager Insights', icon: <RelationshipsIcon /> },
    { id: 'dei', label: 'DEI Analytics', icon: <DEIIcon /> },
    { id: 'ai_insights', label: 'AI Insights', icon: <InsightsIcon /> },
    { id: 'reports', label: 'Reports', icon: <ReportsIcon /> },
    { id: 'tasks', label: 'Live Tasks', icon: <TasksIcon /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon /> }
  ];

  const closeSidebar = () => setSidebarOpen(false);
  const handleNav = (id) => { setActivePage(id); closeSidebar(); };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-main)' }}>

      {/* Hamburger button — visible on mobile only */}
      <button className="hamburger-btn" onClick={() => setSidebarOpen(o => !o)} aria-label="Toggle menu">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          {sidebarOpen
            ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
            : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
          }
        </svg>
      </button>

      {/* Dark overlay (mobile) */}
      <div className={`sidebar-overlay${sidebarOpen ? ' open' : ''}`} onClick={closeSidebar} />

      {/* Sidebar Navigation */}
      <aside className={`s2s-sidebar${sidebarOpen ? ' open' : ''}`} style={{
        width: '260px',
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border-glass)',
        padding: '24px 18px',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        bottom: 0,
        zIndex: 100
      }}>
        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '36px', paddingLeft: '6px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <path d="M12 2L2 22h20L12 2z" fill="#f97316" />
            <path d="M12 6l-7 14h14l-7-14z" fill="#070a14" />
            <circle cx="12" cy="14" r="3" fill="#f97316" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>paloalto</span>
            <span style={{ fontSize: '0.64rem', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 1 }}>networks</span>
          </div>
        </div>

        {/* Sidebar Links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, overflowY: 'auto', paddingRight: '4px' }}>
          {menuItems.map(item => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '10px 14px', borderRadius: '8px', border: 'none',
                  background: isActive ? 'rgba(0, 130, 240, 0.12)' : 'transparent',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  cursor: 'pointer', textAlign: 'left', fontSize: '0.86rem',
                  fontWeight: isActive ? 600 : 500, transition: 'all 0.2s', outline: 'none', width: '100%'
                }}
                onMouseOver={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                onMouseOut={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* User Card */}
        <div style={{
          marginTop: 'auto', padding: '12px', borderRadius: '8px',
          background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)',
          display: 'flex', alignItems: 'center', gap: '10px'
        }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--purple) 0%, var(--accent) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '11px', color: '#fff', flexShrink: 0
          }}>SJ</div>
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Sarah Johnson</h4>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>HR Business Partner</span>
          </div>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ marginLeft: 'auto', opacity: 0.5, flexShrink: 0 }}>
            <path d="M1 1l4 4 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </aside>

      {/* Main Container */}
      <div className="s2s-main" style={{
        flex: 1, marginLeft: '260px', padding: '30px 40px',
        minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '24px'
      }}>
        {/* Header Banner */}
        <header className="s2s-header" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          borderBottom: '1px solid var(--border-glass)', paddingBottom: '20px'
        }}>
          <div style={{ minWidth: 0 }}>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              Career Progression and Promotion Gap Analysis
              <span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>for Retention Optimization</span>
            </h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              AI-Powered Workforce Intelligence Platform
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0, flexWrap: 'wrap' }}>
            <select style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)', color: '#fff', borderRadius: '6px', fontSize: '0.78rem' }}>
              <option>Global View</option>
              <option>R&D Department</option>
              <option>Sales Department</option>
            </select>
            <select style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)', color: '#fff', borderRadius: '6px', fontSize: '0.78rem' }}>
              <option>May 2023 - Apr 2024</option>
              <option>Q1 2024</option>
              <option>Full Year 2025</option>
            </select>
            <div style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span style={{ position: 'absolute', top: '4px', right: '4px', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--danger)' }} />
            </div>
            <div style={{ padding: '6px 10px', borderRadius: '6px', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)', fontSize: '0.72rem', color: '#34d399', fontWeight: 600 }}>
              core active
            </div>
          </div>
        </header>

        {/* Dynamic Pages */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {children}
        </main>
      </div>

    </div>
  );
}

