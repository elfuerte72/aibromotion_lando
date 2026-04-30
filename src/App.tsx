import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import { Nav } from "@/components/Nav";
import { Header } from "@/components/Header";
import { TickerSection } from "@/components/TickerSection";
import { ManifestoSection } from "@/components/ManifestoSection";
import { CreativeTitle } from "@/components/CreativeTitle";
import { ShowreelSection } from "@/components/ShowreelSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { AutomationSection } from "@/components/AutomationSection";
import { TrustedSection } from "@/components/TrustedSection";
import { TeamSection } from "@/components/TeamSection";
import { Footer } from "@/components/Footer";
import { useIsTouch, useReducedMotion } from "@/lib/useDevice";

/**
 * Conditionally wraps children in Lenis. On touch devices (phones / tablets)
 * and when the user has requested reduced motion we render the native scroll
 * — Lenis on touch fights with iOS addressbar and snap-scroll carousels,
 * and burns CPU on low-end Androids.
 */
function ScrollContainer({ children }: { children: ReactNode }) {
  const isTouch = useIsTouch();
  const reducedMotion = useReducedMotion();

  if (isTouch || reducedMotion) {
    if (typeof window !== "undefined") {
      console.debug("[App] scroll=native", { isTouch, reducedMotion });
    }
    return <>{children}</>;
  }

  if (typeof window !== "undefined") {
    console.debug("[App] scroll=lenis", { isTouch, reducedMotion });
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 0.8,
        syncTouch: false,
        touchMultiplier: 1.2,
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default function App() {
  return (
    <ScrollContainer>
      <div className="bg-paper">
        <Nav />
        <Header />
        <TickerSection />
        <ManifestoSection />
        <ServicesSection />
        <ProcessSection />
        <CreativeTitle />
        <ShowreelSection />
        <AutomationSection />
        <TrustedSection />
        <TeamSection />
        <Footer />
      </div>
    </ScrollContainer>
  );
}
