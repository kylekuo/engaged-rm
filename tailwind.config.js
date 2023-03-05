/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        'cerulean': {
          '50': '#ebffff',
          '100': '#cefdff',
          '200': '#a2f8ff',
          '300': '#63f0fd',
          '400': '#1cdef4',
          '500': '#00b5cc',
          '600': '#039ab7',
          '700': '#0a7b94',
          '800': '#126278',
          '900': '#145265',
        },
      }
    }
  }
}
