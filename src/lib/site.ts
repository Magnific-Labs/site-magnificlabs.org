/** Single source of truth for site-wide identity, navigation and palette mapping. */

export const site = {
  name: 'Magnific Labs',
  email: 'hello@magnificlabs.org',
  github: 'https://github.com/organizations/Magnific-Labs',
  url: 'https://magnificlabs.org',
  blurb: 'A small studio building thoughtful, accessible software for work and play.',
} as const

export interface NavLink {
  readonly label: string
  readonly href: string
}

/** Primary navigation. `label` doubles as the active-page key. */
export const nav: readonly NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/contact/' },
]

export const legalLinks: readonly NavLink[] = [
  { label: 'Privacy policy', href: '/privacy/' },
  { label: 'Terms & conditions', href: '/terms/' },
]

export const footerColumns: readonly { heading: string; links: readonly NavLink[] }[] = [
  { heading: 'Site', links: nav },
  { heading: 'Legal', links: legalLinks },
  {
    heading: 'Elsewhere',
    links: [
      { label: 'GitHub', href: site.github },
      { label: site.email, href: `mailto:${site.email}` },
    ],
  },
]

/**
 * The site names accents by palette colour (`sage`); the design system names
 * badge tones by semantics (`success`). This maps one onto the other.
 */
export const TONE = {
  sage: 'success',
  sky: 'info',
  lavender: 'brand',
  butter: 'warning',
  clay: 'danger',
} as const

export type Accent = keyof typeof TONE

/** en-GB long form, e.g. "15 June 2026". Stable across environments. */
const DATE_FMT = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

export const formatDate = (iso: string): string => DATE_FMT.format(new Date(iso))
