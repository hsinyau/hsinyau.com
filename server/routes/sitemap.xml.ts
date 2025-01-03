import { serverQueryContent } from '#content/server'
import { SitemapStream, streamToPromise } from 'sitemap'

export default defineEventHandler(async (event) => {
  const { site } = useAppConfig()
  const staticRoutes = ['/', '/about', '/projects', '/friends', '/collection']
  // Fetch all documents
  const docs = await serverQueryContent(event, 'posts').sort({ created: -1 }).find()

  const sitemap = new SitemapStream({
    hostname: site.domain,
  })

  for (const doc of staticRoutes) {
    sitemap.write({
      url: doc,
      changefreq: 'daily',
    })
  }

  for (const doc of docs) {
    sitemap.write({
      url: doc._path,
      lastmod: doc.created.slice(0, 10),
      changefreq: 'daily',
    })
  }
  sitemap.end()

  return streamToPromise(sitemap)
})
