/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./theme.config.jsx",
  ],
  theme: {
    extend: {
      spacing: {
        '200px': '200px',
      }
    },
  },
  plugins: [],
}

