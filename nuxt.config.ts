// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    '@nuxt/content',
    '@nuxthub/core',
    '@vueuse/nuxt',
    '@nuxt/image',
    'nuxt-mapbox',
  ],
  // Nuxt UI Module Config
  ui: {
    safelistColors: [
      'gray',
      'zinc',
      'red',
      'orange',
      'rose',
      'green',
      'emerald',
      'sky',
      'blue',
      'purple',
      'neutral',
    ],
  },
  // Nuxt Color Mode Config
  colorMode: {
    preference: 'system',
    fallback: 'light',
  },
  // Nuxt Image Config
  image: {
    cloudflare: {
      baseURL: 'https://file.hsinyau.com',
      format: ['webp', 'avif'],
      quality: 80,
    },
  },
  // Nuxt Google Fonts Config
  googleFonts: {
    display: 'swap',
    families: {
      'Noto Sans SC': [400, 700],
      'Dancing Script': [400, 700],
    },
  },
  // Nuxt Content
  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
        },
        remarkPlugins: {
          'remark-math': {},
          'remark-reading-time': {
            wordsPerMinute: 400,
          },
        },
        rehypePlugins: {
          'rehype-katex': {
            output: 'mathml',
          },
        },
        highlight: {
          theme: {
            default: 'vitesse-light',
            dark: 'vitesse-dark',
          },
          langs: [
            'c',
            'cpp',
            'java',
          ],
        },
      },
    },
  },
  // Nuxt Hub
  hub: {
    database: true,
    cache: true,
    kv: true,
    analytics: true,
  },
  // Nuxt Nitro Config
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/about', '/friends', '/projects', '/posts', '/sitemap.xml', '/rss.xml'],
    },
  },
  // Nuxt Env
  runtimeConfig: {
    githubToken: '',
    vscoToken: '',
    public: {
      mapboxAccessToken: '',
      openPanelClientId: '',
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
