import { useApp } from '../hooks/useApp'
import { NavLink } from 'react-router'

export default function MobileDrawer({ menuOpen, onClose, cartCount, user, onOpenCart, onOpenLogin, onOpenFavourites }) {
  const { favouritesCount, theme, toggleTheme } = useApp()
  return (
    <>
      <div
        id="mobile-menu"
        className={`fixed top-16 right-0 w-[min(280px,80vw)] h-[calc(100vh-64px)] bg-white shadow-[-8px_0_24px_rgba(6,32,43,0.18)] transition-transform duration-300 z-[110] p-4 overflow-y-auto ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col gap-1" aria-label="Mobile">
          <NavLink to="/" end className={({ isActive }) => `flex items-center gap-3 px-4 py-3.5 rounded-xl no-underline text-[0.95rem] font-medium transition-[background,color] duration-150 hover:bg-[var(--color-bg)] hover:text-[var(--color-button)] ${isActive ? 'bg-[var(--color-bg)] text-[var(--color-button)]' : 'text-[var(--color-text)]'}`} onClick={onClose}>
            <i className="fa-solid fa-house w-5 text-center text-[var(--color-text-muted)]" aria-hidden="true" /> Home
          </NavLink>
          <NavLink to="/catalogue" className={({ isActive }) => `flex items-center gap-3 px-4 py-3.5 rounded-xl no-underline text-[0.95rem] font-medium transition-[background,color] duration-150 hover:bg-[var(--color-bg)] hover:text-[var(--color-button)] ${isActive ? 'bg-[var(--color-bg)] text-[var(--color-button)]' : 'text-[var(--color-text)]'}`} onClick={onClose}>
            <i className="fa-solid fa-layer-group w-5 text-center text-[var(--color-text-muted)]" aria-hidden="true" /> Catalogue
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `flex items-center gap-3 px-4 py-3.5 rounded-xl no-underline text-[0.95rem] font-medium transition-[background,color] duration-150 hover:bg-[var(--color-bg)] hover:text-[var(--color-button)] ${isActive ? 'bg-[var(--color-bg)] text-[var(--color-button)]' : 'text-[var(--color-text)]'}`} onClick={onClose}>
            <i className="fa-solid fa-circle-info w-5 text-center text-[var(--color-text-muted)]" aria-hidden="true" /> About
          </NavLink>

          <div className="border-t border-[var(--color-border)] my-2 pt-2" />

          <button type="button" className="flex items-center gap-3 px-4 py-3.5 rounded-xl no-underline w-full text-left text-[0.95rem] font-medium transition-[background,color] duration-150 hover:bg-[var(--color-bg)] hover:text-[var(--color-button)] text-[var(--color-text)] bg-transparent border-none cursor-pointer" onClick={() => { onClose(); onOpenFavourites(); }}>
            <i className="fa-solid fa-heart w-5 text-center text-[var(--color-text-muted)]" aria-hidden="true" /> Favourites
            {favouritesCount > 0 && (
              <span className="ml-auto min-w-[18px] h-[18px] px-[5px] rounded-full bg-[var(--color-danger)] text-white text-[0.65rem] font-bold inline-flex items-center justify-center leading-none">{favouritesCount}</span>
            )}
          </button>

          <button type="button" className="flex items-center gap-3 px-4 py-3.5 rounded-xl no-underline w-full text-left text-[0.95rem] font-medium transition-[background,color] duration-150 hover:bg-[var(--color-bg)] hover:text-[var(--color-button)] text-[var(--color-text)] bg-transparent border-none cursor-pointer" onClick={onOpenCart}>
            <i className="fa-solid fa-cart-shopping w-5 text-center text-[var(--color-text-muted)]" aria-hidden="true" /> Cart
            {cartCount > 0 && (
              <span className="ml-auto min-w-[18px] h-[18px] px-[5px] rounded-full bg-[var(--color-accent)] text-[var(--color-button)] text-[0.65rem] font-bold inline-flex items-center justify-center leading-none">{cartCount}</span>
            )}
          </button>

          <button type="button" className="flex items-center gap-3 px-4 py-3.5 rounded-xl no-underline w-full text-left text-[0.95rem] font-medium transition-[background,color] duration-150 hover:bg-[var(--color-bg)] hover:text-[var(--color-button)] text-[var(--color-text)] bg-transparent border-none cursor-pointer" onClick={onOpenLogin}>
            <i className="fa-solid fa-user w-5 text-center text-[var(--color-text-muted)]" aria-hidden="true" />
            {user ? `Hi, ${user.name}` : 'Sign in'}
          </button>

          <div className="border-t border-[var(--color-border)] my-2 pt-2" />

          <button type="button" className="flex items-center gap-3 px-4 py-3.5 rounded-xl no-underline w-full text-left text-[0.95rem] font-medium transition-[background,color] duration-150 hover:bg-[var(--color-bg)] hover:text-[var(--color-button)] text-[var(--color-text)] bg-transparent border-none cursor-pointer" onClick={toggleTheme}>
            <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} w-5 text-center text-[var(--color-text-muted)]`} aria-hidden="true" />
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
        </nav>
      </div>

      {menuOpen && (
        <div className="fixed inset-[64px_0_0_0] bg-[rgba(6,32,43,0.4)] z-[105] backdrop-blur-[2px] animate-overlay-fade" onClick={onClose} aria-hidden="true" />
      )}
    </>
  )
}
