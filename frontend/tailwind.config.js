/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        siredoscuro: '#0c6624',
        siredclaro: '#B5E073',
        amarillo: '#E8D940',
        moradoclaro: '#7B7DEB',
        moradofuerte: '#4464B5',
      },
    },
  },
  variants: {
    extend: {
      translate: ['hover'],
      boxShadow: ['hover'],
    },
  },
  plugins: [],
};
