// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
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
})
