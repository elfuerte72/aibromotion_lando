import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const FOOT_TEXTS = [
  "Креативная студия, видеопродакшн и лаборатория ИИ-инструментов — всё под одной крышей.",
  "Работаем с брендами, у которых высокий потолок амбиций и короткий дедлайн.",
  "Снимаем кино, запускаем performance, обучаем агентов. Один подрядчик на весь стек.",
];

const ease: [number, number, number, number] = [0.2, 0.85, 0.15, 1];

export function Header() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      titleRef.current?.classList.add("ready");
      portraitRef.current?.classList.add("ready");
    }, 150);
    return () => clearTimeout(t);
  }, []);

  const footRef = useRef<HTMLDivElement>(null);
  const footInView = useInView(footRef, { once: true, margin: "-10%" });

  return (
    <section className="min-h-screen pt-[92px] px-6 pb-6 relative overflow-hidden flex flex-col">

      {/* Main: title + portrait */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-end mb-6">
        <h1
          ref={titleRef}
          className="font-heading font-extrabold uppercase leading-[0.84] tracking-[-0.055em] text-[clamp(60px,11vw,220px)] hero-title"
        >
          <div className="overflow-hidden relative">
            <span className="hero-line hero-l1 block">Снимаем.</span>
          </div>
          <div className="overflow-hidden relative">
            <span className="hero-line hero-l2 block font-serif italic font-light text-accent tracking-[-0.03em]">
              Монтируем.
            </span>
          </div>
          <div className="overflow-hidden relative">
            <span className="hero-line hero-l3 block outline-text">Запускаем.</span>
          </div>
          <div className="overflow-hidden relative">
            <span className="hero-line hero-l4 block">Автоматизируем.</span>
          </div>
        </h1>

        <div
          ref={portraitRef}
          className="relative aspect-[4/5] border border-ink overflow-hidden hero-portrait"
        >
          <img
            src="/media/hero.webp"
            alt=""
            className="w-full h-full object-cover grayscale-[0.2] contrast-[1.05] scale-[1.08] hero-portrait-img"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent pointer-events-none" />
          <span className="absolute top-3.5 left-3.5 font-mono text-[10px] font-medium tracking-[0.16em] uppercase text-paper">
            AIBRO/HERO—01
          </span>
          <span className="absolute top-3.5 right-3.5 font-mono text-[10px] font-medium tracking-[0.16em] uppercase text-accent inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-[b2blink_1s_infinite]" /> LIVE
          </span>
          <span className="absolute bottom-3.5 left-3.5 font-mono text-[10px] font-medium tracking-[0.16em] uppercase text-paper">
            St. Petersburg — 2026
          </span>
          <div className="absolute left-3.5 bottom-12 right-3.5 text-paper font-serif text-[clamp(24px,2.4vw,40px)] font-light tracking-tight leading-none">
            Каждый кадр — <em className="italic text-accent">бренд-задача</em>. Каждый пиксель — <em className="italic text-accent">вопрос.</em>
          </div>
        </div>
      </div>

      {/* Footer blurbs + CTA */}
      <div ref={footRef} className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_auto] gap-8 pt-5 border-t border-ink items-end">
        {FOOT_TEXTS.map((text, i) => (
          <motion.p
            key={i}
            className="text-[13px] leading-relaxed max-w-[280px]"
            initial={{ opacity: 0, y: 24 }}
            animate={footInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: i * 0.1, ease }}
          >
            {text}
          </motion.p>
        ))}
      </div>

      <style>{`
        @keyframes b2blink { 50% { opacity: 0.3; } }
        .hero-line {
          display: block;
          transform: translateY(105%);
          transition: transform 1.1s cubic-bezier(0.2, 0.85, 0.15, 1);
          will-change: transform;
        }
        .hero-title.ready .hero-line { transform: translateY(0); }
        .hero-l1 { transition-delay: 0.1s; }
        .hero-l2 { transition-delay: 0.25s; }
        .hero-l3 { transition-delay: 0.4s; }
        .hero-l4 { transition-delay: 0.55s; }
        .hero-portrait-img { transition: transform 8s ease-out; }
        .hero-portrait.ready .hero-portrait-img { transform: scale(1); }
      `}</style>
    </section>
  );
}
