import { Html } from '@kitajs/html'
import { ButtonLink, Badge } from '../components/ds/index.js'
import { Document } from '../components/layout.js'
import { Link } from '../components/link.js'
import { PostCard } from '../components/post-card.js'
import { loadPosts, type Post } from '../lib/posts.js'
import { site, TONE, type Accent } from '../lib/site.js'

const PRINCIPLES: readonly (readonly [string, string])[] = [
  [
    'End-user experience as the core priority',
    'Software exists for the human on the other side of the glass. We eliminate synthetic urgency, notification noise, and dark patterns. Every interaction is shaped to respect attention, battery, and mental clarity, making daily work feel calm and effortless.',
  ],
  [
    'Engineered to stand the test of time',
    'We reject disposable software culture and fragile dependency towers. We build on open file standards, deterministic data models, and local-first architectures designed to remain dependable and fully operational over decades, not quarters.',
  ],
  [
    'Uncompromising reliability & resilience',
    'Predictable state machines, instant sub-100ms response times, and graceful offline degradation. When a network connection drops or external services fail, the user never loses their data, their context, or their trust.',
  ],
  [
    'Universal accessibility from the foundation',
    'Every person deserves software they can comfortably read and navigate. High-contrast typography, generous 44px hit targets, and comprehensive keyboard navigation are verified in our automated build — never compromised or retrofitted as an afterthought.',
  ],
  [
    'Sensory respect & disciplined motion',
    'Transitions exist solely to communicate state and spatial orientation, never for theatrical vanity. All movement fits inside a strict 280ms ceiling and immediately collapses to static under prefers-reduced-motion to prevent vestibular fatigue.',
  ],
]

interface Practice {
  readonly title: string
  readonly accent: Accent
  readonly label: string
  readonly blurb: string
  readonly facets: readonly (readonly [string, string])[]
}

const PRACTICES: readonly Practice[] = [
  {
    title: 'Proprietary software, built to our own standard.',
    accent: 'lavender',
    label: 'In-House Pipeline',
    blurb:
      'We are developing a focused portfolio of independent software products across modern web, mobile, and native desktop platforms. We build with zero external pressure to rush compromises or sacrifice privacy, performance, and craft. Details remain confidential until each product is genuinely ready to live with.',
    facets: [
      ['Status', 'In active development (stealth)'],
      ['Reach', 'Web, mobile & native desktop'],
      ['Releases', 'Announced via blog when ready'],
    ],
  },
  {
    title: 'Consulting, architecture, and product engineering.',
    accent: 'sage',
    label: 'Client Practice',
    blurb:
      'We partner with founders and engineering leaders to design, architect, and ship production software. From high-performance web applications and distributed cloud systems to mobile apps and platform-native desktop clients.',
    facets: [
      ['Platforms', 'Web, iOS, Android, macOS, Windows, Linux'],
      ['Scope', 'Full-stack engineering & architecture'],
      ['Model', 'Direct senior engineering collaboration'],
    ],
  },
]

interface Discipline {
  readonly tag: string
  readonly title: string
  readonly blurb: string
}

const DISCIPLINES: readonly Discipline[] = [
  {
    tag: 'Web & Cloud',
    title: 'Modern Web Applications',
    blurb:
      'Fast, resilient web platforms and distributed services built with server-side speed, minimal script weight, clean API contracts, and predictable state.',
  },
  {
    tag: 'Mobile',
    title: 'iOS & Android Development',
    blurb:
      'High-polish mobile applications built with platform ergonomics, fluid gestures, battery consciousness, and robust offline-first synchronization.',
  },
  {
    tag: 'Desktop',
    title: 'Platform-Native Desktop',
    blurb:
      'Native desktop applications for macOS, Windows, and Linux. Built with deep system integrations, keyboard ergonomics, and low-latency local execution.',
  },
  {
    tag: 'Architecture',
    title: 'Cross-Platform Systems',
    blurb:
      'Shared-core architectures and unified application foundations that maintain high platform fidelity across mobile, desktop, and web surfaces without bloat.',
  },
  {
    tag: 'Full Lifecycle',
    title: 'End-to-End Product Engineering',
    blurb:
      'Turning ambitious product visions into production reality — from technical discovery, data modeling, and UX systems to automated CI/CD and deployment.',
  },
  {
    tag: 'Advisory',
    title: 'Architecture & Accessibility Audits',
    blurb:
      'Senior technical advisory, codebase reviews, performance profiling, and comprehensive WCAG accessibility audits for scaling engineering teams.',
  },
]

function Hero(): JSX.Element {
  return (
    <section class="wrap" style={{ padding: 'clamp(56px,9vh,124px) 0 clamp(48px,7vh,96px)' }}>
      <div class="status-badge reveal" style={{ marginBottom: '24px' }}>
        <span class="status-dot" />
        <span>Independent Studio · In-House Pipeline &amp; Client Engineering</span>
      </div>
      <h1 class="h-xl reveal" style={{ maxWidth: '16ch' }}>
        Software made to be lived with.
      </h1>
      <p class="lead reveal" style={{ marginTop: '24px' }}>
        We engineer proprietary software products in our own pipeline, and partner with companies to consult,
        architect, and build their most demanding systems.
      </p>
      <div class="reveal" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '36px' }}>
        <ButtonLink href="/contact/">Discuss a project</ButtonLink>
        <ButtonLink href="/blog/" variant="ghost">
          Read our writing
        </ButtonLink>
      </div>
      <p class="small reveal" style={{ marginTop: '28px', maxWidth: '62ch' }}>
        End-to-end product engineering across web platforms, mobile (iOS &amp; Android), platform-native desktop (macOS, Windows, Linux), and cross-platform systems.
      </p>
    </section>
  )
}

