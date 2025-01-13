export default defineCachedEventHandler(async () => {
  const data = await $fetch('https://static.758201.xyz/data/geo.json')

  return data
}, {
  swr: true,
  name: 'getGeoData',
  getKey: () => 'default',
})
