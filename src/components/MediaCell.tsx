import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type MediaAspect = "landscape" | "portrait" | "square" | "wide";

const aspectClasses: Record<MediaAspect, string> = {
  landscape: "aspect-video",          // 16:9
  portrait: "aspect-[3/4]",           // 3:4
  square: "aspect-square",            // 1:1
  wide: "aspect-[21/9]",             // 21:9
};

interface MediaCellProps {
  src: string;
  alt?: string;
  type: "image" | "video";
  aspect?: MediaAspect;
  /** Parallax intensity multiplier. 0.5 = slow/background, 1.0 = normal, 1.5 = fast/foreground */
  parallaxIntensity?: number;
  className?: string;
}

export function MediaCell({ src, alt, type, aspect, parallaxIntensity = 1, className = "" }: MediaCellProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yRange = 5 * parallaxIntensity;
  const y = useTransform(scrollYProgress, [0, 1], [`-${yRange}%`, `${yRange}%`]);
  const scaleStart = 1 + 0.08 * parallaxIntensity;
  const scaleEnd = 1 + 0.02 * parallaxIntensity;
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [scaleStart, 1, scaleEnd]);

  const sizeClass = aspect ? aspectClasses[aspect] : "min-h-[400px] md:min-h-[600px]";

  if (type === "video") {
    return (
      <div
        ref={ref}
        className={`${sizeClass} overflow-hidden relative ${className}`}
      >
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

  return (
    <div
      ref={ref}
      className={`${sizeClass} overflow-hidden relative ${className}`}
    >
      <motion.img
        src={src}
        alt={alt || ""}
        className="w-full h-full object-cover absolute inset-0"
        style={{ y, scale }}
      />
    </div>
  );
}
