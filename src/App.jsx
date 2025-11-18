import React, { useEffect, useState } from 'react'
import Gallery from './components/Gallery'

export default function App() {
  const [gallery, setGallery] = useState({ categories: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/gallery')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setGallery(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="app">
      <header className="topbar">
        <h1>Local Image Gallery</h1>
        <p className="subtitle">
          Place images in <code>./images/&lt;Category&gt;</code> and restart the server.
        </p>
      </header>

      <main>
        {loading && <div className="placeholder">Loading gallery…</div>}
        {error && <div className="error">Error: {error}</div>}
        {!loading && !error && <Gallery categories={gallery.categories} />}
      </main>

      <footer className="footer">
        Small, local, mobile-friendly gallery — built with React + Vite
      </footer>
    </div>
  )
}
