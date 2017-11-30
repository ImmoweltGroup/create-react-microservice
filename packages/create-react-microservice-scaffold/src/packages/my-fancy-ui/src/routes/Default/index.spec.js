// @flow

import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import DefaultLayout from './index.js';

describe('<Default/>', () => {
  let props;

  beforeEach(() => {
    props = {
      name: 'foo'
    };
  });

  it('should render correctly.', () => {
    const wrapper = shallow(<DefaultLayout {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
