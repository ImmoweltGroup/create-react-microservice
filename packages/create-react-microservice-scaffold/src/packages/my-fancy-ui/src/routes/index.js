// @flow

type PropsType = {
  name: string
};

import React from 'react';
import i18n from '@company-scope/my-fancy-ui-i18n';
import CommentsList from './../containers/CommentsList/';

const IndexRoute = (props: PropsType) => {
  return (
    <div
      className="mdl-layout__content"
      style={{display: 'flex', justifyContent: 'center'}}
    >
      <div className="page-content" style={{maxWidth: '640px'}}>
        <h2>{i18n.t('application.hello', {name: props.name})}</h2>
        <CommentsList />
      </div>
    </div>
  );
};

export {IndexRoute as default};
