/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#1a224a',
          800: '#242F66', // Exact Nobero Brand Blue
          700: '#2d3b7d',
        },
        nobero: {
          blue: '#242F66',
          dark: '#1A1E31',
          gray: '#666875',
          lightBg: '#F7F8FA',
          border: '#E5E7EB',
          green: '#12B76A',
          red: '#D9534F',
          gold: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      aspectRatio: {
        '2/3': '2 / 3',
        '3/4': '3 / 4',
        '4/5': '4 / 5',
        '16/7': '16 / 7',
      },
      boxShadow: {
        'nobero': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'nobero-hover': '0 8px 20px rgba(0, 0, 0, 0.1)',
        'dropdown': '0 12px 32px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
