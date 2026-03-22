# AGENTS.md

> Project map for AI agents. Keep this file up-to-date as the project evolves.

## Project Overview
Single-page static landing page for "aibromotion" — a premium business packaging and AI agency. Built with React + Tailwind CSS + shadcn/ui.

## Tech Stack
- **Language:** TypeScript
- **Framework:** React 18+ (Vite)
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Build Tool:** Vite

## Project Structure
```
landos/
├── .ai-factory/
│   └── DESCRIPTION.md          # Project specification and tech stack
├── AGENTS.md                    # This file — project structure map
├── src/
│   ├── components/              # React components
│   │   ├── Header.tsx           # Navigation header
│   │   ├── Hero.tsx             # Hero section with mascot
│   │   ├── ServicesGrid.tsx     # 6-card services grid
│   │   ├── ClientLogos.tsx      # Trust bar
│   │   ├── Results.tsx          # Cartoon graphs section
│   │   ├── FinalCTA.tsx         # High-intent CTA section
│   │   └── Footer.tsx           # Footer
│   ├── assets/                  # SVG illustrations, icons
│   ├── App.tsx                  # Main app component
│   └── main.tsx                 # Entry point
├── public/                      # Static assets
├── index.html                   # HTML entry
├── package.json                 # Dependencies
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript config
└── vite.config.ts               # Vite config
```

## AI Context Files
| File | Purpose |
|------|---------|
| AGENTS.md | This file — project structure map |
| .ai-factory/DESCRIPTION.md | Project specification and tech stack |
| .ai-factory/ARCHITECTURE.md | Architecture decisions and guidelines |
