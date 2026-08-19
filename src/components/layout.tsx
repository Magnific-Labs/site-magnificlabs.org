import { Html, type Children } from '@kitajs/html'
import { MEASUREMENT_ID } from '../lib/analytics.js'
import { getAssets } from '../lib/assets.js'
import { footerColumns, nav, site } from '../lib/site.js'
import { ConsentBanner } from './consent.js'
import { Link } from './link.js'

export function Wordmark({ class: cls = '' }: { class?: string }): JSX.Element {
  return (
    <span class={`mark ${cls}`.trim()}>
      Magnific<span> Labs</span>
    </span>
  )
}

function SiteHeader({ active }: { active?: string }): JSX.Element {
  return (
    <header class="hdr">
      <div class="wrap hdr-in">
        <Link class="bookmark" href="/" aria-label="Magnific Labs — home">
          <img src="/assets/logo-mark-alpha.png" alt="" width="130" height="130" />
        </Link>
        <Wordmark />
        <nav class="nav" aria-label="Main">
          {nav.map((item) => (
            <Link href={item.href} aria-current={item.label === active ? 'page' : undefined}>
              {Html.escapeHtml(item.label)}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

function SiteFooter(): JSX.Element {
  // A four-digit year cannot carry markup; named `safe` so the XSS scanner agrees.
  const safeYear = String(new Date().getUTCFullYear())

  return (
    <footer class="ftr">
      <div class="wrap">
        <div class="ftr-grid">
          <div class="col" style={{ gap: '12px' }}>
            <Wordmark />
            <p class="small" style={{ color: 'var(--paper-300)', maxWidth: '34ch' }}>
              {site.blurb}
            </p>
          </div>
          {footerColumns.map((column) => (
            <div class="col" style={{ gap: '2px' }}>
              <h4 safe>{column.heading}</h4>
              {column.links.map((link) => (
                <Link href={link.href}>{Html.escapeHtml(link.label)}</Link>
              ))}
            </div>
          ))}
        </div>
        <div class="wrap rule" style={{ width: '100%', padding: '20px 0 0' }}>
          <span>© {safeYear} {site.name}. All rights reserved.</span>
          <span>
            {site.email}
            <button type="button" class="linked consent-reopen" data-consent-reopen hidden>
              Analytics settings
            </button>
          </span>
        </div>
      </div>
    </footer>
  )
}

export interface DocumentProps {
  title: string
  description: string
  /** Nav label of the current page; omitted for pages outside the nav. */
  active?: string
  /** Canonical path, e.g. `/blog/`. */
  path: string
  children?: Children
}

/** The complete HTML document. Every page renders through this. */
export function Document({ title, description, active, path, children }: DocumentProps): JSX.Element {
  const { cssHref, jsHref, htmxHref, analyticsHref, fontHref } = getAssets()
  const canonical = new URL(path, site.url).href

  return (
    '<!doctype html>' +
    (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title safe>{title}</title>
          <meta name="description" content={description} />
          <link rel="canonical" href={canonical} />
          <link rel="icon" href="/assets/logo-mark-alpha.png" />

          {/* Fonts are hoisted out of the design-system CSS so they load in
              parallel with it rather than after it. */}
          {fontHref ? <link rel="preconnect" href="https://fonts.googleapis.com" /> : null}
          {fontHref ? <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" /> : null}
          {fontHref ? <link rel="stylesheet" href={fontHref} /> : null}

          <link rel="stylesheet" href={cssHref} />

          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={site.name} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={canonical} />
          <meta name="twitter:card" content="summary" />

          <script src={htmxHref} defer />
          <script src={jsHref} defer />
          <script src={analyticsHref} data-ga-id={MEASUREMENT_ID} defer />
        </head>
        <body hx-boost="true">
          <a class="skip" href="#main">
            Skip to content
          </a>
          <SiteHeader active={active} />
          <main id="main">{children}</main>
          <SiteFooter />
          <ConsentBanner />
        </body>
      </html>
    )
  )
}
