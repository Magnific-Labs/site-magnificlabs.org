# Magnific Labs — studio site

Server-rendered JSX built with [Fastify](https://fastify.dev) and
[KitaJS](https://html.kitajs.org), prerendered to static HTML and deployed to
Firebase Hosting. [htmx](https://htmx.org) handles the interactive parts.

No client-side framework ships to the browser.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Fastify dev server on <http://localhost:3000>, renders every request fresh |
| `npm run build` | Prerenders every route to `dist/` |
| `npm run serve` | Builds, then serves `dist/` through the Firebase emulator |
| `npm run deploy` | Builds, then deploys to Firebase Hosting |
| `npm run typecheck` | `tsc --noEmit` |
| `npx xss-scan` | Checks every JSX expression is escaped or explicitly marked safe |

## Layout

```
src/
  components/     Server-rendered JSX. ds/ holds the design-system primitives.
  pages/          One module per page, each returning a full <Document>.
  content/
    posts/        Blog posts: markdown + frontmatter. Add a file, it appears.
    legal/        Privacy policy and terms.
  lib/            Config, markdown, content loading, asset pipeline.
  styles/         site.css and the ported design-system component CSS.
  scripts/
    site.js       Progressive enhancement: smooth scroll, reveal, table of
                  contents, mobile drawer.
    analytics.js  Consent gate, and GA4 once consent is given.
  routes.ts       Every published URL, in one list.
  server.ts       Dev server.
  prerender.ts    Build: walks routes.ts, writes dist/.
public/           Copied to dist/ untouched (derived images, favicon, og.png).
brand/            1024px logo masters. NOT deployed — see brand/README.md for
                  how the files in public/assets/ are derived from them.
_ds/              Vendored design system. Source of the CSS tokens.
dist/             Build output. Not committed.
legacy/           The pre-refactor client-rendered site, kept for reference.
```

`routes.ts` is the single source of truth: the dev server registers those paths
as handlers and the prerenderer walks the same list writing files, so the two
cannot drift.

## Adding a blog post

Create `src/content/posts/my-post.md`:

```markdown
---
title: "My post"
date: "2026-08-19"
tag: "Craft"
tone: "sage"
summary: "One or two sentences for the card and the meta description."
---

Body text. `##` headings become the table of contents.
```

It is picked up automatically — published at `/blog/my-post/`, listed on the
blog index and the home page, and added to `sitemap.xml`. `tone` is one of
`sage`, `sky`, `lavender`, `butter`, `clay`. A new post adds a route, so
restart `npm run dev`; editing an existing one only needs a reload.

## How the pieces fit

**Rendering.** KitaJS compiles JSX to string concatenation — there is no
virtual DOM and no React. `Document` in `components/layout.tsx` renders the
whole page including `<head>`.

**Escaping.** KitaJS does *not* escape children by default, which is what lets
rendered markdown through intact. Every other interpolation carries a `safe`
attribute or goes through `Html.escapeHtml()`, and `npx xss-scan` fails the
build if one is missed. Values named `safe*` are treated as vetted — used only
where a value provably cannot contain markup.

**htmx.** `hx-boost` on `<body>` turns navigation into fragment swaps. The blog
tag filter is the one real interaction: the pills are ordinary links to
prerendered `/blog/tag/<tag>/` pages, upgraded with `hx-get` to swap just the
list. So filtering works with JavaScript off, and every filter has a real
shareable URL. Links that leave the site (`mailto:`, GitHub) must not be
boosted — the `Link` component sets `hx-boost="false"` on them automatically,
so no individual link has to remember.

**Analytics.** Google Analytics 4, via the measurement id of the Firebase web
app in `site-magnificlabs-org`; events appear in the Analytics section of the
Firebase console. The measurement id in `lib/analytics.ts` is not a secret — it
names the destination property and is designed to ship in client code.

It is **consent-gated**: until a visitor presses Accept, no script is fetched,
no request reaches Google and no cookie is set. Two consequences to preserve if
you touch this code:

- Do not add a `preconnect` or `dns-prefetch` for `googletagmanager.com`. It
  would open a connection to Google before consent and leak the visitor's IP,
  defeating the gate.
- `components/consent.tsx` renders hidden and is revealed by script. With
  JavaScript off, the banner never shows and analytics never loads, which is the
  correct outcome. Do not invert this to render visible-by-default.

Decline sits beside Accept because consent that cannot be refused is not
consent, the choice lives in `localStorage` rather than a cookie, Global Privacy
Control and Do Not Track are honoured as a decline without asking, and
"Analytics settings" in the footer reopens the notice so consent can be
withdrawn as easily as it was given.

Because `hx-boost` swaps the body instead of loading a document, GA4's automatic
`page_view` fires only on the first load of a visit. `scripts/analytics.js`
sends the rest itself, keyed on the URL changing, which also covers the blog tag
filter (each filter is a real page with its own URL). Remove that listener and
analytics silently under-reports every page after the first.

`content/legal/privacy.md` describes what this collects. If you change what is
measured, change that file in the same commit — it is a published legal page.

**Assets.** The design system ships `styles.css` importing four token files,
one of which imports Google Fonts — three round trips before a glyph loads.
`lib/styles.ts` flattens all of it into one stylesheet and lifts the font URL
into `<head>`. CSS, JS and htmx are content-hashed, which is what makes the
`immutable` cache headers in `firebase.json` safe.

## Smooth scrolling

Wheel and trackpad scrolling is eased with [Lenis](https://lenis.dev) at 0.6s,
not its 1.2s default. Lenis drives the real scroll position rather than
transforming a wrapper, which is why `position: sticky`, IntersectionObserver
and find-in-page all keep working — do not swap it for a transform-based
library.

Four things it is wired to, each of which breaks if removed:

- **`prefers-reduced-motion` skips initialisation entirely.** The library still
  loads, but nothing hijacks scroll.
- **Touch is left native** (`syncTouch: false`). A phone's own momentum beats
  anything layered on top.
- **The drawer calls `lenis.stop()`.** The CSS `overflow: hidden` lock alone
  does not stop Lenis, which drives scroll itself.
- **`lenis.resize()` after a boosted swap**, since the new body has a different
  height.

`html.lenis` — the persistent class, not `.lenis-smooth`, which is only present
mid-scroll — turns off native `scroll-behavior: smooth` so the two do not fight
over anchor jumps. Lenis honours `scroll-padding-top`, so anchors already land
clear of the sticky header with no offset.

This is a deliberate exception to the motion budget published in
`content/posts/a-motion-budget.md`, and that post says so. If you change what
scrolling does, change that post in the same commit.

## Icons and social preview

`public/assets/` holds only right-sized derivatives. The masters live in
`brand/`, outside the deploy path — they were previously in `public/`, which
shipped 83KB no page requested. `brand/README.md` has the regeneration commands.

Two couplings to keep in mind:

- `<meta name="theme-color">` duplicates `--paper-50`. A meta tag cannot read a
  CSS variable, so it is the one hardcoded colour in the layout; update both.
- `og.png` bakes in the wordmark and tagline. Regenerate it when either changes.

## Heading order

Two places compute a heading level rather than hardcoding one, because getting
it wrong silently breaks the document outline for screen readers:

- Footer column headings are `h2`. They were `h4`, which skipped a level on
  every page.
- `PostCard` takes a `level`: `h2` on the blog index, where cards sit directly
  under the page `h1`, and `h3` on the home page, where they nest under a
  "From the blog" `h2`.

`npx lighthouse` or the Lighthouse panel should stay at 100 for accessibility.

## Responsive layout

Verified with zero horizontal overflow across 11 pages x 9 viewport widths
(320-1280px). Two traps worth knowing about, both fixed here:

- Below 900px `.split` becomes `display: block`, not a one-column grid. In a
  grid each child gets its own row, and a sticky box cannot travel outside its
  row — so `.pin` had nothing to stick within. As blocks they share `.split` as
  a tall containing block and `.pin` sticks properly. The grid `gap` is replaced
  by `.split>*+*{margin-top}`.
- A stuck `.pin` **must** stay opaque with its hairline. Content scrolls
  underneath it, so a transparent background renders as overlapping text.
- Measured cost of pinning on a 390x780 phone: 29% of the viewport on the home
  page, 25% on an article's table of contents, 45% on About, whose facts list is
  the tallest block. If that ever feels too heavy, `position: static` on `.pin`
  in that media query reverts it.
- When `.split` was a one-column grid it used `minmax(0,1fr)`, because a bare
  `1fr` means `minmax(auto,1fr)` and a wide child — a code block in a post — set
  the track's minimum and pushed the page sideways by 291px. `display: block`
  avoids the problem differently; keep `min-width:0` on the children.
- Below 560px the wordmark is hidden. The logo, the wordmark and four nav links
  cannot share one row on a phone; the logo mark carries the brand, so the
  repeated text is what gives way.

## Deploying

```sh
npm run deploy
```

Prerenders and deploys to the `site-magnificlabs-org` Firebase project. Old
`.html` URLs from the previous version 301-redirect to their new paths, which
`firebase.json` handles.

### Domains — config that is not in this repo

`magnificlabs.org` serves the site; `www.magnificlabs.org` 301-redirects to it,
path preserved. That redirect is **not** in `firebase.json` — Hosting's
`redirects` match on path, not host — it is a field on the custom domain itself,
so it lives in the Firebase project rather than in git:

```sh
# read
curl -H "Authorization: Bearer $(gcloud auth print-access-token)"      -H "x-goog-user-project: site-magnificlabs-org"   "https://firebasehosting.googleapis.com/v1beta1/projects/site-magnificlabs-org/sites/site-magnificlabs-org/customDomains"

# set (or "" to undo)
curl -X PATCH -H "Authorization: Bearer $(gcloud auth print-access-token)"      -H "x-goog-user-project: site-magnificlabs-org" -H "Content-Type: application/json"      -d '{"redirectTarget":"magnificlabs.org"}'   ".../customDomains/www.magnificlabs.org?updateMask=redirectTarget"
```

DNS is Cloudflare, **DNS-only** — leave the proxy off, it can break Firebase's
certificate renewal. Apex A record points at `199.36.158.100`; `www` is a CNAME
to the `.web.app` host.

Note that Reliance Jio intercepts `magnificlabs.org` in India, so a local
`curl` failing is not evidence about the site. Check from outside instead:

```sh
curl "https://api.hackertarget.com/httpheaders/?q=https://magnificlabs.org"
```
