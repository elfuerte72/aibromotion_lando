import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsTouch } from "@/lib/useDevice";

type ContactLinkProps = {
  label: string;
  value?: string;
  href: string;
  target?: string;
};

function ContactLink({ label, value, href, target }: ContactLinkProps) {
  return (
    <li>
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-white/55 hover:text-white transition-colors min-h-11 py-2"
      >
        <span className="h-px w-8 bg-white/30 group-hover:bg-accent group-hover:w-16 transition-all duration-500 shrink-0" />
        <span className="break-all">{value ? `${label} — ${value}` : label}</span>
        <span
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          ↗
        </span>
      </a>
    </li>
  );
}

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const year = new Date().getFullYear();
  const isTouch = useIsTouch();

  // Reveal driven by footer entering the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const revealProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const ctaOpacity = useTransform(revealProgress, [0, 0.45], [0, 1]);
  const ctaY = useTransform(revealProgress, [0, 0.45], [40, 0]);
  const videoScale = useTransform(revealProgress, [0, 1], [1.08, 1]);
  const flareOpacity = useTransform(revealProgress, [0, 0.7], [0.35, 1]);

  return (
    <footer
      ref={ref}
      id="contact"
      className="relative bg-[#0E0E0C] text-white overflow-hidden"
      style={{ minHeight: "clamp(520px, 78svh, 900px)" }}
    >
      {/* ─── Background layers ─────────────────────────────── */}
      {isTouch ? (
        // On touch devices we serve the poster-only (no `<video>`). A
        // muted autoplay loop is ~3-4MB of cellular traffic and decodes
        // continuously even behind other sections — not worth the cost
        // for a grayscale background plate.
        <picture aria-hidden>
          <source srcSet="/media/footer-bg.avif" type="image/avif" />
          <img
            src="/media/footer-bg.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "grayscale(1) contrast(1.15) brightness(0.55)" }}
          />
        </picture>
      ) : (
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/media/footer-bg.webp"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: "grayscale(1) contrast(1.15) brightness(0.55)",
            scale: videoScale,
          }}
        >
          <source
            src="/media/footer-reel-mobile.mp4"
            type="video/mp4"
            media="(max-width: 767px)"
          />
          <source src="/media/footer-reel.mp4" type="video/mp4" />
        </motion.video>
      )}

      {/* Ink veil */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(14,14,12,0.58)" }}
      />

      {/* Accent duotone wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none mix-blend-soft-light"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,74,28,0.18) 0%, rgba(255,74,28,0) 45%, rgba(255,74,28,0.28) 100%)",
        }}
      />

      {/* Top fade into ink */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #0E0E0C 0%, rgba(14,14,12,0) 100%)",
        }}
      />

      {/* Radial accent flare bottom-right */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: flareOpacity,
          background:
            "radial-gradient(62% 82% at 96% 108%, rgba(255,74,28,0.42) 0%, rgba(255,74,28,0.08) 45%, rgba(255,74,28,0) 70%)",
          filter: "blur(4px)",
        }}
      />

      {/* Film grain boost */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ─── Content ───────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col min-h-[inherit]">
        {/* Top hairline marker */}
        <div className="flex items-center justify-end px-5 md:px-10 h-10 border-b border-white/10 font-mono text-[10px] uppercase tracking-[0.28em]">
          <span className="text-white/40">{year}</span>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-between px-5 sm:px-6 md:px-12 py-12 sm:py-14 md:py-24">
          <motion.div style={{ opacity: ctaOpacity, y: ctaY }}>
            <a href="mailto:aibromotion@yandex.com" className="block">
              <p className="font-serif italic text-white text-[clamp(40px,11vw,128px)] leading-[0.95] tracking-[-0.03em]">
                Покажем,
                <br />
                <span className="text-accent">что умеет AI.</span>
              </p>
            </a>

            <ul className="mt-8 sm:mt-10 md:mt-14 flex flex-col gap-4 md:gap-5">
              <ContactLink
                label="написать"
                value="aibromotion@yandex.com"
                href="mailto:aibromotion@yandex.com"
              />
              <ContactLink
                label="позвонить"
                value="+7 921 777-13-43"
                href="tel:+79217771343"
              />
              <ContactLink
                label="max"
                href="https://max.ru/u/f9LHodD0cOI_SmX9Co8Gc-HUzTV_MKEmatXDazJ0SxWhKfTQmuXx1gyLWfs"
                target="_blank"
              />
              <ContactLink
                label="telegram"
                href="https://t.me/topanton1"
                target="_blank"
              />
            </ul>
          </motion.div>

        </div>

        {/* Colophon row */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-6 px-5 md:px-10 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/35 text-center"
          style={{
            paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)",
            paddingLeft: "calc(env(safe-area-inset-left, 0px) + 1.25rem)",
            paddingRight: "calc(env(safe-area-inset-right, 0px) + 1.25rem)",
          }}
        >
          <span>© {year} AIBROMOTION — all rights reserved</span>
          <span className="text-white/30 normal-case tracking-[0.14em] flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>ИП Топилин Антон Валерьевич · ИНН 723006005500</span>
            <span aria-hidden className="hidden sm:inline text-white/20">·</span>
            <a
              href="/privacy.html"
              className="uppercase tracking-[0.22em] text-white/45 hover:text-white transition-colors"
            >
              Политика конфиденциальности
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
