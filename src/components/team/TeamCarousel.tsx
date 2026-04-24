import { toAvif } from "@/lib/media";
import { SnapCarousel } from "../shared/SnapCarousel";

export type TeamMember = {
  n: string;
  r: string;
  src: string;
  i: string;
};

/**
 * Mobile carousel for the team portraits. On desktop the section uses a
 * 3-column hover grid inside `TeamSection.tsx`.
 */
export function TeamCarousel({ members }: { members: TeamMember[] }) {
  return (
    <SnapCarousel
      label="Команда"
      items={members}
      getKey={(m) => m.n}
      slideClassName="w-[80vw] max-w-[320px] aspect-[3/4] shrink-0 snap-start"
      trackClassName="gap-3 px-5 pb-4"
      indicatorClassName="px-5 mt-4"
      renderItem={(m, _i, isActive) => (
        <TeamSlide member={m} isActive={isActive} />
      )}
    />
  );
}

function TeamSlide({
  member: m,
  isActive,
}: {
  member: TeamMember;
  isActive: boolean;
}) {
  return (
    <div
      data-active={isActive ? "true" : "false"}
      className="relative w-full h-full overflow-hidden border border-ink bg-paper-2"
    >
      <picture>
        <source srcSet={toAvif(m.src)} type="image/avif" />
        <img
          src={m.src}
          alt={m.n}
          className="absolute inset-0 w-full h-full object-cover object-[center_20%] grayscale-[0.4] contrast-[1.05] transition-all duration-[800ms] ease-[cubic-bezier(0.2,0.8,0.15,1)] data-[active=true]:grayscale-0 data-[active=true]:scale-[1.04]"
          data-active={isActive ? "true" : "false"}
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
          className="text-white transition-colors duration-300 data-[active=true]:text-accent"
          data-active={isActive ? "true" : "false"}
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.45)" }}
        >
          <div className="font-heading font-bold text-[clamp(20px,6vw,26px)] tracking-[-0.02em] uppercase drop-shadow-md">
            {m.n}
          </div>
          <div className="font-mono text-[10px] font-medium tracking-[0.14em] uppercase mt-1 opacity-90">
            {m.r}
          </div>
        </div>
        <div className="font-mono text-[11px] font-medium tracking-[0.14em] text-white/70">
          [{m.i}]
        </div>
      </div>
    </div>
  );
}
