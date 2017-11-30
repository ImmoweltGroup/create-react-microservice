// @flow

const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const config = require('./index.js');
const {isDev, isProduction} = config.env;

module.exports = {
  entry: [],
  output: {
    //
    // This is the URL that app is served from.
    //
    publicPath: config.webpack.publicPath,

    //
    // Add /* filename */ comments to generated require()s in the output in development.
    //
    pathinfo: isDev,

    //
    // There are also additional JS chunk files if you use code splitting.
    //
    chunkFilename: `[name].[${config.webpack.hashType}].chunk.js`
  },
  module: {
    rules: [],

    //
    // Makes missing exports an error instead of warning
    //
    strictExportPresence: true
  },

  resolve: {
    plugins: [
      //
      // Prevents users from importing files from outside of src/ (or node_modules/).
      // This often causes confusion because we only process files within src/ with babel.
      //
      new ModuleScopePlugin(config.paths.src())
    ],
    modules: ['node_modules', config.paths.modules()],
    extensions: ['.js'],

    alias: {
      //
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      //
      'react-native': 'react-native-web'
    }
  },
  plugins: [
    //
    // Inject globals into the bundle at compile time (e.g. the environment the app is running in).
    //
    new webpack.DefinePlugin(config.globals),

    //
    // Do not bundle all moment.js locales by default
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    //
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    //
    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    //
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    })
  ],

  //
  // Don't continue the build if there are any errors in production.
  //
  bail: isProduction
};
