// @flow

const file = require('./file.js');

describe('file.require()', () => {
  it('should be a function', () => {
    expect(typeof file.require).toBe('function');
  });
});

describe('file.findNodeModules()', () => {
  it('should be a function', () => {
    expect(typeof file.findNodeModules).toBe('function');
  });
});

describe('file.existsSync()', () => {
  it('should be a function', () => {
    expect(typeof file.existsSync).toBe('function');
  });
});
