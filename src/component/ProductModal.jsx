import { useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import StarRating from "./StarRating";

export default function ProductModal({ product, onClose }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);
  const { isFavourite, toggleFavourite } = useApp();

  useEffect(() => {
    if (!product) return;

    const previouslyFocused = document.activeElement;
    closeBtnRef.current?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [product, onClose]);

  if (!product) return null;

  const fav = isFavourite(product.id);

  return (
    <div
      className="fixed inset-0 bg-[rgba(6,32,43,0.55)] backdrop-blur-[4px] flex items-center justify-center p-4 z-[1000] animate-overlay-fade"
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        className="relative bg-white rounded-[20px] max-w-[920px] w-full max-h-[92vh] overflow-y-auto shadow-[0_24px_60px_rgba(6,32,43,0.35)] animate-panel-pop"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          ref={closeBtnRef}
          type="button"
          className="absolute top-3.5 right-3.5 w-10 h-10 rounded-full border-none bg-[var(--color-border)] text-[var(--color-text)] cursor-pointer inline-flex items-center justify-center text-base z-[2] transition-[background,color,transform] duration-180 hover:bg-[var(--color-button)] hover:text-white hover:rotate-90"
          onClick={onClose}
          aria-label="Close product details"
        >
          {/* Inline SVG replacement for guaranteed rendering */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-[var(--color-bg)] p-9 md:p-12 flex items-center justify-center rounded-t-[20px] md:rounded-l-[20px] md:rounded-tr-none">
            <img
              src={product.image}
              alt={product.title}
              className="max-w-full max-h-[320px] md:max-h-[420px] object-contain mix-blend-multiply"
            />
          </div>

          <div className="px-8 pb-8 pt-7 md:px-9 md:pb-8 md:pt-9 flex flex-col gap-3.5">
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-[var(--color-text-muted)]">
              {product.category}
            </span>
            <h2
              id="modal-title"
              className="m-0 text-2xl font-bold text-[var(--color-text)] leading-tight font-display"
            >
              {product.title}
            </h2>

            <div className="flex items-center gap-2 flex-wrap">
              <StarRating rate={product.rating?.rate} />
              <span className="font-semibold text-[var(--color-text)] text-[0.9rem]">
                {product.rating?.rate?.toFixed(1) ?? "0.0"} / 5.0
              </span>
              <span className="text-[var(--color-text-muted)] text-[0.85rem]">
                ({product.rating?.count ?? 0} reviews)
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 py-3 border-y border-[var(--color-border)] my-1">
              <span className="text-[1.8rem] font-extrabold text-[var(--color-button)] font-display">
                ${product.price.toFixed(2)}
              </span>
              <button
                type="button"
                className={`inline-flex items-center gap-2 border-[1.5px] rounded-full px-[22px] py-[11px] text-[0.9rem] font-semibold font-body cursor-pointer transition-[background,color,transform] duration-180 active:scale-97 ${
                  fav
                    ? "text-[var(--color-danger)] border-[var(--color-danger)] bg-transparent"
                    : "bg-transparent text-[var(--color-button)] border-[var(--color-button)] hover:bg-[var(--color-button)] hover:text-white"
                }`}
                onClick={() => toggleFavourite(product.id)}
                aria-pressed={fav}
              >
                <i
                  className={`fa-${fav ? "solid" : "regular"} fa-heart`}
                  aria-hidden="true"
                />
                {fav ? "Favourited" : "Add to favourites"}
              </button>
            </div>

            <div>
              <h3 className="m-0 mb-1.5 text-[0.95rem] text-[var(--color-text)]">
                Description
              </h3>
              <p className="m-0 text-[0.92rem] leading-relaxed text-[#333]">
                {product.description}
              </p>
            </div>

            <div className="flex gap-2.5 flex-wrap mt-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 border-none rounded-full px-[22px] py-[11px] text-[0.9rem] font-semibold font-body cursor-pointer transition-[background,color,transform,box-shadow] duration-180 active:scale-97 bg-[var(--color-button)] text-white hover:bg-[#0d3358] hover:shadow-[0_6px_18px_rgba(10,41,71,0.25)]"
              >
                <i className="fa-solid fa-cart-plus" aria-hidden="true" /> Add
                to cart
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 border-[1.5px] border-[var(--color-button)] rounded-full px-[22px] py-[11px] text-[0.9rem] font-semibold font-body cursor-pointer transition-[background,color,transform] duration-180 active:scale-97 bg-transparent text-[var(--color-button)] hover:bg-[var(--color-button)] hover:text-white"
                onClick={onClose}
              >
                Continue browsing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
