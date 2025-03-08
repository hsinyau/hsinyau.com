export default defineCachedEventHandler(async (event) => {
  const { vscoSecret } = useRuntimeConfig(event)

  const data = await $fetch(`https://vsco.co/api/3.0/medias/profile?site_id=304275568&limit=6`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${vscoSecret}`,
    },
  })

  const photos = (data as any).media.map((item: any) => ({
    width: item.image.width,
    height: item.image.height,
    id: item.image._id,
    date: item.image.capture_date,
    description: item.image.description,
    location: item.image.location_coords,
    src: `${item.image.responsive_url.replace('im.vsco.co/aws-us-west-2', 'https://fbf0ebb.webp.li')}`,
  }))

  return photos
}, {
  maxAge: 60 * 60 * 12,
  name: 'photos',
  getKey: () => 'photos',
})
