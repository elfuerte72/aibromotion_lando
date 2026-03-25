import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";

export function NewsletterCTA() {
  const videoRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: videoProgress } = useScroll({
    target: videoRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: quoteProgress } = useScroll({
    target: quoteRef,
    offset: ["start 90%", "end 40%"],
  });

  // Parallax: video moves slower than scroll
  const videoY = useTransform(videoProgress, [0, 1], ["0%", "15%"]);
  const videoScale = useTransform(videoProgress, [0, 0.5, 1], [1.15, 1, 1.05]);

  const quoteText =
    "Aibromotion — это бунт против обыденности. Никаких трендов, никаких сезонов — только визуальные высказывания.";
  const words = quoteText.split(" ");

  return (
    <section className="bg-white">
      {/* Quote with scroll-driven word reveal */}
      <div ref={quoteRef} className="px-6 py-16 md:px-10 md:py-20">
        <p
          className="font-heading uppercase leading-[1.1] max-w-5xl mx-auto"
          style={{ fontSize: "clamp(1.5rem, 4vw, 3.75rem)" }}
        >
          {words.map((word, i) => {
            const wordStart = i / words.length;
            const wordEnd = (i + 1) / words.length;
            return (
              <QuoteWord
                key={i}
                word={word}
                progress={quoteProgress}
                range={[wordStart, wordEnd]}
              />
            );
          })}
        </p>
      </div>

      {/* Full-width showreel video with parallax */}
      <ScrollReveal variant="clip-reveal">
        <div
          ref={videoRef}
          className="mt-0 relative overflow-hidden"
          style={{ aspectRatio: "16/7" }}
        >
          <motion.div
            style={{ y: videoY, scale: videoScale }}
            className="absolute inset-0"
          >
            <video
              src="/media/truck.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </ScrollReveal>
    </section>
  );
}

function QuoteWord({
  word,
  progress,
  range,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const color = useTransform(
    progress,
    range,
    ["rgba(0,0,0,0.12)", "rgba(0,0,0,1)"]
  );

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block mr-[0.3em] transition-none"
    >
      {word}
    </motion.span>
  );
}
