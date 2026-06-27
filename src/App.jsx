/**
 * App.jsx
 * -------
 * Root component.
 *
 * - Wraps everything in <AppProvider> so global state (theme, favourites)
 *   is available everywhere.
 * - Sets up react-router with a single route. The assignment says to use
 *   `react-router` (not `react-router-dom`) — in v7 the unified package
 *   re-exports the DOM bindings, so we import from 'react-router'.
 */

import { Routes, Route } from 'react-router'
import { AppProvider } from './context/AppContext'
import Navbar from './component/Navbar'
import Home from './pages/Home'

export default function App() {
  return (
    <AppProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Fallback to home for any unknown route (single-page app). */}
        <Route path="*" element={<Home />} />
      </Routes>
    </AppProvider>
  )
}
