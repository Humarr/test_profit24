/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./app/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "brand-purple": "#72007f",
        "brand-purple-dark": "#5d0068",
        "brand-orange": "#cc5500",
        "brand-slate": "#36454f",
        "brand-cream": "#f5f5dc",
        "brand-white": "#ffffff",
      },
      fontFamily: {
        // sans: ["var(--font-dm-sans)", "sans-serif"],
        sans: ["DM Sans", "sans-serif"]
      },
    },
  },
  plugins: [],
};
