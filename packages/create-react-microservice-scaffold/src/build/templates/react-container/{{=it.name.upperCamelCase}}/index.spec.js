// @flow

import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import {createMapStateToPropsSnapshot} from 'jest-react-redux';
import {{{=it.name.upperCamelCase}}, mapStateToProps, mapDispatchToProps} from './index.js';

describe('<{{=it.name.upperCamelCase}} />', () => {
  let props;

  beforeEach(() => {
    props = {};
  });

  it('should render correctly.', () => {
    const wrapper = shallow(<{{=it.name.upperCamelCase}} {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('mapStateToProps()', () => {
  it('should be a function', () => {
    expect(typeof mapStateToProps).toBe('function');
  });

  it('should execute all given selectors with the state and return an object containing the state props.', () => {
    const result = createMapStateToPropsSnapshot({
      mapStateToProps,
      selectors: {},
      selectorImplementationByKey: {},
      ownProps: {}
    });

    expect(result).toMatchSnapshot();
  });
});

describe('mapDispatchToProps()', () => {
  it('should be an object', () => {
    expect(typeof mapDispatchToProps).toBe('object');
  });
});
