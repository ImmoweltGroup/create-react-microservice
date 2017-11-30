// @flow

const merge = require('webpack-merge');
const baseWebPackConfig = require('./webpack.config.base.js');
const config = require('./index.js');
const {isDev, isProduction} = config.env;

//
// Since the merge will be from left to right, we specify the base config first.
//
const webpackConfigs = {
  client: [baseWebPackConfig],
  server: [baseWebPackConfig]
};

//
// We specify the environment overrides afterwards since the `react-error-overlay` entry
// needs to be first within the bundle (before the application code itself).
//
if (isDev) {
  webpackConfigs.client.push(require('./webpack.config.client.development.js'));
  webpackConfigs.server.push(require('./webpack.config.server.development.js'));
}
if (isProduction) {
  webpackConfigs.client.push(require('./webpack.config.client.production.js'));
  webpackConfigs.server.push(require('./webpack.config.server.production.js'));
}

//
// And finaly the bundle defaults.
//
webpackConfigs.client.push(require('./webpack.config.client.defaults.js'));
webpackConfigs.server.push(require('./webpack.config.server.defaults.js'));

module.exports = [
  merge(...webpackConfigs.client),
  merge(...webpackConfigs.server)
];
