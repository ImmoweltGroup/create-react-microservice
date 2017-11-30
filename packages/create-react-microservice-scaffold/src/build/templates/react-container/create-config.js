const path = require('path');

module.exports = {
  id: 'react-container',
  description:
    'A simple React Container template that will scaffold basic tests and the container itself.',
  resolveQuestions: async flags => [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name for the React Container?',
      validate: Boolean
    }
  ],
  resolveFiles: async (answers, flags) => ['*/**'],
  resolveDestinationFolder: async (answers, args, flags) => {
    return path.join(
      __dirname,
      '../../../packages/my-fancy-ui/src/containers/'
    );
  }
};
