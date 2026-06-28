export default function Loader({ variant = 'spinner', count = 8, label = 'Loading…' }) {
  if (variant === 'skeleton') {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-[22px] pt-2" role="status" aria-live="polite" aria-label={label}>
        {Array.from({ length: count }).map((_, i) => (
          <div className="bg-white border border-[var(--color-border)] rounded-2xl p-[18px] shadow-card flex flex-col gap-3" key={i}>
            <div className="w-full aspect-square bg-[linear-gradient(90deg,#e6e6e6_25%,#f3f3f3_50%,#e6e6e6_75%)] bg-[length:200%_100%] animate-shimmer rounded-xl" />
            <div className="h-3.5 w-[90%] rounded-[6px] bg-[linear-gradient(90deg,#e6e6e6_25%,#f3f3f3_50%,#e6e6e6_75%)] bg-[length:200%_100%] animate-shimmer" />
            <div className="h-3 w-1/2 rounded-[6px] bg-[linear-gradient(90deg,#e6e6e6_25%,#f3f3f3_50%,#e6e6e6_75%)] bg-[length:200%_100%] animate-shimmer" />
            <div className="h-4 w-[30%] rounded-[6px] bg-[linear-gradient(90deg,#e6e6e6_25%,#f3f3f3_50%,#e6e6e6_75%)] bg-[length:200%_100%] animate-shimmer" />
          </div>
        ))}
        <span className="sr-only">{label}</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 px-4 py-16" role="status" aria-live="polite">
      <div className="w-12 h-12 border-4 border-[var(--color-border)] border-t-[var(--color-button)] rounded-full animate-spin" aria-hidden="true" />
      <span className="text-[var(--color-text)] text-[0.95rem] font-medium">{label}</span>
    </div>
  )
}
