import { useEffect, useRef } from "react";

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

  return (
    <section className="min-h-screen pt-[72px] sm:pt-[84px] lg:pt-[92px] px-5 sm:px-6 pb-5 sm:pb-6 relative overflow-hidden flex flex-col">

      {/* Main: title + portrait */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-end">
        <h1
          ref={titleRef}
          className="font-heading font-extrabold uppercase leading-[0.88] sm:leading-[0.84] tracking-[-0.055em] text-[clamp(44px,12vw,200px)] hero-title"
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
          className="relative aspect-[3/4] sm:aspect-[4/5] border border-ink overflow-hidden hero-portrait"
        >
          <picture>
            <source srcSet="/media/hero.avif" type="image/avif" />
            <img
              src="/media/hero.webp"
              alt=""
              className="w-full h-full object-cover grayscale-[0.2] contrast-[1.05] scale-[1.08] hero-portrait-img"
            />
          </picture>
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
          <div className="absolute left-3.5 bottom-10 sm:bottom-12 right-3.5 text-paper font-serif text-[clamp(18px,4.5vw,40px)] font-light tracking-tight leading-none">
            Каждый кадр — <em className="italic text-accent">бренд-задача</em>. Каждый пиксель — <em className="italic text-accent">вопрос.</em>
          </div>
        </div>
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
