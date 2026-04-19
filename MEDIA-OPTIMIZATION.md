# Оптимизация медиа-контента AIBROMOTION

> Текущий вес `public/media/`: **312 MB**  
> Ожидаемый после оптимизации: **~46 MB** (при полной прокрутке), **~8-10 MB** при первом экране (с lazy loading)

---

## 1. Неиспользуемые файлы — удалить

Эти файлы лежат в `public/media/`, но нигде не подключены в коде (только в комментариях).

| Файл | Размер | Примечание |
|---|---|---|
| `Макс.png` | 15 MB | Не импортирован |
| `Тема.png` | 15 MB | Не импортирован |
| `Тоха.png` | 14 MB | Не импортирован |
| `Ускоренная версия .mov` | 39 MB | Не импортирован, .mov в .gitignore |
| `ready.mp4` | 14 MB | Только в комментарии ProductGrid |
| `robot.mp4` | 13 MB | Только в комментарии ProductGrid |
| `hero.png` | 2.4 MB | Только в комментарии ProductGrid |
| `gemini.png` | 2.6 MB | Не импортирован |
| `2026-03-28 20.40.14.jpg` | 27 KB | Не импортирован |

**Итого: ~115 MB мёртвого веса.**

Если файлы нужны для будущих секций — перенести в отдельную папку вне `public/` (например `assets-source/`), чтобы они не попадали в билд.

---

## 2. Изображения — конвертация в WebP + ресайз

### Установка инструментов

```bash
brew install webp imagemagick
```

### Используемые изображения

| Файл | Текущий | Разрешение | Где используется | Целевой размер |
|---|---|---|---|---|
| `0c13e9...png` | 8.6 MB | 5504x3072 | MarketingSection | 1600x893 |
| `cdd847...png` | 7.1 MB | 5504x3072 | MarketingSection | 1600x893 |
| `964c5d...png` | 6.5 MB | 5504x3072 | MarketingSection | 1600x893 |
| `Валли 1.png` | 3.1 MB | 2212x1234 | MarketingSection | 1600x893 |
| `Two Men.jpeg` | 1.1 MB | 5504x3072 | MarketingSection | 1600x893 |
| `footer-bg.jpg` | 420 KB | 1920x1071 | Footer | 1920x1071 (оставить) |

### Команды конвертации

```bash
cd public/media

# AI-сгенерированные PNG (5504x3072 → 1600px по ширине)
cwebp -q 85 -resize 1600 0 \
  "0c13e9670a4ad31341ced75d22fc0aab_9ccd4ab1_ce0e_476b_b655_d2498ef3674d.png" \
  -o "0c13e9670a4ad31341ced75d22fc0aab_9ccd4ab1_ce0e_476b_b655_d2498ef3674d.webp"

cwebp -q 85 -resize 1600 0 \
  "cdd847e9817c8fd18eac9ff176d4f849_25093256_5f0f_4b21_b93a_ec120e75d2a9.png" \
  -o "cdd847e9817c8fd18eac9ff176d4f849_25093256_5f0f_4b21_b93a_ec120e75d2a9.webp"

cwebp -q 85 -resize 1600 0 \
  "964c5da6e66e6d71869cbc6c4bb2b0fd_6e6167af_87f0_4657_bdb1_31baef96928d.png" \
  -o "964c5da6e66e6d71869cbc6c4bb2b0fd_6e6167af_87f0_4657_bdb1_31baef96928d.webp"

cwebp -q 85 -resize 1600 0 "Валли 1.png" -o "Валли 1.webp"

# JPEG → WebP (ресайз до 1600px)
cwebp -q 85 -resize 1600 0 "Two Men.jpeg" -o "Two Men.webp"

# Footer background (оставить 1920px, только конвертировать)
cwebp -q 82 footer-bg.jpg -o footer-bg.webp
```

### Ожидаемый результат

