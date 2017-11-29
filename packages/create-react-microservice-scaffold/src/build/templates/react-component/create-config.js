const path = require('path');

module.exports = {
  id: 'react-component',
  description: 'A simple React Component template that will scaffold basic tests and the component itself.',
  resolveQuestions: async flags => [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name for the React Component?',
      validate: Boolean
    }
  ],
  resolveFiles: async (answers, flags) => ['*/**'],
  resolveDestinationFolder: async (answers, args, flags) => {
    return path.join(__dirname, '../../../packages/<%=it.name.kebabCase%>-components/src/');
  }
};
