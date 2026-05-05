/**
 * Single source of truth for nav anchors, shared between desktop and
 * mobile nav implementations.
 */
import type Lenis from "lenis";

export type NavLink = { id: string; label: string };

export const NAV_LINKS: NavLink[] = [
  { id: "showreel", label: "Работа" },
  { id: "services", label: "Услуги" },
  { id: "team", label: "Команда" },
];

export const CONTACT_LINK: NavLink = { id: "contact", label: "Обсудить проект ↗" };

/**
 * Scroll to a section. Prefers Lenis when available (smooth mac-feel
 * scroll), falls back to the native `scrollIntoView` when Lenis is
 * disabled on touch / reduced-motion.
 */
export function scrollToAnchor(
  targetId: string,
  lenis: Lenis | null | undefined,
): void {
  if (typeof window === "undefined") return;

  console.debug("[Nav] scrollToAnchor", { targetId, hasLenis: !!lenis });

  if (lenis) {
    lenis.scrollTo(`#${targetId}`, {
      offset: -80,
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    return;
  }

  const el = document.getElementById(targetId);
  if (!el) return;

  // Native smooth scroll for touch devices where Lenis is intentionally
  // disabled. Offset is accounted for via scroll-margin-top on <section>
  // elements OR a manual correction after the scroll.
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Scroll the page to the very top — used by the logo click handler. */
export function scrollToTop(lenis: Lenis | null | undefined): void {
  if (typeof window === "undefined") return;
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.4 });
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}
