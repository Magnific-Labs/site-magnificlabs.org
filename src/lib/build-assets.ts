import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import type { Assets } from './assets.js'
import { bundleStyles } from './styles.js'
import { SRC_DIR } from './paths.js'

const require = createRequire(import.meta.url)

/** Short content hash — long enough to be unique, short enough to read. */
const hash = (content: string | Buffer): string =>
  createHash('sha256').update(content).digest('hex').slice(0, 10)

async function emit(outDir: string, template: string, content: string | Buffer): Promise<string> {
  const relative = template.replace('[hash]', hash(content))
  const target = join(outDir, relative)
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, content)
  return `/${relative}`
}

/**
 * Writes the stylesheet, client script and htmx into `outDir` under
 * content-hashed names, and returns their URLs.
 *
 * Hashed filenames are what make the long immutable cache headers safe: a
 * changed file is a changed URL, so a deploy can never serve a stale asset.
 */
export async function writeAssets(outDir: string): Promise<Assets> {
  const { css, fontHref } = await bundleStyles()
  const script = await readFile(join(SRC_DIR, 'scripts', 'site.js'))
  const analytics = await readFile(join(SRC_DIR, 'scripts', 'analytics.js'))
  const htmx = await readFile(require.resolve('htmx.org/dist/htmx.min.js'))

  const [cssHref, jsHref, htmxHref, analyticsHref] = await Promise.all([
    emit(outDir, 'styles/site.[hash].css', css),
    emit(outDir, 'scripts/site.[hash].js', script),
    emit(outDir, 'vendor/htmx.[hash].js', htmx),
    emit(outDir, 'scripts/analytics.[hash].js', analytics),
  ])

  return { cssHref, jsHref, htmxHref, analyticsHref, fontHref }
}
