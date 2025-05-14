/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        toast: {
          warning: "#F7D774",
          success: "#8EE59B",
          danger: "#F16C6C",
          text: "#1A1A1A"
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
