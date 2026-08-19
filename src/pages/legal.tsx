import { ArticleBody } from '../components/article.js'
import { Document } from '../components/layout.js'
import { PageHead } from '../components/page-head.js'
import type { RenderedMarkdown } from '../lib/markdown.js'

export interface LegalPageProps {
  doc: RenderedMarkdown
  title: string
  description: string
  lead: string
  path: string
}

/** Privacy policy and terms — same shape, different markdown. */
export function LegalPage({ doc, title, description, lead, path }: LegalPageProps): JSX.Element {
  return (
    <Document title={`${title} — Magnific Labs`} description={description} path={path}>
      <PageHead eyebrow="Legal" title={title} lead={lead} />
      <ArticleBody headings={doc.headings} safeHtml={doc.html} />
    </Document>
  )
}
