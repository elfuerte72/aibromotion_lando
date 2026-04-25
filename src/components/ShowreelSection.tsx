import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile, useIsTouch } from "@/lib/useDevice";
import { toMobileVideo } from "@/lib/media";
import { SnapCarousel } from "./shared/SnapCarousel";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

const MINIS = [
  { v: "/media/result.mp4", l: "Forma Sales Bot" },
  { v: "/media/truck-holding.mp4", l: "Трак Холдинг" },
  { v: "/media/basket.mp4", l: "Retail AI" },
  { v: "/media/spot-new.mp4", l: "Stories" },
];

export function ShowreelSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const isTouch = useIsTouch();
  const isMobile = useIsMobile();

  return (
    <section id="showreel" className="bg-ink text-paper pt-[72px] sm:pt-[100px] pb-[80px] sm:pb-[120px] border-b border-ink relative overflow-hidden">
      {/* Head */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 px-5 sm:px-6 pb-8 sm:pb-10">
        <div>
          <div className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-white/50 mb-4">
            [02] Showreel / 2026
          </div>
          <h2 className="font-heading font-extrabold uppercase leading-[0.84] tracking-[-0.055em] text-[clamp(44px,11vw,160px)]">
            Смотреть<br />
            <span className="font-serif italic font-light tracking-[-0.03em]">движение.</span>
          </h2>
        </div>
        <div className="text-white/70 text-[15px] leading-relaxed max-w-[440px] self-end lg:justify-self-end">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.12, ease }}
          >
            Нарезка реальных работ за 2025–2026. Рекламные ролики для производства, логистики и строительного бизнеса. Горизонтальный и вертикальный форматы.
          </motion.p>
        </div>
      </div>

      {/* Main video frame */}
      <div ref={ref} className="relative mx-5 sm:mx-6 aspect-video sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden border border-white/15">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.85] contrast-[1.05]"
        >
          <source
            src="/media/showreel-main-mobile.mp4"
            type="video/mp4"
            media="(max-width: 767px)"
          />
          <source src="/media/showreel-main.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(0,0,0,0.65)_90%)] pointer-events-none" />

      </div>

      {/* Mini thumbnails — carousel on mobile, grid ≥md */}
      {isMobile ? (
        <div className="mt-5">
          <SnapCarousel
            label="Связанные работы"
            items={MINIS}
            getKey={(_, i) => i}
            slideClassName="w-[72vw] max-w-[320px] aspect-video shrink-0 snap-start"
            trackClassName="gap-3 px-5 pb-4"
            indicatorClassName="px-5 mt-3 text-paper/70"
            renderItem={(m, i, isActive) => (
              <MiniSlide mini={m} index={i} isActive={isActive} />
            )}
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mx-5 sm:mx-6 mt-5">
          {MINIS.map((m, i) => (
            <MiniTile
              key={i}
              mini={m}
              index={i}
              inView={inView}
              isTouch={isTouch}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function MiniSlide({
  mini,
  index,
  isActive,
}: {
  mini: { v: string; l: string };
  index: number;
  isActive: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Only the active slide plays — saves battery + avoids the 4-video
  // decode tax from the desktop grid.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) {
      void v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [isActive]);

  return (
    <div
      data-active={isActive ? "true" : "false"}
      className="relative w-full h-full overflow-hidden border border-white/12"
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover grayscale-[0.4] brightness-75 transition-all duration-500 data-[active=true]:grayscale-0 data-[active=true]:brightness-100"
        data-active={isActive ? "true" : "false"}
      >
        <source
          src={toMobileVideo(mini.v)}
          type="video/mp4"
          media="(max-width: 767px)"
        />
        <source src={mini.v} type="video/mp4" />
      </video>
      <div className="absolute left-2.5 bottom-2.5 font-mono text-[10px] font-medium tracking-[0.14em] uppercase text-paper">
        [0{index + 1}] {mini.l}
      </div>
    </div>
  );
}

function MiniTile({
  mini,
  index,
  inView,
  isTouch,
}: {
  mini: { v: string; l: string };
  index: number;
  inView: boolean;
  isTouch: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handleTap = () => {
    if (!isTouch) return;
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
    } else {
      void v.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <motion.div
      className="aspect-video relative overflow-hidden border border-white/12 cursor-pointer group"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.07, ease }}
      onClick={handleTap}
      data-playing={playing ? "true" : "false"}
    >
      <video
        ref={videoRef}
        // autoPlay only for mouse-first devices; touch gets poster-first
        // and explicit tap-to-play per plan §2.9.
        autoPlay={!isTouch}
        muted
        loop
        playsInline
        preload={isTouch ? "metadata" : "auto"}
        className="w-full h-full object-cover grayscale-[0.4] brightness-75 transition-all duration-500 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.03] group-data-[playing=true]:grayscale-0 group-data-[playing=true]:brightness-100"
      >
        <source
          src={toMobileVideo(mini.v)}
          type="video/mp4"
          media="(max-width: 767px)"
        />
        <source src={mini.v} type="video/mp4" />
      </video>
      {isTouch && !playing && (
        <span
          aria-hidden
          className="absolute inset-0 grid place-items-center text-paper text-3xl bg-black/25 backdrop-blur-[1px]"
        >
          ▶
        </span>
      )}
      <div className="absolute left-2.5 bottom-2.5 font-mono text-[10px] font-medium tracking-[0.14em] uppercase text-paper">
        [0{index + 1}] {mini.l}
      </div>
    </motion.div>
  );
}
