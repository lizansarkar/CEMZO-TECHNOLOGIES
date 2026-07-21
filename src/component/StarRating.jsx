export default function StarRating({ rate = 0 }) {
  const rounded = Math.round((rate || 0) * 2) / 2
  return (
    <span className="inline-flex text-[#f5a623] text-[0.8rem]" aria-label={`Rated ${rate} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const isHalf = rounded === i - 0.5
        const isFull = rounded >= i
        return (
          <i
            key={i}
            className={`fa-star ${isFull ? 'fa-solid' : isHalf ? 'fa-solid relative after:absolute after:inset-0 after:overflow-hidden after:w-1/2 after:text-[#f5a623] after:content-["\\f005"]' : 'fa-regular'}`}
            aria-hidden="true"
          />
        )
      })}
    </span>
  )
}
