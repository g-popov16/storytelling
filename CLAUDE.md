# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A scrollytelling literary analysis presentation: **"Природата като образ на Бога, съдбата и красотата"** — comparing nature imagery in three Bulgarian literary works (Vazov, Yavorov, Slaveykov). Presented live on a projector by Donika Sarkizova & Georgi Popov, 11th grade.

## Running the Project

No build step. Open `index.html` directly in a browser:
```
open index.html
```

For development with live reload, use any static file server:
```
python3 -m http.server 8080
npx serve .
```

## Architecture

**Pure vanilla stack** — `index.html` + `style.css` + `main.js`. No framework, no bundler, no package.json.

**External dependencies (CDN only):**
- GSAP 3.12.2 + ScrollTrigger: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js`
- Google Fonts: Cormorant Garamond (display/quotes) + Lora (body/analysis)

**File layout:**
```
index.html          ← all 5 acts as sections
style.css           ← CSS variables, typography, animations, act backgrounds
main.js             ← GSAP ScrollTrigger setup, Intersection Observer fallback
assets/
  grain.png         ← paper texture overlay
  illustrations/
    monastery.svg   ← Act 2 silhouette
    storm.svg       ← Act 3 (wheat field + lightning)
    lake.svg        ← Act 4 (still water + moon reflection)
```

## Design System

**CSS color tokens** (defined in `:root`):
```css
--parchment: #f5ead0;  --parchment-dark: #e8d5a8;
--ink: #1a1208;        --ink-light: #3d2e1a;
--gold: #c9a86c;
--monastery: #2a4a3a;  /* Act 2 */
--storm: #111111;      /* Act 3 */
--lake: #0a1a2a;       /* Act 4 */
--silver: #d0d8e0;
```

**Typography:** No sans-serif anywhere. Cormorant Garamond for display/quotes (line-height 1.8–2.0), Lora for analysis text.

**Texture:** Paper grain overlay at ~4% opacity on entire page (PNG or SVG `feTurbulence` noise filter).

## Scroll & Animation Patterns

- Each "step" is `min-height: 100vh`
- `scroll-behavior: smooth` on `html`, no scroll hijacking
- **Ink-bleed reveal:** `filter: blur(8px); opacity: 0` → `blur(0); opacity: 1` over 600ms — used for quotes and headlines
- **Card stagger:** `translateY(20px); opacity: 0` → in, 200ms between each card
- **Background transitions:** GSAP ScrollTrigger with `scrub: true` for smooth color shifts between acts
- **Act 3 hail:** Pure CSS `@keyframes` on absolutely-positioned dots (no canvas)
- **Act 4 ripple:** CSS `@keyframes` scale + opacity on concentric circle SVGs
- **SVG illustrations:** Draw-in via `stroke-dashoffset` animation

## Build Order (for new implementation)

1. HTML structure — all 5 acts with sections
2. CSS variables + typography + parchment base
3. Act backgrounds + ScrollTrigger color transitions
4. Scroll animations (fade-ins first, then ink-bleed)
5. SVG illustrations (monastery, storm, lake)
6. CSS hail (Act 3) + CSS ripple (Act 4)
7. Polish: grain texture, ornamental borders, spacing

## Target Environment

Design for **1920×1080** (projector). No mobile breakpoints needed. Keyboard/trackpad navigation only — presenter controls the scroll.

For offline presentation: download Google Fonts and GSAP locally before presentation day.
