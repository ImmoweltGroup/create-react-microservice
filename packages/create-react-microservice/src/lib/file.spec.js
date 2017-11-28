// @flow

const file = require('./file.js');

describe('file.require()', () => {
  it('should be a function', () => {
    expect(typeof file.require).toBe('function');
  });
});
