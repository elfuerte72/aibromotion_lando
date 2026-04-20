import { ReactLenis } from "lenis/react";
import { Nav } from "@/components/Nav";
import { Header } from "@/components/Header";
import { TickerSection } from "@/components/TickerSection";
import { ManifestoSection } from "@/components/ManifestoSection";
import { CreativeTitle } from "@/components/CreativeTitle";
import { ShowreelSection } from "@/components/ShowreelSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { StackSection } from "@/components/StackSection";
import { AutomationSection } from "@/components/AutomationSection";
import { TeamSection } from "@/components/TeamSection";
import { ContactSection } from "@/components/ContactSection";

export default function App() {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
      }}
    >
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
        <StackSection />
        <TeamSection />
        <ContactSection />
      </div>
    </ReactLenis>
  );
}
