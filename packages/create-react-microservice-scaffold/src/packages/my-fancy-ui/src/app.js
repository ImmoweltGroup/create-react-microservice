// @flow

import type {StateType} from './store/types.js';

type PropsType = {
  query: Object,
  errors: Array<{message: string, stack: string}>,
  initialState: StateType | Object,
  reduxSagaContext: 'client' | 'server' | 'universal' | 'test'
};

import React, {Component} from 'react';
import logger from '@company-scope/my-fancy-ui-logger';
import {Provider} from 'react-redux';
import serialize from 'serialize-error';
import IndexRoute from './routes/';
import {createStoreContext} from './store/';

class App extends Component<PropsType> {
  /**
   * Prepare the server side props for the application, similar to next.js.
   *
   * @param  {Object}  opts The options from either `next.js` or the `express-hypernova` middleware.
   * @return {Promise}      The Promise that resolves with the server side props of the application.
   */
  static async getInitialProps({req}: Object): Promise<PropsType> {
    const {query} = req;
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
      const {store, rootSagaInstance} = createStoreContext({
        reduxSagaContext: 'server'
      });

      await rootSagaInstance.done;

      initialState = store.getState();
    } catch (e) {
      reduxSagaContext = 'universal';
      errors.push(serialize(e));
    }

    return {
      query,
      reduxSagaContext,
      errors,
      initialState
    };
  }

  render() {
    const {errors = [], query, initialState, reduxSagaContext} = this.props;
    const {name = 'mate'} = query;
    const {store} = createStoreContext({
      reduxSagaContext,
      initialState
    });

    errors.forEach(err => {
      logger.error('Server-Side-Error:', err.message, err.stack);
    });

    return (
      <Provider store={store}>
        <IndexRoute name={name} />
      </Provider>
    );
  }
}

export default App;
