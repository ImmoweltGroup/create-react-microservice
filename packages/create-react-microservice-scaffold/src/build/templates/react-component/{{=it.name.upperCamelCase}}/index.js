// @flow

import type {Node as NodeType} from 'react';

type PropsType = {
  children: NodeType,
  className?: string
};

import mergeClassNames from 'classcat';
import React from 'react';

const {{=it.name.upperCamelCase}} = (props: PropsType) => {
  const {
    className,
    children,
    ...rest
  } = props;
  const finalClassName = mergeClassNames([
    className
  ]);

  return (
    <div {...rest} className={finalClassName}>
      {children}
    </div>
  );
};
{{=it.name.upperCamelCase}}.defaultProps = {};

export default {{=it.name.upperCamelCase}};
