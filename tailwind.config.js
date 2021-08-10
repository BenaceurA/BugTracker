module.exports = {
  purge: [
    './dist/**/*.html',
    './resources/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  mode : 'jit'
}
