// @flow

//
// Note: Do not use ES modules in this file since it will be parsed in CommonJS environments too!
//
const {renderReact} = require('hypernova-react');
const IndexPage = require('./pages/').default;

module.exports = renderReact('my-fancy-ui', IndexPage);
module.exports.getInitialProps = IndexPage.getInitialProps;
