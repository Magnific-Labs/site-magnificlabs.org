import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'

/**
 * Matches the slug algorithm the original client-side renderer used, so
 * anchor links published before this refactor keep resolving.
 */
export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export interface Heading {
  readonly text: string
  readonly id: string
}

export interface RenderedMarkdown {
  readonly html: string
  readonly headings: readonly Heading[]
}

// `html: false` escapes any raw HTML in source, so authored markdown can never
// inject markup. Everything downstream can treat `html` as trusted.
//
// `linkify` and `typographer` are off deliberately. linkify turned bare domains
// in the legal pages into insecure `http://` links, and typographer rewrote
// apostrophes in the rendered heading but not in the table of contents, which
// takes its text from the token stream. Authors write explicit markdown links
// and their own punctuation instead.
const md: MarkdownIt = new MarkdownIt({
  html: false,
  linkify: false,
  typographer: false,
}).use(anchor, { slugify, level: [2, 3, 4] })

/** Renders markdown to HTML and extracts its `##` headings for the table of contents. */
export function renderMarkdown(source: string): RenderedMarkdown {
  const html = md.render(source)

  const tokens = md.parse(source, {})
  const headings: Heading[] = []
  tokens.forEach((token, i) => {
    if (token.type !== 'heading_open' || token.tag !== 'h2') return
    const inline = tokens[i + 1]
    if (inline?.type !== 'inline') return
    headings.push({ text: inline.content, id: slugify(inline.content) })
  })

  return { html, headings }
}
