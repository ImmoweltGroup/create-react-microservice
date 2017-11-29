// @flow

import {put, call, delay, select} from 'redux-saga/effects';
import {createEnvironmentSpecificSaga} from 'redux-lumbergh';

import {actions} from './../actions.js';
import {getCounter} from './../selectors.js';

export function* incrementCounter(): Generator<any, any, any> {
  const currentCounter = yield select(getCounter);

  yield call(console.log, currentCounter);

  yield put(actions.setCounter(currentCounter + 1));
}

export function* incrementCounterLoop(): Generator<any, any, any> {
  while (true) {
    yield call(incrementCounter);
    yield delay(250);
  }
}

export default [
  createEnvironmentSpecificSaga.client(incrementCounterLoop)
];
