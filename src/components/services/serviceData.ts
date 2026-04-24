/**
 * Services data + type, shared between `ServicesHoverGrid` (desktop) and
 * `ServicesCarousel` (mobile). Single source of truth.
 */
export type Service = {
  n: string;
  t: string;
  body: string;
  tags: string[];
  media?:
    | { type: "video"; src: string }
    | { type: "image"; src: string };
};

export const SERVICES: Service[] = [
  {
    n: "01",
    t: "Видео",
    body: "Рекламные ролики, имиджевые фильмы, клипы. Съёмка, пост, цвет, звук. Полный цикл.",
    tags: ["Ads", "Film", "Motion"],
    media: { type: "video", src: "/media/gotovo.mp4" },
  },
  {
    n: "02",
    t: "Креатив",
    body: "Стратегия, идея, сценарий, арт-дирекшн. От задачи к визуальной системе.",
    tags: ["Strategy", "Art", "Copy"],
    media: { type: "image", src: "/media/footer-bg.webp" },
  },
  {
    n: "03",
    t: "Маркетинг",
    body: "Performance-кампании, контент-план, дистрибуция. Запуск → тест → масштаб.",
    tags: ["Growth", "Paid", "SMM"],
    media: { type: "image", src: "/media/service-marketing.webp" },
  },
  {
    n: "04",
    t: "ИИ-аватары",
    body: "Цифровые ведущие и амбассадоры. Синтез голоса, липсинк, 40 роликов за ночь.",
    tags: ["AI", "Voice", "Lip"],
    media: { type: "image", src: "/media/hero.webp" },
  },
  {
    n: "05",
    t: "AI-агенты",
    body: "Кастомные ассистенты для продаж, поддержки, HR. Интеграция с CRM, TG, WA.",
    tags: ["LLM", "Ops", "API"],
    media: { type: "image", src: "/media/service-ai-agent.webp" },
  },
  {
    n: "06",
    t: "Автоматизация",
    body: "Оцифровка процессов от заявки до отчёта. Меньше рутины — выше ROI.",
    tags: ["Flow", "n8n", "API"],
    media: { type: "image", src: "/media/service-automation.webp" },
  },
];
