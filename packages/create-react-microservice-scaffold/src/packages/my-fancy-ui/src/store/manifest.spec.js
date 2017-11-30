// @flow

import ducks from './manifest.js';

describe('ducks default export', () => {
  it('should be an array.', () => {
    expect(ducks instanceof Array).toBe(true);
  });
});
