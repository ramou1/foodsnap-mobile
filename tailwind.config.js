/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Rubik"],
        rubik: ["Rubik"],
        "rubik-light": ["Rubik-Light"],
        "rubik-regular": ["Rubik-Regular"],
        "rubik-medium": ["Rubik-Medium"],
        "rubik-bold": ["Rubik-Bold"],
        "rubik-semibold": ["Rubik-SemiBold"],
        "rubik-extrabold": ["Rubik-ExtraBold"],
        "rubik-black": ["Rubik-Black"],
      },
      colors: {
        primary: "#3b82f6",
        secondary: "#9333ea",
        background: "#f9fafb",
        text: "#111827",
      },
    },
  },
  plugins: [],
}

