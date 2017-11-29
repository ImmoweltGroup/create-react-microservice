// @flow

import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import {{=it.name.upperCamelCase}} from './index.js';

describe('<{{=it.name.upperCamelCase}}/>', () => {
  let props;

  beforeEach(() => {
    props = {
      children: 'Foo children'
    };
  });

  it('should render correctly.', () => {
    const wrapper = shallow(<{{=it.name.upperCamelCase}} {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should merge the classNames prop on the rendered node if given.', () => {
    const wrapper = shallow(<{{=it.name.upperCamelCase}} {...props} className="myFooClassName" />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
