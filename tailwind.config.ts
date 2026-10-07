import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          50: "#f4f5f6",
          100: "#e4e6e8",
          300: "#9ca0a6",
          500: "#4a4e54",
          700: "#2a2d31",
          800: "#1f2124",
          900: "#1a1c1f",
          950: "#111214",
        },
        brand: {
          DEFAULT: "#8b1a1f",
          light: "#a8232a",
          dark: "#6b1317",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "80rem",
      },
      boxShadow: {
        brand: "0 10px 30px -10px rgba(139, 26, 31, 0.55)",
      },
    },
  },
  plugins: [],
};

export default config;
