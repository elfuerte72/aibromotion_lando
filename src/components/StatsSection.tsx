import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

const STATS = [
  { n: "128", l: "Закрытых проектов 2024–26" },
  { n: "42", l: "Клиентов с revisit" },
  { n: "9", l: "Стран / 4 языка озвучки" },
  { n: "6×", l: "Средний ROI кампаний" },
];

export function StatsSection() {
  return (
    <section className="bg-accent text-ink border-b border-ink overflow-hidden">
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <StatCell key={s.l} stat={s} index={i} />
        ))}
      </div>
    </section>
  );
}

function StatCell({
  stat: s,
  index,
}: {
  stat: (typeof STATS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.08, ease }}
      className="px-7 pt-[72px] pb-16 border-r border-ink/20 last:border-r-0 max-lg:border-b max-lg:border-ink/20"
    >
      <div className="font-serif font-light italic text-[clamp(72px,10vw,180px)] tracking-[-0.04em] leading-[0.85]">
        {s.n}
      </div>
      <div className="font-mono text-xs font-medium tracking-[0.16em] uppercase mt-3.5 max-w-[200px]">
        {s.l}
      </div>
    </motion.div>
  );
}
