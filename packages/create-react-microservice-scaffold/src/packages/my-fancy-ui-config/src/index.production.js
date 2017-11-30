// @flow

import type {ConfigType} from 'create-config';

/**
 * The configuration overrides for the NODE_ENV 'production'.
 *
 * @return {Fn} The overrides function for the production environment.
 */
module.exports = (config: ConfigType) => {
  return {
    webpack: {
      hasSourceMaps: true,
      hashType: 'chunkhash'
    }
  };
};
