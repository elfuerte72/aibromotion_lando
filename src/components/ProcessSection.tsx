import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

const STEPS = [
  { n: "01", t: "Брифинг", d: "Слушаем задачу, собираем контекст. Без пустых анкет.", dur: "1–2 дня" },
  { n: "02", t: "Идея", d: "Стратегия, сценарий, визуальная система. Защита перед продакшном.", dur: "3–7 дней" },
  { n: "03", t: "Продакшн", d: "Съёмки, пост, ИИ-генерация, обучение агентов — по задаче.", dur: "1–6 недель" },
  { n: "04", t: "Запуск", d: "Дистрибуция, тесты, ретаргет, итерации. Считаем ROI каждую неделю.", dur: "Ongoing" },
];

export function ProcessSection() {
  return (
    <section className="py-[140px] px-6 border-b border-ink">
      <div className="mb-[60px]">
        <div className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-muted mb-4">
          [06] Method
        </div>
        <h2 className="font-heading font-extrabold uppercase leading-[0.84] tracking-[-0.055em] text-[clamp(56px,9vw,160px)]">
          Процесс <span className="font-serif italic font-light tracking-[-0.03em]">без лишнего.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 border-t border-ink">
        {STEPS.map((s, i) => (
          <ProcessStep key={s.n} step={s} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProcessStep({
  step: s,
  index,
}: {
  step: (typeof STEPS)[number];
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
      className="group relative p-6 pt-9 pb-[100px] border-r border-ink min-h-[400px] overflow-hidden transition-all duration-500 hover:bg-ink hover:text-paper max-lg:border-r-0 max-lg:border-b max-lg:border-ink last:lg:border-r-0"
    >
      {/* Big outline number */}
      <div className="font-heading font-extrabold text-[160px] tracking-[-0.06em] leading-[0.8] outline-text mb-6 transition-all duration-500 group-hover:[&]:[-webkit-text-stroke-color:var(--accent)]">
        {s.n}
      </div>

      <h4 className="font-heading font-bold text-[28px] tracking-[-0.02em] uppercase mb-3.5">
        {s.t}
      </h4>
      <p className="text-sm leading-relaxed max-w-[280px]">{s.d}</p>

      {/* Duration */}
      <span className="absolute bottom-6 left-6 font-mono text-[10px] font-medium tracking-[0.14em] uppercase text-accent">
        ● {s.dur}
      </span>

      {/* Arrow */}
      <span className="absolute bottom-6 right-6 w-11 h-11 border border-current grid place-items-center transition-all duration-400 group-hover:bg-accent group-hover:text-ink group-hover:border-accent group-hover:rotate-[-45deg]">
        ↗
      </span>
    </motion.div>
  );
}
