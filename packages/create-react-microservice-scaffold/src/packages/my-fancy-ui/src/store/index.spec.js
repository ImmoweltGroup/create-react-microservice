// @flow

import {Store, createStore, createServerProps} from './index.js';

describe('createStore()', () => {
  let opts;

  beforeEach(() => {
    opts = {
      query: {},
      reduxSagaContext: 'test'
    };
    global.fetch = jest.fn(() => Promise.resolve());
  });

  afterEach(() => {
    global.fetch = undefined;
  });

  it('should be a function.', () => {
    expect(typeof createStore).toBe('function');
  });

  it('should return a context object containing the store and rootSagaInstance.', () => {
    // $FlowFixMe: Ignore this error since it is a valid test case.
    const context = createStore(opts);

    expect(context.store).toBeDefined();
    expect(context.rootSagaInstance).toBeDefined();
  });
});

describe('createStore()', () => {
  let createStore;

  beforeEach(() => {
    createStore = jest
      .spyOn(Store, 'createStore')
      .mockImplementation(jest.fn());
  });

  afterEach(() => {
    // $FlowFixMe: Ignore errors since the jest type-def is out of date.
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should be a function', () => {
    expect(typeof createServerProps).toBe('function');
  });

  it('should create the store context and await the result of the redux-saga middleware instance and resolve with the generated state', async () => {
    createStore.mockReturnValueOnce({
      store: {
        getState: jest.fn(() => ({serverSideState: 'foo'}))
      },
      rootSagaInstance: {
        done: Promise.resolve()
      }
    });

    // $FlowFixMe: suppressing this error since it is a test case
    const props = await createServerProps({
      req: {query: {}}
    });

    expect(createStore).toHaveBeenCalledTimes(1);
    expect(props.initialState.serverSideState).toBe('foo');
    expect(props.reduxSagaContext).toBe('client');
    expect(props.errors).toHaveLength(0);
  });

  it('should not throw errors but pass them to the returned "errors" array', async () => {
    createStore.mockReturnValueOnce({
      store: {
        getState: jest.fn(() => ({serverSideState: 'foo'}))
      },
      rootSagaInstance: {
        done: Promise.reject(new Error('Something bad happened'))
      }
    });

    // $FlowFixMe: suppressing this error since it is a test case
    const props = await createServerProps({
      req: {query: {}}
    });

    expect(props.errors).toHaveLength(1);
    expect(props.reduxSagaContext).toBe('universal');
  });
});
