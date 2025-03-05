export default defineCachedEventHandler(async (event) => {
  const { githubToken } = useRuntimeConfig(event)

  const data = await $fetch(`https://api.github.com/repos/hsinyau/moments/issues`, {
    headers: {
      'Authorization': `Bearer ${githubToken ?? ''}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko), hsinyau',
    },
  })

  if (!Array.isArray(data)) {
    return { data: [] }
  }

  return Promise.all(
    data.map(item => ({
      network: 'qzone' as const,
      accountLink: `#`,
      avatar: 'https://file.hsinyau.com/image/avatar.jpg',
      handle: 'hsinyau',
      createdAt: new Date(Number(item.title) * 1000),
      permalink: '#',
      html: item.body.toString().replace(/\n/g, '<br>'),
      media: item.body.match(/!\[.*?\]\((.*?)\)/g)?.map((img: { match: (arg0: RegExp) => any[] }) => img.match(/\((.*?)\)/)?.[1]),
    })),
  )
}, {
  maxAge: 60 * 60 * 12,
  swr: true,
  name: 'qzone',
  getKey: () => 'qzone',
})
