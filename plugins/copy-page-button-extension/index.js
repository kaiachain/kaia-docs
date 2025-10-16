const path = require("path");
const webpack = require("webpack");
const originalPlugin = require("docusaurus-plugin-copy-page-button");

module.exports = function copyPageButtonWrapper(context, options = {}) {
  const basePlugin = originalPlugin(context, options);

  return {
    ...basePlugin,
    name: "copy-page-button-extension",

    configureWebpack(config, isServer, utils) {
      const baseConfig = basePlugin.configureWebpack
        ? basePlugin.configureWebpack(config, isServer, utils) || {}
        : {};

      const plugins = [
        ...(baseConfig.plugins || []),
        new webpack.NormalModuleReplacementPlugin(
          /docusaurus-plugin-copy-page-button[\\/](src|lib)[\\/]CopyPageButton(\.js)?$/,
          path.resolve(__dirname, "./CopyPageButton.js")
        ),
      ];

      return {
        ...baseConfig,
        plugins,
      };
    },
  };
};