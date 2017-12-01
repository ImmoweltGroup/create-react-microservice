// @flow

const nodeExternals = require('webpack-node-externals');
const readJson = require('./lib/readJson.js');
const config = require('./index.js');

module.exports = {
  name: 'server',

  //
  // Override default settings to adjust to the NodeJS environment / module system.
  //
  target: 'async-node',
  output: {
    libraryTarget: 'commonjs2',

    //
    // Do not append hashes on the server side to make it easier to reference files in require statements.
    //
    filename: '[name].js',

    //
    // Set a custom dist folder to avoid serving the server bundle on CDNs / on the webserver.
    //
    path: config.paths.dist('server')
  },

  //
  // Ignore all external dependencies from being bundled in node_modules folder since on NodeJS commonjs2 is still working fine.
  //
  externals: [
    nodeExternals({
      modulesDir: config.paths.modules(),
      whitelist: [/^@immowelt.*$/, /^@company-scope.*$/, /react-/g, /lodash-/g]
    })
  ],

  entry: {
    index: ['isomorphic-fetch', config.paths.src('index.js')]
  },

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
                cacheDirectory: config.env.isDev,
                compact: true
              },
              readJson(
                config.paths.root('packages/my-fancy-ui-config/.babelrc')
              )
            )
          }
        ]
      }
    ]
  },
  plugins: []
};
