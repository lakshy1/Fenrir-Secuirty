/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      /* ========================= */
      /* 🎨 Semantic Color Tokens */
      /* ========================= */

      colors: {
        bg: {
          main: "var(--bg-main)",
          sidebar: "var(--bg-sidebar)",
          card: "var(--bg-card)",
          soft: "var(--bg-soft)",
        },

        border: {
          DEFAULT: "var(--border-color)",
        },

        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
        },

        accent: {
          DEFAULT: "var(--accent)",
          soft: "var(--accent-soft)",
        },

        danger: "var(--danger)",
      },

      /* ========================= */
      /* APS Gradient */
      /* ========================= */

      backgroundImage: {
        "aps-gradient":
          "linear-gradient(135deg, #0B0F19 29%, #2C4F4E 58%, #FF6A00 72%, #0B0F19 100%)",
      },

      /* ========================= */
      /* Subtle Shadow System */
      /* ========================= */

      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.05)",
        card: "0 6px 30px rgba(0,0,0,0.08)",
      },

      borderRadius: {
        xl2: "1rem",
      },
    },
  },

  plugins: [],
};