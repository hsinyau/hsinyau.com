export default defineCachedEventHandler(async () => {
  const data = await $fetch('https://cdn.jsdelivr.net/gh/hsinyau/static@master/data/geo.json')

  return data
})

// export default defineCachedEventHandler(async () => {
//   const data = await $fetch('https://cdn.jsdelivr.net/gh/hsinyau/static@master/data/geo.json')

//   return data
// }, {
//   maxAge: 24 * 60 * 60 * 30,
//   name: 'geo',
// })
