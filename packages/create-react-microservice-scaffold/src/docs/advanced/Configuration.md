# Configuration

Out of the box the scaffold uses the `NODE_ENV` environment variable to detect in which mode it should run.

| Environment variable key | Possible values                       | Default value | Description                                           |
|--------------------------|---------------------------------------|---------------|-------------------------------------------------------|
| `NODE_ENV`               | `development`, `test`, `production`   | `development` | The environment for the application itself.           |
| `MY_FANCY_UI_HOST`       | `*`                                   | `localhost`   | The hostname on which the application should launch.  |
| `MY_FANCY_UI_PORT`       | `*`                                   | `8080`        | The port on which the HTTP server should launch.      |
| `MY_FANCY_UI_SSR_PORT`   | `*`                                   | `8081`        | The port on which the hypernova server should launch. |
| `MY_FANCY_UI_API_STAGE`  | `*`                                   | `development` | The stage pointer for the API´s you use in the service. |

Since manually setting these environment variables manually is a daunting task, you can [create a so called dot-env file](https://github.com/benoror/better-npm-run#env-file) in the root of your application. By default most top level scripts like `yarn run {dev, start, build, test}` automatically set at least the `NODE_ENV` environment variable. Take a look at the `betterScripts` section in the root `package.json` for detailed informations.

Project wide configuration that you would like to keep in your code should be done in the dedicated config package, e.g. `packages/my-fancy-ui-config/src/index.js`.
This is also the place where you can add additional required environment variable and their validation if necessary.
