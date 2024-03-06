/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      "primary": "#78350F",
      "primary-light": "#FDE68A",
      "white": "#FFFFFF",
      "dark-blue": "#0F172A",
      "grey": "#E2E8F0",
      "dark-grey": "#475569"
      
    },
    extend: {
      backgroundImage: {
        'main-bg': "linear-gradient(90deg, #FFFBEB 0%, #FFFFFF 89.63%)"

      }
    },
  },
  plugins: [],
}

