/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['CodeNext', 'sans-serif']
      },
      colors: {
        sym_gray: {
          50: '#e4e4e4',
          100: '#cacac9',
          200: '#afafaf',
          300: '#959594',
          400: '#7a7a79',
          500: '#60605e',
          600: '#454544',
          700: '#2b2b29',
          800: '#10100e'
        },
        zeroq: {
          'green': '#41b886',
          600: '#2d4f83',
          800: '#1c2f57'
        }
      },
      spacing: {
        'limit': '90rem',
        'mid': '930px'
      }
    },
  },
  plugins: [],
}