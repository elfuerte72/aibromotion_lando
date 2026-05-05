import { useEffect, useState } from "react";

/**
 * Sticky bottom CTA bar. Pinned to the bottom of the viewport on phones
 * and hides itself once the contact section enters the viewport — at
 * that point the user already sees the same CTA (and the contact form),
 * so the floating bar would just block content.
 *
 * Uses IntersectionObserver on `#mobile-contact` (no scroll listeners,
 * no rAF). Respects `env(safe-area-inset-bottom)` so it sits above the
 * iOS home-indicator.
 */
export function StickyMobileCTA() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const el = document.getElementById("mobile-contact");
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        setHidden(entry.isIntersecting);
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden={hidden}
      className="fixed inset-x-0 bottom-0 z-40 px-4 pointer-events-none"
      style={{
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)",
      }}
    >
      <div
        className={`pointer-events-auto transition-[opacity,transform] duration-300 ease-out ${
          hidden
            ? "opacity-0 translate-y-3 pointer-events-none"
            : "opacity-100 translate-y-0"
        }`}
      >
        <a
          href="#mobile-contact"
          tabIndex={hidden ? -1 : 0}
          className="flex items-center justify-center min-h-[52px] px-6 rounded-full bg-accent text-paper font-heading font-extrabold uppercase tracking-[-0.025em] text-[16px] shadow-[0_4px_12px_-6px_rgba(0,0,0,0.35)] active:scale-[0.985] transition-transform"
        >
          Обсудить проект
        </a>
      </div>
    </div>
  );
}
