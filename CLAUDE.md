# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page landing for **AIBROMOTION** — an AI-powered motion/video production and automation company. Cinematic aesthetic with warm paper tones and dark footer reveal. Russian-language content.

Deployed on **Railway** (static site via Caddy) from `main` branch. GitHub repo: `elfuerte72/aibromotion_lando`. Development happens on `dev` branch (or feature branches like `claude-design`), merged into `main` for production.

## Commands

```bash
npm run dev          # Vite dev server (hot reload)
npm run build        # TypeScript check (tsc -b) + Vite production build
npx tsc --noEmit     # Type-check only (no emit)
npm run lint         # ESLint (flat config)
npm run preview      # Preview production build
npx vitest           # Run tests (jsdom, setup in src/test-setup.ts)
npx vitest run       # Run all tests once (CI mode)
```

## Stack

- React 19 + TypeScript (strict mode, `noUnusedLocals`, `noUnusedParameters`, target ES2023)
- Vite 8 with `@tailwindcss/vite` plugin
- Tailwind CSS v4 (config in `src/index.css` via `@theme`, NOT `tailwind.config.ts`)
- Framer Motion 12 for scroll animations (`useScroll`, `useTransform`, `useInView`, `useVelocity`)
- Lenis for smooth scrolling (wraps entire app via `<ReactLenis root>`, lerp 0.1, duration 1.2). **Disabled on touch and `prefers-reduced-motion`** — see `src/App.tsx` `ScrollContainer`
- Tegaki for handwriting animations (`TegakiRenderer` from `tegaki/react`, custom Caveat Cyrillic font bundle in `src/fonts/caveat-cyrillic/`)
- shadcn/ui (new-york style, `components.json` configured, `@/components/ui/` path)
- Path alias: `@/` → `./src/`
- Utility: `cn()` helper in `src/lib/utils.ts` (clsx + tailwind-merge)

## Architecture

**Footer background plate:**
- Desktop: background `<video>` (footer-reel.mp4) with parallax scale driven by `useScroll`
- Touch (phones, tablets, or `prefers-reduced-motion`): poster-only (`footer-bg.webp`) — no `<video>` is mounted. See `useIsTouch` gate in `src/components/Footer.tsx`

**Page flow (top to bottom):**
`Nav` (fixed top, SPB live clock) → `Header` (hero title + portrait) → `TickerSection` (marquee) → `ManifestoSection` → `ServicesSection` → `ProcessSection` ([06] Method) → `CreativeTitle` (tegaki "Креатив") → `ShowreelSection` ([02] Showreel) → `AutomationSection` (tegaki "Автоматизация", service cards, process steps, trust numbers, integrations terminal) → `StackSection` → `TeamSection` → `StatsSection` → `ContactSection`

**Tegaki handwriting animation pattern:**
Used for section titles ("Креатив", "Маркетинг", "Автоматизация"). Each uses `TegakiRenderer` with `font={caveatCyrillic}`, `useInView` trigger, accent color, and consistent effects (`pressureWidth: 0.6`, taper start/end). Time toggles between `controlled` (paused) and `uncontrolled` (speed 1, delay 0.2) based on viewport visibility.

**Scroll animation system:**
- `ScrollReveal` — wrapper with 6 variants: `fade-up`, `fade`, `clip-reveal`, `scale`, `slide-left`, `slide-right`. Uses `useInView` with `once: true`
- `StatementBlock` / `NewsletterCTA` — word-by-word opacity reveal tied to `scrollYProgress`
- `MediaCell` — parallax depth via `useTransform` on y and scale
- `LogoMarquee` — velocity-based skew effect via `useVelocity` + `useSpring`
- Film grain overlay applied globally via `body::after` CSS pseudo-element

