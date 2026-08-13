/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#720760',
        'brand-secondary': '#9d2b8b',
        'brand-light': '#fdf5fc',
        'brand-dark': '#4b023e',
      }
    },
  },
  plugins: [],
}