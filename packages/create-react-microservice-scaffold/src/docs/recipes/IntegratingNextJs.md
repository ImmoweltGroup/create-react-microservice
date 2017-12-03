# Integrating Next.js

In this recipe we will integrate next.js - The popular React framework that comes with a simple SSR solution built in.

**Warning: This recipe is highly unstable as long as the following issues are not properly solved, integrate it at your own risk!**

- [Webpack config does not get loaded when specifying a custom dir in CLI commands](https://github.com/zeit/next.js/issues/1195)
- [Make minify(uglify) opt-in or use a substitute](https://github.com/zeit/next.js/issues/1195)
- [The build assumes that all js files under /pages is a page](https://github.com/zeit/next.js/issues/3183)
- [Add configuration to specify the name of the `pages` directory](https://github.com/zeit/next.js/pull/936)
- [Add support to transpile modules inside node_modules](https://github.com/zeit/next.js/issues/706)

## Table of Contents

- [Installation of dependencies](#installation-of-dependencies)
- [Adding the next scripts](#adding-the-next-scripts)
- [Adding the next config](#adding-the-next-config)
- [Adjusting the babel config](#adjusting-the-babel-config)
- [Cleaning up the scaffold](#cleaning-up-the-scaffold)


<a id="installation-of-dependencies"></a>
## Installation of dependencies
Since next.js is a framework, we luckily don't need to install a lot of new dependencies, change into the main application package, e.g. `packages/my-fancy-ui`, and execute the following command

```sh
yarn add next uglifyjs-webpack-plugin
```


<a id="adding-the-next-scripts"></a>
## Adding the next scripts
Afterwards we add the lifecycle scripts into the same package, replace the existing ones with the ones provided by next.js, e.g.

```js
{
  "scripts": {
    "dev": "next src",
    "build": "next build src",
    "start": "next start src"
  }
}
```


<a id="adding-the-next-scripts"></a>
## Adding the next config
Currently next.js crashes if you use newer features of EcmaScript, therefore we need to add a `next.config.js` in the main application package and override the internally used `UglifyJsPlugin` with a newer version.

```js
// next.config.js
const Uglify = require('uglifyjs-webpack-plugin');

module.exports = {
  webpack: (config, { buildId, dev }) => {
    config.plugins = config.plugins.filter(
        (plugin) => (plugin.constructor.name !== 'UglifyJsPlugin')
    )

    config.plugins.push(
      new Uglify()
    );

    return config;
  }
}
```


<a id="cleaning-up-the-scaffold"></a>
## Cleaning up the scaffold
Since next.js comes with it's own server and rendering, we can safely execute the following commands from the root of the scaffold, as always please replace the `my-fancy-ui` with your scaffolds name.

```sh
# Remove the old entry points since next.js has entries placed in pages/
rm packages/my-fancy-ui/src/app.* packages/my-fancy-ui/src/index.*
# Remove the hypernova rendering microservice
rm -rf packages/my-fancy-ui-hypernova
# Remove the regular http web server
rm -rf packages/my-fancy-ui-server
```
