import { lazy, Suspense, useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { useIsMobile, useReducedMotion } from "@/lib/useDevice";
import { IPhoneShowcase } from "./automation/iPhoneShowcase";

// Tegaki + 251KB Caveat TTF + glyph JSON live in a separate chunk —
// mobile and reduced-motion users never trigger this import.
const AutomationTegaki = lazy(() => import("./automation/AutomationTegaki"));

/* ── Data ─────────────────────────────────────────────── */

const SERVICES = [
  {
    title: "Умная обработка заявок",
    desc: "Бот принимает заявку, квалифицирует клиента и передаёт менеджеру только горячих. Холодным — автоматические сообщения.",
  },
  {
    title: "Поддержка клиентов 24/7",
    desc: "AI отвечает в Telegram и WhatsApp в любое время. Не знает ответа — переключает на живого сотрудника.",
  },
  {
    title: "Автоматизация документов",
    desc: "Загружаете файл — система извлекает данные и заносит в таблицу. Пример: автоматизация УПД для строительной компании.",
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
  { value: 20, suffix: "+", label: "проектов реализовано" },
  { value: 10, suffix: "+", label: "компаний работают с нами" },
  { value: 7, suffix: "", label: "от 7 дней — срок запуска" },
];

const EASE: [number, number, number, number] = [0.2, 0.85, 0.15, 1];

/* ── Animated counter ───────────────────────────────── */

function AnimatedCounter({
  value,
  suffix = "",
  delay = 0,
}: {
  value: number;
  suffix?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const isMobile = useIsMobile();
  // Mobile: показываем финальное значение сразу — никаких 3 параллельных
  // RAF-подсчётов на каждый scroll-tick рядом с другими тяжёлыми секциями.
  const [display, setDisplay] = useState(isMobile ? `${value}${suffix}` : `0${suffix}`);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (isMobile) return;
    if (!isInView || hasStarted.current) return;
    hasStarted.current = true;

    const timeout = setTimeout(() => {
      const start = performance.now();
      const duration = 1200;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(`${Math.round(eased * value)}${suffix}`);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, value, suffix, delay, isMobile]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}

/* ── Service card — B2 style ────────────────────────── */

function ServiceCard({
  service,
}: {
  service: (typeof SERVICES)[number];
}) {
  return (
    <div
      className="border border-ink p-6 sm:p-8 md:p-10 flex flex-col justify-between min-h-[280px] sm:min-h-[320px]"
    >
      <div>
        <h3 className="font-heading font-extrabold uppercase leading-[1.1] tracking-[-0.03em] text-[clamp(1.2rem,2.2vw,1.6rem)] mb-4">
          {service.title}
        </h3>
        <p className="text-sm leading-relaxed text-ink/50 max-w-md">
          {service.desc}
        </p>
      </div>
    </div>
  );
}

/* ── Process steps — B2 style ─────────────────────────── */

function ProcessSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const _isInView = useInView(ref, { once: true, margin: "-15% 0px" });
  void _isInView;

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 border-t border-ink">
      {STEPS.map((step) => (
        <div
          key={step.title}
          className="border-r border-ink p-8 md:p-10 last:border-r-0 max-md:border-r-0 max-md:border-b max-md:border-ink"
        >
          <h4 className="font-heading font-bold text-xl uppercase tracking-[-0.02em] mb-3">
            {step.title}
          </h4>
          <p className="text-sm leading-relaxed text-ink/50 max-w-xs">
            {step.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ── Trust numbers — B2 style ──────────────────────── */

function TrustNumbers() {
  const ref = useRef<HTMLDivElement>(null);
  const _isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  void _isInView;

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 border-t border-ink">
      {TRUST_NUMBERS.map((item, i) => (
        <div
          key={item.label}
          className="border-r border-ink px-6 sm:px-8 py-8 md:py-16 text-center last:border-r-0 max-md:border-r-0 max-md:border-b max-md:border-ink"
        >
          <span className="font-serif italic font-light text-accent leading-none block text-[clamp(2.5rem,5vw,4rem)] tracking-[-0.03em]">
            <AnimatedCounter value={item.value} suffix={item.suffix} delay={0.3 + i * 0.15} />
          </span>
          <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-muted mt-3 block">
            {item.label}
          </span>
        </div>
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
  const isMobile = useIsMobile();
  // On mobile the terminal is hidden behind a <details> toggle; don't
  // start the typing sequence until the user opens it. Keep desktop
  // behaviour unchanged — terminal runs as soon as it's in view.
  const [terminalOpen, setTerminalOpen] = useState(!isMobile);
  const terminalActive = isInView && (!isMobile || terminalOpen);
  const { lines, commandTyped, command, phase } = useTerminalSequence(
    INTEGRATIONS,
    terminalActive
  );

  const allDone = phase === "done";

  const terminalBody = (
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
  );

  const quotePanel = (
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
  );

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink">
      <div className="bg-paper p-6 md:p-10">
        {isMobile ? (
          <details
            open={terminalOpen}
            onToggle={(e) => {
              const open = (e.currentTarget as HTMLDetailsElement).open;
              console.debug("[Integrations] terminal toggled", { open });
              setTerminalOpen(open);
            }}
            className="w-full"
          >
            <summary className="list-none cursor-pointer select-none flex items-center justify-between gap-3 border border-ink px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink marker:hidden [&::-webkit-details-marker]:hidden">
              <span>Показать, как мы подключаемся</span>
              <span
                aria-hidden
                data-arrow
                className="inline-block transition-transform duration-300"
              >
                ↓
              </span>
            </summary>
            <div className="mt-3">{terminalBody}</div>
          </details>
        ) : (
          terminalBody
        )}
      </div>

      {quotePanel}

      <style>{`
        @keyframes termBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        details[open] > summary [data-arrow] { transform: rotate(180deg); }
      `}</style>
    </div>
  );
}

/* ── MacBook Pro mockup ────────────────────────────────── */

function MacBookShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const _isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  void _isInView;

  return (
    <div
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
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          >
            <source
              src="/media/automation-demo-mobile.mp4"
              type="video/mp4"
              media="(max-width: 767px)"
            />
            <source src="/media/automation-demo.mp4" type="video/mp4" />
          </video>
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
  const _isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  void _isInView;

  return (
    <div ref={ref} className="flex flex-col justify-center py-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-4">
        Как это работает
      </p>

      <h3 className="font-heading font-extrabold uppercase leading-[1.1] tracking-[-0.03em] text-[clamp(1.5rem,3vw,2.4rem)] mb-6">
        Ваш бизнес на автопилоте
      </h3>

      <div className="space-y-4">
        {SHOWCASE_BULLETS.map((text, i) => (
          <div
            key={i}
            className="flex items-start gap-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
            <p className="text-[15px] leading-relaxed text-ink/55">
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Tegaki title ────────────────────────────────────── */

function AutomationStaticTitle() {
  return (
    <h2
      className="font-serif italic font-light text-accent leading-none"
      style={{
        fontSize: "clamp(4rem, 12vw, 10rem)",
        letterSpacing: "-0.02em",
      }}
    >
      Автоматизация
    </h2>
  );
}

function AutomationTitle() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const skipTegaki = isMobile || reducedMotion;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 40%"],
  });

  const subtitleOpacity = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0.5, 0.75], [15, 0]);

  // Mobile: subtitle visible immediately, no per-frame scroll commits.
  const subtitleStyle = isMobile
    ? { opacity: 1, y: 0 }
    : { opacity: subtitleOpacity, y: subtitleY };

  return (
    <div
      ref={ref}
      className="px-6 pt-16 pb-10 md:px-10 md:pt-24 md:pb-14 border-t border-ink"
    >
      <div className="max-w-6xl mx-auto text-center">
        <div className="relative inline-block">
          {skipTegaki ? (
            <AutomationStaticTitle />
          ) : (
            <Suspense fallback={<AutomationStaticTitle />}>
              <AutomationTegaki isInView={isInView} />
            </Suspense>
          )}
        </div>

        <motion.p
          className="font-mono text-sm md:text-base text-muted mt-4 max-w-lg mx-auto tracking-wide"
          style={subtitleStyle}
        >
          Строим AI-ботов и автоматизируем процессы для малого и среднего бизнеса. От уведомлений до сложных систем обработки документов.
        </motion.p>
      </div>
    </div>
  );
}

/* ── Main section ─────────────────────────────────────── */

export function AutomationSection() {
  const isMobile = useIsMobile();

  if (isMobile) return <AutomationSectionMobile />;

  return (
    <section
      id="automation"
      className="bg-paper border-b border-ink"
    >
      {/* ── Head — tegaki title ── */}
      <AutomationTitle />

      {/* ── Headline ── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="py-16 sm:py-24 md:py-36">
          <p className="font-heading font-extrabold uppercase leading-[1.1] text-center max-w-5xl mx-auto tracking-[-0.03em] text-[clamp(1.75rem,4.5vw,4rem)]">
            Мы автоматизируем бизнес<br />Создаём AI-агентов<br />Под ключ
          </p>
        </div>
      </div>

      {/* ── Showcase — MacBook on desktop ── */}
      <div className="max-w-[90rem] mx-auto px-5 sm:px-6 md:px-12 mb-16 sm:mb-24 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-8 md:gap-16 items-center">
          <MacBookShowcase />
          <ShowcaseText />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        {/* ── Service cards — 3-col grid ── */}
        <div className="mb-16 sm:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink">
            {SERVICES.map((service) => (
              <div key={service.title} className="bg-paper">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Statement ── */}
        <div className="py-12 sm:py-16 md:py-24">
          <p className="font-heading font-extrabold uppercase leading-[1.1] max-w-5xl mx-auto text-center tracking-[-0.03em] text-[clamp(1.5rem,4vw,3.75rem)]">
            Ваша команда занимается стратегией — рутину берёт на себя AI
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

      </div>
    </section>
  );
}

/**
 * Mobile-first вариант секции «Автоматизация»: тот же контент, но
 * сжат до одного-двух экранов сверху + всё остальное скрыто за
 * единственным `<details>`. Раньше секция занимала ~3000–3500 px
 * длинного скролла с тяжёлым layout/decode на каждый pixel — это
 * был главный источник лагов на телефоне.
 */
function AutomationSectionMobile() {
  return (
    <section id="automation" className="bg-paper border-b border-ink">
      <AutomationTitle />

      {/* Compact headline */}
      <div className="px-5 py-10">
        <p className="font-heading font-extrabold uppercase leading-[1.05] text-center tracking-[-0.03em] text-[clamp(1.5rem,7vw,2.25rem)]">
          Мы автоматизируем бизнес<br />и создаём AI-агентов под ключ
        </p>
      </div>

      {/* Showcase: iPhone + bullets */}
      <div className="px-5 pb-10">
        <IPhoneShowcase />
        <div className="mt-8">
          <ShowcaseText />
        </div>
      </div>

      {/* Service cards — компактный stack */}
      <div className="px-5 pb-10">
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted mb-4">
          Услуги
        </div>
        <div className="flex flex-col gap-px bg-ink">
          {SERVICES.map((service) => (
            <div key={service.title} className="bg-paper p-5">
              <h3 className="font-heading font-extrabold uppercase leading-[1.15] tracking-[-0.025em] text-[17px] mb-2">
                {service.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-ink/65">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Statement */}
      <div className="px-5 py-10 border-t border-b border-ink/15">
        <p className="font-heading font-extrabold uppercase leading-[1.1] text-center tracking-[-0.03em] text-[clamp(1.25rem,6vw,1.85rem)]">
          Ваша команда занимается стратегией — рутину берёт на себя&nbsp;AI
        </p>
      </div>

      {/* Подробнее: всё остальное (process + trust numbers + integrations) */}
      <div className="px-5 py-8">
        <details className="group">
          <summary className="list-none cursor-pointer select-none flex items-center justify-between gap-3 border border-ink px-4 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink marker:hidden [&::-webkit-details-marker]:hidden">
            <span>Подробнее о процессе и интеграциях</span>
            <span aria-hidden data-arrow className="inline-block transition-transform duration-300">↓</span>
          </summary>

          <div className="mt-6 space-y-10">
            {/* Process */}
            <div>
              <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted mb-4">
                Как работаем
              </div>
              <ProcessSteps />
            </div>

            {/* Trust numbers */}
            <div>
              <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted mb-4">
                Цифры
              </div>
              <TrustNumbers />
            </div>

            {/* Integrations */}
            <div>
              <Integrations />
            </div>
          </div>
        </details>
        <style>{`
          details[open] > summary [data-arrow] { transform: rotate(180deg); }
        `}</style>
      </div>
    </section>
  );
}
