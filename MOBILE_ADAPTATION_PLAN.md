# План мобильной адаптации AIBROMOTION

**Ветка:** `feature/mobile-adaptation`
**Базовая ветка:** `claude-design`
**Концепция:** гибрид «Editorial + Swipe Deck» — контент-first вёрстка с локальными горизонтальными каруселями на ключевых секциях.
**Дата:** 2026-04-23

---

## 0. Цели и не-цели

### Цели
1. Сайт **корректно определяет** мобильное устройство и touch-ввод через комбинацию ширины + `pointer` + `hover` media-queries.
2. На экранах <768px ни одна секция не «ломается»: нет горизонтального скролла, нет обрезанного контента, нет фиксированных размеров, вываливающихся за край.
3. Все hover-интерактивы (Services, Showreel, Team, Process) имеют **touch-эквивалент** (tap-to-activate или автовоспроизведение при in-view).
4. **Мобильная навигация** — полноценное меню с якорями и CTA «Связаться».
5. Core Web Vitals на 4G Moto G4 profile: **LCP < 2.5s, CLS < 0.1, INP < 200ms**.
6. Экономия трафика: видео на мобиле — не более 2 одновременных autoplay + poster-first для остальных.
7. Сохранение «cinematic» бренда в ключевых точках (Hero, Showreel-main, Footer).

### Не-цели
- Не делаем отдельный мобильный маршрут / отдельный bundle — остаёмся SPA с условным рендером.
- Не переписываем Framer Motion / Lenis / Tegaki — только обёртки и условное включение.
- Не меняем дизайн-токены и цветовую схему.
- Не добавляем mobile-first PWA / service worker.
- Не мигрируем на Next.js / SSR.

---

## 1. Архитектура детекции устройства

### 1.1. Новые утилиты
**Файл:** `src/lib/useDevice.ts` (новый)

Экспортируется 3 хука, построенные на `useSyncExternalStore` + `window.matchMedia`:

| Хук | Media query | Назначение |
|---|---|---|
| `useIsMobile()` | `(max-width: 767.98px)` | Условный рендер мобильных компонентов (MobileNav, аккордеон вместо hover-grid) |
| `useIsTouch()` | `(hover: none) and (pointer: coarse)` | Отключение hover-поведения, замена на tap / IntersectionObserver |
| `useReducedMotion()` | `(prefers-reduced-motion: reduce)` | Выключение Lenis, marquee, Tegaki, parallax — a11y + слабые устройства |

**Правила:**
- Хуки безопасны для SSR (возвращают `false` при отсутствии `window`).
- Пересчитываются при resize / orientation change.
- Используются **только** в React-компонентах. Для чистого CSS — Tailwind breakpoints и `@media (hover: none)`.

### 1.2. Breakpoints

Сохраняем Tailwind v4 дефолты — **не переопределяем**:

| Префикс | Ширина | Применение |
|---|---|---|
| — | <640px | Чистый мобиль, 1 колонка, максимум компактности |
| `sm:` | ≥640px | Фаблет / большой мобиль — промежуточные 2-колоночные сетки |
| `md:` | ≥768px | Планшет portrait — появляются hover-эффекты, расширенные сетки |
| `lg:` | ≥1024px | Текущий «основной» дизайн |
| `xl:` | ≥1280px | Опционально — увеличенные gap'ы и шрифты |

### 1.3. Правило «когда Tailwind, а когда хук»

| Задача | Инструмент |
|---|---|
| Раскладка, типографика, сетки, gap, padding | **Tailwind breakpoints** (sm:/md:/lg:) |
| Hover vs tap UX | **`useIsTouch()`** |
| Совсем разный компонент (accordion vs grid) | **`useIsMobile()`** |
| Lenis on/off | **`useIsTouch() \|\| useReducedMotion()`** |
| Prefers-reduced-motion | **CSS `@media` + `useReducedMotion()`** |

---

## 2. Per-section план изменений

Для каждой секции указаны: текущее поведение → целевое на мобиле, файл:строка, сложность.

### 2.1. `index.html` + `src/index.css` + `src/App.tsx` — фундамент

