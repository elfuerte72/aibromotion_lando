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
    | { type: "image"; src: string }
    | { type: "code"; lines: string[] };
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
    tags: [],
    media: { type: "video", src: "/media/heroes.mp4" },
  },
  {
    n: "02",
    t: "Креатив",
    body: "Сценарий, концепция, арт-дирекшн. Придумываем и делаем сами.",
    tags: [],
    media: { type: "image", src: "/media/footer-bg.webp" },
  },
  {
    n: "03",
    t: "Маркетинг",
    body: "Контент-план, SMM-автоматизация, продвижение. Запускаем и ведём.",
    tags: [],
    media: { type: "image", src: "/media/service-marketing.webp" },
  },
  {
    n: "04",
    t: "ИИ-аватары",
    body: "Цифровые ведущие и амбассадоры. AI-синтез голоса, липсинк, массовое производство.",
    tags: [],
    media: { type: "image", src: "/media/hero.webp" },
  },
  {
    n: "05",
    t: "AI-агенты",
    body: "Боты для продаж, поддержки, бухгалтерии. Интеграция с Telegram, WhatsApp, CRM.",
    tags: [],
    media: { type: "image", src: "/media/service-ai-agent.webp" },
  },
  {
    n: "06",
    t: "Автоматизация",
    body: "Заявки, документы, отчёты — всё на автопилоте.",
    tags: [],
    media: { type: "image", src: "/media/service-automation.webp" },
  },
  {
    n: "07",
    t: "Сайты",
    body: "Разработка на чистом коде — не Тильда, не шаблон. Уникальный сайт под ваш бизнес.",
    tags: [],
    // Live-typing JSX поверх accent-панели — рендерится через `WebCodeTyping`.
    media: {
      type: "code",
      lines: [
        '<Section variant="hero">',
        '  <Title>{brand}</Title>',
        '  <Cta href="/contact">↗</Cta>',
        "</Section>",
      ],
    },
  },
];
