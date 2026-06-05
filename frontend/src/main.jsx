import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Global Error Boundary - catches any runtime React errors gracefully
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("S2S App Error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '20px',
          padding: '40px',
          fontFamily: 'Outfit, sans-serif',
          background: '#0b0f19',
          color: '#e2e8f0'
        }}>
          <div style={{
            padding: '40px',
            borderRadius: '20px',
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.25)',
            maxWidth: '600px',
            width: '100%',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f87171', marginBottom: '12px' }}>
              Runtime Error Detected
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '20px' }}>
              The S2S dashboard encountered an unexpected error. Make sure the
              FastAPI backend is running at <strong style={{ color: '#06b6d4' }}>http://localhost:8000</strong>.
            </p>
            <pre style={{
              fontSize: '0.75rem',
              color: '#64748b',
              textAlign: 'left',
              background: 'rgba(0,0,0,0.3)',
              padding: '12px',
              borderRadius: '8px',
              overflowX: 'auto',
              whiteSpace: 'pre-wrap'
            }}>
              {this.state.error?.toString()}
            </pre>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              style={{
                marginTop: '20px',
                padding: '10px 24px',
                background: '#6366f1',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              🔄 Retry
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
