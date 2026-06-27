
import './Pagination.css'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = buildPageWindow(currentPage, totalPages)

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        className="pagination__btn pagination__btn--nav"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <i className="fa-solid fa-chevron-left" aria-hidden="true" />
        <span>Prev</span>
      </button>

      <ul className="pagination__numbers">
        {pages.map((p, i) =>
          p === '…' ? (
            <li key={`gap-${i}`} className="pagination__gap" aria-hidden="true">
              …
            </li>
          ) : (
            <li key={p}>
              <button
                type="button"
                className={`pagination__btn ${
                  p === currentPage ? 'pagination__btn--active' : ''
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
        className="pagination__btn pagination__btn--nav"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <span>Next</span>
        <i className="fa-solid fa-chevron-right" aria-hidden="true" />
      </button>
    </nav>
  )
}

/**
 * Build a compact window of page numbers, e.g.
 *   page 1 of 20  -> 1 2 3 … 20
 *   page 5 of 20  -> 1 … 4 5 6 … 20
 *   page 19 of 20 -> 1 … 18 19 20
 */
function buildPageWindow(current, total) {
  const window = []
  const span = 1 // how many neighbours to show on each side

  window.push(1)
  const start = Math.max(2, current - span)
  const end = Math.min(total - 1, current + span)

  if (start > 2) window.push('…')
  for (let p = start; p <= end; p++) window.push(p)
  if (end < total - 1) window.push('…')

  if (total > 1) window.push(total)
  return window
}
