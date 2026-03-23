import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface MediaCellProps {
  src: string;
  alt?: string;
  type: "image" | "video";
  className?: string;
}

export function MediaCell({ src, alt, type, className = "" }: MediaCellProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Subtle parallax on media
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.02]);

  if (type === "video") {
    return (
      <div
        ref={ref}
        className={`min-h-[400px] md:min-h-[600px] overflow-hidden relative ${className}`}
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
      className={`min-h-[400px] md:min-h-[600px] overflow-hidden relative ${className}`}
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
