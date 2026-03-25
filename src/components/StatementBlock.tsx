import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface StatementBlockProps {
  /** Supports **bold** markers — bold words render in salmon */
  text: string;
  layout?: "full" | "left" | "right";
}

/** Parse text with **bold** markers into word tokens */
function parseWords(text: string): { text: string; bold: boolean }[] {
  const result: { text: string; bold: boolean }[] = [];
  const parts = text.split(/(\*\*.*?\*\*)/g);
  for (const part of parts) {
    if (part.startsWith("**") && part.endsWith("**")) {
      for (const w of part.slice(2, -2).split(" ").filter(Boolean)) {
        result.push({ text: w, bold: true });
      }
    } else {
      for (const w of part.split(" ").filter(Boolean)) {
        result.push({ text: w, bold: false });
      }
    }
  }
  return result;
}

export function StatementBlock({ text, layout = "full" }: StatementBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 40%"],
  });

  const words = parseWords(text);
  const isRight = layout === "right";

  return (
    <div
      ref={ref}
      className={`
        ${layout === "full" ? "px-6 py-12 md:px-10 md:py-16" : ""}
        ${layout !== "full" ? "col-span-1 flex items-center px-6 py-16 md:px-10 md:py-20" : ""}
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
              word={word.text}
              bold={word.bold}
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
  bold,
  progress,
  range,
}: {
  word: string;
  bold: boolean;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);

  // Bold words use salmon color, regular words use black
  const baseColor = bold ? "rgba(232,168,152," : "rgba(0,0,0,";
  const color = useTransform(
    progress,
    range,
    [`${baseColor}0.12)`, `${baseColor}1)`]
  );

  return (
    <motion.span
      style={{ opacity, color }}
      className={`inline-block mr-[0.3em] transition-none ${bold ? "font-bold" : ""}`}
    >
      {word}
    </motion.span>
  );
}
