/**
 * CategoryFilter.jsx
 * ------------------
 * Pill/tab-based category selector.
 *
 * - "All" is always first and is the default active option.
 * - Tabs are keyboard-accessible (roving `aria-pressed`).
 * - Horizontal scroll on small screens so it never wraps awkwardly.
 */

import './CategoryFilter.css'

export default function CategoryFilter({ categories, active, onChange }) {
  const items = ['all', ...categories]

  return (
    <div
      className="category-filter"
      role="group"
      aria-label="Filter products by category"
    >
      {items.map((cat) => {
        const isActive = cat === active
        const label = cat === 'all' ? 'All' : formatLabel(cat)
        return (
          <button
            key={cat}
            type="button"
            className={`category-chip ${isActive ? 'category-chip--active' : ''}`}
            aria-pressed={isActive}
            onClick={() => onChange(cat)}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

// "men's clothing" -> "Men's Clothing"
function formatLabel(category) {
  return category
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}