| Что | Где | Было | Станет |
|---|---|---|---|
| viewport meta | `index.html:6` | `width=device-width, initial-scale=1.0` | `width=device-width, initial-scale=1, viewport-fit=cover` |
| overflow-x | `index.css:49` | `overflow-x: hidden` на html+body | убрать с html, оставить только на body + `overflow-anchor: none` |
| film-grain | `index.css:57-67` | всегда on | отключить при `prefers-reduced-motion` |
| Lenis | `App.tsx:16-24` | всегда on | `{isTouch \|\| reducedMotion ? children : <ReactLenis>…</ReactLenis>}` + опции `syncTouch: false`, `touchMultiplier: 1.2`, `wheelMultiplier: 0.8` |

**Сложность:** низкая. Риск регресса для desktop: минимальный.

---

### 2.2. `Nav.tsx` — мобильное меню

**Проблема:** `hidden md:flex` (строка 43) скрывает все якоря; на <768px виден только логотип.

**Решение — новые компоненты:**
- `src/components/nav/DesktopNav.tsx` — вынесенный текущий desktop-вариант.
- `src/components/nav/MobileNav.tsx` — бургер + full-screen drawer:
  - Кнопка-бургер в правом углу (заменяет часы и links).
  - Drawer — `bg-accent text-ink`, якоря `text-[clamp(32px,8vw,56px)] font-heading font-extrabold uppercase` в столбик.
  - Внизу drawer — контактные ссылки (email, telegram, max) + часы SPB.
  - Закрытие: tap на backdrop, кнопка `×`, или `Esc`.
  - Блокировка скролла body при открытом меню (Lenis `stop()`).
  - Анимация — `framer-motion` slide-in справа, 350ms, ease `[0.2, 0.85, 0.15, 1]`.
- `Nav.tsx` становится router-компонентом: `{isMobile ? <MobileNav/> : <DesktopNav/>}`.

**Дополнительно:** safe-area-inset — `padding: env(safe-area-inset-top) env(safe-area-inset-right) 0 env(safe-area-inset-left)`.

**Сложность:** средняя.

---

### 2.3. `Header.tsx` — герой

**Проблемы:** `pt-[92px]`, grid `1fr / [1.1fr_0.9fr]` без промежуточных шагов, заголовок `clamp(56px,10vw,200px)` съедает fold, портретные label'ы `absolute` могут перекрываться.