| Файл | Было | Станет (примерно) |
|---|---|---|
| `0c13e9...` | 8.6 MB | ~150-250 KB |
| `cdd847...` | 7.1 MB | ~120-200 KB |
| `964c5d...` | 6.5 MB | ~100-180 KB |
| `Валли 1` | 3.1 MB | ~80-150 KB |
| `Two Men` | 1.1 MB | ~80-120 KB |
| `footer-bg` | 420 KB | ~60-100 KB |
| **Итого** | **~27 MB** | **~0.6-1 MB** |

После конвертации — удалить исходные PNG/JPG и обновить пути в коде (`.png` → `.webp`, `.jpeg` → `.webp`).

---

## 3. Видео — пережатие без потери качества

### Установка

```bash
brew install ffmpeg
```

### Используемые видео

| Файл | Размер | Разрешение | Bitrate | Длит. | Где используется |
|---|---|---|---|---|---|
| `truck.mp4` | 63 MB | 1920x1080 | 9.3 Mbps | 57s | NewsletterCTA |
| `timeline3.mp4` | 34 MB | 1080x1920 | 7.0 Mbps | 41s | ProductGrid (portrait) |
| `heroes.mp4` | 21 MB | 1080x1920 | 6.6 Mbps | 26s | ProductGrid (portrait) |
| `basket.mp4` | 17 MB | 1920x1080 | 7.1 Mbps | 20s | ProductGrid (fullwidth) |
| `result.mp4` | 9.7 MB | 1080x1920 | 8.3 Mbps | 10s | ProductGrid (portrait) |
| `automation-demo.mp4` | 9.6 MB | 1920x1080 | 5.6 Mbps | 14s | AutomationSection |
| `done.mp4` | 7.8 MB | 1920x1080 | 5.3 Mbps | 12s | ProductGrid (fullwidth) |
| `timeline.mp4` | 7.3 MB | 1920x1080 | 3.3 Mbps | 19s | ProductGrid (fullwidth) |

### Команды пережатия

**Landscape-видео (1920x1080):**

```bash
cd public/media

# CRF 23 — визуально неотличим от CRF 18, но в 3-5x легче
# -an — удаляет аудиодорожку (видео muted на сайте)
# -movflags +faststart — мгновенный старт воспроизведения

ffmpeg -i truck.mp4 -c:v libx264 -crf 23 -preset slow \
  -movflags +faststart -an truck-opt.mp4

ffmpeg -i basket.mp4 -c:v libx264 -crf 23 -preset slow \
  -movflags +faststart -an basket-opt.mp4

ffmpeg -i automation-demo.mp4 -c:v libx264 -crf 23 -preset slow \
  -movflags +faststart -an automation-demo-opt.mp4

ffmpeg -i done.mp4 -c:v libx264 -crf 23 -preset slow \
  -movflags +faststart -an done-opt.mp4

ffmpeg -i timeline.mp4 -c:v libx264 -crf 23 -preset slow \
  -movflags +faststart -an timeline-opt.mp4
```

**Portrait-видео (1080x1920 → 720x1280):**

Портретные видео показываются в колонке ~600px. Разрешение 720x1280 достаточно даже для retina.

```bash
ffmpeg -i heroes.mp4 -c:v libx264 -crf 23 -preset slow \
  -vf scale=720:1280 -movflags +faststart -an heroes-opt.mp4

ffmpeg -i result.mp4 -c:v libx264 -crf 23 -preset slow \
  -vf scale=720:1280 -movflags +faststart -an result-opt.mp4

ffmpeg -i timeline3.mp4 -c:v libx264 -crf 23 -preset slow \
  -vf scale=720:1280 -movflags +faststart -an timeline3-opt.mp4
```

### Ожидаемый результат

| Файл | Было | Станет (примерно) |
|---|---|---|
| `truck.mp4` | 63 MB | ~12-15 MB |
| `timeline3.mp4` | 34 MB | ~6-8 MB |
| `heroes.mp4` | 21 MB | ~4-5 MB |
| `basket.mp4` | 17 MB | ~4-5 MB |
| `result.mp4` | 9.7 MB | ~2-3 MB |
| `automation-demo.mp4` | 9.6 MB | ~3-4 MB |
| `done.mp4` | 7.8 MB | ~2-3 MB |
| `timeline.mp4` | 7.3 MB | ~3-4 MB |
| **Итого** | **~170 MB** | **~36-47 MB** |

