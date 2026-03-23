import { ReactLenis } from "lenis/react";
import { Nav } from "@/components/Nav";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProductGrid } from "@/components/ProductGrid";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { AutomationSection } from "@/components/AutomationSection";
import { Footer } from "@/components/Footer";

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
      {/* Footer sits behind everything */}
      <Footer />

      {/* Main content sits on top, lifts away to reveal footer */}
      <div
        className="relative bg-white"
        style={{
          zIndex: 1,
          marginBottom: "var(--footer-h)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.3)",
        }}
      >
        <Nav />
        <div className="max-w-[1800px] mx-auto">
          <Header />
          <HeroSection />
          <main>
            <ProductGrid />
            <NewsletterCTA />
          </main>
        </div>
        <AutomationSection />
      </div>
    </ReactLenis>
  );
}
