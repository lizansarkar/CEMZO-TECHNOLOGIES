import { createContext, useEffect, useMemo, useState, useCallback } from 'react'

const AppContext = createContext(null)

const FAV_STORAGE_KEY = 'shopverse:favourites'
const CART_STORAGE_KEY = 'shopverse:cart'
const USER_STORAGE_KEY = 'shopverse:user'

export function AppProvider({ children }) {
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

  const toggleFavourite = useCallback((productId) => {
    setFavourites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }, [])

  const isFavourite = useCallback(
    (productId) => favourites.includes(productId),
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

  const value = useMemo(
    () => ({
      favourites,
      toggleFavourite,
      isFavourite,
      favouritesCount: favourites.length,
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
    }),
    [favourites, toggleFavourite, isFavourite, cart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal, isInCart, user, login, logout]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppContext
