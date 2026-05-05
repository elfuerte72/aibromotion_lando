import { useEffect, useRef, useState, type CSSProperties, type ReactNode, createElement } from "react";

type Props = {
  children: ReactNode;
  /** Delay before the reveal kicks in (ms). Used for stagger. Default 0. */
  delay?: number;
  /** Vertical offset before reveal (px). Default 16. */
  offsetY?: number;
  /** Transition duration (ms). Default 700. */
  duration?: number;
  className?: string;
  as?: "div" | "p" | "span" | "li" | "section" | "article";
};

/**
 * Pure-CSS, IntersectionObserver-driven fade/translate-in. Replacement
 * for framer-motion's `<motion.div initial animate transition>` reveal
 * pattern on mobile (and everywhere else where the motion library
 * subscription cost isn't justified by the effect).
 *
 * Mounts once, observes once, removes the observer after the first
 * reveal — no per-frame subscriptions.
 */
export function Reveal({
  children,
  delay = 0,
  offsetY = 16,
  duration = 700,
  className = "",
  as = "div",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: CSSProperties = {
    opacity: shown ? 1 : 0,
    transform: shown ? "none" : `translate3d(0, ${offsetY}px, 0)`,
    transition: `opacity ${duration}ms cubic-bezier(0.2, 0.85, 0.15, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.2, 0.85, 0.15, 1) ${delay}ms`,
    willChange: shown ? "auto" : "opacity, transform",
  };

  return createElement(as, { ref, className, style }, children);
}
