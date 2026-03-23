import { ScrollReveal } from "@/components/ScrollReveal";

export function Footer() {
  return (
    <footer className="bg-white border-t border-black">
      {/* Large logo */}
      <ScrollReveal>
        <div className="px-6 py-10 md:py-16 text-center">
          <span
            className="font-logo leading-none tracking-wide text-black"
            style={{ fontSize: "clamp(3rem, 12vw, 11rem)" }}
          >
            AIBROMOTION
          </span>
        </div>
      </ScrollReveal>

      {/* Bottom bar */}
      <ScrollReveal delay={0.1}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-6 md:px-10 border-t border-black">
          <p className="font-body text-[10px] md:text-xs uppercase tracking-[0.1em] text-black/60">
            AIBROMOTION© {new Date().getFullYear()} ALL RIGHTS RESERVED
          </p>
          <a
            href="https://www.instagram.com/aibromotion/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[10px] md:text-xs uppercase tracking-[0.1em] hover:opacity-60 transition-opacity"
          >
            @AIBROMOTION
          </a>
        </div>
      </ScrollReveal>
    </footer>
  );
}
