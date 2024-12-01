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
  },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    '@nuxt/content',
    '@vueuse/nuxt',
  ],
  // Nuxt UI Module Config
  ui: {
    safelistColors: [
      'gray',
      'zinc',
      'red',
      'orange',
      'amber',
      'green',
      'emerald',
      'sky',
      'blue',
      'purple',
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
      remarkPlugins: ['remark-math'],
      rehypePlugins: {
        'rehype-katex': {
          output: 'mathml',
        },
      },
    },
  },
  // // Nitro
  // nitro: {
  //   experimental: {
  //     openAPI: true,
  //   },
  // },
  // Nuxt Env
  runtimeConfig: {
    wakatime: {
      userId: '',
      coding: '',
      editors: '',
      languages: '',
      os: '',
    },
    discord: {
      userId: '',
      id: '',
      token: '',
    },
  },
})
