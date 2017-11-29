import * as selectors from './selectors.js';
import {moduleId} from './config.js';

describe('getCounter()', () => {
  it('should be a function.', () => {
    expect(typeof selectors.getCounter).toBe('function');
  });

  it(`should return the ${moduleId}.value property.`, () => {
    const state = {
      [moduleId]: {
        value: 2
      }
    };
    const result = selectors.getCounter(state);

    expect(result).toMatchSnapshot();
  });
});
