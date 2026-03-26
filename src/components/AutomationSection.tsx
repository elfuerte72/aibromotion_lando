import { useRef, useState, useEffect } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

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
    num: "01",
    title: "Брифинг",
    desc: "Разбираем вашу задачу, находим процессы, которые можно передать AI",
  },
  {
    num: "02",
    title: "Прототип",
    desc: "Собираем рабочую версию за дни, а не месяцы. Вы видите результат сразу",
  },
  {
    num: "03",
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

/* ── Circuit board SVG background ─────────────────────── */

function CircuitBoardBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Ambient glow orbs */}
      <div
        className="absolute -top-[10%] right-[15%] w-[500px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(70,100,220,0.1) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute top-[40%] -left-[5%] w-[450px] h-[350px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(50,70,180,0.08) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="absolute bottom-[15%] right-[20%] w-[400px] h-[300px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(80,120,255,0.06) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Circuit board pattern */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.12 }}
      >
        <defs>
          {/* Small grid pattern */}
          <pattern id="cb-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="none" />
            <rect x="0" y="0" width="1" height="1" rx="0.5" fill="rgba(140,170,255,0.5)" />
          </pattern>

          {/* Chip pattern */}
          <pattern id="cb-chips" width="320" height="280" patternUnits="userSpaceOnUse">
            <rect width="320" height="280" fill="none" />
            {/* Horizontal traces */}
            <line x1="0" y1="40" x2="80" y2="40" stroke="rgba(140,170,255,0.4)" strokeWidth="0.5" />
            <line x1="120" y1="40" x2="320" y2="40" stroke="rgba(140,170,255,0.3)" strokeWidth="0.5" />
            <line x1="0" y1="140" x2="60" y2="140" stroke="rgba(140,170,255,0.3)" strokeWidth="0.5" />
            <line x1="200" y1="140" x2="320" y2="140" stroke="rgba(140,170,255,0.4)" strokeWidth="0.5" />
            <line x1="0" y1="240" x2="140" y2="240" stroke="rgba(140,170,255,0.3)" strokeWidth="0.5" />
            <line x1="180" y1="240" x2="320" y2="240" stroke="rgba(140,170,255,0.25)" strokeWidth="0.5" />

            {/* Vertical traces */}
            <line x1="80" y1="0" x2="80" y2="60" stroke="rgba(140,170,255,0.3)" strokeWidth="0.5" />
            <line x1="160" y1="80" x2="160" y2="200" stroke="rgba(140,170,255,0.25)" strokeWidth="0.5" />
            <line x1="240" y1="0" x2="240" y2="80" stroke="rgba(140,170,255,0.35)" strokeWidth="0.5" />
            <line x1="240" y1="200" x2="240" y2="280" stroke="rgba(140,170,255,0.3)" strokeWidth="0.5" />

            {/* Angled traces */}
            <line x1="80" y1="40" x2="120" y2="80" stroke="rgba(140,170,255,0.3)" strokeWidth="0.5" />
            <line x1="60" y1="140" x2="100" y2="180" stroke="rgba(140,170,255,0.25)" strokeWidth="0.5" />
            <line x1="200" y1="140" x2="160" y2="180" stroke="rgba(140,170,255,0.25)" strokeWidth="0.5" />

            {/* Junction dots */}
            <circle cx="80" cy="40" r="2" fill="rgba(140,170,255,0.5)" />
            <circle cx="120" cy="40" r="1.5" fill="rgba(140,170,255,0.4)" />
            <circle cx="240" cy="80" r="2" fill="rgba(140,170,255,0.4)" />
            <circle cx="160" cy="80" r="1.5" fill="rgba(140,170,255,0.3)" />
            <circle cx="60" cy="140" r="2" fill="rgba(140,170,255,0.4)" />
            <circle cx="200" cy="140" r="2" fill="rgba(140,170,255,0.5)" />
            <circle cx="160" cy="200" r="1.5" fill="rgba(140,170,255,0.35)" />
            <circle cx="100" cy="180" r="1.5" fill="rgba(140,170,255,0.3)" />

            {/* Small chip rectangles */}
            <rect x="90" y="95" width="24" height="14" rx="2" stroke="rgba(140,170,255,0.35)" strokeWidth="0.5" fill="none" />
            <rect x="92" y="97" width="20" height="10" rx="1" fill="rgba(140,170,255,0.06)" />

            <rect x="220" y="170" width="20" height="12" rx="2" stroke="rgba(140,170,255,0.3)" strokeWidth="0.5" fill="none" />
            <rect x="222" y="172" width="16" height="8" rx="1" fill="rgba(140,170,255,0.05)" />

            <rect x="30" y="200" width="28" height="16" rx="2" stroke="rgba(140,170,255,0.3)" strokeWidth="0.5" fill="none" />
            {/* Chip pins */}
            <line x1="36" y1="198" x2="36" y2="200" stroke="rgba(140,170,255,0.3)" strokeWidth="0.5" />
            <line x1="44" y1="198" x2="44" y2="200" stroke="rgba(140,170,255,0.3)" strokeWidth="0.5" />
            <line x1="52" y1="198" x2="52" y2="200" stroke="rgba(140,170,255,0.3)" strokeWidth="0.5" />
            <line x1="36" y1="216" x2="36" y2="218" stroke="rgba(140,170,255,0.3)" strokeWidth="0.5" />
            <line x1="44" y1="216" x2="44" y2="218" stroke="rgba(140,170,255,0.3)" strokeWidth="0.5" />
            <line x1="52" y1="216" x2="52" y2="218" stroke="rgba(140,170,255,0.3)" strokeWidth="0.5" />

            {/* IC block top-right */}
            <rect x="260" y="20" width="40" height="30" rx="3" stroke="rgba(140,170,255,0.3)" strokeWidth="0.5" fill="none" />
            <line x1="266" y1="18" x2="266" y2="20" stroke="rgba(140,170,255,0.25)" strokeWidth="0.5" />
            <line x1="274" y1="18" x2="274" y2="20" stroke="rgba(140,170,255,0.25)" strokeWidth="0.5" />
            <line x1="282" y1="18" x2="282" y2="20" stroke="rgba(140,170,255,0.25)" strokeWidth="0.5" />
            <line x1="290" y1="18" x2="290" y2="20" stroke="rgba(140,170,255,0.25)" strokeWidth="0.5" />
            <line x1="266" y1="50" x2="266" y2="52" stroke="rgba(140,170,255,0.25)" strokeWidth="0.5" />
            <line x1="274" y1="50" x2="274" y2="52" stroke="rgba(140,170,255,0.25)" strokeWidth="0.5" />
            <line x1="282" y1="50" x2="282" y2="52" stroke="rgba(140,170,255,0.25)" strokeWidth="0.5" />
            <line x1="290" y1="50" x2="290" y2="52" stroke="rgba(140,170,255,0.25)" strokeWidth="0.5" />

            {/* Small dot clusters */}
            <circle cx="140" cy="250" r="1" fill="rgba(140,170,255,0.3)" />
            <circle cx="148" cy="250" r="1" fill="rgba(140,170,255,0.3)" />
            <circle cx="140" cy="258" r="1" fill="rgba(140,170,255,0.3)" />
            <circle cx="148" cy="258" r="1" fill="rgba(140,170,255,0.3)" />

            <circle cx="280" cy="120" r="1" fill="rgba(140,170,255,0.25)" />
            <circle cx="288" cy="120" r="1" fill="rgba(140,170,255,0.25)" />
            <circle cx="296" cy="120" r="1" fill="rgba(140,170,255,0.25)" />
            <circle cx="280" cy="128" r="1" fill="rgba(140,170,255,0.25)" />
            <circle cx="288" cy="128" r="1" fill="rgba(140,170,255,0.25)" />
            <circle cx="296" cy="128" r="1" fill="rgba(140,170,255,0.25)" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#cb-grid)" />
        <rect width="100%" height="100%" fill="url(#cb-chips)" />
      </svg>
    </div>
  );
}

