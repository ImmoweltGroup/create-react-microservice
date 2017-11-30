import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import {createMapStateToPropsSnapshot} from 'jest-react-redux';
import {selectors} from './../../store/modules/comments/';
import {CommentsListComment, mapStateToProps} from './index.js';

describe('<CommentsListComment/>', () => {
  let props;

  beforeEach(() => {
    props = {
      commentId: 'fooId',
      deleteComment: jest.fn(),
      comment: {
        id: 1,
        email: 'foo@bar.com',
        name: 'Foo Bar',
        body: 'Lorem ipsum'
      }
    };
  });

  it('should render correctly.', () => {
    const wrapper = shallow(<CommentsListComment {...props} />);

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
        getCommentForId: () => ({commentId: 'fooId'})
      },
      ownProps: {commentId: 'fooId'}
    });

    expect(result).toMatchSnapshot();
  });
});