**Изменения:**
| Строка | Было | Станет |
|---|---|---|
| 28 | `pt-[92px] px-6 pb-6` | `pt-[72px] sm:pt-[84px] lg:pt-[92px] px-5 sm:px-6 pb-5` |
| 31 | `grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12` | `grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12` |
| 34 | `text-[clamp(56px,10vw,200px)]` | `text-[clamp(44px,12vw,200px)]` + `leading-[0.88] sm:leading-[0.84]` |
| 54 | `aspect-[4/5]` | `aspect-[3/4] sm:aspect-[4/5]` |
| 71 | `text-[clamp(24px,2.4vw,40px)]` цитата | `text-[clamp(18px,4.5vw,40px)]`, `bottom-12` → `bottom-10 sm:bottom-12` |
| 78 | `grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_auto] gap-8` | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] gap-6 lg:gap-8` |

**Порядок элементов в мобильном grid:** заголовок → портрет → 3 блока foot-text в 1 столбик. Сейчас так уже работает по факту из-за `grid-cols-1`.

**Сложность:** низкая.

---

### 2.4. `TickerSection.tsx` — бегущая строка

**Проблемы:** 32s-скорость одинакова для всех устройств, нет `will-change`, не реагирует на `prefers-reduced-motion`.

**Изменения:**
- Шрифт: `text-[clamp(26px,6.5vw,80px)]` (строка 15) — уменьшение минимума с 32 до 26.
- Скорость: мобильный CSS-переменной — `animation-duration: var(--ticker-speed, 32s)`, `@media (max-width: 767px) { --ticker-speed: 48s }` (медленнее = меньше jank).
- `will-change: transform` на `.animate-[tickerScroll…]`.
- `@media (prefers-reduced-motion: reduce) { animation: none }` — строка застывает со смещением `translateX(-20%)` для визуального разнообразия.

**Сложность:** низкая.

---

### 2.5. `ManifestoSection.tsx`

**Проблемы:** `py-[140px]`, `gap-[72px]`, `grid-cols-1 lg:grid-cols-[1.5fr_1fr]` без `md:`.

**Изменения:**
| Строка | Было | Станет |
|---|---|---|
| 37 | `py-[140px] px-6` | `py-[80px] sm:py-[100px] lg:py-[140px] px-5 sm:px-6` |
| 38 | `gap-[72px]` | `gap-10 md:gap-16 lg:gap-[72px]` |
| 44 | `text-[clamp(48px,7vw,120px)]` | `text-[clamp(40px,11vw,120px)]` |
| 71 | `grid-cols-1 md:grid-cols-2` | `grid-cols-2` (stats всегда в ряд — компактнее на мобиле) |
| 75 | `text-[clamp(40px,4vw,72px)]` | `text-[clamp(32px,7vw,72px)]` |

**Сложность:** низкая.

---

### 2.6. `ServicesSection.tsx` — **ключевая перевёрстка**

**Проблемы:**
- 6 карточек × `min-h-[460px]` = ~2800px вертикального скролла на мобиле.
- Hover-only эффект (оранжевая плашка с видео) не активируется на touch.
- `grid-cols-1 lg:grid-cols-3` — на планшете тоже 1 колонка.

**Решение — horizontal snap carousel для mobile, hover-grid для desktop:**

Новый компонент `src/components/services/ServicesCarousel.tsx`:
- Контейнер `overflow-x-auto scroll-smooth snap-x snap-mandatory flex gap-3 px-5 pb-4` + `scrollbar-width: none`.
- Каждая карточка `snap-start shrink-0 w-[85vw] max-w-[360px] aspect-[3/4]` — соседняя карточка «подсматривает» справа.
- Видео/image на карточке — показывается **сразу** (не по hover), с grayscale + accent overlay. При активной карточке (IntersectionObserver на scroller, threshold 0.7) — `autoPlay` активируется, у неактивных `pause()` + poster.
- Индикатор под каруселью: `[01 · 02 · 03 · 04 · 05 · 06]` — активный элемент подсвечен accent.
- A11y: `role="region" aria-roledescription="carousel" aria-label="Услуги студии"`, каждая карточка `role="group" aria-roledescription="slide"`, стрелки клавиатуры для навигации.

Существующий `ServiceCard` (hover-версия) выносится в `src/components/services/ServicesHoverGrid.tsx` — без изменений логики.

В `ServicesSection.tsx`:
```tsx
const isMobile = useIsMobile();
return (
  <section id="services" className="border-b border-ink">
    <Header /* head с текстом — остаётся общим */ />
    {isMobile ? <ServicesCarousel services={SERVICES}/> : <ServicesHoverGrid services={SERVICES}/>}
  </section>
);
```

**Сложность:** высокая (новый компонент + IntersectionObserver).

---

### 2.7. `ProcessSection.tsx`

**Проблемы:** `text-[160px]` outline-цифры без clamp; `grid-cols-1 lg:grid-cols-4` без промежуточных шагов; `min-h-[400px]` × 4 = 1600px скролла.

**Изменения (layout-only, без новых компонентов):**
| Строка | Было | Станет |
|---|---|---|
| 15 | `py-[140px] px-6` | `py-[80px] sm:py-[100px] lg:py-[140px] px-5 sm:px-6` |
| 20 | `text-[clamp(56px,9vw,160px)]` | `text-[clamp(44px,11vw,160px)]` |
| 25 | `grid-cols-1 lg:grid-cols-4` | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` |
| 50 | `p-6 pt-9 pb-[100px] … min-h-[400px]` | `p-6 pt-8 pb-20 sm:pb-[100px] … min-h-[280px] sm:min-h-[340px] lg:min-h-[400px]` |
| 53 | `text-[160px]` | `text-[clamp(72px,22vw,160px)]` |
| 57 | `text-[28px]` | `text-[clamp(22px,5.5vw,28px)]` |

**Outline-цифры как watermark** на мобиле (опция — не блокируем фазу): сделать `absolute top-4 right-4 opacity-20 pointer-events-none`, чтобы текст располагался слева, а цифра — справа декоративно. Включить через `md:` запрос (т.е. оставить текущее поведение на мобиле, но уменьшить cifru).

**Сложность:** низкая.

---

### 2.8. `CreativeTitle.tsx`

**Проблемы:** Tegaki перерисовывает вручную — дорого на слабых устройствах.

