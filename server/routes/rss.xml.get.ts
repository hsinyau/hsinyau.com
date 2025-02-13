import RSS from 'rss'
import { extractContent } from '~/server/utils/extract-content'

export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, 'posts').order('created', 'DESC').limit(10).all()

  const { site } = useAppConfig()

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

  for (const post of posts) {
    feed.item({
      title: post.title,
      url: `${site.domain}${post.path}`,
      date: new Date(post.created),
      description: post.summary,
      custom_elements: [
        {
          'content:encoded': `<![CDATA[ <blockquote>该渲染可能存在排版问题，最佳体验请前往：<a href="${site.domain}${post.path}">${site.domain}${post.path}</a></blockquote> ${extractContent(post.body)}]]>`,
        },
      ],
    })
  }

  return new Response(feed.xml(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
})
