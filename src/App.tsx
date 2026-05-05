import { lazy, Suspense } from "react";
import { useIsMobile } from "@/lib/useDevice";
import MobileLanding from "@/components/mobile/MobileLanding";

/**
 * Top-level fork: phones (≤767px) get the standalone `<MobileLanding/>`
 * — a separate document with no Lenis, no Tegaki, no `<video>`. Tablets
 * and desktops get the cinematic long-scroll, lazily code-split so the
 * mobile bundle never pays for it.
 *
 * Linear / Vercel / Stripe pattern: ship a different document on mobile,
 * not a CSS-shrunk desktop.
 */
const DesktopApp = lazy(() => import("./DesktopApp"));

export default function App() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileLanding />;
  }

  return (
    <Suspense fallback={<div className="bg-paper min-h-screen" />}>
      <DesktopApp />
    </Suspense>
  );
}
