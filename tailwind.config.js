/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{json,md}"
  ],
  theme: {
    extend: {
      colors: {
        dlq: {
          primary: "#0B1A3A",
          accent: "#D4AF37",
          bg: "#070E22",
          text: "#E6E9F2"
        },
        'brand-navy': '#0B1C39',
        'brand-gold': '#D4AF37',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        dlq: "0 10px 30px rgba(0,0,0,.35)",
        'glass': '0 8px 32px rgba(31, 38, 135, 0.37)',
        'glow': '0 0 20px rgba(212, 175, 55, 0.5)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        xl: "24px",
        '2xl': "32px"
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.8)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
    },
  },
  plugins: [],
};
