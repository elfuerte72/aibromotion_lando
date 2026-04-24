const ITEMS = [
  "Видеопродакшн",
  "Креативное направление",
  "Реклама",
  "Маркетинг",
  "ИИ-аватары",
  "ИИ-агенты",
  "Автоматизация",
];

export function TickerSection() {
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div className="bg-ink text-paper py-5 border-t border-b border-ink font-serif text-[clamp(26px,6.5vw,80px)] font-light tracking-[-0.04em] overflow-hidden whitespace-nowrap">
      <div className="flex ticker-scroll">
        <div className="flex shrink-0 ticker-track">
          {repeated.map((t, i) => (
            <span key={i} className="flex items-center">
              <span>{t}</span>
              <em className="italic text-accent mx-6 not-italic">※</em>
            </span>
          ))}
        </div>
        <div className="flex shrink-0 ticker-track">
          {repeated.map((t, i) => (
            <span key={i} className="flex items-center">
              <span>{t}</span>
              <em className="italic text-accent mx-6 not-italic">※</em>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes tickerScroll { to { transform: translateX(-100%); } }
        .ticker-track {
          --ticker-speed: 32s;
          animation: tickerScroll var(--ticker-speed) linear infinite;
          will-change: transform;
        }
        @media (max-width: 767px) {
          .ticker-track { --ticker-speed: 48s; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track {
            animation: none;
            transform: translateX(-20%);
          }
        }
      `}</style>
    </div>
  );
}
