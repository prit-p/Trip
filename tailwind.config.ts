import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'natural': {
          'bg': '#FAF8F5',
          'text': '#2D332D',
          'accent': '#3E4A3D',
          'tan': '#B89E7E',
          'stone': '#E8E4DB',
          'border': '#E0DBCF',
        },
      },
      fontFamily: {
        'sans': ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'display': ['"Outfit"', 'sans-serif'],
        'serif': ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
