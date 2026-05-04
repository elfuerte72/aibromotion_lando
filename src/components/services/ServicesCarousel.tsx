import { toAvif, toPoster } from "@/lib/media";
import { SnapCarousel } from "../shared/SnapCarousel";
import type { Service } from "./serviceData";

/**
 * Mobile / <lg horizontal carousel for Services.
 *
 * Unlike `ServicesHoverGrid`, the accent media is shown immediately (the
 * whole card is the "wow" state) — on mobile there is no hover surface
 * so we must lead with it. Video playback is gated by the carousel's
 * `isActive` flag so only one slide plays at a time.
 */
export function ServicesCarousel({ services }: { services: Service[] }) {
  return (
    <div className="py-8">
      <SnapCarousel
        label="Услуги студии"
        items={services}
        getKey={(s) => s.n}
        slideClassName="w-[82vw] max-w-[340px] aspect-[3/4] shrink-0 snap-start first:ml-0"
        trackClassName="gap-3 px-5 pb-4"
        indicatorClassName="px-5 mt-4"
        renderItem={(s, _i, isActive) => (
          <ServiceSlide service={s} isActive={isActive} />
        )}
      />
    </div>
  );
}

function ServiceSlide({
  service: s,
  isActive,
}: {
  service: Service;
  isActive: boolean;
}) {
  return (
    <article
      data-active={isActive ? "true" : "false"}
      className="relative w-full h-full overflow-hidden border border-ink bg-ink text-paper"
    >
      {/* Media layer — visible by default, saturates when active */}
      <div className="absolute inset-0 bg-accent">
        {s.media?.type === "video" && (
          // Mobile: статичный постер вместо autoplay-видео — никакого
          // decode-cost при скролле, никакой неясной "иконки видео".
          <picture>
            <source srcSet={toPoster(s.media.src).avif} type="image/avif" />
            <img
              src={toPoster(s.media.src).jpg}
              alt=""
              loading="lazy"
              decoding="async"
              data-active={isActive ? "true" : "false"}
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply [filter:grayscale(100%)_contrast(1.1)_brightness(1.05)] data-[active=true]:[filter:grayscale(0%)_contrast(1.05)_brightness(1)] transition-[filter] duration-500"
            />
          </picture>
        )}
        {s.media?.type === "image" && (
          <picture>
            <source srcSet={toAvif(s.media.src)} type="image/avif" />
            <img
              src={s.media.src}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply [filter:grayscale(100%)_contrast(1.1)_brightness(1.05)]"
            />
          </picture>
        )}
        {s.media?.type === "code" && (
          // Mobile fallback: статичный финальный код без анимации.
          // Hover-typing эффект только на десктопе (см. WebCodeTyping).
          <div className="absolute inset-0 flex flex-col justify-center px-6 pointer-events-none">
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-paper/65 mb-3">
              // src/Hero.tsx
            </div>
            <pre className="font-mono text-[12px] leading-[1.7] text-paper whitespace-pre">
              {s.media.lines.join("\n")}
            </pre>
          </div>
        )}
        {s.media?.type !== "code" && (
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-accent to-transparent pointer-events-none" />
        )}
      </div>

      {/* Foreground — text + chips. pointer-events disabled so taps reach the video poster behind. */}
      <div className="relative z-[1] flex flex-col justify-between h-full p-6 pt-8">
        <div className="flex justify-between items-start">
          <span className="font-mono text-xs font-medium tracking-[0.16em] text-paper/80">
            [{s.n}]
          </span>
          <span className="w-10 h-10 border border-current grid place-items-center text-base">
            ↗
          </span>
        </div>

        <div>
          <h3 className="font-heading font-extrabold text-[clamp(24px,7vw,34px)] tracking-[-0.03em] uppercase leading-none">
            {s.t}
          </h3>
          <p className="text-[13px] leading-relaxed mt-3 max-w-[280px]">
            {s.body}
          </p>
          {s.tags.length > 0 && (
            <div className="mt-3 flex gap-[5px] flex-wrap">
              {s.tags.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] font-medium tracking-[0.12em] uppercase py-1 px-2 border border-current"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
