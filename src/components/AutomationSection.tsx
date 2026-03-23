import { useRef } from "react";
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

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Animated counter (delayed start) ─────────────────── */

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

function WordByWordBlock({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 40%"],
  });
  const words = text.split(" ");

  return (
    <div ref={ref} className="px-6 py-16 md:px-10 md:py-24">
      <p
        className="font-heading uppercase leading-[1.1] max-w-5xl mx-auto text-center"
        style={{ fontSize: "clamp(1.5rem, 4vw, 3.75rem)" }}
      >
        {words.map((word, i) => (
          <RevealWord
            key={i}
            word={word}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
          />
        ))}
      </p>
    </div>
  );
}

/* ── Animated divider ─────────────────────────────────── */

function AnimatedDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        className="h-px bg-black/10"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [...EASE] }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}

/* ── Service card (alternating direction) ─────────────── */

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  const numericMatch = service.metric.match(/\d+/);
  const numericValue = numericMatch ? parseInt(numericMatch[0]) : 0;
  const suffix = service.metric.replace(/\d+/, "");
  const isCustom = "isCustomMetric" in service && service.isCustomMetric;

  const isEven = index % 2 === 0;
  // Alternate: even cards slide from left, odd from right
  const xOffset = isEven ? -30 : 30;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: xOffset }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: index * 0.08,
        ease: [...EASE],
      }}
      className={`
        flex flex-col justify-between p-6 md:p-10 min-h-[300px] md:min-h-[380px]
        border-b border-black/10
        ${isEven ? "md:border-r" : ""}
      `}
    >
      <div>
        <h3
          className="font-heading uppercase leading-[1.15] mb-4"
          style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
        >
          {service.title}
        </h3>
        <p className="font-body text-xs md:text-sm leading-relaxed text-black/50 max-w-md">
          {service.desc}
        </p>
      </div>

      {/* Metric — delayed after card appears */}
      <div className="mt-8 pt-6 border-t border-black/10">
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
        <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.15em] text-black/40 mt-1 block">
          {service.metricLabel}
        </span>
      </div>
    </motion.div>
  );
}

/* ── Process steps with connecting line ───────────────── */

function ProcessSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <div ref={ref}>
      <AnimatedDivider />
      <div className="grid grid-cols-1 md:grid-cols-3 relative">
        {/* Connecting line (desktop only) */}
        <motion.div
          className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-px bg-black/[0.06] -translate-y-1/2 pointer-events-none"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.3, ease: [...EASE] }}
          style={{ transformOrigin: "left" }}
        />

        {STEPS.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, clipPath: "inset(15% 15% 15% 15%)" }}
            animate={
              isInView
                ? { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }
                : {}
            }
            transition={{
              duration: 0.9,
              delay: i * 0.2,
              ease: [...EASE],
            }}
            className={`relative p-6 md:p-10 ${i < 2 ? "border-b md:border-b-0 md:border-r border-black/10" : ""}`}
          >
            {/* Step dot */}
            <motion.div
              className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-black/20"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.5 + i * 0.2,
                ease: [...EASE],
              }}
            />
            <span className="font-body text-[10px] uppercase tracking-[0.2em] text-black/25">
              Шаг {step.num}
            </span>
            <h4
              className="font-heading uppercase leading-[1.15] mt-3 mb-3"
              style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
            >
              {step.title}
            </h4>
            <p className="font-body text-xs md:text-sm leading-relaxed text-black/40 max-w-xs">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Trust numbers (scale entrance + parallax) ────────── */

function TrustNumbers() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  return (
    <div ref={ref}>
      <AnimatedDivider />
      <motion.div style={{ y }} className="grid grid-cols-1 md:grid-cols-3">
        {TRUST_NUMBERS.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.9,
              delay: i * 0.15,
              ease: [...EASE],
            }}
            className={`px-6 py-10 md:px-10 md:py-14 text-center ${i < 2 ? "border-b md:border-b-0 md:border-r border-black/10" : ""}`}
          >
            <span
              className="font-heading leading-none block text-black"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              <AnimatedCounter
                value={item.value}
                suffix={item.suffix}
                delay={0.3 + i * 0.15}
              />
            </span>
            <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.15em] text-black/35 mt-2 block">
              {item.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Integrations (cascade wave) ──────────────────────── */

function Integrations() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref}>
      <AnimatedDivider />
      <div className="px-6 py-10 md:px-10 md:py-14">
        <motion.p
          className="font-body text-[10px] uppercase tracking-[0.2em] text-black/25 mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: [...EASE] }}
        >
          Интеграции
        </motion.p>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-3xl mx-auto">
          {INTEGRATIONS.map((name, i) => (
            <motion.span
              key={name}
              initial={{ opacity: 0, scale: 0.8, y: 16 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.1 + i * 0.04,
                ease: [...EASE],
              }}
              className="font-body text-[11px] md:text-xs uppercase tracking-[0.1em] text-black/50 border border-black/10 rounded-full px-4 py-2 hover:text-black hover:border-black/30 transition-colors duration-300"
            >
              {name}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main section ─────────────────────────────────────── */

export function AutomationSection() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
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

  const headlineText =
    "Мы автоматизируем бизнес. Создаём AI-агентов. Под ключ.";
  const words = headlineText.split(" ");

  return (
    <motion.section
      ref={sectionRef}
      id="automation"
      className="bg-white"
      initial={{ opacity: 0 }}
      animate={sectionInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: [...EASE] }}
    >
      {/* ── Headline ── */}
      <div
        ref={headlineRef}
        className="px-6 py-20 md:px-10 md:py-28 border-t border-black"
      >
        <p
          className="font-heading uppercase leading-[1.1] text-center max-w-5xl mx-auto"
          style={{ fontSize: "clamp(1.75rem, 4.5vw, 4rem)" }}
        >
          {words.map((word, i) => (
            <RevealWord
              key={i}
              word={word}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
            />
          ))}
        </p>
      </div>

      {/* ── Service cards (2×2) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.title} service={service} index={i} />
        ))}
      </div>

      {/* ── Statement ── */}
      <WordByWordBlock text="Ваша команда занимается стратегией — рутину берёт на себя AI." />

      {/* ── How it works ── */}
      <ProcessSteps />

      {/* ── Trust numbers ── */}
      <TrustNumbers />

      {/* ── Integrations ── */}
      <Integrations />

      {/* ── CTA (own inView) ── */}
      <div ref={ctaRef}>
        <AnimatedDivider />
        <motion.div
          className="px-6 py-12 md:px-10 md:py-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [...EASE] }}
        >
          <a
            href="mailto:hello@aibromotion.com"
            className="inline-block font-heading text-sm md:text-base uppercase tracking-[0.1em] border border-black px-8 py-4 hover:bg-black hover:text-white transition-colors duration-300"
          >
            Обсудить автоматизацию
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
