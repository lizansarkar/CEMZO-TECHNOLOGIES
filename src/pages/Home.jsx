
import { useState } from 'react'
import { useProducts } from '../hooks/userProducts'
import SearchBar from '../component/SearchBar'
import CategoryFilter from '../component/CategoryFilter'
import ProductList from '../component/ProductList'
import ProductModal from '../component/ProductModal'
import Pagination from '../component/Pagination'
import './Home.css'

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

  // Local UI state: show/hide the filter panel on mobile.
  const [showFilters, setShowFilters] = useState(true)

  return (
    <div className="home">
      {/* ---------- Hero / header ---------- */}
      <section className="home__hero">
        <div className="home__hero-inner">
          <span className="home__eyebrow">
            <i className="fa-solid fa-bolt" aria-hidden="true" /> Shop the universe
          </span>
          <h1 className="home__title">
            Discover products you'll <span className="home__title-accent">actually</span> love.
          </h1>
          <p className="home__subtitle">
            A curated catalogue from the FakeStore API — search, filter and
            explore products with a clean, fast, responsive interface.
          </p>
        </div>
      </section>

      {/* ---------- Toolbar (search + filter toggle) ---------- */}
      <section className="home__toolbar">
        {isUsingFallback && (
          <div className="home__notice" role="status">
            <i className="fa-solid fa-circle-info" aria-hidden="true" />
            <span>
              Showing sample products — the live FakeStore API couldn't be
              reached from this environment. In a normal browser the live
              catalogue loads automatically.
            </span>
          </div>
        )}

        <div className="home__toolbar-row">
          <SearchBar value={searchQuery} onChange={handleSearch} />

          <button
            type="button"
            className="home__filter-toggle"
            onClick={() => setShowFilters((v) => !v)}
            aria-expanded={showFilters}
            aria-controls="filter-panel"
          >
            <i className="fa-solid fa-sliders" aria-hidden="true" />
            <span>Filters</span>
          </button>
        </div>

        {showFilters && (
          <div id="filter-panel" className="home__filter-panel">
            <CategoryFilter
              categories={categories}
              active={activeCategory}
              onChange={handleCategoryChange}
            />
          </div>
        )}

        {/* Result count + active filter summary */}
        {!isLoading && !error && (
          <div className="home__meta">
            <span>
              Showing <strong>{paginatedProducts.length}</strong> of{' '}
              <strong>{filteredProducts.length}</strong> products
            </span>
            {activeCategory !== 'all' && (
              <span className="home__chip">
                <i className="fa-solid fa-tag" aria-hidden="true" />
                {activeCategory}
                <button
                  type="button"
                  className="home__chip-clear"
                  onClick={() => handleCategoryChange('all')}
                  aria-label={`Clear category filter (${activeCategory})`}
                >
                  <i className="fa-solid fa-xmark" aria-hidden="true" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="home__chip">
                <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
                "{searchQuery}"
                <button
                  type="button"
                  className="home__chip-clear"
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

      {/* ---------- Product grid ---------- */}
      <main className="home__main">
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

      {/* ---------- Pagination ---------- */}
      {!isLoading && !error && filteredProducts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* ---------- Footer ---------- */}
      <footer className="home__footer">
        <p>
          <i className="fa-solid fa-circle-info" aria-hidden="true" /> Built with React +
          Vite + Axios. Data from{' '}
          <a href="https://fakestoreapi.com" target="_blank" rel="noreferrer">
            FakeStore API
          </a>
          .
        </p>
      </footer>

      {/* ---------- Modal ---------- */}
      <ProductModal product={selectedProduct} onClose={closeProduct} />
    </div>
  )
}
