/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bglayout: "rgb(var(--bglayout))",
        bgcolor: "rgb(var(--bgcolor))",
        hover: "rgb(var(--hover))",
        border: "rgb(var(--border))",
        chatbubblesides: "rgb(var(--chatbubblesides))",
        sendicon: "rgb(var(--sendicon))",
        sendiconhover: "rgb(var(--sendiconhover))",
      },
    },
  },
  plugins: [],
};
