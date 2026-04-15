import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const RAINBOW = ["#FF0000", "#FF7700", "#FFDD00", "#00CC00", "#0088FF", "#5500FF", "#CC00CC"];
const LOGO = "AIBROMOTION";

const TYPEWRITER_WORDS = ["Продакшен.", "Маркетинг.", "Автоматизация.", "AI-агенты."];
const FINAL_TAGLINE = "От продакшена до полной автоматизации бизнеса";

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

function useTypewriterSequence(
  words: string[],
  active: boolean,
  initialDelay: number,
) {
  const [display, setDisplay] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!active) return;

    const TYPE_SPEED = 50;
    const DELETE_SPEED = 30;
    const PAUSE_AFTER_TYPE = 900;
    const PAUSE_AFTER_DELETE = 200;

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let t = initialDelay;

    timeouts.push(setTimeout(() => setIsTyping(true), initialDelay));

    for (const word of words) {
      for (let i = 0; i <= word.length; i++) {
        const text = word.slice(0, i);
        timeouts.push(setTimeout(() => setDisplay(text), t));
        t += TYPE_SPEED;
      }
      t += PAUSE_AFTER_TYPE;
      for (let i = word.length; i >= 0; i--) {
        const text = word.slice(0, i);
        timeouts.push(setTimeout(() => setDisplay(text), t));
        t += DELETE_SPEED;
      }
      t += PAUSE_AFTER_DELETE;
    }

    timeouts.push(
      setTimeout(() => {
        setIsTyping(false);
        setIsDone(true);
      }, t),
    );

    return () => timeouts.forEach(clearTimeout);
  }, [active, words, initialDelay]);

  return { display, isDone, isTyping };
}

export function Header() {
  const [ready, setReady] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [colors, setColors] = useState<Record<number, string>>({});

  const { display, isDone, isTyping } = useTypewriterSequence(
    TYPEWRITER_WORDS,
    ready,
    1500,
  );

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
            transition:
              "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
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

      {/* ── Typewriter → Tagline ── */}
      <div className="px-6 md:px-16 lg:px-24 pb-12 md:pb-20 text-center">
        <div className="relative min-h-[3rem] md:min-h-[4rem] flex items-center justify-center">
          {/* Cycling words */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: isDone ? 0 : 1 }}
            transition={{ duration: 0.4 }}
          >
            <span className="font-body text-xl md:text-3xl lg:text-4xl text-dark/50 tracking-tight">
              {display}
              {isTyping && (
                <motion.span
                  className="inline-block w-[2px] h-[1.1em] bg-dark/40 ml-0.5 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.53,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              )}
            </span>
          </motion.div>

          {/* Final tagline */}
          <motion.div
            className="flex items-center gap-4 md:gap-6"
            initial={{ opacity: 0, y: 6 }}
            animate={isDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          >
            <motion.div
              className="hidden md:block h-px w-12 bg-dark/20"
              initial={{ scaleX: 0, transformOrigin: "right" }}
              animate={isDone ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            />
            <p
              className="font-body text-dark/60 uppercase tracking-[0.15em]"
              style={{ fontSize: "clamp(0.7rem, 1.6vw, 1rem)" }}
            >
              {FINAL_TAGLINE}
            </p>
            <motion.div
              className="hidden md:block h-px w-12 bg-dark/20"
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={isDone ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            />
          </motion.div>
        </div>
      </div>
    </header>
  );
}
