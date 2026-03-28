import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "framer-motion";

/* ── Data ─────────────────────────────────────────────── */

const SERVICES = [
  {
    title: "Умная обработка заявок",
    desc: "AI сам разбирает входящие заявки, определяет кто готов купить, а кому нужно время. Горячие клиенты сразу попадают к менеджеру, остальные получают автоматические письма.",
    metric: "4×",
    metricLabel: "быстрее обработка",
  },
  {
    title: "Поддержка клиентов 24/7",
    desc: "AI-помощник отвечает клиентам мгновенно — в мессенджерах, на сайте, по почте. Понимает суть вопроса и решает его сам. Если не справляется — передаёт живому оператору.",
    metric: "92%",
    metricLabel: "вопросов решает AI",
  },
  {
    title: "Автоматические отчёты",
    desc: "Каждое утро AI собирает данные из всех ваших систем — продажи, аналитика, таблицы. Формирует понятный отчёт и отправляет в Telegram. Ничего не нужно делать вручную.",
    metric: "2ч",
    metricLabel: "экономии каждый день",
  },
  {
    title: "Любая идея — под ключ",
    desc: "У вас есть задача, которую хочется автоматизировать? Мы создадим решение с нуля: AI-агенты, интеграции, чат-боты — всё что нужно вашему бизнесу. Любая сложность.",
    metric: "∞",
    metricLabel: "возможностей",
    isCustomMetric: true,
  },
];

const STEPS = [
  {
    title: "Идея",
    desc: "Разбираем вашу задачу, находим процессы, которые можно передать AI",
  },
  {
    title: "Прототип",
    desc: "Собираем рабочую версию за дни, а не месяцы. Вы видите результат сразу",
  },
  {
    title: "Запуск",
    desc: "Подключаем к вашим системам, обучаем команду, сопровождаем после старта",
  },
];

const INTEGRATIONS = [
  "Telegram",
  "WhatsApp",
  "Google Sheets",
  "1С",
  "Битрикс24",
  "VK",
  "Ozon",
  "Avito",
  "Wildberries",
  "Max",
];

const TRUST_NUMBERS = [
  { value: 150, suffix: "+", label: "автоматизаций запущено" },
  { value: 50, suffix: "+", label: "компаний доверяют" },
  { value: 14, suffix: " дней", label: "среднее время до запуска" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Animated counter ───────────────────────────────── */

function AnimatedCounter({
  value,
  suffix = "",
  isCustom = false,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  isCustom?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const hasStarted = useRef(false);

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 25,
    restDelta: 0.5,
  });

  const display = useTransform(springValue, (v) =>
    `${Math.round(v)}${suffix}`
  );

  if (isInView && !isCustom && !hasStarted.current) {
    hasStarted.current = true;
    if (delay > 0) {
      setTimeout(() => springValue.set(value), delay * 1000);
    } else {
      springValue.set(value);
    }
  }

  if (isCustom) {
    return (
      <motion.span
        ref={ref}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay, ease: [...EASE] }}
      >
        ∞
      </motion.span>
    );
  }

  return (
    <motion.span ref={ref} className="tabular-nums">
      {display}
    </motion.span>
  );
}

/* ── Word-by-word reveal ──────────────────────────────── */

function RevealWord({
  word,
  progress,
  range,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const color = useTransform(progress, range, [
    "rgba(0,0,0,0.12)",
    "rgba(0,0,0,1)",
  ]);

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block mr-[0.3em] transition-none"
    >
      {word}
    </motion.span>
  );
}

/* ── Service card — rounded Merlin style ─────────────── */

