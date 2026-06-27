ShopVerse — Product Listing App
A responsive React + Vite application for the React Developer Intern Technical Assignment. Fetches products from the FakeStore API and provides search, category filtering, a product details modal, pagination, dark/light theme, and a fully responsive layout.

Desktop preview

✨ Features
Mandatory
Product listing — image, title, price, category, rating (stars + count) on every card
Case-insensitive search by product title (with clear × button)
Category filter — accessible pill tabs, categories sourced live from the API
Product details modal — overlay click-to-close, ESC, focus trap, body-scroll lock, focus restoration
Loading & error states — animated skeleton grid while loading; friendly error panel with retry; empty-state when filters match nothing
Responsive grid — 1 column (mobile) → 2 (≥600px) → 3 (≥960px) → 4 (≥1280px)
Font Awesome 6 icons throughout
Clean architecture — services / hooks / pages / components with strict separation of concerns
Bonus
Debounced search (300 ms) with .cancel() cleanup on unmount
Pagination (8 per page) with compact numbered window, Prev/Next, keyboard-accessible
Context API for global state (theme + favourites), persisted to localStorage
Dark / Light theme toggle in the navbar
Mobile hamburger navbar with slide-in drawer, body-scroll lock, ESC/resize auto-close
Resilience
Graceful fallback to bundled sample data when the live API is unreachable (e.g. behind strict proxies / headless browsers). A subtle yellow banner surfaces this state. In a normal browser the live API is always used.
🎨 Design tokens
Token
Value
Used for
background	#EEEEEE	page background
text	#06202B	body text
button	#0A2947	primary buttons / navbar

Plus derived tokens (border, muted text, danger, accent) and a dark-theme override applied via [data-theme="dark"] on <html>.

🧱 Tech stack
React 18 (functional components only — no class components)
Vite 6 (dev server + build)
Axios 1.7 (HTTP client, isolated in services/)
react-router v7 (the unified react-router package, not react-router-dom)
Plain CSS (one .css per component + global theme tokens — no Tailwind)
Font Awesome 6 via CDN
Inter + Plus Jakarta Sans for typography
📁 Folder structure
text

src/
├── components/
│   ├── ProductCard.jsx
│   ├── ProductList.jsx
│   ├── SearchBar.jsx
│   ├── CategoryFilter.jsx
│   ├── ProductModal.jsx
│   ├── Loader.jsx
│   ├── Navbar.jsx        ← bonus (mobile hamburger toggle)
│   └── Pagination.jsx    ← bonus
│
├── pages/
│   └── Home.jsx
│
├── services/
│   ├── productService.js   ← all Axios logic
│   └── mockData.js         ← fallback dataset
│
├── hooks/
│   └── useProducts.js      ← data + UI state (search, category, pagination, modal)
│
├── context/
│   └── AppContext.jsx      ← global state (theme + favourites)
│
├── utils/
│   └── debounce.js         ← 300ms debounce helper
│
├── styles/
│   └── global.css          ← design tokens, reset, dark theme, a11y
│
├── App.jsx
└── main.jsx
🚀 Getting started
bash

# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:3000)
npm run dev

# 3. Build for production (outputs to dist/)
npm run build

# 4. Preview the production build locally
npm run preview
♿ Accessibility
Modal: role="dialog" + aria-modal, focus trap, ESC-to-close, body scroll lock, focus restoration to trigger
Pagination: real <button> elements with aria-current="page" on the active page
Category filter: aria-pressed on each pill tab
Navbar hamburger: aria-expanded + aria-controls, animated to "X" when open
All interactive elements reachable by keyboard; visible focus rings
prefers-reduced-motion respected (animations disabled for users who request it)
📱 Responsive breakpoints
Breakpoint
Grid columns
Navbar
< 600px	1	hamburger only
≥ 600px	2	hamburger only
≥ 768px	2	desktop links
≥ 960px	3	desktop links
≥ 1280px	4	desktop links

🧪 What's verified
npm run build → ✅ 111 modules, no errors
npm run dev → ✅ HTTP 200, no warnings
npm run preview → ✅ HTTP 200
Mobile (375px), tablet (768px), desktop (1440px) layouts all tested
Mobile hamburger drawer opens/closes correctly (link click, overlay click, ESC, resize)
Product modal opens/closes correctly (card click, overlay click, ESC, close button)
Search filters in real time (debounced 300ms)
Category filter updates the grid
Dark/light theme toggle persists to localStorage
Favourites toggle persists to localStorage and updates the navbar badge
📦 Pushing to GitHub
bash

# 1. Initialize git (skip if you already have a .git folder)
git init
git branch -M main

# 2. Stage and commit everything
git add .
git commit -m "feat: ShopVerse product listing app (React + Vite + Axios)"

# 3. Create an empty repo on GitHub first (https://github.com/new), then:
git remote add origin https://github.com/<your-username>/shopverse.git
git push -u origin main
If you'd rather use the GitHub CLI:

bash

gh repo create shopverse --public --source=. --remote=origin --push
📄 License
MIT — free to use for the assignment and beyond.