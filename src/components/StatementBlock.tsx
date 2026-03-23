import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface StatementBlockProps {
  text: string;
  layout?: "full" | "left" | "right";
}

export function StatementBlock({ text, layout = "full" }: StatementBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 40%"],
  });

  const words = text.split(" ");
  const isRight = layout === "right";

  return (
    <div
      ref={ref}
      className={`
        ${layout === "full" ? "col-span-1 md:col-span-2 px-6 py-20 md:px-10 md:py-28" : ""}
        ${layout !== "full" ? "col-span-1 flex items-center px-6 py-16 md:px-10 md:py-20 border-b border-black/10" : ""}
      `}
    >
      <p
        className={`font-heading uppercase leading-[1.15] ${layout === "full" ? "max-w-5xl mx-auto text-center" : "max-w-lg"} ${isRight ? "md:ml-auto md:text-right" : ""}`}
        style={{
          fontSize:
            layout === "full"
              ? "clamp(1.75rem, 4.5vw, 4rem)"
              : "clamp(1.5rem, 3.5vw, 2.75rem)",
        }}
      >
        {words.map((word, i) => {
          const wordStart = i / words.length;
          const wordEnd = (i + 1) / words.length;

          return (
            <Word
              key={i}
              word={word}
              progress={scrollYProgress}
              range={[wordStart, wordEnd]}
            />
          );
        })}
      </p>
    </div>
  );
}

function Word({
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
