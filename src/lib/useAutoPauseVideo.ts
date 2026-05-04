import { useEffect, type RefObject } from "react";

type Options = {
  /** Skip the observer entirely — useful for desktop-only gating. */
  enabled?: boolean;
  /** IntersectionObserver rootMargin. Default `"10%"` keeps a small lead-in. */
  rootMargin?: string;
  /** Visibility ratio that flips play/pause. Default `0.05`. */
  threshold?: number;
};

/**
 * Pause a `<video>` when it scrolls out of the viewport, resume when it
 * comes back. Mirrors the carousel-active-only pattern (ShowreelSection
 * MiniSlide, ServicesCarousel) but driven by IntersectionObserver instead
 * of an external `isActive` flag — for standalone background videos.
 *
 * Reserved for mobile (heavy decode + battery cost). On desktop pass
 * `enabled: false` so the observer is never wired up.
 */
export function useAutoPauseVideo(
  ref: RefObject<HTMLVideoElement | null>,
  { enabled = true, rootMargin = "10%", threshold = 0.05 }: Options = {},
): void {
  useEffect(() => {
    if (!enabled) return;
    const v = ref.current;
    if (!v || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          void v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin, threshold },
    );

    io.observe(v);
    return () => io.disconnect();
  }, [ref, enabled, rootMargin, threshold]);
}
