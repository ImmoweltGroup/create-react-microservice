import * as selectors from './selectors.js';
import {moduleId} from './config.js';

describe('getCommentsById()', () => {
  it('should be a function.', () => {
    expect(typeof selectors.getCommentsById).toBe('function');
  });

  it(`should return the "${moduleId}.commentsById" value.`, () => {
    const state = {
      [moduleId]: {
        commentsById: 'foo'
      }
    };
    const result = selectors.getCommentsById(state);

    expect(result).toMatchSnapshot();
  });
});

describe('getCommentForId()', () => {
  it('should be a function.', () => {
    expect(typeof selectors.getCommentForId).toBe('function');
  });

  it(`should return the value of the "${moduleId}.commentsById" key which matches the propagated prop id.`, () => {
    const state = {
      [moduleId]: {
        commentsById: {
          foo: 'bar'
        }
      }
    };
    const props = {
      id: 'foo'
    };
    const result = selectors.getCommentForId(state, props);

    expect(result).toMatchSnapshot();
  });
});
