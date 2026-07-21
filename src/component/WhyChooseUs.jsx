import { motion } from 'framer-motion'

const features = [
  {
    icon: 'fa-microchip',
    title: 'Genuine Products',
    desc: 'Every item is sourced directly from authorized distributors. 100% authentic guaranteed.',
    gradient: 'from-[#0a2947] to-[#1a4a7a]',
  },
  {
    icon: 'fa-truck-fast',
    title: 'Express Delivery',
    desc: 'Same-day dispatch on orders before 2 PM. Free shipping on orders over $99.',
    gradient: 'from-[#0a2947] to-[#1a4a7a]',
  },
  {
    icon: 'fa-arrow-rotate-left',
    title: '30-Day Returns',
    desc: 'Changed your mind? No worries. Hassle-free returns within 30 days.',
    gradient: 'from-[#0a2947] to-[#1a4a7a]',
  },
  {
    icon: 'fa-shield-halved',
    title: 'Secure Payments',
    desc: '256-bit SSL encryption and trusted payment gateways for safe checkout.',
    gradient: 'from-[#0a2947] to-[#1a4a7a]',
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function WhyChooseUs() {
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
            <i className="fa-solid fa-star" aria-hidden="true" />
            Why Choose Us
          </span>
          <h2 className="text-[1.8rem] md:text-[2.2rem] font-extrabold font-display text-[var(--color-text)] mt-3 m-0">
            The VoltMart Promise
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-xl mx-auto mt-3 m-0">
            We make buying electronics easy, safe, and affordable.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--color-button)]/30"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} text-white text-xl mb-5 transition-transform duration-300 group-hover:scale-110`}>
                <i className={`fa-solid ${feature.icon}`} aria-hidden="true" />
              </div>
              <h3 className="text-[1.02rem] font-bold text-[var(--color-text)] mb-2 m-0 font-display">
                {feature.title}
              </h3>
              <p className="text-[0.88rem] text-[var(--color-text-muted)] leading-relaxed m-0">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
