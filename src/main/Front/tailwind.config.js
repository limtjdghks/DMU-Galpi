/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				MainColor: '#E5FFC3',
				BtnColor1: '#C6FF7C'
			}
		},
	},
	plugins: [],
}