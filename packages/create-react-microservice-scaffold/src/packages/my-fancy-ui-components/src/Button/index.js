// @flow

import type {Node as NodeType} from 'react';

type PropsType = {
  children: NodeType,
  className?: string
};

import mergeClassNames from 'classcat';
import React from 'react';

const Button = (props: PropsType) => {
  const {className, ...rest} = props;
  const finalClassName = mergeClassNames([
    'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent',
    className
  ]);

  return <button {...rest} className={finalClassName} />;
};

export default Button;
