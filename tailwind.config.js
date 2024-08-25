/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/js/**/*.js",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/tw-elements/js/**/*.js"
  ],
  theme: {
    extend: {
      
    },
  },
  plugins: [
    require('daisyui'),
    require('flowbite/plugin'),
    require("tw-elements/plugin.cjs")
  ],
}

