import { ButtonLink } from '../components/ds/index.js'
import { Document } from '../components/layout.js'
import { Link } from '../components/link.js'
import { PageHead } from '../components/page-head.js'
import { site, type Accent } from '../lib/site.js'

const STORY: readonly (readonly [string, string])[] = [
  [
    'Why we exist',
    'Bad software costs you more than time. A cluttered screen at the end of a long day, a form that loses your work, an app that pulls at your attention all evening — it wears you down in ways you stop noticing. We think the software you use daily should leave you better off than it found you. So we build tools that are clear, dependable and genuinely useful, for as many people as we can reach.',
  ],
  [
    "What we're making",
    'A notes app, a task monster, the systems small businesses run on, and a few games. Different products, built to the same standard.',
  ],
]

const FACTS: readonly (readonly [string, string])[] = [
  ['Founded', '2026'],
  ['Team', 'Small on purpose'],
  ['Built for', 'Desktop, mobile, web'],
  ['Status', 'In development'],
]

const VALUES: readonly { title: string; accent: Accent; blurb: string }[] = [
  {
    title: 'Undistracting',
    accent: 'sage',
    blurb: 'Nothing moves unless you moved it. No streaks to keep, no nudges, no red dots for things that can wait.',
  },
  {
    title: 'Legible',
    accent: 'sky',
    blurb: 'Text you can read without leaning in — comfortable sizes, generous spacing, lines that never run too long.',
  },
  {
    title: 'Durable',
    accent: 'butter',
    blurb: 'Your work stays yours. Open file formats, exports that actually work, and nothing held hostage to keep you subscribed.',
  },
  {
    title: 'Honest',
    accent: 'clay',
    blurb: "Plain language, plain pricing, and no invented urgency. If something isn't ready, we'll say so.",
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
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '24px', padding: '12px 0', maxWidth: '30ch' }}>
              <span class="small" safe>
                {key}
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: '700' }} safe>
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
            style={`background:var(--${value.accent}-100);border-radius:var(--radius-lg);padding:clamp(22px,2.2vw,32px)`}
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
        }}
      >
        <h2 class="h-md">Work with us, or just say hello</h2>
        <p class="body" style={{ marginTop: '12px' }}>
          Our open source projects are available on{' '}
          <Link class="linked" href={site.github}>
            GitHub
          </Link>
          , and we write about whatever we're thinking through on the{' '}
          <Link class="linked" href="/blog/">
            blog
          </Link>
          . Got something you want built, or an idea worth collaborating on? Get in touch.
        </p>
        <div style={{ marginTop: '24px' }}>
          <ButtonLink href={`mailto:${site.email}`}>{site.email}</ButtonLink>
        </div>
      </div>
    </section>
  )
}

export function AboutPage(): JSX.Element {
  return (
    <Document
      title="About — Magnific Labs"
      description="How Magnific Labs works: foundations first, accessibility built in, products shaped around their job."
      active="About"
      path="/about/"
    >
      <PageHead
        eyebrow="About"
        title="We build software worth keeping."
        lead="Magnific Labs is a small independent studio making tools for the job at hand — and games for when it's done. Different products, the same craft in every one of them."
      />
      <Story />
      <Values />
      <WorkWithUs />
    </Document>
  )
}
