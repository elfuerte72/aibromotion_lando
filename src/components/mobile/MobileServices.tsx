import { Reveal } from "@/components/shared/Reveal";
import { SERVICES } from "@/components/services/serviceData";
import { toAvif, toPoster } from "@/lib/media";

/**
 * Mobile services. Stacked card list — no carousel, no hover, no video.
 * Each card shows the service name + body + a static AVIF poster (for
 * `media.type === "video"` we derive the poster path; for `image` we use
 * the source directly with an AVIF companion).
 */
function pickPoster(media: (typeof SERVICES)[number]["media"]):
  | { avif: string; fallback: string; alt: string }
  | null {
  if (!media) return null;
  if (media.type === "image") {
    return { avif: toAvif(media.src), fallback: media.src, alt: "" };
  }
  if (media.type === "video") {
    const p = toPoster(media.src);
    return { avif: p.avif, fallback: p.jpg, alt: "" };
  }
  return null;
}

export function MobileServices() {
  return (
    <section className="bg-paper border-t border-ink/10 px-5 py-16">
      <div className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-3">
          [02] Что мы делаем
        </div>
        <h2 className="font-heading font-extrabold uppercase leading-[0.88] tracking-[-0.04em] text-[clamp(36px,10.5vw,52px)]">
          Полный<br />
          <span className="font-serif italic font-light tracking-[-0.03em]">цикл.</span>
        </h2>
        <p className="mt-4 max-w-[34ch] text-[14.5px] leading-[1.5] text-ink-2">
          От идеи и съёмки до AI-аватаров, агентов и автоматизации — собираем под ключ под задачу бизнеса.
        </p>
      </div>

      <ul className="flex flex-col gap-3">
        {SERVICES.map((s, i) => {
          const poster = pickPoster(s.media);
          return (
            <Reveal
              key={s.n}
              as="li"
              delay={Math.min(i * 60, 240)}
              offsetY={20}
              duration={650}
              className="relative overflow-hidden border border-ink/15 bg-paper-2"
            >
              <article className="grid grid-cols-[96px_1fr] items-stretch min-h-[112px]">
                <div className="relative bg-ink/5">
                  {poster ? (
                    <picture>
                      <source srcSet={poster.avif} type="image/avif" />
                      <img
                        src={poster.fallback}
                        alt={poster.alt}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover grayscale-[0.25] contrast-[1.05]"
                      />
                    </picture>
                  ) : (
                    <span
                      aria-hidden
                      className="absolute inset-0 grid place-items-center font-mono text-[18px] text-ink/30"
                    >
                      {s.n}
                    </span>
                  )}
                </div>
                <div className="px-4 py-4 flex flex-col justify-between gap-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-heading font-semibold uppercase tracking-[-0.015em] text-[17px] leading-tight">
                      {s.t}
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted shrink-0">
                      {s.n}
                    </span>
                  </div>
                  <p className="text-[13px] leading-[1.45] text-ink-2 line-clamp-3">
                    {s.body}
                  </p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
