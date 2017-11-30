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

  it('actions.setComments() should create a payload containing the passed argument as the "comments" property', () => {
    // $FlowFixMe: suppressing this error since it is a test case
    const result = actions.setComments(['foo']);

    expect(result).toMatchSnapshot();
  });

  it('actions.setComments() should fallback to an empty array as the "comments" property if no argument was provided', () => {
    // $FlowFixMe: suppressing this error since it is a test case
    const result = actions.setComments();

    expect(result.payload.comments).toEqual([]);
  });

  it('actions.loadComments()', () => {
    const result = actions.loadComments();

    expect(result).toMatchSnapshot();
  });
});
