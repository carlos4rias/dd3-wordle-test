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
        'light-bg': '#2B4485',
        'dark': '#66FFED',
        'dark-bg': '#DDEDFF',
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

