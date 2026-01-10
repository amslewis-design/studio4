/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        accent: "var(--color-accent)",
        "section-bg": "var(--color-section-bg)",
      },
      borderRadius: {
        btn: "var(--radius-btn)",
      },
    },
  },
  plugins: [],
};
