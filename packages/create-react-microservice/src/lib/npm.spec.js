// @flow

const npm = require('./npm.js');

describe('npm.latestVersion()', () => {
  it('should be a function', () => {
    expect(typeof npm.latestVersion).toBe('function');
  });
});
