# FAQ

## Table of Contents

- [Why not create-react-app / next.js?](#why-not-cra-next)
- [Why are both the `@immowelt/babel-preset-immowelt-react` and `@immowelt/babel-preset-immowelt` presets installed in React based packages?](#why-both-babel-presets)
- [Why are we using `flow-copy-source` instead of `flow gen-flow-files`?](#why-flow-copy-source)


<a id="why-not-cra-next"></a>
### Why not create-react-app / next.js?

We started using [CRA](https://github.com/facebookincubator/create-react-app) or commonly known as `create-react-app` but soon enough we realized that this scaffold is just a simple playground to get up and running. It does not provide any guidance in regards to testing, structure or features like server side rendering.

[Next.js](https://github.com/zeit/next.js) on the other hand seemed like a better fit, we even took some things like the great `getInitialProps` concept on the route component. We do recommend it for most use cases, but once you want to...

* ... use webpack loaders for new file-types
* ... have full control over the configuration, structure and the underlying code
* ... structure your app in a mono-repo

... you will most probably end up hitting the (current) limitations of it. That's why we took the best parts from CRA as well as Next.js and created our own scaffold. We see this scaffold not as a competing package, but more as an addition, especially when it comes to Next.js, you can easily use this scaffold as a basis, enjoy all the benefits and still use Next.js! :-)


<a id="why-both-babel-presets"></a>
#### Why are both the `@immowelt/babel-preset-immowelt-react` and `@immowelt/babel-preset-immowelt` presets installed in React based packages?
Since we need to create two bundles for server side rendering, we also need to use two different transpilation configs. We could also just configure the server side bundle to use the default react/browser preset, but this would cause many of the ES2016 / ES2017 features to be transpiled which is not as performant as using the native NodeJS implementations.


<a id="why-flow-copy-source"></a>
#### Why are we using `flow-copy-source` instead of `flow gen-flow-files`?
We currently can't use the in beta command `gen-flow-files` of the Flow CLI since it [crashes when using Iterables as arguments](https://github.com/facebook/flow/issues/3281). Once this issue is resolved we can try to slim down the dependencies again.
