// @flow

import entry from './index.js';

describe('Entry point', () => {
  it('should export a function for hypernova', () => {
    expect(typeof entry).toBe('function');
  });

  it('should export a "getInitialProps" function to prepare props for the server side rendering', () => {
    expect(typeof entry.getInitialProps).toBe('function');
  });
});
