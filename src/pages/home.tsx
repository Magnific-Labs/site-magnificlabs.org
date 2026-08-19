import { Html } from '@kitajs/html'
import { ButtonLink, Badge } from '../components/ds/index.js'
import { Document } from '../components/layout.js'
import { Link } from '../components/link.js'
import { PostCard } from '../components/post-card.js'
import { loadPosts, type Post } from '../lib/posts.js'
import { site, TONE, type Accent } from '../lib/site.js'

const PRINCIPLES: readonly (readonly [string, string])[] = [
  [
    'Quiet by default',
    "No unnecessary pings, badges, or interruptions. Our work tools stay quietly out of your way, and our games only ask for attention when you're ready to play.",
  ],
  [
    'Effortless reading',
    "We use comfortable text sizes and spacing on every screen. You'll never have to squint, whether you're using a phone, a laptop, or an ultrawide monitor.",
  ],
  [
    'Crystal clear contrast',
    "We don't guess when it comes to visibility. Every color pairing is strictly tested so that text always stands out clearly from its background for everyone.",
  ],
  [
    'Built for every input',
    'Whether you use a mouse, a touch screen, or a keyboard, you can navigate seamlessly. Every button is easy to reach, simple to highlight, and large enough to tap.',
  ],
  [
    'Motion on your terms',
    'Animations are fast and subtle to avoid distractions. If your device is set to reduce motion, our animations disappear entirely.',
  ],
]

interface Area {
  readonly title: string
  readonly accent: Accent
  readonly label: string
  readonly blurb: string
}

const AREAS: readonly Area[] = [
  {
    title: 'Everyday tools',
    accent: 'sage',
    label: 'Tools',
    blurb: 'Notes, tasks and the small apps you open every day. Simple by design — plain text, nothing to file, nothing to save.',
  },
  {
    title: 'Business systems',
    accent: 'sky',
    label: 'Business',
    blurb: 'E-commerce, inventory, invoicing and the ERPs that hold a company together, without the enterprise weight.',
  },
  {
    title: 'Developer platforms',
    accent: 'lavender',
    label: 'Engineering',
    blurb: 'Internal tools, dashboards and services for the people shipping the product. Keyboard-first, fast, out of the way.',
  },
  {
    title: 'Games',
    accent: 'butter',
    label: 'Play',
    blurb: 'Small, unserious games with minutes of explosive fun. Play with no restraints.',
  },
]

function Hero(): JSX.Element {
  return (
    <section class="wrap" style={{ padding: 'clamp(56px,9vh,132px) 0 clamp(48px,7vh,104px)' }}>
      <div class="eyebrow reveal" style={{ marginBottom: '20px' }}>
        Independent software studio
      </div>
      <h1 class="h-xl reveal" style={{ maxWidth: '16ch' }}>
        Made to be lived with.
      </h1>
      <p class="lead reveal" style={{ marginTop: '24px' }}>
        We're building tailored software for the job at hand—and exciting games for when it's done.
      </p>
      <div class="reveal" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '36px' }}>
        <ButtonLink href="/blog/">Read the blog</ButtonLink>
        <ButtonLink href="/contact/" variant="ghost">
          Say hello
        </ButtonLink>
      </div>
      <p class="small reveal" style={{ marginTop: '28px' }}>
        Mac, Windows, Linux, iOS, Android, web and many more! Different shapes, same instincts.
      </p>
    </section>
  )
}

function Principles(): JSX.Element {
  return (
    <section id="principles" class="wrap sec split">
      <div class="pin">
        <h2 class="h-lg">What every product owes you</h2>
        <p class="body" style={{ marginTop: '18px', maxWidth: '34ch' }}>
          While every tool and game we build has its own unique personality, our baseline standards never change. We
          guarantee these five principles before we write a single line of code.
        </p>
        <Link class="linked" href="/about/" style={{ marginTop: '20px', display: 'inline-block', fontWeight: '700' }}>
          More about the studio →
        </Link>
      </div>
      <div class="col" style={{ gap: 'clamp(28px,3.5vw,56px)' }}>
        {PRINCIPLES.map(([title, blurb], i) => {
          // A loop counter cannot carry markup; named `safe` so the XSS scanner agrees.
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

function Work(): JSX.Element {
  return (
    <section id="work" class="wrap sec">
      <div class="reveal col" style={{ gap: '14px', marginBottom: 'clamp(28px,4vw,56px)' }}>
        <h2 class="h-lg">What we work on</h2>
        <p class="body">
          Four kinds of software we build ourselves and take on with partners. If your project looks like one of these,
          we'd like to hear about it.
        </p>
      </div>
      <div class="stack">
        {AREAS.map((area, i) => (
          <article class="card" style={`--i:${String(i)};background:var(--${area.accent}-100)`}>
            <div style={{ marginBottom: '20px' }}>
              <Badge tone={TONE[area.accent]}>{Html.escapeHtml(area.label)}</Badge>
            </div>
            <h3
              class="h-lg"
              style={`font-size:clamp(24px,2.6vw,36px);color:var(--${area.accent}-700)`}
              safe
            >
              {area.title}
            </h3>
            <p class="body" style={{ marginTop: '14px', maxWidth: '44ch', color: 'var(--ink-700)' }} safe>
              {area.blurb}
            </p>
          </article>
        ))}
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
        }}
      >
        <h2 class="h-lg" style={{ color: 'var(--brand-700)', maxWidth: '20ch' }}>
          Want to hear when something ships?
        </h2>
        <p class="body" style={{ marginTop: '16px', maxWidth: '46ch' }}>
          One email, no schedule, nothing else. Write to us and we'll add you — or just tell us what you're trying to
          make work. More ways to reach us on the{' '}
          <Link class="linked" href="/contact/">
            contact page
          </Link>
          .
        </p>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '28px' }}>
          <ButtonLink href={`mailto:${site.email}`}>{site.email}</ButtonLink>
          <ButtonLink href={site.github} variant="ghost">
            Follow on GitHub
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
      title="Magnific Labs — made to be lived with"
      description="Independent software studio building thoughtful, accessible cross-platform tools."
      active="Home"
      path="/"
    >
      <Hero />
      <Principles />
      <Work />
      <LatestWriting posts={posts} />
      <Closing />
    </Document>
  )
}
