// @flow

import React from 'react';
import {shallow} from 'enzyme';
import {Provider} from 'react-redux';
import logger from '@company-scope/my-fancy-ui-logger';
import * as store from './store/';
import App from './app.js';

describe('<App/>', () => {
  let props;

  beforeEach(() => {
    props = {
      query: {},
      errors: [],
      initialState: {},
      reduxSagaContext: 'test'
    };
  });

  it('renders and propagates additional props to the wrapper', () => {
    const wrapper = shallow(<App {...props} />);

    expect(wrapper.length).toBe(1);
    expect(wrapper.find(Provider).prop('store')).toBeDefined();
  });

  it('should not throw errors but log them when passed from the server side.', () => {
    const spy = jest.spyOn(logger, 'error').mockImplementation(jest.fn());
    const errors = [
      {
        message: '',
        stack: ''
      }
    ];

    expect(() => shallow(<App {...props} errors={errors} />)).not.toThrow();
    expect(spy.mock.calls.length).toBe(1);
  });

  describe('getInitialProps()', () => {
    let createStoreContext;

    beforeEach(() => {
      createStoreContext = jest
        .spyOn(store, 'createStoreContext')
        .mockImplementation(jest.fn());
    });

    afterEach(() => {
      // $FlowFixMe: Ignore errors since the jest type-def is out of date.
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });

    it('should be a function', () => {
      expect(typeof App.getInitialProps).toBe('function');
    });

    it('should create the store context and await the result of the redux-saga middleware instance and resolve with the generated state', async () => {
      createStoreContext.mockReturnValueOnce({
        store: {
          getState: jest.fn(() => ({serverSideState: 'foo'}))
        },
        rootSagaInstance: {
          done: Promise.resolve()
        }
      });

      // $FlowFixMe: suppressing this error since it is a test case
      const props = await App.getInitialProps({
        req: {query: {}}
      });

      expect(createStoreContext).toHaveBeenCalledTimes(1);
      expect(props.initialState.serverSideState).toBe('foo');
      expect(props.reduxSagaContext).toBe('client');
      expect(props.errors).toHaveLength(0);
    });

    it('should not throw errors but pass them to the returned "errors" array', async () => {
      createStoreContext.mockReturnValueOnce({
        store: {
          getState: jest.fn(() => ({serverSideState: 'foo'}))
        },
        rootSagaInstance: {
          done: Promise.reject(new Error('Something bad happened'))
        }
      });

      // $FlowFixMe: suppressing this error since it is a test case
      const props = await App.getInitialProps({
        req: {query: {}}
      });

      expect(props.errors).toHaveLength(1);
      expect(props.reduxSagaContext).toBe('universal');
    });
  });
});
