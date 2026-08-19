import type { PropsWithChildren } from '@kitajs/html'

/** Design-system Card surface. */
export function Card({ children }: PropsWithChildren): JSX.Element {
  return <div class="ds-card">{children}</div>
}
