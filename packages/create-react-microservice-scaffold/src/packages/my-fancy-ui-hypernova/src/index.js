// @flow

import type {ConfigType} from 'create-config';

const hypernova = require('hypernova/server');

module.exports = (config: ConfigType) => {
  const {isDev, MY_FANCY_UI_SSR_PORT, MY_FANCY_UI_HOST} = config.env;
  const bundlePathsById = {
    [config.appId]: config.paths.dist('server/index.js')
  };
  const getComponentByEnvKey = {
    production: hypernova.createGetComponent(bundlePathsById),
    development: id => {
      const invalidateCache = require('invalidate-module');
      const path = bundlePathsById[id];

      // Invalidate the require cache in development to avoid restarting the hypernova server.
      // @see https://github.com/airbnb/hypernova/issues/87
      invalidateCache(path);

      return require(path);
    }
  };

  return hypernova({
    devMode: isDev,
    host: MY_FANCY_UI_HOST,
    port: MY_FANCY_UI_SSR_PORT,
    endpoint: `/${config.hypernova.endpoint}`,
    getComponent: isDev
      ? getComponentByEnvKey.development
      : getComponentByEnvKey.production
  });
};
