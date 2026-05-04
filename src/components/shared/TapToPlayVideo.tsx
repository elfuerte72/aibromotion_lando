import { useState, type CSSProperties } from "react";
import { toMobileVideo, toPoster } from "@/lib/media";

type Props = {
  src: string;
  /** Accessible label for the play button. */
  label?: string;
  className?: string;
  videoClassName?: string;
  style?: CSSProperties;
  /** Object-fit (default `cover`). */
  fit?: "cover" | "contain";
};

/**
 * Mobile-first poster→video. Renders a static `<picture>` poster with a
 * play button until the user taps. On tap, mounts a real `<video>` with
 * `autoPlay` and `muted`, so iOS allows it. Once mounted it stays
 * mounted — toggling play/pause via the same overlay.
 *
 * No autoplay = no decode cost while the page is idle, no jank when
 * scrolling past sections with multiple videos.
 */
export function TapToPlayVideo({
  src,
  label = "Воспроизвести видео",
  className = "",
  videoClassName = "",
  style,
  fit = "cover",
}: Props) {
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const poster = toPoster(src);
  const fitClass = fit === "cover" ? "object-cover" : "object-contain";

  const handleStart = () => {
    setStarted(true);
    setPlaying(true);
  };

  const handleVideoClick = (e: React.MouseEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    if (v.paused) {
      void v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div className={`relative ${className}`} style={style}>
      {!started ? (
        <>
          <picture>
            <source srcSet={poster.avif} type="image/avif" />
            <img
              src={poster.jpg}
              alt=""
              loading="lazy"
              decoding="async"
              draggable={false}
              className={`absolute inset-0 w-full h-full ${fitClass} ${videoClassName}`}
            />
          </picture>
          <button
            type="button"
            onClick={handleStart}
            aria-label={label}
            className="absolute inset-0 grid place-items-center bg-black/15 active:bg-black/25 transition-colors"
          >
            <span className="grid place-items-center w-16 h-16 rounded-full bg-white/85 backdrop-blur-sm shadow-[0_4px_18px_rgba(0,0,0,0.35)]">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="w-7 h-7 fill-ink translate-x-[2px]"
              >
                <path d="M6 4l14 8-14 8z" />
              </svg>
            </span>
          </button>
        </>
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster.jpg}
          onClick={handleVideoClick}
          aria-label={playing ? "Видео воспроизводится — нажмите чтобы поставить на паузу" : "Видео на паузе — нажмите чтобы воспроизвести"}
          className={`absolute inset-0 w-full h-full ${fitClass} ${videoClassName}`}
        >
          <source src={toMobileVideo(src)} type="video/mp4" media="(max-width: 767px)" />
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
