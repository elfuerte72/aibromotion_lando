type ContactLink = {
  label: string;
  value?: string;
  href: string;
  external?: boolean;
};

const LINKS: ContactLink[] = [
  { label: "написать", value: "aibromotion@yandex.com", href: "mailto:aibromotion@yandex.com" },
  { label: "позвонить", value: "+7 921 777-13-43", href: "tel:+79217771343" },
  {
    label: "max",
    href: "https://max.ru/u/f9LHodD0cOI_SmX9Co8Gc-HUzTV_MKEmatXDazJ0SxWhKfTQmuXx1gyLWfs",
    external: true,
  },
  { label: "telegram", href: "https://t.me/topanton1", external: true },
];

/**
 * Mobile contact section + footer rolled into one. Anchor target for
 * the StickyMobileCTA (`#mobile-contact`). Solid ink background, no
 * `<video>`, no reveals, no scroll FX.
 */
export function MobileContact() {
  const year = new Date().getFullYear();

  return (
    <section
      id="mobile-contact"
      className="relative bg-ink text-paper px-5 pt-14 [padding-bottom:calc(env(safe-area-inset-bottom,0px)+96px)] overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(78% 60% at 100% 100%, rgba(255,74,28,0.28) 0%, rgba(255,74,28,0.05) 50%, rgba(255,74,28,0) 75%)",
        }}
      />

      <div className="relative">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/55 mb-4">
          Контакт
        </div>
        <a href="mailto:aibromotion@yandex.com" className="block">
          <p className="font-serif italic text-paper text-[clamp(40px,12vw,68px)] leading-[0.95] tracking-[-0.03em]">
            Покажем,
            <br />
            <span className="text-accent">что умеет AI.</span>
          </p>
        </a>

        <ul className="mt-10 flex flex-col gap-1">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-3 min-h-[52px] py-2 font-mono text-[11px] uppercase tracking-[0.24em] text-paper/65 active:text-paper transition-colors"
              >
                <span
                  aria-hidden
                  className="h-px w-6 bg-paper/30 group-active:bg-accent transition-colors shrink-0"
                />
                <span className="break-all">
                  {l.value ? `${l.label} — ${l.value}` : l.label}
                </span>
                <span aria-hidden className="ml-auto text-paper/55">↗</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-12 pt-6 border-t border-paper/15 flex flex-col gap-2 font-mono text-[9.5px] uppercase tracking-[0.2em] text-paper/40">
          <span>© {year} AIBROMOTION — все права защищены</span>
          <span className="normal-case tracking-[0.12em]">
            ИП Топилин Антон Валерьевич · ИНН 723006005500
          </span>
          <a
            href="/privacy.html"
            className="uppercase tracking-[0.2em] text-paper/55 active:text-paper transition-colors"
          >
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </section>
  );
}
