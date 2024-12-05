export default defineEventHandler(async (event) => {
  const { discord } = useRuntimeConfig(event)
  const data = await $fetch(`https://api.lanyard.rest/v1/users/${discord.userId}`)
  return data
})
