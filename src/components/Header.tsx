import { useEffect, useRef, useState } from "react";

export function Header() {
  const logoRef = useRef<HTMLHeadingElement>(null);
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    // Trigger on mount with a small delay for smoothness
    const t = setTimeout(() => setLogoVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <header className="bg-white pt-16">
      {/* Logo */}
      <div className="px-6 py-8 md:py-12 text-center overflow-hidden">
        <h1
          ref={logoRef}
          className="font-logo leading-none tracking-wide text-black"
          style={{
            fontSize: "clamp(3rem, 12vw, 12rem)",
            opacity: logoVisible ? 1 : 0,
            transform: logoVisible ? "scale(1)" : "scale(0.85)",
            transition: "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          AIBROMOTION
        </h1>
      </div>

      {/* Tagline row */}
      <div
        className="flex items-center justify-between px-6 py-4 md:px-10 border-t border-black"
        style={{
          opacity: logoVisible ? 1 : 0,
          transform: logoVisible ? "translateY(0)" : "translateY(15px)",
          transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
        }}
      >
        <span className="font-body text-xs md:text-sm uppercase tracking-[0.1em]">
          A new motion company
        </span>
        <a
          href="https://www.instagram.com/aibromotion/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-xs md:text-sm uppercase tracking-[0.1em] hover:opacity-60 transition-opacity"
        >
          @aibromotion
        </a>
      </div>
    </header>
  );
}
