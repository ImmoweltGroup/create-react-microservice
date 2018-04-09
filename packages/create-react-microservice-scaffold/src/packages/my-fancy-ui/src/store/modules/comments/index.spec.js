// @flow

import {
  sagas,
  selectors,
  actions,
  actionTypes,
  initialState,
  reducer
} from './index.js';

describe('exports', () => {
  it('should export a property of key "actionTypes".', () => {
    expect(actionTypes).toBeDefined();
  });

  it('should export a property of key "actions".', () => {
    expect(actions).toBeDefined();
  });

  it('should export a property of key "selectors".', () => {
    expect(selectors).toBeDefined();
  });

  it('should export a property of key "sagas".', () => {
    expect(sagas).toBeDefined();
  });
});

describe('initialState', () => {
  it('should be an object containing the default state structure.', () => {
    expect(typeof initialState).toBe('object');
  });
});

describe('reducer()', () => {
  it('should be a function.', () => {
    expect(typeof reducer).toBe('function');
  });

  it('reducer()[actionTypes.SET_COMMENTS] should transform and set the api response into the "byId" state structure', () => {
    const initialState = {
      commentsById: {}
    };
    // $FlowFixMe: suppressing this error since it is a test case
    const action = actions.setComments([
      {id: 1, name: 'Foo', body: 'fooBody', email: 'fooEmail'},
      {id: 2, name: 'Bar', body: 'barBody', email: 'barEmail'}
    ]);
    const result = reducer(initialState, action);

    expect(result).toMatchSnapshot();
  });
});
