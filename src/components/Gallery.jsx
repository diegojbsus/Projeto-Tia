import React, { useState, useRef } from 'react'

export default function Gallery({ categories }) {
  const [expanded, setExpanded] = useState(null)
  const [viewerImg, setViewerImg] = useState(null)
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const dragStart = useRef(null)
  const touchStart = useRef(null)

  /* ------------------ OPEN / CLOSE VIEWER ------------------ */
  function openViewer(img) {
    setViewerImg(img)
    setZoom(1)
    setOffset({ x: 0, y: 0 })
  }

  function closeViewer() {
    setViewerImg(null)
  }

  /* ------------------ MOUSE ZOOM ------------------ */
  function handleWheel(e) {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setZoom(z => Math.min(Math.max(z + delta, 1), 4))
  }

  /* ------------------ MOUSE DRAG ------------------ */
  function handleMouseDown(e) {
    if (zoom <= 1) return
    dragStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y }
  }

  function handleMouseMove(e) {
    if (!dragStart.current) return
    setOffset({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    })
  }

  function handleMouseUp() {
    dragStart.current = null
  }

  /* ------------------ TOUCH EVENTS (Mobile) ------------------ */

  // Single-finger swipe down to close
  function handleTouchStart(e) {
    if (e.touches.length === 1) {
      touchStart.current = {
        y: e.touches[0].clientY,
      }
    }
  }

  function handleTouchMove(e) {
    // Swipe down to close viewer
    if (touchStart.current && e.touches.length === 1 && zoom === 1) {
      const deltaY = e.touches[0].clientY - touchStart.current.y
      if (deltaY > 60) closeViewer()
    }
  }

  // Pinch-to-zoom gesture
  function handlePinch(e) {
    if (e.touches.length === 2) {
      const [t1, t2] = e.touches
      const dist = Math.hypot(t2.pageX - t1.pageX, t2.pageY - t1.pageY)

      if (!touchStart.current?.pinchDist) {
        touchStart.current = { pinchDist: dist }
        return
      }

      const delta = dist - touchStart.current.pinchDist
      touchStart.current.pinchDist = dist

      setZoom(z => Math.min(Math.max(z + delta * 0.003, 1), 4))
    }
  }

  function handleTouchEnd() {
    touchStart.current = null
  }

  return (
    <div className="gallery-root">

      {/* Category bar */}
      <nav className="category-bar">
        <button
          className={expanded === null ? 'active' : ''}
          onClick={() => setExpanded(null)}
        >
          All
        </button>

        {categories.map(cat => (
          <button
            key={cat.name}
            className={expanded === cat.name ? 'active' : ''}
            onClick={() => setExpanded(prev => (prev === cat.name ? null : cat.name))}
          >
            {cat.name} ({cat.images.length})
          </button>
        ))}
      </nav>

      {/* No categories */}
      {categories.length === 0 && (
        <div className="empty">
          No categories found. Create subfolders in <code>./images</code>.
        </div>
      )}

      {/* Grid of images */}
      <section className="grid">
        {categories.map(cat => (
          (expanded === null || expanded === cat.name) &&
          cat.images.map((img, idx) => (
            <figure
              key={img + idx}
              className="card"
              onClick={() => openViewer(img)}
            >
              <img src={img} alt={`${cat.name} ${idx + 1}`} loading="lazy" />
              <figcaption>
  <div className="cap-category">{cat.name}</div>
  <div className="cap-filename">{decodeURIComponent(img.split('/').pop())}</div>
</figcaption>
            </figure>
          ))
        ))}
      </section>

      {/* VIEWER (LIGHTBOX) */}
      {viewerImg && (
        <div
          className="lightbox-overlay active"
          onClick={closeViewer}

          /* Mouse interactions */
          onWheel={handleWheel}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}

          /* Touch interactions */
          onTouchStart={handleTouchStart}
          onTouchMove={e => { handleTouchMove(e); handlePinch(e); }}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={viewerImg}
            className="lightbox-image"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            }}
            onClick={e => e.stopPropagation()} // do NOT close on image
          />
        </div>
      )}
    </div>
  )
}
