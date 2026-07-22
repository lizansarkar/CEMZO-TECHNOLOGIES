const footerLinks = {
  Company: ['About Us', 'Careers', 'Press', 'Blog'],
  Shop: ['New Arrivals', 'Best Sellers', 'Deals', 'Gift Cards'],
  Support: ['Contact Us', 'FAQs', 'Shipping', 'Returns'],
}

const socials = [
  { icon: 'fa-instagram', label: 'Instagram', href: '#' },
  { icon: 'fa-twitter', label: 'Twitter', href: '#' },
  { icon: 'fa-youtube', label: 'YouTube', href: '#' },
  { icon: 'fa-linkedin-in', label: 'LinkedIn', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-[#06202b] text-white">
      <div className="max-w-[1400px] mx-auto px-5 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <a href="#home" className="inline-flex items-center gap-2 no-underline mb-5" aria-label="VoltMart home">
              <span className="font-display font-extrabold text-[1.3rem] tracking-tight text-white">
                Volt<span className="text-[var(--color-accent)]">Mart</span>
              </span>
            </a>
            <p className="text-white/50 text-[0.88rem] leading-relaxed mb-6 max-w-[280px] m-0">
              Premium electronics at unbeatable prices. Your trusted destination for the latest tech.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-white/60 no-underline transition-[background,color,border-color] duration-200 hover:bg-[var(--color-accent)] hover:text-[var(--color-button)] hover:border-[var(--color-accent)]"
                >
                  <i className={`fa-brands ${s.icon} text-[0.9rem]`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[0.92rem] font-bold font-display text-white mb-4 m-0">{title}</h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[0.88rem] text-white/50 no-underline transition-colors duration-200 hover:text-[var(--color-accent)]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[0.78rem] text-white/35 m-0">
            &copy; 2025 VoltMart. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-[0.78rem] text-white/35 no-underline transition-colors duration-200 hover:text-white/60">
              Privacy Policy
            </a>
            <a href="#" className="text-[0.78rem] text-white/35 no-underline transition-colors duration-200 hover:text-white/60">
              Terms of Service
            </a>
            <a href="#" className="text-[0.78rem] text-white/35 no-underline transition-colors duration-200 hover:text-white/60">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
