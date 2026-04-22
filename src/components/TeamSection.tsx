import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

const TEAM = [
  { n: "Макс", r: "Технический директор", src: "/media/team-max.webp", i: "01" },
  { n: "Антон", r: "Маркетолог, креатор", src: "/media/team-toha.webp", i: "02" },
  { n: "Артём", r: "Монтажёр", src: "/media/team-tema.webp", i: "03" },
];

export function TeamSection() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-10%" });

  return (
    <section id="team" className="py-[140px] px-6 border-b border-ink">
      {/* Head */}
      <div ref={headRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-[60px] items-end">
        <div>
          <div className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-muted mb-4">
            [08] Команда
          </div>
          <h2 className="font-heading font-extrabold uppercase leading-[0.84] tracking-[-0.055em] text-[clamp(56px,9vw,160px)]">
            Те, кто<br />
            <span className="font-serif italic font-light tracking-[-0.03em]">творит.</span>
          </h2>
        </div>
        <div className="max-w-[440px] text-[15px] leading-relaxed">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.12, ease }}
          >
            Ядро — три человека. Вокруг — сеть специалистов на проект: операторы, саунд, моушен, колорист, продюсеры, инженеры ИИ.
          </motion.p>
        </div>
      </div>

      {/* Team grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {TEAM.map((m, i) => (
          <TeamCard key={m.n} member={m} index={i} />
        ))}
      </div>
    </section>
  );
}

function TeamCard({
  member: m,
  index,
}: {
  member: (typeof TEAM)[number];
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
      className="group relative aspect-[3/4] overflow-hidden border border-ink bg-paper-2 cursor-pointer"
    >
      <img
        src={m.src}
        alt={m.n}
        className="absolute inset-0 w-full h-full object-cover object-[center_20%] grayscale-[0.4] contrast-[1.05] transition-all duration-[800ms] ease-[cubic-bezier(0.2,0.8,0.15,1)] group-hover:grayscale-0 group-hover:scale-[1.04]"
      />
      {/* Bottom gradient — keeps name/role readable on any photo */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.78) 100%)",
        }}
      />
      <div className="absolute left-3.5 right-3.5 bottom-3.5 flex justify-between items-end gap-3">
        <div className="text-white transition-colors duration-300 group-hover:text-accent" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.45)" }}>
          <div className="font-heading font-bold text-[22px] tracking-[-0.02em] uppercase">{m.n}</div>
          <div className="font-mono text-[10px] font-medium tracking-[0.14em] uppercase mt-1 opacity-90">
            {m.r}
          </div>
        </div>
        <div className="font-mono text-[11px] font-medium tracking-[0.14em] text-white/70">[{m.i}]</div>
      </div>
    </motion.div>
  );
}
