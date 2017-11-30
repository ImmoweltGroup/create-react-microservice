// @flow

import type {$Request} from 'express';

const {createVM} = require('hypernova/server');
const pify = require('pify');
const fs = require('fs');
const readFile = pify(fs.readFile);

module.exports = (opts: {bundlePath: string, hypernovaComponentId: string}) => {
  const {bundlePath, hypernovaComponentId} = opts;
  const vm = createVM({});

  return async (req: $Request) => {
    const bundleContents = await readFile(bundlePath, 'utf-8');
    const bundle = vm.run(bundlePath, bundleContents);
    const props = await bundle.getInitialProps({
      req
    });

    return {[hypernovaComponentId]: props};
  };
};