**Изменения:**
- При `useReducedMotion()` — рендерим `<h2 className="font-serif italic text-accent text-[clamp(4rem,14vw,10rem)]">Креатив</h2>` без Tegaki.
- `fontSize` в Tegaki (строка 37): `clamp(3.5rem, 14vw, 10rem)` — увеличили множитель с 12vw до 14vw для мобила.
- Убрать `max-w-lg` у subtitle (строка 51) → `max-w-sm sm:max-w-lg`.

**Сложность:** низкая.

---

### 2.9. `ShowreelSection.tsx`

**Проблемы:** `aspect-[21/9]` на 375px = высота ~161px; 1 main + 4 mini все с autoPlay = 5 одновременных видео; hover-эффекты не работают.

**Изменения:**
| Строка | Было | Станет |
|---|---|---|
| 18 | `pt-[100px] pb-[120px]` | `pt-[72px] sm:pt-[100px] pb-[80px] sm:pb-[120px]` |
| 20 | `grid-cols-1 lg:grid-cols-2 gap-12` | `grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12` |
| 42 | `aspect-[21/9]` | `aspect-video sm:aspect-[16/9] lg:aspect-[21/9]` (мобиль — 16:9, читаемо) |
| 56 | `grid-cols-2 lg:grid-cols-4` | на мобиле — **horizontal snap carousel**, на ≥md — grid |
| 65-72 | все 4 `<video autoPlay>` | poster-first + play на tap; на мобиле autoplay **только у main**, миники показывают `poster` |

**Реализация carousel для mini:** аналогично Services, но высота фикс `aspect-video` и 2 видео в видимой области (`w-[48vw]`).

**Сложность:** средняя.

---

### 2.10. `AutomationSection.tsx` — самый большой (716 строк)

**Проблемы:** MacBook-mockup с hard-coded процентами, множественные 2-col сетки, терминал-блок с realtime typing.

**Изменения:**

1. **MacBook → iPhone mockup на мобиле:**
   - Новый компонент `src/components/automation/iPhoneShowcase.tsx` — рамка iPhone 9:19.5 с тем же `automation-demo.mp4`, но portrait-ориентация.
   - В `AutomationSection.tsx:496` экспорт `MacBookShowcase` оборачивается: `return isMobile ? <iPhoneShowcase/> : <MacBookShowcase/>`.
   - Если нет отдельного portrait-видео — `MacBookShowcase` масштабируется с `max-width: 100%`, `aspectRatio` корректирующий.

2. **Grid'ы 2-col → 1-col на <md:** все `md:grid-cols-2` остаются, но `py-12 md:py-16` → `py-8 md:py-16`.

3. **Terminal-блок (строки 268-452):** на мобиле скрыть за `<details>`-toggle «Показать, как мы подключаемся»; при открытии — всё воспроизведение запускается.

4. **Service cards (SERVICES массив):** `p-8 md:p-12` → `p-6 sm:p-8 md:p-12`; заголовок `text-[clamp(1.4rem,2.8vw,2rem)]` → `text-[clamp(1.2rem,5vw,2rem)]`.

5. **Trust numbers (TRUST_NUMBERS):** 3 счётчика — на мобиле `grid-cols-1` (по одному в строку) с уменьшенным `text-[clamp(2rem,10vw,4rem)]`. Spring-анимацию оставить, но с `damping: 30` для более плавного счёта.

6. **Integrations marquee:** если отображается горизонтальной лентой — применить те же правила, что к `TickerSection` (замедление, reduced-motion).

7. **Tegaki «Автоматизация»:** аналогично `CreativeTitle` — fallback на static `<h2>` при reduced-motion.

**Сложность:** высокая (много точечных правок + новый iPhoneShowcase).

---

### 2.11. `TeamSection.tsx`

**Проблемы:** `grid-cols-1 sm:grid-cols-3` — на мобиле 3 портрета в столбик = ~3 экрана; hover-effect (grayscale-0 + scale) не работает.

**Изменения:**
- `grid-cols-1 sm:grid-cols-3` → на мобиле **horizontal snap carousel**: 3 портрета `w-[75vw] aspect-[3/4] snap-center`, центрирование активного.
- `group-hover` → на touch заменить на «активная карточка в вьюпорте» (IntersectionObserver `threshold: 0.6`): grayscale-0 + accent-text у имени.
- `py-[140px]` → `py-[80px] sm:py-[100px] lg:py-[140px]`.
- `text-[22px]` имя → `text-[clamp(18px,5vw,22px)]`.
- `absolute left-3.5 right-3.5 bottom-3.5` — safe и так, но добавить `drop-shadow-md` для читаемости на любом фото.

