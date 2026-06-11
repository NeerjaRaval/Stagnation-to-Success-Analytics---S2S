import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import CareerProgression from './pages/CareerProgression';
import PromotionGap from './pages/PromotionGap';
import RetentionAnalysis from './pages/RetentionAnalysis';
import TalentMobility from './pages/TalentMobility';
import DEIAnalytics from './pages/DEIAnalytics';
import AIInsights from './pages/AIInsights';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

// New integrations wired up
import Analytics from './pages/Analytics';
import Alerts from './pages/Alerts';
import Interventions from './pages/Interventions';
import Relationships from './pages/Relationships';
import Tasks from './pages/Tasks';
import { API_BASE } from './config';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [metrics, setMetrics] = useState(null);
  const [settings, setSettings] = useState({
    promotion_gap_threshold: 0.5,
    role_stagnation_threshold: 0.5,
    warning_satisfaction_limit: 2
  });
  
  // Explainability Assets
  const [explainability, setExplainability] = useState(null);
  
  // AI Copilot state
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [copilotQuery, setCopilotQuery] = useState('');
  const [copilotHistory, setCopilotHistory] = useState([
    { role: 'assistant', text: "Hello! I am your Palo Alto Networks Career Analytics Copilot.\n\nAsk me anything about workforce progression, promotion gaps, or select one of the quick options below!" }
  ]);
  const [copilotLoading, setCopilotLoading] = useState(false);

  const quickPills = [
    { label: "Compare Departments", prompt: "Compare the average promotion gap and employee counts between R&D, Sales, and HR." },
    { label: "Stagnation Risks", prompt: "Identify the job roles with the highest promotion gaps." },
    { label: "Mitigation Recommendations", prompt: "What are the recommended retention playbooks for high-risk employees?" }
  ];

  const fetchMetrics = () => {
    fetch(`${API_BASE}/api/metrics`)
      .then(res => res.json())
      .then(data => {
        setMetrics(data);
        setSettings(data.active_settings);
      })
      .catch(err => console.error("Error fetching metrics:", err));
  };

  useEffect(() => {
    fetchMetrics();
    // Fetch explainability assets
    fetch(`${API_BASE}/api/explainability`)
      .then(res => res.json())
      .then(data => setExplainability(data))
      .catch(err => console.error("Error fetching explainability:", err));
  }, []);

  const handleUpdateSettings = (newSettings) => {
    fetch(`${API_BASE}/api/settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSettings)
    })
      .then(res => res.json())
      .then(data => {
        setSettings(data.settings);
        fetchMetrics(); // Refresh KPIs dynamically
      })
      .catch(err => console.error("Error updating settings:", err));
  };

  const executeCopilotQuery = (queryText) => {
    setCopilotHistory(prev => [...prev, { role: 'user', text: queryText }]);
    setCopilotLoading(true);
    
    fetch(`${API_BASE}/api/copilot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: queryText })
    })
      .then(res => res.json())
      .then(data => {
        setCopilotHistory(prev => [...prev, { role: 'assistant', text: data.text, data: data.data }]);
        setCopilotLoading(false);
      })
      .catch(err => {
        console.error(err);
        setCopilotHistory(prev => [...prev, { role: 'assistant', text: "Error connecting to AI backend. Ensure the FastAPI server is running." }]);
        setCopilotLoading(false);
      });
  };

  const handleCopilotSubmit = (e) => {
    e.preventDefault();
    if (!copilotQuery.trim()) return;
    const query = copilotQuery;
    setCopilotQuery('');
    executeCopilotQuery(query);
  };

  const handlePillClick = (prompt) => {
    executeCopilotQuery(prompt);
  };

  // Routing Controller mapping pages
  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard metrics={metrics} onNavigate={setActivePage} />;
      case 'progression':
        return <CareerProgression />;
      case 'clustering':
        return <Analytics explainability={explainability} />;
      case 'gap':
        return <PromotionGap />;
      case 'alerts':
        return <Alerts />;
      case 'retention':
        return <RetentionAnalysis />;
      case 'interventions':
        return <Interventions />;
      case 'mobility':
        return <TalentMobility />;
      case 'relationships':
        return <Relationships />;
      case 'dei':
        return <DEIAnalytics />;
      case 'ai_insights':
        return <AIInsights />;
      case 'reports':
        return <Reports />;
      case 'tasks':
        return <Tasks metrics={metrics} onRefresh={fetchMetrics} />;
      case 'settings':
        return <Settings settings={settings} onUpdateSettings={handleUpdateSettings} />;
      default:
        return <div style={{ color: '#fff', padding: '20px' }}>Page coming soon.</div>;
    }
  };

  return (
    <Layout activePage={activePage} setActivePage={setActivePage}>
      {renderContent()}

      {/* Floating Interactive AI Copilot Button & Drawer */}
      <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000 }}>
        {/* Toggle Button */}
        <button
          onClick={() => setCopilotOpen(!copilotOpen)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '30px',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--purple) 100%)',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            boxShadow: '0 8px 32px 0 rgba(0, 130, 240, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',
            transition: 'transform 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {copilotOpen ? (
            /* Close SVG Icon */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            /* Chat bubble SVG Icon */
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </button>

        {/* Floating Copilot Drawer Panel */}
        {copilotOpen && (
          <div className="glass-panel animate-slide-up" style={{
            position: 'absolute',
            bottom: '80px',
            right: 0,
            width: '420px',
            height: '560px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            boxShadow: '0 12px 48px 0 rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-glass)', paddingBottom: '10px' }}>
              <div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fff' }}>S2S Copilot Chatbot</h4>
                <span style={{ fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 600 }}>FASTAPI CO-PILOT ML ENGINE</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 22 22 22 12 2" />
              </svg>
            </div>

            {/* Chat History Panel */}
            <div className="custom-scroll" style={{
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              paddingRight: '4px'
            }}>
              {copilotHistory.map((item, idx) => (
                <div key={idx} style={{
                  padding: '12px',
                  borderRadius: '8px',
                  background: item.role === 'user' ? 'rgba(0, 130, 240, 0.1)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${item.role === 'user' ? 'rgba(0, 130, 240, 0.2)' : 'var(--border-glass)'}`,
                  color: 'var(--text-secondary)',
                  fontSize: '0.84rem',
                  lineHeight: '1.4',
                  whiteSpace: 'pre-line'
                }}>
                  {item.text}
                </div>
              ))}
              {copilotLoading && (
                <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  Copilot is parsing analytics ...
                </div>
              )}
            </div>

            {/* Quick Pills Selector */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', borderTop: '1px solid var(--border-glass)', paddingTop: '10px' }}>
              {quickPills.map((pill, i) => (
                <button
                  key={i}
                  onClick={() => handlePillClick(pill.prompt)}
                  disabled={copilotLoading}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-glass)',
                    background: 'rgba(255,255,255,0.02)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.74rem',
                    cursor: copilotLoading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    outline: 'none'
                  }}
                  onMouseOver={e => { if (!copilotLoading) e.currentTarget.style.borderColor = 'var(--primary)'; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border-glass)'; }}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleCopilotSubmit} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Ask e.g. 'compare departments'..."
                value={copilotQuery}
                onChange={e => setCopilotQuery(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-glass)',
                  background: 'rgba(0,0,0,0.3)',
                  color: '#fff',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                disabled={copilotLoading}
                style={{
                  padding: '10px 16px',
                  background: 'var(--primary)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
}
