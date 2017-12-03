#!/usr/bin/env bash

# break on all failures
set -e

#
# Releases the mono-repo via semantic-release and lerna.
# Do not run this script on your local installation since
# releases will be done via CI.
#
npx semantic-release pre
$VERSION=$(cat package.json |  jq '.version');
echo "Releasing $VERSION ..."
npx lerna publish --skip-git --yes --repo-version=$VERSION
npx semantic-release post
