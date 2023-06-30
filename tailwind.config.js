/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderColor: theme => ({
        DEFAULT: theme('colors.gray.300', 'currentColor'),
        'light': '#FFBD3E',
      }),
      backgroundColor: theme => ({
        'light': '#FFBD3E',
        'light-bg': '#66FFED',
        'dark': '#DDEDFF',
        'dark-bg': '#2B4485',
        'box-no-set': '#939B9F22',
        'header': '#F3F3F3',
      }),
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
    },
  },
  plugins: [],
}