**Сложность:** средняя (carousel + IntersectionObserver).

---

### 2.12. `Footer.tsx`

**Проблемы:** `minHeight: clamp(620px, 92vh, 900px)` на iPhone SE (667px) = 614px, занимает почти весь экран; `preload="auto"` на видеофоне тянет трафик; CTA `clamp(44px,7.5vw,128px)` на мобиле ~68px — тесно.

**Изменения:**
| Строка | Было | Станет |
|---|---|---|
| 53 | `minHeight: clamp(620px, 92vh, 900px)` | `minHeight: clamp(520px, 78svh, 900px)` (svh вместо vh — учёт addressbar iOS) |
| 56-70 | `<video autoPlay preload="auto">` | на мобиле (`isTouch`) — не рендерить `<video>`, оставить только `poster="/media/footer-bg.webp"` как `<img>` + gradient |
| 129 | `px-6 md:px-12 py-14 md:py-24` | `px-5 sm:px-6 md:px-12 py-12 sm:py-14 md:py-24` |
| 132 | `text-[clamp(44px,7.5vw,128px)]` | `text-[clamp(40px,11vw,128px)]` |
| 139 | `mt-10 md:mt-14 flex flex-col gap-4 md:gap-5` | `mt-8 sm:mt-10 md:mt-14 flex flex-col gap-4 md:gap-5` |

**`ContactLink` component:** на мобиле увеличить tap-target до min 44×44px (WCAG): `py-2` → `py-3`. Длинный email `aibromotion@yandex.com` — разрешить wrap: `break-all` для `value`.

**Sticky footer reveal pattern:** на мобиле (**при `useIsMobile()`**) отключить fixed-позиционирование футера и `margin-bottom` контента. Footer идёт обычным потоком после TeamSection. Причина: на iOS Safari fixed-reveal конфликтует с addressbar и ломает pull-to-refresh.

**Сложность:** средняя.

---

## 3. Медиа-оптимизация

### 3.1. Видео — dual-source

Для каждого видео в `public/media/`:
- `*-desktop.mp4` (текущий) — 1080p, CRF 18-20, до 8 MB.
- `*-mobile.mp4` (новый) — 540×960 / 960×540, CRF 24, 30fps max, до 1.5 MB.
- Использование:
  ```html
  <video autoPlay muted loop playsInline poster="/media/xxx.webp">
    <source src="/media/xxx-mobile.mp4" media="(max-width: 767px)" type="video/mp4"/>
    <source src="/media/xxx-desktop.mp4" type="video/mp4"/>
  </video>
  ```

**Приоритет конвертации (по ценности / размеру):**
1. `footer-reel.mp4` — фон футера.
2. `showreel-main.mp4` — hero showreel.
3. `automation-demo.mp4` — MacBook демо.
4. `gotovo.mp4` + 4 showreel-mini (`result.mp4`, `truck-holding.mp4`, `basket.mp4`, `spot-new.mp4`).

Команда (ffmpeg):
```bash
ffmpeg -i input.mp4 -vf "scale=540:-2" -c:v libx264 -crf 24 -preset slow \
  -r 30 -movflags +faststart -an output-mobile.mp4
```

### 3.2. Изображения — AVIF + WebP

- `hero.webp`, `footer-bg.webp`, `team-*.webp`, `service-*.webp` — добавить AVIF-версии через `<picture>`:
  ```html
  <picture>
    <source srcset="/media/hero.avif" type="image/avif"/>
    <source srcset="/media/hero.webp" type="image/webp"/>
    <img src="/media/hero.webp" alt="" loading="lazy"/>
  </picture>
  ```
- Responsive `srcset` для Hero-portrait: 480w / 960w / 1440w.

### 3.3. Fonts

- В `index.html:21` уже `display=swap` — ок.
- Добавить `preload` только для Inter Tight 800 (hero) — остальные грузятся по мере необходимости.
- Caveat Cyrillic (Tegaki) — локальный bundle, ок.

---

## 4. Фазы внедрения

