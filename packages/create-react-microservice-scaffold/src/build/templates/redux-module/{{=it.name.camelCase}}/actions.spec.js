// @flow

import {actionTypes, actions} from './actions.js';

describe('actionTypes', () => {
  it('should be an object.', () => {
    expect(typeof actionTypes).toBe('object');
  });
});

describe('actions', () => {
  it('should be an object.', () => {
    expect(typeof actions).toBe('object');
  });

  it('actions.setCounter() should create a payload containing the passed argument as the "value" property', () => {
    const result = actions.setCounter(2);

    expect(result).toMatchSnapshot();
  });
});
