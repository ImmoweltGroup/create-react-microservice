// @flow

import createStoreContext from './index.js';

describe('createStoreContext()', () => {
  let opts;

  beforeEach(() => {
    opts = {
      query: {},
      reduxSagaContext: 'test'
    };
    global.fetch = jest.fn(() => Promise.resolve());
  });

  afterEach(() => {
    global.fetch = undefined;
  });

  it('should be a function.', () => {
    expect(typeof createStoreContext).toBe('function');
  });

  it('should return a context object containing the store and rootSagaInstance.', () => {
    // $FlowFixMe: Ignore this error since it is a valid test case.
    const context = createStoreContext(opts);

    expect(context.store).toBeDefined();
    expect(context.rootSagaInstance).toBeDefined();
  });
});
