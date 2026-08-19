import { Html } from '@kitajs/html'
import { ArticleBody } from '../components/article.js'
import { Badge } from '../components/ds/index.js'
import { Document } from '../components/layout.js'
import { Link } from '../components/link.js'
import { PageHead } from '../components/page-head.js'
import { postHref, type Post } from '../lib/posts.js'
import { formatDate, TONE } from '../lib/site.js'

export function PostPage({ post }: { post: Post }): JSX.Element {
  return (
    <Document
      title={`${post.title} — Magnific Labs`}
      description={post.summary}
      active="Blog"
      path={postHref(post.slug)}
    >
      <PageHead eyebrow="Blog" title={post.title} lead={post.summary} />

      <section class="wrap" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <Badge tone={TONE[post.tone]}>{Html.escapeHtml(post.tag)}</Badge>
        <span class="small" safe>
          {formatDate(post.date)}
        </span>
        <Link class="linked small" href="/blog/" style={{ marginLeft: 'auto', fontWeight: '700' }}>
          ← All posts
        </Link>
      </section>

      <ArticleBody headings={post.headings} safeHtml={post.html} />
    </Document>
  )
}
