
import ProductCard from './ProductCard'
import Loader from './Loader'
import './ProductList.css'

export default function ProductList({
  products,
  isLoading,
  error,
  onSelect,
  onRetry,
  searchQuery,
  activeCategory,
}) {
  if (isLoading) {
    return <Loader variant="skeleton" count={8} label="Loading products…" />
  }

  if (error) {
    return (
      <div className="product-list__state product-list__state--error">
        <i className="fa-solid fa-triangle-exclamation" aria-hidden="true" />
        <h3>Something went wrong</h3>
        <p>{error}</p>
        <button type="button" className="btn btn--primary" onClick={onRetry}>
          <i className="fa-solid fa-rotate-right" aria-hidden="true" /> Retry
        </button>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="product-list__state">
        <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
        <h3>No products found</h3>
        <p>
          {searchQuery || activeCategory !== 'all'
            ? 'Try a different search term or category.'
            : 'The catalogue appears to be empty.'}
        </p>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onSelect={onSelect} />
      ))}
    </div>
  )
}
