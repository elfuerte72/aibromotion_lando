import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  type MotionValue,
} from "framer-motion";
import { TegakiRenderer, type TegakiRendererHandle } from "tegaki/react";
import caveatCyrillic from "@/fonts/caveat-cyrillic/bundle";

/* ── Data ─────────────────────────────────────────────── */

const EASE = [0.16, 1, 0.3, 1] as const;
const TOTAL_STEPS = 5;
const TOP_OFFSET = 28;

interface FunnelStep {
  title: string;
  desc: string;
  metrics: { value: string; label: string }[];
}

const FUNNEL_STEPS: FunnelStep[] = [
  {
    title: "Стратегия",
    desc: "Глубокий анализ рынка, конкурентов и целевой аудитории. Формируем позиционирование и дорожную карту продвижения на основе данных.",
    metrics: [
      { value: "12+", label: "конкурентов анализируем" },
      { value: "48ч", label: "глубина исследования" },
    ],
  },
  {
    title: "Контент",
    desc: "AI-видео, фото, копирайтинг, контент для соцсетей. Создаём визуальные высказывания, которые невозможно пролистать.",
    metrics: [
      { value: "500+", label: "единиц контента/мес" },
      { value: "3×", label: "быстрее с AI" },
    ],
  },
  {
    title: "Продвижение",
    desc: "SEO, SMM, таргетированная и контекстная реклама. Каждый канал работает в связке, усиливая общий эффект.",
    metrics: [
      { value: "4.8%", label: "средний CTR" },
      { value: "320%", label: "ROI кампаний" },
    ],
  },
  {
    title: "Аналитика",
    desc: "Отслеживаем каждую метрику, проводим A/B тесты, оптимизируем воронку. Данные — основа каждого решения.",
    metrics: [
      { value: "15+", label: "A/B тестов в месяц" },
      { value: "47%", label: "рост конверсии" },
    ],
  },
  {
    title: "Результат",
    desc: "Измеримый рост бизнеса. Полная прозрачность. Окупаемость в первые месяцы.",
    metrics: [
      { value: "2.5×", label: "рост выручки" },
      { value: "3 мес", label: "до окупаемости" },
    ],
  },
];

/* Card styles matching pop-culture images */
const CARD_STYLES: { bg: string; rgba: string; light?: boolean }[] = [
  { bg: "#2a2018", rgba: "42,32,24" },          // warm brown (Wolf of Wall Street)
  { bg: "#1a1a1a", rgba: "26,26,26" },          // dark gray (B&W collage)
  { bg: "#2a1518", rgba: "42,21,24" },          // dark crimson (Scarface)
  { bg: "#0f1028", rgba: "15,16,40" },          // deep night blue (Wall-E)
  { bg: "#2a2010", rgba: "42,32,16" },          // dark gold (Scrooge McDuck)
];

const CARD_IMAGES = [
  "/media/Two Men.webp",
  "/media/964c5da6e66e6d71869cbc6c4bb2b0fd_6e6167af_87f0_4657_bdb1_31baef96928d.webp",
  "/media/cdd847e9817c8fd18eac9ff176d4f849_25093256_5f0f_4b21_b93a_ec120e75d2a9.webp",
  "/media/Валли 1.webp",
  "/media/0c13e9670a4ad31341ced75d22fc0aab_9ccd4ab1_ce0e_476b_b655_d2498ef3674d.webp",
];

/* ── Hooks ────────────────────────────────────────────── */

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

/* ── Transition bridge — horizontal wipe ─────────────── */

function TransitionBridge() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  const lines = ["Не только видео.", "Полная упаковка маркетинга."];

  return (
    <div ref={ref} className="px-6 py-20 md:px-10 md:py-32 text-center">
      {lines.map((line, i) => (
        <motion.p
          key={line}
          className="font-heading uppercase leading-[1.15] text-black/80"
          style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.75rem)" }}
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
          transition={{
            duration: 1.2,
            delay: i * 0.25,
            ease: [...EASE],
          }}
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}

/* ── Large "Маркетинг" — tegaki handwriting ──────────── */

function LargeTitle() {
  const ref = useRef<HTMLDivElement>(null);
  const tegakiRef = useRef<TegakiRendererHandle>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 40%"],
  });

  /* Subtitle fades in after handwriting completes */
  const subtitleOpacity = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0.5, 0.75], [15, 0]);

  return (
    <div
      ref={ref}
      className="px-6 pt-16 pb-10 md:px-10 md:pt-24 md:pb-14 border-t border-black"
    >
      <div className="max-w-6xl mx-auto text-center">
        <div className="relative inline-block">
          <TegakiRenderer
            ref={tegakiRef}
            font={caveatCyrillic}
            time={
              isInView
                ? { mode: "uncontrolled", speed: 1, delay: 0.2 }
                : { mode: "controlled", value: 0 }
            }
            style={{
              fontSize: "clamp(4rem, 12vw, 10rem)",
              lineHeight: 1,
              color: "var(--color-salmon)",
            }}
            effects={{
              pressureWidth: { strength: 0.6 },
              taper: { startLength: 0.1, endLength: 0.15 },
            }}
          >
            Маркетинг
          </TegakiRenderer>
        </div>

        <motion.p
          className="font-body text-sm md:text-base text-black/40 mt-4 max-w-lg mx-auto"
          style={{ opacity: subtitleOpacity, y: subtitleY }}
        >
          Стратегия, контент и продвижение — в одном пакете
        </motion.p>
      </div>
    </div>
  );
}

/* ── Stacked card (desktop) ──────────────────────────── */

