const config = require('./index.js');

describe('config', () => {
  it('should export an object.', () => {
    expect(typeof config).toBe('object');
  });
});
