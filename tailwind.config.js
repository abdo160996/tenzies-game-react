/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html","./src/**/*.{jsx,js}"],
  theme: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
}

