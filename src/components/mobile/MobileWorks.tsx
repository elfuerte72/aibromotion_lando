import { Reveal } from "@/components/shared/Reveal";
import { toPoster } from "@/lib/media";

type Work = {
  src: string;
  title: string;
  client: string;
  tag: string;
};

const WORKS: Work[] = [
  {
    src: "/media/showreel-main.mp4",
    title: "Showreel 2026",
    client: "AIBROMOTION",
    tag: "Reel",
  },
  {
    src: "/media/result.mp4",
    title: "Shoozy",
    client: "Магазин одежды",
    tag: "Lookbook",
  },
  {
    src: "/media/truck-holding.mp4",
    title: "Тракхолдинг",
    client: "Грузоперевозки",
    tag: "Промо",
  },
  {
    src: "/media/basket.mp4",
    title: "Баскетбол",
    client: "Спортивный клуб",
    tag: "Реклама",
  },
  {
    src: "/media/spot-new.mp4",
    title: "Instagram-контент",
    client: "AI + монтаж",
    tag: "Соцсети",
  },
];

/**
 * Mobile works. Stack of 5 case posters — no `<video>`, no carousel.
 * Same scroll-snap-free vertical reading flow as the rest of the mobile
 * tree. AVIF posters, lazy loading.
 */
export function MobileWorks() {
  return (
    <section className="bg-ink text-paper px-5 pt-14 pb-16">
      <div className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/55 mb-3">
          [03] Showreel · 2026
        </div>
        <h2 className="font-heading font-extrabold uppercase leading-[0.88] tracking-[-0.04em] text-[clamp(36px,10.5vw,52px)]">
          Наши<br />
          <span className="font-serif italic font-light tracking-[-0.03em]">работы.</span>
        </h2>
        <p className="mt-4 max-w-[34ch] text-[14.5px] leading-[1.5] text-paper/70">
          Реальные кейсы за 2025–2026. Производство, логистика, спорт, контент-формат для соцсетей.
        </p>
      </div>

      <ul className="flex flex-col gap-4">
        {WORKS.map((w, i) => {
          const poster = toPoster(w.src);
          return (
            <Reveal
              key={w.src}
              as="li"
              delay={Math.min(i * 70, 280)}
              offsetY={24}
              duration={700}
              className="relative aspect-[16/10] overflow-hidden border border-paper/15"
            >
              <picture>
                <source srcSet={poster.avif} type="image/avif" />
                <img
                  src={poster.jpg}
                  alt={`${w.title} — ${w.client}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </picture>
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-3">
                <div>
                  <div className="font-heading font-semibold uppercase tracking-[-0.015em] text-[18px] leading-tight text-paper">
                    {w.title}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/65 mt-1">
                    {w.client}
                  </div>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/55 whitespace-nowrap">
                  [{String(i + 1).padStart(2, "0")}] {w.tag}
                </span>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
