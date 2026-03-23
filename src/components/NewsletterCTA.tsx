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

      {/* Newsletter CTA */}
      <ScrollReveal delay={0.1}>
        <div className="px-6 md:px-10 pb-0">
          <a
            href="#"
            className="group flex items-center justify-between border border-black px-6 py-6 md:px-12 md:py-8 hover:bg-black hover:text-white transition-colors"
          >
            <span
              className="font-heading uppercase"
              style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}
            >
              ПОДПИСАТЬСЯ НА РАССЫЛКУ
            </span>
            <svg
              className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
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

      {/* Bottom tagline */}
      <ScrollReveal>
        <div className="px-6 py-8 md:px-10 md:py-10 text-center border-t border-black">
          <h2
            className="font-heading uppercase leading-none"
            style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
          >
            СТУДИЯ ВИЗУАЛЬНЫХ ВЫСКАЗЫВАНИЙ
          </h2>
        </div>
      </ScrollReveal>
    </section>
  );
}
