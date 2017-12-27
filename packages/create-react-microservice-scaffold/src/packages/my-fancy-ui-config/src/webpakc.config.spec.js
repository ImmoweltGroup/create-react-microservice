const configs = require('./webpack.config.js');

describe('webpack config', () => {
  it('should export an array of objects.', () => {
    expect(configs instanceof Array).toBeTruthy();
  });
});
