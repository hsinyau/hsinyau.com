// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxthq/studio',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    '@nuxtjs/color-mode'
  ],
  colorMode: {
    preference: 'light', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
    storageKey: 'color-mode',
    classSuffix: '',
    classPrefix: ''
  },
  css: [
    '@unocss/reset/tailwind.css'
  ],
  runtimeConfig: {
    public: {
      commentApi: process.env.PUBLIC_COMMENT_API
    }
  }
})
