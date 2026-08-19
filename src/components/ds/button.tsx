import type { PropsWithChildren } from '@kitajs/html'
import { Link } from '../link.js'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonLinkProps {
  href: string
  variant?: ButtonVariant
  size?: ButtonSize
}

/**
 * Design-system Button rendered as an anchor.
 *
 * Every button on this site navigates somewhere, so an `<a>` is the correct
 * element: it works without JavaScript, supports middle-click and
 * open-in-new-tab, and is announced as a link by assistive technology.
 */
export function ButtonLink({
  href,
  variant = 'primary',
  size = 'lg',
  children,
}: PropsWithChildren<ButtonLinkProps>): JSX.Element {
  return (
    <Link class={`btn btn-${size} btn-${variant}`} href={href}>
      {children}
    </Link>
  )
}