Каждая фаза = отдельный коммит (или 2-3 коммита). Между фазами — ручное тестирование в Chrome DevTools Mobile emulation + реальный iPhone/Android.

### Фаза 0 — инфраструктура
**Цель:** заложить хуки и глобальные настройки, не меняя UI.

- [ ] `src/lib/useDevice.ts` — 3 хука.
- [ ] `index.html` → `viewport-fit=cover`.
- [ ] `index.css` — `@media (prefers-reduced-motion: reduce)` для `body::after`.
- [ ] `src/App.tsx` — условное оборачивание в Lenis.
- [ ] Smoke-тест: `npm run build`, `npx tsc --noEmit`, `npx vitest run`.

**Acceptance:** сайт выглядит идентично текущему на desktop; в DevTools console — хуки возвращают корректные значения при resize; `prefers-reduced-motion: reduce` отключает film-grain.

**Размер:** ~150 строк нового кода.

---

### Фаза 1 — Tailwind-only правки (quick wins)
**Цель:** за 1 проход починить очевидные layout-проблемы без новых компонентов.

- [ ] `Header.tsx` — padding, grid-gap, clamp на заголовок и цитату.
- [ ] `ManifestoSection.tsx` — py, gap, clamp, stats `grid-cols-2`.
- [ ] `ProcessSection.tsx` — py, grid `sm:grid-cols-2`, `min-h` ступени, outline-цифры clamp.
- [ ] `ServicesSection.tsx` **head-блок** — px, pt, gap (сам grid карточек — в Фазе 3).
- [ ] `ShowreelSection.tsx` — py, aspect-ratio, gap.
- [ ] `CreativeTitle.tsx` — fontSize clamp, subtitle max-w.
- [ ] `TeamSection.tsx` **head-блок** — py, text clamp.
- [ ] `Footer.tsx` — `minHeight svh`, px, py, CTA clamp, gap между ContactLink.
- [ ] `TickerSection.tsx` — clamp, `will-change`, медленнее на мобиле через CSS var.
- [ ] `AutomationSection.tsx` — padding/gap правки (без mockup-свапа).

**Acceptance:** на iPhone SE (375×667) и Galaxy S20 (360×800) — никаких horizontal scroll, все заголовки читаемые, никаких overlaps. Desktop — ноль регрессий (pixel-diff не показывает).

**Размер:** ~50 диффов в 10 файлах.

---

### Фаза 2 — мобильное меню + hover-to-tap
**Цель:** решить ключевые UX-провалы touch-девайсов.

- [ ] `src/components/nav/MobileNav.tsx` (новый) — бургер + drawer.
- [ ] `src/components/nav/DesktopNav.tsx` (вынесен из текущего `Nav.tsx`).
- [ ] `Nav.tsx` превращается в router: `isMobile ? MobileNav : DesktopNav`.
- [ ] `ServicesSection.tsx` — touch-fallback: на `isTouch` раскрываем accent-оверлей по tap (не hover), закрытие по tap вне карточки.
- [ ] `TeamSection.tsx` — IntersectionObserver на карточки: активная в viewport получает `grayscale-0`.
- [ ] `ShowreelSection.tsx` — для mini-video: poster-first, play on tap (если `isTouch`).
- [ ] Все `group-hover:` hover-only эффекты — завёрнуты в `@media (hover: hover)` где критично.

**Acceptance:** на touch-устройстве все интерактивы работают; a11y-проверка через `axe-core` — 0 ошибок; keyboard navigation в drawer (Tab/Esc).

**Размер:** ~400 строк нового кода.

---

### Фаза 3 — карусели (Services + Team + Showreel mini)
**Цель:** сократить длину мобильного скролла и добавить premium feel.

- [ ] `src/components/shared/SnapCarousel.tsx` (новый) — переиспользуемый горизонтальный snap-carousel с:
  - `IntersectionObserver` на slides (определение active).
  - `aria-*` атрибуты.
  - keyboard-navigation (стрелки).
  - индикатор (dots / numbered).
  - `scroll-behavior: smooth`.
- [ ] `src/components/services/ServicesCarousel.tsx` — использует SnapCarousel, рендерит 6 карточек.
- [ ] `src/components/services/ServicesHoverGrid.tsx` — выносим существующую логику из `ServicesSection.tsx`.
- [ ] `src/components/team/TeamCarousel.tsx` — 3 портрета.
- [ ] `ShowreelSection.tsx` — миники в carousel на мобиле, в grid на ≥md.
- [ ] `ServicesSection.tsx` + `TeamSection.tsx` — router-рендер.

