import { useApp } from '../hooks/useApp'
import StarRating from './StarRating'

export default function ProductCard({ product, onSelect }) {
  const { isFavourite, toggleFavourite, addToCart, isInCart } = useApp()
  const fav = isFavourite(product.id)
  const inCart = isInCart(product.id)

  return (
    <article
      className="group bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden cursor-pointer flex flex-col shadow-card transition-[transform,box-shadow,border-color] duration-200 outline-none hover:-translate-y-1 hover:shadow-card-hover hover:border-[var(--color-button)] focus-visible:-translate-y-1 focus-visible:shadow-card-hover focus-visible:border-[var(--color-button)]"
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
      <div className="relative bg-white p-[22px] aspect-square flex items-center justify-center border-b border-[var(--color-border)] overflow-hidden">
        <span className="absolute top-3 left-3 bg-[var(--color-button)] text-white text-[0.65rem] font-semibold uppercase tracking-[0.04em] px-2.5 py-[5px] rounded-full">
          {formatCategory(product.category)}
        </span>
        <button
          type="button"
          className={`absolute top-2.5 right-2.5 w-9 h-9 rounded-full border-none bg-white/85 text-[var(--color-text-muted)] cursor-pointer inline-flex items-center justify-center text-[0.95rem] transition-[background,color,transform] duration-180 backdrop-blur-[4px] hover:bg-white hover:text-[var(--color-danger)] hover:scale-110 ${
            fav ? 'text-[var(--color-danger)]' : ''
          }`}
          aria-label={fav ? 'Remove from favourites' : 'Add to favourites'}
          aria-pressed={fav}
          onClick={(e) => {
            e.stopPropagation()
            toggleFavourite(product)
          }}
        >
          <i className={`fa-${fav ? 'solid' : 'regular'} fa-heart`} aria-hidden="true" />
        </button>
        <img
          src={product.image}
          alt={product.title}
          className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-350 group-hover:scale-[1.06]"
          loading="lazy"
        />
      </div>

      <div className="px-[18px] pb-[18px] pt-4 flex flex-col gap-1.5 flex-1">
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.05em] text-[var(--color-text-muted)]">
          {product.category}
        </span>
        <h3 className="text-[0.95rem] font-semibold leading-tight text-[var(--color-text)] m-0 line-clamp-2 min-h-[2.6em]" title={product.title}>
          {product.title}
        </h3>

        <div className="flex items-center gap-1.5 mt-0.5">
          <StarRating rate={product.rating?.rate} />
          <span className="text-[0.75rem] text-[var(--color-text-muted)]">
            ({product.rating?.count ?? 0})
          </span>
        </div>

        <div className="mt-auto pt-2.5 flex items-center justify-between gap-2">
          <span className="text-xl font-bold text-[var(--color-button)] font-display">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className={`w-8 h-8 rounded-full border-none cursor-pointer inline-flex items-center justify-center text-[0.8rem] transition-[background,color,transform] duration-150 active:scale-90 ${
                inCart
                  ? 'bg-[var(--color-accent)] text-[var(--color-button)]'
                  : 'bg-[var(--color-button)] text-white hover:bg-[#0d3358]'
              }`}
              onClick={(e) => {
                e.stopPropagation()
                addToCart(product)
              }}
              aria-label={inCart ? 'In cart' : 'Add to cart'}
            >
              <i className={`fa-solid fa-${inCart ? 'check' : 'cart-plus'}`} aria-hidden="true" />
            </button>
            <span className="text-[0.8rem] font-semibold text-[var(--color-button)] inline-flex items-center gap-1.5 transition-[gap] duration-200 group-hover:gap-2.5">
              View <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

function formatCategory(cat) {
  if (!cat) return ''
  return cat
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}
