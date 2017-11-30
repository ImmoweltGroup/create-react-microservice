// @flow

const fs = require('fs');

module.exports = (filePath: string) =>
  JSON.parse(fs.readFileSync(filePath, 'utf-8'));
