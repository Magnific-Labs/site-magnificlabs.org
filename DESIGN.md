# Magnific Labs — Design System Specification (DESIGN.md)

> Single source of truth for Magnific Labs interface design, tokens, layout mechanics, voice, and engineering standards.

---

## 1. Visual Theme & Atmosphere
- **Brand Archetype:** High-End Independent Software Studio & Product Engineering Consultancy.
- **Core Capabilities:** End-to-end product engineering across modern web applications, mobile (iOS & Android), platform-native desktop (macOS, Windows, Linux), and cross-platform systems.
- **Atmosphere:** Calm, editorial, unhurried, rigorous. Blends the warmth and tactile paper canvas of Bear Notes with the structural discipline of Material 3 and the typography-first elegance of Swiss design.
- **Core Attitude:** "Software made to be lived with." Zero synthetic urgency, zero dark patterns, zero manufactured noise.
- **Design Read:** Independent software studio landing and presence for technical founders, engineering leaders, and collaborators, with a warm minimalist editorial language, custom design system + warm paper surfaces + Atkinson Hyperlegible / Figtree / JetBrains Mono typography + quiet, disciplined micro-interactions.
- **Target Dials:**
  - `DESIGN_VARIANCE: 6` (Structured, editorial, disciplined, not chaotic)
  - `MOTION_INTENSITY: 4` (Strict adherence to <= 280ms motion budget, opacity/transform only, respects `prefers-reduced-motion`)
  - `VISUAL_DENSITY: 3` (Airy, generous whitespace, room to breathe, unhurried typography)

---

## 2. Color Palette & Roles

All colors are anchored to the warm rust/earth gradient of the Magnific Labs brand mark and a Bear-inspired warm paper neutral scale. All text/surface pairings must clear WCAG AA (4.5:1 minimum).

### Canvas & Neutrals (Warm Paper)
- `--paper-0: #fffdfb` — Primary elevated card surface
- `--paper-50: #faf6f1` — Page canvas background
- `--paper-100: #f3ece4` — Sunken surface, chip backgrounds
- `--paper-200: #e7ddd2` — Subtle dividers & interactive hover fills
- `--paper-300: #d6c9bb` — Structural borders & hairline dividers

### Typography (Warm Inks)
- `--ink-900: #241d1a` — Primary headings, display text, high-contrast titles
- `--ink-700: #3f342e` — Body copy, lead paragraphs, card text
- `--ink-500: #5e5049` — Secondary metadata, timestamps, author notes
- `--ink-300: #7d6e65` — Subtle captions, tertiary hints
- `--ink-100: #d8cfc5` — Inactive or disabled borders

### Brand Accent (Warm Rust)
- `--brand-900: #2a1d18` — Dark footer background
- `--brand-700: #42302a` — Primary link text, deep contrast text
- `--brand-600: #523c33` — Primary button background, key interactive anchor
- `--brand-500: #6b4f43` — Mid brand tone
- `--brand-400: #8c6a57` — Eyebrows, uppercase badges, wordmark subtitle
- `--brand-100: #ede2da` — Soft brand container fill
- `--brand-50: #f8f2ed` — Button & nav link hover state

### Semantic Tonal Accents (Muted Pastels)
Each family follows a 100-tint background paired with a darkened 700 text color (clearing 4.5:1 contrast):
- **Sage (Success / In-House / Craft):**
  - `--sage-100: #e4efe6` / `--sage-700: #2f5a3c`
- **Sky (Info / Studio / Systems):**
  - `--sky-100: #e3edf4` / `--sky-700: #28536f`
- **Lavender (Brand / Engineering / Pipeline):**
  - `--lavender-100: #ece6f4` / `--lavender-700: #4f3a75`
- **Butter (Warning / Durability):**
  - `--butter-100: #f9f0da` / `--butter-700: #6d5410`
- **Clay (Danger / Priority / Direct):**
  - `--clay-100: #f6e7e1` / `--clay-700: #7f3f2b`

---

## 3. Typography Rules

Magnific Labs deploys three distinct, highly intentional typefaces:

1. **Display & Headings:** `Figtree` (geometric humanist sans-serif with warmth, weights 600, 700, 800).
   - Large display: `clamp(38px, 5.6vw, 72px)`, line-height `1.03`, letter-spacing `-0.03em`.
   - Section headers: `clamp(28px, 3.2vw, 44px)`, line-height `1.1`, letter-spacing `-0.025em`.
   - Subheadings: `clamp(21px, 1.7vw, 26px)`, line-height `1.25`.
2. **Body & Interface:** `Atkinson Hyperlegible` (created by the Braille Institute to maximize letterform disambiguation for low-vision readers, weights 400, 700).
   - Body text: `--text-base: 16px`, line-height `1.75`, color `var(--ink-700)`. Never below 16px.
   - Lead copy: `clamp(18px, 1.35vw, 22px)`, line-height `1.65`.
   - Captions: `--text-sm: 15px`, line-height `1.4`. Never below 14px.
   - Max prose measure: `68ch`.
3. **Monospace & Metadata:** `JetBrains Mono` (weights 400, 500, 600).
   - Ordinals, keystrokes, technical metadata: `--text-sm: 15px`, color `var(--brand-400)`.

---

## 4. Component Stylings

