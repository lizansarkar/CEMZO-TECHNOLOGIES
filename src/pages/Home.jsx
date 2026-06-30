import { useState } from 'react'
import { useProducts } from '../hooks/userProducts'
import SearchBar from '../component/SearchBar'
import CategoryFilter from '../component/CategoryFilter'
import ProductList from '../component/ProductList'
import ProductModal from '../component/ProductModal'
import Pagination from '../component/Pagination'

export default function Home() {
  const {
    categories,
    paginatedProducts,
    filteredProducts,
    isLoading,
    error,
    isUsingFallback,
    searchQuery,
    activeCategory,
    currentPage,
    totalPages,
    selectedProduct,
    handleSearch,
    handleCategoryChange,
    handlePageChange,
    openProduct,
    closeProduct,
    retry,
  } = useProducts({ pageSize: 8 })

  const [showFilters, setShowFilters] = useState(true)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Toolbar */}
      <section className="max-w-[1400px] w-full mx-auto px-5 pt-6 pb-2 flex flex-col gap-4">
        {isUsingFallback && (
          <div className="flex items-center gap-3 bg-[#fff8e1] border border-[#f0c419] text-[#5a4500] px-4 py-3 rounded-xl text-[0.85rem] leading-relaxed" role="status">
            <i className="fa-solid fa-circle-info text-[#b8860b] text-base shrink-0" aria-hidden="true" />
            <span>
              Showing sample products — the live FakeStore API couldn't be
              reached from this environment. In a normal browser the live
              catalogue loads automatically.
            </span>
          </div>
        )}

        <div className="flex items-center gap-3 flex-wrap">
          <SearchBar value={searchQuery} onChange={handleSearch} />

          <button
            type="button"
            className="inline-flex items-center gap-2 h-12 px-[18px] bg-white border-[1.5px] border-[var(--color-border)] rounded-full text-[var(--color-text)] font-semibold text-[0.9rem] cursor-pointer font-body transition-[border-color,color] duration-180 hover:border-[var(--color-button)] hover:text-[var(--color-button)] max-[600px]:ml-auto"
            onClick={() => setShowFilters((v) => !v)}
            aria-expanded={showFilters}
            aria-controls="filter-panel"
          >
            <i className="fa-solid fa-sliders" aria-hidden="true" />
            <span>Filters</span>
          </button>
        </div>

        {showFilters && (
          <div id="filter-panel" className="bg-white border border-[var(--color-border)] rounded-xl p-3.5 shadow-card">
            <CategoryFilter
              categories={categories}
              active={activeCategory}
              onChange={handleCategoryChange}
            />
          </div>
        )}

        {!isLoading && !error && (
          <div className="flex items-center gap-2 flex-wrap text-[0.85rem] text-[var(--color-text-muted)]">
            <span>
              Showing <strong className="text-[var(--color-text)]">{paginatedProducts.length}</strong> of{' '}
              <strong className="text-[var(--color-text)]">{filteredProducts.length}</strong> products
            </span>
            {activeCategory !== 'all' && (
              <span className="inline-flex items-center gap-1.5 bg-white border border-[var(--color-border)] text-[var(--color-text)] pl-3 pr-2 py-[5px] rounded-full text-[0.78rem] font-medium">
                <i className="fa-solid fa-tag" aria-hidden="true" />
                {activeCategory}
                <button
                  type="button"
                  className="border-none bg-[var(--color-border)] text-[var(--color-text)] w-[18px] h-[18px] rounded-full cursor-pointer inline-flex items-center justify-center text-[0.65rem] transition-[background,color] duration-150 hover:bg-[var(--color-button)] hover:text-white"
                  onClick={() => handleCategoryChange('all')}
                  aria-label={`Clear category filter (${activeCategory})`}
                >
                  <i className="fa-solid fa-xmark" aria-hidden="true" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 bg-white border border-[var(--color-border)] text-[var(--color-text)] pl-3 pr-2 py-[5px] rounded-full text-[0.78rem] font-medium">
                <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
                "{searchQuery}"
                <button
                  type="button"
                  className="border-none bg-[var(--color-border)] text-[var(--color-text)] w-[18px] h-[18px] rounded-full cursor-pointer inline-flex items-center justify-center text-[0.65rem] transition-[background,color] duration-150 hover:bg-[var(--color-button)] hover:text-white"
                  onClick={() => handleSearch('')}
                  aria-label="Clear search"
                >
                  <i className="fa-solid fa-xmark" aria-hidden="true" />
                </button>
              </span>
            )}
          </div>
        )}
      </section>

      {/* Main content */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-5 pt-2 pb-2">
        <ProductList
          products={paginatedProducts}
          isLoading={isLoading}
          error={error}
          onSelect={openProduct}
          onRetry={retry}
          searchQuery={searchQuery}
          activeCategory={activeCategory}
        />
      </main>

      {/* Pagination */}
      {!isLoading && !error && filteredProducts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-5 text-center text-[0.82rem] text-[var(--color-text-muted)]">
        <p className="m-0">
          <i className="fa-solid fa-circle-info" aria-hidden="true" /> @lizansarkar use by {" "}
          <a href="https://fakestoreapi.com" target="_blank" rel="noreferrer" className="text-[var(--color-button)] no-underline font-semibold hover:underline">
            fake store api
          </a>
          .
        </p>
      </footer>

      {/* Modal */}
      <ProductModal product={selectedProduct} onClose={closeProduct} />
    </div>
  )
}
