import type { Photo } from '~/types/gallery'

export default defineCachedEventHandler(async (event) => {
  const { gallery } = useRuntimeConfig(event)

  const data = await $fetch(`https://7bu.top/api/v1/images?album_id=1151&order=newest`, {
    headers: {
      Authorization: `Bearer ${gallery.apiKey ?? ''}`,
      Accept: 'application/json',
    },
  })

  const photos = (data as any).data.data.slice(0, 21).map((item: Photo) => ({
    width: item.width,
    height: item.height,
    src: item.links.url,
    sha1: item.sha1,
  }))

  return { photos }
})
