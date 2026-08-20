import { Html } from '@kitajs/html'
import { Badge, Card } from './ds/index.js'
import { Link } from './link.js'
import { postHref, type Post } from '../lib/posts.js'
import { formatDate, TONE } from '../lib/site.js'

export interface PostCardProps {
  post: Post
  /**
   * Heading level for the title. The blog index puts these directly under its
   * `h1`, so they are `h2` there; the home page nests them under a "From the
   * blog" `h2`, so they are `h3`. Getting this wrong skips a heading level.
   */
  level?: 2 | 3
}

/** A single blog post summary, used on the home page and the blog index. */
export function PostCard({ post, level = 3 }: PostCardProps): JSX.Element {
  return (
    <Link class="postlink reveal" href={postHref(post.slug)}>
      <Card>
        <div class="postcard-in">
          <div class="col" style={{ gap: '10px' }}>
            {level === 2 ? (
              <h2 class="h-md" safe>
                {post.title}
              </h2>
            ) : (
              <h3 class="h-md" safe>
                {post.title}
              </h3>
            )}
            <p class="body" style={{ fontSize: 'var(--text-base)', maxWidth: '56ch' }} safe>
              {post.summary}
            </p>
          </div>
          <div class="col" style={{ gap: '10px', alignItems: 'flex-start' }}>
            <Badge tone={TONE[post.tone]}>{Html.escapeHtml(post.tag)}</Badge>
            <span class="small" safe>
              {formatDate(post.date)}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
