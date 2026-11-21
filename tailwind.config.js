/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        skyrovix: {
          primary: '#FB4400',
          primaryHover: '#E03D00',
          primaryLight: '#FF642E',
          dark: '#181619',
          darkNavy: '#111013',
          secondary: '#1F2937',
          accent: '#FF7A00',
          bgLight: '#F8FAFC',
          card: '#FFFFFF',
          cardHover: '#FFF7ED',
          border: 'rgba(251, 68, 0, 0.15)'
        },
        brand: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#FB4400', // Skyrovix Flame Orange
          600: '#E03D00',
          700: '#C23400',
          800: '#9E2A00',
          900: '#7C2100',
          950: '#431200'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'glow-primary': '0 0 35px -5px rgba(251, 68, 0, 0.35)',
        'glow-accent': '0 0 35px -5px rgba(255, 122, 0, 0.35)',
        'card-orange': '0 10px 30px -5px rgba(251, 68, 0, 0.1)'
      }
    },
  },
  plugins: [],
}
