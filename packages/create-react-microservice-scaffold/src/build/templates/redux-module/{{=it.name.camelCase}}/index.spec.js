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
    expect(typeof initialState.value).toBe('number');
  });
});

describe('reducer()', () => {
  it('should be a function.', () => {
    expect(typeof reducer).toBe('function');
  });

  it('reducer()[actionTypes.SET_COUNTER] should set the payloads value to the "value" state property', () => {
    const initialState = {
      value: 10
    };
    const action = actions.setCounter(2);
    const result = reducer(initialState, action);

    expect(result).toMatchSnapshot();
  });
});
