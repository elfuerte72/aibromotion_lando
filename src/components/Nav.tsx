import { DesktopNav } from "@/components/nav/DesktopNav";
import { MobileNav } from "@/components/nav/MobileNav";
import { useIsMobile } from "@/lib/useDevice";

/**
 * Top-level nav router. Renders a full-screen drawer on phones
 * (<768px) and the classic inline nav on tablets / desktop.
 */
export function Nav() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileNav /> : <DesktopNav />;
}
