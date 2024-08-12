/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'xxs': '190px',
      'xs': '380px',
      'sm': '540px',
      'md': '720px',
      'lg': '920px',
      'xl': '1040px'
    },
    extend: {},
  },
  plugins: [ [require('flowbite/plugin')],
  ],
}

