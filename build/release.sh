#!/usr/bin/env bash

# break on all failures
set -e

#
# Releases the mono-repo via semantic-release and lerna.
# Do not run this script on your local installation since
# releases will be done via CI.
#
npx semantic-release pre

# Read the generated version from the package.json.
VERSION="$(cat package.json |  jq '.version')"

# Replace the string quotes from the variable
VERSION="$(echo $VERSION | sed -e 's/^"//' -e 's/"$//')"

# Create the required .npmrc file which points the `npm` CLI to use the `NPM_TOKEN``for auth.
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc

ls -lah packages/create-react-microservice-scaffold/src/packages/my-fancy-ui-components/

# Perform a hard reset to avoid changed/missing files.
git reset --hard

ls -lah packages/create-react-microservice-scaffold/src/packages/my-fancy-ui-components/

echo "Releasing $VERSION ..."
npx lerna publish --skip-git --yes --exact --repo-version=$VERSION
npx semantic-release post
