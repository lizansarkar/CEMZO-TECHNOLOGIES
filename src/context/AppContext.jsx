import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'

const AppContext = createContext(null)

const THEME_STORAGE_KEY = 'shopverse:theme'
const FAV_STORAGE_KEY = 'shopverse:favourites'

export function AppProvider({ children }) {
  // ---- Theme ----
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return localStorage.getItem(THEME_STORAGE_KEY) || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
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

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      favourites,
      toggleFavourite,
      isFavourite,
      favouritesCount: favourites.length,
    }),
    [theme, toggleTheme, favourites, toggleFavourite, isFavourite]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

/**
 * Convenience hook — throws a helpful error if used outside the provider,
 * which is much easier to debug than a silent `undefined`.
 */
export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) {
    throw new Error('useApp must be used inside an <AppProvider>.')
  }
  return ctx
}

export default AppContext
