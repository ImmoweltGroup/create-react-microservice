// @flow

import type {Task as ReduxSagaInstanceType} from 'redux-saga';
import type {StateType} from './types.js';

export type StoreOptionsType = {
  initialState?: StateType,
  reduxSagaContext: 'client' | 'server' | 'universal' | 'test'
};
type StoreContextType = {
  store: any,
  rootSagaInstance: ReduxSagaInstanceType<*>
};

import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {combineReduxDucks} from 'redux-lumbergh';
import reduxModules from './manifest.js';

/**
 * Creates the redux store context of the
 * application, e.g. bootstrapping middlewares and returning the finalized store instance.
 *
 * @param  {Object} opts The options to bootstrap the redux store.
 * @return {*}           The finalized redux store.
 */
export function createStoreContext(opts: StoreOptionsType): StoreContextType {
  const {initialState = {}, reduxSagaContext} = opts;
  const {rootReducer, rootSaga} = combineReduxDucks({
    ducks: reduxModules,
    context: reduxSagaContext
  });
  const sagaMiddleware = createSagaMiddleware();
  const rootMiddleware = applyMiddleware(sagaMiddleware);
  const store = createStore(rootReducer, initialState, rootMiddleware);
  const rootSagaInstance = sagaMiddleware.run(rootSaga);

  return {store, rootSagaInstance};
}

export default createStoreContext;
