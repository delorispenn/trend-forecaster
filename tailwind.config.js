/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        montserrat: ['Montserrat', 'sans-serif']
      },
      colors: {
        'terracotta': '#cd7f77',
        'terracotta-dark': '#b86d65',
        'cream': '#fdfdfd',
        'cream-accent': '#f9f1f0',
        'charcoal': '#373737',
        'gray-light': '#888888',
        'border-tan': '#e0e0e0'
      }
    },
  },
  plugins: [],
}
