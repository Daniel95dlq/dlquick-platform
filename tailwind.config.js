/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dlq-navy': '#0a1a4f',
        'dlq-gold': '#D4AF37',
        'dlq-gold-600': '#B38E1E',
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
}
