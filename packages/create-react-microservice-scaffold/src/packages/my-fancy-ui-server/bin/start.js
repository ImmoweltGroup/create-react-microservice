#!/usr/bin/env node

/**
 * Starts the HTTP web server which gets exposed from the Docker container.
 *
 * @return {Void}
 */
const http = require('http');
const logger = require('log-fancy')().enforceLogging();
const config = require('@company-scope/my-fancy-ui-config');
const createServerApp = require('./../');

(async function() {
  try {
    const {MY_FANCY_UI_PORT, MY_FANCY_UI_HOST} = config.env;
    const app = await createServerApp(config);

    //
    // Create a HTTP server variant which forces SSL usage.
    // The real application is created with the https module.
    //
    http.createServer(app).listen(MY_FANCY_UI_PORT, () => {
      logger.success(
        `Node Web server(pid: ${process.pid}) is up and running on http://${
          MY_FANCY_UI_HOST
        }:${MY_FANCY_UI_PORT}.`
      );
    });
  } catch (err) {
    logger.error('Node Web server crashed.');
    logger.fatal(err.message || err);
  }
})();
