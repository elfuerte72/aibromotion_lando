import { useEffect, useRef } from "react";

/**
 * Mobile hero. One screen, no video, no Tegaki — just a tight typographic
 * statement + primary CTA. Animation is a single CSS slide-up triggered
 * after mount (no IntersectionObserver / framer-motion).
 */
export function MobileHero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      titleRef.current?.classList.add("ready");
    }, 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-[100svh] [padding-top:calc(env(safe-area-inset-top,0px)+72px)] px-5 pb-10 flex flex-col justify-between bg-paper text-ink">
      <header className="flex items-center justify-between gap-4">
        <a
          href="#"
          aria-label="AIBROMOTION"
          className="font-heading font-extrabold uppercase tracking-[-0.02em] text-[15px]"
        >
          AIBROMOTION
        </a>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
          [01] / Hello
        </span>
      </header>

      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-4">
          Видео · AI · Автоматизация
        </div>
        <h1
          ref={titleRef}
          className="mobile-hero-title font-heading font-extrabold uppercase leading-[0.9] tracking-[-0.045em] text-[clamp(44px,13.5vw,64px)]"
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

        <p className="mt-6 max-w-[28ch] text-[15px] leading-[1.45] text-ink-2">
          Производственная студия и AI-команда. Делаем видео и автоматизируем процессы для растущего бизнеса.
        </p>

        <a
          href="#mobile-contact"
          className="mt-8 inline-flex items-center justify-center gap-3 min-h-[52px] px-6 rounded-full bg-ink text-paper font-heading font-semibold uppercase tracking-[0.06em] text-[14px] active:scale-[0.98] transition-transform"
        >
          Обсудить проект
          <span aria-hidden className="text-accent">↗</span>
        </a>
      </div>

      <style>{`
        .mobile-hero-title .hero-line {
          display: block;
          transform: translateY(105%);
          transition: transform 0.9s cubic-bezier(0.2, 0.85, 0.15, 1);
          will-change: transform;
        }
        .mobile-hero-title.ready .hero-line { transform: translateY(0); }
        .mobile-hero-title .hero-l1 { transition-delay: 0.05s; }
        .mobile-hero-title .hero-l2 { transition-delay: 0.18s; }
        .mobile-hero-title .hero-l3 { transition-delay: 0.31s; }
        .mobile-hero-title .hero-l4 {
          transition-delay: 0.44s;
          font-size: 0.82em;
          letter-spacing: -0.06em;
        }
        @media (prefers-reduced-motion: reduce) {
          .mobile-hero-title .hero-line {
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
