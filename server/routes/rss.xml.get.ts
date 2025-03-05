import RSS from 'rss'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '~/lib/constants'
import { extractContent } from '~/server/utils/extract-content'

export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, 'posts').order('created', 'DESC').limit(10).all()

  const feed = new RSS({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    site_url: SITE_URL,
    image_url: `${SITE_URL}/favicon.svg`,
    feed_url: `${SITE_URL}/rss.xml`,
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
      url: `${SITE_URL}${post.path}`,
      date: new Date(post.created),
      description: post.summary,
      custom_elements: [
        {
          'content:encoded': `<![CDATA[ <blockquote>该渲染可能存在排版问题，最佳体验请前往：<a href="${SITE_URL}${post.path}">${SITE_URL}${post.path}</a></blockquote> ${extractContent(post.body)}]]>`,
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
