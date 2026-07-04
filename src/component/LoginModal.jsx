import { useEffect, useRef, useState } from 'react'
import { useApp } from '../context/AppContext'

export default function LoginModal({ open, onClose }) {
  const { user, login, logout } = useApp()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const overlayRef = useRef(null)
  const emailRef = useRef(null)

  useEffect(() => {
    if (!open) return
    emailRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const handleLogin = (e) => {
    e.preventDefault()
    if (!email.trim() || !name.trim()) return
    login({ name: name.trim(), email: email.trim() })
    setEmail('')
    setName('')
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-[rgba(6,32,43,0.55)] backdrop-blur-[4px] flex items-center justify-center p-4 z-[300] animate-overlay-fade"
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      <div className="relative bg-white rounded-[20px] max-w-[400px] w-full shadow-[0_24px_60px_rgba(6,32,43,0.35)] animate-panel-pop p-8" role="dialog" aria-modal="true" aria-labelledby="login-title">
        <button type="button" className="absolute top-3.5 right-3.5 w-10 h-10 rounded-full border-none bg-[var(--color-border)] text-[var(--color-text)] cursor-pointer inline-flex items-center justify-center text-base z-[2] transition-[background,color,transform] duration-180 hover:bg-[var(--color-button)] hover:text-white hover:rotate-90" onClick={onClose} aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {user ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-[var(--color-button)] text-white flex items-center justify-center text-2xl font-bold font-display">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2 id="login-title" className="text-xl font-bold text-[var(--color-text)] font-display m-0">Welcome, {user.name}</h2>
            <p className="text-[0.9rem] text-[var(--color-text-muted)] m-0">{user.email}</p>
            <button type="button" className="mt-2 w-full py-[13px] rounded-full border-[1.5px] border-[var(--color-danger)] bg-transparent text-[var(--color-danger)] text-[0.95rem] font-semibold cursor-pointer transition-[background,color] duration-180 hover:bg-[var(--color-danger)] hover:text-white" onClick={() => { logout(); onClose() }}>
              <i className="fa-solid fa-right-from-bracket mr-2" aria-hidden="true" /> Sign out
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center gap-2 mb-6">
              <div className="w-14 h-14 rounded-full bg-[var(--color-button)] text-white flex items-center justify-center text-xl">
                <i className="fa-solid fa-user" aria-hidden="true" />
              </div>
              <h2 id="login-title" className="text-xl font-bold text-[var(--color-text)] font-display m-0">Sign in</h2>
              <p className="text-[0.85rem] text-[var(--color-text-muted)] m-0">Enter your details to continue</p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label htmlFor="login-name" className="block text-[0.85rem] font-medium text-[var(--color-text)] mb-1.5">Name</label>
                <input id="login-name" ref={emailRef} type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-[11px] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[0.95rem] text-[var(--color-text)] outline-none transition-[border-color] duration-180 focus:border-[var(--color-button)]" placeholder="Your name" required />
              </div>
              <div>
                <label htmlFor="login-email" className="block text-[0.85rem] font-medium text-[var(--color-text)] mb-1.5">Email</label>
                <input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-[11px] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[0.95rem] text-[var(--color-text)] outline-none transition-[border-color] duration-180 focus:border-[var(--color-button)]" placeholder="you@example.com" required />
              </div>
              <button type="submit" className="w-full py-[13px] rounded-full border-none bg-[var(--color-button)] text-white text-[0.95rem] font-semibold cursor-pointer transition-[background,transform] duration-180 active:scale-97 hover:bg-[#0d3358]">
                <i className="fa-solid fa-right-to-bracket mr-2" aria-hidden="true" /> Sign in
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