**Design tokens** (defined in `src/index.css` `@theme`)
- Fonts: `--font-heading` / `--font-body` (Inter Tight), `--font-serif` (Fraunces), `--font-mono` (JetBrains Mono)
- Key colors: `--color-paper` (#EFEAE0), `--color-ink` (#0E0E0C), `--color-accent` (#FF4A1C), `--color-muted` (#6F6A60)
- Surfaces: `--color-paper-2` (#E6DFD1), `--color-ink-2` (#1C1C1A)

## Media

All static media lives in `public/media/`. Videos are `.mp4` (H.264, CRF 18), images are `.png`/`.jpg`. Referenced via absolute paths like `/media/hero.png`. Logo SVGs in `public/logos/`.

**Mobile dual-source convention:**
- Every `foo.mp4` has a sibling `foo-mobile.mp4` (scaled to 768px, CRF 28, no audio)
- Every key `*.webp` has a matching `*.avif` (libsvtav1, CRF 40)
- `<video>` uses two `<source>` tags with `media="(max-width: 767px)"` to serve the mobile variant on phones
- `<img>` wrapped in `<picture>` with an AVIF `<source>` above the WebP fallback
- Helpers: `toMobileVideo(src)` / `toAvif(src)` in `src/lib/media.ts` derive paths programmatically
- To regenerate: `ffmpeg -i foo.mp4 -vf scale=768:-2 -c:v libx264 -crf 28 -an foo-mobile.mp4` / `ffmpeg -i foo.webp -c:v libsvtav1 -crf 40 -frames:v 1 foo.avif`

**Important:** Do not use Git LFS — Railway does not reliably pull LFS files during build. Keep all media files under 100 MB (GitHub hard limit). Source `.mov` originals are excluded via `.gitignore`.

## Mobile adaptation

The landing was originally desktop-first; mobile adaptation is "Editorial + Swipe Deck" — kept the cinematic long-scroll but swapped hover-heavy grids for horizontal snap carousels.

**Device detection (`src/lib/useDevice.ts`):**
- `useIsMobile()` — viewport `<768px`, SSR-safe via `useSyncExternalStore` + `matchMedia`
- `useIsTouch()` — `(pointer: coarse)` — true on phones *and* tablets
- `useReducedMotion()` — `(prefers-reduced-motion: reduce)` — re-exported for consistency

**Adaptive components (router pattern `{isMobile ? <Carousel/> : <Grid/>}`):**
- `ServicesSection` → `ServicesCarousel` (mobile) / `ServicesHoverGrid` (desktop)
- `TeamSection` → `TeamCarousel` (mobile) / 3-col hover grid (desktop)
- `ShowreelSection` mini thumbs → `SnapCarousel` (mobile) / grid (desktop)
- `AutomationSection` hero mockup → `IPhoneShowcase` (mobile) / `MacBookShowcase` (desktop)

**Shared carousel (`src/components/shared/SnapCarousel.tsx`):**
CSS scroll-snap (`snap-x snap-mandatory`) + IntersectionObserver with threshold `[0, 0.25, 0.5, 0.75, 1]` to track the active slide. Exposes `isActive` to render callbacks — used to pause off-screen videos (battery + decode cost). Keyboard: `ArrowLeft/Right/Home/End`. Indicator: `role="tablist"` with `role="tab"` buttons.

**Nav drawer (`src/components/nav/MobileNav.tsx`):**
Full-screen drawer behind a burger, body-scroll locked via `overflow: hidden` on `<body>` (Lenis is off on touch). Esc closes. `env(safe-area-inset-*)` applied to top bar and drawer.

**Lenis + reduced-motion gates (`src/App.tsx`):**
Lenis only wraps the app when `!isTouch && !prefersReducedMotion`. Anchor scroll falls back to `scrollIntoView({ behavior: 'smooth' })`.

**Tegaki reduced-motion fallback:**
`CreativeTitle` and `AutomationTitle` render a static `<h2>` in the same size/colour instead of the handwriting animation when `prefers-reduced-motion: reduce`.

**Mobile-only optimizations:**
- `Footer` serves poster-only (`footer-bg.avif/webp`) instead of a `<video>` on touch — saves ~4MB cellular + continuous decode
- `Services`/`Showreel` carousels play **only** the active slide's video; the others are paused and rewound
- `<details>` disclosure wraps the integrations terminal in `AutomationSection` on mobile to keep the section scannable

## Conventions

- Components are functional, one per file in `src/components/`
- No routing — single-page app with scroll-based sections
- Animations use compositor-friendly properties only (transform, opacity) for 60fps
- Easing curve: `[0.2, 0.85, 0.15, 1]` (custom cubic-bezier used across all scroll reveals)
- Color scheme forced to light via `<html class="light">`
- Tests use jsdom with mocked `IntersectionObserver` (see `src/test-setup.ts`)
- ESLint uses flat config (v9+) with TypeScript-ESLint and React Hooks/Refresh plugins
- Vite allows `*.ngrok-free.dev` hosts for HTTPS local development
