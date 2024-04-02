/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/flowbite/**/*.{js,ts}",
    "./components/**/*.{js,vue,ts}",
    "./composition/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {},
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      primary: ["Rethink Sans", "sans-serif"], // Hedvig Letters Sans
      secondary: ["Rethink Sans", "sans-serif"],
    },
  },
  plugins: [require("flowbite/plugin")],
};
