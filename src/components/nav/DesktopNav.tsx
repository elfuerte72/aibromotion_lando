import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { Logo } from "@/components/Logo";
import { CONTACT_LINK, NAV_LINKS, scrollToAnchor, scrollToTop } from "./navLinks";

/**
 * Desktop / tablet navigation. Identical to the pre-mobile-adaptation
 * `Nav.tsx` — extracted so `Nav.tsx` can swap in a mobile drawer on
 * narrow viewports.
 */
export function DesktopNav() {
  const [time, setTime] = useState("");
  const lenis = useLenis();

  useEffect(() => {
    const upd = () => {
      setTime(
        new Date().toLocaleTimeString("ru-RU", {
          timeZone: "Europe/Moscow",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };
    upd();
    const id = setInterval(upd, 1000);
    return () => clearInterval(id);
  }, []);

  const handleClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    scrollToAnchor(target, lenis);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-paper/75 backdrop-blur-[18px] border-b border-ink">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          scrollToTop(lenis);
        }}
        aria-label="AIBROMOTION — в начало страницы"
        className="flex items-center"
      >
        <Logo height={48} priority />
      </a>

      <div className="flex font-mono text-[11px] font-medium tracking-[0.14em] uppercase">
        {NAV_LINKS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className="px-3.5 py-2.5 border border-ink border-r-0 last:border-r transition-all hover:bg-ink hover:text-paper"
          >
            {item.label}
          </a>
        ))}
        <a
          href={`#${CONTACT_LINK.id}`}
          onClick={(e) => handleClick(e, CONTACT_LINK.id)}
          className="cta-pulse px-3.5 py-2.5 border border-accent bg-accent text-ink transition-[filter] hover:brightness-110"
        >
          {CONTACT_LINK.label}
        </a>
      </div>

      <div className="hidden lg:block font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-muted text-right leading-tight">
        <span className="block">{time}</span>
        <span className="block text-[9px] text-accent">St. Petersburg</span>
      </div>
    </nav>
  );
}
