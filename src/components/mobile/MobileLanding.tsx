import { MobileHero } from "./MobileHero";
import { MobileServices } from "./MobileServices";
import { MobileWorks } from "./MobileWorks";
import { MobileTrusted } from "./MobileTrusted";
import { MobileTeam } from "./MobileTeam";
import { MobileContact } from "./MobileContact";
import { StickyMobileCTA } from "./StickyMobileCTA";

/**
 * Standalone mobile landing.
 *
 * NOT a responsive variant of the desktop landing — a separate, focused
 * 6-section document optimised for phones (≤767px). No Lenis, no Tegaki,
 * no framer-motion useScroll, no `<video>` elements. Static AVIF posters
 * + IntersectionObserver-driven `<Reveal>` only.
 *
 * Render gated upstream in `App.tsx` via `useIsMobile()`.
 */
export default function MobileLanding() {
  return (
    <div className="bg-paper text-ink">
      <MobileHero />
      <MobileServices />
      <MobileWorks />
      <MobileTrusted />
      <MobileTeam />
      <MobileContact />
      <StickyMobileCTA />
    </div>
  );
}
