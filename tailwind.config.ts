import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#146B3A",
          dark: "#0E4E2A",
          light: "#1B8C4C",
        },
        fresh: {
          DEFAULT: "#22A55D",
          hover: "#1D9152",
          light: "#34D399",
        },
        mint: {
          DEFAULT: "#E8F5EC",
          border: "#D1EAD8",
          subtle: "#F0F9F3",
        },
        surface: {
          DEFAULT: "#F7FAF7",
          card: "#FFFFFF",
          border: "#E5ECE7",
        },
        charcoal: {
          DEFAULT: "#1F2937",
          muted: "#4B5563",
          light: "#6B7280",
          subtle: "#9CA3AF",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-hind-siliguri)", "system-ui", "sans-serif"],
        bengali: ["var(--font-hind-siliguri)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 10px rgba(20, 107, 58, 0.05)",
        card: "0 4px 20px -2px rgba(20, 107, 58, 0.07)",
        elevated: "0 10px 30px -4px rgba(20, 107, 58, 0.12)",
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
};
export default config;
