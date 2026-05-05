import { SERVICES } from "@/components/services/serviceData";

/**
 * Mobile services. Pure-type editorial cards — no images, no videos, no
 * filters, no per-card scroll reveals. Just static markup. The dark
 * accent card (`04 ИИ-аватары`) keeps the rhythm of the stack.
 */
export function MobileServices() {
  return (
    <section className="bg-paper border-t border-ink/10 px-5 py-16">
      <div className="mb-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-3">
          Что мы делаем
        </div>
        <h2 className="font-heading font-extrabold uppercase leading-[0.88] tracking-[-0.04em] text-[clamp(36px,10.5vw,52px)]">
          Полный<br />
          <span className="font-serif italic font-light tracking-[-0.03em]">цикл.</span>
        </h2>
        <p className="mt-4 max-w-[34ch] text-[14.5px] leading-[1.5] text-ink-2">
          От идеи и съёмки до AI-аватаров, агентов и автоматизации — собираем под ключ под задачу бизнеса.
        </p>
      </div>

      <ul className="flex flex-col gap-3">
        {SERVICES.map((s) => {
          const dark = s.n === "04";
          return (
            <li
              key={s.n}
              className={`relative overflow-hidden border ${
                dark ? "bg-ink text-paper border-ink" : "bg-paper-2 border-ink/15"
              }`}
            >
              <article className="relative px-5 pt-5 pb-6">
                <h3
                  className="relative font-heading font-extrabold uppercase tracking-[-0.025em] leading-[0.95] text-[clamp(28px,8.5vw,36px)]"
                >
                  {s.t}
                  <span className="text-accent">.</span>
                </h3>

                <p
                  className={`relative mt-3 max-w-[36ch] text-[14px] leading-[1.5] ${
                    dark ? "text-paper/75" : "text-ink-2"
                  }`}
                >
                  {s.body}
                </p>

                <div
                  aria-hidden
                  className={`relative mt-5 h-px w-full ${
                    dark ? "bg-paper/20" : "bg-ink/15"
                  }`}
                />

                <div className="relative mt-3 flex items-center justify-end">
                  <span aria-hidden className="font-mono text-[12px] text-accent">
                    ↗
                  </span>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
