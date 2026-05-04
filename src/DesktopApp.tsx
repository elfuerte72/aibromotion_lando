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
import { useReducedMotion } from "@/lib/useDevice";

/**
 * Desktop entry. Loaded lazily from `App.tsx` so the mobile bundle
 * never pays for Lenis, framer-motion useScroll wiring, Tegaki/Caveat
 * font payload, or the long cinematic sections.
 */
function ScrollContainer({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    if (typeof window !== "undefined") {
      console.debug("[DesktopApp] scroll=native (reduced-motion)");
    }
    return <>{children}</>;
  }

  if (typeof window !== "undefined") {
    console.debug("[DesktopApp] scroll=lenis");
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

export default function DesktopApp() {
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
