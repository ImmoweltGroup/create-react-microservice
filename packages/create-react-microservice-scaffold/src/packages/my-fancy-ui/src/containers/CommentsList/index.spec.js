import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import {createMapStateToPropsSnapshot} from 'jest-react-redux';
import {selectors} from './../../store/modules/comments/';
import {CommentsList, mapStateToProps, mapDispatchToProps} from './index.js';

describe('<CommentsList/>', () => {
  let props;

  beforeEach(() => {
    props = {
      loadComments: jest.fn(),
      commentsIds: ['fooId', 'barId']
    };
  });

  it('should render correctly.', () => {
    const wrapper = shallow(<CommentsList {...props} />);

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
      selectors,
      selectorImplementationByKey: {
        getCommentIds: () => ['fooCommentId', 'barCommentId']
      },
      ownProps: {estateId: 'fooEstateId'}
    });

    expect(result).toMatchSnapshot();
  });
});

describe('mapDispatchToProps()', () => {
  it('should be an object', () => {
    expect(typeof mapDispatchToProps).toBe('object');
  });
});
