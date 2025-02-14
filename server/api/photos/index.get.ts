import type { Photo } from '~/types/gallery'

export default defineEventHandler(async (event) => {
  const { vscoToken } = useRuntimeConfig(event)

  const data = await $fetch(`https://vsco.volta.eu.org/api/3.0/medias/profile?site_id=304275568&limit=21`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${vscoToken}`,
    },
  })

  const photos = (data as any).media.map((item: Photo) => ({
    width: item.image.width,
    height: item.image.height,
    id: item.image._id,
    date: item.image.capture_date,
    description: item.image.description,
    location: item.image.location_coords,
    src: `${item.image.responsive_url.replace('im.vsco.co/aws-us-west-2', 'https://fbf0ebb.webp.li')}`,
  }))

  return photos
})
