import "!style-loader!css-loader!postcss-loader!../src/index.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: "white",
    values: [
      {
        name: "bg-gray-50",
        value: "#f8fafc",
      },
      {
        name: "white",
        value: "#fff",
      },
    ],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
