import fastifyStatic from '@fastify/static'
import { fastifyKitaHtml } from '@kitajs/fastify-html-plugin'
import Fastify from 'fastify'
import { setAssets } from './lib/assets.js'
import { writeAssets } from './lib/build-assets.js'
import { DIST_DIR, PUBLIC_DIR } from './lib/paths.js'
import { clearPostsCache } from './lib/posts.js'
import { buildRoutes } from './routes.js'

/**
 * Development server.
 *
 * Renders every request fresh so content and component edits show up on
 * reload, and serves the same built assets and `public/` files the deployed
 * site uses. Production is prerendered — see `src/prerender.ts`.
 *
 * Adding a *new* markdown post creates a new route, which needs a restart;
 * editing an existing one does not.
 */
const app = Fastify({ logger: true })

await app.register(fastifyKitaHtml)

// Assets are content-hashed, so they must exist on disk before pages render.
setAssets(await writeAssets(DIST_DIR))

await app.register(fastifyStatic, { root: [PUBLIC_DIR, DIST_DIR] })

/** Re-reads content and re-renders, so edits need no restart. */
async function renderFresh(path: string): Promise<string> {
  clearPostsCache()
  const route = (await buildRoutes()).find((r) => r.path === path)
  if (!route) throw new Error(`route no longer exists: ${path}`)
  return route.render()
}

// Registered explicitly so they take precedence over the static wildcard.
for (const route of await buildRoutes()) {
  app.get(route.path, async (_request, reply) => reply.html(await renderFresh(route.path)))
}

const port = Number(process.env['PORT'] ?? 3000)
await app.listen({ port, host: '127.0.0.1' })
