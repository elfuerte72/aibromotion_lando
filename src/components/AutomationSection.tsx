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
    n: "01",
    title: "Идея",
    desc: "Разбираем вашу задачу, находим процессы, которые можно передать AI",
  },
  {
    n: "02",
    title: "Прототип",
    desc: "Собираем рабочую версию за дни, а не месяцы. Вы видите результат сразу",
  },
  {
    n: "03",
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

const EASE: [number, number, number, number] = [0.2, 0.85, 0.15, 1];

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

  const hasBreak = word.endsWith("\n");
  const displayWord = hasBreak ? word.slice(0, -1) : word;

  return (
    <>
      <motion.span
        style={{ opacity }}
        className="inline-block mr-[0.3em] transition-none"
      >
        {displayWord}
      </motion.span>
      {hasBreak && <br />}
    </>
  );
}

/* ── Service card — B2 style ────────────────────────── */

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
        className="border border-ink p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 min-h-[200px]"
      >
        <div className="md:max-w-[55%]">
          <h3 className="font-heading font-extrabold uppercase leading-[1.1] tracking-[-0.03em] text-[clamp(1.4rem,2.8vw,2rem)] mb-4">
            {service.title}
          </h3>
          <p className="text-sm leading-relaxed text-ink/50 max-w-lg">
            {service.desc}
          </p>
        </div>
        <div className="md:text-right shrink-0">
          <span className="font-serif italic font-light text-accent leading-none block text-[clamp(3rem,6vw,5rem)] tracking-[-0.03em]">
            <AnimatedCounter value={numericValue} suffix={suffix} isCustom={isCustom} delay={0.3} />
          </span>
          <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-muted mt-2 block">
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
      transition={{ duration: 0.8, delay: index * 0.1, ease: [...EASE] }}
      className="border border-ink p-8 md:p-10 flex flex-col justify-between min-h-[320px]"
    >
      <div>
        <h3 className="font-heading font-extrabold uppercase leading-[1.1] tracking-[-0.03em] text-[clamp(1.2rem,2.2vw,1.6rem)] mb-4">
          {service.title}
        </h3>
        <p className="text-sm leading-relaxed text-ink/50 max-w-md">
          {service.desc}
        </p>
      </div>
      <div className="mt-8 pt-6 border-t border-ink/10">
        <span className="font-serif italic font-light text-accent leading-none block text-[clamp(2rem,4vw,3.5rem)] tracking-[-0.03em]">
          <AnimatedCounter value={numericValue} suffix={suffix} isCustom={isCustom} delay={0.4 + index * 0.08} />
        </span>
        <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-muted mt-2 block">
          {service.metricLabel}
        </span>
      </div>
    </motion.div>
  );
}

/* ── Process steps — B2 style ─────────────────────────── */

function ProcessSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 border-t border-ink">
      {STEPS.map((step, i) => (
        <motion.div
          key={step.title}
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: i * 0.15, ease: [...EASE] }}
          className="border-r border-ink p-8 md:p-10 last:border-r-0 max-md:border-r-0 max-md:border-b max-md:border-ink"
        >
          <div className="font-heading font-extrabold text-[80px] tracking-[-0.06em] leading-[0.8] outline-text mb-6">
            {step.n}
          </div>
          <h4 className="font-heading font-bold text-xl uppercase tracking-[-0.02em] mb-3">
            {step.title}
          </h4>
          <p className="text-sm leading-relaxed text-ink/50 max-w-xs">
            {step.desc}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Trust numbers — B2 style ──────────────────────── */

function TrustNumbers() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 border-t border-ink">
      {TRUST_NUMBERS.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: i * 0.12, ease: [...EASE] }}
          className="border-r border-ink px-8 py-12 md:py-16 text-center last:border-r-0 max-md:border-r-0 max-md:border-b max-md:border-ink"
        >
          <span className="font-serif italic font-light text-accent leading-none block text-[clamp(2.5rem,5vw,4rem)] tracking-[-0.03em]">
            <AnimatedCounter value={item.value} suffix={item.suffix} delay={0.3 + i * 0.15} />
          </span>
          <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-muted mt-3 block">
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Integrations — Terminal Log (B2 styled) ─────────── */

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
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink">
      {/* Left — Terminal */}
      <div className="bg-paper p-6 md:p-10">
        <div className="w-full border border-ink overflow-hidden font-mono">
          {/* Terminal title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-ink bg-ink text-paper">
            <span className="w-2.5 h-2.5 rounded-full bg-accent" />
            <span className="w-2.5 h-2.5 rounded-full bg-muted" />
            <span className="w-2.5 h-2.5 rounded-full bg-muted" />
            <span className="text-[10px] uppercase tracking-[0.15em] text-paper/50 ml-3">
              integrations
            </span>
          </div>

          {/* Terminal body */}
          <div className="px-5 py-5 space-y-1.5 bg-paper">
            {/* Command line */}
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <span className="text-accent select-none">$</span>
              <span className="text-ink/70">
                {command.slice(0, commandTyped)}
              </span>
              {phase === "command" && (
                <span
                  className="inline-block w-[6px] h-[14px] bg-accent ml-px"
                  style={{ animation: "termBlink 0.8s step-end infinite" }}
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
                <div key={i} className="flex items-center gap-2 text-xs md:text-sm">
                  <span className={`select-none transition-colors duration-200 ${isDone ? "text-accent" : "text-ink/20"}`}>
                    {isDone ? "✓" : "⠋"}
                  </span>
                  <span className="text-ink/60 whitespace-pre" style={{ minWidth: "10ch" }}>
                    {padded}
                  </span>
                  <span className={`text-[10px] uppercase tracking-[0.1em] transition-colors duration-200 ${isDone ? "text-muted" : "text-ink/15"}`}>
                    {isDone ? "connected" : "connecting..."}
                  </span>
                </div>
              );
            })}

            {/* Final status */}
            {allDone && (
              <motion.div
                className="flex items-center gap-2 text-xs md:text-sm pt-3 mt-3 border-t border-ink/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: [...EASE] }}
              >
                <span className="text-accent select-none">$</span>
                <span className="text-muted">
                  {INTEGRATIONS.length} services ready
                </span>
                <span
                  className="inline-block w-[6px] h-[14px] bg-accent ml-px"
                  style={{ animation: "termBlink 0.8s step-end infinite" }}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Right — Quote */}
      <motion.div
        className="bg-paper flex flex-col justify-center p-8 md:p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.3, ease: [...EASE] }}
      >
        <blockquote>
          <p className="font-serif italic font-light text-[clamp(1.1rem,2.2vw,1.6rem)] leading-[1.35] text-ink/80 mb-6 tracking-[-0.02em]">
            &ldquo;AI не заменит ваш бизнес. Но бизнес, который использует AI, заменит ваш.&rdquo;
          </p>
          <footer className="text-sm text-muted">
            <cite className="not-italic font-heading font-bold uppercase tracking-[-0.02em]">
              — Jensen Huang
            </cite>
            <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-muted/60 mt-1">
              CEO NVIDIA
            </span>
          </footer>
        </blockquote>

        <div className="mt-8 pt-6 border-t border-ink/10">
          <p className="text-sm leading-relaxed text-ink/45 max-w-sm">
            Мы подключаем ваш бизнес к AI — от мессенджеров и CRM до маркетплейсов. Вы получаете результат, а не технические сложности.
          </p>
        </div>
      </motion.div>

      <style>{`
        @keyframes termBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ── MacBook Pro mockup ────────────────────────────────── */

function MacBookShowcase() {
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
      <div
        className="relative z-[1] mx-auto overflow-hidden rounded-[20px] border-2 border-[#c8cacb]"
        style={{
          background: "#0d0d0d",
          width: "83.5%",
          height: "calc(100% - 24px)",
          padding: "9px 9px 23px",
        }}
      >
        <div className="relative w-full h-full rounded-[10px] border-2 border-[#121212] overflow-hidden bg-paper-2">
          <video
            src="/media/automation-demo.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="absolute right-0 bottom-0 left-0 h-6"
          style={{ background: "linear-gradient(to bottom, #272727, #0d0d0d)" }}
        />
      </div>
      <div
        className="absolute z-[2] left-1/2 -translate-x-1/2 rounded-b bg-[#0d0d0d]"
        style={{ top: "11px", width: "64px", height: "12px" }}
      />
      <div
        className="relative z-[9] -mt-2.5 w-full rounded-[2px_2px_12px_12px] border border-[#a0a3a7] border-t-0"
        style={{
          height: "24px",
          background: "radial-gradient(circle, #e2e3e4 85%, #c8cacb 100%)",
          boxShadow: "inset 0 -2px 8px 0 #6c7074",
        }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b-[10px]"
          style={{ width: "120px", height: "10px", boxShadow: "inset 0 0 4px 2px #babdbf" }}
        />
      </div>
      <div className="absolute -bottom-[2px] left-12 h-[2px] w-10 rounded-b-full bg-neutral-600" />
      <div className="absolute -bottom-[2px] right-12 h-[2px] w-10 rounded-b-full bg-neutral-600" />
      <div className="absolute -bottom-4 left-[10%] right-[10%] h-8 bg-black/[0.06] blur-2xl rounded-full" />
    </motion.div>
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
        className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-4"
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [...EASE] }}
      >
        Как это работает
      </motion.p>

      <motion.h3
        className="font-heading font-extrabold uppercase leading-[1.1] tracking-[-0.03em] text-[clamp(1.5rem,3vw,2.4rem)] mb-6"
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
            transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: [...EASE] }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
            <p className="text-[15px] leading-relaxed text-ink/55">
              {text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Main section ─────────────────────────────────────── */

export function AutomationSection() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const sectionInView = useInView(sectionRef, { once: true, margin: "-5% 0px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-10% 0px" });

  const { scrollYProgress } = useScroll({
    target: headlineRef,
    offset: ["start 90%", "end 40%"],
  });

  const { scrollYProgress: statementProgress } = useScroll({
    target: statementRef,
    offset: ["start 90%", "end 40%"],
  });

  const headlineLines = [
    "Мы автоматизируем бизнес",
    "Создаём AI-агентов",
    "Под ключ",
  ];
  const headlineWords = headlineLines.flatMap((line, li) => {
    const words = line.split(" ");
    if (li < headlineLines.length - 1) {
      words[words.length - 1] = words[words.length - 1] + "\n";
    }
    return words;
  });

  const statementText =
    "Ваша команда занимается стратегией — рутину берёт на себя AI";
  const statementWords = statementText.split(" ");

  return (
    <motion.section
      ref={sectionRef}
      id="automation"
      className="bg-paper border-b border-ink"
      initial={{ opacity: 0 }}
      animate={sectionInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: [...EASE] }}
    >
      {/* ── Head ── */}
      <div className="px-6 pt-[100px] pb-10 border-b border-ink">
        <div className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-muted mb-4">
          [09] Automation
        </div>
        <h2 className="font-heading font-extrabold uppercase leading-[0.84] tracking-[-0.055em] text-[clamp(56px,9vw,160px)]">
          Автомат<span className="font-serif italic font-light tracking-[-0.03em]">изация.</span>
        </h2>
      </div>

      {/* ── Headline (word-by-word) ── */}
      <div className="max-w-6xl mx-auto px-6">
        <div ref={headlineRef} className="py-24 md:py-36">
          <p className="font-heading font-extrabold uppercase leading-[1.1] text-center max-w-5xl mx-auto tracking-[-0.03em] text-[clamp(1.75rem,4.5vw,4rem)]">
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

      {/* ── MacBook showcase ── */}
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 mb-24 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-8 md:gap-16 items-center">
          <MacBookShowcase />
          <ShowcaseText />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* ── Service cards — bento grid ── */}
        <div className="space-y-px mb-20">
          <ServiceCard service={SERVICES[3]} index={0} isHero />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink">
            {SERVICES.slice(0, 3).map((service, i) => (
              <div key={service.title} className="bg-paper">
                <ServiceCard service={service} index={i + 1} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Statement ── */}
        <div ref={statementRef} className="py-16 md:py-24">
          <p className="font-heading font-extrabold uppercase leading-[1.1] max-w-5xl mx-auto text-center tracking-[-0.03em] text-[clamp(1.5rem,4vw,3.75rem)]">
            {statementWords.map((word, i) => (
              <RevealWord
                key={i}
                word={word}
                progress={statementProgress}
                range={[i / statementWords.length, (i + 1) / statementWords.length]}
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
              href="#contact"
              className="inline-flex items-center gap-3.5 px-10 py-5 bg-ink text-paper font-mono text-xs font-semibold tracking-[0.16em] uppercase transition-all hover:bg-accent hover:text-ink"
            >
              Обсудить автоматизацию
              <span className="w-7 h-7 rounded-full bg-accent text-ink grid place-items-center transition-all duration-400 group-hover:rotate-[-45deg]">
                ↗
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
