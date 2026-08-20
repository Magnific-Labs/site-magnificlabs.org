import { Html } from '@kitajs/html'
import { Document } from '../components/layout.js'
import { Link } from '../components/link.js'
import { PageHead } from '../components/page-head.js'
import { PostCard } from '../components/post-card.js'
import { slugify } from '../lib/markdown.js'
import { postTags, type Post } from '../lib/posts.js'

/** Page a tag filter is published at. `undefined` is the unfiltered index. */
export const tagHref = (tag: string | undefined): string => (tag ? `/blog/tag/${slugify(tag)}/` : '/blog/')

/** Fragment htmx fetches for a tag. Prerendered as a real file. */
export const tagFragmentHref = (tag: string | undefined): string => `/partials/blog/${tag ? slugify(tag) : 'all'}.html`

const ALL = 'All'

interface FilterProps {
  posts: readonly Post[]
  /** `undefined` means no filter. */
  activeTag: string | undefined
}

/**
 * Tag pills plus the matching post list.
 *
 * The pills are ordinary links to prerendered pages, so filtering works with
 * JavaScript disabled and every filter has a shareable URL. htmx upgrades them
 * to swap just this region and push the same URL, avoiding a full page load.
 */
export function BlogFilter({ posts, activeTag }: FilterProps): JSX.Element {
  const tags = [ALL, ...postTags(posts)]
  const shown = activeTag ? posts.filter((p) => p.tag === activeTag) : posts

  return (
    <>
      <div class="reveal" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: 'clamp(20px,3vw,36px)' }}>
        {tags.map((tag) => {
          const isAll = tag === ALL
          const target = isAll ? undefined : tag
          const isActive = isAll ? activeTag === undefined : activeTag === tag
          return (
            <Link
              class="pill pill-filter"
              href={tagHref(target)}
              aria-current={isActive ? 'page' : undefined}
              hx-get={tagFragmentHref(target)}
              hx-target="#blog-filter"
              hx-swap="innerHTML"
              hx-push-url={tagHref(target)}
              hx-indicator="#blog-filter"
            >
              {Html.escapeHtml(tag)}
            </Link>
          )
        })}
      </div>
      <div class="postlist">
        {shown.map((post) => (
          <PostCard post={post} level={2} />
        ))}
      </div>
    </>
  )
}

interface BlogPageProps {
  posts: readonly Post[]
  activeTag?: string | undefined
}

export function BlogPage({ posts, activeTag }: BlogPageProps): JSX.Element {
  const title = activeTag ? `${activeTag} — Blog — Magnific Labs` : 'Blog — Magnific Labs'

  return (
    <Document
      title={title}
      description="Notes from the workshop: type, contrast, motion and the decisions we make early."
      active="Blog"
      path={tagHref(activeTag)}
    >
      <PageHead
        eyebrow="Blog"
        title="Notes from the workshop"
        lead="Whatever we're thinking through — design, engineering, the odd tangent, and how the work is going."
      />
      <section class="wrap sec" style={{ paddingTop: '0' }}>
        <div id="blog-filter">
          <BlogFilter posts={posts} activeTag={activeTag} />
        </div>
        <p class="small" style={{ marginTop: '32px' }}>
          Posts are written in Markdown and live in <code>src/content/posts/</code> — add a file with frontmatter and it
          appears here.
        </p>
      </section>
    </Document>
  )
}
