import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function SectionTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <section className="relative bg-white overflow-hidden py-16 md:py-24">
      <div ref={ref} className="flex justify-center px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <img
            src="/media/_ (6).jpeg"
            alt=""
            className="max-h-[55vh] w-auto object-contain select-none pointer-events-none"
            style={{
              maskImage:
                "radial-gradient(ellipse 80% 80% at center, black 40%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 80% at center, black 40%, transparent 75%)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
