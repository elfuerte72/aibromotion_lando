import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { toAvif, toMobileVideo } from "@/lib/media";
import type { Service } from "./serviceData";
import { WebCodeTyping } from "./WebCodeTyping";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

/**
 * Desktop / ≥lg hover variant of the Services grid.
 *
 * Layout: bento "tetris" — 4 cols × 3 rows at lg, each card declares its
 * placement via `BENTO_LAYOUT[s.n]`. Mobile (<lg) keeps a single column
 * stack (in practice the mobile carousel renders instead — see
 * `ServicesSection`). Border-removal classes are baked into the bento
 * map so cards on the right/bottom edges of the grid drop the duplicate
 * outer line.
 *
 * Visual order:
 *   Row 1: [—— 01 ──][02][04↓]
 *   Row 2: [—— 07 ──][03][04↑]
 *   Row 3: [—— 05 ──][—— 06 ──]
 */
const BENTO_LAYOUT: Record<string, string> = {
  // wide top-left (2 cols)
  "01": "lg:col-start-1 lg:col-span-2 lg:row-start-1",
  // square top-mid
  "02": "lg:col-start-3 lg:row-start-1",
  // square mid-mid
  "03": "lg:col-start-3 lg:row-start-2",
  // vertical right (1 col × 2 rows) — touches grid right edge
  "04": "lg:col-start-4 lg:row-start-1 lg:row-span-2 lg:border-r-0",
  // wide bottom-left (2 cols) — touches grid bottom
  "05": "lg:col-start-1 lg:col-span-2 lg:row-start-3 lg:border-b-0",
  // wide bottom-right (2 cols) — touches grid bottom AND right
  "06": "lg:col-start-3 lg:col-span-2 lg:row-start-3 lg:border-r-0 lg:border-b-0",
  // wide mid-left (2 cols) — new "Сайты" card
  "07": "lg:col-start-1 lg:col-span-2 lg:row-start-2",
};

export function ServicesHoverGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 lg:auto-rows-[440px]">
      {services.map((s, i) => (
        <ServiceHoverCard
          key={s.n}
          service={s}
          index={i}
          bentoClass={BENTO_LAYOUT[s.n] ?? ""}
        />
      ))}
    </div>
  );
}

function ServiceHoverCard({
  service: s,
  index,
  bentoClass,
}: {
  service: Service;
  index: number;
  bentoClass: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ambientRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  // Hover state — нужен для controlled-анимаций внутри панели (см. WebCodeTyping).
  const [isHovered, setIsHovered] = useState(false);

  const handleEnter = () => {
    setIsHovered(true);
    // Hover-state: pause the ambient bg (it's covered by the accent panel
    // anyway) and play the foreground media from frame 0.
    ambientRef.current?.pause();
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      void v.play().catch(() => {});
    }
  };
  const handleLeave = () => {
    setIsHovered(false);
    // Rest-state: pause the foreground media, resume the ambient loop.
    videoRef.current?.pause();
    void ambientRef.current?.play().catch(() => {});
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.06, ease }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`group relative p-7 pt-10 border-r border-b border-ink min-h-[460px] lg:min-h-0 flex flex-col justify-between overflow-hidden cursor-pointer max-lg:border-r-0 transition-colors duration-500 hover:text-paper ${bentoClass}`}
    >
      {/* Ambient background — always-playing loop behind everything else.
          Only present on cards that opted in via `ambientVideo`. */}
      {s.ambientVideo && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={ambientRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover [filter:grayscale(100%)_contrast(1.05)_brightness(0.95)] transition-opacity duration-500 group-hover:opacity-0"
          >
            <source
              src={toMobileVideo(s.ambientVideo)}
              type="video/mp4"
              media="(max-width: 767px)"
            />
            <source src={s.ambientVideo} type="video/mp4" />
          </video>
          {/* Paper-tinted scrim so the dark text stays legible at rest;
              fades out when the accent panel is sliding up to take over. */}
          <div className="absolute inset-0 bg-paper/55 transition-opacity duration-500 group-hover:opacity-0" />
        </div>
      )}

      <div className="absolute inset-0 bg-accent translate-y-full transition-transform duration-[600ms] ease-[cubic-bezier(0.2,0.85,0.15,1)] group-hover:translate-y-0 z-[1] overflow-hidden">
        {s.media?.type === "video" && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-0 transition-opacity duration-500 group-hover:opacity-100 [filter:grayscale(100%)_contrast(1.1)_brightness(1.05)]"
          >
            <source
              src={toMobileVideo(s.media.src)}
              type="video/mp4"
              media="(max-width: 767px)"
            />
            <source src={s.media.src} type="video/mp4" />
          </video>
        )}
        {s.media?.type === "image" && (
          <picture>
            <source srcSet={toAvif(s.media.src)} type="image/avif" />
            <img
              src={s.media.src}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-0 transition-opacity duration-500 group-hover:opacity-100 [filter:grayscale(100%)_contrast(1.1)_brightness(1.05)]"
            />
          </picture>
        )}
        {s.media?.type === "code" && (
          <WebCodeTyping lines={s.media.lines} isHovered={isHovered} />
        )}
        {s.media && s.media.type !== "code" && (
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-accent to-transparent pointer-events-none" />
        )}
      </div>

      <div className="relative z-[2]">
        <div className="flex justify-between items-start">
          <span className="font-mono text-xs font-medium tracking-[0.16em] text-muted group-hover:text-paper/70 transition-colors">
            [{s.n}]
          </span>
          <span className="w-12 h-12 border border-current grid place-items-center text-lg transition-all duration-400 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:rotate-[-45deg] group-hover:bg-ink group-hover:text-accent">
            ↗
          </span>
        </div>
      </div>

      <div className="relative z-[2]">
        <h3 className="font-heading font-extrabold text-[clamp(28px,2.6vw,40px)] tracking-[-0.03em] uppercase leading-none mt-6">
          {s.t}
        </h3>
        <p className="text-sm leading-relaxed mt-5 max-w-[320px]">{s.body}</p>
        {s.tags.length > 0 && (
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
        )}
      </div>
    </motion.div>
  );
}
