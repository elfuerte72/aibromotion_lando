import { useState } from "react";
import { SERVICES } from "@/components/services/serviceData";

type Extended = {
  lede: string;
  bullets: string[];
  stat?: { value: string; label: string };
  tags: string[];
};

const EXTENDED: Record<string, Extended> = {
  "01": {
    lede: "Рекламные ролики, AI-аватары и монтаж под ключ — от сценария до финальной звуковой смеси.",
    bullets: [
      "Сценарий, раскадровка, реф-борды",
      "Съёмка собственной командой и техникой",
      "Монтаж, цветокоррекция, звуковой дизайн",
      "AI-аватары и липсинк под голос бренда",
    ],
    stat: { value: "20+", label: "роликов в месяц" },
    tags: ["4K", "DaVinci", "AI-Lipsync", "Sound"],
  },
  "02": {
    lede: "Придумываем концепции, которые продают — от сценарной идеи до арт-дирекшна на площадке.",
    bullets: [
      "Концепция и тон бренда",
      "Сценарии и сторителлинг",
      "Арт-дирекшн и реф-борды",
      "Айдентика для контент-серий",
    ],
    stat: { value: "5", label: "дней от идеи до съёмки" },
    tags: ["Сценарий", "Концепция", "Арт-дирекшн"],
  },
  "03": {
    lede: "Стратегия и продвижение в одном контуре. Не делаем красиво — делаем так, чтобы окупалось.",
    bullets: [
      "Контент-план на квартал",
      "SMM-автоматизация публикаций",
      "Таргет и платный трафик",
      "Аналитика, A/B и отчётность",
    ],
    stat: { value: "−35%", label: "стоимость лида в среднем" },
    tags: ["SMM", "Продвижение", "Аналитика"],
  },
  "04": {
    lede: "Цифровые ведущие и амбассадоры. Один аватар — сотни роликов на 20+ языках без новой съёмки.",
    bullets: [
      "Синтез голоса под бренд",
      "Фотореалистичный липсинк",
      "Массовое производство контента",
      "Локализация без повторных съёмок",
    ],
    stat: { value: "20+", label: "языков локализации" },
    tags: ["Voice-clone", "Lipsync", "Multilang"],
  },
  "05": {
    lede: "AI-боты, которые работают 24/7 — продают, поддерживают, квалифицируют. Передают горячих живому менеджеру.",
    bullets: [
      "Квалификация лидов 24/7",
      "Поддержка в Telegram, WhatsApp и MAX",
      "Настройка агентов через OpenClaw и Hermes",
      "Интеграция с CRM и таблицами",
      "Передача горячих менеджеру",
    ],
    stat: { value: "7", label: "дней — типовой запуск" },
    tags: ["Telegram", "WhatsApp", "MAX", "Bitrix24", "AmoCRM", "OpenClaw", "Hermes"],
  },
  "06": {
    lede: "Заявки, документы, отчёты — на автопилоте. Команда занимается стратегией, рутину берёт на себя AI.",
    bullets: [
      "Обработка заявок и УПД",
      "Авто-отчёты по продажам",
      "Воркфлоу между сервисами",
      "Интеграции через API и вебхуки",
    ],
    stat: { value: "20+", label: "часов в неделю экономии" },
    tags: ["n8n", "Sheets", "1С"],
  },
  "07": {
    lede: "Разработка на чистом коде, не Тильда и не шаблон. Уникальный сайт, заточенный под ваш бизнес.",
    bullets: [
      "React + Vite, кастомный код",
      "Lighthouse 95+ из коробки",
      "Анимации и моушен под бренд",
      "Подключение CMS под клиента",
    ],
    stat: { value: "95+", label: "Lighthouse Performance" },
    tags: ["React", "Vite", "Tailwind", "MDX"],
  },
};

/**
 * Mobile services — editorial index. Семь дисциплин как полноширинный
 * нумерованный список: монономер + italic-заголовок, тонкая hairline,
 * tap раскрывает богатую панель (italic-лид, что входит, цифра-stat,
 * mono-теги). Single-open accordion, чистый CSS-grid для плавного
 * раскрытия (`grid-template-rows: 0fr → 1fr`).
 */
export function MobileServices() {
  const [open, setOpen] = useState<string | null>("01");

  return (
    <section className="bg-paper border-t border-ink/10 px-5 py-16">
      <div className="mb-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-3">
          Что мы делаем
        </div>
        <h2 className="font-heading font-extrabold uppercase leading-[0.88] tracking-[-0.04em] text-[clamp(36px,10.5vw,52px)]">
          Семь
          <br />
          <span className="font-serif italic font-light tracking-[-0.03em]">
            дисциплин.
          </span>
        </h2>
        <p className="mt-4 max-w-[34ch] text-[14.5px] leading-[1.5] text-ink-2">
          От идеи и съёмки до AI-аватаров, агентов и автоматизации — собираем под ключ под задачу бизнеса.
        </p>
      </div>

      <ol className="border-t border-ink/15">
        {SERVICES.map((s) => {
          const isOpen = open === s.n;
          const ext = EXTENDED[s.n];
          return (
            <li key={s.n} className="border-b border-ink/15">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : s.n)}
                className="w-full flex items-start gap-4 py-5 text-left active:opacity-80 transition-opacity"
              >
                <span className="flex-1 min-w-0 block font-serif italic font-light text-ink leading-[0.95] tracking-[-0.025em] text-[clamp(30px,9vw,44px)]">
                  {s.t}
                  <span className="text-accent">.</span>
                </span>
                <span
                  aria-hidden
                  className={`shrink-0 mt-3 inline-grid place-items-center w-5 h-5 font-mono text-[18px] leading-none text-accent transition-transform duration-300 ease-out ${
                    isOpen ? "rotate-45" : "rotate-0"
                  }`}
                >
                  +
                </span>
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-[420ms] ease-[cubic-bezier(0.2,0.85,0.15,1)] ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pr-2 pb-7">
                    <p className="font-serif italic text-[15.5px] leading-[1.5] text-ink mb-6 max-w-[36ch]">
                      {ext?.lede ?? s.body}
                    </p>

                    {ext && (
                      <>
                        <div className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-muted mb-3">
                          Что входит
                        </div>
                        <ul className="flex flex-col gap-2 mb-6">
                          {ext.bullets.map((b) => (
                            <li
                              key={b}
                              className="flex items-start gap-3 text-[13.5px] leading-[1.45] text-ink-2"
                            >
                              <span
                                aria-hidden
                                className="font-mono text-accent text-[12px] leading-[1.45] shrink-0"
                              >
                                ▸
                              </span>
                              <span className="min-w-0">{b}</span>
                            </li>
                          ))}
                        </ul>

                        {ext.stat && (
                          <div className="flex items-baseline gap-4 py-4 border-t border-ink/15 mb-5">
                            <span className="font-serif italic font-light text-accent leading-none text-[clamp(34px,10vw,46px)] tracking-[-0.03em] tabular-nums">
                              {ext.stat.value}
                            </span>
                            <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted max-w-[18ch]">
                              {ext.stat.label}
                            </span>
                          </div>
                        )}

                        <ul className="flex flex-wrap gap-1.5">
                          {ext.tags.map((t) => (
                            <li
                              key={t}
                              className="px-2.5 py-1 border border-ink/20 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-2 bg-paper-2"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
