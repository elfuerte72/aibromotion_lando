const TOOLS = [
  { name: "Claude", lbl: "Reasoning", icon: "/logos/claude.svg" },
  { name: "Runway", lbl: "Gen Video", icon: "/logos/runway.svg" },
  { name: "Sora", lbl: "Gen Video", icon: "/logos/sora.svg" },
  { name: "Veo", lbl: "Gen Video", icon: "/logos/veo.svg" },
  { name: "Midjourney", lbl: "Gen Image", icon: "/logos/midjourney.svg" },
  { name: "Kling", lbl: "Gen Video", icon: "/logos/kling.svg" },
  { name: "After FX", lbl: "Motion", icon: "/logos/after-effects.svg" },
  { name: "Premiere", lbl: "Edit", icon: "/logos/premiere-pro.svg" },
  { name: "DaVinci", lbl: "Color/Grade", icon: "/logos/davinci-resolve.svg" },
  { name: "Photoshop", lbl: "Retouch", icon: "/logos/photoshop.svg" },
];

export function StackSection() {
  const doubled = [...TOOLS, ...TOOLS];

  return (
    <section className="bg-ink text-paper py-[100px] px-6 border-b border-ink overflow-hidden">
      {/* Head */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-[60px] items-end">
        <div>
          <div className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-white/50 mb-4">
            [07] Stack
          </div>
          <h2 className="font-heading font-extrabold uppercase leading-[0.84] tracking-[-0.055em] text-[clamp(48px,7vw,110px)]">
            Инструменты<br />
            <span className="font-serif italic font-light tracking-[-0.03em]">под капотом.</span>
          </h2>
        </div>
        <div className="text-white/70 text-[15px] leading-relaxed max-w-[440px]">
          <p>Комбинируем то, что реально работает. Не фанатеем от одного инструмента — выбираем под задачу.</p>
        </div>
      </div>

      {/* Marquee */}
      <div className="flex gap-5 overflow-hidden -mx-6 px-6">
        <div className="flex gap-5 shrink-0 animate-[stackScroll_50s_linear_infinite]">
          {doubled.map((t, i) => (
            <div
              key={i}
              className="shrink-0 w-[200px] aspect-square border border-white/15 flex flex-col justify-between p-5 transition-all duration-400 hover:border-accent hover:bg-white/[0.02]"
            >
              <div className="flex justify-between items-start">
                <img className="w-12 h-12 invert brightness-100" src={t.icon} alt={t.name} />
                <span className="font-mono text-[11px] font-medium tracking-[0.14em] uppercase opacity-60">
                  [{String(((i % TOOLS.length) + 1)).padStart(2, "0")}]
                </span>
              </div>
              <div>
                <div className="font-mono text-[11px] font-medium tracking-[0.14em] uppercase opacity-60 mb-1.5">
                  {t.lbl}
                </div>
                <div className="font-heading font-bold text-xl tracking-[-0.02em] uppercase">
                  {t.name}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-5 shrink-0 animate-[stackScroll_50s_linear_infinite]">
          {doubled.map((t, i) => (
            <div
              key={i}
              className="shrink-0 w-[200px] aspect-square border border-white/15 flex flex-col justify-between p-5 transition-all duration-400 hover:border-accent hover:bg-white/[0.02]"
            >
              <div className="flex justify-between items-start">
                <img className="w-12 h-12 invert brightness-100" src={t.icon} alt={t.name} />
                <span className="font-mono text-[11px] font-medium tracking-[0.14em] uppercase opacity-60">
                  [{String(((i % TOOLS.length) + 1)).padStart(2, "0")}]
                </span>
              </div>
              <div>
                <div className="font-mono text-[11px] font-medium tracking-[0.14em] uppercase opacity-60 mb-1.5">
                  {t.lbl}
                </div>
                <div className="font-heading font-bold text-xl tracking-[-0.02em] uppercase">
                  {t.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes stackScroll { to { transform: translateX(-100%); } }
      `}</style>
    </section>
  );
}
