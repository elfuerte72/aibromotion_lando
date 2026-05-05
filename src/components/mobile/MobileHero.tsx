import { useEffect, useRef } from "react";
import { Logo } from "@/components/Logo";

/**
 * Mobile hero. One screen, no video, no Tegaki — just a tight typographic
 * statement. Primary CTA is the global StickyMobileCTA, so the hero
 * doesn't repeat it.
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
    <section className="relative [padding-top:calc(env(safe-area-inset-top,0px)+20px)] px-5 pt-5 pb-12 bg-paper text-ink">
      <header className="flex items-center mb-6">
        <a href="#" aria-label="AIBROMOTION — в начало страницы" className="flex items-center">
          <Logo variant="mark" height={56} priority />
        </a>
      </header>

      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-4">
          Видео · AI · Автоматизация
        </div>
        <h1
          ref={titleRef}
          className="mobile-hero-title font-heading font-extrabold uppercase leading-[0.9] tracking-[-0.045em] text-[clamp(36px,11vw,54px)]"
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
            <span className="hero-line hero-l3 block">Запускаем.</span>
          </div>
          <div className="overflow-hidden relative">
            <span className="hero-line hero-l4 block">Автоматизируем.</span>
          </div>
        </h1>

        <p className="mt-6 max-w-[28ch] text-[15px] leading-[1.45] text-ink-2">
          Производственная студия и AI-команда. Делаем видео и автоматизируем процессы для растущего бизнеса.
        </p>
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
