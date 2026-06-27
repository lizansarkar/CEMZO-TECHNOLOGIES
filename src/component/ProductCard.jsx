import { useApp } from '../context/AppContext'
import './ProductCard.css'

export default function ProductCard({ product, onSelect }) {
  const { isFavourite, toggleFavourite } = useApp()
  const fav = isFavourite(product.id)

  return (
    <article
      className="product-card"
      tabIndex={0}
      role="button"
      aria-label={`View details for ${product.title}`}
      onClick={() => onSelect(product)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(product)
        }
      }}
    >
      <div className="product-card__media">
        <span className="product-card__badge">{formatCategory(product.category)}</span>
        <button
          type="button"
          className={`product-card__fav ${fav ? 'product-card__fav--active' : ''}`}
          aria-label={fav ? 'Remove from favourites' : 'Add to favourites'}
          aria-pressed={fav}
          onClick={(e) => {
            e.stopPropagation()
            toggleFavourite(product.id)
          }}
        >
          <i className={`fa-${fav ? 'solid' : 'regular'} fa-heart`} aria-hidden="true" />
        </button>
        <img
          src={product.image}
          alt={product.title}
          className="product-card__img"
          loading="lazy"
        />
      </div>

      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__title" title={product.title}>
          {product.title}
        </h3>

        <div className="product-card__rating">
          <StarRating rate={product.rating?.rate} />
          <span className="product-card__count">
            ({product.rating?.count ?? 0})
          </span>
        </div>

        <div className="product-card__footer">
          <span className="product-card__price">${product.price.toFixed(2)}</span>
          <span className="product-card__cta">
            View <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  )
}

/* ---- helpers ---- */

function formatCategory(cat) {
  if (!cat) return ''
  return cat
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function StarRating({ rate = 0 }) {
  // Round to nearest half for half-star display.
  const rounded = Math.round((rate || 0) * 2) / 2
  return (
    <span
      className="star-rating"
      aria-label={`Rated ${rate} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => {
        const isHalf = rounded === i - 0.5
        const isFull = rounded >= i
        return (
          <i
            key={i}
            className={`fa-star ${
              isFull ? 'fa-solid' : isHalf ? 'fa-solid half' : 'fa-regular'
            }`}
            aria-hidden="true"
          />
        )
      })}
    </span>
  )
}
