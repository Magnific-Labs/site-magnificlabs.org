import { AboutPage } from './pages/about.js'
import { BlogFilter, BlogPage, tagFragmentHref, tagHref } from './pages/blog.js'
import { ContactPage } from './pages/contact.js'
import { HomePage } from './pages/home.js'
import { LegalPage } from './pages/legal.js'
import { PostPage } from './pages/post.js'
import { loadLegal, loadPosts, postHref, postTags, type LegalName } from './lib/posts.js'

/** The legal pages are identical in shape, so they are data rather than code. */
const LEGAL: readonly { name: LegalName; title: string; description: string; lead: string }[] = [
  {
    name: 'privacy',
    title: 'Privacy policy',
    description: 'What magnificlabs.org collects, and what happens when you email us.',
    lead: 'No accounts and no advertising business. What we measure, why, and how to opt out.',
  },
  {
    name: 'terms',
    title: 'Terms & conditions',
    description: 'Terms covering use of magnificlabs.org and our published content.',
    lead: 'Plain terms for using this site and quoting what we publish.',
  },
]

export interface Route {
  /** URL the route is served at. */
  readonly path: string
  /** Path written under `dist/`, relative and without a leading slash. */
  readonly file: string
  /** True for full HTML pages; false for htmx fragments. */
  readonly page: boolean
  readonly render: () => Promise<string>
}

const page = (path: string, render: () => Promise<string>): Route => ({
  path,
  // "/" -> index.html, "/about/" -> about/index.html
  file: path === '/' ? 'index.html' : `${path.replace(/^\/|\/$/g, '')}/index.html`,
  page: true,
  render,
})

const fragment = (path: string, render: () => Promise<string>): Route => ({
  path,
  file: path.replace(/^\//, ''),
  page: false,
  render,
})

/**
 * Every URL the site publishes, in one list.
 *
 * The dev server registers these as Fastify handlers and the prerenderer walks
 * the same list writing files — so the two can never drift apart.
 */
export async function buildRoutes(): Promise<readonly Route[]> {
  const posts = await loadPosts()
  const tags = postTags(posts)

  const routes: Route[] = [
    page('/', async () => HomePage()),
    page('/about/', async () => AboutPage()),
    page('/contact/', async () => ContactPage()),
    page('/blog/', async () => BlogPage({ posts })),

  ]

  for (const doc of LEGAL) {
    const path = `/${doc.name}/`
    routes.push(
      page(path, async () =>
        LegalPage({
          doc: await loadLegal(doc.name),
          title: doc.title,
          description: doc.description,
          lead: doc.lead,
          path,
        }),
      ),
    )
  }

  for (const post of posts) {
    routes.push(page(postHref(post.slug), async () => PostPage({ post })))
  }

  // One page and one htmx fragment per tag, plus the unfiltered fragment.
  routes.push(fragment(tagFragmentHref(undefined), async () => BlogFilter({ posts, activeTag: undefined })))
  for (const tag of tags) {
    routes.push(page(tagHref(tag), async () => BlogPage({ posts, activeTag: tag })))
    routes.push(fragment(tagFragmentHref(tag), async () => BlogFilter({ posts, activeTag: tag })))
  }

  return routes
}
