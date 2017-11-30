// @flow

import type {CommentType} from './../types.js';

import {put, call, takeLatest} from 'redux-saga/effects';
import {createEnvironmentSpecificSaga} from 'redux-lumbergh';
import {
  actions as commentsActions,
  actionTypes as commentsActionTypes
} from './../actions.js';

export function* fetchComments(): Generator<any, any, any> {
  const response = yield call(
    fetch,
    'https://jsonplaceholder.typicode.com/comments'
  );
  const comments: Array<CommentType> = yield response.json();

  yield put(commentsActions.setComments(comments));
}

function* watchFetchComments(): Generator<any, any, any> {
  yield takeLatest(commentsActionTypes.LOAD_COMMENTS, fetchComments);
}

export default [
  createEnvironmentSpecificSaga.server(fetchComments),
  createEnvironmentSpecificSaga.client(watchFetchComments)
];
