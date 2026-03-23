import { Nav } from "@/components/Nav";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProductGrid } from "@/components/ProductGrid";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { Footer } from "@/components/Footer";

export default function App() {
  return (
    <div className="bg-white">
      <Nav />
      <div className="max-w-[1800px] mx-auto">
        <Header />
        <HeroSection />
        <main>
          <ProductGrid />
          <NewsletterCTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}
