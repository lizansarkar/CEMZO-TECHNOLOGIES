import { useMemo, useState, useCallback } from 'react'
import { useApp } from './useApp'

export function useProducts({ pageSize = 8 } = {}) {
  const {
    products,
    categories,
    productsLoading: isLoading,
    productsError: error,
    isUsingFallback,
    reloadProducts,
  } = useApp()

  // ----- UI state -----
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState(null)

  /**
   * Derived list: filter by category, then filter by search term (case-
   * insensitive, matches any word inside the title). `useMemo` prevents
   * recomputation on every render unless inputs change.
   */
  const filteredProducts = useMemo(() => {
    if (!products.length) return []

    const q = searchQuery.trim().toLowerCase()

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'all' || product.category === activeCategory

      const matchesSearch =
        q === '' || product.title.toLowerCase().includes(q)

      return matchesCategory && matchesSearch
    })
  }, [products, searchQuery, activeCategory])

  // ----- Pagination slice -----
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize))

  const effectivePage = currentPage > totalPages ? totalPages : currentPage

  const paginatedProducts = useMemo(() => {
    const start = (effectivePage - 1) * pageSize
    return filteredProducts.slice(start, start + pageSize)
  }, [filteredProducts, effectivePage, pageSize])

  // ----- Actions exposed to the UI -----
  const handleSearch = useCallback((query) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }, [])

  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category)
    setCurrentPage(1)
  }, [])

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const openProduct = useCallback((product) => {
    setSelectedProduct(product)
  }, [])

  const closeProduct = useCallback(() => {
    setSelectedProduct(null)
  }, [])

  return {
    // data
    products,
    categories,
    filteredProducts,
    paginatedProducts,
    // status
    isLoading,
    error,
    isUsingFallback,
    // ui state
    searchQuery,
    activeCategory,
    currentPage: effectivePage,
    totalPages,
    selectedProduct,
    // actions
    handleSearch,
    handleCategoryChange,
    handlePageChange,
    openProduct,
    closeProduct,
    retry: reloadProducts,
  }
}

export default useProducts
