import { useCallback, useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*<>[]{}~/\\|";
const SCRAMBLE_SPEED = 30;
const RESOLVE_DELAY = 3; // frames per character to resolve

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: "span" | "p" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

export function ScrambleText({
  text,
  className = "",
  as: Tag = "span",
  ...props
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const isAnimating = useRef(false);

  const scramble = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    frameRef.current = 0;

    const animate = () => {
      frameRef.current++;
      const resolved = Math.floor(frameRef.current / RESOLVE_DELAY);

      const result = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < resolved) return text[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplay(result);

      if (resolved >= text.length) {
        isAnimating.current = false;
        setDisplay(text);
        return;
      }

      rafRef.current = window.setTimeout(() => {
        requestAnimationFrame(animate);
      }, SCRAMBLE_SPEED);
    };

    requestAnimationFrame(animate);
  }, [text]);

  useEffect(() => {
    return () => clearTimeout(rafRef.current);
  }, []);

  return (
    <Tag
      className={className}
      onMouseEnter={scramble}
      {...props}
    >
      {display}
    </Tag>
  );
}
