import type { Config } from "tailwindcss";

const systemStack = (face: string) => [
  "-apple-system",
  "BlinkMacSystemFont",
  `"${face}"`,
  "var(--font-inter)",
  "system-ui",
  "sans-serif",
];

const config = {
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      fontFamily: {
        sans: systemStack("SF Pro Text"),
        display: systemStack("SF Pro Display"),
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        orange: {
          DEFAULT: "hsl(var(--orange))",
          foreground: "hsl(var(--orange-foreground))",
          ink: "hsl(var(--orange-ink))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fill: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        blink: {
          "50%": { opacity: "0" },
        },
        "cursor-click": {
          "0%": { left: "45%", top: "30%" },
          "70%": { left: "170px", top: "-1rem", transform: "scale(1)" },
          "85%": { transform: "scale(0.8)" },
        },
      },
      animation: {
        blink: "blink 1s steps(1) infinite",
        "cursor-click": "cursor-click 0.8s var(--ease-out) both",
        "fade-up": "fade-up 0.7s var(--ease-out) both",
        fill: "fill 5s linear forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
