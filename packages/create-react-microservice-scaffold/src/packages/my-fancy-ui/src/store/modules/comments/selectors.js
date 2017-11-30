// @flow

import type {StateType} from './../../types.js';
import type {CommentType, CommentIdType, CommentsByIdType} from './types.js';

import {$get} from 'plow-js';
import {moduleId} from './config.js';

export const getCommentsById = (state: StateType): CommentsByIdType =>
  $get([moduleId, 'commentsById'], state);
export const getCommentForId = (
  state: StateType,
  props: {id: CommentIdType}
): CommentType => $get([moduleId, 'commentsById', props.id], state);
