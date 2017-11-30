// @flow

//
// Note: Do not use ES modules in this file since it will be parsed in CommonJS environments too!
//
const {renderReact} = require('hypernova-react');
const App = require('./app.js').default;

module.exports = renderReact('my-fancy-ui', App);
module.exports.getInitialProps = App.getInitialProps;
