# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page landing for **AIBROMOTION** — an AI-powered motion/video production company. Cinematic aesthetic with white main content and dark footer reveal. Russian-language content with English UI labels.

Deployed on **Railway** (static site via Caddy) from `main` branch. GitHub repo: `elfuerte72/aibromotion_lando`. Development happens on `dev` branch, merged into `main` for production.

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
- shadcn/ui (new-york style, `components.json` configured, `@/components/ui/` path)
- Path alias: `@/` → `./src/`
- Utility: `cn()` helper in `src/lib/utils.ts` (clsx + tailwind-merge)

## Architecture

**Layout pattern — "sticky footer reveal":**
- `Footer` is `position: fixed; bottom: 0; z-index: 0` with `--footer-h` (600px mobile / 560px desktop)
- Main content sits on top (`z-index: 1`) with `margin-bottom: var(--footer-h)` and `box-shadow`
- As user scrolls past main content, footer is revealed underneath

**Page flow (top to bottom):**
`Nav` (fixed top) → `Header` (per-letter rainbow logo + stats grid + quote) → `HeroSection` (3-column brief→AI→result animation) → `ProductGrid` (storytelling scroll — one content piece per section, alternating full-width video overlays and portrait video + text grids) → `NewsletterCTA` (quote + parallax video) → `MarketingSection` (stacked cards with handwriting animation) → `AutomationSection` (white bg, word-by-word headline, service cards 2×2, process steps, trust numbers, integrations terminal, CTA) → `Footer` (background image + contacts)

**Scroll animation system:**
- `ScrollReveal` — wrapper component with 6 variants: `fade-up`, `fade`, `clip-reveal`, `scale`, `slide-left`, `slide-right`. Uses `useInView` with `once: true`
- `StatementBlock` / `NewsletterCTA` — word-by-word opacity reveal tied to `scrollYProgress`
- `MediaCell` — parallax depth via `useTransform` on y and scale
- `LogoMarquee` — velocity-based skew effect via `useVelocity` + `useSpring`
- `AutomationSection` — word-by-word headline reveal, alternating slide-in service cards, clip-path process steps with connecting line, scale-in trust numbers with parallax, terminal typing effect for integrations
- Film grain overlay applied globally via `body::after` CSS pseudo-element

**Design tokens** (defined in `src/index.css` `@theme`)
- Fonts: `--font-heading` (Rubik), `--font-body` (Fragment Mono), `--font-logo` (Rubik Bubbles), `--font-script` (Caveat)
- Key colors: `--color-dark` (#252525), `--color-salmon` (#e8a898), `--color-navy` (#1a2664)
- Extended palette: `--color-dark-alt`, `--color-beige`, `--color-burgundy`, `--color-olive`, `--color-cream`, `--color-light-gray`, `--color-light-cream`, `--color-dark-beige`

## Media

All static media lives in `public/media/`. Videos are `.mp4` (H.264, CRF 18), images are `.png`/`.jpg`. Referenced via absolute paths like `/media/hero.png`. Logo SVGs in `public/logos/`.

**Important:** Do not use Git LFS — Railway does not reliably pull LFS files during build. Keep all media files under 100 MB (GitHub hard limit). Source `.mov` originals are excluded via `.gitignore`.

## Conventions

- Components are functional, one per file in `src/components/`
- No routing — single-page app with scroll-based sections
- Animations use compositor-friendly properties only (transform, opacity) for 60fps
- Easing curve: `[0.16, 1, 0.3, 1]` (custom cubic-bezier used across all scroll reveals)
- Color scheme forced to light via `<html class="light">`
- Tests use jsdom with mocked `IntersectionObserver` (see `src/test-setup.ts`)
- ESLint uses flat config (v9+) with TypeScript-ESLint and React Hooks/Refresh plugins
- Vite allows `*.ngrok-free.dev` hosts for HTTPS local development
