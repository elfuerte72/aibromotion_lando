import { useCallback, useEffect, useRef, useState } from "react";

const RAINBOW = ["#FF0000", "#FF7700", "#FFDD00", "#00CC00", "#0088FF", "#5500FF", "#CC00CC"];
const LOGO = "AIBROMOTION";

function randomColor() {
  return RAINBOW[Math.floor(Math.random() * RAINBOW.length)];
}

export function Header() {
  const logoRef = useRef<HTMLHeadingElement>(null);
  const [logoVisible, setLogoVisible] = useState(false);
  const [colors, setColors] = useState<Record<number, string>>({});

  useEffect(() => {
    const t = setTimeout(() => setLogoVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleEnter = useCallback((i: number) => {
    setColors((prev) => ({ ...prev, [i]: randomColor() }));
  }, []);

  const handleLeave = useCallback((i: number) => {
    setColors((prev) => {
      const next = { ...prev };
      delete next[i];
      return next;
    });
  }, []);

  return (
    <header className="bg-white pt-16">
      {/* Logo */}
      <div className="px-6 py-8 md:py-12 text-center overflow-hidden">
        <h1
          ref={logoRef}
          className="font-logo leading-none tracking-wide"
          style={{
            fontSize: "clamp(3rem, 12vw, 12rem)",
            opacity: logoVisible ? 1 : 0,
            transform: logoVisible ? "scale(1)" : "scale(0.85)",
            transition: "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {LOGO.split("").map((char, i) => (
            <span
              key={i}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={() => handleLeave(i)}
              style={{
                color: colors[i] || "#000000",
                transition: "color 0.3s ease",
                display: "inline-block",
                cursor: "pointer",
              }}
            >
              {char}
            </span>
          ))}
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
