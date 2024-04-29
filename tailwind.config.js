/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
    "./src/app/globals.css",
  ],
  theme: {
    extend:{
      colors: {
        'text': '#f7e7ed',
        'background': '#3d0015',
        'primary': '#f8c10d',
        'secondary': '#8d1a43',
        'accent': '#ff8427',
       },
      fontFamily: {
        sans: ['var(--font-poppins)'],
        mono: ['var(--font-roboto-mono)'],
      },
    }
  },
  plugins: [],
}

