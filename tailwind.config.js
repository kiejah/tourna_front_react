/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lime_dark: "#00695f",
        lime:"#38D20D",
        hash_games:"#2B2C6C",
        dark_yellow:'#FA951B'
      }
    },
  },
  plugins: [],
}

