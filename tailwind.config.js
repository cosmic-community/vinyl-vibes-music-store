/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B2635',
          dark: '#6B1D29',
          light: '#A63344',
        },
        secondary: {
          DEFAULT: '#4ecdc4',
          dark: '#3db8b0',
        },
        cream: {
          DEFAULT: '#F5F1E8',
          dark: '#E8E1D3',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}