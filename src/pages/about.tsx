import { ButtonLink } from '../components/ds/index.js'
import { Document } from '../components/layout.js'
import { Link } from '../components/link.js'
import { PageHead } from '../components/page-head.js'
import { site, type Accent } from '../lib/site.js'

const STORY: readonly (readonly [string, string])[] = [
  [
    'Why we exist',
    'Bad software costs more than wasted time. A cluttered screen at the end of a long day, an interface that demands your attention with fake urgency, brittle infrastructure that breaks under load — it wears down users and engineering teams alike. We believe software should leave you better off than it found you: fast, quiet, accessible, and dependable over years of use.',
  ],
  [
    'Two complementary practices',
    'We divide our work between two disciplines: building our own proprietary software products, and partnering with companies to consult, architect, and engineer their critical systems. Our product engineering spans the full application lifecycle across modern web platforms, mobile (iOS and Android), platform-native desktop software (macOS, Windows, Linux), and unified cross-platform architectures. In our own pipeline, we build without external rush or compromise. For client partners, we bring senior engineering rigor, clean system architecture, and unhurried craft.',
  ],
  [
    'What we reveal (and what we keep quiet)',
    'We deliberately keep our in-house product pipeline quiet while development is underway. We do not publish speculative roadmaps or launch theatre. When a product is ready to be lived with, we introduce it here first. Until then, our attention stays on the architecture, the code, and the problem.',
  ],
]

const FACTS: readonly (readonly [string, string])[] = [
  ['Founded', '2026'],
  ['Disciplines', 'Product engineering & consulting'],
  ['Platforms', 'Web, Mobile, Desktop, Native'],
  ['Environments', 'iOS, Android, macOS, Windows, Linux'],
  ['In-house pipeline', 'Private development (stealth)'],
  ['Client work', 'Select engagements'],
]

const VALUES: readonly { title: string; accent: Accent; blurb: string }[] = [
  {
    title: 'Undistracting',
    accent: 'sage',
    blurb: 'Nothing moves unless you moved it. No streaks to keep, no manufactured urgency, no red badges for things that can wait.',
  },
  {
    title: 'Legible',
    accent: 'sky',
    blurb: 'Text you can read without leaning in — comfortable sizes, generous spacing, high contrast, and accessibility decided on day one.',
  },
  {
    title: 'Durable',
    accent: 'butter',
    blurb: 'Architectures built to outlive trends. Resilient data models, open formats, low latency, and zero bloat.',
  },
  {
    title: 'Honest',
    accent: 'clay',
    blurb: "Plain language, clear architecture, and no sales theatre. If something isn't ready or isn't a fit, we say so directly.",
  },
]

function Story(): JSX.Element {
  return (
    <section class="wrap sec split" style={{ paddingTop: '0' }}>
      <div class="pin">
        <h2 class="h-lg">A studio, not a startup</h2>
        <p class="body" style={{ marginTop: '16px', maxWidth: '32ch' }}>
          No growth targets, no launch theatre. Just software we want to keep using.
        </p>
        <div class="col" style={{ gap: '2px', marginTop: '28px' }}>
          {FACTS.map(([key, value]) => (
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '24px', padding: '12px 0', maxWidth: '30ch', borderBottom: '1px solid var(--paper-200)' }}>
              <span class="small" safe>
                {key}
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: '700', color: 'var(--ink-900)' }} safe>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div class="col" style={{ gap: 'clamp(28px,3.5vw,52px)' }}>
        {STORY.map(([title, blurb]) => (
          <div class="reveal col" style={{ gap: '12px' }}>
            <h3 class="h-md" safe>
              {title}
            </h3>
            <p class="body" safe>
              {blurb}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Values(): JSX.Element {
  return (
    <section class="wrap sec" style={{ paddingTop: '0' }}>
      <div class="reveal col" style={{ gap: '14px', marginBottom: 'clamp(24px,3vw,44px)' }}>
        <h2 class="h-lg">Four words we check ourselves against</h2>
        <p class="body">Every decision gets held up to these. If it fails one of them, it doesn't ship.</p>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
          gap: 'clamp(12px,1.5vw,20px)',
        }}
      >
        {VALUES.map((value) => (
          <div
            class="reveal"
            style={`background:var(--${value.accent}-100);border-radius:var(--radius-lg);padding:clamp(22px,2.2vw,32px);border:1px solid color-mix(in srgb, var(--${value.accent}-300) 40%, transparent)`}
          >
            <h3 class="h-md" style={`color:var(--${value.accent}-700)`} safe>
              {value.title}
            </h3>
            <p class="body" style={{ marginTop: '10px', fontSize: 'var(--text-base)' }} safe>
              {value.blurb}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

function WorkWithUs(): JSX.Element {
  return (
    <section class="wrap" style={{ paddingBottom: 'clamp(24px,4vw,56px)' }}>
      <div
        class="reveal"
        style={{
          background: 'var(--paper-0)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(28px,3.5vw,56px)',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--surface-border)',
        }}
      >
        <h2 class="h-md">Collaborating with the studio</h2>
        <p class="body" style={{ marginTop: '12px' }}>
          We take on a small number of client consulting and engineering projects each year. We also share technical essays on our{' '}
          <Link class="linked" href="/blog/">
            blog
          </Link>
          {' '}and open source tools on{' '}
          <Link class="linked" href={site.github}>
            GitHub
          </Link>
          . Have a project that demands senior engineering and thoughtful architecture? Let's talk.
        </p>
        <div style={{ marginTop: '24px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <ButtonLink href="/contact/">Start a conversation</ButtonLink>
          <ButtonLink href={`mailto:${site.email}`} variant="ghost">
            {site.email}
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}

export function AboutPage(): JSX.Element {
  return (
    <Document
      title="About — Magnific Labs"
      description="About Magnific Labs: an independent software studio building proprietary products and consulting on critical client systems."
      active="About"
      path="/about/"
    >
      <PageHead
        eyebrow="About"
        title="We build software worth living with."
        lead="Magnific Labs is an independent software studio. We engineer proprietary products in our own pipeline and partner with companies to consult, architect, and build their most demanding software systems across web, mobile, and platform-native environments."
      />
      <Story />
      <Values />
      <WorkWithUs />
    </Document>
  )
}
