interface Stats {
  data: {
    total_seconds: number
    languages: Array<{
      name: string
      total_seconds: number
    }>
  }
}

export default defineCachedEventHandler(async (event) => {
  const { wakatime } = useRuntimeConfig(event)

  const fetchData = async (endpoint: string) => {
    return await $fetch(`https://wakatime.com/api/v1/users/current/${endpoint}`, {
      headers: {
        Authorization: `Basic ${wakatime.apiKey ?? ''}`,
      },
    })
  }

  const [coding, languages] = await Promise.all([
    fetchData('all_time_since_today') as Promise<Stats>,
    fetchData('insights/languages/last_year') as Promise<Stats>,
  ])

  return {
    seconds: coding?.data?.total_seconds ?? 0,
    languages: languages?.data?.languages.slice(0, 2),
  }
}, {
  maxAge: 24 * 60 * 60,
  name: 'wakatime',
})