/* ── Dashboard chip (AuthKit style) ───────────────────── */

const MODULES = [
  { label: "Заявки", icon: "📥" },
  { label: "AI-агент", icon: "🤖" },
  { label: "Аналитика", icon: "📊" },
  { label: "Интеграции", icon: "🔗" },
  { label: "Отчёты", icon: "📋" },
  { label: "Поддержка", icon: "💬" },
];

function DashboardChip() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className="flex justify-center px-6 py-14 md:py-20">
      <motion.div
        className="relative w-full max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Outer glow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(80,110,220,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
            transform: "scale(1.5)",
          }}
        />

        {/* Main panel */}
        <div
          className="relative rounded-2xl border border-white/[0.06] overflow-hidden"
          style={{ background: "linear-gradient(180deg, rgba(17,22,56,0.7) 0%, rgba(10,14,39,0.85) 100%)" }}
        >
          {/* Top bar with subtle glow line */}
          <div
            className="h-px w-full"
            style={{ background: "linear-gradient(90deg, transparent, rgba(100,140,255,0.2), transparent)" }}
          />

          {/* Module grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-px bg-white/[0.03]">
            {MODULES.map((mod, i) => (
              <motion.div
                key={mod.label}
                className="flex flex-col items-center justify-center py-5 md:py-7 bg-[#0a0e27]/60"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
              >
                <span className="text-lg md:text-xl mb-2 grayscale opacity-50">{mod.icon}</span>
                <span className="font-body text-[9px] md:text-[10px] uppercase tracking-[0.1em] text-white/30">
                  {mod.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Central status bar */}
          <div className="flex items-center justify-center gap-3 py-3 border-t border-white/[0.04]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400/40" />
            <span className="font-body text-[10px] uppercase tracking-[0.15em] text-white/20">
              all systems operational
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Animated counter ─────────────────────────────────── */

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
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
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

