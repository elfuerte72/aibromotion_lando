import { ScrollReveal } from "@/components/ScrollReveal";

export function NewsletterCTA() {
  return (
    <section className="bg-white">
      {/* Quote */}
      <ScrollReveal>
        <div className="px-6 py-16 md:px-10 md:py-20">
          <p
            className="font-heading uppercase leading-[1.1] max-w-5xl mx-auto"
            style={{ fontSize: "clamp(1.5rem, 4vw, 3.75rem)" }}
          >
            Aibromotion — это бунт против обыденности. Никаких трендов, никаких
            сезонов — только визуальные высказывания.
          </p>
        </div>
      </ScrollReveal>

      {/* Full-width showreel video */}
      <ScrollReveal>
        <div className="mt-0 relative" style={{ aspectRatio: "16/7" }}>
          <video
            src="/media/truck.mov"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </ScrollReveal>

    </section>
  );
}
