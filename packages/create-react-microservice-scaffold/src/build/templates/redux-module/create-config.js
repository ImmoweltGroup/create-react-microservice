const path = require('path');

module.exports = {
  id: 'redux-module',
  description:
    'A template that will scaffold a new redux module for you into the "my-fancy-ui" package.',
  resolveQuestions: async flags => [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name for the Redux Module?',
      validate: Boolean
    }
  ],
  resolveFiles: async (answers, flags) => ['*/**'],
  resolveDestinationFolder: async (answers, args, flags) => {
    return path.join(
      __dirname,
      '../../../packages/my-fancy-ui/src/store/modules/'
    );
  },
  onFinish: async (answers, args, flags) => {
    console.log(`Redux module created - Please register it in your application by modifying "packages/my-fancy-ui/src/store/manifest.js".

1. Import the created module, e.g.

import * as ${args.name.camelCase} from './modules/${args.name.camelCase}/';

2. Adding the module to the default export array, e.g.

export default [
  // ... Previously registered modules ...
  ${args.name.camelCase}
];`);
  }
};
