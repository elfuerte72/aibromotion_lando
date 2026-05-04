import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

/**
 * Reusable horizontal snap carousel for mobile layouts.
 *
 * Features:
 * - CSS scroll-snap (mandatory) with native momentum on touch.
 * - IntersectionObserver on slides to track the active index.
 * - Keyboard navigation (ArrowLeft / ArrowRight / Home / End).
 * - Numbered indicator (`[01 · 02 · 03]`) reflecting the active slide.
 * - A11y: `role=region`, `aria-roledescription=carousel`, per-slide
 *   `aria-label` and `aria-current` so screen readers announce position.
 *
 * Wheel / trackpad horizontal scroll works for free via `overflow-x`.
 * Lenis is disabled on touch devices (see `App.tsx`), so smooth scroll
 * here uses native `scroll-behavior: smooth`.
 */
export type SnapCarouselProps<T> = {
  /** A11y label, e.g. "Услуги студии" */
  label: string;
  items: T[];
  getKey: (item: T, index: number) => string | number;
  /**
   * Render the slide contents. `isActive` is updated as the user scrolls
   * so consumers can, e.g., play/pause video or toggle visuals.
   */
  renderItem: (item: T, index: number, isActive: boolean) => ReactNode;
  /**
   * Classes applied to each slide wrapper. Must include width +
   * shrink-0 + snap-start. e.g.
   * `"w-[85vw] max-w-[360px] aspect-[3/4] shrink-0 snap-start"`.
   */
  slideClassName: string;
  /** Optional classes on the outer region wrapper. */
  className?: string;
  /** Optional classes on the scrolling track (padding / gap). */
  trackClassName?: string;
  /** Show the numbered indicator under the track. Defaults to true. */
  showIndicator?: boolean;
  /** Optional classes on the indicator row. */
  indicatorClassName?: string;
};

export function SnapCarousel<T>({
  label,
  items,
  getKey,
  renderItem,
  slideClassName,
  className = "",
  trackClassName = "gap-3 px-5 pb-4",
  showIndicator = true,
  indicatorClassName = "px-5 mt-3",
}: SnapCarouselProps<T>) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track intersection ratios in a ref so we can resolve ties (the slide
  // with the highest ratio wins) without causing re-renders per tick.
  const ratiosRef = useRef<number[]>([]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    ratiosRef.current = new Array(items.length).fill(0);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const raw = (entry.target as HTMLElement).dataset.slideIndex;
          const idx = raw ? Number(raw) : -1;
          if (idx < 0) continue;
          ratiosRef.current[idx] = entry.intersectionRatio;
        }
        let best = 0;
        let bestRatio = -1;
        for (let i = 0; i < ratiosRef.current.length; i += 1) {
          const r = ratiosRef.current[i];
          if (r > bestRatio) {
            bestRatio = r;
            best = i;
          }
        }
        setActiveIndex((prev) => {
          if (prev === best) return prev;
          console.debug("[SnapCarousel] active changed", {
            label,
            from: prev,
            to: best,
          });
          return best;
        });
      },
      {
        root: scroller,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    const nodes = slideRefs.current.filter(
      (n): n is HTMLDivElement => n !== null,
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [items.length, label]);

  const scrollToIndex = useCallback((idx: number) => {
    const node = slideRefs.current[idx];
    if (!node) return;
    console.debug("[SnapCarousel] scrollToIndex", { idx });
    node.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollToIndex(Math.min(items.length - 1, activeIndex + 1));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollToIndex(Math.max(0, activeIndex - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      scrollToIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      scrollToIndex(items.length - 1);
    }
  };

  const indicatorNumbers = useMemo(
    () => items.map((_, i) => String(i + 1).padStart(2, "0")),
    [items],
  );

  return (
    <div
      className={className}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div
        ref={scrollerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className={`flex overflow-x-auto snap-x snap-mandatory scroll-smooth overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${trackClassName}`}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {items.map((item, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={getKey(item, i)}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              data-slide-index={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${items.length}`}
              aria-current={isActive ? "true" : undefined}
              className={slideClassName}
            >
              {renderItem(item, i, isActive)}
            </div>
          );
        })}
      </div>

      {showIndicator && (
        <div
          role="tablist"
          aria-label={`${label} — навигация`}
          className={`font-mono text-[11px] font-medium tracking-[0.16em] flex gap-2 items-center ${indicatorClassName}`}
        >
          {indicatorNumbers.map((n, i) => (
            <button
              key={n}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Перейти к слайду ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className={`min-h-11 min-w-11 grid place-items-center -mx-1 transition-colors duration-200 ${
                i === activeIndex ? "text-accent" : "text-muted/70"
              }`}
            >
              [{n}]
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
