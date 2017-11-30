// @flow

import type {CommentsByIdType, CommentIdType} from './types.js';

import {createSelector} from 'reselect';
import {getCommentsById} from './selectors.js';

export const getCommentIds = createSelector(
  [getCommentsById],
  (commentsById: CommentsByIdType): Array<CommentIdType> => {
    return Object.keys(commentsById);
  }
);
