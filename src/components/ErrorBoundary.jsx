import { Component } from 'react'

// Shows the real error on screen instead of a blank page.
export class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) { return { error } }
  componentDidCatch(error, info) { console.error(error, info) }
  render() {
    if (!this.state.error) return this.props.children
    return (
      <div style={{ padding: 24, fontFamily: 'system-ui', maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>Something went wrong</h1>
        <pre style={{ marginTop: 16, whiteSpace: 'pre-wrap', background: '#fff1f2', color: '#9f1239', padding: 16, borderRadius: 12 }}>
          {String(this.state.error?.stack || this.state.error)}
        </pre>
        <button onClick={() => location.reload()} style={{ marginTop: 16, padding: '8px 16px' }}>Reload</button>
      </div>
    )
  }
}
