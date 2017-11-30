// @flow

import type {ConfigType} from 'create-config';
import type {$Response, $Request} from 'express';

const express = require('express');
const Renderer = require('hypernova-client');
const devModePlugin = require('hypernova-client/plugins/devModePlugin');
const createHypernovaMiddleware = require('@immowelt/hypernova-express');
const expressStatusMonitor = require('express-status-monitor');
const compression = require('compression');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const createRequestPropsFactory = require('./lib/createRequestPropsFactory');

/**
 * Creates the express app that you can pass to etiher the `http.createServer` or `https.createServer` method.
 * We pass in the config as an argument to avoid circular dependencies between the `my-fancy-ui-config` and `my-fancy-ui-server` packages.
 *
 * @param  {Object} config The projects config based on the `util-create-project-config` package.
 * @return {*}             The express app instance to etiher extend or directly use.
 */
function createExpressApp(config: ConfigType) {
  const {isDev} = config.env;
  const app = express();

  //
  // Enforce best practices.
  //
  app.use(cors());
  app.use(helmet());
  app.use(compression());
  app.use(bodyParser.json());

  //
  // Hook in logging and status endpoints.
  //
  app.use(morgan(isDev ? 'dev' : 'combined'));

  //
  // Add a static health endpoint for your DC/OS to check if the instance is still up and running.
  //
  app.get('/manage/health.json', (req: $Request, res: $Response) => {
    res.json({status: 'UP'});
  });
  app.use(
    expressStatusMonitor({
      title: `my-fancy-ui status`,
      path: '/manage/status'
    })
  );

  //
  // Serve the compiled assets and static folder
  //
  app.use(express.static(config.paths.dist('client')));
  app.use(express.static(config.paths.static()));

  //
  // Setup server side rendering for the universal application.
  //
  app.get(
    '/',
    createHypernovaMiddleware({
      createRequestProps: createRequestPropsFactory({
        bundlePath: config.paths.dist('server/index.js'),
        hypernovaComponentId: config.appId
      }),
      templatePath: config.paths.dist('index.html'),
      templateMarker: '<i data-html></i>',
      renderer: new Renderer({
        url: config.hypernova.url + config.hypernova.endpoint,
        plugins: [isDev ? devModePlugin : null].filter(Boolean)
      })
    })
  );

  return app;
}

module.exports = createExpressApp;
