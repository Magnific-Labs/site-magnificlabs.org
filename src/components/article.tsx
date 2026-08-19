import type { Heading } from '../lib/markdown.js'
import { Toc } from './toc.js'

export interface ArticleBodyProps {
  headings: readonly Heading[]
  /**
   * Rendered markdown HTML.
   *
   * The `safeHtml` name is a contract, not decoration: the XSS scanner treats a
   * `safe`-prefixed value as vetted, so only pass output of `renderMarkdown`,
   * which runs markdown-it with `html: false` and therefore escapes any raw
   * markup in the source before it reaches here.
   */
  safeHtml: string
}

/**
 * Table of contents beside a column of prose — the body shared by blog posts
 * and the legal pages.
 */
export function ArticleBody({ headings, safeHtml }: ArticleBodyProps): JSX.Element {
  return (
    <section class="wrap sec split" style={{ paddingTop: 'clamp(16px,2vw,32px)' }}>
      <Toc headings={headings} />
      <div>
        <div class="prose">{safeHtml}</div>
      </div>
    </section>
  )
}
