import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

const MINIS = [
  { v: "/media/heroes.mp4", l: "Heroes Campaign" },
  { v: "/media/result.mp4", l: "Forma Sales Bot" },
  { v: "/media/basket.mp4", l: "Retail AI" },
  { v: "/media/robot.mp4", l: "Robot Spot" },
];

export function ShowreelSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="showreel" className="bg-ink text-paper pt-[100px] pb-[120px] border-b border-ink relative overflow-hidden">
      {/* Head */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 pb-10">
        <div>
          <div className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-white/50 mb-4">
            [02] Showreel / 2026
          </div>
          <h2 className="font-heading font-extrabold uppercase leading-[0.84] tracking-[-0.055em] text-[clamp(56px,9vw,160px)]">
            Смотреть<br />
            <span className="font-serif italic font-light tracking-[-0.03em]">движение.</span>
          </h2>
        </div>
        <div className="text-white/70 text-[15px] leading-relaxed max-w-[440px] self-end">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.12, ease }}
          >
            Полторы минуты нарезки работ за последние 14 месяцев. 28 проектов, 9 стран, 4 языка озвучки, ноль компромиссов.
          </motion.p>
        </div>
      </div>

      {/* Main video frame */}
      <div ref={ref} className="relative mx-6 aspect-[21/9] overflow-hidden border border-white/15">
        <video
          src="/media/timeline.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-[0.85] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(0,0,0,0.65)_90%)] pointer-events-none" />

        {/* Corner labels */}
        <span className="absolute top-3.5 left-3.5 font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-white/80 z-[3]">
          ● REC — SR/2026
        </span>
        <span className="absolute top-3.5 right-3.5 font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-white/80 z-[3]">
          01:27 / 01:42
        </span>
        <span className="absolute bottom-6 left-3.5 font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-white/80 z-[3]">
          AIBRO/SR—04
        </span>
        <span className="absolute bottom-6 right-3.5 font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-accent z-[3]">
          TIMELINE EDIT
        </span>

        {/* Progress bar */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 h-0.5 bg-white/20 z-[3]">
          <div className="w-[38%] h-full bg-accent" />
        </div>
      </div>

      {/* Mini thumbnails */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mx-6 mt-5">
        {MINIS.map((m, i) => (
          <motion.div
            key={i}
            className="aspect-video relative overflow-hidden border border-white/12 cursor-pointer group"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: i * 0.07, ease }}
          >
            <video
              src={m.v}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover grayscale-[0.4] brightness-75 transition-all duration-500 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.03]"
            />
            <div className="absolute left-2.5 bottom-2.5 font-mono text-[10px] font-medium tracking-[0.14em] uppercase text-paper">
              [0{i + 1}] {m.l}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
