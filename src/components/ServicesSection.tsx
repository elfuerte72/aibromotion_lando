import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

type Service = {
  n: string;
  t: string;
  body: string;
  tags: string[];
  media?:
    | { type: "video"; src: string }
    | { type: "image"; src: string };
};

const SERVICES: Service[] = [
  { n: "01", t: "Видео", body: "Рекламные ролики, имиджевые фильмы, клипы. Съёмка, пост, цвет, звук. Полный цикл.", tags: ["Ads", "Film", "Motion"], media: { type: "video", src: "/media/gotovo.mp4" } },
  { n: "02", t: "Креатив", body: "Стратегия, идея, сценарий, арт-дирекшн. От задачи к визуальной системе.", tags: ["Strategy", "Art", "Copy"], media: { type: "image", src: "/media/footer-bg.webp" } },
  { n: "03", t: "Маркетинг", body: "Performance-кампании, контент-план, дистрибуция. Запуск → тест → масштаб.", tags: ["Growth", "Paid", "SMM"], media: { type: "image", src: "/media/service-marketing.webp" } },
  { n: "04", t: "ИИ-аватары", body: "Цифровые ведущие и амбассадоры. Синтез голоса, липсинк, 40 роликов за ночь.", tags: ["AI", "Voice", "Lip"], media: { type: "image", src: "/media/hero.webp" } },
  { n: "05", t: "AI-агенты", body: "Кастомные ассистенты для продаж, поддержки, HR. Интеграция с CRM, TG, WA.", tags: ["LLM", "Ops", "API"], media: { type: "image", src: "/media/service-ai-agent.webp" } },
  { n: "06", t: "Автоматизация", body: "Оцифровка процессов от заявки до отчёта. Меньше рутины — выше ROI.", tags: ["Flow", "n8n", "API"], media: { type: "image", src: "/media/service-automation.webp" } },
];

export function ServicesSection() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-10%" });

  return (
    <section id="services" className="border-b border-ink">
      {/* Head */}
      <div ref={headRef} className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-24 px-6 pt-[100px] pb-10 border-b border-ink">
        <div className="min-w-0">
          <div className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-muted mb-4">
            [03] Services
          </div>
          <h2 className="font-heading font-extrabold uppercase leading-[0.84] tracking-[-0.055em] text-[clamp(56px,9vw,160px)]">
            Шесть<br />
            <span className="font-serif italic font-light tracking-[-0.03em]">дисциплин.</span>
          </h2>
        </div>
        <div className="max-w-[440px] text-[15px] leading-relaxed self-end lg:justify-self-end">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.12, ease }}
          >
            От первой линии сценария до обученного агента в Telegram — всё решает одна команда. Один бриф — один контракт — один владелец результата.
          </motion.p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.n} service={s} index={i} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({
  service: s,
  index,
}: {
  service: Service;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const handleEnter = () => {
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      void v.play().catch(() => {});
    }
  };
  const handleLeave = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.06, ease }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group relative p-7 pt-10 border-r border-b border-ink last:lg:border-r-0 [&:nth-child(3)]:lg:border-r-0 min-h-[460px] flex flex-col justify-between overflow-hidden cursor-pointer max-lg:border-r-0 transition-colors duration-500 hover:text-paper"
    >
      {/* Hover bg slide (orange + optional media with duotone) */}
      <div className="absolute inset-0 bg-accent translate-y-full transition-transform duration-[600ms] ease-[cubic-bezier(0.2,0.85,0.15,1)] group-hover:translate-y-0 z-0 overflow-hidden">
        {s.media?.type === "video" && (
          <video
            ref={videoRef}
            src={s.media.src}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-0 transition-opacity duration-500 group-hover:opacity-100 [filter:grayscale(100%)_contrast(1.1)_brightness(1.05)]"
          />
        )}
        {s.media?.type === "image" && (
          <img
            src={s.media.src}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-0 transition-opacity duration-500 group-hover:opacity-100 [filter:grayscale(100%)_contrast(1.1)_brightness(1.05)]"
          />
        )}
        {/* Bottom dim gradient for text legibility over media */}
        {s.media && (
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-accent to-transparent pointer-events-none" />
        )}
      </div>

      {/* Content */}
      <div className="relative z-[1]">
        <div className="flex justify-between items-start">
          <span className="font-mono text-xs font-medium tracking-[0.16em] text-muted group-hover:text-paper/70 transition-colors">
            [{s.n}]
          </span>
          <span className="w-12 h-12 border border-current grid place-items-center text-lg transition-all duration-400 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:rotate-[-45deg] group-hover:bg-ink group-hover:text-accent">
            ↗
          </span>
        </div>
      </div>

      <div className="relative z-[1]">
        <h3 className="font-heading font-extrabold text-[clamp(28px,2.6vw,40px)] tracking-[-0.03em] uppercase leading-none mt-6">
          {s.t}
        </h3>
        <p className="text-sm leading-relaxed mt-5 max-w-[320px]">{s.body}</p>
        <div className="mt-[18px] flex gap-[5px] flex-wrap">
          {s.tags.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] font-medium tracking-[0.12em] uppercase py-1.5 px-2.5 border border-current"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

    </motion.div>
  );
}
