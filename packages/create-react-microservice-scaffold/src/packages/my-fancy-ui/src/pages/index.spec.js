// @flow

import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import IndexPage from './index.js';

describe('<IndexPage/>', () => {
  let props;

  beforeEach(() => {
    props = {
      name: 'foo'
    };
  });

  it('should render correctly.', () => {
    const wrapper = shallow(<IndexPage {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
