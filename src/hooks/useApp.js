import { useContext } from 'react'
import AppContext from '../context/AppContext'

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

export default useApp
