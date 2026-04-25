import { cn } from "@/lib/utils";

type LogoVariant = "mark" | "full";

type LogoProps = {
  /**
   * `"mark"` — compact `ai.bro` wordmark (used in tight surfaces like nav).
   * `"full"` — full lockup with `.MOTION` block, tagline and divider rule
   * (used in hero / brand statements where there's room).
   */
  variant?: LogoVariant;
  /**
   * Rendered height of the mark in pixels. Width is derived from the
   * intrinsic aspect ratio so the browser reserves the correct box and
   * we avoid layout shift.
   */
  height?: number;
  /** Extra classes for the outer `<img>` element. */
  className?: string;
  /** Above-the-fold instances should set `priority` for eager decode. */
  priority?: boolean;
  /** Override accessible name — defaults to brand + tagline. */
  alt?: string;
};

const VARIANTS: Record<LogoVariant, { src: string; w: number; h: number }> = {
  mark: { src: "/logos/aibromotion-mark.svg", w: 660, h: 300 },
  full: { src: "/logos/aibromotion.svg", w: 900, h: 420 },
};

/**
 * AIBROMOTION wordmark. Rendered as a transparent SVG — scales to any
 * size without quality loss, has no background, blends with any
 * surface colour. Two variants: `mark` for nav, `full` for hero.
 */
export function Logo({
  variant = "mark",
  height = 48,
  className,
  priority = false,
  alt = "AIBROMOTION — AI · Video · Marketing · Automation",
}: LogoProps) {
  const v = VARIANTS[variant];
  const width = Math.round((height * v.w) / v.h);

  return (
    <img
      src={v.src}
      alt={alt}
      width={width}
      height={height}
      style={{ height, width: "auto" }}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      draggable={false}
      className={cn("block select-none", className)}
    />
  );
}
