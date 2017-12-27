const createHypernovaServer = require('./index.js');

describe('hypernova', () => {
  it('should export an function.', () => {
    expect(typeof createHypernovaServer).toBe('function');
  });
});
