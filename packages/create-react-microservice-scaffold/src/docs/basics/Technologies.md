# Technologies

The default stack consist of a couple of libraries you should know before starting with our example. Since we want to make it as easy as possible for you to get productive, you will find links to articles or documentations that we really recommend you to take a look at in each section. Our experience is that most tutorials or guides around the web are outdated pretty fast so we always recommend you to read the official docs.

## Table of Contents

- [EcmaScript (ES2017, ES6, ES5)](#ecmascript)
- [Flow](#flow)
- [React](#react)
- [Redux](#react)
- [React-Redux](#react-redux)
- [Redux-Saga](#redux-saga)
- [Plow-JS](#plow-js)


<a id="ecmascript"></a>
## EcmaScript (ES2017, ES6, ES5)
Since we develop our client side applications in JavaScript it's necessary to understand the spec and syntax of it properly. We recommend you to at least take a look at the most commonly used features that where introduced in ES5, ES6 and ES2017.

#### Further information

**Articles**

- [ECMAScript 6 feature run-down](https://github.com/lukehoban/es6features)
- [3 Features of ES7 (and Beyond) That You Should Be Using, Now](https://derickbailey.com/2017/06/06/3-features-of-es7-and-beyond-that-you-should-be-using-now/)
- [The Basics Of ES6 Generators](https://davidwalsh.name/es6-generators)

**Docs and Specs**

- [Array.prototype.map()](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Array.prototype.reduce()](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
- [Array.prototype.filter()](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Array.prototype.find()](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

<a id="flow"></a>
## Flow
We find that type informations in combination with an IDE that includes these reduce the time needed to get developers into a project greatly. That's why we included a type-system into the scaffold by default, we opted for Flow since it offers great support for React out of the box. We recommend you to take a look at the features this type system offers you and of course to integrate it into your IDE to fully benefit from using it (In case you are using Atom we recommend the `Nuclide IDE` plugin).

#### Further information

**Docs and Specs**

- [Type Annotations](https://flow.org/en/docs/types/)

<a id="react"></a>
## React
As this scaffold is targeted at the react ecosystem you should also be aware of how React works and what it does for you.

*Spoilers:*
1. We do not recommend using Reacts component level `state` for everything. It certainly has it's use cases but most of the time the data you hold in your state will be accessed by multiple components, in which case we recommend using redux.
2. Try to use functional components as much as possible since they are easier to maintain and test in the longer run.
3. In case you need context in your component e.g. methods, evaluate if you can solve your problem with HOC's from [recompose](https://github.com/acdlite/recompose) or extend the `Component` class of React. Using the `PureComponent` should always be done in the future once you can measure the performance impact of using one of the other.

#### Further information

**Docs and Specs**

- [React docs](https://reactjs.org/docs/hello-world.html)


<a id="redux"></a>
## Redux
We recommend using redux to manage your application state and can fully recommend reading their docs, they are damn well written and explain the concepts and the API in detail.

**Docs and Specs**

- [Redux docs](http://redux.js.org/docs/introduction/)

<a id="react-redux"></a>
## React-Redux
Usually binding the former two libraries together results in a lot of boilerplate code, but luckily there is a library that will take care. Using the `connect` HOC will be the most important thing to understand when working with these two libraries, so again we recommend you to read the docs. :-)

**Docs and Specs**

- [React-Redux docs](https://github.com/reactjs/react-redux#documentation)

<a id="redux-saga"></a>
## Redux-Saga
To manage complex state workflows and asynchronous calls we recommend you to use redux-saga, with it's descriptive effects API and the built in generators support they are modular, easy to test and super flexible to extend in the longer run. In case you already understand the syntax of generators you can safely jump right into the code and take the documentation as a reference on the way once you discover effect descriptors of redux-saga that you haven't known yet.

**Docs and Specs**

- [Redux-Saga docs](https://redux-saga.js.org/)

<a id="plow-js"></a>
## Plow-JS
We embrace the concept of having immutable data structures, but we do not recommend using Immutable.js by default. Instead use `plow-js`, it automatically creates immutability with the native data types and once you spot performance problems just install Immutable.js by Facebook as a drop-in replacement, `plow-js` works with their API as well so it's zero to none effort later on.

We recommend you to at least take a firm look at the documentation and get familiar with the function signature of the `$get` projection and the `$set` migration since they are the most commonly used functions in the beginning. As with redux-saga and it's effects the documentation can be used as a reference once you discover new functions of `plow-js` that you haven't known yet.

**Docs and Specs**

- [Plow-JS docs](https://grebaldi.gitbooks.io/plow-js/content/docs/getting-started.html)