function ServiceCard({
  service,
  index,
  isHero = false,
}: {
  service: (typeof SERVICES)[number];
  index: number;
  isHero?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  const numericMatch = service.metric.match(/\d+/);
  const numericValue = numericMatch ? parseInt(numericMatch[0]) : 0;
  const suffix = service.metric.replace(/\d+/, "");
  const isCustom = "isCustomMetric" in service && service.isCustomMetric;

  if (isHero) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [...EASE] }}
        className="bg-[#f8f8f7] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 min-h-[200px]"
      >
        <div className="md:max-w-[55%]">
          <h3
            className="font-heading uppercase leading-[1.15] mb-4"
            style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)" }}
          >
            {service.title}
          </h3>
          <p className="font-body text-xs md:text-sm leading-relaxed text-black/50 max-w-lg">
            {service.desc}
          </p>
        </div>

        <div className="md:text-right shrink-0">
          <span
            className="font-heading leading-none block text-black"
            style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
          >
            <AnimatedCounter
              value={numericValue}
              suffix={suffix}
              isCustom={isCustom}
              delay={0.3}
            />
          </span>
          <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.15em] text-black/40 mt-2 block">
            {service.metricLabel}
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [...EASE],
      }}
      className="bg-[#f8f8f7] rounded-2xl p-8 md:p-10 flex flex-col justify-between min-h-[320px]"
    >
      <div>
        <h3
          className="font-heading uppercase leading-[1.15] mb-4"
          style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)" }}
        >
          {service.title}
        </h3>
        <p className="font-body text-xs md:text-sm leading-relaxed text-black/50 max-w-md">
          {service.desc}
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-black/[0.06]">
        <span
          className="font-heading leading-none block text-black"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          <AnimatedCounter
            value={numericValue}
            suffix={suffix}
            isCustom={isCustom}
            delay={0.4 + index * 0.08}
          />
        </span>
        <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.15em] text-black/40 mt-2 block">
          {service.metricLabel}
        </span>
      </div>
    </motion.div>
  );
}

/* ── Process steps — clean, no numbering ─────────────── */

function ProcessSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <div ref={ref} className="bg-[#f8f8f7] rounded-3xl p-8 md:p-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: i * 0.15,
              ease: [...EASE],
            }}
            className="text-center"
          >
            <h4
              className="font-heading uppercase leading-[1.15] mb-3"
              style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}
            >
              {step.title}
            </h4>
            <p className="font-body text-xs md:text-sm leading-relaxed text-black/45 max-w-xs mx-auto">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Showcase right-side text ─────────────────────────── */

const SHOWCASE_BULLETS = [
  "Автоматизация процессов от заявки до отчёта",
  "AI-агенты, которые работают 24/7 без перерывов",
  "Интеграция с вашими CRM, мессенджерами и таблицами",
];

