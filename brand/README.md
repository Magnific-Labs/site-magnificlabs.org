# Brand sources

The 1024x1024 masters. **Not deployed** — `public/` is copied verbatim into
`dist/`, so keeping these there shipped 83KB that no page ever requested.

Everything in `public/assets/` is derived from `logo-mark-alpha.png`:

```sh
cd public/assets
sips -Z 260 ../../brand/logo-mark-alpha.png --out logo-mark-260.png      # header, 130px @2x
sips -Z 180 ../../brand/logo-mark-alpha.png --out apple-touch-icon.png   # iOS home screen
sips -Z 32  ../../brand/logo-mark-alpha.png --out favicon-32.png         # browser tab
```

`og.png` (1200x630) is a rendered card, not a resize. Regenerate it by serving
`dist/`, loading a 1200x630 page that links the built stylesheet, and
screenshotting the viewport — see the commit that added it. Update it whenever
the tagline or wordmark changes, since the text is baked in.

`logo-mark-reverse.png` is the white knockout for dark surfaces. Nothing uses it
yet; the footer renders the wordmark as text.
