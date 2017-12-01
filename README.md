![create-react-microservice](https://user-images.githubusercontent.com/1557092/33328489-6a916806-d45a-11e7-8589-853b6c447a68.jpg)

[![Powered by Immowelt](https://img.shields.io/badge/powered%20by-immowelt-yellow.svg?colorB=ffb200)](https://stackshare.io/immowelt-group/)
[![Greenkeeper badge](https://badges.greenkeeper.io/ImmoweltGroup/create-react-microservice.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/ImmoweltGroup/create-react-microservice.svg?branch=master)](https://travis-ci.org/ImmoweltGroup/create-react-microservice)
[![Dependency Status](https://david-dm.org/ImmoweltGroup/create-react-microservice.svg)](https://david-dm.org/ImmoweltGroup/create-react-microservice)
[![devDependency Status](https://david-dm.org/ImmoweltGroup/create-react-microservice/dev-status.svg)](https://david-dm.org/ImmoweltGroup/create-react-microservice#info=devDependencies&view=table)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Creating scalable, universal and well tested JavaScript application for enterprise companies with many teams and products is a hard task. We at Immowelt Group took gathered all of our knowledge and aimed to fill this void. `create-react-microservice` is a scaffold that will provide you with an mono-repository structure so it is easy as pie to share code with co-workers, best practices in regards to testing as well as server side rendering support. All of it while providing you the whole flexibility of changing stuff under the hood. :rocket:

**What's in the box?**

- Universal by default since we use [AirBnB's hypernova](https://github.com/airbnb/hypernova) render microservice under the hood.
- Built with React, Redux, Reselect and Plow-JS.
- Comes with best-practices in regards on how to unit- and performance-test your universal application.
- 100% Statically typed via Flow from Facebook.
- Built in support for internationalization (i18n).
- No assumptions (ejected by default) about your CSS setup, but with guides on how to setup each in minutes.
- Containerized via Docker.
- Highly flexible and performing architecture under the hood.

**What about Next.js?**

This scaffold is not aimed at "competing" against Next.js, quite the contrary we see Next.js as a valid addition to the scaffold! We even provide you with a guide on how to integrate Next.js into our scaffold structure within minutes! :-)

## Quick Start

```bash
yarn add -g create-react-microservice

create-react-microservice my-fancy-ui
cd my-fancy-ui
yarn run dev
```

**That's it** - A browser should automatically open up [http://localhost:8080/](http://localhost:8080/) as soon as the application was compiled the first time.

## Documentation
* [Introduction](/packages/create-react-microservice-scaffold/src/docs/introduction/README.md)
  * [Motivation](/packages/create-react-microservice-scaffold/src/docs/introduction/Motivation.md)
  * [Structure](/packages/create-react-microservice-scaffold/src/docs/introduction/Structure.md)
* [Basics](/packages/create-react-microservice-scaffold/src/docs/basics/README.md)
  * [Prerequisites](/packages/create-react-microservice-scaffold/src/docs/basics/Prerequisites.md)
  * [Technologies](/packages/create-react-microservice-scaffold/src/docs/basics/Technologies.md)
  * [Getting Started](/packages/create-react-microservice-scaffold/src/docs/basics/GettingStarted.md)
  * [Scripts](/packages/create-react-microservice-scaffold/src/docs/basics/Scripts.md)
* [Advanced](/packages/create-react-microservice-scaffold/src/docs/advanced/README.md)
  * [Configuration](/packages/create-react-microservice-scaffold/src/docs/advanced/Configuration.md)
  * [Deploying](/packages/create-react-microservice-scaffold/src/docs/advanced/Deploying.md)
  * [Tests](/packages/create-react-microservice-scaffold/src/docs/advanced/Tests.md)
  * [Server-Side-Rendering](/packages/create-react-microservice-scaffold/src/docs/advanced/ServerSideRendering.md)
* [Developing your first feature](/packages/create-react-microservice-scaffold/src/docs/feature-development/README.md)
  * [Introduction](/packages/create-react-microservice-scaffold/src/docs/feature-development/Introduction.md)
  * [Building the UI](/packages/create-react-microservice-scaffold/src/docs/feature-development/BuildingTheFormUi.md)
  * [i18n](/packages/create-react-microservice-scaffold/src/docs/feature-development/i18n.md)
  * [Thinking in redux](/packages/create-react-microservice-scaffold/src/docs/feature-development/ThinkingInRedux.md)
  * [Connecting the UI](/packages/create-react-microservice-scaffold/src/docs/feature-development/ConnectingTheUi.md)
  * [Submitting the data to an API](/packages/create-react-microservice-scaffold/src/docs/feature-development/SubmittingTheForm.md)
  * [Internationalization of the UI (i18n)](/packages/create-react-microservice-scaffold/src/docs/feature-development/i18n.md)
* [Recipes](/packages/create-react-microservice-scaffold/src/docs/recipes/README.md)
  * [Integrating CSS / PostCSS](/packages/create-react-microservice-scaffold/src/docs/recipes/IntegratingPostCss.md)
* [FAQ](/packages/create-react-microservice-scaffold/src/docs/FAQ.md)
* [Glossary](/packages/create-react-microservice-scaffold/src/docs/Glossary.md)
* [Troubleshooting](/packages/create-react-microservice-scaffold/src/docs/Troubleshooting.md)

## Contributing
See the [`CONTRIBUTING.md`](/CONTRIBUTING.md) file at the root of the repository.

## Licensing
See the [`LICENSE`](/LICENSE) file at the root of the repository.
