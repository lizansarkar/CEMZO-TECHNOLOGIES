# VoltMart — Premium Electronics Store

A premium retail landing page built with React 19 + Vite 8 + Tailwind CSS v4. Features a modern homepage with hero, product collection, cart, favourites, login, testimonials, and newsletter — all with Framer Motion animations and full responsiveness.

---

## Features

### Homepage Sections
- **Sticky Navbar** — SVG logo, navigation links, favourites/cart/login buttons, responsive mobile drawer
- **Hero Section** — Large banner with headline, CTAs, stats, floating delivery card
- **Featured Categories** — 6 electronics category cards with hover animations
- **Product Collection** — 12 products with category filter tabs, beautiful product cards
- **Why Choose Us** — 4 feature cards (Genuine Products, Express Delivery, 30-Day Returns, Secure Payments)
- **Best Sellers** — Highlighted top-selling electronics
- **Testimonials** — 3 customer review cards with star ratings
- **Newsletter** — Email subscribe form with success state
- **Premium Footer** — Company info, quick links, contact details, social icons

### Interactive Features
- **Shopping Cart** — Add/remove products, quantity controls, running total, checkout button
- **Favourites** — Toggle heart on any product card, dedicated favourites drawer
- **Login/Register** — Modal form with user avatar display
- **Category Filter** — Filter products by Laptops, Phones, Audio, TVs, Accessories, Wearables
- **Framer Motion Animations** — Scroll-triggered fade/slide/stagger on every section
- **localStorage Persistence** — Cart, favourites, and user data survive page refreshes

### Design
- **Premium Aesthetic** — Large whitespace, rounded corners, soft shadows, subtle gradients
- **Glassmorphism** — Navbar backdrop blur on scroll
- **Micro Interactions** — Hover scale, button press, card lift, floating elements
- **Responsive** — Mobile, tablet, laptop, desktop, large desktop

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI (functional components only) |
| Vite 8 | Dev server + production build |
| Tailwind CSS v4 | Utility-first styling via `@tailwindcss/vite` |
| Framer Motion | Scroll & hover animations |
| Font Awesome 6 | Icons (CDN) |
| Inter + Plus Jakarta Sans | Typography (Google Fonts) |

---

## Design Tokens

| Token | Light | Used for |
|---|---|---|
| `--color-bg` | `#EEEEEE` | Page background |
| `--color-text` | `#06202B` | Body text |
| `--color-button` | `#0A2947` | Primary buttons / navbar / accents |
| `--color-text-muted` | `#5B6F78` | Secondary text |
| `--color-border` | `#D8DDE0` | Borders & dividers |
| `--color-danger` | `#D64545` | Error states / remove actions |
| `--color-accent` | `#FFD27A` | Highlights / badges / CTAs |

---

## Folder Structure

```
src/
├── component/
│   ├── Navbar.jsx            ← sticky nav + SVG logo + cart/fav/login + mobile drawer
│   ├── HeroSection.jsx       ← hero banner with stats
│   ├── FeaturedCategories.jsx ← 6 category cards
│   ├── FeaturedProducts.jsx  ← filterable product grid
│   ├── ProductCard.jsx       ← reusable card with fav/cart
│   ├── WhyChooseUs.jsx       ← 4 feature cards
│   ├── BestSellers.jsx       ← top-selling products
│   ├── Testimonials.jsx      ← 3 customer reviews
│   ├── Newsletter.jsx        ← email subscribe form
│   ├── Footer.jsx            ← 4-column footer
│   ├── CartDrawer.jsx        ← slide-in shopping cart
│   ├── FavouritesDrawer.jsx  ← slide-in favourites list
│   ├── LoginModal.jsx        ← sign in / register modal
│   └── StarRating.jsx        ← reusable star rating display
│
├── context/
│   └── AppContext.jsx         ← cart, favourites, user state + localStorage
│
├── hooks/
│   └── useApp.js              ← convenience hook for AppContext
│
├── data/
│   └── products.js            ← 12 electronics products, categories, testimonials
│
├── styles/
│   └── global.css             ← design tokens, utilities, animations, a11y
│
├── App.jsx
└── main.jsx
```

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build
npm run preview
```

---

## Accessibility

- Navbar hamburger: `aria-expanded` + `aria-controls`, animated to "X" when open
- Cart/Favourites drawers: `role="dialog"` + `aria-modal`, ESC-to-close
- Login modal: focus management, ESC-to-close, body scroll lock
- Product cards: keyboard reachable, visible focus rings
- Category filter: `aria-pressed` on each pill tab
- All images have descriptive `alt` text
- `prefers-reduced-motion` respected — all animations disabled

---

## Responsive Breakpoints

| Breakpoint | Grid Columns | Navbar |
|---|---|---|
| < 640px | 2 | Hamburger + icons only |
| ≥ 640px | 2 | Hamburger + icons |
| ≥ 768px | 2 | Desktop links + icons |
| ≥ 1024px | 3 | Desktop links + icons |
| ≥ 1280px | 4 | Desktop links + icons |

---

## Verified

- `npm run lint` — 0 errors
- `npm run build` — 303 modules, no errors
- Mobile (375px), tablet (768px), desktop (1440px) layouts tested
- Cart add/remove/quantity works with localStorage persistence
- Favourites toggle works with badge count in navbar
- Login form shows user avatar initial after sign-in
- Mobile drawer opens/closes (hamburger, overlay click, ESC, resize)
- All sections animate on scroll with Framer Motion

---

## License

MIT
