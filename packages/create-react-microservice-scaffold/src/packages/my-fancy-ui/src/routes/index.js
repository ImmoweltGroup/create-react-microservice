// @flow

type PropsType = {
  name: string,
  className?: string
};

import React from 'react';
import mergeClassNames from 'classcat';
import i18n from '@company-scope/my-fancy-ui-i18n';
import CommentsList from './../containers/CommentsList/';

const IndexRoute = (props: PropsType) => {
  const {name, className, ...rest} = props;
  const finalClassName = mergeClassNames(['mdl-layout__content', className]);

  return (
    <div
      {...rest}
      className={finalClassName}
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
