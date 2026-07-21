import { motion } from 'framer-motion'
import { categories } from '../data/products'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function FeaturedCategories() {
  return (
    <section id="categories" className="bg-white border-y border-[var(--color-border)]">
      <div className="max-w-[1400px] mx-auto px-5 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-[var(--color-button)]/6 text-[var(--color-button)] px-4 py-1.5 rounded-full text-[0.82rem] font-semibold mb-4">
            <i className="fa-solid fa-grid-2" aria-hidden="true" />
            Categories
          </span>
          <h2 className="text-[1.8rem] md:text-[2.2rem] font-extrabold font-display text-[var(--color-text)] mt-3 m-0">
            Shop by Category
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-lg mx-auto mt-3 m-0">
            Find exactly what you need from our carefully curated tech collections.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {categories.map((cat) => (
            <motion.a
              key={cat.id}
              href="#collection"
              variants={item}
              className="group relative bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl p-6 text-center no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--color-button)]"
            >
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${cat.color}10` }}
              >
                <i
                  className={`fa-solid ${cat.icon} text-xl`}
                  style={{ color: cat.color }}
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-[0.92rem] font-bold text-[var(--color-text)] m-0 mb-1">
                {cat.name}
              </h3>
              <p className="text-[0.78rem] text-[var(--color-text-muted)] m-0">
                {cat.count} products
              </p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
