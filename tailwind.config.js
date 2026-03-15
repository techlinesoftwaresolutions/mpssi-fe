/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          DEFAULT: '#E9730F',
          50: '#FDF1E6',
          100: '#FBE3CD',
          600: '#E9730F',
          700: '#C25D0A',
        },
        royal: {
          DEFAULT: '#1E3A8A',
          50: '#EBF1FF',
          800: '#1E3A8A',
          900: '#172554',
        },
        cream: '#FFF8EE',
        softGrey: '#F3F4F6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
