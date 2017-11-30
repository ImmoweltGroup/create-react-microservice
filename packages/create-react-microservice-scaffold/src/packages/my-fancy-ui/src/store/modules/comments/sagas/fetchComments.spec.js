// @flow

import {expectSaga} from 'redux-saga-test-plan';
import {fetchComments} from './fetchComments.js';

describe('fetchComments()', () => {
  let res;

  beforeEach(() => {
    res = {
      ok: true,
      headers: {
        get: () => 'application/json'
      },
      json: () => Promise.resolve(['someComments'])
    };
    global.fetch = jest.fn(() => Promise.resolve(res));
  });

  afterEach(() => {
    res = null;
    global.fetch = undefined;
  });

  it('should be a generator function.', () => {
    expect(typeof fetchComments).toBe('function');
    expect(typeof fetchComments().next).toBe('function');
  });

  it('should fetch the comments from the API and dispatch a "setComments" action with the response to the store.', async function() {
    const result = await expectSaga(fetchComments).run();

    expect(result.toJSON()).toMatchSnapshot();
  });
});