**Acceptance:** снижение мобильной высоты страницы на ~40%; swipe работает на touch и wheel; indicator синхронизирован; a11y — `aria-current="true"` на активном slide.

**Размер:** ~600 строк нового кода.

---

### Фаза 4 — AutomationSection (MacBook → iPhone) + Footer rewrite
**Цель:** добить самые сложные точечные места.

- [ ] `src/components/automation/iPhoneShowcase.tsx` (новый) — portrait-mockup.
- [ ] `AutomationSection.tsx:496` — условный рендер.
- [ ] Terminal-блок — `<details>` toggle на мобиле.
- [ ] Trust numbers — `grid-cols-1 sm:grid-cols-3`, reduce counter-duration на слабых устройствах.
- [ ] `Footer.tsx` — убрать `<video>` на touch, poster-only; отключить sticky-reveal через условный класс на главном контейнере в `App.tsx`.
- [ ] Обновить CLAUDE.md: footer-reveal pattern работает **только на desktop**.

**Acceptance:** AutomationSection на 375px — читабельный, MacBook заменён на iPhone; Footer на iOS не конфликтует с addressbar.

**Размер:** ~350 строк нового кода + правки.

---

### Фаза 5 — медиа-оптимизация
**Цель:** снизить трафик на мобиле в 3-4 раза.

- [ ] Конвертировать 8 видео в `*-mobile.mp4` через ffmpeg (вручную, положить в `public/media/`).
- [ ] Во всех `<video>` добавить `<source media="(max-width: 767px)">`.
- [ ] Конвертировать ключевые webp → AVIF (hero, footer-bg, team-*, service-*).
- [ ] Заменить `<img>` на `<picture>` с AVIF-первым source.
- [ ] Добавить `preload` для Inter Tight 800.
- [ ] Проверить размеры через `npm run build` + анализ `dist/assets/`.

**Acceptance:**
- Network tab на Moto G4 profile: **< 3 MB** на первый экран.
- LCP < 2.5s (сейчас ~5s).
- Lighthouse Mobile Score ≥ 85 (Performance).

**Размер:** ~50 строк изменений + новые media-файлы.

---

### Фаза 6 — a11y, polish, regression
**Цель:** финальный проход по всем нюансам.

- [ ] `prefers-reduced-motion` для Tegaki (`CreativeTitle` + tegaki в `AutomationSection`) — static SVG/text fallback.
- [ ] `safe-area-inset-*` в Nav, Footer, MobileNav.
- [ ] Keyboard-only test: Tab через всю страницу, focus-visible стили.
- [ ] Screen-reader smoke-test (VoiceOver на Mac).
- [ ] Все interactive elements ≥44×44px.
- [ ] Lighthouse Mobile + Desktop: target ≥90 Performance, ≥95 A11y.
- [ ] Тестирование на реальных устройствах: iPhone 12, iPhone SE, Galaxy S20, iPad, iPad Pro.
- [ ] Обновить `CLAUDE.md`: добавить раздел «Mobile adaptation» с гайдами.

**Acceptance:** CI зелёный, Lighthouse в таргетах, manual QA-чеклист пройден.

---

## 5. Новые файлы (итого)

```
src/
├── lib/
│   └── useDevice.ts                       # Фаза 0 (новый)
└── components/
    ├── nav/
    │   ├── DesktopNav.tsx                 # Фаза 2 (вынесен)
    │   └── MobileNav.tsx                  # Фаза 2 (новый)
    ├── shared/
    │   └── SnapCarousel.tsx               # Фаза 3 (новый)
    ├── services/
    │   ├── ServicesCarousel.tsx           # Фаза 3 (новый)
    │   └── ServicesHoverGrid.tsx          # Фаза 3 (вынесен)
    ├── team/
    │   └── TeamCarousel.tsx               # Фаза 3 (новый)
    └── automation/
        └── iPhoneShowcase.tsx             # Фаза 4 (новый)

MOBILE_ADAPTATION_PLAN.md                  # этот файл
```

Всего **8 новых файлов**, **0 удалений** (существующий `Nav.tsx`, `ServicesSection.tsx`, `TeamSection.tsx` становятся роутерами).

