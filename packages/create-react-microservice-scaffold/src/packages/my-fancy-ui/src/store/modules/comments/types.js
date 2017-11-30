// @flow

export type CommentIdType = string;
export type CommentType = {
  id: number,
  email: string,
  name: string,
  body: string
};
export type CommentsByIdType = {
  [CommentIdType]: CommentType
};

export type StateType = {
  commentsById: CommentsByIdType
};
