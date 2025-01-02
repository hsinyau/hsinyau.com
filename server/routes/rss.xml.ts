import { serverQueryContent } from '#content/server'
import RSS from 'rss'
import { extractContent } from '../utils/extract-content'

export default defineEventHandler(async (event) => {
  const { site } = useAppConfig()
  const docs = await serverQueryContent(event, 'posts')
    .only(['title', 'summary', 'created', '_path', 'body'])
    .sort({ created: -1 })
    .limit(10)
    .find()

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
        follow_challenge: [
          { feedId: '96482750945854468' },
          { userId: '45701580278965248' },
        ],
      },
    ],
  })

  for (const doc of docs) {
    const extractedContent = extractContent(doc.body)
    feed.item({
      title: doc.title ?? `${doc._path} - ${site.title}`,
      url: `${site.domain}${doc._path}`,
      date: doc.created,
      description: doc.summary,
      custom_elements: [{ 'content:encoded': `<![CDATA[ ${extractedContent} ]]>` }],
    })
  }

  return new Response(feed.xml(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
})
