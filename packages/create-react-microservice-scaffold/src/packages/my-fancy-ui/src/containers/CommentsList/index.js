// @flow

import type {Connector} from 'react-redux';
import type {StateType} from './../../store/types.js';
import type {CommentIdType} from './../../store/modules/comments/types.js';

type OwnPropsType = {};
type StatePropsType = {
  commentsIds: Array<CommentIdType>
};
type DispatchPropsType = {
  loadComments: () => mixed
};
type PropsType = OwnPropsType & StatePropsType & DispatchPropsType;

import React from 'react';
import {connect} from 'react-redux';
import i18n from '@company-scope/my-fancy-ui-i18n';
import Button from '@company-scope/my-fancy-ui-components/src/Button/';
import {
  selectors as commentsSelectors,
  actions as commentsActions
} from './../../store/modules/comments/';
import Comment from './../CommentsListComment/';

const CommentsList = (props: PropsType) => {
  const {loadComments, commentsIds} = props;

  return (
    <div>
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--6-col">
          <h4 style={{margin: '3px 0'}}>{i18n.t('comments.title')}</h4>
        </div>
        <div className="mdl-cell mdl-cell--6-col mdl-typography--text-right">
          <Button onClick={loadComments}>↺ {i18n.t('comments.load')}</Button>
        </div>
      </div>

      {commentsIds.map(id => <Comment key={id} commentId={id} />)}
    </div>
  );
};

const mapStateToProps = (state: StateType): StatePropsType => ({
  commentsIds: commentsSelectors.getCommentIds(state)
});
const mapDispatchToProps: DispatchPropsType = {
  loadComments: commentsActions.loadComments
};
const connector: Connector<OwnPropsType, PropsType> = connect(
  mapStateToProps,
  mapDispatchToProps
);
const Container = connector(CommentsList);

export {
  CommentsList,
  mapStateToProps,
  mapDispatchToProps,
  Container as default
};
