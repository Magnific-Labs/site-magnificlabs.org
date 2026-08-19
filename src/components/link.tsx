import type { PropsWithChildren } from '@kitajs/html'

type AnchorProps = JSX.IntrinsicElements['a']

/** True for anything with a URL scheme or protocol-relative host — mailto:, https:, //cdn. */
export const isExternalHref = (href: string): boolean => /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href)

/**
 * An anchor that opts out of htmx boosting when it does not point at a page on
 * this site. `hx-boost` is enabled on <body>, and boosting a `mailto:` or
 * cross-origin link would try to swap its response into the document.
 * Using this everywhere means no link can forget to opt out.
 */
export function Link({ href, children, ...rest }: PropsWithChildren<AnchorProps & { href: string }>): JSX.Element {
  return (
    <a href={href} hx-boost={isExternalHref(href) ? 'false' : undefined} {...rest}>
      {children}
    </a>
  )
}
