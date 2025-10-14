/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3CA2A2",
        secondary: "#215A6D",
        green: "#8EBDB6",
        light: "#DFECE6",
        dark: "#063940"
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
