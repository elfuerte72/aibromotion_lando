import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/lib/useDevice";
import { SERVICES } from "./services/serviceData";
import { ServicesHoverGrid } from "./services/ServicesHoverGrid";
import { ServicesCarousel } from "./services/ServicesCarousel";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

/**
 * Section wrapper with the shared head. Routes between the desktop
 * hover grid and the mobile swipe carousel based on `useIsMobile`.
 * Keeping a single source of truth for `SERVICES` (see `serviceData.ts`).
 */
export function ServicesSection() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-10%" });
  const isMobile = useIsMobile();

  return (
    <section id="services" className="border-b border-ink">
      {/* Head */}
      <div
        ref={headRef}
        className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 md:gap-12 lg:gap-24 px-5 sm:px-6 pt-[72px] sm:pt-[90px] lg:pt-[100px] pb-8 sm:pb-10 border-b border-ink"
      >
        <div className="min-w-0">
          <div className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-muted mb-4">
            [03] Services
          </div>
          <h2 className="font-heading font-extrabold uppercase leading-[0.84] tracking-[-0.055em] text-[clamp(44px,11vw,160px)]">
            Шесть<br />
            <span className="font-serif italic font-light tracking-[-0.03em]">дисциплин.</span>
          </h2>
        </div>
        <div className="max-w-[440px] text-[15px] leading-relaxed self-end lg:justify-self-end">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.12, ease }}
          >
            От первой линии сценария до обученного агента в Telegram — всё решает одна команда. Один бриф — один контракт — один владелец результата.
          </motion.p>
        </div>
      </div>

      {isMobile ? (
        <ServicesCarousel services={SERVICES} />
      ) : (
        <ServicesHoverGrid services={SERVICES} />
      )}
    </section>
  );
}
