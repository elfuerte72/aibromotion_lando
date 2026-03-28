export function Footer() {

  return (
    <footer
      className="fixed bottom-0 left-0 w-full text-white overflow-hidden"
      style={{ height: "var(--footer-h)", zIndex: 0 }}
    >
      {/* Background image */}
      <img
        src="/media/footer-bg.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 15%" }}
        loading="lazy"
        decoding="async"
      />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#252525] via-[#252525]/70 to-black/40" />

      {/* Extra bottom fade for seamless blend into contact rows */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#252525] to-transparent" />

      <div className="relative z-10 max-w-[1800px] mx-auto h-full flex flex-col justify-between">
        {/* Top: spacer for image visibility */}
        <div className="flex-1" />

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
          <img
            src="/media/aibromotion-logo.png"
            alt="AIBROMOTION"
            className="h-[clamp(1.5rem,4vw,3rem)] w-auto opacity-20"
          />
          <p className="font-body text-[10px] md:text-xs uppercase tracking-[0.1em] text-white/30">
            © {new Date().getFullYear()} ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
}
