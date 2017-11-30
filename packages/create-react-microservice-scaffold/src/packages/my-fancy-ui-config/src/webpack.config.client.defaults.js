// @flow

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const VisualizerPlugin = require('webpack-visualizer-plugin');
const config = require('./index.js');
const readJson = require('./lib/readJson.js');
const {isDev, isProduction} = config.env;

module.exports = {
  name: 'client',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: Object.assign(
              {
                //
                // Avoid loading .babelrc configurations from the packages since most packages are not
                // configured to be transpiled into universal environments.
                //
                // Enable caching for faster rebuilds in development.
                //
                babelrc: false,
                cacheDirectory: isDev,
                compact: true
              },
              readJson(config.paths.root('packages/my-fancy-ui/.babelrc'))
            )
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'react-dom/server': 'empty/object'
    }
  },
  plugins: [
    //
    // Generate client bundle statistics for file-size optimizations.
    //
    new VisualizerPlugin({
      filename: './../statistics.html'
    }),

    //
    // Minify the HTML in production and remove all comments.
    // Note that we compile the HTML only for the client-side since the server needs
    // to parse the client one and send it, you guessed it, to the client.
    //
    new HtmlWebpackPlugin({
      inject: true,
      template: config.paths.src('index.html'),
      filename: config.paths.dist('index.html'),
      minify: isProduction
        ? {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
          }
        : undefined
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    })
  ],

  output: {
    path: config.paths.dist('client'),

    //
    // Add hashes to the client side filenames to bust the caches of browsers properly.
    // In case you need to reference a compiled bundle, take a look at the `asset-manifest.json`.
    //
    filename: `[name].[${config.webpack.hashType}].js`,

    //
    // Point sourcemap entries to original disk location (format as URL on Windows)
    //
    devtoolModuleFilenameTemplate: (info: Object) =>
      path
        .relative(config.paths.src(), info.absoluteResourcePath)
        .replace(/\\/g, '/')
  },
  devtool: config.webpack.hasSourceMaps ? 'source-map' : false,

  entry: [config.paths.src('index.js')],

  //
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  //
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
