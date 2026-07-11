import { useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import SearchBar from '../component/SearchBar'
import CategoryFilter from '../component/CategoryFilter'
import ProductList from '../component/ProductList'
import ProductModal from '../component/ProductModal'
import Pagination from '../component/Pagination'

const categoryIcons = {
  electronics: 'fa-microchip',
  jewelery: 'fa-gem',
  "men's clothing": 'fa-shirt',
  "women's clothing": 'fa-bag-shopping',
}

const categoryColors = {
  electronics: 'from-cyan-500 to-blue-600',
  jewelery: 'from-amber-400 to-yellow-600',
  "men's clothing": 'from-indigo-500 to-purple-600',
  "women's clothing": 'from-pink-500 to-rose-600',
}

export default function Catalogue() {
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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0a2947] via-[#0d3358] to-[#06202b] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        <div className="relative max-w-[1400px] mx-auto px-5 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 text-sm font-medium mb-6">
            <i className="fa-solid fa-sparkles text-[var(--color-accent)]" aria-hidden="true" />
            <span>Discover our curated collection</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display leading-tight mb-4">
            Explore the{' '}
            <span className="text-[var(--color-accent)]">Catalogue</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Browse through thousands of products across electronics, jewelry,
            fashion and more. Find exactly what you need.
          </p>
          <div className="max-w-xl mx-auto">
            <SearchBar
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search the catalogue…"
            />
          </div>
        </div>
      </section>

      {/* Category Cards */}
      {categories.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-5 -mt-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => {
              const icon = categoryIcons[cat] || 'fa-tag'
              const gradient = categoryColors[cat] || 'from-gray-500 to-gray-700'
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(isActive ? 'all' : cat)}
                  className={`group relative overflow-hidden rounded-2xl p-5 text-left cursor-pointer border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                    isActive
                      ? 'border-[var(--color-accent)] bg-white shadow-card'
                      : 'border-transparent bg-white shadow-card hover:shadow-card-hover'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-[0.06] rounded-2xl`} />
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} text-white text-xl mb-3 transition-transform duration-200 group-hover:scale-110`}>
                    <i className={`fa-solid ${icon}`} aria-hidden="true" />
                  </div>
                  <h3 className="text-[var(--color-text)] font-semibold text-base m-0 capitalize">
                    {cat}
                  </h3>
                  <p className="text-[var(--color-text-muted)] text-sm m-0 mt-0.5">
                    {cat === 'electronics' ? 'Gadgets & devices' :
                     cat === 'jewelery' ? 'Rings & accessories' :
                     cat === "men's clothing" ? 'Apparel for men' :
                     cat === "women's clothing" ? 'Apparel for women' :
                     'Explore collection'}
                  </p>
                  {isActive && (
                    <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[var(--color-accent)] text-[#06202b] flex items-center justify-center text-xs font-bold">
                      <i className="fa-solid fa-check" aria-hidden="true" />
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </section>
      )}

      {/* Toolbar */}
      <section className="max-w-[1400px] w-full mx-auto px-5 pt-8 pb-2 flex flex-col gap-4">
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
          <button
            type="button"
            className="inline-flex items-center gap-2 h-12 px-[18px] bg-white border-[1.5px] border-[var(--color-border)] rounded-full text-[var(--color-text)] font-semibold text-[0.9rem] cursor-pointer font-body transition-[border-color,color] duration-180 hover:border-[var(--color-button)] hover:text-[var(--color-button)]"
            onClick={() => setShowFilters((v) => !v)}
            aria-expanded={showFilters}
            aria-controls="filter-panel"
          >
            <i className={`fa-solid fa-${showFilters ? 'chevron-up' : 'sliders'}`} aria-hidden="true" />
            <span>Filters</span>
          </button>

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
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 bg-white border border-[var(--color-border)] text-[var(--color-text)] pl-3 pr-2 py-[5px] rounded-full text-[0.78rem] font-medium">
                <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
                &ldquo;{searchQuery}&rdquo;
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

      {/* Product Grid */}
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
      <footer className="border-t border-[var(--color-border)] py-5 text-center text-[0.82rem] text-[var(--color-text-muted)] mt-6">
        <p className="m-0">
          <i className="fa-solid fa-circle-info" aria-hidden="true" /> Built with React +
          Vite + Axios. Data from{' '}
          <a href="https://fakestoreapi.com" target="_blank" rel="noreferrer" className="text-[var(--color-button)] no-underline font-semibold hover:underline">
            FakeStore API
          </a>
          .
        </p>
      </footer>

      {/* Modal */}
      <ProductModal product={selectedProduct} onClose={closeProduct} />
    </div>
  )
}
