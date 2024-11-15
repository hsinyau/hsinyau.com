import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno, presetWebFonts, presetWind, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetWind(),
    presetIcons(),
    presetAttributify(),
    presetTypography(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Noto Sans SC:400,500,600,700'
      }
    })
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
  theme: {
    colors: {
      yau: {
        primary: '#db5a6b',
        secondary: '#f47983',
        accent: '#fda4af',
        fade: '#edd1d8',
        red: '#ff1835',
        blue: '#0077ff',
        purple: '#7f00de',
        green: '#00e7df',
        yellow: '#ffc900',
      },
    },
  },
  shortcuts: {
    'card': 'border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50 backdrop-filter backdrop-blur-lg',
    'lbtn': 'inline-flex items-center justify-center whitespace-nowrap text-sm border rounded-xl hover:bg-[#f0f0f0] h-10 px-4 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:border-gray-800 dark:text-white dark:hover:bg-[#262626]',
    'btn': 'inline-flex items-center justify-center whitespace-nowrap text-sm border rounded-xl hover:bg-[#f0f0f0] h-10 px-4 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-75 disabled:select-none dark:border-gray-800 dark:hover:bg-[#262626]',
  },
})
