# Architecture: Component-Based (Flat Layered)

## Overview
A simple, flat component-based architecture optimized for a single-page static landing page. Each visual section of the page is a self-contained React component. There is no backend, no routing, no state management library — just composable UI components rendered in a single `App.tsx`.

This architecture was chosen because the project is a static marketing page with no business logic, no data persistence, and no multi-page navigation. Adding layers beyond "components + assets + config" would be unnecessary overhead.

## Decision Rationale
- **Project type:** Static single-page landing page
- **Tech stack:** React 18+ / TypeScript / Vite / Tailwind CSS v4 / shadcn/ui
- **Key factor:** Minimal complexity — no backend, no state, no routing. A flat component tree is the simplest correct structure.

## Folder Structure
```
src/
├── components/              # All React components
│   ├── ui/                  # shadcn/ui primitives (Button, Card, Badge, etc.)
│   ├── icons/               # SVG icon components
│   ├── illustrations/       # SVG illustration components (mascot, graphs, decorative)
│   ├── Header.tsx           # Navigation header with CTA
│   ├── Hero.tsx             # Hero section with mascot + headline
│   ├── ServicesGrid.tsx     # 6-card services grid
│   ├── ServiceCard.tsx      # Individual service card
│   ├── ClientLogos.tsx      # Trust bar with partner logos
│   ├── Results.tsx          # Cartoon-style growth graphs
│   ├── FinalCTA.tsx         # High-intent CTA section
│   └── Footer.tsx           # Footer with links
├── hooks/                   # Custom hooks (useIntersectionObserver, useScrollAnimation)
├── lib/                     # Utilities (cn helper, constants)
│   └── utils.ts             # Tailwind cn() merge utility
├── assets/                  # Static assets (SVGs, images if any)
├── App.tsx                  # Root component — assembles all sections
├── main.tsx                 # Entry point — renders App
└── index.css                # Global styles, Tailwind directives, custom keyframes
```

## Dependency Rules

- ✅ `App.tsx` → imports section components (Header, Hero, ServicesGrid, etc.)
- ✅ Section components → import from `components/ui/`, `components/icons/`, `components/illustrations/`
- ✅ Section components → import from `hooks/` and `lib/`
- ✅ `components/ui/` → import from `lib/utils.ts` only
- ❌ `components/ui/` must NOT import section components (no circular deps)
- ❌ `components/icons/` and `components/illustrations/` must NOT import other components
- ❌ No component should import from `main.tsx` or `App.tsx`

## Layer/Module Communication
- **Top-down composition:** `App.tsx` renders sections in order, passing no props (each section is self-contained)
- **Shared primitives:** All components use shadcn/ui primitives from `components/ui/`
- **No global state:** No Redux, Zustand, or Context. Each component owns its own animation/interaction state via local `useState`/`useRef`
- **Custom hooks:** Shared behavior (scroll animations, intersection observers) extracted into `hooks/`

## Key Principles
1. **Each section = one file.** Header, Hero, ServicesGrid, etc. are standalone components. No splitting a section across multiple files unless a sub-component (like ServiceCard) is clearly reusable.
2. **SVG illustrations as React components.** All cartoony illustrations and icons live in `components/illustrations/` and `components/icons/` as `.tsx` files — not as imported image files. This enables Tailwind styling, animation, and color theming via props.
3. **Tailwind-first styling.** No CSS modules, no styled-components. All styling via Tailwind utility classes. Custom animations defined as `@keyframes` in `index.css` and referenced via Tailwind's `animate-*` utilities.
4. **Mobile-first responsive.** Default styles target mobile. Use `md:` and `lg:` breakpoints to enhance for larger screens.
5. **shadcn/ui for interactive primitives only.** Use Button, Card, Badge from shadcn/ui. Do NOT use shadcn/ui for layout or section structure.

## Code Examples

### Section component pattern
```tsx
// src/components/Hero.tsx
import { Button } from "@/components/ui/button";
import { RobotMascot } from "@/components/illustrations/RobotMascot";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 md:py-32">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 md:flex-row">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Business Packaging.{" "}
            <span className="text-purple-600">Massive Growth via AI.</span>
          </h1>
          <p className="text-lg text-gray-600 md:text-xl">
            We transform companies with marketing, AI agents, and high-converting sites.
          </p>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            Talk to an Expert
          </Button>
        </div>
        <div className="flex-1">
          <RobotMascot className="w-full max-w-md" />
        </div>
      </div>
    </section>
  );
}
```

### SVG illustration as React component
```tsx
// src/components/illustrations/RobotMascot.tsx
interface RobotMascotProps {
  className?: string;
}

export function RobotMascot({ className }: RobotMascotProps) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
      {/* SVG paths for the robot mascot */}
    </svg>
  );
}
```

### Custom scroll animation hook
```tsx
// src/hooks/useScrollAnimation.ts
import { useEffect, useRef, useState } from "react";

export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
```

## Anti-Patterns
- ❌ **No routing library.** This is a single page — do not add react-router.
- ❌ **No state management library.** No Redux, Zustand, Jotai. Local state only.
- ❌ **No CSS-in-JS.** Use Tailwind exclusively. No styled-components or emotion.
- ❌ **No image files for illustrations.** Use inline SVG components, not PNG/JPG imports.
- ❌ **No over-abstraction.** Do not create a generic `Section` wrapper component. Each section has unique layout — keep them explicit.
- ❌ **No API calls.** This is a static page. No fetch, no SWR, no React Query.
