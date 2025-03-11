// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxthub/core',
    '@nuxt/image',
    '@vueuse/nuxt',
  ],
  css: ['~/assets/css/main.css'],
  ui: {
    theme: {
      colors: ['primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'error'],
    },
  },
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
  icon: {
    customCollections: [
      {
        prefix: 'custom',
        dir: './assets/custom',
      },
    ],
  },
  content: {
    database: {
      type: 'd1',
      bindingName: 'DB',
    },
    build: {
      markdown: {
        toc: {
          depth: 3,
        },
        highlight: {
          theme: 'github-dark',
          langs: [
            'c',
            'cpp',
            'java',
            'shellscript',
            'sql',
          ],
        },
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
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/about', '/friends', '/projects', '/posts', '/rss.xml', '/sitemap.xml'],
    },
  },
  runtimeConfig: {
    vsco: {
      secret: '',
    },
    github: {
      secret: '',
    },
    public: {
      openpanel: {
        clientid: '',
      },
    },
    networks: {
      bluesky: {
        identifier: 'hsinyau.com',
      },
      mastodon: {
        identifier: 'hsinyau@m.cmx.im',
      },
    },
  },
})
