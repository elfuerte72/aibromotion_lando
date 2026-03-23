import { useEffect, useRef, useState } from "react";

interface StatementBlockProps {
  text: string;
  layout?: "full" | "left" | "right";
}

export function StatementBlock({ text, layout = "full" }: StatementBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
          fontSize: layout === "full" ? "clamp(1.75rem, 4.5vw, 4rem)" : "clamp(1.5rem, 3.5vw, 2.75rem)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
          transition:
            "opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {text}
      </p>
    </div>
  );
}
