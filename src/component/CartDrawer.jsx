import { useEffect, useRef } from 'react'
import { useApp } from '../hooks/useApp'

export default function CartDrawer({ open, onClose }) {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useApp()
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = open ? 'hidden' : prevOverflow
    return () => { document.body.style.overflow = prevOverflow }
  }, [open])

  return (
    <>
      <div
        id="cart-drawer"
        className={`fixed top-0 right-0 w-[min(420px,100vw)] h-full bg-white shadow-[-8px_0_24px_rgba(6,32,43,0.18)] transition-transform duration-300 z-[200] flex flex-col ${open ? 'translate-x-0' : 'translate-x-full'}`}
        ref={panelRef}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-[var(--color-border)] shrink-0">
          <h2 className="text-lg font-bold text-[var(--color-text)] font-display m-0 flex items-center gap-2">
            <i className="fa-solid fa-cart-shopping text-[var(--color-button)]" aria-hidden="true" />
            Shopping Cart
            {cart.length > 0 && (
              <span className="text-[0.8rem] font-normal text-[var(--color-text-muted)]">({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>
            )}
          </h2>
          <button type="button" className="w-10 h-10 rounded-full border-none bg-[var(--color-border)] text-[var(--color-text)] cursor-pointer inline-flex items-center justify-center text-base transition-[background,color] duration-180 hover:bg-[var(--color-button)] hover:text-white" onClick={onClose} aria-label="Close cart">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-[var(--color-text-muted)] gap-3">
              <i className="fa-solid fa-cart-plus text-5xl" aria-hidden="true" />
              <p className="text-[1rem] font-medium m-0">Your cart is empty</p>
              <button type="button" className="text-[0.9rem] text-[var(--color-button)] underline cursor-pointer bg-transparent border-none font-medium" onClick={onClose}>Continue shopping</button>
            </div>
          ) : (
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              {cart.map((item) => (
                <li key={item.productId} className="flex gap-3 p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]">
                  <div className="w-20 h-20 rounded-lg bg-white flex items-center justify-center p-2 shrink-0 border border-[var(--color-border)]">
                    <img src={item.product.image} alt={item.product.title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between gap-1.5">
                    <h3 className="m-0 text-[0.85rem] font-semibold text-[var(--color-text)] line-clamp-2 leading-tight">{item.product.title}</h3>
                    <span className="text-[1rem] font-bold text-[var(--color-button)]">${(item.product.price * item.quantity).toFixed(2)}</span>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <button type="button" className="w-7 h-7 rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text)] cursor-pointer inline-flex items-center justify-center text-[0.75rem] font-bold transition-[background,color] duration-150 hover:bg-[var(--color-button)] hover:text-white" onClick={() => updateQuantity(item.productId, item.quantity - 1)} aria-label="Decrease quantity">−</button>
                        <span className="w-8 text-center text-[0.85rem] font-semibold text-[var(--color-text)]">{item.quantity}</span>
                        <button type="button" className="w-7 h-7 rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text)] cursor-pointer inline-flex items-center justify-center text-[0.75rem] font-bold transition-[background,color] duration-150 hover:bg-[var(--color-button)] hover:text-white" onClick={() => updateQuantity(item.productId, item.quantity + 1)} aria-label="Increase quantity">+</button>
                      </div>
                      <button type="button" className="w-7 h-7 rounded-full border-none bg-transparent text-[var(--color-text-muted)] cursor-pointer inline-flex items-center justify-center text-[0.85rem] transition-[color] duration-150 hover:text-[var(--color-danger)]" onClick={() => removeFromCart(item.productId)} aria-label="Remove item">
                        <i className="fa-solid fa-trash-can" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="px-5 py-4 border-t border-[var(--color-border)] shrink-0 bg-white">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[0.95rem] font-medium text-[var(--color-text)]">Total</span>
              <span className="text-[1.3rem] font-extrabold text-[var(--color-button)] font-display">${cartTotal.toFixed(2)}</span>
            </div>
            <button type="button" className="w-full py-[13px] rounded-full border-none bg-[var(--color-button)] text-white text-[0.95rem] font-semibold cursor-pointer transition-[background,transform] duration-180 active:scale-97 hover:bg-[#0d3358]">
              <i className="fa-solid fa-lock mr-2" aria-hidden="true" /> Checkout
            </button>
          </div>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 bg-[rgba(6,32,43,0.4)] z-[199] backdrop-blur-[2px] animate-overlay-fade" onClick={onClose} aria-hidden="true" />
      )}
    </>
  )
}
