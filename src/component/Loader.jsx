
import './Loader.css'

export default function Loader({ variant = 'spinner', count = 8, label = 'Loading…' }) {
  if (variant === 'skeleton') {
    return (
      <div className="loader-skeleton-grid" role="status" aria-live="polite" aria-label={label}>
        {Array.from({ length: count }).map((_, i) => (
          <div className="skeleton-card" key={i}>
            <div className="skeleton-image" />
            <div className="skeleton-line skeleton-line--title" />
            <div className="skeleton-line skeleton-line--short" />
            <div className="skeleton-line skeleton-line--price" />
          </div>
        ))}
        <span className="sr-only">{label}</span>
      </div>
    )
  }

  return (
    <div className="loader-spinner" role="status" aria-live="polite">
      <div className="loader-spinner__ring" aria-hidden="true" />
      <span className="loader-spinner__text">{label}</span>
    </div>
  )
}