После проверки качества — заменить оригиналы оптимизированными (переименовать `*-opt.mp4` → `*.mp4`).

---

## 4. Poster-кадры для видео

Пока видео грузится, пользователь видит чёрный прямоугольник. Poster-кадры решают это.

```bash
cd public/media

# Генерация первого кадра каждого видео в WebP
for f in truck basket heroes result timeline3 timeline done automation-demo; do
  ffmpeg -i "${f}.mp4" -vframes 1 -q:v 5 "${f}-poster.webp"
done
```

После генерации — добавить атрибут `poster` на каждый `<video>`:

```tsx
<video
  src="/media/truck.mp4"
  poster="/media/truck-poster.webp"  // ← добавить
  autoPlay loop muted playsInline
/>
```

**Файлы для обновления:**
- `src/components/ProductGrid.tsx` — 6 видео (heroes, basket, result, done, timeline3, timeline)
- `src/components/NewsletterCTA.tsx` — 1 видео (truck)
- `src/components/AutomationSection.tsx` — 1 видео (automation-demo)

---

## 5. Lazy loading видео

Сейчас все 8 видео имеют `autoPlay` и начинают буферизироваться при загрузке страницы. Нужно загружать видео только при приближении к viewport.

### Подход: `preload="none"` + IntersectionObserver

Создать хук или обёртку:

```tsx
// Концепт — создать компонент LazyVideo
function LazyVideo({ src, poster, ...props }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { rootMargin: "200px" } // начать загрузку за 200px до появления
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={isVisible ? src : undefined}
      poster={poster}
      preload="none"
      autoPlay loop muted playsInline
      {...props}
    />
  );
}
```

**Файлы для обновления:**
- `src/components/ProductGrid.tsx` — `ParallaxVideo` и `FullVideoSection`
- `src/components/NewsletterCTA.tsx`
- `src/components/AutomationSection.tsx`

---

## 6. Адаптивные изображения (`<picture>` + srcset)

Для MarketingSection подготовить 2 размера каждого изображения:

```bash
# Мобильная версия (800px)
cwebp -q 80 -resize 800 0 "image.png" -o "image-sm.webp"

# Десктопная версия (1600px)
cwebp -q 85 -resize 1600 0 "image.png" -o "image.webp"
```

В коде использовать `<picture>`:

```tsx
<picture>
  <source media="(max-width: 768px)" srcSet="/media/image-sm.webp" />
  <source srcSet="/media/image.webp" />
  <img src="/media/image.webp" loading="lazy" alt="..." />
</picture>
```

---

## 7. Кеширование на Railway (Caddy)

В `Caddyfile` добавить заголовки кеширования для статики:

```caddy
:80 {
    root * /srv
    file_server

    # Медиа-файлы — долгий кеш
    @media path /media/* /logos/*
    header @media Cache-Control "public, max-age=2592000, immutable"

    # JS/CSS с хешами — максимальный кеш
    @hashed path_regexp \.\w{8}\.(js|css)$
    header @hashed Cache-Control "public, max-age=31536000, immutable"
}
```

---

## 8. Чеклист

- [ ] Удалить неиспользуемые файлы (~115 MB)
- [ ] Конвертировать изображения PNG/JPG → WebP с ресайзом
- [ ] Обновить пути к изображениям в коде (`.png`/`.jpeg` → `.webp`)
- [ ] Пережать видео (CRF 23, -an, faststart)
- [ ] Уменьшить портретные видео до 720x1280
- [ ] Заменить оригиналы оптимизированными видео
- [ ] Сгенерировать poster-кадры и добавить в `<video>`
- [ ] Реализовать lazy loading для видео
- [ ] Подготовить адаптивные размеры изображений (опционально)
- [ ] Настроить Cache-Control в Caddyfile
- [ ] Убрать комментарии с упоминанием удалённых файлов (ProductGrid.tsx:8-9)
