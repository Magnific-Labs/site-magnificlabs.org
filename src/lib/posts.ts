import { readdir, readFile } from 'node:fs/promises'
import { basename, join } from 'node:path'
import matter from 'gray-matter'
import { renderMarkdown, type Heading, type RenderedMarkdown } from './markdown.js'
import { CONTENT_DIR } from './paths.js'
import type { Accent } from './site.js'

export interface Post {
  readonly slug: string
  readonly title: string
  /** ISO date, e.g. "2026-06-15". */
  readonly date: string
  readonly tag: string
  readonly tone: Accent
  readonly summary: string
  readonly html: string
  readonly headings: readonly Heading[]
}

/** Path a post is published at. */
export const postHref = (slug: string): string => `/blog/${slug}/`

const POSTS_DIR = join(CONTENT_DIR, 'posts')

function parsePost(slug: string, raw: string): Post {
  const { data, content } = matter(raw)
  const need = (key: string): string => {
    const value = data[key]
    if (typeof value !== 'string' || value === '') {
      throw new Error(`content/posts/${slug}.md: frontmatter is missing "${key}"`)
    }
    return value
  }

  const { html, headings } = renderMarkdown(content)
  return {
    slug,
    title: need('title'),
    date: need('date'),
    tag: need('tag'),
    tone: need('tone') as Accent,
    summary: need('summary'),
    html,
    headings,
  }
}

let cache: readonly Post[] | undefined

/** Drops the cache so the dev server picks up markdown edits without a restart. */
export function clearPostsCache(): void {
  cache = undefined
}

/** All posts, newest first. Reads the content directory once per process. */
export async function loadPosts(): Promise<readonly Post[]> {
  if (cache) return cache

  const files = (await readdir(POSTS_DIR)).filter((f) => f.endsWith('.md'))
  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = basename(file, '.md')
      return parsePost(slug, await readFile(join(POSTS_DIR, file), 'utf8'))
    }),
  )

  cache = posts.sort((a, b) => b.date.localeCompare(a.date))
  return cache
}

/** Distinct post tags in first-published order, for the blog filter. */
export function postTags(posts: readonly Post[]): readonly string[] {
  return [...new Set(posts.map((p) => p.tag))]
}

export type LegalName = 'privacy' | 'terms'

export async function loadLegal(name: LegalName): Promise<RenderedMarkdown> {
  const raw = await readFile(join(CONTENT_DIR, 'legal', `${name}.md`), 'utf8')
  return renderMarkdown(raw)
}
