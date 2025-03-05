import { SitemapStream, streamToPromise } from 'sitemap'
import { SITE_URL } from '~/lib/constants'

export default defineEventHandler(async (event) => {
  const staticRoutes = ['/', 'posts', '/about', '/projects', '/friends', '/collection']
  const posts = await queryCollection(event, 'posts').order('created', 'DESC').all()

  const sitemap = new SitemapStream({
    hostname: SITE_URL,
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
