import { SitemapStream, streamToPromise } from 'sitemap'

const { site } = useAppConfig()
export default defineEventHandler(async (event) => {
  const staticRoutes = ['/', 'posts', '/about', '/projects', '/friends', '/timeline']
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
