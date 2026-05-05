export function ContactSection() {
  return (
    <section id="contact" className="pt-[60px] pb-10 px-6 bg-paper">
      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 pt-12">
        {/* Contact */}
        <div>
          <h5 className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-muted mb-5">
            Contact
          </h5>
          <a
            href="mailto:aibromotion@yandex.com"
            className="font-serif font-light text-[clamp(32px,3.6vw,64px)] italic text-accent tracking-[-0.03em] block"
          >
            aibromotion@yandex.com
          </a>
          <div className="mt-5 text-[15px] leading-relaxed text-ink-2">
            +7 921 777-13-43
          </div>
        </div>

        {/* Social */}
        <div>
          <h5 className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-muted mb-5">
            Social
          </h5>
          <ul className="flex flex-col gap-2.5 text-[15px]">
            <li>
              <a
                href="https://t.me/topanton1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors cursor-pointer"
              >
                Telegram
              </a>
            </li>
            <li>
              <a
                href="https://max.ru/u/f9LHodD0cOI_SmX9Co8Gc-HUzTV_MKEmatXDazJ0SxWhKfTQmuXx1gyLWfs"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors cursor-pointer"
              >
                MAX
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row justify-between mt-20 pt-6 border-t border-ink font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-muted gap-4">
        <div>&copy; 2026 AIBROMOTION — all rights reserved</div>
        <div>made in-house · no templates</div>
      </div>
    </section>
  );
}
