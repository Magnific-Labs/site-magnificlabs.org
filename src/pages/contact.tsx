import { Html } from '@kitajs/html'
import { Badge, ButtonLink } from '../components/ds/index.js'
import { Document } from '../components/layout.js'
import { Link } from '../components/link.js'
import { PageHead } from '../components/page-head.js'
import { site, TONE, type Accent } from '../lib/site.js'

interface Reason {
  readonly title: string
  readonly accent: Accent
  readonly blurb: string
  readonly subject: string
}

const REASONS: readonly Reason[] = [
  { title: 'Say hello', accent: 'sage', blurb: 'Questions, feedback, or nothing in particular.', subject: 'Hello' },
  { title: 'Early access', accent: 'sky', blurb: 'Ask to hear when the first thing ships.', subject: 'Early access' },
  {
    title: 'Work with us',
    accent: 'lavender',
    blurb: 'Design, engineering, accessibility testing.',
    subject: 'Working together',
  },
  {
    title: 'Report a problem',
    accent: 'clay',
    blurb: 'Something broken, unclear, or inaccessible.',
    subject: 'Problem report',
  },
]

export function ContactPage(): JSX.Element {
  return (
    <Document
      title="Contact — Magnific Labs"
      description="Write to hello@magnificlabs.org — questions, early access, working together."
      active="Contact"
      path="/contact/"
    >
      <PageHead
        eyebrow="Contact"
        title="One address, no forms."
        lead="Everything — questions, early access, bug reports, working together — goes to the same inbox."
      />

      <section class="wrap" style={{ paddingBottom: 'clamp(24px,3vw,40px)' }}>
        <div
          class="reveal"
          style={{
            background: 'var(--brand-100)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(28px,4vw,64px)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div class="col" style={{ gap: '10px' }}>
            <span class="eyebrow">Email</span>
            <Link
              class="h-lg"
              href={`mailto:${site.email}`}
              style={{ fontSize: 'clamp(24px,2.8vw,38px)', color: 'var(--brand-700)', wordBreak: 'break-word' }}
            >
              {site.email}
            </Link>
            <p class="small" style={{ color: 'var(--brand-700)' }}>
              We read everything and typically reply within one business day.
            </p>
          </div>
          <ButtonLink href={site.github}>GitHub organisation</ButtonLink>
        </div>
      </section>

      <section class="wrap sec" style={{ paddingTop: '0' }}>
        <h2 class="h-lg reveal" style={{ marginBottom: 'clamp(20px,2.5vw,36px)' }}>
          Pick a subject, or don't
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))',
            gap: 'clamp(12px,1.5vw,20px)',
          }}
        >
          {REASONS.map((reason) => (
            <Link
              class="reveal"
              href={`mailto:${site.email}?subject=${encodeURIComponent(reason.subject)}`}
              style={{
                background: 'var(--paper-0)',
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(22px,2.2vw,32px)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <span style={{ alignSelf: 'flex-start' }}>
                <Badge tone={TONE[reason.accent]}>{Html.escapeHtml(reason.title)}</Badge>
              </span>
              <span class="body" style={{ fontSize: 'var(--text-base)' }} safe>
                {reason.blurb}
              </span>
            </Link>
          ))}
        </div>
        <p class="body" style={{ marginTop: 'clamp(28px,3vw,48px)' }}>
          We don't run a support phone line or a chat widget. Email is the whole system — see the{' '}
          <Link class="linked" href="/privacy/">
            privacy policy
          </Link>{' '}
          for what happens to what you send us.
        </p>
      </section>
    </Document>
  )
}
