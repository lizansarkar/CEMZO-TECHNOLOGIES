import { useState } from 'react'
import { motion } from 'framer-motion'
import { products, categories } from '../data/products'
import ProductCard from './ProductCard'

const allCategories = ['All', ...categories.map((c) => c.name)]

export default function FeaturedProducts() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? products
    : products.filter((p) => p.category === active)

  return (
    <section id="collection" className="bg-[var(--color-bg)]">
      <div className="max-w-[1400px] mx-auto px-5 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 bg-[var(--color-button)]/6 text-[var(--color-button)] px-4 py-1.5 rounded-full text-[0.82rem] font-semibold mb-4">
            <i className="fa-solid fa-fire" aria-hidden="true" />
            Featured
          </span>
          <h2 className="text-[1.8rem] md:text-[2.2rem] font-extrabold font-display text-[var(--color-text)] mt-3 m-0">
            Our Collection
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-lg mx-auto mt-3 m-0">
            Handpicked tech from the brands you trust.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {allCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`px-5 py-2.5 rounded-full text-[0.85rem] font-medium font-body cursor-pointer border-[1.5px] transition-[background,color,border-color,transform] duration-200 active:scale-95 ${
                active === cat
                  ? 'bg-[var(--color-button)] border-[var(--color-button)] text-white'
                  : 'bg-white border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-button)] hover:text-[var(--color-button)]'
              }`}
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[var(--color-text-muted)]">No products in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}
