module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {},
    extend: {
      keyframes: {
        bounceHarder: {
          "0%, 100%": {
            transform: "translateY(-50%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        bounceHarder: "bounceHarder 500ms infinite",
      },
    },
  },
  variants: {
    extend: {
      translate: ["group-hover"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
