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
        // Use the active bundler (Rspack when Docusaurus Faster is on, webpack otherwise).
        new (utils?.currentBundler?.instance ?? webpack).NormalModuleReplacementPlugin(
          /docusaurus-plugin-copy-page-button[\\/](src|lib)[\\/]CopyPageButton(\.js)?$/,
          path.resolve(__dirname, "./CopyPageButton.js")
        ),
      ];

      return {
        ...baseConfig,
        // postman-code-generators (used by the OpenAPI theme's code samples) require('path');
        // openapi-docs >= 4.5 no longer polyfills it.
        resolve: {
          ...(baseConfig.resolve || {}),
          fallback: { ...(baseConfig.resolve?.fallback || {}), path: require.resolve("path-browserify") },
        },
        plugins,
      };
    },
  };
};