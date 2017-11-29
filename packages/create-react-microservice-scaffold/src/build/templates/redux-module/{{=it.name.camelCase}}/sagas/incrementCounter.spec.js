// @flow

import {expectSaga} from 'redux-saga-test-plan';
import {moduleId} from './../config.js';
import {incrementCounter} from './incrementCounter.js';

describe('incrementCounter()', () => {
  it('should be a generator function.', () => {
    expect(typeof incrementCounter).toBe('function');
    expect(typeof incrementCounter().next).toBe('function');
  });

  it('should retrieve the current counter value, log it and increment it afterwards by one.', async function() {
    const result = await expectSaga(incrementCounter).withState({
      [moduleId]: {
        counter: 0
      }
    }).run();

    expect(result.toJSON()).toMatchSnapshot();
  });
});
