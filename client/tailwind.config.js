/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
    darkMode: "class",
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
          500: "#ff9337",
          600: "#ff9031",
          700: "#ff8d2e",
          800: "#ff8721",
          900: "#ff831e"
        },
        dark: {
          0: "#ffffff",
          10: "#f3f3f3",
          20: "#efefef",
          30: "#e7e7e7",
          40: "#dadada",
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
      },
        boxShadow: {
            sm2: "1px 3px 20px 4px #cbcbcb59",
            "dark-sm2": "0px 3px 14px -3px #00000040",
            xxs: "0 2px 15px -4px #36363626",
            xxxs: "0 2px 13px 2px #9f9f9f05",
            "dropdown-light": "2px 3px 19px 0px #a7a7a75c",
            "dropdown-dark": "0px 1px 17px 0px #00000094"
        },
        zIndex: {
            998: "998",
            1000: "1000"
        }
    },
  },
 plugins: [],
}