/* ── Divider ──────────────────────────────────────────── */

function Divider() {
  return <div className="h-px bg-white/[0.06]" />;
}

/* ── Service card ─────────────────────────────────────── */

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const numericMatch = service.metric.match(/\d+/);
  const numericValue = numericMatch ? parseInt(numericMatch[0]) : 0;
  const suffix = service.metric.replace(/\d+/, "");
  const isCustom = "isCustomMetric" in service && service.isCustomMetric;
  const isEven = index % 2 === 0;

  return (
    <div
      className={`
        flex flex-col justify-between p-6 md:p-10 min-h-[300px] md:min-h-[380px]
        border-b border-white/[0.06]
        ${isEven ? "md:border-r md:border-r-white/[0.06]" : ""}
      `}
    >
      <div>
        <h3
          className="font-heading uppercase leading-[1.15] mb-4 text-white/90"
          style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
        >
          {service.title}
        </h3>
        <p className="font-body text-xs md:text-sm leading-relaxed text-white/40 max-w-md">
          {service.desc}
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-white/[0.06]">
        <span
          className="font-heading leading-none block text-blue-300/80"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          <AnimatedCounter
            value={numericValue}
            suffix={suffix}
            isCustom={isCustom}
            delay={0.4 + index * 0.08}
          />
        </span>
        <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.15em] text-white/30 mt-1 block">
          {service.metricLabel}
        </span>
      </div>
    </div>
  );
}

/* ── Process steps ────────────────────────────────────── */

