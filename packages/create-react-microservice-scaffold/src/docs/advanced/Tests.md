# Tests

Testing was one of the major aspects that we wanted to get right from the start and provide best practices to the community. Our testing stack is based upon the following types and should be seen as a recommendation, feel free to add/remove stuff depending on what works best for you and your company.

## Table of Contents

- [Unit tests](#unit-tests)
- [Performance tests](#performance-tests)
- [E2E tests](#e2e-tests)

<a id="unit-tests"></a>
### Unit tests
We execute our unit tests using the Jest test runner from Facebook. Since we encourage writing modular code that one can exchange and move into separate packages, we found that having the test specs on the same level as the source file increases this paradigm hugely. This is why you will find `*.spec.js` files alongside of the source files, Jest will automatically discover them inside the `src/` folder of your package.

You can run the unit tests on a per package basis using `yarn run jest` or `yarn run jest:watch` as well as in the root of the application using `yarn run jest`.

#### Testing React Components
React and Redux offer the most simple to test options, since most - if not all - code is written as pure functions (meaning simple input/output functions) we can assert them easily, especially if you use a test runner like [Jest](https://facebook.github.io/jest/docs/en/api.html) that supports Snapshot Testing.

You can view snapshot testing as a more developer oriented testing method. Instead of manually writing the assertion values, Jest will automatically generate them, which keeps the test code as simple and lean as possible. Once the asserted values changes, Jest will pretty-print the difference and ask you if you want to accept the change and re-generate the snapshot or decline in which case you need to fix the code.

In rare occasions where we need to use `class` based components we utilize AirBnB's [enzyme](https://github.com/airbnb/enzyme) library to assert methods, state and other internals of the React class component.

#### Testing Redux's actions, reducers and selectors
Since actions, reducers and selectors are pure functions we can also utilize Jest's Snapshot Testing feature in the same way we do for our stateless components.

#### Testing generator functions of redux-saga
We currently try out snapshot testing for generators as well using the `redux-saga-test-plan` package, if this turns out to be less practical / safe we will switch to another form of testing them in the future.

<a id="performance-tests"></a>
### Performance tests
Since performance is one of the most important topics of a good UX, we also added a pre-defined setup to automatically test the performance of your application as it grows. For this case we use the great [pwmetrics](https://github.com/paulirish/pwmetrics) tool that will under the hood use Google Chrome and the Lighthouse API to measure your apps performance in three sequential runs.

You can run the performance test in the root of the application using `yarn run pwmetrics`.

<a id="e2e-tests"></a>
### E2E tests / Integration tests
We recommend setting up either [TestCafe](https://devexpress.github.io/testcafe/) in combination with their powerfull react-selectors feature if you want to test your application as a whole. In the near future we will provide some an example setup out of the box as well, so stay tuned! :-)
