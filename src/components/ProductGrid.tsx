import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { StatementBlock } from "@/components/StatementBlock";
import { ScrollReveal } from "@/components/ScrollReveal";

/*
 * Video orientations:
 *   portrait  → timeline3.mp4, heroes.mp4, result.mp4
 *   landscape → hero.png, robot.mp4, basket.mp4, done.mp4, timeline.mp4
 *
 * Layout: storytelling scroll — one content piece per section,
 * text with **bold** accents in salmon, alternating layouts.
 */

/** Parallax video with aspect ratio */
function ParallaxVideo({
  src,
  aspect = "landscape",
}: {
  src: string;
  aspect?: "landscape" | "portrait";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.02]);

  const aspectClass =
    aspect === "portrait" ? "aspect-[3/4]" : "aspect-video";

  return (
    <div ref={ref} className={`relative ${aspectClass} overflow-hidden rounded-lg`}>
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
}

/** Full-width video section with text overlay */
function FullVideoSection({
  src,
  children,
  align = "bottom",
}: {
  src: string;
  children: React.ReactNode;
  align?: "center" | "bottom";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.02]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${align === "bottom" ? "flex items-end" : "flex items-center"}`}
      style={{ minHeight: "70vh" }}
    >
      <motion.div className="absolute inset-0" style={{ scale }}>
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </motion.div>
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
      <div className="relative z-10 px-6 md:px-16 lg:px-24 py-12 md:py-20 w-full">
        {children}
      </div>
    </div>
  );
}


export function ProductGrid() {
  return (
    <section className="bg-white overflow-hidden">
      {/* ── 1. Heroes — portrait video left, text right ── */}
      <div className="px-6 md:px-16 lg:px-24 py-12 md:py-20">
        <div className="grid md:grid-cols-[4fr_1fr] gap-8 md:gap-12 items-center">
          <ScrollReveal variant="slide-left">
            <ParallaxVideo src="/media/heroes.mp4" aspect="portrait" />
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.15}>
            <StatementBlock
              text="Каждый кадр — это **история** Мы превращаем концепции в визуальные переживания"
            />
          </ScrollReveal>
        </div>
      </div>

      {/* ── 5. Basket — full-width video with text overlay ── */}
      <ScrollReveal variant="clip-reveal">
        <FullVideoSection src="/media/basket.mp4" align="bottom">
          <p
            className="font-heading uppercase leading-[1.15] text-white max-w-3xl"
            style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)" }}
          >
            <strong className="font-bold text-[var(--color-salmon)]">Динамика</strong>{" "}
            в каждом движении. Спорт, экшн, энергия — мы ловим момент
          </p>
        </FullVideoSection>
      </ScrollReveal>

      {/* ── 5. Result — text left, portrait video right ── */}
      <div className="px-6 md:px-16 lg:px-24 py-12 md:py-20">
        <div className="grid md:grid-cols-[1fr_4fr] gap-8 md:gap-12 items-center">
          <ScrollReveal variant="fade-up">
            <StatementBlock
              text="От идеи до **результата** Полный цикл продакшена с AI-ускорением"
            />
            <p className="font-body text-sm md:text-base text-black/40 mt-4 max-w-md px-6 md:px-10">
              Мы берём на себя весь процесс — от концепта до финального рендера.
            </p>
          </ScrollReveal>
          <ScrollReveal variant="slide-right" delay={0.15}>
            <ParallaxVideo src="/media/result.mp4" aspect="portrait" />
          </ScrollReveal>
        </div>
      </div>

      {/* ── 7. Done — full-width video with text overlay ── */}
      <ScrollReveal variant="clip-reveal">
        <FullVideoSection src="/media/done.mp4" align="center">
          <p
            className="font-heading uppercase leading-[1.15] text-white max-w-3xl"
            style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)" }}
          >
            <strong className="font-bold text-[var(--color-salmon)]">Готово</strong>{" "}
            быстрее, чем вы думали. AI автоматизирует рутину — мы фокусируемся на креативе
          </p>
        </FullVideoSection>
      </ScrollReveal>

      {/* ── 7. Timeline3 — video left, text right ── */}
      <div className="px-6 md:px-16 lg:px-24 py-12 md:py-20">
        <div className="grid md:grid-cols-[4fr_1fr] gap-8 md:gap-12 items-center">
          <ScrollReveal variant="slide-left">
            <ParallaxVideo src="/media/timeline3.mp4" aspect="portrait" />
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.15}>
            <StatementBlock
              text="Контроль каждой **детали** Точный тайминг, идеальная синхронизация"
            />
          </ScrollReveal>
        </div>
      </div>

      {/* ── 8. Timeline — full-width video with text overlay ── */}
      <ScrollReveal variant="clip-reveal">
        <FullVideoSection src="/media/timeline.mp4" align="bottom">
          <p
            className="font-heading uppercase leading-[1.15] text-white max-w-3xl"
            style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)" }}
          >
            Ваша история заслуживает{" "}
            <strong className="font-bold text-[var(--color-salmon)]">лучшего</strong>
          </p>
        </FullVideoSection>
      </ScrollReveal>

    </section>
  );
}
