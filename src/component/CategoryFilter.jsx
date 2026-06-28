export default function CategoryFilter({ categories, active, onChange }) {
  const items = ['all', ...categories]

  return (
    <div className="flex flex-wrap gap-2 w-full max-[560px]:flex-nowrap max-[560px]:overflow-x-auto max-[560px]:pb-1.5 max-[560px]:scrollbar-thin" role="group" aria-label="Filter products by category">
      {items.map((cat) => {
        const isActive = cat === active
        const label = cat === 'all' ? 'All' : formatLabel(cat)
        return (
          <button
            key={cat}
            type="button"
            className={`border-[1.5px] px-4 py-[9px] rounded-full text-[0.85rem] font-medium font-body cursor-pointer whitespace-nowrap transition-[background,color,border-color,transform] duration-180 active:scale-95 max-[560px]:shrink-0 ${
              isActive
                ? 'bg-[var(--color-button)] border-[var(--color-button)] text-white'
                : 'bg-white border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-button)] hover:text-[var(--color-button)]'
            }`}
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

function formatLabel(category) {
  return category
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}
