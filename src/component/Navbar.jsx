import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { useApp } from '../context/AppContext'
import MobileDrawer from './MobileDrawer'
import CartDrawer from './CartDrawer'
import LoginModal from './LoginModal'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const { favouritesCount, cartCount, user } = useApp()
  const location = useLocation()

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
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

  return (
    <header className="sticky top-0 z-[100] bg-[var(--color-button)] text-white shadow-[0_2px_12px_rgba(6,32,43,0.1)]">
      <div className="max-w-[1400px] mx-auto px-5 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="inline-flex items-center gap-2.5 no-underline text-white font-extrabold text-xl font-display" aria-label="ShopVerse home">
          <img src="/Logo.png" alt="" className="h-12" />
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          <NavLink to="/" end className={({ isActive }) => `no-underline text-[0.92rem] font-medium px-3.5 py-2 rounded-full transition-[background,color] duration-180 hover:bg-white/18 hover:text-white ${isActive ? 'bg-white/18 text-white' : 'text-white/85'}`}>Home</NavLink>
          <NavLink to="/catalogue" className={({ isActive }) => `no-underline text-[0.92rem] font-medium px-3.5 py-2 rounded-full transition-[background,color] duration-180 hover:bg-white/18 hover:text-white ${isActive ? 'bg-white/18 text-white' : 'text-white/85'}`}>Catalogue</NavLink>
          <NavLink to="/about" className={({ isActive }) => `no-underline text-[0.92rem] font-medium px-3.5 py-2 rounded-full transition-[background,color] duration-180 hover:bg-white/18 hover:text-white ${isActive ? 'bg-white/18 text-white' : 'text-white/85'}`}>About</NavLink>
        </nav>

        <div className="flex items-center gap-1.5">
          <button type="button" className="relative w-10 h-10 border-none bg-transparent text-white cursor-pointer rounded-xl text-base inline-flex items-center justify-center transition-[background] duration-180 hover:bg-white/12" aria-label={`Favourites (${favouritesCount})`} title="Favourites">
            <i className="fa-solid fa-heart" aria-hidden="true" />
            {favouritesCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-[5px] rounded-full bg-[var(--color-danger)] text-white text-[0.65rem] font-bold inline-flex items-center justify-center leading-none">{favouritesCount}</span>
            )}
          </button>

          <button type="button" className="relative w-10 h-10 border-none bg-transparent text-white cursor-pointer rounded-xl text-base inline-flex items-center justify-center transition-[background] duration-180 hover:bg-white/12" onClick={() => setCartOpen(true)} aria-label={`Shopping cart (${cartCount} items)`} title="Shopping cart">
            <i className={`fa-solid fa-cart-shopping ${cartCount > 0 ? 'text-[var(--color-accent)]' : ''}`} aria-hidden="true" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-[5px] rounded-full bg-white text-[var(--color-button)] text-[0.65rem] font-bold inline-flex items-center justify-center leading-none shadow-sm">{cartCount}</span>
            )}
          </button>

          <button type="button" className="relative w-10 h-10 border-none bg-transparent text-white cursor-pointer rounded-xl text-base inline-flex items-center justify-center transition-[background] duration-180 hover:bg-white/12" onClick={() => setLoginOpen(true)} aria-label={user ? `Signed in as ${user.name}` : 'Sign in'} title={user ? user.name : 'Sign in'}>
            {user ? (
              <span className="w-7 h-7 rounded-full bg-white text-[var(--color-button)] text-[0.75rem] font-bold flex items-center justify-center shadow-sm">{user.name.charAt(0).toUpperCase()}</span>
            ) : (
              <i className="fa-solid fa-user" aria-hidden="true" />
            )}
          </button>

          <button type="button" className={`md:hidden inline-flex flex-col justify-center gap-[5px] w-10 h-10 px-[9px] border-none bg-transparent cursor-pointer rounded-xl`} onClick={() => setMenuOpen((v) => !v)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-menu">
            <span className={`block h-[2px] w-full bg-white rounded-[2px] transition-all duration-250 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`block h-[2px] w-full bg-white rounded-[2px] transition-all duration-250 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-[2px] w-full bg-white rounded-[2px] transition-all duration-250 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      <MobileDrawer menuOpen={menuOpen} onClose={() => setMenuOpen(false)} cartCount={cartCount} user={user} onOpenCart={() => { setMenuOpen(false); setCartOpen(true) }} onOpenLogin={() => { setMenuOpen(false); setLoginOpen(true) }} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  )
}
