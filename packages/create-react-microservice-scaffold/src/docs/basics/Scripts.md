# Available scripts

The scaffold comes with a set of pre-defined scripts on the root and on a per-package basis.

## Table of Contents

- [Scripts available in the root](#root-scripts)
- [Scripts available on a per-package basis](#package-scripts)


<a id="root-scripts"></a>
### Scripts available in the root

#### `yarn run dev`
Starts the development server and a file-watcher mode in all packages to automatically re-compile on changes.

#### `yarn run build`
Builds the whole project in production settings (E.g. code minification enabled).

#### `yarn run start`
Starts the production server. This command expects that all packages have been built already.

#### `yarn run clean`
Removes all build artifacts and dependencies (e.g. like `node_modules` and the `flow-typed/npm` typings).

#### `yarn run bootstrap`
Sets up the project depending on the environment.

#### `yarn run test`
Executes all tests of the project asynchronously (including the generation of coverage information).

#### `yarn run {lint, flow, jest, jest:coverage, ...}`
All of the remaining scripts will mostly be propagated to all packages asynchronously.


<a id="package-scripts"></a>
### Scripts available on a per-package basis

You can execute most of the scripts you will find in the root also on a per-package basis. This is especially useful to restrict the output to packages that you are actively working on.

**The most important script you will need while working with the scaffold is `yarn run jest:watch`**. This spawns a file-watcher to re-run the unit-tests of the package once a file has changed. It's one of the few scripts that we cannot execute in parallel for all package via the root and the reason is pretty simple:

To keep the developer experience high we use a feature of Jest that is called [Snapshot Testing](https://facebook.github.io/jest/docs/en/snapshot-testing.html), once your snapshot tests fail and you need to update them, the Jest CLI expects you to interact with it via key presses, e.g. `Press "u" to update all failing snapshots` and since lerna spawns sub-processes the keyboard inputs are not propagated from your root shell into the sub-processes.

For a full list of scripts on a per-package basis, please refer to the `package.json` `scripts` section.
