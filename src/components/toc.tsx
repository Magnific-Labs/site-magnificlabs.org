import type { Heading } from '../lib/markdown.js'

/**
 * On-this-page navigation. Rendered server-side; the active item is tracked by
 * scroll position in the client script. Hidden when there is little to index.
 */
export function Toc({ headings }: { headings: readonly Heading[] }): JSX.Element | null {
  if (headings.length < 2) return null

  return (
    <nav class="toc pin" aria-label="On this page">
      <div class="eyebrow" style={{ marginBottom: '10px' }}>
        On this page
      </div>
      {headings.map((heading) => (
        <a href={`#${heading.id}`} safe>
          {heading.text}
        </a>
      ))}
    </nav>
  )
}
