export function Footer() {
  return (
    <footer
      className="fixed bottom-0 left-0 w-full bg-[#252525] text-white"
      style={{ height: "var(--footer-h)", zIndex: 0 }}
    >
      <div className="max-w-[1800px] mx-auto h-full flex flex-col justify-between">
        {/* Top: CTA */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-16 py-12">
          <p className="font-body text-[10px] uppercase tracking-[0.2em] text-white/30 mb-6">
            What's next?
          </p>
          <a
            href="mailto:hello@aibromotion.com"
            className="group inline-block"
          >
            <h2
              className="font-heading uppercase leading-[0.95] text-white group-hover:text-white/70 transition-colors duration-500"
              style={{ fontSize: "clamp(2.2rem, 6vw, 5.5rem)" }}
            >
              LET'S CREATE
              <br />
              <span className="text-salmon">TOGETHER</span>
            </h2>
          </a>
          <p className="font-body text-sm md:text-base text-white/40 mt-6 max-w-lg">
            Есть идея? Напишите нам — мы превратим её в визуальное высказывание.
          </p>
        </div>

        {/* Contact row */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/10">
          <div className="px-6 py-5 md:py-6 md:border-r border-white/10 text-center md:text-left">
            <p className="font-body text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1">
              Email
            </p>
            <a
              href="mailto:hello@aibromotion.com"
              className="font-body text-sm text-white/70 hover:text-white transition-colors"
            >
              hello@aibromotion.com
            </a>
          </div>
          <div className="px-6 py-5 md:py-6 md:border-r border-white/10 text-center border-t md:border-t-0 border-white/10">
            <p className="font-body text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1">
              Social
            </p>
            <a
              href="https://www.instagram.com/aibromotion/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-white/70 hover:text-white transition-colors"
            >
              @aibromotion
            </a>
          </div>
          <div className="px-6 py-5 md:py-6 text-center md:text-right border-t md:border-t-0 border-white/10">
            <p className="font-body text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1">
              Based in
            </p>
            <span className="font-body text-sm text-white/70">
              Worldwide · Remote
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 px-6 py-5 md:px-16 border-t border-white/10">
          <span
            className="font-logo leading-none tracking-wide text-white/20"
            style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
          >
            AIBROMOTION
          </span>
          <p className="font-body text-[10px] md:text-xs uppercase tracking-[0.1em] text-white/30">
            © {new Date().getFullYear()} ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
}
