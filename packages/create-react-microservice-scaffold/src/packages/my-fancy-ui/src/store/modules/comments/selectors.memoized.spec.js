import * as selectors from './selectors.memoized.js';
import {moduleId} from './config.js';

describe('getCommentIds()', () => {
  it('should be a function.', () => {
    expect(typeof selectors.getCommentIds).toBe('function');
  });

  it(`should return the "${moduleId}.commentsById" value.`, () => {
    const state = {
      [moduleId]: {
        commentsById: {
          foo: {},
          bar: {}
        }
      }
    };
    const result = selectors.getCommentIds(state);

    expect(result).toMatchSnapshot();
  });
});
