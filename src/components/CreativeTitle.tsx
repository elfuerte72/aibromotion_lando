import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { TegakiRenderer, type TegakiRendererHandle } from "tegaki/react";
import caveatCyrillic from "@/fonts/caveat-cyrillic/bundle";

export function CreativeTitle() {
  const ref = useRef<HTMLDivElement>(null);
  const tegakiRef = useRef<TegakiRendererHandle>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 40%"],
  });

  /* Subtitle fades in after handwriting completes */
  const subtitleOpacity = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0.5, 0.75], [15, 0]);

  return (
    <div
      id="creative"
      ref={ref}
      className="px-6 pt-16 pb-10 md:px-10 md:pt-24 md:pb-14 border-t border-ink"
    >
      <div className="max-w-6xl mx-auto text-center">
        <div className="relative inline-block">
          {prefersReducedMotion ? (
            // Reduced-motion: skip handwriting animation — render static
            // glyph in the same font/size/colour to preserve layout.
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
          ) : (
            <TegakiRenderer
              ref={tegakiRef}
              font={caveatCyrillic}
              time={
                isInView
                  ? { mode: "uncontrolled", speed: 1, delay: 0.2 }
                  : { mode: "controlled", value: 0 }
              }
              style={{
                fontSize: "clamp(3.5rem, 14vw, 10rem)",
                lineHeight: 1,
                color: "var(--accent)",
              }}
              effects={{
                pressureWidth: { strength: 0.6 },
                taper: { startLength: 0.1, endLength: 0.15 },
              }}
            >
              Креатив
            </TegakiRenderer>
          )}
        </div>

        <motion.p
          className="font-mono text-sm md:text-base text-muted mt-4 max-w-sm sm:max-w-lg mx-auto tracking-wide"
          style={{ opacity: subtitleOpacity, y: subtitleY }}
        >
          Продакшен и визуальные истории
        </motion.p>
      </div>
    </div>
  );
}
