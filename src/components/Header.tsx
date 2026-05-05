import { useEffect, useRef } from "react";

export function Header() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      titleRef.current?.classList.add("ready");
    }, 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="min-h-screen [padding-top:calc(env(safe-area-inset-top,0px)+72px)] sm:pt-[84px] lg:pt-[92px] px-5 sm:px-6 pb-8 sm:pb-6 relative overflow-hidden flex flex-col justify-end">
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

      <style>{`
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
        .hero-l4 {
          transition-delay: 0.55s;
          font-size: 0.78em;
          letter-spacing: -0.07em;
        }
      `}</style>
    </section>
  );
}
