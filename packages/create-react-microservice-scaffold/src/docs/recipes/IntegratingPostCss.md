# Integrating CSS / PostCSS

In this recipe we will add in JS CSS imports to the scaffold. Like with an other recipe we assume that you already created your service with the `create-react-microservice` CLI and it is working properly.

## Table of Contents

- [Adding an example CSS import to the scaffold](#adding-the-example-css-import)
- [Installing new dependencies](#installing-dependencies)
- [Configuring PostCSS](#configuring-postcss)
- [Configuring Flow](#configuring-flow)
- [Adjusting the server-side webpack config](#adjusting-the-server-side-webpack-config)
- [Adjusting the client-side webpack config](#adjusting-the-client-side-webpack-config)

<a id="adding-the-example-css-import"></a>
## Adding an example CSS import to the scaffold

First let's add an generic CSS file into the main applications package, head into e.g. `packages/my-fancy-ui/src/` and create a `style.css` file and paste the following contents into it.

```css
.exampleCssIntegrationClassName {
  color: red;
}
```

Afterwards open up the `app.js`, import the css file, e.g. `import './style.css'` and propagate the className to the `IndexRoute`, e.g. `<IndexRoute name={name} className="exampleCssIntegrationClassName" />`.

<a id="installing-dependencies"></a>
## Installing new dependencies
After creating the integration, let's install all dependencies that are needed to let webpack know how to process CSS files. Head into your config package, e.g. `packages/my-fancy-ui-config/` and execute the following commands.

```sh
yarn add style-loader css-loader null-loader postcss-loader extract-text-webpack-plugin autoprefixer
```

<a id="configuring-postcss"></a>
## Configuring PostCSS
Since we want to use PostCSS we should add a config file for postCSS on the same level as the webpack configs, e.g. `packages/my-fancy-ui-config/src/postcss.config.js`. Create the file and insert the following contents into it.

```js
module.exports = {
  plugins: {
    autoprefixer: {}
  }
};
```

<a id="configuring-flow"></a>
## Configuring Flow
Out of the box Flow will not be able to parse / understand the `css` imports, we re-map every `.css` import into an empty object type, add the following line into the `[options]` of the `build/.flowconfig` file in the root of your mono repository.

```
module.name_mapper='.*\(.css\)' -> 'empty/object'
```

<a id="adjusting-the-server-side-webpack-config"></a>
## Adjusting the server-side webpack config
Since we don't need to compile the CSS for the server, let's head into the default configuration of webpack for the server side bundle, e.g. `packages/my-fancy-ui-config/src/webpack.config.server.defaults.js`. Open up the file and add the following snippet into the `module.rules` array.

```js
{
  test: /\.(scss|sass|css)$/,
  use: "null-loader"
}
```

<a id="adjusting-the-client-side-webpack-config"></a>
## Adjusting the client-side webpack config
Afterwards we can continue with the client webpack configuration, open up the default configuration of webpack for the client side bundle, e.g. `packages/my-fancy-ui-config/src/webpack.config.client.defaults.js`. Open up the file and add the following constants to the top of the file.

```js
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCss = new ExtractTextPlugin({
  filename: "[name].[contenthash].css"
});
```

... and jump to the `module.rules` array and add the following rule to it.

```js
{
  test: /\.(css|scss|sass)$/,
  use: extractCss.extract({
    use: [
      {
        loader: "css-loader",
        options: {
          minimize: !isDev,
          sourceMap: config.webpack.hasSourceMaps
        }
      },
      {
        loader: "postcss-loader",
        options: {
          config: {
            path: path.resolve(__dirname, "postcss.config.js")
          },
          sourceMap: config.webpack.hasSourceMaps
        }
      }
    ],
    fallback: "style-loader"
  })
}
```

... and to finalize everything, add the `extractCss` plugin to the webpack configs `plugins` array, e.g.

```js
plugins: [
  extractCss,

  // ... other plugins
]
```

And that's it - If you execute a `yarn run build && yarn run start` or `yarn run dev` in the root of your mono-repository you should see the headings now in red and the css being served to the client! :rocket:
