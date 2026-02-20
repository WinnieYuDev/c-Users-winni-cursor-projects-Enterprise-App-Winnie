import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B1F33",
        "slate-blue": "#1E293B",
        "soft-gray": "#F1F5F9",
        "cool-gray": "#CBD5E1",
        success: "#16A34A",
        warning: "#F59E0B",
        danger: "#DC2626",
        accent: "#2563EB",
        navy: {
          50: "#E8EDF2",
          100: "#C5D2DE",
          200: "#9FB5C9",
          300: "#7898B4",
          400: "#557D9F",
          500: "#3D6285",
          600: "#2F4D6B",
          700: "#223952",
          800: "#162639",
          900: "#0B1F33",
          950: "#061219",
        },
        arctic: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        "compliance-green": "#15803D",
        "alert-red": {
          DEFAULT: "#B91C1C",
          light: "#FEE2E2",
          dark: "#7F1D1D",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)",
        dropdown: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      spacing: {
        4.5: "1.125rem",
        18: "4.5rem",
        22: "5.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
