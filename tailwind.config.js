module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#0d8bde',
        // primary: '#7a12c9',
        // primary: '#0dde61',
        background: '#090909',
        navbar: '#020202',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
