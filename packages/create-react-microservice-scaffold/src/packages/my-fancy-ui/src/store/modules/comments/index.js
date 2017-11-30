// @flow

import type {CommentsByIdType, StateType} from './types.js';
import type {SetCommentsPayloadType} from './actions.js';

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
  commentsById: {}
};

//
// Action Handlers
//
const ACTION_HANDLERS = {
  [actionTypes.SET_COMMENTS]: (payload: SetCommentsPayloadType) => {
    const commentsById: CommentsByIdType = payload.comments.reduce(
      (byId, comment) => {
        byId[comment.id] = comment;

        return byId;
      },
      {}
    );

    return $set('commentsById', commentsById);
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
