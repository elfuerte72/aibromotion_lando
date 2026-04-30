import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease: [number, number, number, number] = [0.2, 0.85, 0.15, 1];

const BRANDS = [
  { name: "Выбор", hint: "Vybor" },
  { name: "Тракхолдинг", hint: "Trakholding" },
  { name: "РусЭко", hint: "RusEco" },
  { name: "Арктика", hint: "Arktika" },
  { name: "Love Pay", hint: "Love Pay" },
];

/**
 * "Нам доверяют" — placeholder block for client logos. Renders monochrome
 * wordmark mocks until real SVGs are dropped in. Sits between
 * `AutomationSection` and `TeamSection`.
 */
export function TrustedSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="bg-paper border-b border-ink py-[80px] sm:py-[100px] lg:py-[140px] px-5 sm:px-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 md:gap-12 lg:gap-24 mb-10 sm:mb-14">
        <div>
          <div className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-muted mb-4">
            [09] Trusted by
          </div>
          <h2 className="font-heading font-extrabold uppercase leading-[0.84] tracking-[-0.055em] text-[clamp(44px,11vw,160px)]">
            Нам<br />
            <span className="font-serif italic font-light tracking-[-0.03em]">доверяют.</span>
          </h2>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.12, ease }}
          className="text-[15px] leading-relaxed text-ink-2 max-w-[440px] self-end lg:justify-self-end"
        >
          Бренды, которые выбрали нас для запуска видео, сайтов и AI-автоматизации.
        </motion.p>
      </div>

      {/* Logo row — placeholder wordmarks */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-l border-ink/15">
        {BRANDS.map((b, i) => (
          <motion.div
            key={b.name}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.07, ease }}
            className="group relative aspect-[4/3] sm:aspect-[3/2] flex items-center justify-center border-r border-b border-ink/15 transition-colors duration-500 hover:bg-paper-2"
          >
            {/* Mark — geometric placeholder */}
            <span
              aria-hidden
              className="absolute top-3.5 left-3.5 w-2 h-2 rounded-full bg-ink/45 group-hover:bg-accent transition-colors"
            />
            <span
              aria-hidden
              className="absolute top-3.5 right-3.5 font-mono text-[10px] tracking-[0.18em] uppercase text-ink/35"
            >
              0{i + 1}
            </span>

            {/* Wordmark mock */}
            <span className="font-heading font-extrabold uppercase tracking-[-0.02em] text-[clamp(18px,2.6vw,30px)] text-ink/70 group-hover:text-ink transition-colors">
              {b.name}
            </span>

            <span
              aria-hidden
              className="absolute bottom-3.5 left-3.5 font-mono text-[9px] tracking-[0.22em] uppercase text-ink/30"
            >
              {b.hint}
            </span>
          </motion.div>
        ))}
      </div>

      <p className="mt-6 font-mono text-[10px] tracking-[0.22em] uppercase text-muted/70">
        * Логотипы временные — заменим на оригинальные SVG.
      </p>
    </section>
  );
}
