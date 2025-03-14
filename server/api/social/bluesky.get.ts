import type { FeedViewPost } from '@atproto/api/dist/client/types/app/bsky/feed/defs'
import { AppBskyEmbedImages, AppBskyFeedPost, AtpAgent } from '@atproto/api'
import MagicString from 'magic-string'

export default defineCachedEventHandler(async (event) => {
  const agent = new AtpAgent({ service: 'https://public.api.bsky.app' })
  const { identifier } = useRuntimeConfig(event).networks.bluesky

  const feed: FeedViewPost[] = []
  let cursor: string | undefined
  do {
    const result = await agent.getAuthorFeed({ actor: identifier, limit: 100, cursor })
    for (const p of result.data.feed) {
      if (AppBskyFeedPost.isRecord(p.post.record) && p.post.author.handle === identifier && !p.reply && (!p.post.embed || AppBskyEmbedImages.isMain(p.post.embed))) {
        feed.push(p)
      }
      cursor = result.data.cursor
    }
  } while (cursor && feed.length < 20)

  return Promise.all(feed.map((p) => {
    const post = p.post.record as AppBskyFeedPost.Record
    const embed = AppBskyEmbedImages.isMain(p.post.embed) ? p.post.embed : undefined as any
    const text = new MagicString(post.text)
    for (const facet of post.facets || []) {
      const startIndex = [...post.text].findIndex(
        (_, i) =>
          // eslint-disable-next-line node/prefer-global/buffer
          Buffer.byteLength(post.text.slice(0, i + 1))
          > facet.index.byteStart,
      )
      const endIndex = [...post.text].findIndex(
        (_, i) =>
          // eslint-disable-next-line node/prefer-global/buffer
          Buffer.byteLength(post.text.slice(0, i + 1))
          >= facet.index.byteEnd,
      )
      for (const feature of facet.features) {
        if (feature.$type === 'app.bsky.richtext.facet#link') {
          text.appendRight(startIndex, `<a href="${(feature as any).uri}">`)
          text.appendLeft(endIndex === -1 ? post.text.length : endIndex + 1, '</a>')
          continue
        }
      }
    }

    text.replaceAll(/[<>&]/g, r => ({
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
    }[r]!))

    for (const match of post.text.matchAll(/\n\n/g)) {
      text.overwrite(match.index!, match.index! + 2, '</p><p>')
    }

    text.prepend('<p>')
    text.append('</p>')

    return {
      network: 'bluesky' as const,
      accountLink: `https://bsky.app/profile/${p.post.author.handle}`,
      avatar: p.post.author.avatar,
      handle: p.post.author.displayName,
      createdAt: post.createdAt,
      permalink:
                `https://bsky.app/profile/${p.post.author.handle}/post${
                  p.post.uri.match(/(\/[^/]+)$/)?.[1]}`,
      html: text.toString().replace(/\n/g, '<br>'),
      media: embed?.images?.map((i: { fullsize: any, alt: any }) => ({
        url: i.fullsize,
        alt: i.alt,
      })),
    }
  }))
}, {
  maxAge: 60 * 60 * 12,
  swr: true,
  name: 'bluesky',
  getKey: () => 'bluesky',
})
