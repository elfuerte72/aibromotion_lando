import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

const CASES = [
  { n: "01", t: "NEON FRESH", sub: "6-episodic campaign", client: "Neon Beverage Co.", tags: ["Video", "Creative"], year: "2026", media: "/media/heroes.mp4" },
  { n: "02", t: "CURATOR-01", sub: "AI avatar host", client: "Arche Gallery", tags: ["AI Avatar", "Voice"], year: "2025", media: "/media/hero.webp", isImg: true },
  { n: "03", t: "RUN/42", sub: "42-variant paid ads", client: "Kairos Runwear", tags: ["Marketing", "Video"], year: "2025", media: "/media/basket.mp4" },
  { n: "04", t: "FORMA SALES", sub: "AI sales agent", client: "Forma Furniture", tags: ["Automation"], year: "2025", media: "/media/result.mp4" },
  { n: "05", t: "MERIDIAN", sub: "performance series", client: "Meridian Fit", tags: ["Video", "AI"], year: "2024", media: "/media/timeline.mp4" },
  { n: "06", t: "OROS SPIRITS", sub: "brand film", client: "Oros", tags: ["Film"], year: "2024", media: "/media/ready.mp4" },
];

export function CasesSection() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-10%" });

  return (
    <section className="px-6 pt-[120px] pb-20 border-b border-ink bg-paper-2">
      {/* Head */}
      <div ref={headRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-[60px] items-end">
        <div>
          <div className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-muted mb-4">
            [04] Selected work
          </div>
          <h2 className="font-heading font-extrabold uppercase leading-[0.84] tracking-[-0.055em] text-[clamp(56px,9vw,150px)]">
            Работа<br />
            <span className="font-serif italic font-light tracking-[-0.03em]">до</span> слов.
          </h2>
        </div>
        <div className="max-w-[440px] text-[15px] leading-relaxed">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.12, ease }}
          >
            Шесть кейсов — шесть разных жанров. Одна студия. Наведите на строку, чтобы увидеть кадр.
          </motion.p>
        </div>
      </div>

      {/* Case rows */}
      {CASES.map((c, i) => (
        <CaseRow key={c.n} caseData={c} index={i} />
      ))}
    </section>
  );
}

function CaseRow({
  caseData: c,
  index,
}: {
  caseData: (typeof CASES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.05, ease }}
      className="group relative grid grid-cols-[40px_1fr_60px] lg:grid-cols-[60px_1.4fr_220px_240px_80px] items-center gap-3.5 lg:gap-6 py-7 border-t border-ink last:border-b cursor-pointer transition-[padding] duration-400 hover:pl-5 hover:text-paper"
    >
      {/* Hover bg */}
      <div className="absolute left-0 right-0 top-0 h-0 bg-ink transition-[height] duration-400 ease-[cubic-bezier(0.2,0.85,0.15,1)] group-hover:h-full -z-[1]" />

      <span className="font-mono text-[13px] font-medium tracking-[0.14em] text-muted group-hover:text-accent transition-colors">
        [{c.n}]
      </span>

      <div>
        <span className="font-heading font-bold text-[clamp(26px,2.8vw,44px)] tracking-[-0.03em] uppercase">
          {c.t}
        </span>
        <span className="block font-mono text-[11px] font-medium tracking-[0.14em] uppercase mt-1.5 text-muted group-hover:text-white/70 transition-colors">
          {c.sub}
        </span>
      </div>

      <span className="hidden lg:block font-mono text-xs font-medium tracking-[0.12em] uppercase">
        {c.client}
      </span>

      <div className="hidden lg:flex gap-[5px] flex-wrap">
        {c.tags.map((t) => (
          <span key={t} className="font-mono text-[10px] font-medium tracking-[0.12em] uppercase py-[5px] px-[9px] border border-current">
            {t}
          </span>
        ))}
      </div>

      <span className="text-right font-mono text-xs font-medium tracking-[0.14em]">
        {c.year}
      </span>

      {/* Hover preview */}
      <div className="absolute right-[120px] top-1/2 -translate-y-1/2 translate-x-[30px] scale-[0.9] w-[280px] aspect-[16/10] pointer-events-none opacity-0 transition-all duration-500 ease-[cubic-bezier(0.2,0.85,0.15,1)] group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 z-[2] overflow-hidden hidden lg:block">
        {c.isImg ? (
          <img src={c.media} alt="" className="w-full h-full object-cover" />
        ) : (
          <video src={c.media} autoPlay muted loop playsInline className="w-full h-full object-cover" />
        )}
      </div>
    </motion.div>
  );
}
