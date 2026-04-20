import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

const STATS = [
  { n: "128", t: "проектов" },
  { n: "42", t: "клиентов с revisit" },
  { n: "9", t: "стран" },
  { n: "6×", t: "средний ROI" },
];

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: delay / 1000, ease }}
    >
      {children}
    </motion.div>
  );
}

export function ManifestoSection() {
  return (
    <section className="py-[140px] px-6 border-b border-ink">
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-[72px] items-start">
        {/* Left — big heading */}
        <div>
          <div className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-muted mb-4">
            [01] Manifesto — 2026
          </div>
          <h2 className="font-heading font-extrabold uppercase leading-[0.84] tracking-[-0.055em] text-[clamp(48px,7vw,120px)]">
            <Reveal><div>Хороший</div></Reveal>
            <Reveal delay={100}>
              <div>
                <span className="font-serif italic font-light text-accent tracking-[-0.03em]">контент</span> —
              </div>
            </Reveal>
            <Reveal delay={200}><div>тот, который</div></Reveal>
            <Reveal delay={300}><div className="outline-text">не пролистывают.</div></Reveal>
          </h2>
        </div>

        {/* Right — copy + stats */}
        <div>
          <div className="flex flex-col gap-[18px] text-base leading-relaxed text-ink-2 max-w-[480px]">
            <Reveal delay={100}>
              <p>Мы не продаём ролики и не продаём «AI-агентов». Мы продаём внимание — единицу, которую сегодня сложнее всего купить и удержать.</p>
            </Reveal>
            <Reveal delay={200}>
              <p>В студии три компетенции: режиссура, performance-маркетинг и инженерия ИИ. Они работают в одной команде, а не в трёх разных подрядчиках.</p>
            </Reveal>
            <Reveal delay={300}>
              <p>Если бренду нужна скорость, насмотренность и технология одновременно — это к нам.</p>
            </Reveal>
          </div>

          {/* Stat strip */}
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 border-t border-ink">
            {STATS.map((s, i) => (
              <Reveal key={s.t} delay={200 + i * 100}>
                <div className="pt-6 px-5 border-r border-ink last:border-r-0 max-lg:border-b max-lg:border-ink max-lg:pb-6">
                  <div className="font-serif italic font-light text-[clamp(40px,4vw,72px)] text-accent tracking-[-0.03em]">
                    {s.n}
                  </div>
                  <div className="font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-muted mt-1.5">
                    {s.t}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
