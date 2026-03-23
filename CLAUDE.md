# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page landing for **AIBROMOTION** — an AI-powered motion/video production company. Dark cinematic aesthetic. Russian-language content with English UI labels.

## Commands

```bash
npm run dev          # Vite dev server (hot reload)
npm run build        # TypeScript check + Vite production build
npx tsc --noEmit     # Type-check only (no emit)
npm run lint         # ESLint
npm run preview      # Preview production build
npx vitest           # Run tests (jsdom, setup in src/test-setup.ts)
```

## Stack

- React 19 + TypeScript (strict mode, `noUnusedLocals`, `noUnusedParameters`)
- Vite 8 with `@tailwindcss/vite` plugin
- Tailwind CSS v4 (config in `src/index.css` via `@theme`, NOT `tailwind.config.ts`)
- Framer Motion 12 for scroll animations (`useScroll`, `useTransform`, `useInView`, `useVelocity`)
- Lenis for smooth scrolling (wraps entire app via `<ReactLenis root>`)
- shadcn/ui (new-york style, `components.json` configured, `@/components/ui/` path)
- Path alias: `@/` → `./src/`

## Architecture

**Layout pattern — "sticky footer reveal":**
- `Footer` is `position: fixed; bottom: 0; z-index: 0` with `--footer-h` (600px mobile / 560px desktop)
- Main content sits on top (`z-index: 1`) with `margin-bottom: var(--footer-h)` and `box-shadow`
- As user scrolls past main content, footer is revealed underneath

**Page flow (top to bottom):**
`Nav` (fixed top) → `Header` (logo + tagline) → `HeroSection` (3-column brief→AI→result animation) → `ProductGrid` (2-col media grid with `StatementBlock` text reveals) → `NewsletterCTA` (quote + parallax video) → `Footer` (background image + contacts)

**Scroll animation system:**
- `ScrollReveal` — wrapper component with 4 variants: `fade-up`, `fade`, `clip-reveal`, `scale`. Uses `useInView` with `once: true`
- `StatementBlock` / `NewsletterCTA` — word-by-word opacity reveal tied to `scrollYProgress`
- `MediaCell` — parallax depth via `useTransform` on y and scale
- `LogoMarquee` — velocity-based skew effect via `useVelocity` + `useSpring`
- Film grain overlay applied globally via `body::after` CSS pseudo-element

**Design tokens** (defined in `src/index.css` `@theme`)
- Fonts: `--font-heading` (Rubik), `--font-body` (Fragment Mono), `--font-logo` (Rubik Bubbles)
- Key colors: `--color-dark` (#252525), `--color-salmon` (#e8a898), `--color-navy` (#1a2664)

## Media

All static media lives in `public/media/` (videos as `.mov`, images as `.png`/`.jpg`). Referenced via absolute paths like `/media/hero.png`.

## Conventions

- Components are functional, one per file in `src/components/`
- No routing — single-page app with scroll-based sections
- Animations use compositor-friendly properties only (transform, opacity) for 60fps
- Easing curve: `[0.16, 1, 0.3, 1]` (custom cubic-bezier used across all scroll reveals)
