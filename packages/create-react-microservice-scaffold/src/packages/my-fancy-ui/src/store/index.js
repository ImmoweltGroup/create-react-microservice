// @flow

import type {Task as ReduxSagaInstanceType} from 'redux-saga';
import type {StateType} from './types.js';

export type StoreOptionsType = {
  initialState?: StateType | Object,
  errors?: Array<{message: string, stack: string}>,
  reduxSagaContext: 'client' | 'server' | 'universal' | 'test'
};
type StoreContextType = {
  store: any,
  rootSagaInstance: ReduxSagaInstanceType<*>
};

import {applyMiddleware, createStore as createReduxStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {combineReduxDucks} from 'redux-lumbergh';
import serialize from 'serialize-error';
import reduxModules from './manifest.js';

export class Store {
  /**
   * Creates the redux store instance of the application.
   *
   * @param  {Object} opts The options to bootstrap the redux store.
   * @return {Object}      The object containing the finalized redux store and saga instance.
   */
  static createStore(opts: StoreOptionsType): StoreContextType {
    const {initialState, reduxSagaContext} = opts;
    const {rootReducer, rootSaga} = combineReduxDucks({
      ducks: reduxModules,
      context: reduxSagaContext
    });
    const sagaMiddleware = createSagaMiddleware();
    const rootMiddleware = applyMiddleware(sagaMiddleware);
    const store = createReduxStore(rootReducer, initialState, rootMiddleware);
    const rootSagaInstance = sagaMiddleware.run(rootSaga);

    return {store, rootSagaInstance};
  }

  /**
   * Prepare the server side props for the application.
   *
   * @return {Promise}      The Promise that resolves with the server side props of the application.
   */
  static async createServerProps(): Promise<StoreOptionsType> {
    const errors = [];

    //
    // Since this function creates the props for the client, we explicitely set the reduxSagaContext to client only,
    // to avoid e.g. duplicate HTTP requests which where already executed on the server.
    //
    let reduxSagaContext = 'client';
    let initialState = {};

    //
    // We wrap the server side state generation inside a try/catch to have the ability to fall back to an
    // server AND client saga behavior if the state generation failed.
    //
    try {
      const {store, rootSagaInstance} = Store.createStore({
        reduxSagaContext: 'server'
      });

      await rootSagaInstance.done;

      initialState = store.getState();
    } catch (e) {
      reduxSagaContext = 'universal';
      errors.push(serialize(e));
    }

    return {
      reduxSagaContext,
      errors,
      initialState
    };
  }
}
