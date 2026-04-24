import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { toAvif, toMobileVideo } from "@/lib/media";
import type { Service } from "./serviceData";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

/**
 * Desktop / ≥lg hover variant of the Services grid. Identical to the
 * original ServicesSection layout but extracted so mobile can render a
 * horizontal `ServicesCarousel` instead. Touch-specific state lives in
 * `ServicesCarousel` — on desktop we rely solely on `group-hover`.
 */
export function ServicesHoverGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      {services.map((s, i) => (
        <ServiceHoverCard key={s.n} service={s} index={i} />
      ))}
    </div>
  );
}

function ServiceHoverCard({
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
    if (v) v.pause();
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
      <div className="absolute inset-0 bg-accent translate-y-full transition-transform duration-[600ms] ease-[cubic-bezier(0.2,0.85,0.15,1)] group-hover:translate-y-0 z-0 overflow-hidden">
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
        {s.media && (
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-accent to-transparent pointer-events-none" />
        )}
      </div>

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