function ShowcaseText() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className="flex flex-col justify-center py-4">
      <motion.p
        className="font-body text-xs md:text-sm uppercase tracking-[0.2em] text-black/35 mb-4"
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [...EASE] }}
      >
        Как это работает
      </motion.p>

      <motion.h3
        className="font-heading uppercase leading-[1.15] mb-6"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)" }}
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: [...EASE] }}
      >
        Ваш бизнес на автопилоте
      </motion.h3>

      <div className="space-y-4">
        {SHOWCASE_BULLETS.map((text, i) => (
          <motion.div
            key={i}
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.2 + i * 0.12,
              ease: [...EASE],
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-black/25 mt-2 shrink-0" />
            <p className="font-body text-sm md:text-base leading-relaxed text-black/55">
              {text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── MacBook Pro mockup (devices.css style, pure Tailwind) ── */

function MacBookShowcase({ children }: { children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [...EASE] }}
      className="relative w-full"
      style={{ aspectRatio: "740 / 440" }}
    >
      {/* ── Screen bezel (Space Gray) ── */}
      <div
        className="relative z-[1] mx-auto overflow-hidden rounded-[20px] border-2 border-[#c8cacb]"
        style={{
          background: "#0d0d0d",
          width: "83.5%",
          height: "calc(100% - 24px)",
          padding: "9px 9px 23px",
        }}
      >
        {/* Screen content */}
        <div className="relative w-full h-full rounded-[10px] border-2 border-[#121212] overflow-hidden bg-[#f5f5f7]">
          {children || (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-center px-8">
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-black/[0.04] flex items-center justify-center mx-auto mb-5">
                  <svg
                    className="w-7 h-7 md:w-9 md:h-9 text-black/15"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                    />
                  </svg>
                </div>
                <p className="font-heading uppercase text-sm md:text-base text-black/20 tracking-[0.12em]">
                  Демо автоматизации
                </p>
                <p className="font-body text-[10px] md:text-xs text-black/15 mt-2">
                  Скоро здесь будет демонстрация
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom chin gradient */}
        <div
          className="absolute right-0 bottom-0 left-0 h-6"
          style={{ background: "linear-gradient(to bottom, #272727, #0d0d0d)" }}
        />
      </div>

      {/* ── Notch ── */}
      <div
        className="absolute z-[2] left-1/2 -translate-x-1/2 rounded-b bg-[#0d0d0d]"
        style={{ top: "11px", width: "64px", height: "12px" }}
      />

      {/* ── Base / hinge ── */}
      <div
        className="relative z-[9] -mt-2.5 w-full rounded-[2px_2px_12px_12px] border border-[#a0a3a7] border-t-0"
        style={{
          height: "24px",
          background: "radial-gradient(circle, #e2e3e4 85%, #c8cacb 100%)",
          boxShadow: "inset 0 -2px 8px 0 #6c7074",
        }}
      >
        {/* Trackpad indent */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b-[10px]"
          style={{
            width: "120px",
            height: "10px",
            boxShadow: "inset 0 0 4px 2px #babdbf",
          }}
        />
      </div>

      {/* ── Rubber feet ── */}
      <div className="absolute -bottom-[2px] left-12 h-[2px] w-10 rounded-b-full bg-neutral-600" />
      <div className="absolute -bottom-[2px] right-12 h-[2px] w-10 rounded-b-full bg-neutral-600" />

      {/* ── Shadow ── */}
      <div className="absolute -bottom-4 left-[10%] right-[10%] h-8 bg-black/[0.06] blur-2xl rounded-full" />
    </motion.div>
  );
}

/* ── Trust numbers — soft card ──────────────────────── */

function TrustNumbers() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {TRUST_NUMBERS.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 0.8,
            delay: i * 0.12,
            ease: [...EASE],
          }}
          className="bg-[#f8f8f7] rounded-2xl px-6 py-10 md:px-8 md:py-14 text-center"
        >
          <span
            className="font-heading leading-none block text-black"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            <AnimatedCounter
              value={item.value}
              suffix={item.suffix}
              delay={0.3 + i * 0.15}
            />
          </span>
          <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.15em] text-black/35 mt-3 block">
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Integrations — Terminal Log ───────────────────────── */

type LineState = "idle" | "typing" | "done";

interface TerminalLine {
  name: string;
  state: LineState;
  typedChars: number;
}

function useTerminalSequence(items: string[], isInView: boolean) {
  const [lines, setLines] = useState<TerminalLine[]>(
    items.map((name) => ({ name, state: "idle", typedChars: 0 }))
  );
  const [commandTyped, setCommandTyped] = useState(0);
  const [phase, setPhase] = useState<"command" | "lines" | "done">("command");
  const hasRun = useRef(false);

  const command = "connecting services...";

  useEffect(() => {
    if (!isInView || hasRun.current) return;
    hasRun.current = true;

    let raf: number;
    let currentLine = 0;
    let charIndex = 0;
    let commandIdx = 0;
    let lastTime = 0;
    let currentPhase: "command" | "lines" | "done" = "command";

    const COMMAND_SPEED = 35;
    const TYPE_SPEED = 25;
    const LINE_PAUSE = 120;
    const STATUS_DELAY = 80;

    const step = (time: number) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;

      if (currentPhase === "command") {
        if (delta >= COMMAND_SPEED) {
          lastTime = time;
          commandIdx++;
          setCommandTyped(commandIdx);
          if (commandIdx >= command.length) {
            currentPhase = "lines";
            setPhase("lines");
            lastTime = time;
          }
        }
        raf = requestAnimationFrame(step);
        return;
      }

      if (currentPhase === "lines") {
        if (currentLine >= items.length) {
          currentPhase = "done";
          setPhase("done");
          return;
        }

        const lineItem = items[currentLine];

        if (charIndex <= lineItem.length) {
          if (delta >= TYPE_SPEED) {
            lastTime = time;
            charIndex++;
            const ci = charIndex;
            const cl = currentLine;
            setLines((prev) => {
              const next = [...prev];
              next[cl] = { ...next[cl], state: "typing", typedChars: ci };
              return next;
            });
          }
          raf = requestAnimationFrame(step);
          return;
        }

        if (delta >= STATUS_DELAY) {
          const cl = currentLine;
          setLines((prev) => {
            const next = [...prev];
            next[cl] = { ...next[cl], state: "done" };
            return next;
          });
          currentLine++;
          charIndex = 0;
          lastTime = time + LINE_PAUSE;
        }

        raf = requestAnimationFrame(step);
      }
    };

    const timeout = setTimeout(() => {
      raf = requestAnimationFrame(step);
    }, 300);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [isInView, command, items]);

  return { lines, commandTyped, command, phase };
}

function Integrations() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const { lines, commandTyped, command, phase } = useTerminalSequence(
    INTEGRATIONS,
    isInView
  );

  const allDone = phase === "done";

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      {/* Left — Terminal */}
      <div className="bg-[#f8f8f7] rounded-2xl p-6 md:p-10">
        <div
          className="w-full rounded-xl border border-black/[0.06] bg-white overflow-hidden"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {/* Terminal title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-black/[0.06]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="text-[10px] uppercase tracking-[0.15em] text-black/30 ml-3">
              integrations
            </span>
          </div>

          {/* Terminal body */}
          <div className="px-5 py-5 space-y-1.5">
            {/* Command line */}
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <span className="text-black/30 select-none">$</span>
              <span className="text-black/70">
                {command.slice(0, commandTyped)}
              </span>
              {phase === "command" && (
                <span
                  className="inline-block w-[6px] h-[14px] bg-black/60 ml-px"
                  style={{ animation: "blink 0.8s step-end infinite" }}
                />
              )}
            </div>

            {/* Integration lines */}
            {lines.map((line, i) => {
              if (line.state === "idle") return null;

              const isDone = line.state === "done";
              const displayName = isDone
                ? line.name
                : line.name.slice(0, line.typedChars);

              const padded = displayName.padEnd(16, " ");

              return (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs md:text-sm"
                >
                  <span
                    className={`select-none transition-colors duration-200 ${isDone ? "text-[#28c840]" : "text-black/20"}`}
                  >
                    {isDone ? "✓" : "⠋"}
                  </span>
                  <span
                    className="text-black/60 whitespace-pre"
                    style={{ minWidth: "10ch" }}
                  >
                    {padded}
                  </span>
                  <span
                    className={`text-[10px] uppercase tracking-[0.1em] transition-colors duration-200 ${isDone ? "text-black/35" : "text-black/15"}`}
                  >
                    {isDone ? "connected" : "connecting..."}
                  </span>
                </div>
              );
            })}

            {/* Final status */}
            {allDone && (
              <motion.div
                className="flex items-center gap-2 text-xs md:text-sm pt-3 mt-3 border-t border-black/[0.06]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: [...EASE] }}
              >
                <span className="text-black/30 select-none">$</span>
                <span className="text-black/40">
                  {INTEGRATIONS.length} services ready
                </span>
                <span
                  className="inline-block w-[6px] h-[14px] bg-black/40 ml-px"
                  style={{ animation: "blink 0.8s step-end infinite" }}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Right — Quote */}
      <motion.div
        className="bg-[#f8f8f7] rounded-2xl flex flex-col justify-center p-8 md:p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.3, ease: [...EASE] }}
      >
        <blockquote>
          <p
            className="font-heading leading-[1.25] text-black/80 mb-6"
            style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.6rem)" }}
          >
            &ldquo;AI не заменит ваш бизнес. Но бизнес, который использует AI, заменит ваш.&rdquo;
          </p>
          <footer className="font-body text-xs md:text-sm text-black/35">
            <cite className="not-italic">
              — Jensen Huang
            </cite>
            <span className="block text-[10px] uppercase tracking-[0.15em] text-black/20 mt-1">
              CEO NVIDIA
            </span>
          </footer>
        </blockquote>

        <div className="mt-8 pt-6 border-t border-black/[0.06]">
          <p className="font-body text-xs leading-relaxed text-black/40 max-w-sm">
            Мы подключаем ваш бизнес к AI — от мессенджеров и CRM до маркетплейсов. Вы получаете результат, а не технические сложности.
          </p>
        </div>
      </motion.div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ── Main section ─────────────────────────────────────── */

export function AutomationSection() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const sectionInView = useInView(sectionRef, {
    once: true,
    margin: "-5% 0px",
  });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-10% 0px" });

  const { scrollYProgress } = useScroll({
    target: headlineRef,
    offset: ["start 90%", "end 40%"],
  });

  const { scrollYProgress: statementProgress } = useScroll({
    target: statementRef,
    offset: ["start 90%", "end 40%"],
  });

  const headlineText =
    "Мы автоматизируем бизнес. Создаём AI-агентов. Под ключ.";
  const headlineWords = headlineText.split(" ");

  const statementText =
    "Ваша команда занимается стратегией — рутину берёт на себя AI.";
  const statementWords = statementText.split(" ");

  return (
    <motion.section
      ref={sectionRef}
      id="automation"
      className="bg-white"
      initial={{ opacity: 0 }}
      animate={sectionInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: [...EASE] }}
    >
      {/* ── Headline (constrained) ── */}
      <div className="max-w-6xl mx-auto px-5 md:px-10">
        <div
          ref={headlineRef}
          className="py-24 md:py-36 border-t border-black/10"
        >
          <p
            className="font-heading uppercase leading-[1.1] text-center max-w-5xl mx-auto"
            style={{ fontSize: "clamp(1.75rem, 4.5vw, 4rem)" }}
          >
            {headlineWords.map((word, i) => (
              <RevealWord
                key={i}
                word={word}
                progress={scrollYProgress}
                range={[i / headlineWords.length, (i + 1) / headlineWords.length]}
              />
            ))}
          </p>
        </div>
      </div>

      {/* ── MacBook showcase — wide split layout ── */}
      <div className="max-w-[90rem] mx-auto px-5 md:px-12 mb-24 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-8 md:gap-16 items-center">
          {/* Left — MacBook */}
          <MacBookShowcase />

          {/* Right — animated text */}
          <ShowcaseText />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-10">

        {/* ── Service cards — bento grid ── */}
        <div className="space-y-5 mb-20">
          {/* Hero card — full width */}
          <ServiceCard
            service={SERVICES[3]}
            index={0}
            isHero
          />
          {/* 3 cards row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SERVICES.slice(0, 3).map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i + 1} />
            ))}
          </div>
        </div>

        {/* ── Statement ── */}
        <div ref={statementRef} className="py-16 md:py-24">
          <p
            className="font-heading uppercase leading-[1.1] max-w-5xl mx-auto text-center"
            style={{ fontSize: "clamp(1.5rem, 4vw, 3.75rem)" }}
          >
            {statementWords.map((word, i) => (
              <RevealWord
                key={i}
                word={word}
                progress={statementProgress}
                range={[
                  i / statementWords.length,
                  (i + 1) / statementWords.length,
                ]}
              />
            ))}
          </p>
        </div>

        {/* ── How it works ── */}
        <div className="mb-20">
          <ProcessSteps />
        </div>

        {/* ── Trust numbers ── */}
        <div className="mb-20">
          <TrustNumbers />
        </div>

        {/* ── Integrations ── */}
        <div className="mb-20">
          <Integrations />
        </div>

        {/* ── CTA ── */}
        <div ref={ctaRef} className="pb-20">
          <motion.div
            className="text-center py-14 md:py-20"
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [...EASE] }}
          >
            <a
              href="mailto:hello@aibromotion.com"
              className="inline-block font-heading text-sm md:text-base uppercase tracking-[0.08em] bg-black text-white px-10 py-5 rounded-full hover:bg-black/85 transition-colors duration-300"
            >
              Обсудить автоматизацию
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
