export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = buildPageWindow(currentPage, totalPages)

  return (
    <nav className="flex items-center justify-center gap-2 flex-wrap py-6 pb-2" aria-label="Pagination">
      <button
        type="button"
        className="min-w-[38px] h-[38px] px-2.5 border-[1.5px] border-[var(--color-border)] bg-white text-[var(--color-text)] rounded-xl text-[0.88rem] font-semibold font-body cursor-pointer inline-flex items-center justify-center gap-1.5 transition-[background,color,border-color,transform] duration-160 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed hover:not-disabled:not-[.pagination__btn--active]:border-[var(--color-button)] hover:not-disabled:not-[.pagination__btn--active]:text-[var(--color-button)] max-[480px]:min-w-[34px] max-[480px]:h-[34px]"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <i className="fa-solid fa-chevron-left" aria-hidden="true" />
        <span className="max-[480px]:hidden">Prev</span>
      </button>

      <ul className="flex items-center gap-1 list-none m-0 p-0">
        {pages.map((p, i) =>
          p === '…' ? (
            <li key={`gap-${i}`} className="text-[var(--color-text-muted)] px-1 font-semibold" aria-hidden="true">
              …
            </li>
          ) : (
            <li key={p}>
              <button
                type="button"
                className={`min-w-[38px] h-[38px] px-2.5 border-[1.5px] border-[var(--color-border)] rounded-xl text-[0.88rem] font-semibold font-body cursor-pointer inline-flex items-center justify-center transition-[background,color,border-color,transform] duration-160 active:scale-95 max-[480px]:min-w-[34px] max-[480px]:h-[34px] ${
                  p === currentPage
                    ? 'bg-[var(--color-button)] border-[var(--color-button)] text-white'
                    : 'bg-white text-[var(--color-text)] hover:border-[var(--color-button)] hover:text-[var(--color-button)]'
                }`}
                onClick={() => onPageChange(p)}
                aria-current={p === currentPage ? 'page' : undefined}
                aria-label={`Page ${p}`}
              >
                {p}
              </button>
            </li>
          )
        )}
      </ul>

      <button
        type="button"
        className="min-w-[38px] h-[38px] px-2.5 border-[1.5px] border-[var(--color-border)] bg-white text-[var(--color-text)] rounded-xl text-[0.88rem] font-semibold font-body cursor-pointer inline-flex items-center justify-center gap-1.5 transition-[background,color,border-color,transform] duration-160 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed hover:not-disabled:not-[.pagination__btn--active]:border-[var(--color-button)] hover:not-disabled:not-[.pagination__btn--active]:text-[var(--color-button)] max-[480px]:min-w-[34px] max-[480px]:h-[34px]"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <span className="max-[480px]:hidden">Next</span>
        <i className="fa-solid fa-chevron-right" aria-hidden="true" />
      </button>
    </nav>
  )
}

function buildPageWindow(current, total) {
  const window = []
  const span = 1

  window.push(1)
  const start = Math.max(2, current - span)
  const end = Math.min(total - 1, current + span)

  if (start > 2) window.push('…')
  for (let p = start; p <= end; p++) window.push(p)
  if (end < total - 1) window.push('…')

  if (total > 1) window.push(total)
  return window
}
