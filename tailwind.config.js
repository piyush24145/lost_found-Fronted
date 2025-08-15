/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '128': '32rem',  // 512px
      },
      height: {
        '128': '32rem',  // 512px
      },
      padding: {
        '36': '9rem',    // 144px
      },
    },
  },
  plugins: [],
}
