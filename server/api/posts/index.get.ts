import { useDB } from '~/server/utils/db'

export default defineEventHandler(() => {
  return useDB().query.posts.findMany()
})
