# Magnific Labs Design System

**Positioning: made to be lived with.** Magnific Labs makes software that gets out of your way — easy to pick up, quiet while you use it, good company over the years you keep it. Effortless at work; unserious at home.

**Products do not share one design language.** A writing app and a deploy console should not look alike, and this system does not force them to. What it standardises is *behaviour and foundations* — type scale, spacing rhythm, motion budget, focus and target rules, accessibility floors, copy voice. Colour, shape and density are the product's to choose: each kit picks its own accent family and surface treatment from the token set. Read the component styling here as a well-argued default, not a mandate.

Magnific Labs builds cross-platform software — notepads, ERPs, developer tools, and games — under one brand. The default visual direction blends **Material 3** structure (tonal color ramps, elevation, clear state layers) with the **warmth and restraint of Bear Notes** (paper-like neutral surfaces, a single confident accent, no visual noise). Priorities: pastel color, minimalism, readability, accessibility, and consistent behaviour across mobile, desktop, and web.

**Sources provided:** one brand mark PNG (`uploads/…_1.png`, copied to `assets/logo-mark.png`) and a written brand brief. No Figma file, codebase, or existing product screens were attached — this system is built from scratch from that brief and the logo. If a codebase or Figma file exists, re-attach it via the Import menu so kits can be rebuilt from real source instead of this from-scratch pass.

## Index
- `styles.css` — global stylesheet entry (imports everything below)
- `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css`, `tokens/base.css` — design tokens + accessible element defaults
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand)
- `assets/logo-mark.png` — brand mark as supplied (solid light-gray field); `assets/logo-mark-alpha.png` — background keyed out, use this on light surfaces; `assets/logo-mark-reverse.png` — white knockout for dark surfaces
- `components/forms/` — Button, IconButton, Input, Select, Checkbox, Radio, Switch
- `components/feedback/` — Badge, Tag, Tooltip, Toast, Dialog
- `components/navigation/` — Tabs
- `components/surfaces/` — Card
- `ui_kits/website/` — magnificlabs.org marketing site
- `ui_kits/notepad/` — Magnific Notepad (writing app)
- `ui_kits/erp/` — Magnific ERP (business dashboard)
- `ui_kits/devtools/` — Magnific CLI Console (developer tool)
- `SKILL.md` — portable skill file for use in other agent tools

## Components
Button, IconButton, Input, Select, Checkbox, Radio, Switch, Badge, Tag, Tooltip, Toast, Dialog, Tabs, Card. This is a from-scratch standard set (no source library existed to enumerate) sized to what the three sample products need.

**Intentional additions:** none beyond the standard set — every component here is a conventional primitive needed by the sample UI kits.

## Content fundamentals
- **Voice:** warm and human, never salesy — plain words, contractions welcome, dry rather than jokey in work tools, freer in consumer and play surfaces — short declarative sentences, no hype or exclamation points. "Every note, synced instantly." not "🎉 Sync your notes NOW!"
- **Person:** second person for product copy and UI strings ("Your notes, always in sync"), first-person plural sparingly for company voice in marketing ("We build calm software").
- **Casing:** sentence case everywhere — buttons, headings, nav items ("New invoice", not "New Invoice" or "NEW INVOICE").
- **Emoji:** not used in product UI or copy. Status is communicated with color/badges, not emoji.
- **Error/empty states:** matter-of-fact, never cute. "This can't be undone." rather than "Oops! Something went wrong 😬".
- **Numbers & data:** shown plainly, no unnecessary decimals or filler stats.

