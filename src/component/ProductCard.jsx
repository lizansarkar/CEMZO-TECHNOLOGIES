import { motion } from 'framer-motion'
import { useApp } from '../hooks/useApp'
import StarRating from './StarRating'

export default function ProductCard({ product, index = 0 }) {
  const { isFavourite, toggleFavourite, addToCart, isInCart } = useApp()
  const fav = isFavourite(product.id)
  const inCart = isInCart(product.id)
  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden flex flex-col shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:shadow-card-hover hover:border-[var(--color-button)]/30"
    >
      <div className="relative bg-[var(--color-bg)] aspect-square flex items-center justify-center overflow-hidden p-4">
        {product.badge && (
          <span className={`absolute top-3 left-3 text-[0.65rem] font-bold uppercase tracking-wider px-2.5 py-[5px] rounded-full z-[2] ${
            product.badge === 'Sale' ? 'bg-[var(--color-danger)] text-white'
            : product.badge === 'New' ? 'bg-emerald-500 text-white'
            : 'bg-[var(--color-button)] text-white'
          }`}>
            {product.badge}
          </span>
        )}

        {hasDiscount && (
          <span className="absolute top-3 right-3 bg-[var(--color-accent)] text-[var(--color-button)] text-[0.65rem] font-bold px-2 py-[4px] rounded-full z-[2]">
            -{discountPercent}%
          </span>
        )}

        <button
          type="button"
          className={`absolute top-3 ${hasDiscount ? 'right-12' : 'right-3'} w-9 h-9 rounded-full border-none bg-white/85 backdrop-blur-[4px] cursor-pointer inline-flex items-center justify-center text-[0.95rem] transition-[background,color,transform] duration-200 z-[3] hover:bg-white hover:text-[var(--color-danger)] hover:scale-110 ${fav ? 'text-[var(--color-danger)]' : 'text-[var(--color-text-muted)]'}`}
          aria-label={fav ? 'Remove from favourites' : 'Add to favourites'}
          aria-pressed={fav}
          onClick={(e) => { e.stopPropagation(); toggleFavourite(product) }}
        >
          <i className={`fa-${fav ? 'solid' : 'regular'} fa-heart`} aria-hidden="true" />
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-[1.08]"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-[var(--color-button)]/0 group-hover:bg-[var(--color-button)]/5 transition-colors duration-300" />
      </div>

      <div className="px-4 pb-4 pt-3.5 flex flex-col gap-1.5 flex-1">
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.05em] text-[var(--color-text-muted)]">
          {product.category}
        </span>
        <h3 className="text-[0.92rem] font-semibold leading-snug text-[var(--color-text)] m-0 line-clamp-1" title={product.name}>
          {product.name}
        </h3>

        <div className="flex items-center gap-1.5 mt-0.5">
          <StarRating rate={product.rating} />
          <span className="text-[0.72rem] text-[var(--color-text-muted)]">
            ({product.reviews})
          </span>
        </div>

        <div className="mt-auto pt-2.5 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-[1.1rem] font-extrabold text-[var(--color-button)] font-display">
              ${product.price.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-[0.8rem] text-[var(--color-text-muted)] line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            type="button"
            className={`w-9 h-9 rounded-full border-none cursor-pointer inline-flex items-center justify-center text-[0.8rem] transition-[background,color,transform] duration-200 active:scale-90 ${
              inCart
                ? 'bg-[var(--color-accent)] text-[var(--color-button)]'
                : 'bg-[var(--color-button)] text-white hover:bg-[var(--color-button-hover)]'
            }`}
            onClick={(e) => { e.stopPropagation(); addToCart(product) }}
            aria-label={inCart ? 'In cart' : 'Add to cart'}
          >
            <i className={`fa-solid fa-${inCart ? 'check' : 'cart-plus'}`} aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.article>
  )
}
