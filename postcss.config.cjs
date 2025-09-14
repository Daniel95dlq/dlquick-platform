module.exports = {
  plugins: {
    // Conditionally require to avoid resolution flakiness in Next dev
    tailwindcss: (() => {
      try { return require('tailwindcss') } catch { return {} }
    })(),
    autoprefixer: {},
  },
}
