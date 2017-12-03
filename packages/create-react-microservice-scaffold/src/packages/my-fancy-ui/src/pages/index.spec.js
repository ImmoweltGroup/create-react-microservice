// @flow

import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import logger from '@company-scope/my-fancy-ui-logger';
import IndexPage from './index.js';

describe('<IndexPage/>', () => {
  let props;

  beforeEach(() => {
    props = {
      query: {name: 'foo'},
      errors: [],
      initialState: {},
      reduxSagaContext: 'test'
    };
  });

  it('should render correctly.', () => {
    const wrapper = shallow(<IndexPage {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should not throw errors but log them when passed from the server side.', () => {
    const spy = jest.spyOn(logger, 'error').mockImplementation(jest.fn());
    const errors = [
      {
        message: '',
        stack: ''
      }
    ];

    expect(() =>
      shallow(<IndexPage {...props} errors={errors} />)
    ).not.toThrow();
    expect(spy.mock.calls.length).toBe(1);
  });
});
