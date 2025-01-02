import { serverQueryContent } from '#content/server'
import RSS from 'rss'

export default defineEventHandler(async (event) => {
  const { site } = useAppConfig()
  const docs = await serverQueryContent(event, 'posts').sort({ created: -1 }).find()

  const feed = new RSS({
    title: site.title,
    description: site.description,
    site_url: site.domain,
    image_url: `${site.domain}/favicon.svg`,
    feed_url: `${site.domain}/rss.xml`,
    custom_namespaces: {
      follow: 'http://www.follow.is',
    },
    custom_elements: [
      {
        'follow:challenge': [
          { 'follow:feedId': '41215011978385440' },
          { 'follow:userId': '41229460898486272' },
        ],
      },
    ],
  })

  for (const doc of docs) {
    feed.item({
      title: doc.title ?? `${doc._path} - ${site.title}`,
      url: `${site.domain}${doc._path}`,
      date: doc.created,
      description: doc.summary,
    })
  }

  return new Response(feed.xml(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
})
