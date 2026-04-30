import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease: [number, number, number, number] = [0.2, 0.85, 0.15, 1];

type Brand = {
  name: string;
  logoInk: string;
  logoColor: string;
  /** Per-logo height tuning so wordmark + mark variants visually align in the wall. */
  scale: string;
  /** Если true, при hover ячейка инвертируется в ink (для брендов с белым/светлым логотипом). */
  darkHover?: boolean;
};

const BRANDS: Brand[] = [
  {
    name: "love & pay",
    logoInk: "/logos/clients/lovepay.png",
    logoColor: "/logos/clients/lovepay-color.png",
    scale: "max-h-[58%] sm:max-h-[62%]",
  },
  {
    name: "Трак Холдинг",
    logoInk: "/logos/clients/trakholding.png",
    logoColor: "/logos/clients/trakholding-color.png",
    scale: "max-h-[58%] sm:max-h-[62%]",
  },
  {
    name: "Арктика",
    logoInk: "/logos/clients/arktika.png",
    logoColor: "/logos/clients/arktika-color.png",
    scale: "max-h-[60%] sm:max-h-[64%]",
  },
  {
    name: "РусЭко",
    logoInk: "/logos/clients/ruseco.png",
    logoColor: "/logos/clients/ruseco-color.png",
    scale: "max-h-[52%] sm:max-h-[56%]",
    darkHover: true,
  },
];

/**
 * "Нам доверяют" — клиентская стена. По умолчанию все логотипы в едином ink-монохроме
 * на бумажном фоне; при наведении проявляются оригинальные цвета. Для логотипов без
 * читаемого имени (love & pay, РусЭко) при hover снизу проступает подпись.
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

      <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-ink/15">
        {BRANDS.map((b, i) => (
          <motion.div
            key={b.name}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.07, ease }}
            className={`group relative aspect-[4/3] sm:aspect-[3/2] flex items-center justify-center border-r border-b border-ink/15 overflow-hidden transition-colors duration-500 ${
              b.darkHover ? "hover:bg-ink" : "hover:bg-paper-2"
            }`}
          >
            <span
              aria-hidden
              className={`absolute top-3.5 left-3.5 w-2 h-2 rounded-full transition-colors ${
                b.darkHover ? "bg-ink/45 group-hover:bg-accent" : "bg-ink/45 group-hover:bg-accent"
              }`}
            />
            <span
              aria-hidden
              className={`absolute top-3.5 right-3.5 font-mono text-[10px] tracking-[0.18em] uppercase transition-colors ${
                b.darkHover ? "text-ink/35 group-hover:text-paper/40" : "text-ink/35"
              }`}
            >
              0{i + 1}
            </span>

            <div className="relative flex items-center justify-center w-full h-full pb-6 sm:pb-7">
              <img
                src={b.logoInk}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                draggable={false}
                className={`absolute w-auto ${b.scale} max-w-[72%] object-contain opacity-70 group-hover:opacity-0 transition-opacity duration-500 ease-out select-none pointer-events-none`}
              />
              <img
                src={b.logoColor}
                alt={b.name}
                loading="lazy"
                decoding="async"
                draggable={false}
                className={`relative w-auto ${b.scale} max-w-[72%] object-contain opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-500 ease-out group-hover:scale-[1.04] select-none pointer-events-none`}
              />
            </div>

            <span
              aria-hidden
              className={`absolute bottom-3.5 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.22em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out whitespace-nowrap ${
                b.darkHover ? "text-paper/80" : "text-ink/70"
              }`}
            >
              {b.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
