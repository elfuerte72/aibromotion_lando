const ITEMS = [
  "Video production",
  "Creative direction",
  "Paid media",
  "AI avatars",
  "AI agents",
  "Ops automation",
];

export function TickerSection() {
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div className="bg-ink text-paper py-5 border-t border-b border-ink font-serif text-[clamp(32px,5vw,80px)] font-light tracking-[-0.04em] overflow-hidden whitespace-nowrap">
      <div className="flex ticker-scroll">
        <div className="flex shrink-0 animate-[tickerScroll_32s_linear_infinite]">
          {repeated.map((t, i) => (
            <span key={i} className="flex items-center">
              <span>{t}</span>
              <em className="italic text-accent mx-6 not-italic">※</em>
            </span>
          ))}
        </div>
        <div className="flex shrink-0 animate-[tickerScroll_32s_linear_infinite]">
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
      `}</style>
    </div>
  );
}
