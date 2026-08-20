import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { join } from 'node:path'
import { designSystemDir, STYLES_DIR } from './paths.js'

const require = createRequire(import.meta.url)

/** Design-system token files, in cascade order. */
const DS_TOKENS = ['colors.css', 'typography.css', 'spacing.css', 'base.css'] as const

/** Our own layers, applied after the design system so they can override it. */
const SITE_LAYERS = ['components.css', 'site.css'] as const

const FONT_IMPORT = /@import\s+url\((['"]?)(https:\/\/fonts\.googleapis\.com\/[^)'"]+)\1\)\s*;?/

export interface StyleBundle {
  /** Every layer concatenated into one stylesheet. */
  readonly css: string
  /** The Google Fonts href hoisted out of the CSS, so it can be a `<link>`. */
  readonly fontHref: string | undefined
}

/**
 * The design system ships `styles.css` that `@import`s four token files, and
 * `typography.css` in turn `@import`s Google Fonts — three round trips deep
 * before a glyph is requested. This flattens all of it into a single
 * stylesheet and lifts the font URL into the document head, where it can be
 * preconnected and fetched in parallel.
 */
export async function bundleStyles(): Promise<StyleBundle> {
  const ds = designSystemDir()

  // Lenis ships structural CSS its scroll hijacking depends on.
  const vendor = await readFile(require.resolve('lenis/dist/lenis.css'), 'utf8')

  const parts = await Promise.all([
    ...DS_TOKENS.map((f) => readFile(join(ds, 'tokens', f), 'utf8')),
    Promise.resolve(vendor),
    ...SITE_LAYERS.map((f) => readFile(join(STYLES_DIR, f), 'utf8')),
  ])

  let fontHref: string | undefined
  const css = parts
    .map((part, i) => {
      const source =
        i < DS_TOKENS.length
          ? `_ds/tokens/${DS_TOKENS[i]}`
          : i === DS_TOKENS.length
            ? 'vendor/lenis.css'
            : SITE_LAYERS[i - DS_TOKENS.length - 1]
      const stripped = part.replace(FONT_IMPORT, (_full, _q, url: string) => {
        fontHref ??= url
        return ''
      })
      return `/* ${source} */\n${stripped.trim()}`
    })
    .join('\n\n')

  return { css, fontHref }
}
