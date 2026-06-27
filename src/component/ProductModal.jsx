import { useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext'
import './ProductModal.css'

export default function ProductModal({ product, onClose }) {
  const overlayRef = useRef(null)
  const panelRef = useRef(null)
  const closeBtnRef = useRef(null)
  const { isFavourite, toggleFavourite } = useApp()

  // Lock background scroll + ESC-to-close + focus management.
  useEffect(() => {
    if (!product) return

    const previouslyFocused = document.activeElement
    closeBtnRef.current?.focus()

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      // Basic focus trap: keep Tab within the panel.
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = prevOverflow
      previouslyFocused?.focus?.()
    }
  }, [product, onClose])

  if (!product) return null

  const fav = isFavourite(product.id)

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={(e) => {
        // Only close if the click was on the overlay itself, not the panel.
        if (e.target === overlayRef.current) onClose()
      }}
    >
      <div
        className="modal-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          ref={closeBtnRef}
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close product details"
        >
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>

        <div className="modal-grid">
          <div className="modal-image">
            <img src={product.image} alt={product.title} />
          </div>

          <div className="modal-content">
            <span className="modal-category">{product.category}</span>
            <h2 id="modal-title" className="modal-title">
              {product.title}
            </h2>

            <div className="modal-rating">
              <span className="modal-stars" aria-hidden="true">
                {renderStars(product.rating?.rate)}
              </span>
              <span className="modal-rating-text">
                {product.rating?.rate?.toFixed(1) ?? '0.0'} / 5.0
              </span>
              <span className="modal-rating-count">
                ({product.rating?.count ?? 0} reviews)
              </span>
            </div>

            <div className="modal-price-row">
              <span className="modal-price">${product.price.toFixed(2)}</span>
              <button
                type="button"
                className={`btn btn--ghost modal-fav ${
                  fav ? 'modal-fav--active' : ''
                }`}
                onClick={() => toggleFavourite(product.id)}
                aria-pressed={fav}
              >
                <i className={`fa-${fav ? 'solid' : 'regular'} fa-heart`} aria-hidden="true" />
                {fav ? 'Favourited' : 'Add to favourites'}
              </button>
            </div>

            <div className="modal-section">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="modal-actions">
              <button type="button" className="btn btn--primary">
                <i className="fa-solid fa-cart-plus" aria-hidden="true" /> Add to cart
              </button>
              <button type="button" className="btn btn--ghost" onClick={onClose}>
                Continue browsing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function renderStars(rate = 0) {
  const rounded = Math.round((rate || 0) * 2) / 2
  return [1, 2, 3, 4, 5].map((i) => {
    const isFull = rounded >= i
    const isHalf = rounded === i - 0.5
    return (
      <i
        key={i}
        className={`fa-star ${isFull ? 'fa-solid' : isHalf ? 'fa-solid half' : 'fa-regular'}`}
      />
    )
  })
}
