import { existsSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const SRC_DIR = dirname(dirname(fileURLToPath(import.meta.url)))
export const ROOT_DIR = dirname(SRC_DIR)

export const CONTENT_DIR = join(SRC_DIR, 'content')
export const STYLES_DIR = join(SRC_DIR, 'styles')
export const PUBLIC_DIR = join(ROOT_DIR, 'public')
export const DIST_DIR = join(ROOT_DIR, 'dist')

/**
 * The vendored design system lives in `_ds/<name>-<uuid>/` — the uuid changes
 * whenever it is regenerated, so resolve it by scanning instead of hardcoding.
 */
export function designSystemDir(): string {
  const vendor = join(ROOT_DIR, '_ds')
  if (!existsSync(vendor)) throw new Error(`design system not found at ${vendor}`)

  const dirs = readdirSync(vendor, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort()

  const first = dirs[0]
  if (!first) throw new Error(`no design system directory inside ${vendor}`)
  if (dirs.length > 1) {
    console.warn(`[styles] multiple design systems in _ds/, using "${first}"`)
  }
  return resolve(vendor, first)
}
