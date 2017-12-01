// @flow

import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import IndexRoute from './index.js';

describe('<IndexRoute/>', () => {
  let props;

  beforeEach(() => {
    props = {
      name: 'foo'
    };
  });

  it('should render correctly.', () => {
    const wrapper = shallow(<IndexRoute {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
