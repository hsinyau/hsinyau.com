import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default <Partial<Config>>{
  content: [
    './app/**/*.{vue,js,ts}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        wave: 'wave 3s infinite',
        slide: 'slide 3s infinite',
      },
      keyframes: {
        wave: {
          '0%, 50%, 100%': {
            transform: 'rotate(-12deg)',
          },
          '25%, 75%': {
            transform: 'rotate(12deg) scale(1.5)',
          },
        },
        slide: {
          '0%, 100%': {
            transform: 'translateX(0) translateY(0)',
          },
          '20%': {
            transform: 'translateX(10px)',
          },
          '40%': {
            transform: 'translateY(-10px) translateX(10px)',
          },
          '60%': {
            transform: 'translateY(10px) translateX(-10px)',
          },
          '80%': {
            transform: 'translateY(-10px)',
          },
        },
      },
    },
  },
  plugins: [typography],
}
