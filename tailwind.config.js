/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{pug,html}"],
  theme: {
    extend: {
		"fontFamily": {
			"body": ['"Open Sans"', 'sans-serif']
		}
	},
  },
  plugins: [],
}