function ProcessSteps() {
  return (
    <div>
      <Divider />
      <div className="grid grid-cols-1 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            className={`relative p-6 md:p-10 ${i < 2 ? "border-b md:border-b-0 md:border-r border-white/[0.06]" : ""}`}
          >
            <span className="font-body text-[10px] uppercase tracking-[0.2em] text-blue-400/30">
              Шаг {step.num}
            </span>
            <h4
              className="font-heading uppercase leading-[1.15] mt-3 mb-3 text-white/90"
              style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
            >
              {step.title}
            </h4>
            <p className="font-body text-xs md:text-sm leading-relaxed text-white/40 max-w-xs">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Trust numbers ────────────────────────────────────── */

function TrustNumbers() {
  return (
    <div>
      <Divider />
      <div className="grid grid-cols-1 md:grid-cols-3">
        {TRUST_NUMBERS.map((item, i) => (
          <div
            key={item.label}
            className={`px-6 py-10 md:px-10 md:py-14 text-center ${i < 2 ? "border-b md:border-b-0 md:border-r border-white/[0.06]" : ""}`}
          >
            <span
              className="font-heading leading-none block text-white/90"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              <AnimatedCounter
                value={item.value}
                suffix={item.suffix}
                delay={0.3 + i * 0.15}
              />
            </span>
            <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.15em] text-white/30 mt-2 block">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Terminal ─────────────────────────────────────────── */

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
    <div ref={ref}>
      <Divider />
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left — Terminal */}
        <div className="p-6 md:p-10 md:border-r border-white/[0.06]">
          <div
            className="w-full rounded-lg border border-white/[0.06] overflow-hidden"
            style={{
              fontFamily: "var(--font-body)",
              background: "rgba(10,14,39,0.6)",
              backdropFilter: "blur(8px)",
            }}
          >
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
              <span className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-white/20 ml-2">
                integrations
              </span>
            </div>

            {/* Terminal body */}
            <div className="px-4 py-4 md:px-5 md:py-5 space-y-1">
              {/* Command line */}
              <div className="flex items-center gap-2 text-xs md:text-sm">
                <span className="text-blue-400/40 select-none">$</span>
                <span className="text-blue-300/60">
                  {command.slice(0, commandTyped)}
                </span>
                {phase === "command" && (
                  <span
                    className="inline-block w-[6px] h-[14px] bg-blue-300/50 ml-px"
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
                      className={`select-none transition-colors duration-200 ${isDone ? "text-blue-400/50" : "text-white/20"}`}
                    >
                      {isDone ? "✓" : "⠋"}
                    </span>
                    <span
                      className="text-white/50 whitespace-pre"
                      style={{ minWidth: "10ch" }}
                    >
                      {padded}
                    </span>
                    <span
                      className={`text-[10px] uppercase tracking-[0.1em] transition-colors duration-200 ${isDone ? "text-blue-400/30" : "text-white/15"}`}
                    >
                      {isDone ? "connected" : "connecting..."}
                    </span>
                  </div>
                );
              })}

              {/* Final status */}
              {allDone && (
                <motion.div
                  className="flex items-center gap-2 text-xs md:text-sm pt-2 mt-2 border-t border-white/[0.04]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-blue-400/30 select-none">$</span>
                  <span className="text-blue-300/40">
                    {INTEGRATIONS.length} services ready
                  </span>
                  <span
                    className="inline-block w-[6px] h-[14px] bg-blue-300/40 ml-px"
                    style={{ animation: "blink 0.8s step-end infinite" }}
                  />
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Right — Quote */}
        <div className="flex flex-col justify-center p-6 md:p-10 border-t md:border-t-0 border-white/[0.06]">
          <blockquote>
            <p
              className="font-heading leading-[1.25] text-white/80 mb-6"
              style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.6rem)" }}
            >
              &ldquo;AI не заменит ваш бизнес. Но бизнес, который использует AI, заменит ваш.&rdquo;
            </p>
            <footer className="font-body text-xs md:text-sm text-white/25">
              <cite className="not-italic">
                — Jensen Huang
              </cite>
              <span className="block text-[10px] uppercase tracking-[0.15em] text-white/15 mt-1">
                CEO NVIDIA
              </span>
            </footer>
          </blockquote>

          <div className="mt-8 pt-6 border-t border-white/[0.06]">
            <p className="font-body text-xs leading-relaxed text-white/35 max-w-sm">
              Мы подключаем ваш бизнес к AI — от мессенджеров и CRM до маркетплейсов. Вы получаете результат, а не технические сложности.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ── Statement block ──────────────────────────────────── */

function StatementBlock({ text }: { text: string }) {
  return (
    <div className="px-6 py-16 md:px-10 md:py-24">
      <p
        className="font-heading uppercase leading-[1.1] max-w-5xl mx-auto text-center text-white/80"
        style={{ fontSize: "clamp(1.5rem, 4vw, 3.75rem)" }}
      >
        {text}
      </p>
    </div>
  );
}

/* ── Main section ─────────────────────────────────────── */

export function AutomationSection() {
  return (
    <section
      id="automation"
      className="relative"
      style={{ backgroundColor: "var(--color-deep-navy)" }}
    >
      <CircuitBoardBg />

      {/* ── Headline (minimal top padding — flows from SectionTransition) ── */}
      <div className="relative px-6 pt-4 pb-6 md:px-10 md:pt-6 md:pb-10">
        <p
          className="font-heading uppercase leading-[1.1] text-center max-w-5xl mx-auto text-white/90"
          style={{ fontSize: "clamp(1.75rem, 4.5vw, 4rem)" }}
        >
          Мы автоматизируем бизнес. Создаём AI-агентов. Под ключ.
        </p>
      </div>

      {/* ── Dashboard chip (AuthKit style) ── */}
      <DashboardChip />

      {/* ── Service cards (2×2) ── */}
      <div className="relative grid grid-cols-1 md:grid-cols-2">
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.title} service={service} index={i} />
        ))}
      </div>

      {/* ── Statement ── */}
      <StatementBlock text="Ваша команда занимается стратегией — рутину берёт на себя AI." />

      {/* ── How it works ── */}
      <ProcessSteps />

      {/* ── Trust numbers ── */}
      <TrustNumbers />

      {/* ── Integrations ── */}
      <Integrations />

      {/* ── CTA ── */}
      <div>
        <Divider />
        <div className="relative px-6 py-12 md:px-10 md:py-16 text-center">
          <a
            href="mailto:hello@aibromotion.com"
            className="inline-block font-heading text-sm md:text-base uppercase tracking-[0.1em] text-white/80 border border-white/20 px-8 py-4 hover:bg-white/10 transition-colors duration-300"
          >
            Обсудить автоматизацию
          </a>
        </div>
      </div>
    </section>
  );
}
