// @flow

import type {CommentType} from './types.js';

import {createAction} from 'redux-actions';
import {createActionTypeFactory} from 'redux-lumbergh';
import {moduleId, namepsace} from './config.js';

//
// Action types
//
const createActionType = createActionTypeFactory(namepsace, moduleId);

const actionTypes = {
  LOAD_COMMENTS: createActionType('LOAD_COMMENTS'),
  SET_COMMENTS: createActionType('SET_COMMENTS')
};

//
// Action creators
//
const loadComments = createAction(actionTypes.LOAD_COMMENTS);

export type SetCommentsPayloadType = {comments: Array<CommentType>};
const setComments = createAction(
  actionTypes.SET_COMMENTS,
  (comments: Array<CommentType> = []): SetCommentsPayloadType => ({
    comments
  })
);

const actions = {
  loadComments,
  setComments
};

export {actionTypes, actions};
