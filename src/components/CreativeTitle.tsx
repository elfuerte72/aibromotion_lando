import { lazy, Suspense, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useIsMobile } from "@/lib/useDevice";

// Tegaki + 251KB Caveat TTF + glyph JSON live in a separate chunk —
// mobile and reduced-motion users never trigger this import.
const CreativeTegaki = lazy(() => import("./creative/CreativeTegaki"));

function StaticTitle() {
  return (
    <h2
      className="font-serif italic"
      style={{
        fontSize: "clamp(3.5rem, 14vw, 10rem)",
        lineHeight: 1,
        color: "var(--accent)",
        margin: 0,
      }}
    >
      Креатив
    </h2>
  );
}

export function CreativeTitle() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const skipTegaki = isMobile || prefersReducedMotion;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 40%"],
  });

  /* Subtitle fades in after handwriting completes */
  const subtitleOpacity = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0.5, 0.75], [15, 0]);

  // Mobile: subtitle visible immediately, no per-frame scroll commits.
  const subtitleStyle = isMobile
    ? { opacity: 1, y: 0 }
    : { opacity: subtitleOpacity, y: subtitleY };

  return (
    <div
      id="creative"
      ref={ref}
      className="px-6 pt-16 pb-10 md:px-10 md:pt-24 md:pb-14 border-t border-ink"
    >
      <div className="max-w-6xl mx-auto text-center">
        <div className="relative inline-block">
          {skipTegaki ? (
            <StaticTitle />
          ) : (
            <Suspense fallback={<StaticTitle />}>
              <CreativeTegaki isInView={isInView} />
            </Suspense>
          )}
        </div>

        <motion.p
          className="font-mono text-sm md:text-base text-muted mt-4 max-w-sm sm:max-w-lg mx-auto tracking-wide"
          style={subtitleStyle}
        >
          Продакшен и визуальные истории
        </motion.p>
      </div>
    </div>
  );
}
