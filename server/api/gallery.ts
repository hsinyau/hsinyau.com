export default defineEventHandler(async (event) => {
  const { page } = getQuery(event)
  const res = await fetch(`https://7bu.top/api/v1/images?album_id=1151&order=newest&page=${page}`, {
    headers: {
      Authorization: `Bearer ${process.env.GALLERY_API_KEY}`,
      Accept: 'application/json',
    },
  })

  const response = await res.json()

  interface GalleryItem {
    md5: string
    width: number
    height: number
    links: { url: string }
    human_date: string
  }

  const gallery = response?.data?.data.map((item: GalleryItem) => ({
    id: item.md5,
    width: item.width,
    height: item.height,
    src: item.links.url,
    date: item.human_date,
  }))

  return {
    gallery,
    last_page: response?.data?.last_page,
    current_page: response?.data?.current_page,
  }
})
