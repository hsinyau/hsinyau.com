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
  icon: {
    serverBundle: 'remote',
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
    highlight: {
      theme: {
        default: 'vitesse-light',
        dark: 'vitesse-dark',
      },
      langs: [
        'json',
        'js',
        'jsx',
        'ts',
        'tsx',
        'html',
        'css',
        'vue',
        'shell',
        'mdc',
        'md',
        'yaml',
        'java',
        'xml',
        'sql',
      ],
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
    database: true,
    cache: true,
    kv: true,
    analytics: true,
  },
  // Nuxt Nitro Config
  nitro: {
    prerender: {
      routes: ['/', '/sitemap.xml', '/rss.xml'],
      crawlLinks: true,
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
  },
})
