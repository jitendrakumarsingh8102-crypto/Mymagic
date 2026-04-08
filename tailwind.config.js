/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./first_meet.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blush-beige": "#F5E6D3",
        "dusty-rose": "#E8B4B8",
        "soft-ivory": "#FDF8F0",
        "faded-peach": "#F4C2A1",
        "warm-gold": "#D4AF37",
        "rose-mist": "#F2D7D5",
        "cream-white": "#FFFEF7",
      },
      fontFamily: {
        "great-vibes": ["Great Vibes", "cursive"],
        dancing: ["Dancing Script", "cursive"],
        poppins: ["Poppins", "sans-serif"],
        lora: ["Lora", "serif"],
      },
    },
  },
  plugins: [],
}
