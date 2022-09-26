/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-mode="dark"]'],
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // automatin
        standard: {
          succes: "#22bb33",
          warning: "#bb2124",
          info: "#f0ad4e",
          grey: "#aaaaaa",
          blue: "#5bc0de",
        },
        automatin: {
          blue: "#4874AE",
          orange: "#D1703C",
          orangeLight: "#f5945f",
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
      serif: '"Roboto", "Noto Serif"',
      sans: '"Montserrat", "Noto Serif"',
      head: '"apple-system", "system-ui","Segoe UI", Helvetica, Arial',
    },
  },
  plugins: [],
};
