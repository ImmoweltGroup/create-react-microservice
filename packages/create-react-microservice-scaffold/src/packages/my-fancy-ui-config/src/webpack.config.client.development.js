// @flow

const webpack = require('webpack');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const config = require('./index.js');

module.exports = {
  entry: [
    //
    // Render compile errors in development to the generated HTML.
    //
    'react-error-overlay'
  ],
  plugins: [
    //
    // Add module names to factory functions so they appear in browser profiler.
    //
    new webpack.NamedModulesPlugin(),

    //
    // Reload the page on each re-compilation.
    //
    new LiveReloadPlugin({
      appendScriptTag: true
    }),

    //
    // Open the OS's default browser once the first compilation was done during development mode.
    //
    new OpenBrowserPlugin({
      url: config.server.url
    }),

    //
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebookincubator/create-react-app/issues/240
    //
    new CaseSensitivePathsPlugin(),

    //
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebookincubator/create-react-app/issues/186
    //
    new WatchMissingNodeModulesPlugin(config.paths.modules())
  ]
};
