import ProductCard from './ProductCard'
import Loader from './Loader'

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
      <div className="col-span-full flex flex-col items-center justify-center text-center px-6 py-16 bg-white border border-dashed border-[var(--color-border)] rounded-2xl my-4">
        <i className="fa-solid fa-triangle-exclamation text-4xl text-[var(--color-danger)] mb-3.5" aria-hidden="true" />
        <h3 className="m-0 mb-1.5 text-[var(--color-text)] text-[1.15rem]">Something went wrong</h3>
        <p className="m-0 mb-[18px] text-[var(--color-text-muted)] text-[0.9rem] max-w-[360px]">{error}</p>
        <button type="button" className="inline-flex items-center gap-2 border-none rounded-full px-[22px] py-[11px] text-[0.9rem] font-semibold font-body cursor-pointer transition-[background,color,transform,box-shadow] duration-180 active:scale-97 bg-[var(--color-button)] text-white hover:bg-[#0d3358] hover:shadow-[0_6px_18px_rgba(10,41,71,0.25)]" onClick={onRetry}>
          <i className="fa-solid fa-rotate-right" aria-hidden="true" /> Retry
        </button>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center text-center px-6 py-16 bg-white border border-dashed border-[var(--color-border)] rounded-2xl my-4">
        <i className="fa-solid fa-magnifying-glass text-4xl text-[var(--color-text-muted)] mb-3.5" aria-hidden="true" />
        <h3 className="m-0 mb-1.5 text-[var(--color-text)] text-[1.15rem]">No products found</h3>
        <p className="m-0 text-[var(--color-text-muted)] text-[0.9rem] max-w-[360px]">
          {searchQuery || activeCategory !== 'all'
            ? 'Try a different search term or category.'
            : 'The catalogue appears to be empty.'}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[22px] pb-6 pt-2">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onSelect={onSelect} />
      ))}
    </div>
  )
}
