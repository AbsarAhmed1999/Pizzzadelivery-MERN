/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing:{
        '80':'30rem',
      },
      height:{
        '96':'450px',
      },
    },
  },
  plugins: [],
}