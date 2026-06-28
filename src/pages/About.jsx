export default function About() {
  const stats = [
    { icon: 'fa-box', value: '10K+', label: 'Products' },
    { icon: 'fa-users', value: '50K+', label: 'Happy Customers' },
    { icon: 'fa-truck', value: '99.9%', label: 'Delivery Success' },
    { icon: 'fa-star', value: '4.8', label: 'Average Rating' },
  ]

  const features = [
    {
      icon: 'fa-bolt',
      title: 'Lightning Fast',
      desc: 'Same-day dispatch on all orders placed before 2 PM.',
      color: 'from-amber-400 to-orange-500',
    },
    {
      icon: 'fa-shield-halved',
      title: 'Secure Shopping',
      desc: '256-bit SSL encryption keeps your data safe and sound.',
      color: 'from-emerald-400 to-teal-500',
    },
    {
      icon: 'fa-arrow-rotate-left',
      title: 'Easy Returns',
      desc: '30-day hassle-free return policy, no questions asked.',
      color: 'from-blue-400 to-indigo-500',
    },
    {
      icon: 'fa-headset',
      title: '24/7 Support',
      desc: 'Our team is here around the clock to help you out.',
      color: 'from-purple-400 to-pink-500',
    },
    {
      icon: 'fa-truck-fast',
      title: 'Free Shipping',
      desc: 'Free delivery on all orders over $50, worldwide.',
      color: 'from-rose-400 to-red-500',
    },
    {
      icon: 'fa-gem',
      title: 'Premium Quality',
      desc: 'Every product is hand-picked and quality-checked.',
      color: 'from-cyan-400 to-blue-500',
    },
  ]

  const team = [
    { name: 'Alex Chen', role: 'CEO & Founder', avatar: 'A', color: 'from-blue-500 to-indigo-600' },
    { name: 'Sarah Miller', role: 'Head of Operations', avatar: 'S', color: 'from-pink-500 to-rose-600' },
    { name: 'James Wilson', role: 'Lead Developer', avatar: 'J', color: 'from-amber-500 to-orange-600' },
    { name: 'Emily Davis', role: 'Customer Success', avatar: 'E', color: 'from-emerald-500 to-teal-600' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0a2947] via-[#0d3358] to-[#06202b] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="relative max-w-[1400px] mx-auto px-5 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 text-sm font-medium mb-6">
            <i className="fa-solid fa-circle-info text-[var(--color-accent)]" aria-hidden="true" />
            <span>Learn about our story</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display leading-tight mb-4">
            About{' '}
            <span className="text-[var(--color-accent)]">ShopVerse</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            We&apos;re on a mission to make quality products accessible to everyone.
            Founded in 2024, ShopVerse has grown from a small idea into a
            global marketplace.
          </p>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-white border-b border-[var(--color-border)]">
        <div className="max-w-[1400px] mx-auto px-5 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--color-button)]/5 text-[var(--color-button)] text-2xl mb-3">
                <i className={`fa-solid ${stat.icon}`} aria-hidden="true" />
              </div>
              <div className="text-3xl font-extrabold font-display text-[var(--color-text)]">
                {stat.value}
              </div>
              <div className="text-sm text-[var(--color-text-muted)] font-medium mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-[1400px] mx-auto px-5 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-[var(--color-button)]/5 text-[var(--color-button)] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <i className="fa-solid fa-bullseye" aria-hidden="true" /> Our Mission
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display text-[var(--color-text)] leading-tight mb-4">
              Connecting you with the{' '}
              <span className="text-[var(--color-button)]">best products</span>{' '}
              worldwide.
            </h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed text-base md:text-lg">
              We partner with trusted brands and independent creators to bring
              you a curated selection of high-quality products. Every item in
              our catalogue is chosen with care, ensuring you get nothing but
              the best.
            </p>
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-check" aria-hidden="true" />
                </div>
                <span className="text-[var(--color-text)] font-medium text-sm">Quality Assured</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-check" aria-hidden="true" />
                </div>
                <span className="text-[var(--color-text)] font-medium text-sm">Best Prices</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-check" aria-hidden="true" />
                </div>
                <span className="text-[var(--color-text)] font-medium text-sm">Fast Delivery</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-[var(--color-button)] to-[#0d3358] rounded-3xl p-8 text-white">
              <i className="fa-solid fa-quote-left text-4xl text-[var(--color-accent)]/40 mb-4" aria-hidden="true" />
              <blockquote className="text-lg md:text-xl leading-relaxed font-medium italic">
                &ldquo;We believe shopping should be delightful, not
                overwhelming. That&apos;s why we carefully curate every product
                in our catalogue.&rdquo;
              </blockquote>
              <div className="mt-6 pt-6 border-t border-white/20 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-amber-500 flex items-center justify-center text-[#06202b] font-bold text-lg">
                  AC
                </div>
                <div>
                  <div className="font-semibold">Alex Chen</div>
                  <div className="text-white/60 text-sm">CEO &amp; Founder</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 md:w-12 md:h-12 bg-[var(--color-accent)] rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-6 h-6 md:w-10 md:h-10 border-2 border-[var(--color-button)] rounded-2xl -z-10" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white border-y border-[var(--color-border)]">
        <div className="max-w-[1400px] mx-auto px-5 py-16 md:py-20">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-[var(--color-button)]/5 text-[var(--color-button)] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <i className="fa-solid fa-star" aria-hidden="true" /> Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display text-[var(--color-text)] mt-3">
              Everything you need, nothing you don&apos;t
            </h2>
            <p className="text-[var(--color-text-muted)] max-w-xl mx-auto mt-3">
              We go the extra mile to make your shopping experience smooth,
              secure, and enjoyable.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover hover:border-[var(--color-button)]"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} text-white text-xl mb-4 transition-transform duration-200 group-hover:scale-110`}>
                  <i className={`fa-solid ${feature.icon}`} aria-hidden="true" />
                </div>
                <h3 className="text-[var(--color-text)] font-bold text-lg mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed m-0">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-[1400px] mx-auto px-5 py-16 md:py-20">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-[var(--color-button)]/5 text-[var(--color-button)] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <i className="fa-solid fa-users" aria-hidden="true" /> Our Team
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-[var(--color-text)] mt-3">
            Meet the people behind ShopVerse
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-xl mx-auto mt-3">
            A passionate team dedicated to bringing you the best shopping
            experience.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-white border border-[var(--color-border)] rounded-2xl p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-2xl font-bold mb-4`}>
                {member.avatar}
              </div>
              <h3 className="text-[var(--color-text)] font-bold text-lg m-0">
                {member.name}
              </h3>
              <p className="text-[var(--color-text-muted)] text-sm mt-1">
                {member.role}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <p className="text-[var(--color-text-muted)] text-sm">
            Want to join our team?{' '}
            <a href="#" className="text-[var(--color-button)] font-semibold no-underline hover:underline">
              We&apos;re hiring!
            </a>
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#0a2947] via-[#0d3358] to-[#06202b] text-white">
        <div className="max-w-[1400px] mx-auto px-5 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold font-display mb-4">
            Ready to start shopping?
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-8 text-lg">
            Browse our catalogue and discover thousands of amazing products
            at unbeatable prices.
          </p>
          <a
            href="/catalogue"
            className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-[#06202b] font-bold px-8 py-3.5 rounded-full text-base no-underline transition-all duration-200 hover:bg-white hover:shadow-lg hover:scale-[1.02]"
          >
            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            Explore Catalogue
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-5 text-center text-[0.82rem] text-[var(--color-text-muted)]">
        <p className="m-0">
          <i className="fa-solid fa-circle-info" aria-hidden="true" /> Built with React +
          Vite + Axios. Data from{' '}
          <a href="https://fakestoreapi.com" target="_blank" rel="noreferrer" className="text-[var(--color-button)] no-underline font-semibold hover:underline">
            FakeStore API
          </a>
          .
        </p>
      </footer>
    </div>
  )
}
