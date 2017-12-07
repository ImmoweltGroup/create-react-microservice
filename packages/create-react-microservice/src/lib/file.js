// @flow

const {existsSync, renameSync} = require('fs');
const findNodeModules = require('find-node-modules');

module.exports = {
  require,
  findNodeModules,
  existsSync,
  renameSync
};