### Buttons (`.btn`, `.btn-primary`, `.btn-ghost`)
- Height: `44px` (md default) or `52px` (lg CTA). Minimum tap target: `44px`.
- Border-radius: `var(--radius-md): 12px`.
- Padding: `0 20px` (md) / `0 26px` (lg).
- Font: `Figtree`, weight 600.
- Motion & feedback:
  - Transition: `background 200ms ease, color 200ms ease, transform 120ms ease`.
  - Active: `transform: scale(0.98)` for physical tactility.
  - Reduced motion: collapses transform to none.

### Badges & Status Chips (`.badge`, `.status-badge`)
- Height: `22px` for badges, `32px` for status badges.
- Border-radius: `var(--radius-pill): 9999px`.
- Text: uppercase, `font-size: 14px`, `letter-spacing: 0.06em`, `font-weight: 600`.
- Colors: always paired semantic token (e.g. `var(--sage-100)` background + `var(--sage-700)` text).

### Cards & Surfaces
- Standard Card (`.ds-card`, `.postcard`): `background: var(--paper-0)`, `border: 1px solid var(--surface-border)`, `border-radius: var(--radius-lg): 16px`, `box-shadow: var(--shadow-sm)`.
- Sticky Pillar Card (`.pillar-card`): `border-radius: var(--radius-xl): 24px`, sticky top positioning with calculated offset, subtle borders, and structured facet grids.
- Feature Grid Item (`.feature-item`): `background: var(--paper-0)`, `border: 1px solid var(--surface-border)`, `border-radius: 16px`, soft shadow on hover.

---

## 5. Layout Principles & Grid
- **Container Widths:**
  - Standard container: `width: min(1240px, 100% - 96px); margin-inline: auto`.
  - Mobile (<720px): `width: min(1240px, 100% - 40px)`.
  - Ultrawide (>1800px): `width: min(1440px, 100% - 200px)`.
- **Vertical Spacing Rhythm:**
  - Section padding: `clamp(64px, 8vh, 120px) 0`.
  - Card padding: `clamp(24px, 3vw, 48px)`.
- **Split Pinned Layout:**
  - Desktop (>900px): `display: grid; grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr); gap: clamp(32px, 5vw, 88px)`.
  - Sticky side (`.pin`): sticky top offset with `calc(var(--header-h) + var(--sticky-gap))`.
  - Mobile: clean single-column block flow with sticky backdrop header.

---

## 6. Depth & Elevation
- Warm-tinted shadows (brown-tinted rgba, never harsh pure black):
  - `--shadow-sm: 0 1px 3px rgba(36, 29, 26, 0.06), 0 1px 2px rgba(36, 29, 26, 0.04)`
  - `--shadow-md: 0 4px 8px rgba(36, 29, 26, 0.08), 0 2px 4px rgba(36, 29, 26, 0.04)`
  - `--shadow-lg: 0 12px 24px rgba(36, 29, 26, 0.12), 0 4px 8px rgba(36, 29, 26, 0.06)`
- Hairline borders: `1px solid var(--surface-border)` (`#d6c9bb` / `color-mix(in srgb, var(--ink-900) 10%, transparent)`).

---

## 7. Do's and Don'ts (Studio Integrity & Anti-Slop)

### Content & Messaging
- **DO NOT hallucinate fake products:** Magnific Labs does NOT build unannounced games, ERPs, "task monsters", or fake consumer apps.
- **DO represent the true dual model:**
  1. Proprietary products in development (stealth, kept quiet until ready).
  2. Client consulting, architecture, and engineering practice for ambitious software systems.
- **DO NOT use AI copywriting cliches:** Avoid "Elevate", "Seamless", "Unleash", "Game-changer", "Delve", "Tapestry", or fake laundry lists ("and many more!").
- **DO write in clear, unhurried, active voice:** Matter-of-fact, confident, technical, quiet.

### Visual & Technical
- **DO NOT default to AI-purple gradients or dark mesh glows.**
- **DO NOT mix font families haphazardly:** Figtree for headers, Atkinson Hyperlegible for body/UI, JetBrains Mono for code.
- **DO NOT use emojis as UI icons or status markers.**
- **DO honor the motion budget:** <= 280ms duration ceiling; animate `opacity` and `transform` only; completely collapse to static under `prefers-reduced-motion`.
- **DO maintain 44px minimum tap targets** across all interactive elements.

---

## 8. Responsive Behavior
- **Mobile Collapse (<860px):**
  - Navigation switches to accessible `<dialog>` drawer with focus trapping.
  - Split pinned sections stack into natural vertical reading order.
  - Sticky stacked cards recalculate top offsets.
- **Touch Ergonomics:**
  - Full-width tap targets on mobile buttons.
  - Safe margins (`min-height: 100dvh` for full viewport considerations).

---

## 9. Agent Prompt Guide
When instructing agents to modify or add pages for Magnific Labs, use this system:
- *"Consult DESIGN.md for color tokens and typography rules. Ensure body text uses Atkinson Hyperlegible, headings Figtree, and all contrast clears WCAG AA."*
- *"Maintain the studio's true positioning: proprietary products in development (stealth) and client consulting/engineering. Do not invent products, games, or metrics."*
- *"Ensure all new interactive elements maintain 44px tap targets, tactile :active states, and adhere to the 280ms motion budget."*
