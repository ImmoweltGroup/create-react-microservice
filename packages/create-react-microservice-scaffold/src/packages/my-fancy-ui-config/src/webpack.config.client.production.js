// @flow

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  //
  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
  //
  performance: {
    hints: 'warning'
  },

  plugins: [
    //
    // Minify the code in production.
    //
    new UglifyJSPlugin({
      sourceMap: true
    })
  ]
};
