import { useEffect, useMemo, useState, useCallback } from 'react'
import {
  fetchAllProducts,
  fetchCategories,
} from '../services/productService'

export function useProducts({ pageSize = 8 } = {}) {
  // ----- Server state -----
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isUsingFallback, setIsUsingFallback] = useState(false)

  // ----- UI state -----
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState(null)

  /**
   * Initial load: products + categories in parallel so the UI can render
   * the filter bar as soon as both resolve.
   */
  const loadInitialData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [productData, categoryData] = await Promise.all([
        fetchAllProducts(),
        fetchCategories(),
      ])
      setProducts(productData)
      setCategories(categoryData)
      // If the live API failed and the service fell back to mock data,
      // surface a subtle notice to the user.
      const productCount = Array.isArray(productData) ? productData.length : 0
      setIsUsingFallback(productCount > 0 && productCount <= 25)
    } catch (err) {
      setError(err.message || 'Something went wrong.')
      setProducts([])
      setCategories([])
      setIsUsingFallback(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadInitialData()
  }, [loadInitialData])

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

  // Keep currentPage inside valid range when filters shrink the list.
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1)
  }, [currentPage, totalPages])

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredProducts.slice(start, start + pageSize)
  }, [filteredProducts, currentPage, pageSize])

  // ----- Actions exposed to the UI -----
  const handleSearch = useCallback((query) => {
    setSearchQuery(query)
    setCurrentPage(1) // reset to first page on every new search
  }, [])

  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category)
    setCurrentPage(1)
  }, [])

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page)
    // Scroll the grid back into view for better UX on mobile.
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const openProduct = useCallback((product) => {
    setSelectedProduct(product)
  }, [])

  const closeProduct = useCallback(() => {
    setSelectedProduct(null)
  }, [])

  const retry = useCallback(() => {
    loadInitialData()
  }, [loadInitialData])

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
    currentPage,
    totalPages,
    selectedProduct,
    // actions
    handleSearch,
    handleCategoryChange,
    handlePageChange,
    openProduct,
    closeProduct,
    retry,
  }
}

export default useProducts
