import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { TegakiRenderer, type TegakiRendererHandle } from "tegaki/react";
import caveatCyrillic from "@/fonts/caveat-cyrillic/bundle";

export function CreativeTitle() {
  const ref = useRef<HTMLDivElement>(null);
  const tegakiRef = useRef<TegakiRendererHandle>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

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
      className="px-6 pt-16 pb-10 md:px-10 md:pt-24 md:pb-14 border-t border-black"
    >
      <div className="max-w-6xl mx-auto text-center">
        <div className="relative inline-block">
          <TegakiRenderer
            ref={tegakiRef}
            font={caveatCyrillic}
            time={
              isInView
                ? { mode: "uncontrolled", speed: 1, delay: 0.2 }
                : { mode: "controlled", value: 0 }
            }
            style={{
              fontSize: "clamp(4rem, 12vw, 10rem)",
              lineHeight: 1,
              color: "var(--color-salmon)",
            }}
            effects={{
              pressureWidth: { strength: 0.6 },
              taper: { startLength: 0.1, endLength: 0.15 },
            }}
          >
            Креатив
          </TegakiRenderer>
        </div>

        <motion.p
          className="font-body text-sm md:text-base text-black/40 mt-4 max-w-lg mx-auto"
          style={{ opacity: subtitleOpacity, y: subtitleY }}
        >
          Продакшен, визуальные истории и AI-ускоренный контент
        </motion.p>
      </div>
    </div>
  );
}
