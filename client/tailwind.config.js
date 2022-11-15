/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          400: "#e84e4e",
          500: "#f34141"
        },
        dark: {
          0: "#ffffff",
          10: "#eaeaea",
          50: "#e1e1e1",
          100: "#bdbdbd",
          200: "#9a9a9a",
          300: "#797979",
          400: "#606060",
          500: "#484848",
          600: "#363636",
          700: "#282828",
          800: "#1e1e1e",
          900: "#151515"
        }
      }
    },
  },
  plugins: [],
}
