// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/content', '@nuxthub/core'],
  css: ['~/assets/css/main.css'],
  content: {
    database: {
      type: 'd1',
      bindingName: 'DB',
    },
    build: {
      markdown: {
        remarkPlugins: {
          'remark-reading-time': {
            wordsPerMinute: 400,
          },
        },
      },
    },
  },
  hub: {
    database: true,
    cache: true,
    kv: true,
    analytics: true,
  },
})
