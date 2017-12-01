# Integrating SCSS / SASS

In this recipe we will add in JS SASS/SCSS imports to the scaffold. Like with an other recipe we assume that you already created your service with the `create-react-microservice` CLI and it is working properly. Since this recipe shares a lot of code with the regular CSS setup, please follow the [Integrating CSS / PostCSS](IntegratingPostCss.md) recipe first! :-)

## Table of Contents

- [Changing the example CSS setup](#changing-the-example-css-setup)
- [Installing new dependencies](#installing-dependencies)
- [Adjusting the client-side webpack config](#adjusting-the-client-side-webpack-config)

<a id="changing-the-example-css-setup"></a>
## Changing the example CSS setup

After finishing the CSS setup recipe, we can start of by changing some CSS specifics into the required rules for the SASS/SCSS integration. Rename your test `style.css` file into `style.scss`, change the import statement in the `app.js` accordingly and paste the following code into the SCSS file.

```css
$myColor: red;

.exampleCssIntegrationClassName {
  color: $myColor;
}
```

And the last change is in the global `build/.flowconfig`, adjust the previously added re-mapping of `css` files in the `[options]` section into the following.

```
module.name_mapper='.*\(.scss\)' -> 'empty/object'
```

<a id="installing-dependencies"></a>
## Installing new dependencies
Change into your config package and execute the following command to add dependencies that are required to compile SASS with webpack.

```sh
yarn add sass-loader node-sass
```

<a id="adjusting-the-client-side-webpack-config"></a>
## Adjusting the client-side webpack config
Afterwards open up the default configuration of webpack for the client side bundle, e.g. `packages/my-fancy-ui-config/src/webpack.config.client.defaults.js` and add the following loader after the `postcss-loader` object.

```js
{
  loader: "sass-loader",
  options: {
    sourceMap: config.webpack.hasSourceMaps
  }
}
```

And that's it - If you execute a `yarn run build && yarn run start` or `yarn run dev` in the root of your mono-repository you should see the headings now in red and the css being served to the client! :rocket:
