import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../hooks/useApp'
import CartDrawer from './CartDrawer'
import FavouritesDrawer from './FavouritesDrawer'
import LoginModal from './LoginModal'

function VoltMartLogo() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#0a2947" />
      <path d="M12 12L20 28L28 12" stroke="#ffd27a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 20H25" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [favOpen, setFavOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const { favouritesCount, cartCount, user } = useApp()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = menuOpen ? 'hidden' : prev
    return () => { document.body.style.overflow = prev }
  }, [menuOpen])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768 && menuOpen) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const navLinks = [
    { label: 'Home', href: '#home', icon: 'fa-house' },
    { label: 'Categories', href: '#categories', icon: 'fa-grid-2' },
    { label: 'Collection', href: '#collection', icon: 'fa-bag-shopping' },
    { label: 'Best Sellers', href: '#bestsellers', icon: 'fa-fire' },
  ]

  return (
    <>
      <header
        className={`sticky top-0 z-[100] transition-all duration-300 ${
          scrolled
            ? 'glass border-b border-[var(--color-border)] shadow-[0_4px_24px_rgba(6,32,43,0.08)]'
            : 'bg-white/85 border-b border-[var(--color-border)]/50'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 h-16 flex items-center justify-between gap-4">
          <a href="#home" className="inline-flex items-center gap-2.5 no-underline" aria-label="VoltMart home">
            <VoltMartLogo />
          </a>

          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="no-underline text-[0.88rem] font-medium px-3.5 py-2 rounded-full text-[var(--color-text-muted)] transition-[background,color] duration-200 hover:bg-[var(--color-button)]/8 hover:text-[var(--color-button)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              className="relative w-10 h-10 border-none bg-transparent text-[var(--color-text-muted)] cursor-pointer rounded-xl text-base inline-flex items-center justify-center transition-[background,color] duration-180 hover:bg-[var(--color-button)]/8 hover:text-[var(--color-button)]"
              onClick={() => setFavOpen(true)}
              aria-label={`Favourites (${favouritesCount})`}
              title="Favourites"
            >
              <i className="fa-solid fa-heart" aria-hidden="true" />
              {favouritesCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-[5px] rounded-full bg-[var(--color-danger)] text-white text-[0.65rem] font-bold inline-flex items-center justify-center leading-none">{favouritesCount}</span>
              )}
            </button>

            <button
              type="button"
              className="relative w-10 h-10 border-none bg-transparent text-[var(--color-text-muted)] cursor-pointer rounded-xl text-base inline-flex items-center justify-center transition-[background,color] duration-180 hover:bg-[var(--color-button)]/8 hover:text-[var(--color-button)]"
              onClick={() => setCartOpen(true)}
              aria-label={`Shopping cart (${cartCount} items)`}
              title="Shopping cart"
            >
              <i className={`fa-solid fa-cart-shopping ${cartCount > 0 ? 'text-[var(--color-button)]' : ''}`} aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-[5px] rounded-full bg-[var(--color-accent)] text-[var(--color-button)] text-[0.65rem] font-bold inline-flex items-center justify-center leading-none shadow-sm">{cartCount}</span>
              )}
            </button>

            <button
              type="button"
              className="relative w-10 h-10 border-none bg-transparent text-[var(--color-text-muted)] cursor-pointer rounded-xl text-base inline-flex items-center justify-center transition-[background,color] duration-180 hover:bg-[var(--color-button)]/8 hover:text-[var(--color-button)]"
              onClick={() => setLoginOpen(true)}
              aria-label={user ? `Signed in as ${user.name}` : 'Sign in'}
              title={user ? user.name : 'Sign in'}
            >
              {user ? (
                <span className="w-7 h-7 rounded-full bg-[var(--color-button)] text-white text-[0.75rem] font-bold flex items-center justify-center shadow-sm">{user.name.charAt(0).toUpperCase()}</span>
              ) : (
                <i className="fa-solid fa-user" aria-hidden="true" />
              )}
            </button>

            <div className="w-px h-6 bg-[var(--color-border)] mx-1 hidden sm:block" />

            <button
              type="button"
              className="md:hidden inline-flex flex-col justify-center gap-[5px] w-10 h-10 px-[9px] border-none bg-transparent cursor-pointer rounded-xl"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className={`block h-[2px] w-full bg-[var(--color-text)] rounded-[2px] transition-all duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`block h-[2px] w-full bg-[var(--color-text)] rounded-[2px] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-[2px] w-full bg-[var(--color-text)] rounded-[2px] transition-all duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-[64px_0_0_0] bg-[rgba(6,32,43,0.4)] z-[105] backdrop-blur-[2px]"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-16 right-0 w-[min(300px,85vw)] h-[calc(100vh-64px)] bg-white shadow-[-8px_0_24px_rgba(6,32,43,0.18)] z-[110] p-5 overflow-y-auto"
              aria-hidden={!menuOpen}
            >
              <nav className="flex flex-col gap-1" aria-label="Mobile">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl no-underline text-[0.95rem] font-medium text-[var(--color-text)] transition-[background,color] duration-150 hover:bg-[var(--color-bg)] hover:text-[var(--color-button)]"
                    onClick={() => setMenuOpen(false)}
                  >
                    <i className={`fa-solid ${link.icon} w-5 text-center text-[var(--color-text-muted)]`} aria-hidden="true" />
                    {link.label}
                  </a>
                ))}

                <div className="border-t border-[var(--color-border)] my-2 pt-2" />

                <button
                  type="button"
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl w-full text-left text-[0.95rem] font-medium text-[var(--color-text)] bg-transparent border-none cursor-pointer transition-[background,color] duration-150 hover:bg-[var(--color-bg)] hover:text-[var(--color-button)]"
                  onClick={() => { setMenuOpen(false); setFavOpen(true) }}
                >
                  <i className="fa-solid fa-heart w-5 text-center text-[var(--color-text-muted)]" aria-hidden="true" /> Favourites
                  {favouritesCount > 0 && (
                    <span className="ml-auto min-w-[18px] h-[18px] px-[5px] rounded-full bg-[var(--color-danger)] text-white text-[0.65rem] font-bold inline-flex items-center justify-center leading-none">{favouritesCount}</span>
                  )}
                </button>

                <button
                  type="button"
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl w-full text-left text-[0.95rem] font-medium text-[var(--color-text)] bg-transparent border-none cursor-pointer transition-[background,color] duration-150 hover:bg-[var(--color-bg)] hover:text-[var(--color-button)]"
                  onClick={() => { setMenuOpen(false); setCartOpen(true) }}
                >
                  <i className="fa-solid fa-cart-shopping w-5 text-center text-[var(--color-text-muted)]" aria-hidden="true" /> Cart
                  {cartCount > 0 && (
                    <span className="ml-auto min-w-[18px] h-[18px] px-[5px] rounded-full bg-[var(--color-accent)] text-[var(--color-button)] text-[0.65rem] font-bold inline-flex items-center justify-center leading-none">{cartCount}</span>
                  )}
                </button>

                <button
                  type="button"
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl w-full text-left text-[0.95rem] font-medium text-[var(--color-text)] bg-transparent border-none cursor-pointer transition-[background,color] duration-150 hover:bg-[var(--color-bg)] hover:text-[var(--color-button)]"
                  onClick={() => { setMenuOpen(false); setLoginOpen(true) }}
                >
                  <i className="fa-solid fa-user w-5 text-center text-[var(--color-text-muted)]" aria-hidden="true" />
                  {user ? `Hi, ${user.name}` : 'Sign in'}
                </button>

                <div className="border-t border-[var(--color-border)] my-2 pt-2" />

                <a
                  href="#collection"
                  className="flex items-center justify-center gap-2 h-12 px-5 border-none rounded-full bg-[var(--color-button)] text-white text-[0.95rem] font-semibold no-underline transition-[background,transform] duration-200 hover:bg-[var(--color-button-hover)] active:scale-[0.97]"
                  onClick={() => setMenuOpen(false)}
                >
                  <i className="fa-solid fa-bolt" aria-hidden="true" />
                  Shop Now
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <FavouritesDrawer open={favOpen} onClose={() => setFavOpen(false)} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  )
}
