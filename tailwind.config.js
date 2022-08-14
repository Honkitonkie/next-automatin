/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-mode="dark"]'],
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // automatin
        automatin: {
          blue: "#4874AE",
          orange: "#D1703C",
          grey: "#3F3D56",
          lightGrey: "#F2F0F2",
        },
        linkedin: {
          imagetext: "#EEF3F8",
          link: "#0a66c2",
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
    },
    fontFamily: {
      head: '"Roboto", "Noto Serif"',
      sans: '"Montserrat", "Noto Serif"',
      serif: '"apple-system", "system-ui","Segoe UI", Helvetica, Arial',
    },
  },
  plugins: [],
};