function Practices(): JSX.Element {
  return (
    <section id="practices" class="wrap sec">
      <div class="reveal col" style={{ gap: '14px', marginBottom: 'clamp(28px,4vw,56px)' }}>
        <h2 class="h-lg">How we work</h2>
        <p class="body">
          Two complementary disciplines under one roof, guided by the same unhurried standards of engineering and
          interface craft.
        </p>
      </div>
      <div class="stack">
        {PRACTICES.map((practice, i) => (
          <article
            class="pillar-card"
            style={`--i:${String(i)};background:var(--${practice.accent}-100)`}
          >
            <div style={{ marginBottom: '20px' }}>
              <Badge tone={TONE[practice.accent]}>{Html.escapeHtml(practice.label)}</Badge>
            </div>
            <h3
              class="h-lg"
              style={`font-size:clamp(24px,2.6vw,36px);color:var(--${practice.accent}-700)`}
              safe
            >
              {practice.title}
            </h3>
            <p class="body" style={{ marginTop: '14px', maxWidth: '52ch', color: 'var(--ink-700)' }} safe>
              {practice.blurb}
            </p>
            <div class="pillar-facets" style={`color:var(--${practice.accent}-700)`}>
              {practice.facets.map(([label, val]) => (
                <div class="pillar-facet">
                  <span class="pillar-facet-label" safe>
                    {label}
                  </span>
                  <span class="pillar-facet-val" safe>
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Capabilities(): JSX.Element {
  return (
    <section id="capabilities" class="wrap sec" style={{ paddingTop: '0' }}>
      <div class="reveal col" style={{ gap: '14px', marginBottom: 'clamp(28px,3.5vw,48px)' }}>
        <h2 class="h-lg">Application development &amp; product engineering</h2>
        <p class="body">
          We engineer software across the entire application spectrum — platform-native desktop, mobile, web, and cross-platform systems.
        </p>
      </div>
      <div class="feature-grid">
        {DISCIPLINES.map((item) => (
          <div class="feature-item reveal">
            <span class="feature-tag" safe>
              {item.tag}
            </span>
            <h3 class="h-md" style={{ color: 'var(--brand-700)', marginTop: '2px' }} safe>
              {item.title}
            </h3>
            <p class="body" style={{ fontSize: 'var(--text-base)' }} safe>
              {item.blurb}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Principles(): JSX.Element {
  return (
    <section id="principles" class="wrap sec split">
      <div class="pin">
        <h2 class="h-lg">What every system owes you</h2>
        <p class="body" style={{ marginTop: '18px', maxWidth: '34ch' }}>
          The end-user's experience is our non-negotiable priority. Whether building proprietary software in our
          pipeline or delivering mission-critical client systems, we hold every release to these five covenants —
          built to stand the test of time.
        </p>
        <Link class="linked" href="/about/" style={{ marginTop: '20px', display: 'inline-block', fontWeight: '700' }}>
          Our philosophy &amp; studio values →
        </Link>
      </div>
      <div class="col" style={{ gap: 'clamp(28px,3.5vw,56px)' }}>
        {PRINCIPLES.map(([title, blurb], i) => {
          const safeOrdinal = String(i + 1)
          return (
            <div class="reveal col" style={{ gap: '10px' }}>
              <span class="mono">0{safeOrdinal}</span>
              <h3 class="h-md" safe>
                {title}
              </h3>
              <p class="body" safe>
                {blurb}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function LatestWriting({ posts }: { posts: readonly Post[] }): JSX.Element {
  return (
    <section class="wrap sec">
      <div
        class="reveal"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: 'clamp(20px,3vw,40px)',
        }}
      >
        <h2 class="h-lg">From the blog</h2>
        <Link class="linked" href="/blog/" style={{ fontWeight: '700' }}>
          All posts
        </Link>
      </div>
      <div class="postlist">
        {posts.slice(0, 3).map((post) => (
          <PostCard post={post} />
        ))}
      </div>
    </section>
  )
}

function Closing(): JSX.Element {
  return (
    <section class="wrap" style={{ paddingBottom: 'clamp(24px,4vw,56px)' }}>
      <div
        class="soft reveal"
        style={{
          background: 'var(--brand-100)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(32px,4vw,64px)',
          boxShadow: 'none',
          border: '1px solid var(--surface-border)',
        }}
      >
        <h2 class="h-lg" style={{ color: 'var(--brand-700)', maxWidth: '24ch' }}>
          Have a project, or want to follow our work?
        </h2>
        <p class="body" style={{ marginTop: '16px', maxWidth: '48ch' }}>
          Whether you need senior engineering leadership on a critical build or want to hear when our proprietary
          products enter private preview, our inbox is open.
        </p>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '28px' }}>
          <ButtonLink href="/contact/">Discuss a project</ButtonLink>
          <ButtonLink href={`mailto:${site.email}`} variant="ghost">
            {site.email}
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}

export async function HomePage(): Promise<JSX.Element> {
  const posts = await loadPosts()

  return (
    <Document
      title="Magnific Labs — software made to be lived with"
      description="Independent software studio engineering proprietary products and consulting on ambitious client systems."
      active="Home"
      path="/"
    >
      <Hero />
      <Practices />
      <Capabilities />
      <Principles />
      <LatestWriting posts={posts} />
      <Closing />
    </Document>
  )
}
