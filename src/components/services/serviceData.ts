/**
 * Services data + type, shared between `ServicesHoverGrid` (desktop) and
 * `ServicesCarousel` (mobile). Single source of truth.
 */
export type Service = {
  n: string;
  t: string;
  body: string;
  tags: string[];
  /** Foreground media revealed on hover (desktop) / shown on the active slide (mobile). */
  media?:
    | { type: "video"; src: string }
    | { type: "image"; src: string };
  /**
   * Optional ambient background video that plays at rest on the desktop
   * hover grid. When the user hovers, this pauses and the regular `media`
   * crossfades in over the accent panel — gives a "two-state" preview.
   * Mobile carousel ignores this (no hover surface).
   */
  ambientVideo?: string;
};

export const SERVICES: Service[] = [
  {
    n: "01",
    t: "Видео",
    body: "Рекламные ролики, AI-аватары, монтаж. Под ключ.",
    tags: ["Ads", "Film", "Motion"],
    media: { type: "video", src: "/media/heroes-mobile.mp4" },
  },
  {
    n: "02",
    t: "Креатив",
    body: "Сценарий, концепция, арт-дирекшн. Придумываем и делаем сами.",
    tags: ["Strategy", "Art", "Copy"],
    media: { type: "image", src: "/media/footer-bg.webp" },
  },
  {
    n: "03",
    t: "Маркетинг",
    body: "Контент-план, SMM-автоматизация, продвижение. Запускаем и ведём.",
    tags: ["Growth", "Paid", "SMM"],
    media: { type: "image", src: "/media/service-marketing.webp" },
  },
  {
    n: "04",
    t: "ИИ-аватары",
    body: "Цифровые ведущие и амбассадоры. AI-синтез голоса, липсинк, массовое производство.",
    tags: ["AI", "Voice", "Lip"],
    media: { type: "image", src: "/media/hero.webp" },
  },
  {
    n: "05",
    t: "AI-агенты",
    body: "Боты для продаж, поддержки, бухгалтерии. Интеграция с Telegram, WhatsApp, CRM.",
    tags: ["LLM", "Ops", "API"],
    media: { type: "image", src: "/media/service-ai-agent.webp" },
  },
  {
    n: "06",
    t: "Автоматизация",
    body: "Заявки, документы, отчёты — всё на автопилоте.",
    tags: ["Flow", "n8n", "API"],
    media: { type: "image", src: "/media/service-automation.webp" },
  },
];
