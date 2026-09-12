import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#12181F',
        paper: '#E9EDF2',
        buy: '#3FB8AF',
        diy: '#D98E4A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Monaco', 'monospace'],
      },
      maxWidth: {
        content: '760px',
      },
    },
  },
  plugins: [],
} satisfies Config
