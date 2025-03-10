/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#161622",
        secondary: "#1A1A2E",
        tertiary: "#161622",
        darkGray: "#222222",
        lightGray: "#404040",
        white: "#FFFFFF",
        pink: "#FF69B4",
        orange: "#FFA500",
        yellow: "#FFFF00",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        serif: ["Merriweather", "serif"],
        mono: ["Space Mono", "monospace"],
        display: ["Montserrat", "sans-serif"],
        body: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
}



