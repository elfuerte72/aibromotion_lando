import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { CONTACT_LINK, NAV_LINKS, scrollToAnchor } from "./navLinks";

const ease: [number, number, number, number] = [0.2, 0.85, 0.15, 1];

const CONTACTS = [
  { label: "написать", value: "aibromotion@yandex.com", href: "mailto:aibromotion@yandex.com" },
  { label: "позвонить", value: "+7 921 777-13-43", href: "tel:+79217771343" },
  { label: "telegram", href: "https://t.me/topanton1" },
  {
    label: "max",
    href: "https://max.ru/u/f9LHodD0cOI_SmX9Co8Gc-HUzTV_MKEmatXDazJ0SxWhKfTQmuXx1gyLWfs",
  },
];

/**
 * Full-screen drawer navigation for phones. Burger toggles a sliding
 * panel with large anchor links and contact shortcuts. Uses Framer
 * Motion for slide-in, with reduced-motion fallback handled by the
 * global CSS override (transitions collapse to 0.001ms).
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");
  const lenis = useLenis();

  useEffect(() => {
    const upd = () => {
      setTime(
        new Date().toLocaleTimeString("ru-RU", {
          timeZone: "Europe/Moscow",
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };
    upd();
    const id = setInterval(upd, 1000);
    return () => clearInterval(id);
  }, []);

  // Lock body scroll while the drawer is open. On touch devices Lenis
  // isn't active, so we toggle `overflow: hidden` on the document body
  // directly — iOS Safari still allows the drawer itself to scroll.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const original = document.body.style.overflow;
    if (open) {
      document.body.style.overflow = "hidden";
      console.debug("[MobileNav] scroll-lock=on");
    } else {
      document.body.style.overflow = original || "";
    }
    return () => {
      document.body.style.overflow = original || "";
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  // Esc key closes the drawer — keyboard a11y.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const handleAnchorClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    close();
    // Defer scroll until after drawer exit animation — keeps focus stable.
    window.setTimeout(() => scrollToAnchor(id, lenis), 320);
  };

  return (
    <>
      {/* Top bar — burger + logo */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3 bg-paper/85 backdrop-blur-[18px] border-b border-ink"
        style={{
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 0.5rem)",
          paddingLeft: "calc(env(safe-area-inset-left, 0px) + 1.25rem)",
          paddingRight: "calc(env(safe-area-inset-right, 0px) + 1.25rem)",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-ink text-paper grid place-items-center font-serif italic text-lg font-light">
            a
          </div>
          <span className="font-heading font-extrabold text-sm tracking-tight uppercase">
            aibromotion
            <span className="font-serif italic text-accent font-light">/</span>
            studio
          </span>
        </div>

        <button
          type="button"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          aria-controls="mobile-nav-drawer"
          onClick={() => setOpen((v) => !v)}
          className="relative w-11 h-11 grid place-items-center border border-ink"
        >
          <span className="sr-only">{open ? "Закрыть" : "Меню"}</span>
          <span aria-hidden className="flex flex-col gap-1.5">
            <span
              className="block w-5 h-[2px] bg-ink transition-transform duration-300"
              style={{ transform: open ? "translateY(7px) rotate(45deg)" : "none" }}
            />
            <span
              className="block w-5 h-[2px] bg-ink transition-opacity duration-200"
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className="block w-5 h-[2px] bg-ink transition-transform duration-300"
              style={{ transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }}
            />
          </span>
        </button>
      </nav>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={close}
              aria-hidden
            />

            <motion.div
              key="drawer"
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Меню навигации"
              className="fixed inset-y-0 right-0 z-50 w-[min(86vw,420px)] bg-accent text-ink flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease }}
              style={{
                paddingTop: "calc(env(safe-area-inset-top, 0px) + 1.25rem)",
                paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)",
              }}
            >
              {/* Close */}
              <div className="flex items-center justify-between px-5 sm:px-6 pb-4">
                <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/70">
                  SPB — {time}
                </span>
                <button
                  type="button"
                  aria-label="Закрыть меню"
                  onClick={close}
                  className="w-11 h-11 grid place-items-center border border-ink"
                >
                  <span aria-hidden className="text-xl leading-none">
                    ×
                  </span>
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 px-5 sm:px-6 flex flex-col gap-1 justify-center">
                {[...NAV_LINKS, CONTACT_LINK].map((item, idx) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleAnchorClick(e, item.id)}
                    className="font-heading font-extrabold uppercase tracking-[-0.04em] text-[clamp(32px,8vw,56px)] leading-[1.05] py-2 border-b border-ink/20 last:border-b-0"
                  >
                    <span className="font-mono font-medium tracking-[0.22em] text-[11px] text-ink/60 mr-3 align-middle">
                      [0{idx + 1}]
                    </span>
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Contacts */}
              <ul className="px-5 sm:px-6 pt-6 border-t border-ink/20 flex flex-col gap-3">
                {CONTACTS.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] min-h-11"
                    >
                      <span>{c.value ? `${c.label} — ${c.value}` : c.label}</span>
                      <span aria-hidden>↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
