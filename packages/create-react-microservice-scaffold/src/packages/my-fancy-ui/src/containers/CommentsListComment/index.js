// @flow

import type {Connector} from 'react-redux';
import type {StateType} from './../../store/types.js';
import type {
  CommentIdType,
  CommentType
} from './../../store/modules/comments/types.js';

type OwnPropsType = {
  commentId: CommentIdType
};
type StatePropsType = {
  comment: CommentType
};
type DispatchPropsType = {};
type PropsType = OwnPropsType & StatePropsType & DispatchPropsType;

import React from 'react';
import {connect} from 'react-redux';
import {selectors as commentsSelectors} from './../../store/modules/comments/';

const CommentsListComment = (props: PropsType) => {
  const {comment, commentId} = props;

  return (
    <div
      className="mdl-card mdl-card__supporting-text mdl-shadow--2dp"
      style={{marginBottom: '1.5rem', width: '100%'}}
    >
      <div>
        <b>{commentId}</b>
        &nbsp;
        {comment.name} ({comment.email})
      </div>
      <p className="comments__comment__body">{comment.body}</p>
    </div>
  );
};

const mapStateToProps = (
  state: StateType,
  ownProps: OwnPropsType
): StatePropsType => ({
  comment: commentsSelectors.getCommentForId(state, {id: ownProps.commentId})
});
const connector: Connector<OwnPropsType, PropsType> = connect(mapStateToProps);
const Container = connector(CommentsListComment);

export {CommentsListComment, mapStateToProps, Container as default};
