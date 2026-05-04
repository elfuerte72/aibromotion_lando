import { useRef } from "react";
import { TegakiRenderer, type TegakiRendererHandle } from "tegaki/react";
import caveatCyrillic from "@/fonts/caveat-cyrillic/bundle";

export default function AutomationTegaki({ isInView }: { isInView: boolean }) {
  const tegakiRef = useRef<TegakiRendererHandle>(null);
  return (
    <TegakiRenderer
      ref={tegakiRef}
      font={caveatCyrillic}
      time={
        isInView
          ? { mode: "uncontrolled", speed: 1, delay: 0.2 }
          : { mode: "controlled", value: 0 }
      }
      style={{
        fontSize: "clamp(4rem, 12vw, 10rem)",
        lineHeight: 1,
        color: "var(--accent)",
      }}
      effects={{
        pressureWidth: { strength: 0.6 },
        taper: { startLength: 0.1, endLength: 0.15 },
      }}
    >
      Автоматизация
    </TegakiRenderer>
  );
}
