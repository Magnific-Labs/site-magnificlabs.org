import type { PropsWithChildren } from '@kitajs/html'

export type BadgeTone = 'neutral' | 'brand' | 'success' | 'info' | 'warning' | 'danger'

/** Design-system Badge. */
export function Badge({ tone = 'neutral', children }: PropsWithChildren<{ tone?: BadgeTone }>): JSX.Element {
  return <span class={`badge badge-${tone}`}>{children}</span>
}
