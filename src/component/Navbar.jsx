
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { useApp } from '../context/AppContext'
import './Navbar.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme, favouritesCount } = useApp()
  const location = useLocation()

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Auto-close the mobile drawer if the user resizes back to desktop.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768 && menuOpen) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [menuOpen])

  // ESC closes the drawer.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header className="navbar">
      <div className="navbar__inner">
        {/* Brand */}
        <Link to="/" className="navbar__brand" aria-label="ShopVerse home">
          <span className="navbar__logo">
            <i className="fa-solid fa-bag-shopping" aria-hidden="true" />
          </span>
          <span className="navbar__name">ShopVerse</span>
        </Link>

        {/* Desktop links */}
        <nav className="navbar__links" aria-label="Primary">
          <Link to="/" className="navbar__link">Home</Link>
          <Link to="/" className="navbar__link">Catalogue</Link>
          <Link to="/" className="navbar__link">About</Link>
        </nav>

        {/* Right actions */}
        <div className="navbar__actions">
          <button
            type="button"
            className="navbar__icon-btn"
            aria-label={`Favourites (${favouritesCount})`}
            title="Favourites"
          >
            <i className="fa-solid fa-heart" aria-hidden="true" />
            {favouritesCount > 0 && (
              <span className="navbar__badge">{favouritesCount}</span>
            )}
          </button>

          <button
            type="button"
            className="navbar__icon-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title="Toggle theme"
          >
            <i className={`fa-solid ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`} aria-hidden="true" />
          </button>

          {/* Hamburger (mobile only) */}
          <button
            type="button"
            className={`navbar__hamburger ${menuOpen ? 'is-open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`navbar__drawer ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className="navbar__drawer-nav" aria-label="Mobile">
          <Link to="/" className="navbar__drawer-link">
            <i className="fa-solid fa-house" aria-hidden="true" /> Home
          </Link>
          <Link to="/" className="navbar__drawer-link">
            <i className="fa-solid fa-layer-group" aria-hidden="true" /> Catalogue
          </Link>
          <Link to="/" className="navbar__drawer-link">
            <i className="fa-solid fa-circle-info" aria-hidden="true" /> About
          </Link>
          <Link to="/" className="navbar__drawer-link">
            <i className="fa-solid fa-heart" aria-hidden="true" /> Favourites
            {favouritesCount > 0 && (
              <span className="navbar__badge">{favouritesCount}</span>
            )}
          </Link>
        </nav>
      </div>

      {/* Overlay behind drawer */}
      {menuOpen && (
        <div
          className="navbar__overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  )
}
