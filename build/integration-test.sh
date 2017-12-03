#!/usr/bin/env bash

# break on all failures
set -e

#
# Test the CLI and scaffold alltogether to make sure that everything is still working.
# Note that we install it outside of this repository to avoid running into conflicts with
# `husky` git hooks from the scaffold <-> `husky` git hooks from the mono-repo.
#
PWD="$(pwd)"

ls -lah packages/create-react-microservice-scaffold/src/packages/my-fancy-ui-components/

printf "\nCleaning up previous runs of the integration-test\n"
rm -rf ../create-react-microservice-test-scaffold

printf "\nCreating the scaffold via the CLI\n"
npx create-react-microservice \
  ../create-react-microservice-test-scaffold \
  --license="MIT" \
  --npmScope="integration-scope" \
  --gitRepoUrl="https://github.com/ImmoweltGroup/create-react-microservice.git"

printf "\nExecuting the tests within the created scaffold\n"
cd ../create-react-microservice-test-scaffold
yarn run lint
yarn run flow
yarn run jest:coverage -- -w 2
yarn run start &
START_PID=$!
sleep 5s
yarn run testcafe
kill $START_PID

ls -lah packages/create-react-microservice-scaffold/src/packages/my-fancy-ui-components/

printf "\nFinished the integration-test\n"
cd $PWD
