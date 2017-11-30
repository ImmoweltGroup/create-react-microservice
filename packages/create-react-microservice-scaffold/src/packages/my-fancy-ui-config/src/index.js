// @flow

import type {ConfigType} from 'create-config';

const createConfig = require('create-config');
const path = require('path');
const {str, num} = require('envalid');

module.exports = createConfig({
  rootDirPath: path.resolve(__dirname, '../../..'),
  loggerId: '@company-scope/my-fancy-ui-config',
  pathsByKey: {
    modules: 'node_modules',
    src: 'packages/my-fancy-ui/src',
    dist: 'packages/my-fancy-ui/dist',
    config: 'packages/my-fancy-ui-config/dist',
    static: 'packages/my-fancy-ui-static-assets'
  },
  requiredVariablesByKey: {
    MY_FANCY_UI_HOST: str({
      default: 'localhost',
      desc: 'The hostname the application will use to spawn the servers on.'
    }),
    MY_FANCY_UI_PORT: num({
      default: 8080,
      desc:
        'The HTTP port of the webserver that will serve the application to the user.'
    }),
    MY_FANCY_UI_SSR_PORT: num({
      default: 8081,
      desc: 'The HTTP port of the hypernova microservice.'
    })
  },
  configsPathsByEnvironmentKey: {
    production: path.join(__dirname, 'index.production.js')
  },
  extend: (config: ConfigType) => ({
    appId: 'my-fancy-ui',

    server: {
      url: `http://${config.env.MY_FANCY_UI_HOST}:${
        config.env.MY_FANCY_UI_PORT
      }/`
    },
    hypernova: {
      url: `http://${config.env.MY_FANCY_UI_HOST}:${
        config.env.MY_FANCY_UI_SSR_PORT
      }/`,
      endpoint: 'batch'
    },

    //
    // Compiler configuration based on the env
    //
    webpack: {
      // Enable source maps, by default this feature will be turned of since it hinders performance during the compilation.
      hasSourceMaps: false,

      // Set a simpler and faster hash type which will be appended to all files compiled by webpack.
      hashType: 'hash',

      // Set a default publicPath under which all assets can be found.
      publicPath: '/'
    },

    globals: {
      __BASENAME__: JSON.stringify(process.env.BASENAME || '')
    }
  })
});
