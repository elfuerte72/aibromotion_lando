type Client = {
  name: string;
  meta: string;
  href?: string;
};

const CLIENTS: Client[] = [
  {
    name: "love & pay",
    meta: "Финтех · Performance + AI-агент",
    href: "https://loveandpay.com/",
  },
  {
    name: "Трак Холдинг",
    meta: "Логистика · Контент-серия",
    href: "https://xn----7sbkdujisfqv4b.xn--p1ai/",
  },
  {
    name: "Арктика",
    meta: "FMCG · Видео-продакшн",
  },
  {
    name: "РусЭко",
    meta: "Эко-индустрия · SMM + автоматизация",
    href: "https://ruseco72.ru/",
  },
];

/**
 * Mobile trusted-by — editorial credits list. No logos, no italics:
 * client name as Inter Tight extrabold uppercase, sector + what we did
 * underneath in mono. Tap on a row with `href` opens the client's site
 * in a new tab.
 */
export function MobileTrusted() {
  return (
    <section className="bg-paper px-5 py-16 border-t border-ink/10">
      <div className="mb-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-3">
          Нам доверяют
        </div>
        <h2 className="font-heading font-extrabold uppercase leading-[0.88] tracking-[-0.04em] text-[clamp(36px,10.5vw,52px)]">
          Нам доверяют.
        </h2>
        <p className="mt-4 max-w-[34ch] text-[14.5px] leading-[1.5] text-ink-2">
          Кому верят на слово, тому верят и нам — клиенты, с которыми вышли за рамки одного проекта.
        </p>
      </div>

      <ol className="border-t border-ink/15">
        {CLIENTS.map((c) => {
          const Row = (
            <div className="flex items-start gap-4 py-5">
              <div className="flex-1 min-w-0">
                <div className="font-heading font-extrabold uppercase text-ink leading-[1.05] tracking-[-0.025em] text-[clamp(22px,6.4vw,28px)]">
                  {c.name}
                  <span className="text-accent">.</span>
                </div>
                <div className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-2">
                  {c.meta}
                </div>
              </div>
              {c.href && (
                <span
                  aria-hidden
                  className="shrink-0 mt-1 font-mono text-[14px] leading-none text-accent"
                >
                  ↗
                </span>
              )}
            </div>
          );

          return (
            <li key={c.name} className="border-b border-ink/15">
              {c.href ? (
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block active:opacity-70 transition-opacity"
                >
                  {Row}
                </a>
              ) : (
                Row
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-8 flex items-baseline gap-4">
        <span className="font-heading font-extrabold text-accent leading-none text-[clamp(34px,10vw,46px)] tracking-[-0.03em] tabular-nums">
          12+
        </span>
        <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted max-w-[22ch]">
          компаний — три из них работают с нами 4-й год подряд
        </span>
      </div>
    </section>
  );
}
