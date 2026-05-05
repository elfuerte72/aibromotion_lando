/**
 * Device / motion detection hooks for mobile adaptation.
 *
 * Built on top of `useSyncExternalStore` + `window.matchMedia` — SSR-safe
 * (returns `false` when `window` is undefined), re-evaluated on resize and
 * orientation change.
 *
 * Use these hooks ONLY inside React components. For pure CSS decisions
 * prefer Tailwind breakpoints (`sm:` / `md:` / `lg:`) and
 * `@media (hover: none)` rules.
 */

import { useSyncExternalStore } from "react";

// Set LOG_DEVICE=true in the URL (#log-device) or flip this flag in dev to
// enable verbose logging of hook evaluations.
const DEBUG =
  typeof window !== "undefined" &&
  (window.location?.hash?.includes("log-device") ?? false);

function debug(tag: string, payload: Record<string, unknown>): void {
  if (!DEBUG) return;
  console.debug(`[useDevice] ${tag}`, payload);
}

/** Subscribes to a media-query and returns its current `matches` value. */
function useMediaQuery(query: string): boolean {
  const subscribe = (onChange: () => void): (() => void) => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return () => undefined;
    }
    const mql = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent): void => {
      debug("change", { query, matches: event.matches });
      onChange();
    };
    // `addEventListener` — Safari 14+, Chrome/FF/Edge full support.
    mql.addEventListener("change", handler);
    debug("subscribe", { query, initial: mql.matches });
    return () => {
      mql.removeEventListener("change", handler);
      debug("unsubscribe", { query });
    };
  };

  const getSnapshot = (): boolean => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  };

  // Server snapshot — always `false` so the first paint assumes desktop
  // with motion enabled. In a Vite SPA there is no SSR, so this is only
  // hit during `renderToString` in tests.
  const getServerSnapshot = (): boolean => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * True when viewport is narrower than the `md` breakpoint (<768px).
 * Use for render-level forks (MobileNav vs DesktopNav, carousel vs grid).
 */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 767.98px)");
}

/**
 * True on pointer-coarse, hover-less devices (phones, most tablets).
 * Use for interaction-level forks: tap instead of hover, disabling Lenis,
 * switching autoplay videos to poster-first.
 */
export function useIsTouch(): boolean {
  return useMediaQuery("(hover: none) and (pointer: coarse)");
}

/**
 * True when the user has requested reduced motion at the OS level.
 * Accessibility requirement — disable Tegaki, marquee, Lenis, parallax.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
