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
        space: {
          bg: "#050814",
          card: "rgba(10, 15, 36, 0.75)",
          border: "rgba(0, 240, 255, 0.18)",
          glow: "rgba(112, 0, 255, 0.25)",
        },
        signal: {
          cyan: "#00f0ff",
          violet: "#7000ff",
          lime: "#ccff00",
        },
      },
      fontFamily: {
        headline: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      backgroundImage: {
        "cyan-gradient": "linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)",
        "cyber-grid": "linear-gradient(to right, rgba(0, 240, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.05) 1px, transparent 1px)",
      },
      boxShadow: {
        "cyan-glow": "0 0 25px rgba(0, 240, 255, 0.3)",
        "violet-glow": "0 0 25px rgba(112, 0, 255, 0.3)",
        "lime-glow": "0 0 25px rgba(204, 255, 0, 0.3)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "orbit": "orbit 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
