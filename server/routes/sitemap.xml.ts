import { SitemapStream, streamToPromise } from 'sitemap'

export default defineEventHandler(async (event) => {
  const { site } = useAppConfig()
  const staticRoutes = ['/', 'posts', '/about', '/projects', '/friends', '/collection']
  const posts = await queryCollection(event, 'posts').order('created', 'DESC').all()

  const sitemap = new SitemapStream({
    hostname: site.domain,
  })

  for (const doc of staticRoutes) {
    sitemap.write({
      url: doc,
      changefreq: 'daily',
    })
  }

  for (const post of posts) {
    sitemap.write({
      url: post.path,
      lastmod: new Date(post.created),
      changefreq: 'daily',
    })
  }

  sitemap.end()

  return streamToPromise(sitemap)
})
