import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-[var(--color-bg)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(10,41,71,0.06),transparent)]" />
      <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-[var(--color-accent)]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-[5%] w-[400px] h-[400px] bg-[var(--color-button)]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-5 pt-12 pb-16 md:pt-20 md:pb-24 lg:pt-28 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 self-center lg:self-start bg-[var(--color-button)]/6 border border-[var(--color-button)]/10 rounded-full px-4 py-1.5 text-[0.82rem] font-semibold text-[var(--color-button)]"
            >
              <i className="fa-solid fa-bolt text-[var(--color-accent)]" aria-hidden="true" />
              New Arrivals 2025
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-[2.5rem] sm:text-[3.2rem] lg:text-[4rem] xl:text-[4.5rem] font-extrabold font-display leading-[1.05] tracking-tight text-[var(--color-text)] m-0"
            >
              Tech That
              <br />
              <span className="text-[var(--color-button)]">Moves You</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-[var(--color-text-muted)] text-[1.05rem] md:text-[1.15rem] leading-relaxed max-w-[520px] mx-auto lg:mx-0 m-0"
            >
              Premium electronics from the brands you love. Discover the latest in laptops, phones, audio, and smart devices at unbeatable prices.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <a
                href="#collection"
                className="inline-flex items-center gap-2.5 h-[52px] px-8 border-none rounded-full bg-[var(--color-button)] text-white text-[0.95rem] font-semibold no-underline transition-[background,transform,box-shadow] duration-250 hover:bg-[var(--color-button-hover)] hover:shadow-[0_8px_30px_rgba(10,41,71,0.3)] active:scale-[0.97]"
              >
                Shop Collection
                <i className="fa-solid fa-arrow-right text-[0.85rem]" aria-hidden="true" />
              </a>
              <a
                href="#categories"
                className="inline-flex items-center gap-2.5 h-[52px] px-8 border-[1.5px] border-[var(--color-border)] rounded-full bg-white/60 text-[var(--color-text)] text-[0.95rem] font-semibold no-underline transition-[border-color,color,background] duration-250 hover:border-[var(--color-button)] hover:text-[var(--color-button)] hover:bg-white"
              >
                Browse Categories
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="flex items-center gap-8 justify-center lg:justify-start pt-4"
            >
              <div className="flex flex-col">
                <span className="text-[1.6rem] font-extrabold font-display text-[var(--color-text)]">2K+</span>
                <span className="text-[0.78rem] text-[var(--color-text-muted)] font-medium">Products</span>
              </div>
              <div className="w-px h-10 bg-[var(--color-border)]" />
              <div className="flex flex-col">
                <span className="text-[1.6rem] font-extrabold font-display text-[var(--color-text)]">50K+</span>
                <span className="text-[0.78rem] text-[var(--color-text-muted)] font-medium">Happy Customers</span>
              </div>
              <div className="w-px h-10 bg-[var(--color-border)]" />
              <div className="flex flex-col">
                <span className="text-[1.6rem] font-extrabold font-display text-[var(--color-text)]">4.9</span>
                <span className="text-[0.78rem] text-[var(--color-text-muted)] font-medium">
                  <i className="fa-solid fa-star text-[var(--color-accent)] text-[0.7rem]" aria-hidden="true" /> Rating
                </span>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-[520px] aspect-square rounded-[32px] overflow-hidden bg-white shadow-[var(--shadow-elevated)]">
              <img
                src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&q=80"
                alt="Premium electronics devices on a modern desk"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-button)]/20 to-transparent" />
            </div>

            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[var(--color-accent)] rounded-2xl -z-10 rotate-6" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-[3px] border-[var(--color-button)]/15 rounded-3xl -z-10" />

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-8 -left-4 bg-white rounded-2xl px-5 py-3 shadow-[0_8px_30px_rgba(6,32,43,0.12)] flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-[var(--color-button)] flex items-center justify-center">
                <i className="fa-solid fa-truck-fast text-white text-sm" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[0.82rem] font-bold text-[var(--color-text)] m-0">Free Delivery</p>
                <p className="text-[0.72rem] text-[var(--color-text-muted)] m-0">On orders over $99</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
