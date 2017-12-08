# Integrating CSS Modules

In this recipe we will add in JS CSS imports with the addition of CSS modules to the scaffold. Like with an other recipe we assume that you already created your service with the `create-react-microservice` CLI and it is working properly. Since this recipe shares a lot of code with the regular CSS setup, please follow the [Integrating CSS / PostCSS](IntegratingPostCss.md) recipe first! :-)

## Table of Contents

- [Changing the import statement](#changing-the-import-statement)
- [Adjusting the client-side webpack config](#adjusting-the-client-side-webpack-config)
- [Adjusting the server-side webpack config](#adjusting-the-server-side-webpack-config)


<a id="changing-the-import-statement"></a>
## Changing the import statement
After finishing the regular CSS setup, our first step is to adapt our example css import statement in our page component, e.g. `packages/my-fancy-ui/src/pages/index.js`, from `import './style.css'` to `import styles from './style.css'`. Since we now import the object containing our generated class names into the JavaScript file, we can also adapt the usage, so replace `<div className="exampleCssIntegrationClassName" />` to `<div className={styles.exampleCssIntegrationClassName} />` and you should be done! :-)


<a id="adjusting-the-client-side-webpack-config"></a>
## Adjusting the client-side webpack config
Since we already finished the major work in our previous recipe, the only thing we need to adjust in our client side webpack config is to add the following two options to our `css-loader` in e.g. `packages/my-fancy-ui-config/src/webpack.config.client.defaults.js`.

```js
{
  loader: "css-loader",
  options: {
    modules: true,
    importLoaders: 1,
    // ... other options
  }
}
```


<a id="adjusting-the-server-side-webpack-config"></a>
## Adjusting the server-side webpack config
In our [Integrating CSS / PostCSS](IntegratingPostCss.md) recipe we mapped all `.css` imports into the `null-loader`, since we now need to access the styles object containing the class names on the server as well, we have to align the two webpack configs. ALl you have to do for this is to import the `extract-text-webpack-plugin` within the server side config, initialize an instance of it and use the same module rule for `.css` files as you use it in your client-side config. Add the `extractCss` plugin instance to the plugins array and you are done!
