/**
 * debounce.js
 * ------------
 * A small, dependency-free utility that delays invoking `fn` until `delay` ms
 * have elapsed since the last call. Used by the search bar so we don't spam
 * filter operations on every keystroke.
 *
 * The returned function also exposes a `.cancel()` method so callers can
 * flush any pending invocation (handy for cleanup on unmount).
 *
 * @param {Function} fn    - The function to debounce.
 * @param {number}   delay - Wait time in milliseconds (default 300ms).
 * @returns {Function & { cancel: () => void }}
 */
export function debounce(fn, delay = 300) {
  let timerId = null

  function debounced(...args) {
    if (timerId) clearTimeout(timerId)
    timerId = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }

  debounced.cancel = () => {
    if (timerId) {
      clearTimeout(timerId)
      timerId = null
    }
  }

  return debounced
}

export default debounce
