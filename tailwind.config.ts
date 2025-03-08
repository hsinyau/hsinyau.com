import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default <Partial<Config>>{
  content: [
    './app/**/*.{vue,js,ts}',
    './content/**/*.{md,mdx}',
  ],
  plugins: [typography],
}
