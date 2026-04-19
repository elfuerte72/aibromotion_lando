import { useState } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";

const NAV_ITEMS = [
  { id: "creative", label: "Креатив" },
  { id: "marketing", label: "Маркетинг" },
  { id: "automation", label: "Автоматизация" },
  { id: "about", label: "О компании" },
];

export function Nav() {
  const [activeSection, setActiveSection] = useState<string>("");
  const lenis = useLenis();

  /* Scroll spy — определяет активную секцию */
  useLenis(() => {
    const offset = 200;
    for (const item of [...NAV_ITEMS].reverse()) {
      const el = document.getElementById(item.id);
      if (el && el.getBoundingClientRect().top <= offset) {
        setActiveSection(item.id);
        return;
      }
    }
    setActiveSection("");
  });

  const handleClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    lenis?.scrollTo(`#${target}`, {
      offset: -80,
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black">
      <div className="flex items-center justify-between px-6 py-5 md:px-10">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className="relative font-body text-xs md:text-sm uppercase tracking-[0.15em] hover:opacity-60 transition-opacity"
          >
            {item.label}
            {activeSection === item.id && (
              <motion.div
                layoutId="nav-underline"
                className="absolute -bottom-2 left-0 right-0 h-px bg-black"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
          </a>
        ))}
      </div>
    </nav>
  );
}
