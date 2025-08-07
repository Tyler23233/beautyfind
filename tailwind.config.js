/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-light': 'var(--primary-light)',
        accent: 'var(--accent)',
        'blush-pink': 'var(--blush-pink)',
        'rose-gold': 'var(--rose-gold)',
        'off-white': 'var(--off-white)',
        'light-gray': 'var(--light-gray)',
        'deep-charcoal': 'var(--deep-charcoal)',
      },
    },
  },
  plugins: [],
}
