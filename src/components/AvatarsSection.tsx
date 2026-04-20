import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

const AVATARS = [
  { name: "ARINA V.3", role: "Host · RU/EN", src: "/media/hero.webp" },
  { name: "MAXIM AI", role: "Sales · RU", src: "/media/team-max.webp" },
  { name: "TEMA NEO", role: "Teacher · Multi", src: "/media/team-tema.webp" },
  { name: "ANTON-7", role: "News · RU/EN/ES", src: "/media/team-toha.webp" },
];

export function AvatarsSection() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-10%" });

  return (
    <section className="py-[140px] px-6 border-b border-ink">
      {/* Head */}
      <div ref={headRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-[60px] items-end">
        <div>
          <div className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-muted mb-4">
            [05] AI Avatars
          </div>
          <h2 className="font-heading font-extrabold uppercase leading-[0.84] tracking-[-0.055em] text-[clamp(56px,9vw,160px)]">
            Цифровые<br />
            <span className="font-serif italic font-light tracking-[-0.03em]">ведущие.</span>
          </h2>
        </div>
        <div className="max-w-[460px] text-[15px] leading-relaxed">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.12, ease }}
          >
            Рисуем персонаж, обучаем голос, пишем сценарий — и получаем медиа-машину, которая озвучит сорок вариантов за ночь. На любом языке, с любым tone-of-voice.
          </motion.p>
        </div>
      </div>

      {/* Avatar grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {AVATARS.map((a, i) => (
          <AvatarCard key={a.name} avatar={a} index={i} />
        ))}
      </div>

      <style>{`
        @keyframes wave { 0%,100% { height: 30%; } 50% { height: 100%; } }
      `}</style>
    </section>
  );
}

function AvatarCard({
  avatar: a,
  index,
}: {
  avatar: (typeof AVATARS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.07, ease }}
      className="group relative aspect-[3/4] overflow-hidden bg-ink border border-ink cursor-pointer"
    >
      <img
        src={a.src}
        alt=""
        className="absolute inset-0 w-full h-full object-cover grayscale-[0.1] contrast-[1.08] transition-transform duration-[1.2s] ease-[cubic-bezier(0.2,0.8,0.15,1)] group-hover:scale-[1.08]"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/20 pointer-events-none" />

      {/* Scanlines */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_2px,rgba(0,0,0,0.2)_2px_3px)] mix-blend-overlay pointer-events-none z-[2]" />

      {/* Tag */}
      <span className="absolute top-3 left-3 font-mono text-[10px] font-medium tracking-[0.16em] uppercase text-paper bg-black/50 px-2.5 py-1.5 z-[3] backdrop-blur-[4px]">
        AVTR/0{index + 1}
      </span>

      {/* Live indicator */}
      <span className="absolute top-3 right-3 font-mono text-[10px] font-medium tracking-[0.16em] uppercase text-accent inline-flex items-center gap-1.5 z-[3]">
        <b className="w-1.5 h-1.5 rounded-full bg-accent animate-[b2blink_1s_infinite]" /> LIVE
      </span>

      {/* Meta */}
      <div className="absolute left-3.5 right-3.5 bottom-3.5 text-paper z-[3]">
        <h4 className="font-heading font-bold text-[22px] tracking-[-0.02em] uppercase">{a.name}</h4>
        <div className="font-mono text-[10px] font-medium tracking-[0.14em] uppercase opacity-80 mt-1">
          {a.role}
        </div>
        {/* Audio waves */}
        <div className="flex gap-0.5 mt-2.5 items-end h-5">
          {[...Array(18)].map((_, j) => (
            <b
              key={j}
              className="inline-block w-[3px] bg-accent"
              style={{
                animationName: "wave",
                animationDuration: "1.2s",
                animationIterationCount: "infinite",
                animationDelay: `${j * 0.08}s`,
                height: `${30 + Math.random() * 70}%`,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
