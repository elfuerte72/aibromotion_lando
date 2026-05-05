import { useEffect, useMemo, useState } from "react";

/**
 * Live-typing JSX для карточки «Сайты». На hover родительской группы
 * (controlled через `isHovered`) запускается RAF-цикл, наращивающий
 * счётчик символов до общей длины всех строк. После завершения курсор
 * моргает на конце последней строки. Сброс — на mouseLeave.
 *
 * Нет внешних зависимостей: чистый React state + requestAnimationFrame.
 * Все стили в моно-шрифте проекта (JetBrains Mono) на paper-цвете
 * поверх оранжевой accent-панели.
 */

interface Props {
  lines: string[];
  isHovered: boolean;
}

const TYPE_SPEED_MS = 26;

export function WebCodeTyping({ lines, isHovered }: Props) {
  const total = useMemo(
    () => lines.reduce((sum, l) => sum + l.length, 0),
    [lines],
  );

  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (!isHovered) {
      setChars(0);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const c = Math.min(total, Math.floor((now - start) / TYPE_SPEED_MS));
      setChars((prev) => (prev !== c ? c : prev));
      if (c < total) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isHovered, total]);

  // Найти строку, на которой сейчас курсор, и сколько символов в ней набрано.
  let activeIdx = lines.length - 1;
  let charsInActive = lines[lines.length - 1]?.length ?? 0;
  let remaining = chars;
  for (let i = 0; i < lines.length; i++) {
    if (remaining < lines[i].length) {
      activeIdx = i;
      charsInActive = remaining;
      break;
    }
    remaining -= lines[i].length;
  }

  const done = chars >= total;

  return (
    // Прижато к верху карточки: верхняя граница `top-[88px]` опускает блок
    // ниже строки с номером [07] / стрелкой, нижняя `bottom-[210px]`
    // гарантирует, что код не пересекается с заголовком + body + tags
    // (нижний z-[2]-блок карточки).
    <div className="absolute left-0 right-0 top-[88px] bottom-[210px] px-8 sm:px-12 lg:px-14 flex flex-col justify-start pointer-events-none select-none overflow-hidden">
      <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-paper/65 mb-3">
        // src/Hero.tsx
      </div>
      <pre className="font-mono text-[clamp(12px,0.95vw,15px)] leading-[1.6] text-paper whitespace-pre">
        {lines.map((line, i) => {
          const isPast = i < activeIdx;
          const isActive = i === activeIdx;
          const visible = isPast ? line : isActive ? line.slice(0, charsInActive) : "";
          return (
            <span key={i} className="block min-h-[1.6em]">
              {visible}
              {isActive && (
                <span
                  aria-hidden
                  className={`inline-block w-[0.55em] h-[1.05em] translate-y-[3px] bg-paper ml-[1px] align-baseline ${
                    done ? "animate-[wcblink_1s_steps(1)_infinite]" : ""
                  }`}
                />
              )}
            </span>
          );
        })}
      </pre>
      <style>{`@keyframes wcblink { 50% { opacity: 0; } }`}</style>
    </div>
  );
}
