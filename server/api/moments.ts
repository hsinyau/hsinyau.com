export default defineEventHandler(async () => {
  const response = await $fetch('https://api.github.com/repos/hsinyau/moments/issues', {
    headers: {
      'Authorization': `Bearer ${process.env.GITHUB_API_KEY}`
    }
  })
  return response
})
