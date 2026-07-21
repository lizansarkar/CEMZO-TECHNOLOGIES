import { createContext, useEffect, useMemo, useState, useCallback } from 'react'

const AppContext = createContext(null)

const CART_KEY = 'voltmart:cart'
const FAV_KEY = 'voltmart:favourites'
const USER_KEY = 'voltmart:user'

export function AppProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const s = localStorage.getItem(CART_KEY)
      return s ? JSON.parse(s) : []
    } catch { return [] }
  })

  const [favourites, setFavourites] = useState(() => {
    try {
      const s = localStorage.getItem(FAV_KEY)
      return s ? JSON.parse(s) : []
    } catch { return [] }
  })

  const [user, setUser] = useState(() => {
    try {
      const s = localStorage.getItem(USER_KEY)
      return s ? JSON.parse(s) : null
    } catch { return null }
  })

  useEffect(() => { localStorage.setItem(CART_KEY, JSON.stringify(cart)) }, [cart])
  useEffect(() => { localStorage.setItem(FAV_KEY, JSON.stringify(favourites)) }, [favourites])
  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))
    else localStorage.removeItem(USER_KEY)
  }, [user])

  const addToCart = useCallback((product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === product.id)
      if (existing) {
        return prev.map((i) => i.productId === product.id ? { ...i, quantity: i.quantity + quantity } : i)
      }
      return [...prev, { productId: product.id, product, quantity }]
    })
  }, [])

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId))
  }, [])

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((i) => i.productId !== productId))
      return
    }
    setCart((prev) => prev.map((i) => i.productId === productId ? { ...i, quantity } : i))
  }, [])

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.quantity, 0), [cart])
  const cartTotal = useMemo(() => cart.reduce((s, i) => s + i.product.price * i.quantity, 0), [cart])
  const isInCart = useCallback((productId) => cart.some((i) => i.productId === productId), [cart])

  const toggleFavourite = useCallback((product) => {
    setFavourites((prev) => {
      const exists = prev.find((i) => i.productId === product.id)
      if (exists) return prev.filter((i) => i.productId !== product.id)
      return [...prev, { productId: product.id, product }]
    })
  }, [])

  const isFavourite = useCallback((productId) => favourites.some((i) => i.productId === productId), [favourites])
  const removeFromFavourites = useCallback((productId) => {
    setFavourites((prev) => prev.filter((i) => i.productId !== productId))
  }, [])

  const login = useCallback((userData) => setUser(userData), [])
  const logout = useCallback(() => setUser(null), [])

  const value = useMemo(() => ({
    cart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal, isInCart,
    favourites, toggleFavourite, isFavourite, favouritesCount: favourites.length, removeFromFavourites,
    user, login, logout,
  }), [cart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal, isInCart, favourites, toggleFavourite, isFavourite, removeFromFavourites, user, login, logout])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppContext
