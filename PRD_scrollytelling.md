# PRD — "Природата като образ" Scrollytelling Presentation

**Format:** Single-page scrollytelling website  
**Presented on:** Projector / laptop screen (presenter scrolls, class watches)  
**Aesthetic:** Warm & literary — aged paper, ink, classical Bulgarian feel  
**Text density:** Moderate — key analysis points on screen, presenter narrates the rest  
**Tech stack suggestion:** Vanilla HTML/CSS/JS (simplest, no build step, open in browser) or Vite + React if preferred  

---

## 1. Overview

A single long-scroll webpage that the presenter navigates live on a projector. Each scroll triggers an animation — a quote fades in, a background shifts, an illustration appears. The page is divided into four major sections: an intro and one section per literary work. The presenter scrolls at their own pace while narrating; the visuals provide atmosphere and anchor the key analytical points.

The aesthetic is that of an illuminated manuscript or a high-quality literary journal — warm parchment tones, serif typography, ink-like textures, subtle paper grain. It should feel like the works themselves: classical, deliberate, beautiful.

No student devices needed. No interaction. Pure cinematic presentation.

---

## 2. Page Structure

The page is one continuous vertical scroll. It is divided into **5 acts**, each with multiple **scroll steps** (sections that animate as they enter the viewport). The presenter scrolls through each step while narrating.

Recommended library for scroll-triggered animations: **GSAP ScrollTrigger** (free, CDN-available) or **Intersection Observer API** (no dependency). For parallax backgrounds: CSS `background-attachment: fixed` or GSAP.

---

## 3. Act-by-Act Content

---

### ACT 0 — Title / Cover

**Visual:** Full-viewport opening screen. Background is a deep parchment texture with a subtle ink wash spreading slowly outward from the center (CSS animation on load). A thin ornamental border frames the content.

**Text (centered, stacked, fades in line by line on load):**
```
Природата като образ на Бога, съдбата и красотата

Сравнителен анализ върху три творби от българската литература

Вазов · Яворов · Славейков

Доника Саркизова & Георги Попов — 11 „Д" клас, 2025/2026
```

**Scroll prompt:** A small animated downward chevron or the word „Напред →" at the bottom, fades in after 2 seconds.

---

### ACT 1 — Увод / The context

**Purpose:** Set the historical and literary context before any specific work is introduced. One scroll step.

**Background:** Soft warm beige. A faint map outline of Bulgaria circa 1878–1900 as a watermark behind the text, very low opacity.

**Step 1 — The era**
Headline (large serif): *„Краят на XIX век"*
Body text (2–3 sentences, moderate size):
> След Освобождението България търси нова посока. Писателите се обръщат към природата — не като пейзаж, а като философски въпрос. Какво означава да си човек? Къде е Бог? Каква е съдбата ни?

**Step 2 — The three voices**
Three author names appear one by one, each with a single defining word beneath:

```
Иван Вазов        Пейо Яворов        Пенчо Славейков
  Храм               Съдба               Красота
```

Each name animates in from the left with a slight ink-bleed effect (CSS blur transitioning to sharp). A thin horizontal rule separates this from the next act.

**Transition into Act 2:** Background slowly warms and darkens to a deep forest blue-green as the user scrolls down — signals the shift into Vazov's world.

---

### ACT 2 — Вазов / При Рилския манастир / „Природата като храм"

**Color palette:** Deep monastery blue-green (#2a4a3a) fading to warm gold (#c9a86c). Parchment overlays. Think candlelight inside a stone chapel.

**Step 1 — The setting**
Full-bleed background: a CSS-drawn or SVG illustration of a mountain silhouette with a small monastery nestled in it (can be very simplified/abstract — just shapes and color). Stars in the sky above.

Large text fades in over the image:
> *„При Рилския манастир"* — Иван Вазов

Subtext below, smaller:
> Написана след Освобождението. Вазов бяга от разочарованието към планината.

**Step 2 — The key quote**
Background shifts to parchment. The quote appears as if handwritten (use a handwriting-style or calligraphic serif font, large, centered):

> „Природата всегда, но буйната природа,  
> що изпълни я живот, шум, песен и свобода,  
> бе моят идеал величествен и прост"

Below the quote, a small ink underline animates in, then a single analysis line appears:
> Природата не е фон — тя е идеал.

**Step 3 — The analysis points**
A three-column layout animates in, each column a small "card" with aged paper texture and a thin ink border:

| 🏔 Храм | 🙏 Духовност | 🏠 Дом |
|---|---|---|
| Планината е по-свещена от всяка църква | „Моят ум фъркат / до Господ отива" — чрез природата се достига до Бога | „Сега съм у дома" — анафора. Природата е единственото истинско убежище |

Each card fades in with a 200ms stagger.

**Step 4 — The contrast teaser**
A thin separator line. Then one sentence, italic, centered, slightly faded — hinting at what comes next:
> *Но природата не винаги е убежище...*

Background begins to darken and cool as the user scrolls — transitioning toward Yavorov's storm.

---

### ACT 3 — Яворов / Градушка / „Природата като съдба"

**Color palette:** Near-black (#111) with dark grey fields, flashes of cold white and bruised yellow. Heavy, oppressive, claustrophobic.

**Step 1 — The storm arrives**
Full-bleed dark background. Animated CSS hail — small white dots falling diagonally at varying speeds (pure CSS `@keyframes`, no canvas needed). A jagged SVG lightning bolt flashes every ~4 seconds.

Large white text over the storm:
> *„Градушка"* — Пейо Яворов

Subtext:
> Природата не утешава. Тя унищожава.

**Step 2 — The opening lines**
Hail animation slows but doesn't stop. The opening lines of the poem appear in a fragmented way — words stagger in one by one as if being pelted:

> „една, че две, че три —  
> усилни и паметни години"

Below: a single line of analysis:
> Повторението имитира неспирното бедствие. Няма изход.

**Step 3 — The key quote**
Background: a dark wheat field, CSS-drawn with broken stalks (simplified SVG shapes). Over it, bold, fractured typography — the climax quote:

> „Град! — парчета — яйце и орех"

The dashes animate in with a flash effect, one at a time. Then below:
> Градацията на размера. Ужасът расте с всяка дума.

**Step 4 — The analysis points**
Same three-card layout as Act 2, but cards have a darker, more worn texture — like scorched paper:

| ⚡ Стихия | 🌾 Земята | 😶 Безсилие |
|---|---|---|
| Природата е непредсказуема и жестока — не враг, а безразлична сила | Едновременно извор на живот и гробище — трудът може да изчезне за миг | Селянинът може само да гледа. Молитвата остава без отговор |

**Step 5 — The contrast teaser**
Storm animation fully stops. Complete visual silence. White text on black:
> *А ако природата просто... мълчи?*

Background dissolves slowly into deep water blue — the lake.

---

### ACT 4 — Славейков / Спи езерото / „Природата като красота"

**Color palette:** Midnight blue (#0a1a2a), silver moonlight (#d0d8e0), dark forest greens. Still. Reflective. The most minimal act — lots of negative space.

**Step 1 — The silence**
The transition from Act 3 completes. For a moment — just the deep blue background and nothing else. Then, slowly, text materializes as if emerging from water:

> *„Спи езерото"* — Пенчо Славейков

No subtext yet. Let it breathe for a moment.

**Step 2 — The scene**
A CSS/SVG illustration: a still lake surface with a moon reflection. Trees silhouetted at the edges. Everything is symmetrical — the reflection mirrors the sky perfectly. A single animated leaf drifts down and lands on the water, sending out slow ripple rings (CSS animation).

Subtext appears beneath the illustration:
> Тишина. Неподвижност. Съвършенство.

**Step 3 — The key quote**
Parchment background returns, warmer and lighter than Act 2's version. The quote appears in an elegant, airy serif — plenty of line spacing:

> „Трептят, шепнат белостволи буки"

Below, a slow fade-in of the analysis:
> Дори движението е тихо. Природата не изисква нищо от теб — само да замълчиш.

**Step 4 — The analysis points**
Cards return, but lighter, airier — cream paper, thin pencil-thin borders:

| 🌊 Огледало | 🤫 Покой | ✨ Идеал |
|---|---|---|
| Езерото отразява света — и душата на човека | Дори „лист отронен" не нарушава хармонията | За Славейков природата не изисква борба или преклонение — само тишина |

---

### ACT 5 — Заключение / The synthesis

**Visual:** All three palettes blend — a three-panel horizontal split slowly reveals itself as the user scrolls. Left panel: monastery blue-green. Center: storm black. Right: lake midnight blue. Thin gold lines separate them.

**Step 1 — The three faces, side by side**
Each panel shows just the author name and the defining word:

```
Вазов          Яворов         Славейков
Храм           Съдба          Красота
```

**Step 2 — The synthesis statement**
Panels fade to parchment. A single large quote, the conclusion of the paper, animates in centered:

> „Природата е едновременно огледало, храм и фактор, определящ съдбата ни."

**Step 3 — The closing**
Below the quote, smaller text:
> В трите творби тя отразява не само заобикалящия ни свят, но и дълбочината на човешките чувства, нуждите и времето в историята.

Then, after a pause (scroll-triggered):
> *Благодарим за вниманието.*  
> Доника Саркизова & Георги Попов — 11 „Д" клас

A thin ornamental divider, mirroring the one from the opening. The page ends.

---

## 4. Visual & Aesthetic System

### Typography
- **Display / quotes:** A classical serif — Playfair Display, Cormorant Garamond, or IM Fell English (all on Google Fonts, free). Large, generous line-height (1.8–2.0).
- **Body / analysis:** A refined readable serif — Lora or Crimson Text.
- **No sans-serif anywhere.** This is a literary presentation.

### Color tokens
```css
--parchment:     #f5ead0;
--parchment-dark:#e8d5a8;
--ink:           #1a1208;
--ink-light:     #3d2e1a;
--gold:          #c9a86c;
--monastery:     #2a4a3a;
--storm:         #111111;
--lake:          #0a1a2a;
--silver:        #d0d8e0;
```

### Texture
- A subtle paper grain overlay on the entire page: a semi-transparent PNG or CSS noise filter (`filter: url(#noise)` via SVG feTurbulence), ~4% opacity.
- Ink-bleed effect on key headline animations: start with `filter: blur(8px)` and `opacity: 0`, transition to `filter: blur(0)` and `opacity: 1` over 600ms.

### Scroll animations (all Intersection Observer or GSAP ScrollTrigger)
- Quotes: ink-bleed fade-in (blur → sharp)
- Cards: stagger fade-up (translateY 20px → 0, opacity 0 → 1, 200ms between each)
- Background color transitions: smooth `background-color` transition as sections enter viewport (use GSAP ScrollTrigger `scrub: true`)
- CSS illustrations: elements draw in using `stroke-dashoffset` animation on SVG paths
- The hail in Act 3: pure CSS `@keyframes` on absolutely-positioned dots
- The ripple in Act 4: CSS `@keyframes` scale + opacity on concentric circle SVGs

### Scrolling behavior
- `scroll-behavior: smooth` on html
- Each "step" is a full-viewport-height section (`min-height: 100vh`)
- Presenter scrolls with keyboard arrow keys or trackpad — smooth and controlled
- No scroll hijacking — native browser scroll only

---

## 5. File Structure

```
/
├── index.html          ← single entry point
├── style.css           ← all styles, CSS variables, animations
├── main.js             ← scroll observers, animation triggers
├── assets/
│   ├── grain.png       ← paper texture overlay (or generate via CSS)
│   └── illustrations/
│       ├── monastery.svg
│       ├── storm.svg
│       └── lake.svg
```

All SVG illustrations are minimal — silhouettes and flat shapes, not detailed drawings. They can be inlined in HTML if preferred.

---

## 6. Build Notes for Claude Code

- **No framework needed.** Pure HTML + CSS + JS is ideal — one `index.html`, open in any browser, no build step. Present directly from the file.
- **GSAP via CDN** is fine: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js` + ScrollTrigger plugin.
- **Google Fonts** via `<link>` in `<head>` — Cormorant Garamond + Lora.
- **Responsive:** Design for 1920×1080 (standard projector). No need for mobile breakpoints.
- **Offline-safe:** Once fonts and GSAP are cached, the page works without internet. Consider downloading fonts locally for the actual presentation day.
- **Build order:**
  1. HTML structure — all 5 acts, all steps as sections
  2. CSS variables + typography + parchment base
  3. Act backgrounds + color transitions
  4. Scroll animations (start with simple fade-ins, add ink-bleed after)
  5. CSS illustrations (monastery, storm, lake)
  6. CSS hail animation (Act 3)
  7. CSS ripple animation (Act 4)
  8. Final polish: grain texture, ornamental borders, spacing

---

*Built for: 11 „Д" клас, 2025/2026 г. — Доника Саркизова & Георги Попов*
