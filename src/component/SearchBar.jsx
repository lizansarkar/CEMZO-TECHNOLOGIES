import { useEffect, useRef, useState } from 'react'
import debounce from '../utils/debounce'

export default function SearchBar({ value, onChange, placeholder = 'Search products…' }) {
  const [inputValue, setInputValue] = useState(value || '')

  const debouncedChange = useRef(
    debounce((query) => onChange(query), 300)
  ).current

  useEffect(() => {
    if ((value || '') !== inputValue) {
      setInputValue(value || '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

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
    debouncedChange.cancel()
    onChange('')
  }

  return (
    <div className="relative flex items-center w-full max-w-[460px]" role="search">
      <i className="fa-solid fa-magnifying-glass absolute left-4 text-[var(--color-text-muted)] text-[0.95rem] pointer-events-none" aria-hidden="true" />
      <input
        type="text"
        className="w-full h-12 px-11 border-[1.5px] border-[var(--color-border)] rounded-full bg-white text-[var(--color-text)] text-[0.95rem] font-body transition-[border-color,box-shadow] duration-180 placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-button)] focus:shadow-[0_0_0_4px_rgba(10,41,71,0.12)]"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Search products by title"
        autoComplete="off"
      />
      {inputValue && (
        <button
          type="button"
          className="absolute right-2 w-8 h-8 border-none bg-[var(--color-border)] text-[var(--color-text)] rounded-full cursor-pointer inline-flex items-center justify-center text-[0.85rem] transition-[background,color] duration-150 hover:bg-[var(--color-button)] hover:text-white"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
