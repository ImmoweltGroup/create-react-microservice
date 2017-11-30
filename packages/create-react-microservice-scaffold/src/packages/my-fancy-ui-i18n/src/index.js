// @flow

import Polyglot from 'node-polyglot';
import * as phrases from './en-US.js';

let singleton;

export default (() => {
  if (!singleton) {
    singleton = new Polyglot({
      locale: 'en-US',
      phrases
    });
  }

  return singleton;
})();
