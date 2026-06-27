import { useEffect, useRef, useState } from 'react'
import debounce from '../utils/debounce'
import './SearchBar.css'

export default function SearchBar({ value, onChange, placeholder = 'Search products…' }) {
  const [inputValue, setInputValue] = useState(value || '')

  // Build the debounced "lift up" once and reuse it across renders.
  const debouncedChange = useRef(
    debounce((query) => onChange(query), 300)
  ).current

  // Keep local input in sync if the parent resets the value (e.g. clear button).
  useEffect(() => {
    if ((value || '') !== inputValue) {
      setInputValue(value || '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  // Cancel any pending debounce when the component unmounts.
  useEffect(() => {
    return () => debouncedChange.cancel()
  }, [debouncedChange])

  const handleChange = (e) => {
    const next = e.target.value
    setInputValue(next)
    debouncedChange(next)
  }

  const handleClear = () => {
    setInputValue('')
    // Flush immediately so the list reverts without waiting 300ms.
    debouncedChange.cancel()
    onChange('')
  }

  return (
    <div className="search-bar" role="search">
      <i className="fa-solid fa-magnifying-glass search-bar__icon" aria-hidden="true" />
      <input
        type="text"
        className="search-bar__input"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Search products by title"
        autoComplete="off"
      />
      {inputValue && (
        <button
          type="button"
          className="search-bar__clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
