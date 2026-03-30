export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff4ff',
          100: '#dbe8fe',
          200: '#bfd3fe',
          300: '#93b4fd',
          400: '#608bfb',
          500: '#2366f5',
          600: '#0a4ddb',
          700: '#0a3db2',
          800: '#0e3490',
          900: '#112e75',
        },
        navy: {
          900: '#1a202c',
        }
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      }
    }
  },
  plugins: []
};
