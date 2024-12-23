import type { Moment } from '~/types/moments'

export default defineEventHandler(async (event) => {
  const { githubToken } = useRuntimeConfig(event)

  const data = await $fetch(`https://api.github.com/repos/hsinyau/moments/issues`, {
    headers: {
      'Authorization': `Bearer ${githubToken ?? ''}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko), hsinyau',
    },
  })

  if (!Array.isArray(data)) {
    return { moments: [] }
  }

  const moments = data.map((item: Moment) => ({
    node_id: item.node_id,
    title: item.title,
    body: item.body,
    labels: {
      name: item.labels[0]?.name,
      color: item.labels[0]?.color,
    },
  }))

  return { moments }
})
