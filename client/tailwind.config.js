/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ff9393",
          100: "#f67e7e",
          200: "#ee6a6a",
          300: "#ea5d5d",
          400: "#e84e4e",
          500: "#f34141",
          600: "#f63a3a"
        },
        secondary: {
          100: "#ffb37b",
          200: "#f8a35e",
          300: "#fda155",
          400: "#fb923c",
          500: "#ff9337"
        },
        dark: {
          0: "#ffffff",
          10: "#f3f3f3",
          20: "#efefef",
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
