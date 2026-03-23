import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";

const LOGOS = [
  { name: "Kling AI", src: "/logos/kling.svg" },
  { name: "Sora", src: "/logos/sora.svg" },
  { name: "Veo", src: "/logos/veo.svg" },
  { name: "DaVinci Resolve", src: "/logos/davinci-resolve.svg" },
  { name: "Premiere Pro", src: "/logos/premiere-pro.svg" },
  { name: "Photoshop", src: "/logos/photoshop.svg" },
  { name: "After Effects", src: "/logos/after-effects.svg" },
  { name: "Claude", src: "/logos/claude.svg" },
  { name: "Runway", src: "/logos/runway.svg" },
  { name: "Midjourney", src: "/logos/midjourney.svg" },
];

export function LogoMarquee({ reverse = false }: { reverse?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Skew based on scroll velocity
  const skewRaw = useTransform(scrollVelocity, [-2000, 0, 2000], [-6, 0, 6]);
  const skew = useSpring(skewRaw, { stiffness: 200, damping: 30 });

  // Speed up marquee based on velocity
  const speedMultiplier = useTransform(
    scrollVelocity,
    [-2000, 0, 2000],
    [0.97, 1, 1.03]
  );
  const scaleX = useSpring(speedMultiplier, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      ref={containerRef}
      className={`marquee ${reverse ? "marquee--reverse" : ""}`}
      style={{ skewX: skew, scaleX }}
    >
      {[0, 1].map((i) => (
        <div className="marquee-track" key={i} aria-hidden={i === 1}>
          {LOGOS.map((logo) => (
            <img
              key={logo.name}
              src={logo.src}
              alt={logo.name}
              className="h-7 w-auto shrink-0 opacity-40 grayscale transition-all duration-400 hover:opacity-100 hover:grayscale-0"
            />
          ))}
        </div>
      ))}
    </motion.div>
  );
}
