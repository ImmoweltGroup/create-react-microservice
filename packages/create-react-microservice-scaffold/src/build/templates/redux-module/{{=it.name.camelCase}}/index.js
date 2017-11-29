// @flow

import type {SetCounterPayloadType} from './actions.js';

import {$set} from 'plow-js';
import {createReducer} from 'redux-lumbergh';
import sagas from './sagas/';
import * as memoizedSelectors from './selectors.memoized.js';
import * as inputSelectors from './selectors.js';
import {actions, actionTypes} from './actions.js';
import {moduleId} from './config.js';

//
// The state structure
//
const initialState: StateType = {
  counter: 0
};

//
// Action Handlers
//
const ACTION_HANDLERS = {
  [actionTypes.SET_COUNTER]: (payload: SetCounterPayloadType) => {
    return $set(['value'], payload.value);
  }
};

//
// Reducer
//
const reducer = createReducer(initialState, ACTION_HANDLERS);

//
// Export all selectors as one object.
//
export const selectors = {
  ...memoizedSelectors,
  ...inputSelectors
};

export {moduleId, sagas, actions, actionTypes, initialState, reducer};
