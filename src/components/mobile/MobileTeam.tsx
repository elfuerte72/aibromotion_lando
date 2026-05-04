import { Reveal } from "@/components/shared/Reveal";
import { toAvif } from "@/lib/media";

type Member = {
  n: string;
  r: string;
  src: string;
  i: string;
};

const TEAM: Member[] = [
  { n: "Макс", r: "Технический директор", src: "/media/team-max.webp", i: "01" },
  { n: "Антон", r: "Маркетолог, креатор", src: "/media/team-toha.webp", i: "02" },
  { n: "Артём", r: "Монтажёр", src: "/media/team-tema.webp", i: "03" },
];

/**
 * Mobile team. Vertical stack of 3 portrait cards — no carousel, no
 * grayscale-on-hover trick. Static AVIF posters with a soft gradient
 * footer for legibility.
 */
export function MobileTeam() {
  return (
    <section className="bg-paper px-5 py-14 border-t border-ink/10">
      <div className="mb-6">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-3">
          [05] Команда
        </div>
        <h2 className="font-heading font-extrabold uppercase leading-[0.88] tracking-[-0.04em] text-[clamp(36px,10.5vw,52px)]">
          Те, кто<br />
          <span className="font-serif italic font-light tracking-[-0.03em]">творит.</span>
        </h2>
        <p className="mt-4 max-w-[34ch] text-[14.5px] leading-[1.5] text-ink-2">
          Ядро — три человека. Вокруг — сеть продакшна, моушена, AI-инженеров.
        </p>
      </div>

      <ul className="flex flex-col gap-4">
        {TEAM.map((m, i) => (
          <Reveal
            key={m.n}
            as="li"
            delay={Math.min(i * 80, 240)}
            offsetY={20}
            duration={700}
            className="relative aspect-[5/4] overflow-hidden border border-ink bg-paper-2"
          >
            <picture>
              <source srcSet={toAvif(m.src)} type="image/avif" />
              <img
                src={m.src}
                alt={m.n}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-[center_18%]"
              />
            </picture>
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.78) 100%)",
              }}
            />
            <div className="absolute left-3.5 right-3.5 bottom-3.5 flex justify-between items-end gap-3 text-paper">
              <div style={{ textShadow: "0 1px 2px rgba(0,0,0,0.45)" }}>
                <div className="font-heading font-bold text-[20px] tracking-[-0.02em] uppercase">
                  {m.n}
                </div>
                <div className="font-mono text-[10px] font-medium tracking-[0.14em] uppercase mt-1 opacity-90">
                  {m.r}
                </div>
              </div>
              <div className="font-mono text-[10px] tracking-[0.14em] text-paper/70">
                [{m.i}]
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
