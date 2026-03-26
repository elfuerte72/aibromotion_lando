import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

/* ── Data ── */

const PROMPT_LINES = [
  "> Анализирую данные клиента...",
  "> Создаю персональную стратегию...",
  "> Автоматизирую воронку продаж...",
  "> Подключаю AI-агентов...",
  "> Готово. Системы запущены.",
];

const HEADING_TEXT = "ДОБРО ПОЖАЛОВАТЬ В МИР АВТОМАТИЗАЦИИ";

/* ── Terminal typing (time-based, restarts on re-enter) ── */

function Terminal({ active }: { active: boolean }) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!active) {
      setLines([]);
      setCurrentText("");
      setLineIdx(0);
      setCharIdx(0);
      setStarted(false);
    } else if (!started) {
      const t = setTimeout(() => setStarted(true), 600);
      return () => clearTimeout(t);
    }
  }, [active, started]);

  useEffect(() => {
    if (!started || lineIdx >= PROMPT_LINES.length) return;

    const line = PROMPT_LINES[lineIdx];
    if (charIdx < line.length) {
      const t = setTimeout(() => {
        setCurrentText((p) => p + line[charIdx]);
        setCharIdx((p) => p + 1);
      }, 25 + Math.random() * 20);
      return () => clearTimeout(t);
    }

    const pause = lineIdx === PROMPT_LINES.length - 1 ? 0 : 350;
    const t = setTimeout(() => {
      setLines((p) => [...p, currentText]);
      setCurrentText("");
      setCharIdx(0);
      setLineIdx((p) => p + 1);
    }, pause);
    return () => clearTimeout(t);
  }, [started, lineIdx, charIdx, currentText]);

  const isLastLine = lineIdx === PROMPT_LINES.length - 1;
  const allDone = lineIdx >= PROMPT_LINES.length;

  return (
    <div className="font-body text-xs md:text-sm space-y-1.5 max-w-lg w-full">
      {lines.map((line, i) => (
        <div
          key={i}
          style={{
            color:
              i === PROMPT_LINES.length - 1
                ? "rgba(140,170,255,0.9)"
                : "rgba(255,255,255,0.5)",
          }}
        >
          {line}
        </div>
      ))}

      {!allDone && (
        <div
          className="flex items-center"
          style={{
            color: isLastLine
              ? "rgba(140,170,255,0.9)"
              : "rgba(255,255,255,0.5)",
          }}
        >
          <span>{currentText}</span>
          <span
            className="inline-block w-[6px] h-[14px] ml-0.5 shrink-0"
            style={{
              backgroundColor: isLastLine
                ? "rgba(140,170,255,0.6)"
                : "rgba(255,255,255,0.35)",
              animation: "t-blink 0.7s step-end infinite",
            }}
          />
        </div>
      )}

      {allDone && (
        <div className="flex items-center">
          <span
            className="inline-block w-[6px] h-[14px]"
            style={{
              backgroundColor: "rgba(140,170,255,0.6)",
              animation: "t-blink 0.7s step-end infinite",
            }}
          />
        </div>
      )}
    </div>
  );
}

/* ── Main component ── */

export function SectionTransition() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { margin: "-30% 0px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 30%"],
  });

  /* Background: white → deep navy via intermediate dark blue steps */
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35, 0.5],
    ["#ffffff", "#e8eaf6", "#1a1f4a", "#0a0e27"]
  );

  /* Heading letters */
  const letters = HEADING_TEXT.split("");

  /* Content fade */
  const contentOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.55],
    [0, 1]
  );

  /* Grain */
  const grainOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.4, 0.55, 0.8],
    [0, 0.12, 0.15, 0]
  );

  return (
    <motion.section
      ref={sectionRef}
      className="relative overflow-hidden -mb-px"
      style={{ backgroundColor }}
    >
      {/* Gradient glow orbs (visible on dark bg) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: contentOpacity }}
      >
        <div
          className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(90,120,220,0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-[20%] left-[10%] w-[400px] h-[250px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(60,80,180,0.15) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute bottom-[30%] right-[10%] w-[350px] h-[220px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(100,140,255,0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </motion.div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative px-8 md:px-16 lg:px-24 pt-32 md:pt-44 pb-10 md:pb-14 min-h-[70vh] flex flex-col justify-center"
      >
        {/* Heading — scroll-driven letter reveal */}
        <motion.div className="w-full mb-14" style={{ opacity: contentOpacity }}>
          <h2
            className="font-heading uppercase leading-[1.1] text-center text-white select-none"
            style={{ fontSize: "clamp(1.5rem, 4.5vw, 3.5rem)" }}
          >
            {letters.map((char, i) => {
              if (char === " ") return <span key={i}>{"\u00A0"}</span>;
              const start = 0.4 + (i / letters.length) * 0.25;
              const end = start + 0.04;
              return (
                <LetterSpan
                  key={i}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </h2>
        </motion.div>

        {/* Terminal — left-aligned, auto-types when in view */}
        <motion.div style={{ opacity: contentOpacity }}>
          <Terminal active={isInView} />
        </motion.div>
      </div>

      {/* Grain layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: grainOpacity,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          mixBlendMode: "multiply",
        }}
      />

      <style>{`
        @keyframes t-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </motion.section>
  );
}

/* ── Letter with scroll-driven opacity ── */

function LetterSpan({
  char,
  progress,
  range,
}: {
  char: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [6, 0]);

  return (
    <motion.span className="inline-block" style={{ opacity, y }}>
      {char}
    </motion.span>
  );
}
