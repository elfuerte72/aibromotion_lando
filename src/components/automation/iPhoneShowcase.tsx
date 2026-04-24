/**
 * Portrait "iPhone" mockup — mobile replacement for the MacBook chrome
 * in `AutomationSection`. Uses the same `automation-demo.mp4`. Since the
 * source is landscape, we `object-cover` it inside a 9:19.5 frame — the
 * center of the action remains visible. On ≥md the desktop `MacBookShowcase`
 * is rendered instead.
 *
 * Kept intentionally simple — no mock status bar etc.; the focus is on
 * the content inside the screen, not frame fidelity.
 */
export function IPhoneShowcase() {
  return (
    <div className="relative mx-auto w-[62vw] max-w-[280px]" style={{ aspectRatio: "9 / 19.5" }}>
      {/* Outer body + shadow */}
      <div className="absolute inset-0 rounded-[42px] border-[3px] border-[#1a1a1a] bg-[#0a0a0a] shadow-[0_12px_40px_rgba(14,14,12,0.28)]" />

      {/* Inner bezel */}
      <div className="absolute inset-[6px] rounded-[36px] overflow-hidden bg-[#0d0d0d] border border-[#121212]">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="/media/automation-demo-mobile.mp4"
            type="video/mp4"
            media="(max-width: 767px)"
          />
          <source src="/media/automation-demo.mp4" type="video/mp4" />
        </video>

        {/* Dynamic-island style pill */}
        <div
          aria-hidden
          className="absolute top-2 left-1/2 -translate-x-1/2 w-[34%] h-[18px] bg-black rounded-full"
        />
      </div>

      {/* Side buttons — purely decorative */}
      <div
        aria-hidden
        className="absolute top-[18%] -left-[3px] w-[3px] h-[48px] rounded-l bg-[#1a1a1a]"
      />
      <div
        aria-hidden
        className="absolute top-[30%] -right-[3px] w-[3px] h-[72px] rounded-r bg-[#1a1a1a]"
      />
    </div>
  );
}
