/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fill': 'repeat(auto-fill, minmax(150px, 1fr))',
      },
    },
  },
  plugins: [],
}