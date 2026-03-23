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

/* ── Animated counter ─────────────────────────────────── */

function AnimatedCounter({
  value,
  suffix = "",
  isCustom = false,
}: {
  value: number;
  suffix?: string;
  isCustom?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 25,
    restDelta: 0.5,
  });

  const display = useTransform(springValue, (v) =>
    `${Math.round(v)}${suffix}`
  );

  if (isInView && !isCustom) {
    springValue.set(value);
  }

  if (isCustom) {
    return (
      <motion.span
        ref={ref}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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

/* ── Word-by-word headline ────────────────────────────── */

function HeadlineWord({
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

/* ── Service card ─────────────────────────────────────── */

function ServiceCard({
  service,
  index,
  total,
}: {
  service: (typeof SERVICES)[number];
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  const numericMatch = service.metric.match(/\d+/);
  const numericValue = numericMatch ? parseInt(numericMatch[0]) : 0;
  const suffix = service.metric.replace(/\d+/, "");
  const isCustom = "isCustomMetric" in service && service.isCustomMetric;

  const isLastRow = index >= total - (total % 2 || 2);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`
        flex flex-col justify-between p-6 md:p-10 min-h-[300px] md:min-h-[380px]
        border-b border-black/10
        ${isEven && !isLastRow ? "md:border-r" : ""}
        ${isEven && isLastRow && total % 2 !== 0 ? "" : isEven ? "md:border-r" : ""}
      `}
    >
      {/* Content */}
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

      {/* Metric */}
      <div className="mt-8 pt-6 border-t border-black/10">
        <span
          className="font-heading leading-none block text-black"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          <AnimatedCounter
            value={numericValue}
            suffix={suffix}
            isCustom={isCustom}
          />
        </span>
        <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.15em] text-black/40 mt-1 block">
          {service.metricLabel}
        </span>
      </div>
    </motion.div>
  );
}

/* ── Main section ─────────────────────────────────────── */

export function AutomationSection() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-5% 0px" });

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
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
            <HeadlineWord
              key={i}
              word={word}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
            />
          ))}
        </p>
      </div>

      {/* ── Service cards (2×2 grid) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {SERVICES.map((service, i) => (
          <ServiceCard
            key={service.title}
            service={service}
            index={i}
            total={SERVICES.length}
          />
        ))}
      </div>

      {/* ── CTA ── */}
      <motion.div
        className="border-t border-black/10 px-6 py-12 md:px-10 md:py-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={sectionInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <a
          href="mailto:hello@aibromotion.com"
          className="inline-block font-heading text-sm md:text-base uppercase tracking-[0.1em] border border-black px-8 py-4 hover:bg-black hover:text-white transition-colors duration-300"
        >
          Обсудить автоматизацию
        </a>
      </motion.div>
    </motion.section>
  );
}
