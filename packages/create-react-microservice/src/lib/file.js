// @flow

const {existsSync} = require('fs');
const findNodeModules = require('find-node-modules');

module.exports = {
  require,
  findNodeModules,
  existsSync
};
