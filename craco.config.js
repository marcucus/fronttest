const path = require("path");
const { getLoader, loaderByName, addBeforeLoader } = require("@craco/craco");

module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      const { match } = getLoader(webpackConfig, loaderByName("babel-loader"));

      const loader = {
        ...match.loader,
        include: [
          match.loader.include,
          path.resolve(__dirname, "node_modules/interfaces.foudroyer.com"),
        ],
      };

      const { isAdded } = addBeforeLoader(
        webpackConfig,
        loaderByName("babel-loader"),
        loader
      );

      if (!isAdded) throw new Error("wesh");

      return webpackConfig;
    },
  },
};
