import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="bg-[var(--color-bg)]">
      <div className="max-w-[1400px] mx-auto px-5 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-[var(--color-button)] via-[#0d3358] to-[#06202b] rounded-3xl px-6 py-14 md:px-16 md:py-16 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/4" />

          <div className="relative z-[1]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-[0.82rem] font-medium text-white/90 mb-6">
                <i className="fa-solid fa-envelope text-[var(--color-accent)]" aria-hidden="true" />
                Stay Updated
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[1.8rem] md:text-[2.4rem] font-extrabold font-display text-white leading-tight m-0 mb-4"
            >
              Get the Latest Tech Deals
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-white/60 max-w-lg mx-auto mb-8 text-[1rem] m-0"
            >
              Subscribe for exclusive discounts, new arrivals, and tech news delivered to your inbox.
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-[480px] mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 h-13 px-5 rounded-full border-[1.5px] border-white/20 bg-white/10 text-white text-[0.95rem] font-body placeholder:text-white/40 outline-none transition-[border-color,background] duration-200 focus:border-[var(--color-accent)] focus:bg-white/15"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="h-13 px-7 rounded-full border-none bg-[var(--color-accent)] text-[var(--color-button)] text-[0.92rem] font-bold font-body cursor-pointer transition-[background,transform,box-shadow] duration-200 hover:bg-[var(--color-accent-hover)] hover:shadow-[0_8px_25px_rgba(255,210,122,0.3)] active:scale-[0.97] shrink-0"
              >
                {submitted ? (
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-check" aria-hidden="true" /> Subscribed!
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Subscribe <i className="fa-solid fa-arrow-right text-[0.8rem]" aria-hidden="true" />
                  </span>
                )}
              </button>
            </motion.form>

            <p className="text-white/30 text-[0.75rem] mt-4 m-0">
              No spam, unsubscribe at any time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
