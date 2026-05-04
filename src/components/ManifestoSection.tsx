import { Reveal } from "./shared/Reveal";

export function ManifestoSection() {
  return (
    <section className="py-[80px] sm:py-[100px] lg:py-[140px] px-5 sm:px-6 border-b border-ink">
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 md:gap-16 lg:gap-[72px] items-start">
        {/* Left — big heading */}
        <div>
          <div className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-muted mb-4">
            [01] Manifesto — 2026
          </div>
          <h2 className="font-heading font-extrabold uppercase leading-[0.84] tracking-[-0.055em] text-[clamp(40px,11vw,120px)]">
            <Reveal duration={900}><div>Хороший</div></Reveal>
            <Reveal duration={900} delay={100}>
              <div>
                <span className="font-serif italic font-light text-accent tracking-[-0.03em]">контент</span> —
              </div>
            </Reveal>
            <Reveal duration={900} delay={200}><div>тот, который</div></Reveal>
            <Reveal duration={900} delay={300}><div className="outline-text">не пролистывают.</div></Reveal>
          </h2>
        </div>

        {/* Right — copy */}
        <div>
          <div className="flex flex-col gap-[18px] text-base leading-relaxed text-ink-2 max-w-[480px]">
            <Reveal delay={100} as="p">
              Мы берём задачу бизнеса и закрываем её полностью — от идеи до реализации.
            </Reveal>
            <Reveal delay={200} as="p">
              AIBROMOTION — креативная студия из Тюмени. Мы специализируемся на искусственном интеллекте, потому что убеждены: за ним будущее любого бизнеса. Видео, сайты и автоматизация — всё через призму AI, всё в одной команде.
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
