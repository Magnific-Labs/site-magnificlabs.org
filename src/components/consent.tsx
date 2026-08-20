import { Link } from './link.js'

/**
 * Analytics consent notice.
 *
 * Rendered hidden on every page; the client script reveals it only when no
 * choice has been stored yet. That ordering matters — with JavaScript off the
 * banner never appears and analytics never loads, which is the correct outcome
 * rather than a broken one.
 *
 * Decline is a real button beside Accept, not a dismiss affordance: consent
 * that cannot be refused is not consent.
 */
export function ConsentBanner(): JSX.Element {
  return (
    <section id="consent" class="consent" hidden aria-label="Analytics consent">
      <div class="wrap consent-in">
        <p class="small consent-text">
          We'd like to count page views — which pages, how many, nothing that identifies you. That takes one cookie.
          Decline and nothing is stored.{' '}
          <Link class="linked" href="/privacy/">
            What we collect
          </Link>
          .
        </p>
        <div class="consent-actions">
          <button type="button" class="btn btn-md btn-ghost" data-consent="denied">
            Decline
          </button>
          <button type="button" class="btn btn-md btn-primary" data-consent="granted">
            Accept
          </button>
        </div>
      </div>
    </section>
  )
}
