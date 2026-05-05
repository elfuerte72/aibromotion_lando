import { MobileHero } from "./MobileHero";
import { MobileServices } from "./MobileServices";
import { MobileAutomation } from "./MobileAutomation";
import { MobileWorks } from "./MobileWorks";
import { MobileTrusted } from "./MobileTrusted";
import { MobileTeam } from "./MobileTeam";
import { MobileContact } from "./MobileContact";
import { StickyMobileCTA } from "./StickyMobileCTA";

/**
 * Standalone mobile landing.
 *
 * NOT a responsive variant of the desktop landing — a separate, focused
 * document optimised for phones (≤767px). No Lenis, no Tegaki, no
 * framer-motion useScroll, no `<video>` autoplay. Static markup only —
 * scroll-triggered reveals and IntersectionObservers were removed for
 * smoother scroll.
 *
 * Render gated upstream in `App.tsx` via `useIsMobile()`.
 */
export default function MobileLanding() {
  return (
    <div className="bg-paper text-ink">
      <MobileHero />
      <MobileServices />
      <MobileAutomation />
      <MobileWorks />
      <MobileTrusted />
      <MobileTeam />
      <MobileContact />
      <StickyMobileCTA />
    </div>
  );
}
