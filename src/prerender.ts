import { cp, mkdir, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { setAssets } from './lib/assets.js'
import { writeAssets } from './lib/build-assets.js'
import { DIST_DIR, PUBLIC_DIR } from './lib/paths.js'
import { site } from './lib/site.js'
import { buildRoutes } from './routes.js'

/**
 * Builds the static site into `dist/`.
 *
 * Walks the same route table the dev server uses, renders each entry with
 * KitaJS and writes it to disk. The output is plain HTML with no runtime
 * dependency on Node — Firebase Hosting serves it directly.
 */

const started = Date.now()

async function emit(relativePath: string, body: string): Promise<void> {
  const target = join(DIST_DIR, relativePath)
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, body, 'utf8')
}

await rm(DIST_DIR, { recursive: true, force: true })
await mkdir(DIST_DIR, { recursive: true })

setAssets(await writeAssets(DIST_DIR))

// Static files (images, favicon) are copied through untouched.
await cp(PUBLIC_DIR, DIST_DIR, { recursive: true })

const routes = await buildRoutes()
let pages = 0
let fragments = 0

for (const route of routes) {
  await emit(route.file, await route.render())
  if (route.page) pages++
  else fragments++
}

// A 404 that keeps the site's chrome. Firebase serves this for unknown paths.
const notFound = routes.find((r) => r.path === '/')
if (notFound) {
  await emit(
    '404.html',
    (await notFound.render())
      .replace('<title>Magnific Labs — made to be lived with</title>', '<title>Page not found — Magnific Labs</title>'),
  )
}

const pageRoutes = routes.filter((r) => r.page)

await emit(
  'sitemap.xml',
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...pageRoutes.map((r) => `  <url><loc>${new URL(r.path, site.url).href}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n'),
)

await emit('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', site.url).href}\n`)

console.log(
  `built ${String(pages)} pages + ${String(fragments)} htmx fragments -> dist/ in ${String(Date.now() - started)}ms`,
)
for (const route of pageRoutes) console.log(`  ${route.path.padEnd(38)} ${route.file}`)
