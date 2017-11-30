#!/usr/bin/env node

/**
 * Starts the Hypernova server / rendering microservice.
 *
 * @return {Void}
 */
const createHypernovaServer = require('./../');
const logger = require('log-fancy')().enforceLogging();
const config = require('@company-scope/my-fancy-ui-config');

(async function() {
  try {
    createHypernovaServer(config);
  } catch (err) {
    logger.error('Hypernova server crashed.');
    logger.fatal(err.message || err);
  }
})();
