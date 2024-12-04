// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    head: {
      templateParams: {
        separator: '•',
      },
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@nuxthub/core',
    '@nuxt/image',
    'nuxt-mapbox',
    '@nuxthq/studio',
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
  // Nuxt Icon
  icon: {
    serverBundle: 'remote',
  },
  // Nuxt Google Fonts Config
  googleFonts: {
    display: 'swap',
    families: {
      'Sofia Sans': [400],
      'DM Sans': [400, 500, 600, 700, 800, 900],
      'Noto Sans SC': [400, 500, 600, 700, 800, 900],
      'Dancing Script': [400, 700],
    },
  },
  // Nuxt Content
  content: {
    highlight: {
      theme: {
        default: 'vitesse-light',
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
    },
    markdown: {
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
    },
  },
  // Nuxt Hub
  hub: {
    cache: true,
    kv: true,
    database: true,
    analytics: true,
  },
  // Nuxt Env
  runtimeConfig: {
    wakatime: {
      apiKey: '',
    },
    github: {
      apiKey: '',
    },
    gallery: {
      apiKey: '',
    },
    public: {
      mapbox: {
        accessToken: '',
      },
    },
  },
})
