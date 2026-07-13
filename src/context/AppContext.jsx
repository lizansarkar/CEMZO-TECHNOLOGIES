import { createContext, useEffect, useMemo, useState, useCallback } from 'react'
import { fetchAllProducts, fetchCategories } from '../services/productService'

const AppContext = createContext(null)

const FAV_STORAGE_KEY = 'shopverse:favourites'
const CART_STORAGE_KEY = 'shopverse:cart'
const USER_STORAGE_KEY = 'shopverse:user'
const THEME_STORAGE_KEY = 'shopverse:theme'

export function AppProvider({ children }) {
  // ---- Theme ----
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY)
      if (stored === 'dark' || stored === 'light') return stored
    } catch { /* ignore */ }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  // ---- Favourites ----
  const [favourites, setFavourites] = useState(() => {
    if (typeof window === 'undefined') return []
    try {
      const stored = localStorage.getItem(FAV_STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(favourites))
  }, [favourites])

  const toggleFavourite = useCallback((product) => {
    setFavourites((prev) => {
      const exists = prev.find((item) => item.productId === product.id)
      if (exists) {
        return prev.filter((item) => item.productId !== product.id)
      }
      return [...prev, { productId: product.id, product }]
    })
  }, [])

  const isFavourite = useCallback(
    (productId) => favourites.some((item) => item.productId === productId),
    [favourites]
  )

  // ---- Cart ----
  const [cart, setCart] = useState(() => {
    if (typeof window === 'undefined') return []
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  const addToCart = useCallback((product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id)
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { productId: product.id, product, quantity }]
    })
  }, [])

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId))
  }, [])

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      return setCart((prev) => prev.filter((item) => item.productId !== productId))
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    )
  }, [])

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  )

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart]
  )

  const isInCart = useCallback(
    (productId) => cart.some((item) => item.productId === productId),
    [cart]
  )

  // ---- User / Login ----
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') return null
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(USER_STORAGE_KEY)
    }
  }, [user])

  const login = useCallback((userData) => {
    setUser(userData)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  // ---- Products (shared across pages) ----
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [productsLoading, setProductsLoading] = useState(true)
  const [productsError, setProductsError] = useState(null)
  const [isUsingFallback, setIsUsingFallback] = useState(false)

  const loadProducts = useCallback(async () => {
    setProductsLoading(true)
    setProductsError(null)
    try {
      const [productData, categoryData] = await Promise.all([
        fetchAllProducts(),
        fetchCategories(),
      ])
      setProducts(productData)
      setCategories(categoryData)
      const count = Array.isArray(productData) ? productData.length : 0
      setIsUsingFallback(count > 0 && count <= 25)
    } catch (err) {
      setProductsError(err.message || 'Something went wrong.')
      setProducts([])
      setCategories([])
      setIsUsingFallback(false)
    } finally {
      setProductsLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProducts()
  }, [loadProducts])

  const removeFromFavourites = useCallback((productId) => {
    setFavourites((prev) => prev.filter((item) => item.productId !== productId))
  }, [])

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      favourites,
      toggleFavourite,
      isFavourite,
      favouritesCount: favourites.length,
      removeFromFavourites,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartCount,
      cartTotal,
      isInCart,
      user,
      login,
      logout,
      products,
      categories,
      productsLoading,
      productsError,
      isUsingFallback,
      reloadProducts: loadProducts,
    }),
    [theme, toggleTheme, favourites, toggleFavourite, isFavourite, removeFromFavourites, cart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal, isInCart, user, login, logout, products, categories, productsLoading, productsError, isUsingFallback, loadProducts]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppContext
