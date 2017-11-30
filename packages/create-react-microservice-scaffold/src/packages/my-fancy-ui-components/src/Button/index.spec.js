import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import Button from './index.js';

describe('<Button/>', () => {
  let props;

  beforeEach(() => {
    props = {
      foo: 'bar',
      children: 'Foo children'
    };
  });

  it('should render correctly.', () => {
    const wrapper = shallow(<Button {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should merge the classNames prop on the rendered node if given.', () => {
    const wrapper = shallow(<Button {...props} className="myFooClassName" />);

    expect(wrapper.prop('className')).toContain('myFooClassName');
  });
});
