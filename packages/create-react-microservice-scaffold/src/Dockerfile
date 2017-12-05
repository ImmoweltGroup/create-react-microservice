#
# @company-scope/my-fancy-ui
# Please be cautious when adding new instructions,
# this Dockerfile is optimized for dockers caching abilities as best as possible.
#
FROM immowelt/node-alpine:8

#
# Enable yarn's workspace feature
#
RUN yarn config set workspaces-experimental true

ARG NODE_ENV=production
ENV NODE_ENV=production
ARG BABEL_ENV=production
ENV BABEL_ENV=production

EXPOSE 8080

CMD [ "yarn", "start" ]

#
# Create the app directory inside the container.
#
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#
# Install the dependencies only if the yarn.lock has been changed, otherwise use the docker cache layer of the previously built container.
#
COPY yarn.lock /usr/src/app/
COPY package.json /usr/src/app/

#
# Copy the source files, install again to setup all symlinks and bootstrap the mono-repo and afterwards build and bootstrap the service.
#
COPY . /usr/src/app
RUN yarn install
RUN yarn run bootstrap
