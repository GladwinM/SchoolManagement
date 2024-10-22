module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        underline: {
          "0%": { transform: "scaleX(0)" },
          "50%": { transform: "scaleX(1)" },
          "100%": { transform: "scaleX(0)" },
        },
      },
      animation: {
        underline: "underline 2s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};
//hi