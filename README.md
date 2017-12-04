![create-react-microservice](https://user-images.githubusercontent.com/1557092/33328489-6a916806-d45a-11e7-8589-853b6c447a68.jpg)

[![Powered by Immowelt](https://img.shields.io/badge/powered%20by-immowelt-yellow.svg?colorB=ffb200)](https://stackshare.io/immowelt-group/)
[![Greenkeeper badge](https://badges.greenkeeper.io/ImmoweltGroup/create-react-microservice.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/ImmoweltGroup/create-react-microservice.svg?branch=master)](https://travis-ci.org/ImmoweltGroup/create-react-microservice)
[![Dependency Status](https://david-dm.org/ImmoweltGroup/create-react-microservice.svg)](https://david-dm.org/ImmoweltGroup/create-react-microservice)
[![devDependency Status](https://david-dm.org/ImmoweltGroup/create-react-microservice/dev-status.svg)](https://david-dm.org/ImmoweltGroup/create-react-microservice#info=devDependencies&view=table)
[![Dependency Status](https://dependencyci.com/github/ImmoweltGroup/create-react-microservice/badge)](https://dependencyci.com/github/ImmoweltGroup/create-react-microservice)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Creating scalable, universal and well tested JavaScript application for enterprise companies with many teams and products is a hard task. We at Immowelt Group took gathered all of our knowledge and aimed to fill this void. `create-react-microservice` is a scaffold that will provide you with an mono-repository structure so it is easy as pie to share code with co-workers, best practices in regards to testing as well as server side rendering support. All of it while providing you the whole flexibility of changing stuff under the hood. :rocket:

**What's in the box?**

- Universal by default using [AirBnB's hypernova](https://github.com/airbnb/hypernova) render microservice under the hood.
- Built with React, Redux, Reselect and Plow-JS.
- Comes with best-practices in regards on how to unit- and performance-test your universal application.
- 100% Statically typed via Flow from Facebook.
- Built in support for internationalization (i18n).
- No assumptions about your CSS setup, but with guides on how to setup each in minutes.
- Containerized via Docker.
- Highly flexible and performing architecture under the hood.

**What about Next.js?**

This scaffold is not aimed at "competing" against Next.js, quite the contrary we see Next.js as a valid addition to the scaffold! We even provide you with a guide on [how to integrate Next.js into the scaffold structure]((/packages/create-react-microservice-scaffold/src/docs/recipes/IntegratingNextJs.md)) within minutes! :-)

**Why is this scaffold called `create-react-microservice` / What is a frontend-microservice?**

At ImmoweltGroup we are currently re-structuring our plattform from a big monolithic application into small, composable services that take care of one specific UI part, the bigger picture will be composed at a higher level with a tool such as [node-tailor](https://github.com/zalando/tailor). If you haven't heard of frontend microservices, we recommend you to read Tom Söderlund's great article [Micro frontends—a microservice approach to front-end web development](https://medium.com/@tomsoderlund/micro-frontends-a-microservice-approach-to-front-end-web-development-f325ebdadc16). This scaffold is a result of the requirements and therefore called `create-react-microservice`, nevertheless this scaffold can still be used for traditional web applications, e.g. in combination with Zeit's great [next.js](https://github.com/zeit/next.js) framework.

## Quick Start

```bash
yarn global add create-react-microservice

create-react-microservice my-fancy-ui
cd my-fancy-ui
yarn run dev
```

**That's it** - A browser should automatically open up [http://localhost:8080/](http://localhost:8080/) as soon as the application was compiled the first time.

## Documentation
A detailed documentation including a test feature integration guide as well as a bunch of recipes to integrate other technologies/frameworks into the scaffold can be found over at [https://immoweltgroup.gitbooks.io/create-react-microservice/](https://immoweltgroup.gitbooks.io/create-react-microservice/) - Check it out! :-)

## Contributing
See the [`CONTRIBUTING.md`](/CONTRIBUTING.md) file at the root of the repository.

## Licensing
See the [`LICENSE`](/LICENSE) file at the root of the repository.
