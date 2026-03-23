import { useEffect, useRef, useState, useCallback } from "react";

const BRIEF_TEXT = "Create a cinematic brand video for a tech startup targeting Gen Z audience with bold visuals";
const TYPING_SPEED = 45;
const PAUSE_AFTER_TYPING = 1200;
const PROCESSING_DURATION = 2800;
const RESULT_DISPLAY_DURATION = 3500;
const PAUSE_BEFORE_RESTART = 1000;

type Phase = "typing" | "processing" | "result" | "idle";

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [typedLength, setTypedLength] = useState(0);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [resultRevealed, setResultRevealed] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  // Intersection observer
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const resetState = useCallback(() => {
    setTypedLength(0);
    setProcessingProgress(0);
    setResultRevealed(false);
  }, []);

  // Animation loop
  useEffect(() => {
    if (!isVisible) return;

    const startCycle = () => {
      resetState();
      setPhase("typing");
    };

    // Initial start with small delay for entrance animation
    timeoutRef.current = setTimeout(startCycle, 600);

    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, [isVisible, resetState]);

  // Phase: typing
  useEffect(() => {
    if (phase !== "typing") return;

    let i = 0;
    intervalRef.current = setInterval(() => {
      i++;
      setTypedLength(i);
      if (i >= BRIEF_TEXT.length) {
        clearInterval(intervalRef.current);
        timeoutRef.current = setTimeout(() => setPhase("processing"), PAUSE_AFTER_TYPING);
      }
    }, TYPING_SPEED);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [phase]);

  // Phase: processing
  useEffect(() => {
    if (phase !== "processing") return;

    const startTime = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / PROCESSING_DURATION, 1);
      setProcessingProgress(progress);
      if (progress >= 1) {
        clearInterval(intervalRef.current);
        setPhase("result");
      }
    }, 30);

    return () => clearInterval(intervalRef.current);
  }, [phase]);

  // Phase: result
  useEffect(() => {
    if (phase !== "result") return;

    requestAnimationFrame(() => setResultRevealed(true));
    timeoutRef.current = setTimeout(() => {
      setResultRevealed(false);
      setTimeout(() => {
        resetState();
        setPhase("typing");
      }, PAUSE_BEFORE_RESTART);
    }, RESULT_DISPLAY_DURATION);

    return () => clearTimeout(timeoutRef.current);
  }, [phase, resetState]);

  const entranceDelay = (i: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(30px)",
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
  });

  return (
    <section ref={sectionRef} className="bg-white border-t border-black">
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 0.2; }
          100% { transform: scale(0.8); opacity: 0.6; }
        }
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
        }
        @keyframes orbit-reverse {
          0% { transform: rotate(0deg) translateX(28px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(28px) rotate(360deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(-8px) scale(1.3); opacity: 0.8; }
        }
      `}</style>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Column 1: THE BRIEF */}
        <div style={entranceDelay(0)}>
          <div className="flex flex-col justify-between p-6 md:p-10 min-h-[240px] md:min-h-[320px] border-b md:border-b-0 md:border-r border-black">
            <span className="font-body text-xs uppercase tracking-[0.15em] text-black/50 mb-4">
              The Brief:
            </span>
            <div className="flex-1 flex flex-col justify-center">
              <div
                className="font-body text-sm md:text-base leading-relaxed bg-black/[0.03] rounded-lg p-4 border border-black/10 relative overflow-hidden"
                style={{ minHeight: "100px" }}
              >
                {/* Terminal prompt */}
                <span className="text-black/30 select-none">{">"} </span>
                <span className="text-black/80">
                  {BRIEF_TEXT.slice(0, typedLength)}
                </span>
                {phase === "typing" && (
                  <span
                    className="inline-block w-[2px] h-[1.1em] bg-black/70 align-middle ml-[1px]"
                    style={{ animation: "blink 0.8s step-end infinite" }}
                  />
                )}
                {phase !== "typing" && typedLength > 0 && (
                  <span className="text-black/30 select-none"> ↵</span>
                )}
              </div>
            </div>
            <p className="font-body text-[10px] uppercase tracking-[0.15em] text-black/30 mt-4">
              Input prompt
            </p>
          </div>
        </div>

        {/* Column 2: AI IN MOTION */}
        <div style={entranceDelay(1)}>
          <div className="flex flex-col justify-between p-6 md:p-10 min-h-[240px] md:min-h-[320px] border-b md:border-b-0 md:border-r border-black relative overflow-hidden">
            <span className="font-body text-xs uppercase tracking-[0.15em] text-black/50 mb-4">
              AI in Motion:
            </span>

            <div className="flex-1 flex flex-col items-center justify-center relative">
              {/* Orbiting particles */}
              <div className="relative w-[120px] h-[120px]">
                {/* Outer ring */}
                <div
                  className="absolute inset-0 rounded-full border border-black/10"
                  style={{
                    animation: phase === "processing" ? "pulse-ring 2s ease-in-out infinite" : "none",
                    opacity: phase === "processing" ? 1 : 0.3,
                    transition: "opacity 0.5s",
                  }}
                />

                {/* Orbiting dots */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="absolute left-1/2 top-1/2 w-[6px] h-[6px] -ml-[3px] -mt-[3px] rounded-full bg-black"
                    style={phase === "processing" ? {
                      animation: `${i % 2 === 0 ? "orbit" : "orbit-reverse"} ${1.8 + i * 0.3}s linear infinite ${i * -0.4}s`,
                      opacity: 0.15 + (processingProgress * 0.6),
                      transition: "opacity 0.4s",
                    } : {
                      animation: "none",
                      opacity: 0.1,
                      transition: "opacity 0.4s",
                    }}
                  />
                ))}

                {/* Center core */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black transition-all duration-500"
                  style={{
                    width: phase === "processing" ? `${16 + processingProgress * 20}px` : "12px",
                    height: phase === "processing" ? `${16 + processingProgress * 20}px` : "12px",
                    opacity: phase === "processing" ? 0.8 : phase === "result" ? 0 : 0.2,
                  }}
                />

                {/* Completion burst */}
                {phase === "result" && (
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-black/30"
                    style={{
                      width: "120px",
                      height: "120px",
                      animation: "pulse-ring 0.6s ease-out forwards",
                    }}
                  />
                )}
              </div>

              {/* Progress bar */}
              <div className="w-full max-w-[160px] mt-6">
                <div className="h-[2px] bg-black/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black rounded-full transition-all duration-100 ease-linear"
                    style={{ width: `${processingProgress * 100}%` }}
                  />
                </div>
                <p className="font-body text-[10px] text-black/40 text-center mt-2 tabular-nums">
                  {phase === "processing"
                    ? `Generating... ${Math.round(processingProgress * 100)}%`
                    : phase === "result"
                      ? "Complete"
                      : "Awaiting input"}
                </p>
              </div>
            </div>

            {/* Floating particles background */}
            {phase === "processing" && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-black/10"
                    style={{
                      left: `${12 + (i * 11) % 76}%`,
                      top: `${15 + (i * 17) % 70}%`,
                      animation: `float-particle ${1.5 + (i % 3) * 0.5}s ease-in-out infinite ${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            )}

            <p className="font-body text-[10px] uppercase tracking-[0.15em] text-black/30 mt-4">
              Processing
            </p>
          </div>
        </div>

        {/* Column 3: THE RESULT */}
        <div style={entranceDelay(2)}>
          <div className="flex flex-col justify-between p-6 md:p-10 min-h-[240px] md:min-h-[320px] border-b border-black relative overflow-hidden">
            <span className="font-body text-xs uppercase tracking-[0.15em] text-black/50 mb-4">
              The Result:
            </span>

            <div className="flex-1 flex flex-col justify-center">
              {/* Result card with reveal animation */}
              <div
                className="relative rounded-lg overflow-hidden border border-black/10"
                style={{
                  opacity: resultRevealed ? 1 : 0,
                  transform: resultRevealed ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
                  transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {/* Gradient preview placeholder */}
                <div
                  className="w-full aspect-[16/10] relative"
                  style={{
                    background: "linear-gradient(135deg, #1a2664 0%, #252525 40%, #6b1a1a 70%, #e8a898 100%)",
                  }}
                >
                  {/* Scanline effect */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(transparent 50%, rgba(255,255,255,0.03) 50%)",
                      backgroundSize: "100% 4px",
                    }}
                  />

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <svg
                        className="w-5 h-5 text-white ml-0.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom info bar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm px-3 py-2 flex items-center justify-between">
                    <span className="font-body text-[10px] text-white/70 uppercase tracking-wider">
                      Brand Film
                    </span>
                    <span className="font-body text-[10px] text-white/50">
                      0:30
                    </span>
                  </div>
                </div>

                {/* Specs row */}
                <div className="flex divide-x divide-black/10 bg-black/[0.02]">
                  <div className="flex-1 px-3 py-2 text-center">
                    <p className="font-body text-[10px] text-black/40 uppercase">Quality</p>
                    <p className="font-heading text-xs font-bold">4K</p>
                  </div>
                  <div className="flex-1 px-3 py-2 text-center">
                    <p className="font-body text-[10px] text-black/40 uppercase">Duration</p>
                    <p className="font-heading text-xs font-bold">30s</p>
                  </div>
                  <div className="flex-1 px-3 py-2 text-center">
                    <p className="font-body text-[10px] text-black/40 uppercase">Variants</p>
                    <p className="font-heading text-xs font-bold">12</p>
                  </div>
                </div>
              </div>

              {/* Shimmer placeholder when not revealed */}
              <div
                className="absolute inset-x-6 md:inset-x-10 rounded-lg overflow-hidden"
                style={{
                  top: "50%",
                  transform: "translateY(-50%)",
                  height: "140px",
                  opacity: resultRevealed ? 0 : 0.5,
                  transition: "opacity 0.4s",
                  background: "linear-gradient(90deg, transparent 25%, rgba(0,0,0,0.04) 50%, transparent 75%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s linear infinite",
                  pointerEvents: "none",
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              />
            </div>

            <p className="font-body text-[10px] uppercase tracking-[0.15em] text-black/30 mt-4">
              Output ready
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
