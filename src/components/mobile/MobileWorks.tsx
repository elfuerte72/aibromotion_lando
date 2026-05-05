import { useEffect, useState } from "react";
import { toMobileVideo, toPoster } from "@/lib/media";

type Work = {
  src: string;
  title: string;
  client: string;
  tag: string;
};

const WORKS: Work[] = [
  { src: "/media/showreel-main.mp4", title: "Шоурил 2026", client: "AIBROMOTION", tag: "Шоурил" },
  { src: "/media/result.mp4", title: "Shoozy", client: "Магазин одежды", tag: "Лукбук" },
  { src: "/media/truck-holding.mp4", title: "Тракхолдинг", client: "Грузоперевозки", tag: "Промо" },
  { src: "/media/basket.mp4", title: "Баскетбол", client: "Спортивный клуб", tag: "Реклама" },
  { src: "/media/spot-new.mp4", title: "Контент для соцсетей", client: "AI + монтаж", tag: "Соцсети" },
];

/**
 * Mobile works. Static AVIF posters with a minimalist accent play button
 * (SVG triangle, no emoji). Tap a poster → opens a full-screen `<video>`
 * overlay using the mobile-optimised mp4. Close: backdrop tap, ESC, or
 * the top-right × button.
 */
export function MobileWorks() {
  const [playing, setPlaying] = useState<Work | null>(null);

  return (
    <section className="bg-ink text-paper px-5 pt-14 pb-16">
      <div className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/55 mb-3">
          Наши работы
        </div>
        <h2 className="font-heading font-extrabold uppercase leading-[0.88] tracking-[-0.04em] text-[clamp(36px,10.5vw,52px)]">
          Наши<br />
          <span className="font-serif italic font-light tracking-[-0.03em]">работы.</span>
        </h2>
        <p className="mt-4 max-w-[34ch] text-[14.5px] leading-[1.5] text-paper/70">
          Реальные кейсы за 2025–2026. Производство, логистика, спорт, контент-формат для соцсетей.
        </p>
      </div>

      <ul className="flex flex-col gap-4">
        {WORKS.map((w) => {
          const poster = toPoster(w.src);
          return (
            <li
              key={w.src}
              className="relative aspect-[16/10] overflow-hidden border border-paper/15"
            >
              <button
                type="button"
                onClick={() => setPlaying(w)}
                aria-label={`Смотреть видео — ${w.title}, ${w.client}`}
                className="absolute inset-0 w-full h-full text-left bg-transparent border-0 p-0 cursor-pointer"
              >
                <picture>
                  <source srcSet={poster.avif} type="image/avif" />
                  <img
                    src={poster.jpg}
                    alt={`${w.title} — ${w.client}`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </picture>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"
                />
                <PlayBadge />
                <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-3">
                  <div>
                    <div className="font-heading font-semibold uppercase tracking-[-0.015em] text-[18px] leading-tight text-paper">
                      {w.title}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/65 mt-1">
                      {w.client}
                    </div>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/55 whitespace-nowrap">
                    {w.tag}
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {playing && <WorkPlayer work={playing} onClose={() => setPlaying(null)} />}
    </section>
  );
}

function PlayBadge() {
  return (
    <span
      aria-hidden
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-12 h-12 rounded-full bg-accent"
    >
      <svg
        width="14"
        height="16"
        viewBox="0 0 14 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="ml-[2px]"
      >
        <path d="M14 8L0 16V0L14 8Z" fill="var(--color-paper)" />
      </svg>
    </span>
  );
}

function WorkPlayer({ work, onClose }: { work: Work; onClose: () => void }) {
  useEffect(() => {
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = orig;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const poster = toPoster(work.src);
  const mobileSrc = toMobileVideo(work.src);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Видео — ${work.title}`}
      onClick={onClose}
      className="fixed inset-0 z-[60] bg-black/95 grid place-items-center"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Закрыть видео"
        className="absolute right-3 w-11 h-11 grid place-items-center rounded-full bg-paper text-ink text-[20px] leading-none shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
        style={{ top: "calc(env(safe-area-inset-top, 0px) + 12px)" }}
      >
        ×
      </button>

      <video
        key={work.src}
        src={mobileSrc}
        poster={poster.jpg}
        autoPlay
        controls
        playsInline
        preload="metadata"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-h-[85vh] object-contain bg-black"
      />

      <div
        aria-hidden
        className="absolute left-3 right-3 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/65 pointer-events-none"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)" }}
      >
        <span className="truncate">{work.title} — {work.client}</span>
        <span>{work.tag}</span>
      </div>
    </div>
  );
}
