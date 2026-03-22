# Project: aibromotion Landing Page

## Overview
A single-page static landing page for "aibromotion" — a premium business packaging and AI agency. The design follows a bold, playful, "cartoony" 2D illustration style inspired by klientboost.com/services/, featuring vibrant colors, whimsical mascot characters, and high-energy micro-interactions.

## Core Features
- Hero section with AI robot mascot and bold CTA
- Services grid (6 cards) with cartoony illustrations and color accents
- Client logos trust bar
- Results block with cartoon-style growth graphs
- High-intent CTA section with vibrant purple background
- Responsive design with smooth micro-interactions

## Tech Stack
- **Language:** TypeScript
- **Framework:** React 18+ (Vite)
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Build Tool:** Vite
- **Deployment:** Static (Vercel/Netlify)

## Visual Design System
- **Art Style:** Bold, playful, cartoony 2D illustrations
- **Background:** Pure white (#FFFFFF)
- **Primary Colors:** Bold Purple (#7C3AED), Bright Teal (#06B6D4), Energetic Orange (#F97316)
- **Typography:** Large, bold, modern sans-serif (Inter/Plus Jakarta Sans)
- **Mascot:** Friendly AI robot character in various poses
- **Micro-interactions:** Scale-up on hover, smooth scrolling, playful animations

## Page Structure
1. **Header** — Logo + nav (Services, Packaging, Case Studies) + CTA "Get Free Audit"
2. **Hero** — Mascot + data grid illustration, H1, subtitle, CTA "Talk to an Expert"
3. **Services Grid** — 6 cards: Business Packaging, Performance Marketing, Web Development, AI Agents & Automation, PR & Video Production, Analytics & Strategy
4. **Client Logos** — Trust bar with partner logos
5. **Results Block** — Cartoon-style graphs showing "+300% Leads" upward trends
6. **Final CTA** — Full-width purple section with illustration + "Ready to Automate?"
7. **Footer** — Company info, links, illustrative feel

## Reference
- Visual reference: klientboost.com/services/ — playful SaaS aesthetic with cartoony illustrations, bright colors, generous whitespace

## Architecture
See `.ai-factory/ARCHITECTURE.md` for detailed architecture guidelines.
Pattern: Component-Based (Flat Layered)

## Architecture Notes
- Single-page application with component-based architecture
- SVG-based illustrations and icons for crisp rendering at all sizes
- CSS animations via Tailwind utilities + custom keyframes
- Intersection Observer for scroll-triggered animations
- Mobile-first responsive design

## Non-Functional Requirements
- Performance: Lighthouse score 90+ (static page, optimized assets)
- Accessibility: Semantic HTML, ARIA labels, keyboard navigation
- SEO: Meta tags, Open Graph, structured data
- Bundle size: Minimal — single page, tree-shaken components
