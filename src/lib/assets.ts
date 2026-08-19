/**
 * Content-addressed URLs for the built stylesheet and scripts.
 *
 * Filenames carry a hash of their contents, so they can be served with a
 * long immutable cache while a deploy still busts them. The server and the
 * prerenderer both populate this before rendering any page.
 */
export interface Assets {
  readonly cssHref: string
  readonly jsHref: string
  readonly htmxHref: string
  readonly analyticsHref: string
  /** Google Fonts stylesheet hoisted out of the design-system CSS. */
  readonly fontHref: string | undefined
}

let current: Assets | undefined

export function setAssets(assets: Assets): void {
  current = assets
}

export function getAssets(): Assets {
  if (!current) throw new Error('assets not initialised — call setAssets() before rendering')
  return current
}
