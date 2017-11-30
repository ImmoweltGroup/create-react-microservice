# Prerequisites

While we try to keep the effort of setting up your system as small as possible, some tools need to be installed globally.

## Table of Contents

- [NVM (Node Version Manager)](#nvm)
- [Yarn (Package Manager)](#yarn)
- [Enabling Yarn's workspace feature](#yarn-workspace-feature)


<a id="nvm"></a>
## NVM (Node Version Manager)

As any good node citizen, we use [nvm](https://github.com/creationix/nvm) to manage our node versions across projects. Execute the following command to check if `nvm` was installed previously on your computer.

```sh
nvm --version
```
If a version was printed into your console/shell, you are good to go and you can skip to the next section.

In case an error was printed, check if Node was installed globally previously by executing
```sh
node --version
```
If a version was printed into your console/shell, please uninstall your global Node/NPM version before installing [nvm](https://github.com/creationix/nvm).

Once you've got a clean system without any global installed Node/NPM versions, go ahead and follow the installation instructions in the [nvm](https://github.com/creationix/nvm) README.


<a id="yarn"></a>
## Yarn (Package Manager)

Since we make good use of `yarn`, we require it to be installed as well. As with node, check if it's installed already by executing

```sh
yarn --version
```

We require at least `v1.0.0` to be installed, if it was not installed or if it's outdated, please head to the [Installation guide of yarn](https://yarnpkg.com/en/docs/install) and execute the necessary steps.


<a id="yarn-workspace-feature"></a>
## Enabling Yarn's workspace feature
One of the most crucial step is that you enable the worksapce feature of yarn by executing the following command

```sh
yarn config set workspaces-experimental true
```

Afterwards you are good to go! :-)
