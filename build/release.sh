#!/usr/bin/env bash

# break on all failures
set -e

#
# Releases the mono-repo via lerna and adjusts the version number from semantic-release beforehand.
#
npx semantic-release pre
$VERSION=$(cat package.json |  jq '.version');
npx lerna publish --skip-git --yes --repo-version=$VERSION
npx semantic-release post
