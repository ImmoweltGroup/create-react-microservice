# Structure

## Table of Contents

- [Structure of the Mono-Repo](#structure-of-the-mono-repo)
- [Packages of the Mono-Repo](#packages-of-the-mono-repo)


<a id="structure-of-the-mono-repo"></a>
## Structure of the Mono-Repo
The scaffolds structure is pretty simple. It's based on the mono-repo principle which enhances the code-sharing capabilities of you and your teams while reducing the maintenance overhead in doing so. In a nutshell a mono-repo is a collection of independent packages, in our case `npm` packages. Feel free to [read more about mono-repos in detail over at the Lerna.js README.md](https://github.com/lerna/lerna/#about)! :-)

We use Lerna as the tool of choice for orchestrating all packages with one exception. The setup is done via [yarn's workspace feature](https://yarnpkg.com/en/docs/workspaces) since it was more reliable and performant.

All packages are located in the `packages/` folder, they include their own `package.json` and additional configuration files. This makes it a no-brainer to extract packages and make the code available for other teams in your company. The mono-repo is structured as follows.

```
build/                // Configuration files for external tools, e.g. deployments / integration tests.
docs/                 // You are currently right here m8.
flow-typed/           // Versioned library defintions for Flow, e.g. patches or custom libdefs that you haven't open-sourced yet.
node_modules/         // Dependencies of your project.
packages/             // The application relevant packages.
└── somePackage/  
|   ├── coverage/     // Code coverage information of this package.
|   ├── node_modules/ // Dependencies of this package (if they are used in multiple packages, symlinks will be created to satisfy Flow).
|   ├── dist/         // The location of your transpiled code.
|   ├── src/          // The location of your source code
```


<a id="packages-of-the-mono-repo"></a>
## Packages of the Mono-Repo
```
packages/
├── my-fancy-ui/                  // The universal UI application for the user.
├── my-fancy-ui-components/       // Abstract UI components to be shared with other teams / applications.
├── my-fancy-ui-config/           // The shared project config for all packages.
├── my-fancy-ui-hypernova/        // The universal rendering microservice.
├── my-fancy-ui-i18n/             // Internationalization API and files.
├── my-fancy-ui-logger/           // Singleton logger instance for all packages.
├── my-fancy-ui-server/           // The front-facing web server.
└── my-fancy-ui-static-assets/    // Static files that you usually don't want to put into version control *hint*.
```
