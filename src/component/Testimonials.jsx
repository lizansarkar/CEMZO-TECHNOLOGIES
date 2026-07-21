import { motion } from 'framer-motion'
import { testimonials } from '../data/products'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Testimonials() {
  return (
    <section className="bg-white border-y border-[var(--color-border)]">
      <div className="max-w-[1400px] mx-auto px-5 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-[var(--color-button)]/6 text-[var(--color-button)] px-4 py-1.5 rounded-full text-[0.82rem] font-semibold mb-4">
            <i className="fa-solid fa-comments" aria-hidden="true" />
            Testimonials
          </span>
          <h2 className="text-[1.8rem] md:text-[2.2rem] font-extrabold font-display text-[var(--color-text)] mt-3 m-0">
            What Our Customers Say
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-lg mx-auto mt-3 m-0">
            Real reviews from real tech enthusiasts.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={item}
              className="group bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--color-button)]/30"
            >
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    className={`fa-star text-[0.85rem] ${star <= t.rating ? 'fa-solid text-[#f5a623]' : 'fa-regular text-[#d8dde0]'}`}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <p className="text-[0.92rem] text-[var(--color-text)] leading-relaxed mb-6 flex-1 m-0 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border)]">
                <div className="w-11 h-11 rounded-full bg-[var(--color-button)] text-white flex items-center justify-center text-[0.85rem] font-bold font-display shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-[0.9rem] font-bold text-[var(--color-text)] m-0">{t.name}</p>
                  <p className="text-[0.78rem] text-[var(--color-text-muted)] m-0">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
