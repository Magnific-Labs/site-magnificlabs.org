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
          We use cookies for analytics, to understand how this site is used. Nothing we collect identifies you.{' '}
          <Link class="linked" href="/privacy/">
            Privacy policy
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
