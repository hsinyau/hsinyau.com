import { serverQueryContent } from '#content/server'
import { SitemapStream, streamToPromise } from 'sitemap'

export default defineEventHandler(async (event) => {
  const { site } = useAppConfig()
  const staticRoutes = ['/', '/about', '/uses', '/projects', '/friends', '/collection']
  // Fetch all documents
  const docs = await serverQueryContent(event, 'posts').find()

  const sitemap = new SitemapStream({
    hostname: site.domain,
  })

  for (const doc of staticRoutes) {
    sitemap.write({
      url: doc,
      priority: doc === '/' ? 1 : 0.8,
    })
  }

  for (const doc of docs) {
    sitemap.write({
      url: doc._path,
      lastmod: doc.created.slice(0, 10),
      priority: 0.6,
    })
  }
  sitemap.end()

  return streamToPromise(sitemap)
})
