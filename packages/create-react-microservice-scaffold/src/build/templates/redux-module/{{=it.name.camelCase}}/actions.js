// @flow

import {createAction} from 'redux-actions';
import {createActionTypeFactory} from 'redux-lumbergh';
import {namepsace, moduleId} from './config.js';

//
// Action types
//
const createActionType = createActionTypeFactory(namepsace, moduleId);

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
