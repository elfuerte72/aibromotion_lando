import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

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
    <section className="py-[80px] sm:py-[100px] lg:py-[140px] px-5 sm:px-6 border-b border-ink">
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 md:gap-16 lg:gap-[72px] items-start">
        {/* Left — big heading */}
        <div>
          <div className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-muted mb-4">
            [01] Manifesto — 2026
          </div>
          <h2 className="font-heading font-extrabold uppercase leading-[0.84] tracking-[-0.055em] text-[clamp(40px,11vw,120px)]">
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

        {/* Right — copy */}
        <div>
          <div className="flex flex-col gap-[18px] text-base leading-relaxed text-ink-2 max-w-[480px]">
            <Reveal delay={100}>
              <p>Мы берём задачу бизнеса и закрываем её полностью — от идеи до реализации.</p>
            </Reveal>
            <Reveal delay={200}>
              <p>AIBROMOTION — креативная студия из Тюмени. Мы специализируемся на искусственном интеллекте, потому что убеждены: за ним будущее любого бизнеса. Видео, сайты и автоматизация — всё через призму AI, всё в одной команде.</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
