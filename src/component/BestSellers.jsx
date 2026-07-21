import { motion } from 'framer-motion'
import { products, bestSellerIds } from '../data/products'
import ProductCard from './ProductCard'

const bestSellers = products.filter((p) => bestSellerIds.includes(p.id))

export default function BestSellers() {
  return (
    <section id="bestsellers" className="bg-[var(--color-bg)]">
      <div className="max-w-[1400px] mx-auto px-5 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-[var(--color-accent)]/20 text-[var(--color-button)] px-4 py-1.5 rounded-full text-[0.82rem] font-semibold mb-4">
            <i className="fa-solid fa-crown text-[var(--color-accent)]" aria-hidden="true" />
            Best Sellers
          </span>
          <h2 className="text-[1.8rem] md:text-[2.2rem] font-extrabold font-display text-[var(--color-text)] mt-3 m-0">
            Top Selling Electronics
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-lg mx-auto mt-3 m-0">
            The devices our customers can not stop recommending.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {bestSellers.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