---

## 6. Тестирование

### 6.1. Unit / integration (Vitest)
- `useDevice.ts` — тесты на match/mismatch media-queries через мок `matchMedia`.
- `SnapCarousel` — тест на keyboard navigation, active-state, aria.
- `MobileNav` — тест на открытие/закрытие, escape, backdrop-click.

### 6.2. Manual
Матрица устройств:
| Устройство | Ширина | Приоритет |
|---|---|---|
| iPhone SE 2020 | 375px | High — самый маленький современный |
| iPhone 12/13/14 | 390px | High |
| iPhone 15 Pro Max | 430px | Medium |
| Galaxy S20 | 360px | High — самый узкий Android |
| Pixel 7 | 412px | Medium |
| iPad portrait | 768px | Medium |
| iPad Pro landscape | 1024px | Low (попадает в desktop) |

Браузеры: Safari iOS, Chrome Android, Chrome/Firefox/Edge desktop responsive mode.

### 6.3. Performance
- **Lighthouse Mobile** (Moto G4 + Slow 4G): target ≥85 Performance.
- **WebPageTest.org** с конфигом `Moto G (gen 4)` — RealWorld benchmark.
- **Chrome DevTools Performance tab** — запись 10s скролла на мобиле, проверить нет long tasks >50ms.

---

## 7. Риски и митигации

| Риск | Вероятность | Митигация |
|---|---|---|
| `useSyncExternalStore` + `matchMedia` вызывает гидрационные бажки | Низкая (SPA без SSR) | В Vite без SSR не влияет; safety-check в initial value |
| Lenis off на touch ломает `scrollTo(#anchor)` в Nav | Средняя | На touch использовать native `element.scrollIntoView({behavior: 'smooth'})` |
| Native `scroll-snap-x` на iOS-Safari имеет glitches | Средняя | Добавить `-webkit-overflow-scrolling: touch`; fallback на manual snap через JS при детекции старой версии |
| Dual-source video не работает на старых браузерах | Низкая | Fallback — второй `<source>` без media-query (desktop mp4) |
| Свап MacBook → iPhone уменьшает «серьёзность» секции | Средняя | UX-review перед merge; возможно оставить MacBook с `transform: scale(0.85)` как альтернативу |
| Hover-to-tap на Services теряет «вау»-эффект при прокрутке | Низкая | Первая карточка открыта по дефолту; auto-close через 4s если пользователь не взаимодействовал |
| Размер bundle вырастает из-за дублирования (HoverGrid + Carousel) | Низкая | Оба используют общий `ServiceCard` presenter; разница только в обёртке — <5KB gzip |

---

## 8. Acceptance критерии для merge в `claude-design`

- [ ] Все 6 фаз закрыты.
- [ ] `npm run build` — зелёный.
- [ ] `npx tsc --noEmit` — 0 ошибок.
- [ ] `npm run lint` — 0 ошибок.
- [ ] `npx vitest run` — все тесты проходят.
- [ ] Lighthouse Mobile Performance ≥85, A11y ≥95.
- [ ] Manual QA на iPhone SE + Galaxy S20 — чеклист пройден (см. 6.2).
- [ ] Desktop — pixel-diff против `main` показывает только намеренные изменения.
- [ ] CLAUDE.md обновлён разделом «Mobile adaptation».
- [ ] PR-review пройден.

---

## 9. Последовательность работ (TL;DR)

1. **Сейчас:** review этого плана пользователем, согласование.
2. **Фаза 0** (инфраструктура) — низкий риск, разблокирует остальное.
3. **Фаза 1** (Tailwind quick wins) — видимый прогресс за 1 сессию.
4. **Фаза 2** (MobileNav + touch fallback) — решает главный UX-gap.
5. **Фаза 3** (карусели) — самая объёмная, но даёт самый заметный эффект.
6. **Фаза 4** (MacBook→iPhone + Footer) — точечные доводки.
7. **Фаза 5** (медиа) — финальная оптимизация, зависит от ffmpeg-конвертации (можно параллельно).
8. **Фаза 6** (polish + QA) — финал перед merge.

Между фазами — коммиты с conventional-prefix: `feat(mobile):`, `fix(mobile):`, `perf(mobile):`.

---

**Статус:** план готов, ожидает подтверждения пользователя перед началом Фазы 0.
