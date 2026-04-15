import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const RAINBOW = ["#FF0000", "#FF7700", "#FFDD00", "#00CC00", "#0088FF", "#5500FF", "#CC00CC"];
const LOGO = "AIBROMOTION";

const STATS = [
  { value: 150, suffix: "+", label: "Процессов автоматизировано" },
  { value: 500, suffix: "+", label: "Единиц контента создано" },
  { value: 40, suffix: "+", label: "Бизнесов усилены с AI" },
  { value: 10000, suffix: "+", label: "Часов сэкономлено клиентам" },
];

const SCRAMBLE_CHARS = "0123456789#$%&@!?";

function randomColor() {
  return RAINBOW[Math.floor(Math.random() * RAINBOW.length)];
}

function getLetterScale(i: number, hoveredIndex: number | null): number {
  return i === hoveredIndex ? 1.25 : 1;
}

function getLetterY(i: number, hoveredIndex: number | null): number {
  return i === hoveredIndex ? -6 : 0;
}

const springTransition = { type: "spring" as const, stiffness: 400, damping: 15, mass: 0.8 };

function useScrambleNumber(target: string, delay: number, active: boolean) {
  const [display, setDisplay] = useState(target.replace(/[^\s]/g, " "));
  const raf = useRef(0);

  useEffect(() => {
    if (!active) { setDisplay(target.replace(/[^\s]/g, " ")); return; }

    const timeout = setTimeout(() => {
      const chars = target.split("");
      const settled = new Array(chars.length).fill(false);
      const scrambleDuration = 800;
      const settleStagger = scrambleDuration / chars.length;
      const t0 = performance.now();

      const tick = (now: number) => {
        const elapsed = now - t0;
        const result: string[] = [];

        for (let i = 0; i < chars.length; i++) {
          const settleAt = i * settleStagger;
          if (chars[i] === " " || chars[i] === "," || chars[i] === ".") {
            result.push(chars[i]);
            settled[i] = true;
          } else if (elapsed > settleAt + 300) {
            result.push(chars[i]);
            settled[i] = true;
          } else {
            result.push(SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]);
          }
        }

        setDisplay(result.join(""));
        if (!settled.every(Boolean)) {
          raf.current = requestAnimationFrame(tick);
        }
      };
      raf.current = requestAnimationFrame(tick);
    }, delay);

    return () => { clearTimeout(timeout); cancelAnimationFrame(raf.current); };
  }, [active, target, delay]);

  return display;
}

function formatStatValue(value: number): string {
  if (value >= 10000) return `${Math.round(value / 1000)}K`;
  if (value >= 1000) return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return `${value}`;
}

function StatItem({ stat, index, active }: {
  stat: typeof STATS[number];
  index: number;
  active: boolean;
}) {
  const finalText = formatStatValue(stat.value) + stat.suffix;
  const scrambled = useScrambleNumber(finalText, 1800 + index * 200, active);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: 1.6 + index * 0.15 }}
      >
        <span
          className="font-body text-2xl md:text-4xl tracking-tight text-dark block"
          style={{ fontVariantNumeric: "tabular-nums", fontWeight: 300 }}
        >
          {scrambled}
        </span>
      </motion.div>
      <motion.div
        className="mt-1 overflow-hidden"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={active ? { clipPath: "inset(0 0% 0 0)" } : {}}
        transition={{
          duration: 0.7,
          delay: 2.0 + index * 0.15,
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        <span className="font-body text-[9px] md:text-[11px] uppercase tracking-[0.15em] text-dark/40">
          {stat.label}
        </span>
      </motion.div>
    </div>
  );
}

export function Header() {
  const [ready, setReady] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [colors, setColors] = useState<Record<number, string>>({});

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  const handleEnter = useCallback((i: number) => {
    setHoveredIndex(i);
    setColors((prev) => ({ ...prev, [i]: randomColor() }));
  }, []);

  const handleLeave = useCallback((i: number) => {
    setHoveredIndex(null);
    setColors((prev) => {
      const next = { ...prev };
      delete next[i];
      return next;
    });
  }, []);

  return (
    <header className="bg-white pt-16">
      {/* ── Logo with per-letter animation ── */}
      <div className="px-6 py-8 md:py-12 text-center overflow-hidden">
        <h1
          className="font-logo leading-none tracking-wide"
          style={{
            fontSize: "clamp(3rem, 12vw, 12rem)",
            opacity: ready ? 1 : 0,
            transform: ready ? "scale(1)" : "scale(0.85)",
            transition: "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {LOGO.split("").map((char, i) => {
            const color = colors[i] || "#000000";
            const isActive = colors[i] !== undefined;

            return (
              <motion.span
                key={i}
                onMouseEnter={() => handleEnter(i)}
                onMouseLeave={() => handleLeave(i)}
                animate={{
                  scale: getLetterScale(i, hoveredIndex),
                  y: getLetterY(i, hoveredIndex),
                  color,
                }}
                transition={{
                  scale: springTransition,
                  y: springTransition,
                  color: { duration: 0.3, ease: "easeOut" },
                }}
                style={{
                  display: "inline-block",
                  cursor: "pointer",
                  textShadow: isActive
                    ? `0 0 8px ${color}, 0 0 25px ${color}40`
                    : "none",
                  transition: "text-shadow 0.3s ease",
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </h1>
      </div>

      {/* ── Stats + Quote ── */}
      <div className="px-6 md:px-16 lg:px-24 pb-10 md:pb-16">
        <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-end">
          {/* Stats 2×2 */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {STATS.map((stat, i) => (
              <StatItem key={stat.label} stat={stat} index={i} active={ready} />
            ))}
          </div>

          {/* Quote */}
          <div className="flex flex-col max-w-lg">
            <motion.div
              className="h-px bg-dark/15"
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={ready ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, delay: 1.0, ease: EASE }}
            />
            <motion.div
              className="py-5 md:py-6"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={ready ? { clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{ duration: 1, delay: 1.2, ease: [0.76, 0, 0.24, 1] }}
            >
              <p
                className="font-script text-dark/90"
                style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)" }}
              >
                Мы создаём невозможное.
              </p>
              <p className="font-body text-sm md:text-base text-dark/50 mt-2 leading-relaxed">
                AI и motion design объединяются, чтобы оживить любую идею.
              </p>
            </motion.div>
            <motion.div
              className="h-px bg-dark/15"
              initial={{ scaleX: 0, transformOrigin: "right" }}
              animate={ready ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, delay: 1.6, ease: EASE }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
