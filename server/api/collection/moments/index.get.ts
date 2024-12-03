import type { Moment } from '~/types/moments'

export default defineCachedEventHandler(async (event) => {
  const { github } = useRuntimeConfig(event)

  const data = await $fetch(`https://api.github.com/repos/hsinyau/moments/issues`, {
    headers: {
      Authorization: `Bearer ${github.apiKey ?? ''}`,
    },
  })

  const moments = (data as any[]).map((item: Moment) => ({
    node_id: item.node_id,
    title: item.title,
    body: item.body,
    labels: {
      name: item.labels[0]?.name,
      color: item.labels[0].color,
    },
  }))

  return { moments }
}, {
  maxAge: 24 * 60 * 60,
  name: 'moments',
})
