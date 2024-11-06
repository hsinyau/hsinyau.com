import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts, presetWind, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetWind(),
    presetIcons(),
    presetAttributify(),
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
})