## Visual foundations
- **Color:** one brand anchor (rust/brown, from the logo gradient) plus five pastel tonal families (sage, sky, lavender, butter, clay) used the way Material 3 uses tonal palettes — soft "-100" backgrounds for chips/badges, saturated "-500/700" for text/icons on them. Neutrals are warm paper tones, not cool gray, echoing Bear's paper-like canvas. Max one saturated accent per view; everything else is pastel or neutral.
- **Type:** Figtree (display/headings — geometric humanist, warm without being cute) + **Atkinson Hyperlegible** (body/UI — designed by the Braille Institute specifically to disambiguate letterforms for low-vision readers) + JetBrains Mono (code, developer surfaces). Body text never below 16px; captions never below 14px; prose measure capped at 68 characters. *All three are Google Fonts substitutions — no brand font files were provided; swap in real files if Magnific Labs licenses type.*
- **Spacing:** 4px base rhythm (4/8/12/16/24/32/48/64/80/96).
- **Radius:** 8px small controls, 12px default (inputs, buttons), 16px cards, 24px large surfaces/dialogs, pill for chips/switches. Never sharp corners, never a heavy "super-rounded" bubble look.
- **Shadows:** soft and low-contrast (`--shadow-sm/md/lg`), warm-tinted (brown-based rgba, not pure black) — elevation reads as a gentle lift, never a hard drop shadow.
- **Borders:** 1px hairline in `--surface-border` on cards/inputs; no heavy strokes.
- **Backgrounds:** flat pastel/paper surfaces — no gradients, no textures, no photography-heavy hero treatment. The one gradient in the system is the logo mark itself.
- **Ambience:** split by product. Work tools are calm and still — nothing moves unless you moved it. Play and consumer surfaces are allowed to be alive: responsive motion, sound, personality, within the same motion budget.
- **Animation:** fast and subtle — 120–280ms, standard/out easing curves, opacity and background-color transitions only (button hover, switch thumb slide). No bounce, no spring, no page-transition choreography.
- **Hover states:** background shifts one step darker/softer (e.g. brand-600→700, transparent→soft-accent) — never a shadow pop or scale change.
- **Press/active states:** rely on the same darker background step; avoid scale/shrink effects (keeps things calm, not "bouncy").
- **Focus states:** a soft lavender ring (`--shadow-focus`), never a harsh blue browser-default outline.
- **Transparency/blur:** used sparingly — only for the dialog scrim (`rgba(42,35,32,0.35)`), not for glassmorphism panels or nav bars.
- **Imagery:** none provided; when photography is used it should read warm and natural (matching the paper/rust palette), not cool or high-contrast b&w.
- **Cards:** white/paper surface, 1px hairline border, 16px radius, `--shadow-sm` — no colored left-border accent treatment.

## Accessibility
Accessibility is treated as a spec, not a pass at the end:
- **Contrast:** every text/background pairing in `tokens/colors.css` clears WCAG AA (4.5:1); the semantic `-700` steps were darkened specifically so tonal chips (e.g. `butter-700` on `butter-100`) pass. See the "Contrast Pairs" specimen card.
- **Type:** 16px body floor, 1.6 line-height, 68ch measure, `text-wrap: pretty`.
- **Targets:** `--target-min: 44px` is enforced on Button, IconButton, Input, Select, Tabs, Checkbox, Radio and Switch.
- **Focus:** a 3px `--focus-ring` outline with 2px offset via `:focus-visible` in `tokens/base.css`; fields additionally get a double-ring `--shadow-focus`.
- **Keyboard & ARIA:** Checkbox, Radio and Switch expose roles and `aria-checked` and respond to Space/Enter; Tabs use `role="tablist"/"tab"`; Dialog is `role="dialog" aria-modal`; Toast is a polite live region.
- **Motion:** all durations collapse to 0ms under `prefers-reduced-motion: reduce`.
- **Links:** underlined by default, thicker on hover — never color-only.

## Brand mark & wordmark
The only supplied asset is the "M" mark, which arrived as brown-on-gray with no transparency (`assets/logo-mark.png`). Two derived cutouts are what products should actually use: `logo-mark-alpha.png` (brown mark, transparent field) on light surfaces and `logo-mark-reverse.png` (white knockout) on dark ones — never CSS filters on the original, which flattens the mark into a solid square. Vector artwork should replace all three when available. No wordmark artwork was provided, so the wordmark is a **type lockup**, not a drawn logo: "Magnific" in Figtree 800 with tight tracking, "Labs" in 500 at brand-400 (or an uppercase, wide-tracked `Labs` under the name for the stacked variant). Three approved lockups — horizontal, stacked, reversed — are shown in the "Wordmark Lockups" card. Clear space equals the mark's cap height on all sides.

## Iconography
No icon set or icon font was provided. UI kits use plain Unicode glyphs (⌕, +, 🗑, ✕) as placeholders only — **do not treat these as the system's icon language**. Recommended next step: adopt a single consistent line-icon set (e.g. Lucide or Phosphor, both CDN-available and stroke-based, matching the system's restrained, non-decorative feel) and replace every placeholder glyph. No emoji are used as UI icons; the emoji seen in this readme are documentation-only.

## Starting points
None marked. The Button-family starting point tag was removed per the current template-based starting-point model — mark specific templates instead, if desired.
