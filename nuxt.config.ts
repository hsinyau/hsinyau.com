// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxthub/core',
    '@nuxt/image',
    '@vueuse/nuxt',
  ],
  css: ['~/assets/css/main.css'],
  image: {
    domains: [
      'fbf0ebb.webp.li',
      'cdn.bsky.app',
      'media.cmx.edu.kg',
    ],
    cloudflare: {
      baseURL: 'https://file.hsinyau.com',
      format: ['webp', 'avif'],
      quality: 80,
    },
  },
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
  runtimeConfig: {
    vsco: {
      secret: '',
    },
    github: {
      secret: '',
    },
    networks: {
      bluesky: {
        identifier: 'hsinyau.bsky.social',
      },
      mastodon: {
        identifier: 'hsinyau@m.cmx.im',
      },
    },
  },
})