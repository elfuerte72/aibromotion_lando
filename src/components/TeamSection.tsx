import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile, useIsTouch } from "@/lib/useDevice";
import { toAvif } from "@/lib/media";
import { TeamCarousel, type TeamMember } from "./team/TeamCarousel";
import { Reveal } from "./shared/Reveal";

const ease: [number, number, number, number] = [0.2, 0.8, 0.15, 1];

const TEAM: TeamMember[] = [
  { n: "Макс", r: "Технический директор", src: "/media/team-max.webp", i: "01" },
  { n: "Антон", r: "Маркетолог, креатор", src: "/media/team-toha.webp", i: "02" },
  { n: "Артём", r: "Монтажёр", src: "/media/team-tema.webp", i: "03" },
];

export function TeamSection() {
  const isMobile = useIsMobile();

  return (
    <section id="team" className="py-[80px] sm:py-[100px] lg:py-[140px] border-b border-ink">
      {/* Head */}
      <div className="px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-[48px] sm:mb-[60px] items-end">
        <div>
          <div className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-muted mb-4">
            [08] Команда
          </div>
          <h2 className="font-heading font-extrabold uppercase leading-[0.84] tracking-[-0.055em] text-[clamp(44px,11vw,160px)]">
            Те, кто<br />
            <span className="font-serif italic font-light tracking-[-0.03em]">творит.</span>
          </h2>
        </div>
        <div className="max-w-[440px] text-[15px] leading-relaxed">
          <Reveal as="p" delay={120} duration={900}>
            Ядро — три человека. Вокруг — сеть специалистов на проект: операторы, саунд, моушен, колорист, продюсеры, инженеры ИИ.
          </Reveal>
        </div>
      </div>

      {isMobile ? (
        <TeamCarousel members={TEAM} />
      ) : (
        <div className="px-5 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TEAM.map((m, i) => (
            <TeamCard key={m.n} member={m} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}

function TeamCard({
  member: m,
  index,
}: {
  member: (typeof TEAM)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const isTouch = useIsTouch();

  // On touch devices highlight the card that's centered in the viewport
  // (IntersectionObserver threshold 0.6) — that replaces the hover state.
  const [touchActive, setTouchActive] = useState(false);
  useEffect(() => {
    if (!isTouch || !ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setTouchActive(entry.isIntersecting && entry.intersectionRatio >= 0.6);
      },
      { threshold: [0, 0.6] },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [isTouch]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.08, ease }}
      data-active={touchActive ? "true" : "false"}
      className="group relative aspect-[3/4] overflow-hidden border border-ink bg-paper-2 cursor-pointer"
    >
      <picture>
        <source srcSet={toAvif(m.src)} type="image/avif" />
        <img
          src={m.src}
          alt={m.n}
          className="absolute inset-0 w-full h-full object-cover object-[center_20%] grayscale-[0.4] contrast-[1.05] transition-all duration-[800ms] ease-[cubic-bezier(0.2,0.8,0.15,1)] group-hover:grayscale-0 group-hover:scale-[1.04] group-data-[active=true]:grayscale-0 group-data-[active=true]:scale-[1.04]"
        />
      </picture>
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.78) 100%)",
        }}
      />
      <div className="absolute left-3.5 right-3.5 bottom-3.5 flex justify-between items-end gap-3">
        <div
          className="text-white transition-colors duration-300 group-hover:text-accent group-data-[active=true]:text-accent"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.45)" }}
        >
          <div className="font-heading font-bold text-[clamp(18px,5vw,22px)] tracking-[-0.02em] uppercase drop-shadow-md">{m.n}</div>
          <div className="font-mono text-[10px] font-medium tracking-[0.14em] uppercase mt-1 opacity-90">
            {m.r}
          </div>
        </div>
        <div className="font-mono text-[11px] font-medium tracking-[0.14em] text-white/70">[{m.i}]</div>
      </div>
    </motion.div>
  );
}
