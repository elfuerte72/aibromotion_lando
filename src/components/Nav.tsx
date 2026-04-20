import { useState, useEffect } from "react";
import { useLenis } from "lenis/react";

const NAV_LINKS = [
  { id: "showreel", label: "Работа" },
  { id: "services", label: "Услуги" },
  { id: "team", label: "Команда" },
];

export function Nav() {
  const [time, setTime] = useState("");
  const lenis = useLenis();

  useEffect(() => {
    const upd = () => {
      setTime(new Date().toLocaleTimeString("ru-RU", { timeZone: "Europe/Moscow", hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    upd();
    const id = setInterval(upd, 1000);
    return () => clearInterval(id);
  }, []);

  const handleClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    lenis?.scrollTo(`#${target}`, {
      offset: -80,
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-paper/75 backdrop-blur-[18px] border-b border-ink">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 bg-ink text-paper grid place-items-center font-serif italic text-lg font-light">
          a
        </div>
        <span className="font-heading font-extrabold text-base tracking-tight uppercase">
          aibromotion<span className="font-serif italic text-accent font-light">/</span>studio
        </span>
      </div>

      <div className="hidden md:flex font-mono text-[11px] font-medium tracking-[0.14em] uppercase">
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
          href="#contact"
          onClick={(e) => handleClick(e, "contact")}
          className="px-3.5 py-2.5 border border-accent bg-accent text-ink transition-all hover:brightness-110"
        >
          Связаться ↗
        </a>
      </div>

      <div className="hidden lg:block font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-muted text-right leading-tight">
        <span className="block">{time}</span>
        <span className="block text-[9px] text-accent">St. Petersburg</span>
      </div>
    </nav>
  );
}
