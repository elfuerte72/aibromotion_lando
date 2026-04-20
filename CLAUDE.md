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
- Lenis for smooth scrolling (wraps entire app via `<ReactLenis root>`, lerp 0.1, duration 1.2)
- Tegaki for handwriting animations (`TegakiRenderer` from `tegaki/react`, custom Caveat Cyrillic font bundle in `src/fonts/caveat-cyrillic/`)
- shadcn/ui (new-york style, `components.json` configured, `@/components/ui/` path)
- Path alias: `@/` → `./src/`
- Utility: `cn()` helper in `src/lib/utils.ts` (clsx + tailwind-merge)

## Architecture

**Layout pattern — "sticky footer reveal":**
- `Footer` is `position: fixed; bottom: 0; z-index: 0` with `--footer-h` (600px mobile / 560px desktop)
- Main content sits on top (`z-index: 1`) with `margin-bottom: var(--footer-h)` and `box-shadow`
- As user scrolls past main content, footer is revealed underneath

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

**Important:** Do not use Git LFS — Railway does not reliably pull LFS files during build. Keep all media files under 100 MB (GitHub hard limit). Source `.mov` originals are excluded via `.gitignore`.

## Conventions

- Components are functional, one per file in `src/components/`
- No routing — single-page app with scroll-based sections
- Animations use compositor-friendly properties only (transform, opacity) for 60fps
- Easing curve: `[0.2, 0.85, 0.15, 1]` (custom cubic-bezier used across all scroll reveals)
- Color scheme forced to light via `<html class="light">`
- Tests use jsdom with mocked `IntersectionObserver` (see `src/test-setup.ts`)
- ESLint uses flat config (v9+) with TypeScript-ESLint and React Hooks/Refresh plugins
- Vite allows `*.ngrok-free.dev` hosts for HTTPS local development
