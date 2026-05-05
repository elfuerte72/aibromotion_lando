import { Reveal } from "@/components/shared/Reveal";

type Brand = {
  name: string;
  color: string;
  scale: string;
};

const BRANDS: Brand[] = [
  {
    name: "love & pay",
    color: "/logos/clients/lovepay-color.png",
    scale: "max-h-[58%]",
  },
  {
    name: "Трак Холдинг",
    color: "/logos/clients/trakholding-color.png",
    scale: "max-h-[58%]",
  },
  {
    name: "Арктика",
    color: "/logos/clients/arktika-color.png",
    scale: "max-h-[60%]",
  },
  {
    name: "РусЭко",
    color: "/logos/clients/ruseco-color.png",
    scale: "max-h-[52%]",
  },
];

/**
 * Mobile trusted-by wall. 2-column grid of color logos. No hover state,
 * no ink-to-color crossfade — phones are pointer-coarse, so we render
 * the brand colours straight away.
 */
export function MobileTrusted() {
  return (
    <section className="bg-paper px-5 py-14 border-t border-ink/10">
      <div className="mb-6">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-3">
          [04] Trusted by
        </div>
        <h2 className="font-heading font-extrabold uppercase leading-[0.88] tracking-[-0.04em] text-[clamp(36px,10.5vw,52px)]">
          Нам<br />
          <span className="font-serif italic font-light tracking-[-0.03em]">доверяют.</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 border-t border-l border-ink/15">
        {BRANDS.map((b, i) => (
          <Reveal
            key={b.name}
            as="div"
            delay={Math.min(i * 70, 280)}
            offsetY={12}
            duration={650}
            className="relative aspect-[4/3] flex items-center justify-center border-r border-b border-ink/15 overflow-hidden"
          >
            <span
              aria-hidden
              className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-accent"
            />
            <span
              aria-hidden
              className="absolute top-3 right-3 font-mono text-[9px] tracking-[0.18em] uppercase text-ink/40"
            >
              0{i + 1}
            </span>
            <picture>
              <source srcSet={b.color.replace(/\.png$/, ".avif")} type="image/avif" />
              <img
                src={b.color}
                alt={b.name}
                loading="lazy"
                decoding="async"
                draggable={false}
                className={`w-auto ${b.scale} max-w-[72%] object-contain select-none pointer-events-none`}
              />
            </picture>
            <span
              aria-hidden
              className="absolute bottom-2.5 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.22em] uppercase text-ink/55 whitespace-nowrap"
            >
              {b.name}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
