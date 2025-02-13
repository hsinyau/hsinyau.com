import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: 'page',
      source: 'posts/*.md',
      schema: z.object({
        title: z.string(),
        tag: z.string(),
        created: z.date(),
        summary: z.string(),
      }),
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects/*.json',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        color: z.string(),
        link: z.string(),
        icon: z.string(),
      }),
    }),
    friends: defineCollection({
      type: 'data',
      source: 'friends/*.json',
      schema: z.object({
        name: z.string(),
        desc: z.string(),
        avatar: z.string(),
        link: z.string(),
      }),
    }),
    about: defineCollection({
      type: 'page',
      source: 'about/*.md',
    }),
  },
})