function StackedCard({
  step,
  index,
  progress,
}: {
  step: FunnelStep;
  index: number;
  progress: MotionValue<number>;
}) {
  const { bg, rgba, light } = CARD_STYLES[index];
  const isLast = index === TOTAL_STEPS - 1;

  const scaleStep = 1 / (TOTAL_STEPS - 1);
  const rangeStart = index * scaleStep;
  const rangeEnd = Math.min(rangeStart + scaleStep, 1);
  const targetScale = 1 - (TOTAL_STEPS - 1 - index) * 0.04;

  const scale = useTransform(
    progress,
    isLast ? [0, 1] : [rangeStart, rangeEnd],
    isLast ? [1, 1] : [1, targetScale]
  );

  /* Text colors adapt to light/dark card */
  const textPrimary = light ? "text-black" : "text-white";
  void (light ? "text-black/40" : "text-white/40");
  const textBody = light ? "text-black/55" : "text-white/55";
  const textDim = light ? "text-black/35" : "text-white/35";

  return (
    <div
      className="sticky top-0 flex items-center px-3 md:px-8"
      style={{
        height: "100vh",
        zIndex: index + 1,
        paddingTop: `${index * TOP_OFFSET}px`,
      }}
    >
      <motion.div
        className="w-full relative rounded-2xl md:rounded-3xl overflow-hidden"
        style={{
          height: "clamp(480px, 72vh, 780px)",
          scale,
          transformOrigin: "top center",
          backgroundColor: bg,
          boxShadow: light
            ? "0 8px 50px rgba(0,0,0,0.12)"
            : "0 8px 50px rgba(0,0,0,0.25)",
        }}
      >
        {/* Background photo */}
        <img
          src={CARD_IMAGES[index]}
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ opacity: light ? 0.7 : 0.65 }}
        />

        {/* Gradient overlay — solid on left (text), transparent on right */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(105deg, rgba(${rgba},0.85) 5%, rgba(${rgba},0.4) 40%, rgba(${rgba},0.05) 70%)`,
          }}
        />

        {/* Content — bottom-left */}
        <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12 lg:p-16">
          <h3
            className={`font-heading uppercase leading-[1.05] tracking-tight mb-4 ${textPrimary}`}
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            {step.title}
          </h3>

          <p className={`font-body text-xs md:text-sm leading-relaxed max-w-md mb-8 ${textBody}`}>
            {step.desc}
          </p>

          <div className="flex gap-8 md:gap-12">
            {step.metrics.map((m) => (
              <div key={m.label}>
                <span
                  className={`font-heading leading-none block ${textPrimary}`}
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                >
                  {m.value}
                </span>
                <span className={`font-body text-[9px] md:text-[10px] uppercase tracking-[0.12em] mt-1 block ${textDim}`}>
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Desktop stacked cards container ─────────────────── */

function DesktopStackedCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef}>
      {FUNNEL_STEPS.map((step, i) => (
        <StackedCard
          key={step.title}
          step={step}
          index={i}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}

/* ── Mobile card ─────────────────────────────────────── */

function MobileCard({
  step,
  index,
}: {
  step: FunnelStep;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const { bg, rgba, light } = CARD_STYLES[index];

  const textPrimary = light ? "text-black" : "text-white";
  void (light ? "text-black/40" : "text-white/40");
  const textBody = light ? "text-black/55" : "text-white/55";
  const textDim = light ? "text-black/35" : "text-white/35";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [...EASE] }}
      className="mx-3 mb-3 relative rounded-2xl overflow-hidden"
      style={{ backgroundColor: bg, minHeight: "55vh" }}
    >
      <img
        src={CARD_IMAGES[index]}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: light ? 0.65 : 0.6 }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, rgba(${rgba},0.1) 0%, rgba(${rgba},0.85) 55%)`,
        }}
      />

      <div className="relative z-10 flex flex-col justify-end p-6 pt-32">
        <h3
          className={`font-heading uppercase leading-[1.1] mb-3 ${textPrimary}`}
          style={{ fontSize: "clamp(1.75rem, 5vw, 2.5rem)" }}
        >
          {step.title}
        </h3>

        <p className={`font-body text-xs leading-relaxed max-w-md mb-6 ${textBody}`}>
          {step.desc}
        </p>

        <div className="flex gap-8">
          {step.metrics.map((m) => (
            <div key={m.label}>
              <span
                className={`font-heading leading-none block ${textPrimary}`}
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
              >
                {m.value}
              </span>
              <span className={`font-body text-[9px] uppercase tracking-[0.12em] mt-1 block ${textDim}`}>
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main section ─────────────────────────────────────── */

export function MarketingSection() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, {
    once: true,
    margin: "-5% 0px",
  });
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-10% 0px" });

  return (
    <motion.section
      ref={sectionRef}
      id="marketing"
      className="bg-white"
      initial={{ opacity: 0 }}
      animate={sectionInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: [...EASE] }}
    >
      {/* ── Transition bridge (end of creative context) ── */}
      <TransitionBridge />

      {/* ── Large "Маркетинг" — scroll-linked wow ── */}
      <LargeTitle />

      {/* ── Stacked Cards / Mobile Cards ── */}
      {isMobile ? (
        <div>
          {FUNNEL_STEPS.map((step, i) => (
            <MobileCard key={step.title} step={step} index={i} />
          ))}
        </div>
      ) : (
        <DesktopStackedCards />
      )}

      {/* ── CTA ── */}
      <div ref={ctaRef}>
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
            Обсудить маркетинг
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
