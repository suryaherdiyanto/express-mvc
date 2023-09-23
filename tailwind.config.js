const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{pug,html}", "./pages/**/*.vue"],
  theme: {
    extend: {
      fontFamily: {
        "body": ['"Open Sans"', 'sans-serif']
      },
    },
  },
  plugins: [],
}

