//
// Configuration for the `pwmetrics` CLI.
// @see https://github.com/paulirish/pwmetrics#all-available-configuration-options
// @see https://github.com/paulirish/pwmetrics/#available-metrics
//
const config = require('./../packages/my-fancy-ui-config');

module.exports = {
  url: config.server.url,

  flags: {
    runs: 10,
    expectations: true
  },
  expectations: {
    ttfmp: {
      warn: '>=3000',
      error: '>=5000'
    },
    ttfcp: {
      warn: '>=4000',
      error: '>=5000'
    },
    psi: {
      warn: '>=3500',
      error: '>=5000'
    }
  }
};
