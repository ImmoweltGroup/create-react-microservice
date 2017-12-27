// @flow

import type {StateType} from './../store/types.js';

type PropsType = {
  query: Object,
  errors: Array<{message: string, stack: string}>,
  initialState?: StateType | Object,
  reduxSagaContext: 'client' | 'server' | 'universal' | 'test'
};

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import i18n from '@company-scope/my-fancy-ui-i18n';
import logger from '@company-scope/my-fancy-ui-logger';
import {Store} from './../store/';
import CommentsList from './../containers/CommentsList/';

class IndexPage extends Component<PropsType> {
  /**
   * Prepare the server side props for the application, similar to next.js.
   *
   * @param  {Object}  opts The options from either `next.js` or the `express-hypernova` middleware.
   * @return {Promise}      The Promise that resolves with the server side props of the application.
   */
  static async getInitialProps({req}: Object): Promise<PropsType> {
    const storeProps = await Store.createServerProps();

    return {
      query: req.query,
      ...storeProps
    };
  }

  render() {
    const {errors, query, initialState, reduxSagaContext} = this.props;
    const {name = 'mate', locale = 'en-US'} = query;
    const {store} = Store.createStore({
      reduxSagaContext,
      initialState
    });

    i18n.locale(locale);

    errors.forEach(err => {
      logger.error('Server-Side-Error:', err.message, err.stack);
    });

    return (
      <Provider store={store}>
        <div
          className="mdl-layout__content"
          style={{display: 'flex', justifyContent: 'center'}}
        >
          <div className="page-content" style={{maxWidth: '640px'}}>
            <h2>{i18n.t('application.hello', {name})}</h2>
            <CommentsList />
          </div>
        </div>
      </Provider>
    );
  }
}

export {IndexPage as default};
