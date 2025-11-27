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
        ultimate: {
          dark: '#0a0a0c',
          panel: '#131316',
          border: '#27272a',
          accent: '#e11d48', // Rose-600
          gold: '#fbbf24',   // Amber-400
          text: '#e4e4e7',   // Zinc-200
          dim: '#a1a1aa',    // Zinc-400
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}