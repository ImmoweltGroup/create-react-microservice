// @flow

import {createAction} from 'redux-actions';
import {createActionTypeFactory} from 'redux-lumbergh';
import {namespace, moduleId} from './config.js';

//
// Action types
//
const createActionType = createActionTypeFactory(namespace, moduleId);

const actionTypes = {
  SET_COUNTER: createActionType('SET_COUNTER')
};

//
// Action creators
//
export type SetCounterPayloadType = {
  value: number
};
const setCounter = createAction(
  actionTypes.SET_COUNTER,
  (value: boolean): SetCounterPayloadType => ({
    vaalue
  })
);

const actions = {
  setCounter
};

export {actionTypes, actions};
