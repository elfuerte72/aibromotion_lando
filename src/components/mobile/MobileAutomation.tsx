/**
 * Mobile-only «Автоматизация и AI-агенты». Compact retelling of the
 * desktop AutomationSection content — without the MacBook video, the
 * Tegaki title, the typing terminal, scroll-driven counters or any
 * IntersectionObserver. Pure static markup so scroll is butter-smooth.
 */

const SERVICES = [
  {
    title: "Умная обработка заявок",
    desc: "Бот принимает заявку, квалифицирует клиента и передаёт менеджеру только горячих. Холодным — автоматические сообщения.",
  },
  {
    title: "Поддержка клиентов 24/7",
    desc: "AI отвечает в Telegram и WhatsApp в любое время. Не знает ответа — переключает на живого сотрудника.",
  },
  {
    title: "Автоматизация документов",
    desc: "Загружаете файл — система извлекает данные и заносит в таблицу. Пример: автоматизация УПД для строительной компании.",
  },
];

const STEPS = [
  { title: "Идея", desc: "Разбираем вашу задачу, находим процессы, которые можно передать AI." },
  { title: "Прототип", desc: "Собираем рабочую версию за дни, а не месяцы. Вы видите результат сразу." },
  { title: "Запуск", desc: "Подключаем к вашим системам, обучаем команду, сопровождаем после старта." },
];

const NUMBERS = [
  { value: "20+", label: "проектов реализовано" },
  { value: "10+", label: "компаний работают с нами" },
  { value: "7", label: "от 7 дней — срок запуска" },
];

const INTEGRATIONS = [
  "Telegram",
  "WhatsApp",
  "Google Sheets",
  "1С",
  "Битрикс24",
  "VK",
  "Ozon",
  "Avito",
  "Wildberries",
  "Max",
];

const BULLETS = [
  "Автоматизация процессов от заявки до отчёта",
  "AI-агенты, которые работают 24/7 без перерывов",
  "Интеграция с вашими CRM, мессенджерами и таблицами",
];

export function MobileAutomation() {
  return (
    <section id="automation" className="bg-paper border-t border-ink/10 px-5 py-16">
      {/* Title block */}
      <div className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-3">
          Автоматизация и AI-агенты
        </div>
        <h2 className="font-serif italic font-light text-accent leading-[0.95] tracking-[-0.03em] text-[clamp(34px,10.5vw,52px)]">
          Автоматизация
        </h2>
        <p className="mt-4 max-w-[36ch] text-[14.5px] leading-[1.55] text-ink-2">
          Строим AI-ботов и автоматизируем процессы для малого и среднего бизнеса. От уведомлений до сложных систем обработки документов.
        </p>
      </div>

      {/* Headline */}
      <div className="py-8 border-y border-ink/15">
        <p className="font-heading font-extrabold uppercase leading-[1.05] tracking-[-0.03em] text-[clamp(24px,7.2vw,30px)]">
          Мы автоматизируем бизнес и создаём AI-агентов под&nbsp;ключ.
        </p>
      </div>

      {/* Bullets */}
      <div className="py-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-4">
          Как это работает
        </p>
        <h3 className="font-heading font-extrabold uppercase tracking-[-0.025em] leading-[1.05] text-[clamp(22px,6.8vw,28px)] mb-5">
          Ваш бизнес на автопилоте.
        </h3>
        <ul className="flex flex-col gap-3">
          {BULLETS.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-accent mt-[8px] shrink-0" />
              <p className="text-[14.5px] leading-[1.5] text-ink-2">{b}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Service cards */}
      <div className="pt-2 pb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-4">
          Услуги
        </p>
        <div className="flex flex-col gap-px bg-ink">
          {SERVICES.map((s) => (
            <div key={s.title} className="bg-paper-2 px-5 py-5">
              <h4 className="font-heading font-extrabold uppercase leading-[1.15] tracking-[-0.025em] text-[17px] mb-2">
                {s.title}
              </h4>
              <p className="text-[13.5px] leading-[1.5] text-ink-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Statement */}
      <div className="py-8 border-y border-ink/15">
        <p className="font-heading font-extrabold uppercase leading-[1.1] tracking-[-0.03em] text-[clamp(20px,6vw,26px)]">
          Ваша команда занимается стратегией — рутину берёт на себя&nbsp;AI.
        </p>
      </div>

      {/* Process steps */}
      <div className="py-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-4">
          Как работаем
        </p>
        <ol className="flex flex-col">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className={`px-5 py-5 border border-ink/15 ${i > 0 ? "border-t-0" : ""}`}
            >
              <h4 className="font-heading font-extrabold uppercase tracking-[-0.025em] text-[18px] mb-2">
                {s.title}
                <span className="text-accent">.</span>
              </h4>
              <p className="text-[13.5px] leading-[1.5] text-ink-2">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Numbers */}
      <div className="py-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-4">
          Цифры
        </p>
        <div className="flex flex-col">
          {NUMBERS.map((n, i) => (
            <div
              key={n.label}
              className={`flex items-baseline justify-between gap-4 py-5 ${
                i > 0 ? "border-t border-ink/15" : ""
              }`}
            >
              <span className="font-serif italic font-light text-accent leading-none text-[clamp(38px,11vw,52px)] tracking-[-0.03em] tabular-nums">
                {n.value}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted text-right max-w-[20ch]">
                {n.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Integrations */}
      <div className="py-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-4">
          Подключаемся к вашим системам
        </p>
        <ul className="flex flex-wrap gap-2">
          {INTEGRATIONS.map((it) => (
            <li
              key={it}
              className="px-3 py-2 border border-ink/20 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2 bg-paper-2"
            >
              {it}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-[36ch] text-[13.5px] leading-[1.55] text-ink-2 italic font-serif">
          «AI не заменит ваш бизнес. Но бизнес, который использует AI, заменит ваш.»
          <span className="block not-italic font-mono text-[10px] tracking-[0.18em] uppercase text-muted mt-2">
            Jensen Huang · CEO NVIDIA
          </span>
        </p>
      </div>
    </section>
  );
}
